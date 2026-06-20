import React from "react";
// import FormBuilder from "../../components/FormPage";
import Navbar from "@/src/app/components/NavBar";
import UnderConstructionOverlay from "@/src/app/components/UnderConstructionOverlay";

async function Page() {
  return (
    <UnderConstructionOverlay
      title="Forms Builder"
      description="This page is currently under development."
    />
  );

  return (
    <div>
      <Navbar />
      {/* <FormBuilder /> */}
    </div>
  );
}

export default Page;
