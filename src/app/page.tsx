"use client"
import Image from "next/image";
import { Button } from "s/components/ui/button"; // Import Button from Shadcn UI
import { useState } from "react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import CsvUploadModal from "src/components/CsvUploadModal"; // Import the CsvUploadModal component

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [jsonResponse, setJsonResponse] = useState<any>(null); // State to hold the JSON response

  const openCsvUploadModal = () => {
    setIsModalOpen(true); // Set modal visibility to true
  };

  const handleJsonResponse = (response: any) => {
    setJsonResponse(response); // Set the JSON response from the modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header /> {/* Include Header */}
      <main className="flex flex-col items-center gap-6 p-4">
        <CsvUploadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onResponse={handleJsonResponse} // Pass the response handler to the modal
        />
        <Button 
          onClick={openCsvUploadModal} 
          className="bg-black text-white hover:bg-gray-800 transition"
        >
          Create New Nft
        </Button>
        {jsonResponse && (
          <div className="mt-4">
            <h3>Uploaded JSON:</h3>
            <pre>{JSON.stringify(jsonResponse.jsonData, null, 2)}</pre>
            <a href={jsonResponse.url} target="_blank" rel="noopener noreferrer">View on IPFS</a>
          </div>
        )}
      </main>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default Home;
