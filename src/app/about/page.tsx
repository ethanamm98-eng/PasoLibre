"use client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutPageHero from "../components/AboutPageHero";
import AboutPageMission from "../components/AboutPageMission";
import AboutPageContent from "../components/AboutPageContent";
import FollowUs from "../components/FollowUs";
import AboutPageMeetPlaces from "../components/MeetPlacesSection";
import SmoothSection from "../components/SmoothSection";

export default function App() {
  return (
    <div>
      <NavBar />

      <SmoothSection>
        <AboutPageHero />
      </SmoothSection>

      <SmoothSection delay={0.1}>
        <AboutPageMission />
      </SmoothSection>

      <SmoothSection delay={0.2}>
        <AboutPageContent />
      </SmoothSection>

      <SmoothSection delay={0.3}>
        <AboutPageMeetPlaces />
      </SmoothSection>

      <SmoothSection>
        <FollowUs />
      </SmoothSection>

      <Footer />
    </div>
  );
}
