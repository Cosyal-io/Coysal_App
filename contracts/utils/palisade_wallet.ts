import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { z } from 'zod';
interface PalisadeConfig {
    clientId: string;
    clientSecret: string;
    baseUrl: string;
}

export const VaultSchema = z.object({
    name: z.string(),
    description: z.string().max(50, "Description should be less than 50 words"),
});

export type Vault = z.infer<typeof VaultSchema>;


class PalisadeWallet {
    private api: AxiosInstance;
    private config: PalisadeConfig;
    private oauthToken: string;
    constructor(config: PalisadeConfig) {

        this.config = config;
        this.api = axios.create({
            baseURL: config.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        });
        this.oauthToken = '';
    }

    async getValidationToken() {
        try {
            const response = await axios.post(`${this.config.baseUrl}/v2/credentials/oauth/token`, {
                clientId: this.config.clientId,
                clientSecret: this.config.clientSecret,
            }, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                },
            });
            this.oauthToken = response.data.access_token;
            return response.data.access_token ;
        } catch (error) {
            this.handleError(error);
        }
    }


    // Method to initialize the API with the access token
    // private async initializeApi() {
    //     const token = await this.getValidationToken();
    //     this.api.defaults.headers['Authorization'] = `Bearer ${token}`;
    // }

    // creating the vaults 
    async createVault(vault: Vault) {
        this.oauthToken = await this.getValidationToken();
        try {
            const response = await this.api.post(`${this.config.baseUrl}/v2/vaults`, vault, 
                {
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${this.oauthToken}`
                    }
                });
                console.log()
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Example method to get a user by ID
    async getUser(userId: string): Promise<AxiosResponse> {
      return this.api.get(`/users/${userId}`);
    }

    // Example method to update a user
    async updateUser(userId: string, user: Partial<Vault>): Promise<AxiosResponse> {
        return this.api.put(`/users/${userId}`, user);  
        
    }

    // Example method to delete a user
    async deleteUser(userId: string): Promise<AxiosResponse> {
      return this.api.delete(`/users/${userId}`);
    }

    // Example method to list all users
    async listUsers(): Promise<AxiosResponse> {
    return this.api.get('/users');   
    
    
    }

    // Handle API errors
    private handleError(error: any): void {
        if (axios.isAxiosError(error)) {
            console.error('API error:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export default PalisadeWallet;