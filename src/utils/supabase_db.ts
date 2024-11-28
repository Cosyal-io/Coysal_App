'use client';
import { createClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';
import { Database } from 'src/utils/database_types';
import {env} from "@/env"
export const supabaseClient = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL!,
  'public-anon-key'
);
