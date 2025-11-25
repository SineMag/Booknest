import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const SUPABASE_DATABASE_URL = process.env.SUPABASE_DATABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_DATABASE_URL || !SUPABASE_ANON_KEY)
  throw new Error("Supabase env missing");

// Create Supabase client
export const supabase = createClient(SUPABASE_DATABASE_URL, SUPABASE_ANON_KEY);
