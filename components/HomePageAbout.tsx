"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { GoHeartFill } from "react-icons/go";
import { LiaUsersSolid } from "react-icons/lia";
import { PiPark } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { Parisienne } from "next/font/google";

import { useLanguage } from "../context/language";

const cursive = Parisienne({
  subsets: ["latin"],
  weight: "400",
});

/* ------------------------
     STAT CARD COMPONENT
-------------------------*/
function StatCard({
  icon,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group flex flex-col items-center text-center px-6 py-10 my-auto"
    >
      {/* Shared subtle glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-linear-to-br from-sky-50/60 via-transparent to-indigo-50/60 rounded-2xl blur-xl" />

      {/* Icon Halo */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-4 text-sky-500 text-5xl"
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-sky-100 opacity-40 blur-md" />
        {icon}
      </motion.div>

      {/* Value */}
      <motion.span
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative text-4xl md:text-5xl font-semibold text-[#0d4db0] text-shadow-2xs tracking-tight"
      >
        {value}
      </motion.span>

      {/* Label */}
      <span className="relative text-slate-500 tracking-[0.25em] uppercase mt-2 text-xs">
        {label}
      </span>
    </motion.div>
  );
}

/* ------------------------
    ABOUT SECTION
-------------------------*/
export default function AboutSection() {
  const { t } = useLanguage();
  const about = t.home.about;
  const router = useRouter();

  const [members, setMembers] = useState(0);
  const [meetings, setMeetings] = useState(0);

  useEffect(() => {
    let memberCount = 0;
    let meetingCount = 0;
    const memberTarget = about.stats.impactedLives.number;
    const meetingTarget = about.stats.memoriesCreated.number;
    const interval = 20;

    const timer = setInterval(() => {
      if (memberCount < memberTarget) memberCount += 1;
      if (meetingCount < meetingTarget) meetingCount += 1;

      setMembers(memberCount);
      setMeetings(meetingCount);

      if (memberCount >= memberTarget && meetingCount >= meetingTarget) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [about.stats.impactedLives.number, about.stats.memoriesCreated.number]);

  /* Scroll-linked parallax for collage */
  const collageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="pointer-events-none absolute -top-32 -left-32 w-200 h-200 rounded-full bg-linear-to-tr from-yellow-100 to-white opacity-40 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
        className="pointer-events-none absolute -bottom-32 -right-32 w-225 h-225 rounded-full bg-linear-to-tr from-indigo-100 to-white opacity-40 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-[50%_45%] lg:grid-cols-[55%_40%] gap-20 md:gap-[4%] lg:gap-16 items-center">
        {/*  IMAGE COLLAGE SIDE */}
        <div ref={collageRef} className="relative w-full h-125 md:h-155">
          {/* Top Circle Blur */}
          <div className="pointer-events-none absolute inset-0 flex justify-center items-center z-0">
            <div className="w-200 h-200 md:w-225 md:h-225 rounded-full bg-linear-to-tr from-yellow-100 to-white opacity-40 blur-3xl" />
          </div>

          {/* Top-left image */}
          <motion.div
            style={{ y: yTop, x: xLeft }}
            initial={{ opacity: 0, rotate: -2 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.9 }}
            className="absolute top-4 left-6 w-[82%] h-[49%] overflow-hidden shadow-2xl z-20 border border-slate-200"
          >
            <Image
              src="/group/paso-libre-about.webp"
              alt="Paso Libre"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Small left card */}
          <motion.div
            style={{ x: xLeft }}
            initial={{ opacity: 0, rotate: 6 }}
            whileInView={{ opacity: 1, rotate: 6 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="absolute top-[38%] left-0 w-[32%] h-[35%] bg-white pt-3 pb-14 px-3 shadow-xl z-10 border border-slate-100 rounded-sm overflow-hidden"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src="/group/group-picture-paint.jpg"
                alt="Paso Libre"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Small right card */}
          <motion.div
            style={{ x: xRight }}
            initial={{ opacity: 0, rotate: -6 }}
            whileInView={{ opacity: 1, rotate: -6 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="absolute top-[38%] right-0 w-[34%] h-[42%] bg-white pt-3 pb-14 px-3 shadow-xl z-10 border border-slate-100 rounded-sm overflow-hidden"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src="/group/group-picture-5.jpg"
                alt="Paso Libre"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Bottom image */}
          <motion.div
            style={{ y: yBottom }}
            initial={{ opacity: 0, rotate: 2 }}
            whileInView={{ opacity: 1, rotate: 2 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="absolute bottom-0 right-6 w-[78%] h-[45%] overflow-hidden shadow-2xl z-20 border border-slate-200"
          >
            <Image
              src="/group/group-picture-picnic.jpg"
              alt="Paso Libre"
              fill
              className="object-cover object-[center_60%]"
            />
          </motion.div>
        </div>

        {/* CONTENT SIDE */}
        <motion.div
          className="relative z-20 space-y-8 flex flex-col justify-center mx-6"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Ghost background title */}
          <div className="relative">
            <span className="pointer-events-none absolute -left-32 inset-0 text-[5rem] md:text-[8rem] font-bold tracking-widest opacity-[0.05] text-[#0d4db0] select-none">
              {about.ghostTitle}
            </span>
            <h2 className="relative z-10 text-4xl md:text-[55px] font-semibold text-[#0d4db0] tracking-tight leading-tight">
              {about.title} <GoHeartFill className="inline text-sky-500 ml-2" />
            </h2>
          </div>

          <p className="relative z-10 text-[#0d4db0] text-lg leading-relaxed max-w-full mx-auto text-justify">
            {about.intro}
          </p>

          <p className="relative z-10 text-[#0d4db0] text-lg leading-relaxed max-w-full mx-auto text-justify">
            {about.description.split("LGBTQ+")[0]}
            <span className="font-bold text-sky-500">LGBTQ+</span>
            {about.description.split("LGBTQ+")[1]}
          </p>

          {/* QUICK STATS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 mt-8"
          >
            <div className="pointer-events-none absolute -inset-10 bg-linear-to-br from-sky-50/50 via-transparent to-indigo-50/50 blur-3xl opacity-60" />

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={`relative z-20 text-center text-3xl md:text-4xl font-normal tracking-wide ${cursive.className}`}
            >
              <span className="bg-linear-to-r from-[#0d4db0] via-sky-400 to-indigo-500 bg-size-[200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                {about.trajectoryTitle}
              </span>

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "140px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="pointer-events-none block h-0.5 mx-auto mt-2 bg-linear-to-r from-transparent via-transparent to-transparent"
              />
            </motion.h3>

            <div className="relative mt-4.5 pt-0">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/90 via-sky-50/40 to-white/80 backdrop-blur-md border border-[#0d4db0]/10 rounded-3xl shadow-xl" />
              <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.75 bg-linear-to-r from-sky-400 to-indigo-400 rounded-full" />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#0d4db0]/10 px-4">
                <StatCard
                  icon={<LiaUsersSolid />}
                  value={`${members}+`}
                  label={about.stats.impactedLives.title}
                  delay={0}
                />
                <StatCard
                  icon={<PiPark />}
                  value={`${meetings}+`}
                  label={about.stats.memoriesCreated.title}
                  delay={0.15}
                />
                <StatCard
                  icon={<LuCalendarDays className="w-9 h-9" />}
                  value={about.stats.started.number}
                  label={about.stats.started.title}
                  delay={0.3}
                />
              </div>
            </div>
          </motion.div>

          {/* BUTTON */}
          <div className="relative z-30 w-full">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="relative z-30 bg-white border border-[#0d4db0] text-[#0d4db0] px-8 py-4 font-semibold w-full shadow-md hover:bg-[#0d4db0] hover:text-white transition-all duration-700 cursor-pointer"
              onClick={() => router.push("/about")}
            >
              {about.button}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
