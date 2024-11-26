import { supabaseClient } from 'src/utils/supabase_db';
import { Wallet, Client } from 'xrpl';
import uuid4 from "uuid4";


interface UserSession {
  user_id: string;
  wallet_address: string;
  email_address: string;
  balance: string;
  wallet_obj: Wallet
}

const client = new Client("wss://s.altnet.rippletest.net:51233");

async function addDemoData(userSessions: UserSession[]) {
  try {
    await client.connect();

    for (const session of userSessions) {
        // Create a new wallet
        const user_wallet = Wallet.generate();
        session.wallet_obj = user_wallet;
        session.wallet_address = user_wallet.address;
      // Fund the wallet with the specified balance
      const { wallet } = await client.fundWallet(user_wallet, {
        amount: session.balance,
      });
      session.wallet_address = wallet.address;

      // Add the user session to the database
      const { data, error } = await supabaseClient
        .from('Clients').insert(
            {
                client_name: session.user_id,
                wallet_address: session.wallet_address,
                email_address: session.email_address,
            }
        );

      if (error) {
        console.error('Error adding user session:', error);
      } else {
        console.log('User session added:', data);
      }
    }

    await client.disconnect();
  } catch (error) {
    console.error('Error setting up demo data:', error);
  }
}

export { addDemoData,type UserSession };