import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = "https://wusbcaffjonhexqrabzk.supabase.co";
  const supabaseAnonKey = "sb_publishable_5RQHh-f6_dVKyXUy--23aA_RT6-S74E";

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}
