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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function App() {
  const now = new Date().toISOString();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .eq("show_on_home", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("created_at", { ascending: false });

  return (
    <div>
      <NavBar />

      <div className="relative">
        <HeroSection />
        <AnnouncementHeroOverlay announcements={announcements || []} />
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
