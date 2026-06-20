"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import { GoHeartFill } from "react-icons/go";
import { useLanguage } from "../context/language";

/* ---------------- CARD ---------------- */

function ActivityCard({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description: string;
  image: { src: string; alt: string };
  index: number;
}) {
  const ref = useRef(null);

  /* Scroll parallax */
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
      // initial={{ opacity: 0, y: 40 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.9, ease: "easeOut" }}
      // viewport={{ once: true, margin: "-100px" }}
      className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 will-change-transform rounded-4xl ${
        isCenter ? "md:-translate-y-12" : ""
      }`}
    >
      {/* PARALLAX */}
      <motion.div style={{ y }}>
        {/* Spotlight hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-4xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
        </div>

        {/* LEFT VERTICAL TITLE */}
        {isLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-10 border-r border-sky-400/60 backdrop-blur-sm bg-white/5 flex justify-center rounded-l-4xl">
            <span className="writing-vertical rotate-180 text-white/80 font-semibold tracking-widest text-xl">
              {title}
            </span>
          </div>
        )}

        {/* RIGHT VERTICAL TITLE */}
        {isRight && (
          <div className="absolute right-0 top-4 bottom-0 w-10 border-l border-sky-400/60 backdrop-blur-sm bg-white/5 flex justify-center rounded-r-4xl">
            <span className="writing-vertical text-white/80 font-semibold tracking-widest text-xl">
              {title}
            </span>
          </div>
        )}

        {/* CENTER TITLE */}
        {isCenter && (
          <div className="absolute top-0 left-0 right-0 border-b border-sky-400/60 backdrop-blur-md bg-white/5 z-20 rounded-t-4xl">
            <h3 className="text-white/90 font-semibold tracking-widest text-xl py-3 text-center">
              {title}
            </h3>
          </div>
        )}

        <div
          className={`
            ${isLeft ? "pl-10" : ""}
            ${isRight ? "pr-10" : ""}
            ${isCenter ? "pt-14" : ""}
          `}
        >
          {/* IMAGE */}
          <div className="relative w-full h-56 md:h-64 overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.12, rotate: 0.4 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={image?.src}
                alt={image?.alt}
                fill
                className={`object-cover ${
                  image?.alt === "Running & Walking Club"
                    ? "object-[center_85%]"
                    : "object-[center_70%]"
                }`}
              />
            </motion.div>

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* CONTENT */}
          <motion.div
            className="p-8 pt-6 text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-slate-200 text-sm md:text-base leading-relaxed font-light"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 rounded-4xl border border-transparent group-hover:border-sky-300/40 transition-all duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- SECTION ---------------- */

export default function WhatWeDoSection() {
  const { t } = useLanguage();
  const whatWeDo = t.home.whatWeDo;

  return (
    <section className="pb-24 pt-48 px-6 bg-[#0d4db0] relative overflow-hidden">
      {/* Animated gradient blobs */}
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

      <div className="max-w-6xl mx-auto relative">
        {/* Ghost Background Title */}
        <div className="relative text-center mb-20">
          <span className="absolute inset-0 text-[5rem] md:text-[8rem] font-bold tracking-widest opacity-[0.05] text-white">
            {whatWeDo.ghostTitle}
          </span>

          <h2 className="relative text-3xl md:text-6xl font-semibold tracking-tight text-white underline underline-offset-6">
            {whatWeDo.title}
          </h2>

          <p className="mt-6 text-white/70 max-w-xl mx-auto font-light">
            {whatWeDo.intro}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
          {whatWeDo?.activities?.map((activity, index: number) => (
            <ActivityCard
              key={activity.title}
              title={activity.title}
              description={activity.description}
              image={activity.image}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="w-full mt-14">
          <motion.button
            onClick={() => window.open("/initiatives", "_blank")}
            whileHover={{ scale: 1.02 }}
            className="group w-full relative overflow-hidden cursor-pointer
            bg-[#0d4db0] text-white border border-white px-6 py-5 font-semibold
            shadow-lg transition-all duration-400 rounded-2xl"
          >
            <span className="relative z-10 flex justify-center items-center tracking-normal group-hover:tracking-widest transition-all duration-500">
              {whatWeDo.button}
              <GoHeartFill className="ml-2 text-sky-400 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition" />
            </span>

            <span className="absolute inset-0 bg-linear-to-r from-sky-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition duration-700" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
