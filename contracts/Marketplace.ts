import {
  Client,
  Wallet,
  xrpToDrops,
  NFTokenMint,
  NFToken,
  SubmittableTransaction,
  AccountNFTsRequest,
  AccountNFTsResponse,
  NFTokenCreateOffer,
  NFTokenAcceptOffer,
  Payment,
  NFTBuyOffersRequest,
  NFTBuyOffersResponse,

} from 'xrpl';

import { fetchPDFURI } from 'src/utils/pinata_upload';
import { supabaseClient } from 'src/utils/supabase_db';
import { Database } from 'src/utils/database_types';




interface ImpactNFTGenerationProps {
  quantity: number;
  pdf_storage_reference: string;
  corresponding_nfts: NFToken[];
  issuer: string;
  project_name: string;
  percentage_split: number[];
  participants_address: string[];
}


class NFTMarketplace {
  private admin_address: string;
  // // storage of the given generated NFT's that are created by the admin as a mapping to its NFTId
  // private NFTStorage: Map<string, NFToken> = new Map<string, NFToken>();
  // also storing the bids of the given .
  private Client: Client;
  constructor(admin_address: string, client: Client) {
    this.admin_address = admin_address;
    this.Client = client;
  }

  /**
   * approves  innvestor wallets for the investments for the given NFT's
   *   @param whitelistedAddress an array of addresses that are to be whitelisted by the admin for the offer creation.
   */
  async AddApproveWhitelistedAddress(
    whitelisted_address: string[],
    issuer_address: string,
    nft_id: number
  ) {
    try {
      // first try to find the current whitelisted address for the given nft_id
      const nfts = await supabaseClient
        .from('NFT_certs')
        .select('whitelisted_transferrable_addresses')
        .eq('nft_id', nft_id);
      // then add the additional address to the current existing array.
      let totalWhitelistedAddresses: string[] | null = null;
      if (
        nfts.data &&
        nfts.data[0] &&
        nfts.data[0].whitelisted_transferrable_addresses
      ) {
        totalWhitelistedAddresses =
          nfts.data[0].whitelisted_transferrable_addresses.concat(
            whitelisted_address
          );
      } else {
        totalWhitelistedAddresses = whitelisted_address;
      }

      // apend the approval address for the given address along with the nft_id
      const { data, error } = await supabaseClient.from('NFT_certs').update({
        id: nft_id,
        owner: issuer_address,
        whitelisted_transferrable_addresses: totalWhitelistedAddresses,
      });

      if (data) {
        console.log('the query is executed successfully ' + data);
      }
      else {
        console.log('the query is not executed successfully ' + error);
      }

    } catch (e) {
      console.error('AddApproveWhitelistedAddress error ' + e);
    }
  }


  async generateNFTCerts(inputtParams: ImpactNFTGenerationProps) {
    try {
      inputtParams.issuer = this.admin_address;
      inputtParams.pdf_storage_reference =
        'ipfs://' + fetchPDFURI(inputtParams.project_name);
      const {
        quantity,
        pdf_storage_reference,
        corresponding_nfts,
        issuer,
      } = inputtParams;
      // fetching the pdf uri from the pinata ipfs
      const pdf_uri = await fetchPDFURI(pdf_storage_reference);
      // now we are going to mint the nfts in the loop, passing the parameters
      for (let i = 0; i < quantity; i++) {
        const nftMintParams: NFTokenMint = {
          TransactionType: 'NFTokenMint',
          Account: corresponding_nfts[i].owner,
          Flags: {
            tfTransferable: false,
          },
          Issuer: issuer,
          NFTokenTaxon: corresponding_nfts[i].nft_taxon,
          URI: pdf_uri,
          TransferFee: 0,
          
        };
        const transaction: SubmittableTransaction =
          await this.Client.prepareTransaction(nftMintParams);
        const signedTransaction = await this.Client.submitAndWait(transaction);
        console.log('transaction has been submitted with the hash:' + (signedTransaction).result.hash + " and on block:" + (signedTransaction).result.ledger_index);
        
      }
    } catch (e) {
      console.error('generateNFTCert error ' + e);
    }
  }
  async getAllNFTCertsOfAccount(
    account_address: string
  ): Promise<AccountNFTsResponse | null> {
    // fetch all of the NFT's that are created by the given admin on XRPL.
    try {
      const nftAccountParams: AccountNFTsRequest = {
        account: account_address,
        command: 'account_nfts',
      };
      const nfts: AccountNFTsResponse =
        await this.Client.request(nftAccountParams);
      return nfts;
    } catch (error) {
      console.error('getAllNFTCerts error ' + error);
      return null;
    }
  }
  /**
   * function allowing the whitelisted addresses to create the buy offer for the given NFT's
   * @param address the address of the investor who is willing to buy the NFT
   * @param nft_id the id of the NFT that is to be bought
   * @param price the bidding price of the NFT that is to be bought
   * @param expiration_time the expiration time of the offer (should be less than the specific time period of selling impact credits)
   */
  async createTokenNFTSellOffer(
    address: string,
    nft_id: number,
    price: number,
    expiration_time: number
  ) {
    // only allow to run this function if the address belongs to the whitelisted address for the given NFT.
    try {
      // check if the address is in the whitelisted_transferrable_addresses for the given nft_id
      const nfts = await supabaseClient
        .from('NFT_certs')
        .select('whitelisted_transferrable_addresses')
        .eq('nft_id', nft_id);
      if (
        nfts.data &&
        nfts.data[0] &&
        nfts.data[0].whitelisted_transferrable_addresses?.includes(address)
      ) {
        const buyOfferParams: NFTokenCreateOffer = {
          TransactionType: 'NFTokenCreateOffer',
          NFTokenID: nft_id.toString(),
          Amount: xrpToDrops(price),
          Expiration: expiration_time,
          Account: address,
        };
        const transaction: SubmittableTransaction =
          await this.Client.prepareTransaction(buyOfferParams);
        const signedTransaction = this.Client.submitAndWait(transaction);
        console.log(
          'transaction submitted with the blockhash' +
            (await signedTransaction).result.hash +
            ' and the transaction id ' +
            (await signedTransaction).result.ledger_index
        );
      }
    } catch (e) {
      console.error('createTokenNFTSellOffer error ' + e);
    }
  }
  /**
   *
   * @abstract this function is called by the admin to accept the bid that is being accepted by the investor.
   * @param nft_id the id of the NFT that is being bought by the investor
   * @param address the address of the investor who has approved the given bid
   * @param offer_id the id of the offer that is being accepted by the investor
   */
  async acceptTokenNFTBuyOffer(
    nft_id: string,
    address: string,
    offer_id?: string
  ): Promise<any> {
    {
      try {
        // test if the given offer_id expiration date has not passed.
        // populate the parameters for the NFTBuyOffer
        const buyOfferParams: NFTokenAcceptOffer = {
          TransactionType: 'NFTokenAcceptOffer',
          NFTokenBuyOffer: offer_id,
          Account: address,
        };

        // prepare the transaction for the given offer
        const transaction: SubmittableTransaction =
          await this.Client.prepareTransaction(buyOfferParams);
        // submit the transaction
        const signedTransaction = this.Client.submitAndWait(transaction);
        console.log(
          'transaction submitted with the blockhash' +
            (await signedTransaction).result.hash +
            ' and the transaction id ' +
            (await signedTransaction).result.ledger_index
        );
        // also show the fact that the given address has received the NFT
        // fetch only the recent one that is being bought by the given address
        this.getAllNFTCertsOfAccount(address).then((nfts) => {
          // fetch the latest nft that is being bought by the given address out of generated response
          const latest_nft = nfts?.result.account_nfts[0];
          console.log(
            'the latest nft that is bought by the given address is ' +
              latest_nft
          );
        });

        // and now doing the payment to the partners that are registered to the given NFT project

        // storing the result of the new owner in the database
        const { data, error } = await supabaseClient
          .from('NFT_certs')
          .update({ owner: address, nft_id: nft_id })
          .eq('nft_id', nft_id);

          console.log("the query is executed successfully " + data);

      } catch (error) {
        console.error('acceptTokenNFTBuyOffer error ' + error);
        return null;
      }
    }
}

/**
 * @abstract this function returns all the buy offers of the given NFT that are being bought by the investors
 * @param nft_id the id of the NFT that is being bought by the investor
 * @returns the list of all the buy offers of the given NFT
 */
 async getAllBuyOffers(nft_id: string): Promise<NFTBuyOffersResponse | null> {

    try {
        // populate the parameters for the NFTBuyOffersRequest
        const buyOffersParams: NFTBuyOffersRequest = {
            command: 'nft_buy_offers',
            nft_id: nft_id
        };
        // fetch the buy offers for the given NFT
        const buyOffers: NFTBuyOffersResponse = await this.Client.request(buyOffersParams);
        return buyOffers;
    }
    catch (e) {
        console.error('getAllBuyOffers error ' + e);
        return null;
    }

 }

/**
 * @abstract does the batch payments to the partner wallets assigned for the given NFT's. 
 * @description its done with the finishing of the approval of the buy offer of the given NFT's.
 * @param nft_id the id of the NFT that is being bought by the investor
 * @param bid_amount the amount that is being paid by the investor for the given NFT
 * @param percentage_split the percentage split (out of 100) of the amount that is to be paid to the partners
 * 
 */
async payThePartners(nft_id: string,  bid_amount: number,  percentage_split: number[], participants_address: string[]) {

    // 
    let partnerPayments: Payment[] = [];
    let transaction: SubmittableTransaction[] = [];

    try {
        // creating the Payment objects for the multiple partners based on the percentage split 
        for (let i = 0; i < percentage_split.length; i++) {
            partnerPayments.push({
                TransactionType: 'Payment',
                Destination: participants_address[i],
                Account: '',
                Amount: xrpToDrops(bid_amount * (percentage_split[i] / 100))
            })
            transaction.push(await this.Client.prepareTransaction(partnerPayments[i]));

            // and then submit the transaction for the given partner
            const signedTransaction = this.Client.submitAndWait(transaction[i]);
            console.log('transaction submitted with the blockhash' + (await signedTransaction).result.hash + ' and the block id ' + (await signedTransaction).result.ledger_index);
        }
    
    }
    catch (e) {
        console.error('payThePartners error ' + e);
    }




        
}





}
