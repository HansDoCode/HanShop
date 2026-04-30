// Supabase client initialization
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.0/+esm";

const SUPABASE_URL = "https://cfofyhqozqdfebyvibgn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmb2Z5aHFvenFkZmVieXZpYmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzYxODIsImV4cCI6MjA5MzE1MjE4Mn0.WIteVaI8wRzQM5a0joNOOtWE1WsGSKE0LSnjxT8Rm0M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Supabase on page load
export async function initSupabase() {
  try {
    const { data, error } = await supabase.from("products").select("count");
    if (error) throw error;
    console.log("✓ Supabase connected");
    return true;
  } catch (err) {
    console.error("✗ Supabase connection failed:", err.message);
    return false;
  }
}
