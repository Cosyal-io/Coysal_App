import csv from "csv-parser"; // Import csv-parser for reading CSV files
import { Readable } from "stream"; // Import Readable for stream handling

//create the function that uploads the json file (from the nextjs page) to pinata

import { NextRequest, NextResponse } from "next/server";
import { pinata } from "src/utils/pinata_upload";


  // export const config = {
  //   api: {
  //     bodyParser: false,
  //   },
  // };
  
  export async function POST(request: NextRequest) {
    try {
      const data = await request.formData();
      const file: File | null = data.get("file") as File;
  
      // Read CSV and convert to JSON
      const jsonData = await new Promise((resolve, reject) => {
        const results: any[] = [];
        
        // Create a FileReader to read the file as text
        const reader = new FileReader();
        reader.onload = async (event) => {
          const csvData = event.target?.result; // Get the CSV data as text
          const stream = Readable.from(csvData as Iterable<any>); // Create a readable stream from the CSV data
  
          stream
            .pipe(csv())
            .on("data", (data: any) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (error: any) => reject(error));
        };
  
        reader.onerror = (error) => reject(error);
        reader.readAsText(file); // Read the file as text
      });
  
      const uploadData = await pinata.upload.json(jsonData as object); // Upload JSON to IPFS
      const url = await pinata.gateways.createSignedURL({
        cid: uploadData.cid,
        expires: 3600,
      });
      return NextResponse.json(url, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }