"use server"
import { createClient } from '@supabase/supabase-js'
import {configDotenv} from "dotenv"
configDotenv()
export const supabaseClient = createClient( process.env.SUPABASE_DB! , 'public-anon-key')