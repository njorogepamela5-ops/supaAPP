import { createClient } from "@supabase/supabase-js";

// Your Supabase project URL and anon key
const supabaseUrl = "https://mozjvtobsibktmndfqoz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vemp2dG9ic2lia3RtbmRmcW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjE2ODcsImV4cCI6MjA3MjE5NzY4N30.R3mfSNrciE_0zQq_qrXJU_sW_ksovGo8oqKnhfBXXYU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project details
const SUPABASE_URL = "https://mozjvtobsibktmndfqoz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vemp2dG9ic2lia3RtbmRmcW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjE2ODcsImV4cCI6MjA3MjE5NzY4N30.R3mfSNrciE_0zQq_qrXJU_sW_ksovGo8oqKnhfBXXYU";

// Create a single supabase client for your app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mozjvtobsibktmndfqoz.supabase.co";
const supabaseAnonKey = "YOUR_ANON_KEY"; // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { supabase } from "../lib/supabaseClient";

supabase
  .from("orders")
  .on("INSERT", (payload) => {
    console.log("New order:", payload.new);
    notifyUser("New Order", `Order #${payload.new.id} received`);
  })
  .subscribe();
// supa-app/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase project URL and anon key
const supabaseUrl = "https://mozjvtobsibktmndfqoz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vemp2dG9ic2lia3RtbmRmcW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjE2ODcsImV4cCI6MjA3MjE5NzY4N30.R3mfSNrciE_0zQq_qrXJU_sW_ksovGo8oqKnhfBXXYU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
