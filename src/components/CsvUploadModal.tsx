"use client"; // Ensure this is present for client-side interactivity
import { useState } from "react";
import { Button } from "s/components/ui/button"; // Adjust the import based on your UI library
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "s/components/ui/form"; // Import form components
import { useForm } from "react-hook-form";
import { Input } from "s/components/ui/input"; // Import Input component
import { pinata } from "src/utils/pinata_upload"; // Ensure pinata is imported
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";

const formSchema = z.object({
    projectName: z.string().min(2, {
      message: "Project name should be atleast of 2 characters.",
    }),
    csvFile:  z.custom<File>((file) => file instanceof File && file.type === "text/csv", {
        message: "Only CSV files are allowed.",
      }),
    
  })
  


// Define the structure of the JSON response
interface JsonResponse {
    jsonData: any; // Replace 'any' with a more specific type if known
    url: string;
}

// Define the props for the CsvUploadModal component
interface CsvUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onResponse: (response: JsonResponse) => void;
}

// Define the CsvUploadModal component with a return type
export function CsvUploadModal({ onClose, onResponse }: CsvUploadModalProps) {
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
      
      
    const { handleSubmit, register } = useForm();
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [projectName, setProjectName] = useState<string>("");



    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCsvFile(event.target.files ? event.target.files[0] : null);
        console.log("File uploaded:", event.target.files ? event.target.files[0].name : "No file"); // Debugging statement
    };


    async function onSubmit(data: z.infer<typeof formSchema>) {
        // check if the file is a csv file
        if (data.csvFile.type !== "text/csv") {
            console.log("Only CSV files are allowed.");
            return;
        }

        // and then upload the file to the server
        const formData = new FormData();
        formData.append("file", data.csvFile);
        formData.append("projectName", data.projectName);

        try {
            const response = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });

            const data: JsonResponse = await response.json(); // Type the response
            console.log("Response from server:", data); // Debugging statement
            onResponse(data); // Call the onResponse prop with the data
        } catch (error) {
        console.log(data);
    }
    onClose(); // Close the modal after submission    
}

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <Form {...form}>
                    <FormField
                        name="csvFile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PDF file</FormLabel>
                                <FormControl>
                                    <input type="file" onChange={handleFileUpload} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="projectName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter project name" {...field} value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="mt-4 bg-black text-white hover:bg-gray-800 transition"
                    >
                        Deposit CSV to JSON
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default CsvUploadModal;