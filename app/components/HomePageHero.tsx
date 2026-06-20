"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TfiWrite } from "react-icons/tfi";

import { useLanguage } from "../context/language";

export default function HeroSection() {
  const router = useRouter();
  const { t } = useLanguage();

  const hero = t.home.hero;

  return (
    <section className="relative text-white overflow-hidden min-h-[80vh] md:min-h-[99.7vh] bg-[#0d4db0]">
      {/* Background Video - Fixed View */}
      <motion.video
  autoPlay
  muted
  loop
  playsInline
  className="fixed md:top-0 top-28 left-0 w-full h-full my-auto md:h-full object-cover md:object-cover md:scale-105 z-0"
  style={{
    objectPosition: "60% 60%",
  }}
  animate={{
    scale: 1.05,
    objectPosition: [
      "50% 40%", // sec 1
      "50% 50%", // sec 2
      "0% 50%",  // sec 3
      "20% 50%",  // sec 4
      "30% 50%", // sec 5
      "55% 50%", // sec 6
      "52% 50%", // sec 7
      "50% 50%", // sec 8
      "75% 60%", // sec 9
      "60% 40%", // sec 10
    ],
  }}
  transition={{
    scale: {
      duration: 10,
      ease: "easeOut",
    },
    objectPosition: {
      duration: 24,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  }}
  initial={{ scale: 1.15 }}
>
  <source
    src={hero?.backgroundMedia?.src || "/videos/park.mp4"}
    type="video/mp4"
  />
</motion.video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 z-20 pointer-events-none">
        <div className="h-full w-full bg-linear-to-t from-black/90 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[97vh] px-6 text-center">
        {/* Paso Libre Brand */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 flex justify-center items-center"
        >
          <div className="absolute scale-120 opacity-40 blur-sm">
            <div className="relative">
              <Image
                src="/logo-title-4.png"
                alt="Paso Libre Logo Background"
                width={420}
                height={210}
                className="object-contain"
              />
            </div>
          </div>

          <Image
            src="/logo-title-2.png"
            alt="Paso Libre Logo"
            width={400}
            height={200}
            className="relative object-contain"
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight drop-shadow-lg tracking-tighter text-white/90 relative"
        >
          {hero?.headline?.split(hero?.boldHeadline)?.[0]}
          <span className="relative inline-block">
            <span className="text-[#0d4db0]/50 text-shadow-2xs text-shadow-[#0d4db0]">
              {hero?.boldHeadline}
            </span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeInOut" }}
              className="absolute left-0 -bottom-1 h-0.75 bg-sky-400 rounded-full"
            />
          </span>
          {hero?.headline?.split(hero?.boldHeadline)?.[1]}
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 sm:mt-10 relative inline-block w-full max-w-[92vw] sm:w-auto"
        >
          {/* FIXED BORDER WRAPPER */}
          <div className="relative w-full max-w-85 sm:max-w-none mx-auto sm:w-auto">
            <span className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none" />

            <button
              onClick={() => router.push("/sign-up")}
              className="relative flex w-full items-center justify-center gap-2.5 rounded-full
              bg-linear-to-r from-[#0d4db0] to-[#3b82f6] px-4 py-3 text-white shadow-lg shadow-blue-500/40
              transition-all duration-700 hover:from-[#0d4db0] hover:to-[#0d4db0] cursor-pointer
              sm:w-auto sm:gap-4 sm:px-8"
            >
              <TfiWrite className="shrink-0 text-base sm:text-lg w-8 h-8 sm:w-9 sm:h-9 p-2 sm:p-2.5 rounded-xl bg-sky-200/30 shadow-sm" />

              <div className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
                <span className="truncate text-base font-semibold sm:text-lg md:text-2xl">
                  {hero?.cta?.main}
                </span>

                <span className="writing-vertical-rl rotate-270 text-[10px] sm:text-[12px] font-light opacity-80 relative right-1 sm:right-2 shrink-0">
                  {hero?.cta?.connector}
                </span>

                <span className="text-sky-200 relative right-2 sm:right-3.5 text-lg sm:text-2xl shrink-0">
                  {hero?.cta?.ending}
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
