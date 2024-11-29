import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { configDotenv } from 'dotenv';
configDotenv();
// Define the schema for server-side environment variables

// Create the environment configuration
export const env = createEnv({
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.string().url(),   

    },

    server: {
        PALISADE_CLIENT_ID: z.string(),
        PALISADE_CLIENT_SECRET: z.string()

    },


    runtimeEnv: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        PALISADE_CLIENT_ID: process.env.PALISADE_CLIENT_ID,
        PALISADE_CLIENT_SECRET: process.env.PALISADE_CLIENT_SECRET
    },

});


export default {env};



