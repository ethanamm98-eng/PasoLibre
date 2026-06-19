"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

const AboutPageMission = () => {
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  return (
    <section className="relative about-page-mission bg-white text-[#0d4db0] py-36 px-8 overflow-hidden">
      {/* Floating Background Lights */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-175 h-175 bg-sky-200/30 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 26, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-175 h-175 bg-indigo-200/30 blur-[140px] rounded-full"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Ghost Background Word */}
        <span className="absolute left-1/2 -translate-x-1/2 -top-24 text-[7rem] md:text-[12rem] font-black tracking-widest opacity-[0.03] whitespace-nowrap">
          {language === "es" ? "PROPÓSITO" : "PURPOSE"}
        </span>

        {/* GRID */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-16 items-center text-center">
          {/* ===== MISSION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="group relative p-12 backdrop-blur-sm border border-[#0d4db0]/10 rounded-3xl shadow-sm hover:shadow-xl transition duration-700"
          >
            <h1 className="text-4xl md:text-7xl mb-8 font-black tracking-tight">
              {t.missionTitle}
            </h1>

            <p className="max-w-sm mx-auto text-lg leading-relaxed text-[#0d4db0]/80">
              {t.missionText}{" "}
              <span className="font-bold text-sky-400">
                {t.missionHighlight}
              </span>{" "}
              {t.missionTextEnd}
            </p>

            {/* Hover Accent Glow */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-200/0 via-sky-200/0 to-indigo-200/0 group-hover:from-sky-200/20 group-hover:to-indigo-200/20 transition duration-700 pointer-events-none" />
          </motion.div>

          {/* ===== DIVIDER ===== */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "180px" }}
            transition={{ duration: 1 }}
            className="hidden md:flex justify-center rotate-90 mx-6"
          >
            <div className="relative w-0.5 bg-linear-to-b from-transparent via-[#0d4db0]/50 to-transparent rounded-full">
              {/* Animated Glow Dot */}
              <motion.div
                animate={{ y: [0, 140, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-sky-400 rounded-full blur-[2px]"
              />
            </div>
          </motion.div>

          {/* ===== VISION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="group relative p-12 backdrop-blur-sm border border-[#0d4db0]/10 rounded-3xl shadow-sm hover:shadow-xl transition duration-700"
          >
            <h1 className="text-4xl md:text-7xl mb-8 font-black tracking-tight">
              {t.visionTitle}
            </h1>

            <p className="max-w-sm mx-auto text-lg leading-relaxed text-[#0d4db0]/80">
              {t.visionText}{" "}
              <span className="font-bold text-sky-400">
                {t.visionHighlight}
              </span>{" "}
              {t.visionTextEnd}
            </p>

            {/* Hover Accent Glow */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-200/0 via-sky-200/0 to-indigo-200/0 group-hover:from-sky-200/20 group-hover:to-indigo-200/20 transition duration-700 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ===== MARQUEE ===== */}
      <div className="mt-40 overflow-hidden w-full hidden sm:hidden md:block lg:block xl:block">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-5xl md:text-8xl tracking-tight lowercase font-black flex"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center mr-16">
              {language === "es" ? "nuestra historia" : "our story"}
              <span className="mx-6 text-black/40 rotate-90">⌇</span>
              {language === "es" ? "nuestra historia" : "our story"}
              <span className="mx-6 text-black/40 rotate-90">⌇</span>
              {language === "es" ? "nuestra historia" : "our story"}
              <span className="mx-6 text-black/40 rotate-90">⌇</span>
              {language === "es" ? "nuestra historia" : "our story"}
              <span className="mx-6 text-black/40 rotate-90">⌇</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPageMission;
