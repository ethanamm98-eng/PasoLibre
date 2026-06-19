"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuMessageCircle,
  LuFileText,
  LuUserRound,
  LuHospital,
} from "react-icons/lu";

import { useLanguage } from "../context/language";
import { resourcesTranslations } from "../lib/translations/resources";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
// import ResourcesProviders from "../components/ResourcesProviders";
// import ResourcesNameChange from "../components/ResourcesNameChange"; // Developing...
// import ResourcesGenderAffirmingCare from "../components/ResourcesGenderAffirmingCare"; Developing...
// import ResourcesCommentSection from "../components/ResourcesCommentSection"; Developing...
import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

// *-------------------- Resources Page -------------------- *

export default function ResourcesPage() {
  const { language } = useLanguage();
  const t = resourcesTranslations[language];

  const [activeSection, setActiveSection] = useState("providers");
  const [scrolled, setScrolled] = useState(false);

  // interface Comment {
  //   name: string;
  //   message: string;
  // }

  // const [submittedComments, setSubmittedComments] = useState<Comment[]>([
  //   {
  //     name: "Alex R.",
  //     message:
  //       "Clínica Transalud me brindó acompañamiento respetuoso durante mi proceso hormonal. El personal fue muy profesional y afirmativo.",
  //   },
  //   {
  //     name: "María L.",
  //     message:
  //       "Centro Ararat en Ponce ofrece apoyo psicosocial excelente para jóvenes LGBTQ+. Muy recomendado.",
  //   },
  //   {
  //     name: "Javier T.",
  //     message:
  //       "Gracias por incluir recursos en Mayagüez. CARIB ha sido un espacio seguro para nuestra comunidad.",
  //   },
  // ]);

  // const [pendingComments, setPendingComments] = useState<Comment[]>([]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const commentsPerPage = 3;

  // const handleCommentSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const newComment = {
  //     name: form.name.value || "Anónimo",
  //     message: form.message.value,
  //   };
  //   setPendingComments([...pendingComments, newComment]);
  //   form.reset();
  // };

  // const approveComment = (index: number) => {
  //   const approved = pendingComments[index];
  //   setSubmittedComments([...submittedComments, approved]);
  //   setPendingComments(pendingComments.filter((_, i) => i !== index));
  // };

  // const totalPages = Math.ceil(submittedComments.length / commentsPerPage);

  // const paginatedComments = useMemo(() => {
  //   const start = (currentPage - 1) * commentsPerPage;
  //   const end = start + commentsPerPage;
  //   return submittedComments.slice(start, end);
  // }, [submittedComments, currentPage]);

  const scrollToSection = (id: string) => {
    if (!scrolled) setScrolled(true);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sections = ["providers", "gender-clinics", "name-guide", "community"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100% 0px -50% 0px",
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
      title="Resources"
      description="This section is currently under development. We're working on powerful tools to manage providers, clinics, and name change resources for the Paso Libre community."
    />
  );

  return (
    <div>
      <Navbar />

      {/* -------------------- Sticky Navigation -------------------- */}
      <div className="sticky top-24 z-30 mb-6 px-4">
        <div className="backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg rounded-2xl p-4 flex flex-wrap gap-3 justify-center text-sm">
          {[
            {
              id: "providers",
              label: t.navigation?.professionals,
              icon: <LuUserRound />,
            },
            {
              id: "gender-clinics",
              label: t.navigation.clinics,
              icon: <LuHospital />,
            },
            {
              id: "name-guide",
              label: t.navigation.nameChange,
              icon: <LuFileText />,
            },
            {
              id: "community",
              label: t.navigation.community,
              icon: <LuMessageCircle />,
            },
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

      <section
        className={`${
          scrolled ? "pt-60" : "pt-24"
        } relative pb-10 px-6 bg-white overflow-hidden`}
      >
        {/* Soft Gradients */}
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-pink-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-150 h-150 bg-sky-100 rounded-full blur-3xl opacity-40" />

        <div className="max-w-6xl mx-auto text-center">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-linear-to-r from-pink-100 to-sky-100 text-[#0d4db0] text-sm font-medium">
              <LuShieldCheck />
              {t?.hero?.badge}
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-[#0d4db0] tracking-tight">
              {t?.hero?.title}
            </h1>

            <p className="mt-6 text-slate-600 max-w-3xl mx-auto font-light text-lg leading-relaxed">
              {t?.hero?.description}
            </p>
            <p className="mt-6 text-sm text-slate-500 max-w-2xl mx-auto font-light leading-relaxed italic">
              {t?.hero?.disclaimer}
            </p>
          </motion.div>

          {/* Categories */}
          {/* <ResourcesProviders /> */}

          {/* Section Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-white border border-[#0d4db0]/20 shadow-sm" />
          </div>

          {/* Gender-Affirming Clinics Section */}
          {/* <ResourcesGenderAffirmingCare /> */}

          {/* Section Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-white border border-[#0d4db0]/20 shadow-sm" />
          </div>

          {/* Name & Gender Marker Guide Section */}
          {/* <ResourcesNameChange /> */}

          {/* Section Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-white border border-[#0d4db0]/20 shadow-sm" />
          </div>

          {/* ================= COMMUNITY SECTION ================= */}
          {/* <ResourcesCommentSection
            handleCommentSubmit={handleCommentSubmit}
            paginatedComments={paginatedComments}
            pendingComments={pendingComments}
            approveComment={approveComment}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          /> */}

          {/* Section Divider */}
          <div className="relative my-28">
            <div className="h-px bg-linear-to-r from-transparent via-[#0d4db0]/30 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-white border border-[#0d4db0]/20 shadow-sm" />
          </div>

          {/* Community Note */}
          <div className="mt-24 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-[#0d4db0] mb-4">
              {/* Nuestra intención */}
              {t?.communityNoteExtended?.title}
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              {t?.communityNoteExtended?.description}
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-20 border-t border-slate-200 pt-12 text-xs text-slate-500 max-w-3xl mx-auto font-light leading-relaxed space-y-4">
            <p>{t?.disclaimer?.p1}</p>
            <p>{t?.disclaimer?.p2}</p>
            <p>{t?.disclaimer?.p3}</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
