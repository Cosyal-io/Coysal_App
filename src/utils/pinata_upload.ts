'use server';

import { PinataSDK } from 'pinata';
import { configDotenv } from 'dotenv';
import { supabaseClient } from './supabase_db';
configDotenv();
import fs from 'fs';
import path from 'path';

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

export interface JSONPDFile {
  pdf_uri: string;
  project_name: string;
  participating_partners: string[];
  percentage_split: number[];
  key_mapping: [string, string][]; // Array of tuples (privateKey, publicKey)
}

interface PDFUploadedProps {
  fileCID: string;
  uploaded_time: string;
}

/**
 * Validates the input file path.
 */
function validateFilePath(filepath: string): boolean {
  return fs.existsSync(filepath) && path.isAbsolute(filepath);
}

/**
 * Uploads the JSON file from local to the pinata IPFS.
 */
export async function pinJSONFile(
  filepath_pdf: string,
  project_name: string,
  participating_partners: string[],
  percentage_split: number[],
  key_mapping: [string, string][]
): Promise<string> {
  try {
    if (!validateFilePath(filepath_pdf)) {
      throw new Error('Invalid file path');
    }

    // Store the input data into the JSONPDFile object
    const json_param: JSONPDFile = {
      pdf_uri: filepath_pdf,
      project_name: project_name,
      participating_partners: participating_partners,
      percentage_split: percentage_split,
      key_mapping: key_mapping,
    };

    // Convert the object to a JSON string
    const json_string = JSON.stringify(json_param);

    // Create the file object from the JSON string
    const file = new File([Buffer.from(json_string)], project_name + '_report.json', {
      type: 'application/json',
    });

    // Upload it on Pinata
    const upload = await pinata.upload.file(file, {
      metadata: {
        name: project_name + '.json',
      },
      keys: project_name,
    });

    console.log('File uploaded with object info ' + upload.cid);
    return upload.cid;
  } catch (error) {
    console.log(error);
    return '';
  }
}

/**
 * Fetches the JSON file from the Pinata IPFS given the CID of the file and then returns the metadata details.
 */
export async function fetchJSONFileParameters(project_name: string): Promise<JSONPDFile> {
  try {
    // Fetch the CID corresponding to the given project_name
    const cid = await pinata.files.list().name(project_name);

    const file = await pinata.gateways.get(cid['files'][0].cid);

    // Reading the JSON file from the JSON object
    const fileJSON = JSON.parse(file.data as string);

    // Convert this into the JSON file format
    const fileJSONString: JSONPDFile = {
      pdf_uri: fileJSON.pdf_uri,
      project_name: fileJSON.project_name,
      participating_partners: fileJSON.participating_partners,
      percentage_split: fileJSON.percentage_split,
      key_mapping: fileJSON.key_mapping,
    };

    return fileJSONString;
  } catch (error) {
    console.log(error);
    return {
      pdf_uri: '',
      project_name: '',
      participating_partners: [],
      percentage_split: [],
      key_mapping: [],
    };
  }
}

/**
 * Uploads the PDF file from local to the Pinata IPFS.
 */
export async function pinPDFile(
  filepath: string,
  project_name: string
): Promise<PDFUploadedProps> {
  try {
    if (!validateFilePath(filepath)) {
      throw new Error('Invalid file path');
    }

    // Creating the file object from filepath
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

    console.log('File uploaded with object info ' + upload);
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

/**
 * Fetches the URL of the file from Pinata IPFS.
 * @param project_name 
 * @returns the URL
 */
export async function fetchURL(project_name: string): Promise<string> {
  try {
    const file = await pinata.files.list().name(project_name);
    // Getting actual gateway URL of the file
    const fileURL = await pinata.gateways.createSignedURL({
      cid: file['files'][0].cid,
      expires: 10000000000000000000000, // TODO: this is essentially a long time for the NFT lifecycle, but indeed can be adapted to the use case
    });
    return fileURL;
  } catch (error) {
    console.log(error);
    return '';
  }
}
