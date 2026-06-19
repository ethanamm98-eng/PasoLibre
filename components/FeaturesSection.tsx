"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { useLanguage } from "../context/language";
import { homeTranslations } from "../lib/translations/home";
import { IconType } from "react-icons/lib";

/* ---------------- CARD ---------------- */

function FeatureCard({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: IconType;
  index: number;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index === 1 ? [60, -60] : [0, 0]
  );

  const isCenter = index === 1;
  const isLeft = index === 0;
  const isRight = index === 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500
        rounded-4xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-sm
        hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.25)]
        ${isCenter ? "md:-translate-y-12" : ""}
      `}
    >
      <motion.div style={{ y }} className="relative h-full">
        {/* Premium top sheen */}
        <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-b from-white/12 via-transparent to-transparent opacity-70" />

        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.20),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_70%)]" />
        </div>

        {/* SIDE TITLES */}
        {isLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-10 border-r border-white/15 bg-white/5 flex justify-center">
            <div className="absolute inset-y-4 right-0 w-px bg-linear-to-b from-sky-300/0 via-sky-300/60 to-violet-300/0" />
            <span className="writing-vertical rotate-180 text-white/80 font-semibold tracking-widest text-lg">
              {title}
            </span>
          </div>
        )}

        {isRight && (
          <div className="absolute right-0 top-4 bottom-0 w-10 border-l border-white/15 bg-white/5 flex justify-center">
            <div className="absolute inset-y-4 left-0 w-px bg-linear-to-b from-sky-300/0 via-sky-300/60 to-violet-300/0" />
            <span className="writing-vertical text-white/80 font-semibold tracking-widest text-lg">
              {title}
            </span>
          </div>
        )}

        {isCenter && (
          <div className="absolute top-0 left-0 right-0 border-b border-white/15 bg-white/5 z-20">
            <div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-sky-300/0 via-sky-300/70 to-violet-300/0" />
            <h3 className="text-white/90 font-semibold tracking-[0.2em] text-lg py-3 text-center">
              {title}
            </h3>
          </div>
        )}

        <div
          className={`
            ${isLeft ? "pl-10" : ""}
            ${isRight ? "pr-10" : ""}
            ${isCenter ? "pt-16" : ""}
          `}
        >
          {/* ICON */}
          <div className="relative flex items-center justify-center h-56 md:h-64">
            <motion.div
              whileHover={{ scale: 1.12, rotate: 2 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <Icon
                className="text-white text-6xl md:text-7xl transition-all duration-500
                drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]
                group-hover:drop-shadow-[0_0_35px_rgba(168,85,247,0.55)]"
              />
            </motion.div>

            <div className="absolute w-40 h-40 rounded-full bg-sky-400/20 blur-[80px]" />
            <div className="absolute w-28 h-28 rounded-full bg-violet-400/20 blur-[70px]" />
          </div>

          {/* TEXT */}
          <motion.div
            className="p-8 pt-4 text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-slate-200/90 text-sm md:text-base leading-relaxed font-light"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>

        {/* Border */}
        <div className="absolute inset-0 rounded-4xl border border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- SECTION ---------------- */

export default function FeaturesSection() {
  const { language } = useLanguage();
  const t = homeTranslations[language]?.features;

  const icons = [FaCalendarAlt, FaCheckCircle, FaUserCircle];

  const features = t.items.map((item, index) => ({
    ...item,
    Icon: icons[index],
  }));

  return (
    <section className="py-28 px-6 bg-[#0d4db0] relative overflow-hidden">
      {/* Background blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/20 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400/20 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-400/10 blur-[130px]"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* HEADER */}
        <div className="relative text-center mb-24">
          {/* Ghost */}
          <span className="absolute inset-0 text-[5rem] md:text-[8rem] font-bold tracking-widest opacity-[0.05] text-white select-none">
            {t.ghostTitle}
          </span>

          {/* Title */}
          <h2 className="relative text-3xl md:text-6xl font-semibold tracking-tight text-white">
            <span className="bg-linear-to-r from-sky-300 via-white to-violet-300 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-white/70 max-w-xl mx-auto font-light text-lg">
            {t.description}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="w-full mt-16">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="group w-full relative overflow-hidden cursor-pointer
            bg-[#0d4db0]/90 text-white border border-white/20 px-6 py-5 font-semibold
            shadow-lg transition-all duration-400 rounded-2xl backdrop-blur-sm"
          >
            <span className="relative z-10 flex justify-center items-center tracking-normal group-hover:tracking-widest transition-all duration-500">
              {t.cta}
              <GoHeartFill className="ml-2 text-sky-300 group-hover:text-violet-200 group-hover:scale-125 transition-all duration-500" />
            </span>

            <span className="absolute inset-0 bg-linear-to-r from-sky-400 via-indigo-400 to-violet-400 opacity-0 group-hover:opacity-100 transition duration-700" />
            <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent opacity-70" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
