
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dwiyjfmtdvznkmpuyvow.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aXlqZm10ZHZ6bmttcHV5dm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NDk5NTAsImV4cCI6MjA1NjEyNTk1MH0.poLapC4Y3NO_mX-rCgtnpGuYwXe9vcTMM-tel7O9LmU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
