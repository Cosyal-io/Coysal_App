'use server';
import { createClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';
import { Database } from 'src/utils/database_types';
configDotenv();
export const supabaseClient = createClient<Database>(
  process.env.SUPABASE_DB!,
  'public-anon-key'
);
