import { Client, SubmittableTransaction, Wallet } from "xrpl";
import { NFTMarketplace, ImpactNFTGenerationProps } from "./Marketplace";
import {fetchURL, pinPDFile, pinJSONFile, JSONPDFile, fetchJSONFileParameters, pinata } from "src/utils/pinata_upload";
import { createTestUsers } from "@/contracts/utils/fixturesSetupData";
// todo: here i am simulating the wallets for the given recipients via the web3auth, but in reality this will be done by the actual wallets of the recipients.
// import { CHAIN_NAMESPACES, CustomChainConfig, IProvider, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider";

// jest.mock("src/utils/pinata_upload");
// jest.mock('src/utils/supabase_db');

describe("Marketplace", () => {
    let adminWallet: Wallet;
    let clientWallets: Wallet[];
    let participantWallets: Wallet[];
    let marketplace: NFTMarketplace;
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
      marketplace = new NFTMarketplace(adminWallet.address, client);

      // Create test users
      await createTestUsers(10); // Create 10 test users
    });
  
    afterAll(async () => {
      await client.disconnect();
    });
 
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


    it("issues the NFT and then adds the whitelisted address on the marketplace", async () => {
        
        const input_nft_param: ImpactNFTGenerationProps = {
            quantity: 1,
            pdf_storage_reference: "https://gateway.pinata.cloud/ipfs/QmZ",
            project_name: "test_engie",
            percentage_split: [50, 50],
            participants_address: [participantWallets[0].address, participantWallets[1].address],
            issuer: adminWallet.address,
            corresponding_nfts: [
                {
                    nft_taxon: 1,
                    issuer: adminWallet.address,
                    transfer_fee: 0,
                    uri: "https://gateway.pinata.cloud/ipfs/QmZ",
                    nft_id: "ISN0001",
                    owner: adminWallet.address,
                    is_burned: false,
                    flags: 0,
                    nft_serial: 1,
                    ledger_index: await client.getLedgerIndex()
                }
            ]
        }
        expect(await marketplace.generateNFTCerts(input_nft_param)).toBe(true);
        const transaction = marketplace.AddApproveWhitelistedAddress([participantWallets[0].address, participantWallets[1].address], adminWallet.address, 10);
        // const result = await performTransaction(adminWallet, transaction);
        //expect(transaction);
    });


});

