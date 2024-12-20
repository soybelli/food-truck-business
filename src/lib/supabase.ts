import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://nhcvbybrekeljwjewkxo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oY3ZieWJyZWtlbGp3amV3a3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NzU0MTMsImV4cCI6MjA0ODM1MTQxM30.c1LO097JRXfRXDnVC0KjGYV7C3kY1VfvvV0dva-TFE8';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);