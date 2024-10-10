'use server';

import { PinataSDK } from 'pinata';
import { configDotenv } from 'dotenv';
import { supabaseClient } from './supabase_db';
configDotenv();
import fs from 'fs';



export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

interface JSONPDFile {
  pdf_uri: string;
  project_name: string;
  participating_partners: string[];
  percentage_split: number[];
}


/**
 * Uploads the JSON file from local to the pinata IPFS.
 */
export async function pinJSONFile(
  filepath_pdf: string,
  project_name: string,
  participating_partners: string[],
  percentage_split: number[]
): Promise<string> {

  try {
    // store the input data into the JSONPDFile object
    let json_param : JSONPDFile = {
      pdf_uri: '',
      project_name: project_name,
      participating_partners: participating_partners,
      percentage_split: percentage_split
    } 
    // now convert the object to a JSON string
    let json_string = JSON.stringify(json_param);
    // create the file object from the JSON string
    const fileStream = await fs.readFileSync(json_string);
    const file = new File([fileStream], project_name + '_report.json', {
      type: 'application/json',
    });
    // and then upload it on the pinata 
    const upload =  


  }

  catch (error) {
    console.log(error);
    return '';
  }



}



/**
 * Uploads the PDF file from local to the pinata IPFS pdf.
 */

interface PDFUploadedProps {
  fileCID: string;
  uploaded_time: string;
}
export async function pinPDFile(
  filepath: string,
  project_name: string
): Promise<PDFUploadedProps> {
  // parsing the local filepath in order to upload it as an object
  try {
    // creating the file object from filepath
    const fileStream = await fs.readFileSync(filepath);

    const file = new File([fileStream], project_name + '_report.pdf', {
      type: 'application/pdf',
    });

    const upload = await pinata.upload.file(file, {
      metadata: {
        name: project_name + '_report.pdf',
      },
      keys: project_name,
    });

    console.log('file uploaded with object info' + upload);
    const value: PDFUploadedProps = {
      fileCID: upload.cid,
      uploaded_time: upload.created_at,
    };
    return value;
  } catch (error) {
    console.log(error);
    return {
      fileCID: '',
      uploaded_time: '',
    };
  }
}

// fetching the file CID from the Pinata IPFS given the cid of the file
export async function fetchPDFURI(project_name: string): Promise<string> {
  try {
    const file = await pinata.files.list().cid(project_name);
    return file['files'][0].cid;
  } catch (error) {
    console.log(error);
    return '';
  }
}
