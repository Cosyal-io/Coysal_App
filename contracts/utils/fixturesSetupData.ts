import { addDemoData, UserSession } from './setupTestData';
import { Wallet, Client } from 'xrpl';

const client = new Client("wss://s.altnet.rippletest.net:51233");

async function createTestUsers(count: number) {
  try {
    await client.connect();

    const userSessions: UserSession[] = [];

    for (let i = 0; i < count; i++) {
      const { wallet } = await client.fundWallet();
      userSessions.push({
        user_id: `user_${i}`,
        wallet_address: wallet.address,
        balance: '1000', // Set an arbitrary balance
        wallet_obj: wallet,
        email_address: ''
      });
    }
    await addDemoData(userSessions);

    await client.disconnect();
  } catch (error) {
    console.error('Error creating test users:', error);
  }
}

export { createTestUsers };