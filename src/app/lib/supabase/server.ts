import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const supabaseUrl = "https://wusbcaffjonhexqrabzk.supabase.co";
  const supabaseAnonKey = "sb_publishable_5RQHh-f6_dVKyXUy--23aA_RT6-S74E";


  return createServerClient(
    supabaseUrl, supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore in Server Components if cookies can't be set here.
          }
        },
      },
    }
  );
}
