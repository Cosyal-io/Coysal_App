import PalisadeWallet   from "@/contracts/utils/palisade_wallet";
import { env } from "@/env";

const config = {
    baseUrl: 'https://api.sandbox.palisade.co',
    clientId: env.PALISADE_CLIENT_ID,
    clientSecret: env.PALISADE_CLIENT_SECRET,
};

async function run() {
    const wallet = new PalisadeWallet(config);

    try {
        const vaultParams = { name: 'Test Vault', description: 'Test Vault Description' };
        const createUserResponse = await wallet.getValidationToken();
        console.log('Create User Response:', createUserResponse.data);

        // Uncomment the following lines to run additional operations

        // const getUserResponse = await wallet.getUser('1');
        // console.log('Get User Response:', getUserResponse.data);

        // const updateUserResponse = await wallet.updateUser('1', { email: 'new-email@example.com' });
        // console.log('Update User Response:', updateUserResponse.data);

        // const deleteUserResponse = await wallet.deleteUser('1');
        // console.log('Delete User Response:', deleteUserResponse.data);

        // const listUsersResponse = await wallet.listUsers();
        // console.log('List Users Response:', listUsersResponse.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
