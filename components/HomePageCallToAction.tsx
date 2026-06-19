"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoHeartFill } from "react-icons/go";
import { useLanguage } from "../context/language";

export default function CallToAction() {
  const { t } = useLanguage();
  const ctaTranslations = t.home.cta;

  const [hovered, setHovered] = useState(false);

  const links = [
    {
      href: "https://docs.google.com/forms/d/e/1FAIpQLSfNx-24GfPqxQ0Oj0Fi2vnaeGrpdPleq4FTYvpdEJzQd1l0QA/viewform",
      label: ctaTranslations.links.volunteer,
    },
  ];

  const logos = [
    { src: "/logo-title-4.png", alt: "Paso Libre Logo" },
    { src: "/logo-title-4.png", alt: "Paso Libre Logo" },
    { src: "/logo-title-4.png", alt: "Paso Libre Logo" },
    { src: "/logo-title-4.png", alt: "Paso Libre Logo" },
  ];

  return (
    <section className="relative py-28 px-6 bg-white text-[#0d4db0] text-center overflow-hidden">
      {/* Background blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -top-32 -left-32 w-175 h-175 rounded-full bg-linear-to-tr from-sky-100 to-white opacity-30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute -bottom-32 -right-32 w-200 h-200 rounded-full bg-linear-to-tr from-indigo-100 to-white opacity-30 blur-3xl"
      />

      {/* Ghost text */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-bold tracking-tighter opacity-[0.05] text-[#0d4db0] select-none pointer-events-none">
        PASOLIBRE
      </span>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-8xl font-semibold tracking-tight text-left leading-18">
          {ctaTranslations.title}
        </h2>

        {/* CTA */}
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
          {/* Animated Arrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start"
          >
            <motion.svg
              width="200"
              height="100"
              viewBox="0 0 120 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
              className="text-[#0d4db0] relative md:-left-32 md:top-16"
            >
              {/* Curve reacts to hover */}
              <motion.path
                d={
                  hovered
                    ? "M5 10 C 40 10, 40 50, 90 50"
                    : "M5 10 C 40 10, 40 50, 90 50"
                }
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {/* Glow trail */}
              <motion.path
                d={
                  hovered
                    ? "M5 10 C 50 0, 60 60, 100 50"
                    : "M5 10 C 40 10, 40 50, 90 50"
                }
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-10"
                animate={{
                  opacity: hovered ? 0.25 : 0.1,
                  strokeWidth: hovered ? 6 : 4,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Arrow head */}
              <motion.path
                d="M80 40 L90 50 L80 60"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  x: hovered ? 4 : 0,
                  y: hovered ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              />
            </motion.svg>
          </motion.div>

          {/* Button */}
          {links.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative group w-full md:w-auto left-10 "
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-sky-400/20 via-indigo-400/20 to-sky-400/20 blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Main */}
              <div className="relative flex items-center justify-center gap-3 px-10 md:px-16 py-5 rounded-full border border-[#0d4db0]/20 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(13,77,176,0.15)] overflow-hidden transition-all duration-500">
                {/* Top line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-sky-400 to-transparent opacity-60" />

                {/* Default content */}
                <span className="text-[#0d4db0] font-medium tracking-wide">
                  {link.label}
                </span>

                <motion.span
                  className="text-sky-500 flex items-center"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                  }}
                >
                  <GoHeartFill />
                </motion.span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#0d4db0] to-indigo-600 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Hover content */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                  <span className="font-medium tracking-wide">
                    {link.label}
                  </span>
                  <GoHeartFill />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-28 overflow-hidden w-full relative">
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {logos.map((logo, j) => (
                <div key={j} className="flex items-center gap-14 px-14">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={300}
                    height={150}
                    className="object-contain opacity-100"
                    priority
                  />
                  <span className="text-[#0d4db0] text-xl opacity-100 rotate-90 scale-120">
                    ⌇
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
