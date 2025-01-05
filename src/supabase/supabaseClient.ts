import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABSE_KEY_URL;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string,
);
