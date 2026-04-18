import dotenv from "dotenv";
dotenv.config(); 
import { createClient } from "@supabase/supabase-js";

console.log("URL:", process.env.SUPABASE_URL); 

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default supabase;