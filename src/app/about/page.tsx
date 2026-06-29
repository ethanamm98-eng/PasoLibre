"use client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutPageHero from "../components/AboutPageHero";
import AboutPageMission from "../components/AboutPageMission";
import AboutPageContent from "../components/AboutPageContent";
import FollowUs from "../components/FollowUs";
import AboutPageMeetPlaces from "../components/MeetPlacesSection";
import SmoothSection from "../components/SmoothSection";
import { useRef } from "react";
import { useScroll } from "framer-motion";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // const { scrollYProgress } = useScroll({
  //   container: containerRef,
  // });

  return (
    <div
      className="bg-white text-black dark:bg-black dark:text-white relative"
      // ref={containerRef}
    >
      <NavBar />

      <SmoothSection>
        <AboutPageHero />
      </SmoothSection>

      <SmoothSection>
        <AboutPageMission />
      </SmoothSection>

      <SmoothSection>
        <AboutPageContent />
      </SmoothSection>

      <SmoothSection>
        <AboutPageMeetPlaces />
      </SmoothSection>

      <SmoothSection>
        <FollowUs />
      </SmoothSection>

      <Footer />
    </div>
  );
}
