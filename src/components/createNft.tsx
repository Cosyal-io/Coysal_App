import { useState } from 'react';
import { NFTOffer, NFTokenMint, convertStringToHex } from 'xrpl';
import { XrplWalletWrapper, NFTInputParameters } from 'src/utils/xrpl-wallet';
import { toast } from 'sonner';
import { configDotenv } from 'dotenv';
import { randomInt } from 'crypto';
configDotenv();

//export const xrplWallet = new XrplWalletWrapper({})

export const CreateNft = async (
  NftNames: string,
  NftUri: string,
  AccountOwner: string
) => {
  const [nftName, setNftName] = useState('');
  const [nftUri, setNftUri] = useState('');
  const [] = useState();
  setNftName(NftNames);
  setNftUri(NftUri);

  try {
    //TODO: define the metadata information
    /**
     *  specially the addresses
     *  -
     */
    const transaction: NFTokenMint = {
      TransactionType: 'NFTokenMint',
      NFTokenTaxon: 0,
      Account: AccountOwner, //TODO: integrate the wallet wrapper from the xrpl_wallet_modal.ts file
      Flags: 0,
      URI: convertStringToHex(nftUri),
      Issuer: process.env.ISSUER_ADDRESS!,
    };
    //  const result = await xrplWallet.mintTokenNFT(transaction);
    toast.success('NFT created successfully');
  } catch (e) {
    toast.error('Error creating NFT' + e);
  }
};

export const CreateNFTOffer = async (inputParams: NFTInputParameters) => {
  // try {
  //    const transaction_params: NFTOffer = {
  //     amount: inputParams.certificate_equivalent_value,
  //     flags: 0,
  //     nft_offer_index: randomInt(1000).toString(),
  //     owner: inputParams.owner_address
  //    }
  // }
  // except(e) {
  //     console.error(e)
  // }
};
