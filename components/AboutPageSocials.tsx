"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

export default function AboutInstagramSection() {
  const { language } = useLanguage();
  const t = aboutTranslations[language].instagramSection;

  return (
    <section className="relative py-36 px-6 bg-[#0d4db0] text-white overflow-hidden">
      {/* Floating Light Blobs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-175 h-175 rounded-full bg-sky-400/20 blur-[150px]"
      />
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 50, 0] }}
        transition={{ duration: 34, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-200 h-200 rounded-full bg-indigo-400/20 blur-[150px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Block */}
        <div className="relative text-center mb-24">
          <span className="absolute inset-0 text-[6rem] md:text-[9rem] font-bold tracking-widest opacity-[0.05] select-none pointer-events-none">
            {t.backgroundWord}
          </span>

          <h2 className="relative text-3xl md:text-6xl font-semibold tracking-tight underline underline-offset-8">
            {t.title}
          </h2>

          <p className="mt-6 text-white/70 max-w-2xl mx-auto font-light">
            {t.description}
          </p>
        </div>

        {/* Elegant Framed Embed */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Outer Glow Frame */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-400/30 via-indigo-400/20 to-sky-400/30 blur-2xl opacity-60 group-hover:opacity-80 transition duration-700" />

          {/* Main Container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            {/* Subtle Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-sky-400 to-transparent opacity-70" />

            {/* Modern Aspect Ratio (Cinematic Wide) */}
            <div className="aspect-4/3 md:aspect-16/10 w-full">
              <motion.iframe
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
                src="https://www.instagram.com/pasolibre.pr/embed"
                className="w-full h-full p-2 rounded-3xl border border-white/20 bg-white/10 shadow-sm"
                allow="encrypted-media"
                loading="lazy"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              />
            </div>
          </div>

          {/* Floating Corner Detail */}
          <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-sky-400/50 rounded-tr-3xl opacity-70" />
        </motion.div>
      </div>
    </section>
  );
}
