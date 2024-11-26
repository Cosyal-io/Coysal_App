import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { configDotenv } from 'dotenv';
configDotenv();
// Define the schema for server-side environment variables

// Create the environment configuration
const env = createEnv({
    server: {
            DATABASE_URL: z.string().url(),
            SECRET_KEY: z.string(),
            SUPABASE_URL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_API_URL: z.string().url(),
        NEXT_PUBLIC_API_KEY: z.string(),
        NEXT_PUBLIC_XRPL_URL: z.string().url(),    

    },

    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        SECRET_KEY: process.env.SECRET_KEY,
        SUPABASE_URL: process.env.SUPABASE_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        NEXT_PUBLIC_XRPL_URL: process.env.NEXT_PUBLIC_XRPL_URL,
    },

});


export default {env};



