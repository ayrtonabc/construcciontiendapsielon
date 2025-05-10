import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';



export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

//For generate the types    
// supabase gen types typescript --project-id abcdefghijklmnopqrst > database.types.ts 
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
