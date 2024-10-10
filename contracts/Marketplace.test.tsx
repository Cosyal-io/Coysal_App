import { Client, SubmittableTransaction, Wallet } from "xrpl";
import { NFTMarketplace } from "./Marketplace";
import {fetchURL, pinPDFile, pinJSONFile, JSONPDFile, fetchJSONFileParameters, pinata } from "src/utils/pinata_upload";
// todo: here i am simulating the wallets for the given recipients via the web3auth, but in reality this will be done by the actual wallets of the recipients.
// import { CHAIN_NAMESPACES, CustomChainConfig, IProvider, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider";

// jest.mock("src/utils/pinata_upload");
// jest.mock('src/utils/supabase_db');

describe("Marketplace", () => {
    let adminWallet: Wallet;
    let clientWallets: Wallet[];
    let participantWallets: Wallet[];
    const client = new Client("wss://s.altnet.rippletest.net:51233");



    const generateWallets = async (count: number): Promise<Wallet[]> => {
      const wallets = [];
      for (let i = 0; i < count; i++) {
        const { wallet } = await client.fundWallet();
        wallets.push(wallet);
      }
      return wallets;
    };


    const performTransaction = async (wallet: Wallet, transaction: SubmittableTransaction) => {
      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
      const prepared = await client.autofill(transaction);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      await client.disconnect();
      return result;
    };

  
    beforeAll(async () => {
        await client.connect();
        [adminWallet, ...clientWallets] = await generateWallets(4); // 1 admin + 3 clients + 
        participantWallets = await generateWallets(5) //5 for the participants 
      });
    
      afterAll(async () => {
        await client.disconnect();
      });
    
    //   beforeEach(async () => {
    //   });
    
    //     afterEach(async () => {
    //       //  await client.disconnect();
    //     });

    it("should pass the PDF along with the wallet keys ", async () => {
        let project_name = "test_engie";
        // uploading the pdf file to the pinata
        const pdfUploadCID = (await pinPDFile("./engie_report.pdf", project_name)).fileCID;
        expect(pdfUploadCID).toBeDefined();

        // getting the pdf url 
        const pdfURL = await fetchURL(project_name);
        // checking if the url is valid
        const response = await fetch(pdfURL);
        expect(response.status).toBe(200);

        const fileJSON: JSONPDFile = {
            pdf_uri: pdfURL,
            project_name: project_name,
            participating_partners: ["engie", "suez"],
            percentage_split: [20, 20,20,20,20],
            key_mapping: [[participantWallets[0].address, participantWallets[0].seed!], 
            [participantWallets[1].address, participantWallets[1].seed!],
            [participantWallets[2].address, participantWallets[2].seed!],
            [participantWallets[3].address, participantWallets[3].seed!],
            [participantWallets[4].address, participantWallets[4].seed!],
        ],
        };
        
        // uploading the JSON file to the pinata

        const jsonUploadCID = await pinJSONFile(pdfURL,project_name,fileJSON.participating_partners, fileJSON.percentage_split, fileJSON.key_mapping);
        
        // generates  the signed URL from the pinata
        const jsonURL = pinata.gateways.createSignedURL({cid: jsonUploadCID, expires: 100000000});
        expect(jsonURL).toEqual(expect.stringContaining("pinata.cloud"));        
    });


});

