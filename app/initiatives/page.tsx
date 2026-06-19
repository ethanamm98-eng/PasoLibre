import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import WhatWeDoSection from "../components/HomePageWhatWeDo";

import SmoothSection from "../components/SmoothSection";
import Initiatives from "../components/Initiatives";
import TimelineSection from "../components/TimelineSection";

// This is the main landing page of the website.
// It uses the same NavBar and Footer as the about page, and has different content sections inside.
// Each section is wrapped in a SmoothSection component to add fade-in animations as the user scrolls down.

export default function App() {
  return (
    <div>
      <NavBar />

      <WhatWeDoSection />

      <SmoothSection>
        <Initiatives />
      </SmoothSection>

      <SmoothSection>
        <TimelineSection />
      </SmoothSection>

      <Footer />
    </div>
  );
}
