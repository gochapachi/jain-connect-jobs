// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dwiyjfmtdvznkmpuyvow.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aXlqZm10ZHZ6bmttcHV5dm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NDk5NTAsImV4cCI6MjA1NjEyNTk1MH0.poLapC4Y3NO_mX-rCgtnpGuYwXe9vcTMM-tel7O9LmU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);