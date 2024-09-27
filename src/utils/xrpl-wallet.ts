import { Wallet, Transaction, Client} from "xrpl";

class XrplWalletWrapper {
  private wallet: Wallet;
  private client: Client;

  constructor() {
    this.wallet = new Wallet(
      process.env.XRPL_ADDRESS!,
      process.env.XRPL_SECRET!
    );
    this.client = new Client(process.env.XRPL_URL!);
  }

  public getWallet() {
    return this.wallet;
  }

  // Add additional wallet functions as needed
  public getAddress() {
    return this.wallet.address;
  }

  public getSecret() {
    return this.wallet.seed;
  }

  // Example function to send a transaction
  public async sendTransaction(transaction: Transaction) {
    // Implement transaction sending logic here
    const client = new Client(process.env.XRPL_URL!);
    await client.connect();
    const preparedTransaction = await client.prepareTransaction(transaction);
    const signedTransaction = this.wallet.sign(preparedTransaction);
    const result = await client.submitTransaction(signedTransaction);
    await client.disconnect();
    return result;
  }
}

export const xrplWallet = new XrplWalletWrapper();
