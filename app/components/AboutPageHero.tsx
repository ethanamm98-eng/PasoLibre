"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoHeartFill } from "react-icons/go";
import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

const AboutPageHero = () => {
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  return (
    <section className="relative bg-[#0d4db0] text-white overflow-hidden px-5 pt-36 pb-24 sm:px-8 sm:pt-44 sm:pb-32 md:px-16 md:pt-52 md:pb-42 lg:px-24">
      {/* Background Glow Blobs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sky-400/20 blur-[120px] md:h-175 md:w-175 md:blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 h-112 w-md rounded-full bg-indigo-400/20 blur-[120px] md:h-200 md:w-200 md:blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-24 left-1/3 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-[100px] md:h-120 md:w-120 md:blur-[130px]"
      />

      {/* Elegant Ghost Circles */}
      <motion.div
        animate={{ y: [0, -80, 0], x: [0, 40, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-1/4 h-72 w-72 rounded-full border border-sky-300/10 md:h-105 md:w-105"
      />
      <motion.div
        animate={{ y: [0, 70, 0], x: [0, -60, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 h-80 w-80 rounded-full border border-blue-200/10 md:h-130 md:w-130"
      />
      <motion.div
        animate={{ y: [0, -60, 0], x: [0, -30, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-1/3 h-64 w-64 rounded-full border border-indigo-200/10 md:h-75 md:w-75"
      />
      <motion.div
        animate={{ y: [0, 90, 0], x: [0, 50, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 right-24 h-96 w-96 rounded-full border border-sky-100/10 md:h-150 md:w-150"
      />

      {/* Floating Heart Images */}
      {t.heroImages.map((img, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, i % 2 === 0 ? -30 : 25, 0],
            x: [0, i % 2 === 0 ? -15 : 20, 0],
            rotate: [0, i % 2 === 0 ? 2 : -3, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute hidden md:block ${
            i === 0
              ? "right-20 top-[30%]"
              : i === 1
              ? "right-32 top-[50%]"
              : "right-38 top-[38%]"
          } w-28 h-28 scale-105 transition-transform duration-500 hover:scale-110 hover:opacity-100`}
          style={{
            opacity: 0.7 - i * 0.1,
            clipPath:
              "path('M50 90 C20 65 0 45 0 25 C0 10 10 0 25 0 C35 0 45 6 50 15 C55 6 65 0 75 0 C90 0 100 10 100 25 C100 45 80 65 50 90 Z')",
          }}
        >
          <Image
            title={img.title}
            src={img.src}
            alt="heart"
            fill
            className="object-cover object-bottom"
          />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-[45%_55%] md:items-center">
          <motion.div
            className="relative space-y-6 text-center md:space-y-8 md:text-left"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 text-[4.2rem] font-bold tracking-widest opacity-[0.05] sm:text-[6rem] md:-top-12 md:left-0 md:translate-x-0 md:text-[9rem]">
              PASOLIBRE
            </span>

            <h1 className="relative text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t.heroTitle}
              <GoHeartFill className="inline ml-3 text-sky-400" />
            </h1>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "140px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mx-auto h-0.75 rounded-full bg-linear-to-r from-sky-400 via-indigo-400 to-fuchsia-400 md:mx-0"
            />

            <p className="text-base italic tracking-wide text-white/80 sm:text-lg">
              {t.heroTagline}
            </p>

            <p className="mx-auto max-w-xl text-base leading-relaxed tracking-tight text-white sm:text-lg md:mx-0 md:text-xl">
              <b>Pasolibre</b> {t.heroDescriptionStart}{" "}
              <span className="font-bold text-sky-400">
                {t.heroDescriptionHighlight[0]}
              </span>{" "}
              {t?.heroDescriptionMiddle || ""}{" "}
              {language === "es"
                ? "en Puerto Rico mediante recursos y programas centrados en el"
                : "in Puerto Rico through programs and resources focused on"}{" "}
              <span className="font-bold text-sky-400">
                {t.heroDescriptionHighlight[1]}
              </span>
              .
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute h-72 w-72 rounded-full bg-sky-400/20 blur-[90px] sm:h-96 sm:w-96 md:h-130 md:w-130 md:blur-[140px] lg:h-155 lg:w-155" />
            <div className="absolute h-64 w-64 rounded-full bg-fuchsia-400/10 blur-[90px] sm:h-80 sm:w-80 md:h-120 md:w-120 md:blur-[120px] lg:h-145 lg:w-145" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96 md:h-130 md:w-130 lg:h-155 lg:w-155"
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative h-72 w-[18rem] overflow-hidden rounded-full border border-white/20 shadow-2xl sm:h-96 sm:w-[24rem] md:h-125 md:w-125 lg:h-140 lg:w-140"
            >
              <Image
                src="/group/group-picture-1.webp"
                alt="Paso Libre"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Inclusive community section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mt-18 sm:mt-22 md:mt-28"
        >
          <div className="pointer-events-none absolute -inset-x-4 -inset-y-5 rounded-4xl bg-linear-to-r from-sky-400/10 via-white/5 to-fuchsia-400/10 blur-2xl md:-inset-x-8 md:-inset-y-8 md:rounded-[3rem] md:blur-3xl" />

          <div className="relative overflow-hidden rounded-4xl border border-white/15 bg-[#073f94]/45 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl md:rounded-[2.75rem] md:shadow-[0_30px_100px_rgba(0,0,0,0.24)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.14),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_48%,rgba(255,255,255,0.08))]" />
            <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent md:inset-x-10" />
            <div className="absolute inset-x-8 bottom-0 h-px bg-linear-to-r from-transparent via-sky-300/25 to-transparent md:inset-x-16" />

            <div className="relative px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-14">
              <div className="grid gap-7 md:grid-cols-[0.92fr_1.08fr] md:items-center lg:gap-12">
                <div className="relative">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-sky-200/95 sm:text-xs md:text-sm md:tracking-[0.34em]">
                    {language === "es" ? "Nuestra comunidad" : "Our community"}
                  </p>

                  <h3 className="max-w-xl text-2xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-3xl md:text-4xl lg:text-[2.85rem]">
                    {language === "es"
                      ? "Abrimos espacios donde cada identidad, experiencia y voz tiene lugar."
                      : "We create space for every identity, experience, and voice."}
                  </h3>
                </div>

                <div className="relative md:pl-10">
                  <div className="absolute left-0 top-1/2 hidden h-[72%] w-px -translate-y-1/2 bg-linear-to-b from-transparent via-sky-200/45 to-transparent md:block" />

                  <h4 className="max-w-2xl text-left text-base font-medium leading-relaxed tracking-[-0.025em] text-white/82 sm:text-lg md:text-right md:text-2xl lg:text-[1.7rem] lg:leading-snug">
                    {language === "es"
                      ? "Nos conectamos y celebramos la riqueza de nuestras comunidades diversas, desde la interseccionalidad de sus vivencias. "
                      : "We celebrate a community that is diverse, inclusive, and deeply human. These words do not limit people; they help make visible the communities we serve and uplift."}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPageHero;
