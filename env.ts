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

    runtimeEnv: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    },

});


export default {env};



