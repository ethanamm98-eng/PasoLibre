import React from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ManageProviders from "../components/ManageProviders";
// import ManageClinics from "../components/ManageClinics";
// import ManageNameChangeGuide from "../components/ManageNameChangeGuide"; Developing...
import ManagementTabs from "../components/ManagementTabs";
import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

const Page = () => {
  return (
    <UnderConstructionOverlay
      title="Health Resources Management"
      description="This section is currently under development. We're working on powerful tools to manage providers, clinics, and name change resources for the Paso Libre community."
    />
  );

  return (
    <div className="relative">
      <NavBar />

      {/* Manage Health Providers, Gender-Affirming Clinics & Name/Gender-Marker Change Guides */}

      {/* Hero */}
      <div className="bg-[#0d4db0] pb-16 pt-42 text-center">
        <h1 className="text-4xl font-bold text-white">
          Manage Health Resources
        </h1>

        <p className="mt-4 text-lg text-white">
          Add, edit, and approve health resources for the Paso Libre community.
        </p>
      </div>

      <ManagementTabs
        tabs={[
          { id: "providers", label: "Providers" },
          { id: "clinics", label: "Clinics" },
          { id: "name-guide", label: "Name Change" },
        ]}
      />

      <ManageProviders />
      {/* <ManageClinics />
      <ManageNameChangeGuide /> */}

      <Footer />
    </div>
  );
};

export default Page;
