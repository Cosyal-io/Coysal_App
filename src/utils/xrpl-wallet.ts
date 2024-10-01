import { Wallet, Transaction, Client,  NFTokenMint} from "xrpl";
import {configDotenv, config} from "dotenv"
import path from "path"
configDotenv()


console.log(config().parsed)

class XrplWalletWrapper {
  private client: Client;

  constructor() {
    this.client = new Client(process.env.NEXT_PUBLIC_XRPL_URL!);
  }


  // sending agnostic transaction by the xrpl library
  public async sendNftTransaction(transaction: NFTokenMint ) {
    // Implement transaction sending logic here
        // Check if the transaction is valid
        if (!transaction || typeof transaction !== 'object') {
          throw new Error("Invalid transaction object");
        }
        
    await this.client.connect();
    const preparedTransaction = await this.client.prepareTransaction(transaction);
    const result = this.client.submit(preparedTransaction);
    return result;
  }
}

export const xrplWallet = new XrplWalletWrapper();
