"use client";

import { motion } from "framer-motion";
import { FaWalking, FaBookOpen, FaUsers, FaHeart } from "react-icons/fa";
import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

export default function AboutPageMeetPlaces() {
  const { language } = useLanguage();
  const t = aboutTranslations[language].meetPlaces;

  const places = t.places.map((place) => ({
    name: place.name,
    icon: (() => {
      switch (place.icon) {
        case "FaWalking":
          return <FaWalking />;
        case "FaBookOpen":
          return <FaBookOpen />;
        case "FaUsers":
          return <FaUsers />;
        case "FaHeart":
          return <FaHeart />;
        default:
          return null;
      }
    })(),
  }));

  return (
    <section className="relative about-page-places bg-white text-[#0d4db0] py-36 px-8 overflow-hidden">
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

      <div className="relative mx-auto max-w-7xl text-center">
        <span className="absolute left-1/2 -translate-x-1/2 -top-24 text-[6rem] md:text-[11rem] font-black tracking-widest opacity-[0.035] whitespace-nowrap">
          {t.backgroundWord}
        </span>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-16 items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9 }}
            className="group relative p-10 md:p-12 backdrop-blur-sm border border-[#0d4db0]/10 rounded-3xl shadow-sm hover:shadow-xl transition duration-700"
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-sky-600/80">
              Paso Libre
            </p>

            <h1 className="text-4xl md:text-7xl mb-8 font-black tracking-tight lowercase">
              {t.title}
            </h1>

            <p className="max-w-md mx-auto text-lg leading-relaxed text-[#0d4db0]/80">
              {t.description}
            </p>

            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-200/0 via-sky-200/0 to-indigo-200/0 group-hover:from-sky-200/20 group-hover:to-indigo-200/20 transition duration-700 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "180px" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1 }}
            className="hidden md:flex justify-center rotate-90 mx-6"
          >
            <div className="relative w-0.5 bg-linear-to-b from-transparent via-[#0d4db0]/50 to-transparent rounded-full">
              <motion.div
                animate={{ y: [0, 140, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-sky-400 rounded-full blur-[2px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 md:gap-8"
          >
            {places.map((place, index) => (
              <motion.div
                key={place.name}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="group relative min-h-42.5 p-7 md:p-8 backdrop-blur-sm border border-[#0d4db0]/10 rounded-3xl shadow-sm hover:shadow-xl transition duration-700 flex flex-col items-center justify-center gap-4 cursor-pointer bg-white/70"
              >
                <div className="absolute top-4 right-5 text-xs font-black text-[#0d4db0]/15">
                  0{index + 1}
                </div>

                <div className="text-5xl text-sky-600">{place.icon}</div>

                <span className="text-lg md:text-xl font-semibold text-sky-700">
                  {place.name}
                </span>

                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-200/0 via-sky-200/0 to-indigo-200/0 group-hover:from-sky-200/20 group-hover:to-indigo-200/20 transition duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
