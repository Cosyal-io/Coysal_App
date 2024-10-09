import { Client,  NFTOffer,  NFTokenMint  } from "xrpl";
//import {Transaction, AccountInfoRequest, TransactionMetadata} from "xrpl"
import {configDotenv, config} from "dotenv"
// import {XrplPrivateKeyProvider} from "@web3auth/xrpl-provider";
// import {CHAIN_NAMESPACES,  IProvider, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { AuthAdapter } from "@web3auth/auth-adapter";
// import { Web3AuthNoModal } from "@web3auth/no-modal";
// import { convertStringToHex, Payment, xrpToDrops } from "xrpl";

configDotenv()
export interface NFTInputParameters {
  project_name: string
  owner_address: string
  participant_addresses: string[],
  split_payment_percetage: string[], // defines the 
  certificate_equivalent_value: string,
  investor_address: string
}

console.log(config().parsed)

export class XrplWalletWrapper {
  client: Client;
  walletAddress: string;
  constructor( wallet_address: string) {
   // this.provider =   provider
    this.client = new Client(process.env.NEXT_PUBLIC_XRPL_URL!);
    this.walletAddress = wallet_address;
  }

  // async  getAccount(): Promise<any> {
  //   try {
  //     const accounts = await this.provider.request<never, string[]>({
  //       method: "xrpl_getAccounts",
  //     });

  //     if (accounts) {
  //     //  const accInfo: any = await this.provider.request({
  //         method: "account_info",
  //         params: [
  //           {
  //             account: accounts[0],
  //             strict: true,
  //             ledger_index: "current",
  //             queue: true,
  //           },
  //         ],
  //       });
  //       return accInfo;
  //     } else {
  //       console.error("No accounts found, please report this issue.");
  //     }
  //   }
  //   catch(e) {
  //     console.error("in getting console.getAccount message")
  //   }
  // }

  // async getNFTTransactionHistory(
  //   account: string,
  // ): Promise<any> {
  //   await this.client.connect();
  //   let nftBalances: any =  await this.provider.request({
  //     method: "account_nfts",
  //     params: [{
  //       "account": account,
  //       "ledger_index": "validated"
  //     }] 
  //   })
  //   return nftBalances
  // } 
  // // sending agnostic transaction by the xrpl library
  // public async mintTokenNFT(transaction: NFTokenMint ) {
  //   // Implement transaction sending logic here
  //       // Check if the transaction is valid
  //       if (!transaction || typeof transaction !== 'object') {
  //         throw new Error("Invalid transaction object");
  //   }  
  //   await this.client.connect();
  //   transaction.Account = this.walletAddress;
  //   transaction.Flags = 0
  //   const preparedTransaction = await this.client.prepareTransaction(transaction);
  //   const result = this.client.submit(preparedTransaction);
  //   return result;
  // }
  
  // public async defineNFTOffer(transaction: NFTOffer) {
   

  // }

}


