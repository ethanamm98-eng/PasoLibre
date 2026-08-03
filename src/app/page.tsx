import { createClient } from "@supabase/supabase-js";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SmoothSection from "./components/SmoothSection";

import HeroSection from "./components/HomePageHero";
import AboutSection from "./components/HomePageAbout";
import AboutGoFundSection from "./components/DonationSection";
import AboutInstagramSection from "./components/AboutPageSocials";
import SocialCommunitySection from "./components/SocialCommunitySection";
import AnnouncementHeroOverlay from "./components/AnnouncementHeroOverlay";
import WhatWeDoSection from "./components/HomePageWhatWeDo";

/*
 * Always render this page at request time.
 * This prevents old announcement data from being served
 * from Next.js's route cache.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },

    global: {
      headers: {
        /*
         * Prevent intermediary HTTP caches from reusing
         * an old PostgREST response.
         */
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    },
  });
};

export default async function App() {
  const supabase = createSupabaseClient();
  const now = new Date().toISOString();

  const { data: announcements, error: announcementsError } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .eq("show_on_home", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("created_at", {
      ascending: false,
    });

  if (announcementsError) {
    console.error("Unable to load homepage announcements:", {
      message: announcementsError.message,
      details: announcementsError.details,
      hint: announcementsError.hint,
      code: announcementsError.code,
    });
  }

  /*
   * An error should never preserve previously loaded data.
   * Pass an empty array when the current query has no results
   * or fails.
   */
  const activeAnnouncements =
    !announcementsError && Array.isArray(announcements) ? announcements : [];

  return (
    <div>
      <NavBar />

      <div className="relative">
        <HeroSection />

        {activeAnnouncements.length > 0 && (
          <AnnouncementHeroOverlay announcements={activeAnnouncements} />
        )}
      </div>

      <AboutSection />

      <SmoothSection>
        <WhatWeDoSection />
      </SmoothSection>

      <SmoothSection>
        <AboutGoFundSection />
      </SmoothSection>

      <SmoothSection>
        <AboutInstagramSection />
      </SmoothSection>

      <SmoothSection>
        <SocialCommunitySection />
      </SmoothSection>

      <Footer />
    </div>
  );
}
