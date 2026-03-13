import { createClient } from "@supabase/supabase-js";
const SUPA_URL = "https://flfjlaaajsdzbhldgvso.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZmpsYWFhanNkemJobGRndnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NjQ1MzcsImV4cCI6MjA4ODQ0MDUzN30.ka2SSllYgDF4cgGkJfw4cMUac8z3OkpmZC4JF_umCIQ";
export const supabase = createClient(SUPA_URL, SUPA_KEY);
