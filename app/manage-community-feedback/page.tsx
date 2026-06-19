import React from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ManageCommunityCommentsCMS from "../components/ManageCommunityComments";
import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

const Page = () => {
  return (
    <UnderConstructionOverlay
      title="Manage Community Feedback"
      description="This page is currently under development."
    />
  );

  return (
    <div>
      <NavBar />
      {/* Manage Health Providers, Gender-Affirming Clinics & Name/Gender-Marker Change Guides */}
      {/* Hero */}
      <div className="bg-[#0d4db0] pb-16 pt-42 text-center">
        <h1 className="text-4xl font-bold text-white">
          Manage Community Feedback
        </h1>
        <p className="mt-4 text-lg text-white">
          Review and moderate community comments to ensure a safe and supportive
          environment for all Paso Libre users.
        </p>
      </div>
      <ManageCommunityCommentsCMS />
      <Footer />
    </div>
  );
};

export default Page;
