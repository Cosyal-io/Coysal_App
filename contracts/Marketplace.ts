import {  Client, Wallet , Transaction, xrpToDrops, NFTokenMint, NFToken,NFTokenMintFlagsInterface  } from "xrpl";
import {fetchPDFURI} from "src/utils/pinata_upload"
interface ImpactNFTGenerationProps {
    quantity: number;
    pdf_storage_reference: string,
    whitelisted_address: string[], // those who are associated with the given project
    corresponding_nfts: NFToken[],
    issuer: string,
    project_name: string
}

class NFTMarketplace {
    private admin_address: string;
    private client: Client;
    constructor(admin_address: string, client: Client) {
        this.admin_address = admin_address;
        this.client = client;
    }
    async generateNFTCerts(
        inputtParams: ImpactNFTGenerationProps
    ) {

        try {
            inputtParams.issuer = this.admin_address;
            inputtParams.pdf_storage_reference = "ipfs://" + fetchPDFURI(inputtParams.project_name);
            const {quantity, pdf_storage_reference, whitelisted_address, corresponding_nfts, issuer} = inputtParams;
            // fetching the pdf uri from the pinata ipfs
            const pdf_uri = await fetchPDFURI(pdf_storage_reference);
            
            // now we are going to mint the nfts
            const nfts = await Promise.all(
                whitelisted_address.map(async (address) => {
                    const nft: NFTokenMint  =  {
                        Account: issuer,
                        TransferFee: 0, 
                        URI: pdf_uri,
                        Flags: 0,
                        Issuer: issuer,
                        NFTokenTaxon: 0,
                        Flags: {
                            tfBurnable: true,
                            tfTransferable: true,
                            tfTrustLine: true,
                        }.

                }

        })
            
        )
    }
        catch(e) {
            console.log(e);
        }


    }




}