import { createClient } from '@supabase/supabase-js'

// pull in values from environment for deployment
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eryeaaomkkzyyklnfaxa.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeWVhYW9ta2t6eXlrbG5mYXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTE0NDUsImV4cCI6MjA4ODM4NzQ0NX0.WxLQQuvWLcQLfMYJ4cqj3YM9GtHsMiRVt5Dt4IK1o5c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)