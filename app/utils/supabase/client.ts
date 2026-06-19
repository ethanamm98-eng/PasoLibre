import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = "https://wusbcaffjonhexqrabzk.supabase.co";
const supabaseKey = "sb_publishable_d6HE87EqWdLFYDNNPs5YMA_v7xwrkoG";

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);
