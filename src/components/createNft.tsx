import {useState} from "react";
import { NFTokenMint } from "xrpl";
import { xrplWallet } from "src/utils/xrpl-wallet";
import { toast } from "sonner";

export const CreateNft = async ( NftNames: string, NftUri: string ) => {
  const [nftName, setNftName] = useState("");
  const [nftUri, setNftUri] = useState("");

  setNftName(NftNames);
  setNftUri(NftUri);

  try {
        const transaction: NFTokenMint = {
            TransactionType: "NFTokenMint",
            NFTokenTaxon: 0,
            Account: "", //TODO: integrate the wallet wrapper from the xrpl_wallet_modal.ts file
            Flags: 0,
            URI: nftUri,
        }
        const result = await xrplWallet.sendNftTransaction(transaction);
        toast.success("NFT created successfully");
        }
    catch (error) {
        toast.error("Error creating NFT");
    }

};
