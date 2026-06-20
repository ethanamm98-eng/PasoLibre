"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuStore,
  LuSyringe,
  LuHeartHandshake,
  LuMessageCircle,
} from "react-icons/lu";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import TransStoresSection from "../components/TransStoresSection";
import NeedleResourcesSection from "../components/NeedleResourcesSection";
import TransSafetySection from "../components/TransSafetySection";
// import ResourcesCommentSection from "../components/ResourcesCommentSection"; // Developing...
import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

export default function TransEssentialsPage() {
  const [activeSection, setActiveSection] = useState("stores");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sections = ["stores", "needles", "safety", "community"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <UnderConstructionOverlay
      title="Trans Care Resources"
      description="This section is currently under development. We're working on powerful tools to manage providers, clinics, and name change resources for the Paso Libre community."
    />
  );

  return (
    <div>
      <Navbar />

      {/* Sticky Navigation */}
      <div className="sticky top-24 z-30 mb-6 px-4">
        <div className="backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg rounded-2xl p-4 flex flex-wrap gap-3 justify-center text-sm">
          {[
            { id: "stores", label: "Trans Stores", icon: <LuStore /> },
            { id: "needles", label: "Needle Resources", icon: <LuSyringe /> },
            { id: "safety", label: "Safety Info", icon: <LuHeartHandshake /> },
            { id: "community", label: "Community", icon: <LuMessageCircle /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-linear-to-r from-[#0d4db0] to-[#083b8a] text-white shadow-md"
                  : "bg-white border border-slate-200 hover:bg-linear-to-r hover:from-[#0d4db0] hover:to-[#083b8a] hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section className="relative py-32 px-6 bg-white overflow-hidden">
        {/* Soft Gradients */}
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-pink-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-150 h-150 bg-sky-100 rounded-full blur-3xl opacity-40" />

        <div className="max-w-6xl mx-auto text-center">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-linear-to-r from-pink-100 to-sky-100 text-[#0d4db0] text-sm font-medium">
              <LuShieldCheck />
              Gender-Affirming Essentials
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-[#0d4db0] tracking-tight">
              Trans Care Essentials & Resources
            </h1>

            <p className="mt-6 text-slate-600 max-w-3xl mx-auto font-light text-lg leading-relaxed">
              Access trusted stores for binders, binding tape, tuckers, and find
              safe injection supply resources.
            </p>
          </motion.div>

          {/* STORES */}
          <TransStoresSection />

          {/* Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
          </div>

          {/* NEEDLES */}
          <NeedleResourcesSection />

          {/* Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
          </div>

          {/* SAFETY */}
          <TransSafetySection />

          {/* Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
          </div>

          {/* COMMUNITY */}
          {/* <ResourcesCommentSection
            handleCommentSubmit={() => {}}
            paginatedComments={[]}
            pendingComments={[]}
            approveComment={{}}
            totalPages={1}
            setCurrentPage={() => {}}
            currentPage={1}
          /> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
