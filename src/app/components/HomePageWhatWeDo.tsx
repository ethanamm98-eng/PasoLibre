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
  image: {
    src: string;
    alt: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index === 1 ? [60, -60] : [0, 0],
  );

  const isCenter = index === 1;
  const isLeft = index === 0;
  const isRight = index === 2;

  /*
   * First and second images:
   * center horizontally and align to the bottom.
   *
   * Third image:
   * center horizontally and vertically.
   */
  const imagePosition =
    index === 0 ? "center 85%" : index === 1 ? "center bottom" : "center 70%";

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-4xl shadow-xl transition-all duration-500 will-change-transform hover:shadow-2xl ${
        isCenter ? "md:-translate-y-12" : ""
      }`}
    >
      {/* PARALLAX */}
      <motion.div
        style={{ y }}
        className="relative flex h-full min-h-full w-full flex-col"
      >
        {/* Spotlight hover */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-4xl opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
        </div>

        {/* LEFT VERTICAL TITLE */}
        {isLeft && (
          <div className="absolute bottom-4 left-0 top-0 z-30 flex w-10 justify-center rounded-l-4xl border-r border-sky-400/60 bg-white/5 backdrop-blur-sm">
            <span className="writing-vertical rotate-180 text-xl font-semibold tracking-widest text-white/80">
              {title}
            </span>
          </div>
        )}

        {/* RIGHT VERTICAL TITLE */}
        {isRight && (
          <div className="absolute bottom-0 right-0 top-4 z-30 flex w-10 justify-center rounded-r-4xl border-l border-sky-400/60 bg-white/5 backdrop-blur-sm">
            <span className="writing-vertical text-xl font-semibold tracking-widest text-white/80">
              {title}
            </span>
          </div>
        )}

        {/* CENTER TITLE */}
        {isCenter && (
          <div className="absolute left-0 right-0 top-0 z-30 rounded-t-4xl border-b border-sky-400/60 bg-white/5 backdrop-blur-md">
            <h3 className="py-3 text-center text-xl font-semibold tracking-widest text-white/90">
              {title}
            </h3>
          </div>
        )}

        <div
          className={`
            flex h-full w-full flex-col
            ${isLeft ? "pl-10" : ""}
            ${isRight ? "pr-10" : ""}
            ${isCenter ? "pt-14" : ""}
          `}
        >
          {/* IMAGE */}
          <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-72">
            <motion.div
              className="relative h-full w-full"
              whileHover={{
                scale: 1.08,
                rotate: 0.35,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover"
                style={{
                  objectPosition: imagePosition,
                }}
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1200px) 33vw,
                  400px
                "
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* CONTENT */}
          <motion.div
            className="flex-1 p-8 pt-6 text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 15,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="text-sm font-light leading-relaxed text-slate-200 md:text-base"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>

        {/* Hover Border */}
        <div className="pointer-events-none absolute inset-0 z-40 rounded-4xl border border-transparent transition-all duration-500 group-hover:border-sky-300/40" />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- SECTION ---------------- */

export default function WhatWeDoSection() {
  const { t } = useLanguage();
  const whatWeDo = t.home.whatWeDo;

  return (
    <section className="relative overflow-hidden bg-[#0d4db0] px-6 pb-24 pt-48">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute -left-32 -top-32 h-96 w-96 bg-sky-400/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
        }}
        className="absolute -bottom-32 -right-32 h-96 w-96 bg-indigo-400/20 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Ghost Background Title */}
        <div className="relative mb-20 text-center">
          <span className="absolute inset-0 text-[5rem] font-bold tracking-widest text-white opacity-[0.05] md:text-[8rem]">
            {whatWeDo.ghostTitle}
          </span>

          <h2 className="relative text-3xl font-semibold tracking-tight text-white underline underline-offset-6 md:text-6xl">
            {whatWeDo.title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-light text-white/70">
            {whatWeDo.intro}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:items-end">
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
        <div className="mt-14 w-full">
          <motion.button
            type="button"
            onClick={() =>
              window.open("/initiatives", "_blank", "noopener,noreferrer")
            }
            whileHover={{ scale: 1.02 }}
            className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white bg-[#0d4db0] px-6 py-5 font-semibold text-white shadow-lg transition-all duration-400"
          >
            <span className="relative z-10 flex items-center justify-center tracking-normal transition-all duration-500 group-hover:tracking-widest">
              {whatWeDo.button}

              <GoHeartFill className="ml-2 text-sky-400 transition group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </span>

            <span className="absolute inset-0 bg-linear-to-r from-sky-400 to-indigo-400 opacity-0 transition duration-700 group-hover:opacity-100" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
