import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://giicbzxmbtrzqtdlseqf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpaWNienhtYnRyenF0ZGxzZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NDY4NzYsImV4cCI6MjA1MTQyMjg3Nn0.viO9vOsRnNtuzb63IcFTxuAS_1wkupM5Mm6pgn9XhE8';

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string,
);
