"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  FaWhatsapp,
  FaArrowLeft,
  FaPaperPlane,
  FaTiktok,
} from "react-icons/fa";

import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

export default function AboutSocialCommunitySection() {
  const { language } = useLanguage();
  const t = aboutTranslations?.[language];
  const whatsapp = t?.whatsappTitle;
  const whatsappText = t?.whatsappText;
  const whatsappButton = t?.whatsappButton;
  const tt = t?.tiktokSection;

  const videos = useMemo(
    () => ["7623910862838943007", "7616444030641114399", "7609031445171997983"],
    []
  );

  const whatsappChatMessage = useMemo(
    () => "Hola Cori <3 Nos vemos mañana en el Running & Walking Club.",
    []
  );

  const particles = useMemo(
    () => [
      { x: 140, y: 120 },
      { x: 420, y: 260 },
      { x: 760, y: 180 },
      { x: 980, y: 420 },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [typedInputMessage, setTypedInputMessage] = useState("");
  const [hasSentWhatsappMessage, setHasSentWhatsappMessage] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: ReturnType<typeof setInterval>;
    let sendTimeout: ReturnType<typeof setTimeout>;

    const startTypingTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        currentIndex += 1;
        setTypedInputMessage(whatsappChatMessage.slice(0, currentIndex));

        if (currentIndex >= whatsappChatMessage.length) {
          clearInterval(typingInterval);

          sendTimeout = setTimeout(() => {
            setHasSentWhatsappMessage(true);
            setTypedInputMessage("");
          }, 750);
        }
      }, 34);
    }, 900);

    return () => {
      clearTimeout(startTypingTimeout);
      clearTimeout(sendTimeout);
      clearInterval(typingInterval);
    };
  }, [whatsappChatMessage]);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovering, videos.length]);

  const handleDragEnd = (_: unknown, info: { offset: { y: number } }) => {
    if (info.offset.y < -50) {
      setIndex((prev) => (prev + 1) % videos.length);
    } else if (info.offset.y > 50) {
      setIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), {
    stiffness: 120,
    damping: 15,
  });

  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
    stiffness: 120,
    damping: 15,
  });

  const phoneLift = useSpring(useTransform(y, [-120, 120], [-6, 6]), {
    stiffness: 100,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  const whatsappCard = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="relative overflow-hidden rounded-4xl border border-emerald-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:p-8"
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
          <FaWhatsapp className="text-xl" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
          WhatsApp Community
        </p>

        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
          {whatsapp || "Stay close to the community"}
        </h3>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          {whatsappText ||
            "Conecta con nuestra comunidad y entérate de eventos, noticias y apoyo directo por WhatsApp."}
        </p>

        <a
          href="https://chat.whatsapp.com/HfEsdAkCobTIihCCAss7mN"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:scale-[1.03] hover:bg-green-700"
        >
          <FaWhatsapp className="text-base" />
          {whatsappButton || "Join WhatsApp"}
        </a>
      </div>
    </motion.div>
  );

  const tiktokCard = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="relative overflow-hidden rounded-4xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:p-8"
    >
      <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-pink-400/10 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
          <FaTiktok className="text-xl" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">
          TikTok Stories
        </p>

        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
          {tt?.title || "Follow our social presence"}
        </h3>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          {tt?.description ||
            "Síguenos para ver momentos reales, historias auténticas y la energía de nuestra comunidad en cada video."}
        </p>

        <a
          href="https://www.tiktok.com/@pasolibre.pr"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.03] hover:bg-black"
        >
          <FaTiktok className="text-base" />
          {tt?.button || "Follow on TikTok"}
        </a>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden px-4 py-20 text-slate-900 sm:px-5 md:px-10 md:py-24 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))]" />

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-10 h-75 w-75 rounded-full bg-green-400/14 blur-[115px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-25 right-0 h-95 w-95 rounded-full bg-pink-400/10 blur-[145px]"
      />

      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{ x: p.x }}
          className="absolute h-2.5 w-2.5 rounded-full bg-slate-300/40 opacity-30 blur-sm"
          initial={{ y: p.y }}
          animate={{ y: [p.y, p.y - 24, p.y] }}
          transition={{
            duration: 12 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl border border-slate-200/70 bg-white/80 px-4 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-6 md:rounded-[2.25rem] md:px-10 md:py-12 lg:px-14">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-slate-300/80 to-transparent" />

          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm"
            >
              <FaWhatsapp className="text-emerald-500" />
              <FaTiktok className="text-pink-500" />
              {language === "en"
                ? "Community & Social Presence"
                : "Comunidad y Presencia Social"}
            </motion.div>

            <motion.h2
              className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {language === "en"
                ? "Stay connected with Paso Libre"
                : "Mantente conectado con Paso Libre"}
            </motion.h2>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {language === "en"
                ? "Join our community conversations and follow the stories that move Paso Libre forward."
                : "Únete a nuestras conversaciones comunitarias y sigue las historias que impulsan a Paso Libre hacia adelante."}
            </motion.p>
          </div>

          <div className="space-y-16 md:space-y-20">
            {/* WhatsApp section above */}
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
              <div className="order-2 lg:order-1">{whatsappCard}</div>

              <motion.div
                initial={{ opacity: 0, x: 36, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9 }}
                className="relative order-1 flex w-full justify-center lg:order-2"
              >
                <div className="absolute left-1/2 top-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-green-400/20 to-emerald-400/10 blur-[100px] sm:h-80 sm:w-80 md:h-96 md:w-96 md:blur-[120px]" />

                <div className="relative h-125 w-[min(252px,78vw)] sm:h-133.75 sm:w-65.5 md:h-155 md:w-75">
                  <div className="absolute inset-0 translate-y-6 scale-[0.92] rounded-[3.2rem] bg-black/20 blur-2xl" />

                  <div className="absolute -left-0.75 top-28 z-20 h-10 w-0.75 rounded-full bg-gray-300 shadow-sm md:top-32 md:h-12" />
                  <div className="absolute -left-0.75 top-40 z-20 h-16 w-0.75 rounded-full bg-gray-300 shadow-sm md:top-48 md:h-20" />
                  <div className="absolute -right-0.75 top-40 z-20 h-20 w-0.75 rounded-full bg-gray-300 shadow-sm md:top-48 md:h-24" />

                  <div className="relative h-full w-full rounded-[3.2rem] bg-linear-to-b from-white via-[#f8f8f9] to-[#e7e8eb] p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                    <div className="pointer-events-none absolute inset-[1.5px] rounded-[3rem] border border-white/70" />
                    <div className="pointer-events-none absolute inset-0.75 rounded-[2.95rem] border border-gray-200/80" />

                    <div className="relative h-full w-full overflow-hidden rounded-[2.85rem] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                      <div className="absolute left-1/2 top-3 z-30 h-7 w-29.5 -translate-x-1/2 rounded-full bg-black shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                        <div className="absolute left-4.5 top-1/2 h-1.75 w-13 -translate-y-1/2 rounded-full bg-zinc-800" />
                        <div className="absolute right-4.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-zinc-800">
                          <div className="absolute inset-[1.5px] rounded-full bg-zinc-700" />
                        </div>
                      </div>

                      <div className="absolute inset-0 overflow-hidden bg-[#efeae2]">
                        <div className="absolute inset-0 opacity-[0.12]">
                          <div className="absolute left-5 top-20 h-20 w-20 rounded-full border border-green-300/50" />
                          <div className="absolute right-6 top-32 h-14 w-14 rounded-full border border-emerald-300/40" />
                          <div className="absolute bottom-24 left-10 h-24 w-24 rounded-full border border-teal-300/30" />
                          <div className="absolute bottom-36 right-8 h-10 w-10 rounded-full border border-lime-300/30" />
                        </div>

                        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-4 text-[10px] font-medium text-white">
                          <span>9:41</span>
                          <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/75" />
                            <div className="flex h-2.5 w-4.5 items-center rounded-[3px] border border-white/80 px-0.5">
                              <div className="h-1 w-2.5 rounded-xs bg-white" />
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-x-0 top-0 z-10 h-28 bg-[#0b6f63] text-white">
                          <div className="flex h-full items-end px-4 pb-4 pt-8">
                            <div className="mr-3 flex items-center">
                              <FaArrowLeft className="text-sm" />
                            </div>

                            <div className="mr-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white shadow-sm">
                              <Image
                                src="/logo-title.jpg"
                                alt="Paso Libre"
                                className="h-full w-full object-cover"
                                width={40}
                                height={40}
                              />
                            </div>

                            <div className="text-left">
                              <p className="flex items-center gap-1.5 text-[13px] font-semibold leading-none">
                                <span>Paso Libre</span>
                                <span className="text-[12px] leading-none">
                                  🏳️‍⚧️
                                </span>
                                <span className="text-[12px] leading-none">
                                  🏳️‍🌈
                                </span>
                              </p>
                              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/80">
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                                </span>
                                <span>online</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-16 top-28 overflow-hidden px-3 py-4 text-left">
                          <div className="mb-3 flex justify-center">
                            <span className="rounded-full bg-[#f7f3c7] px-3 py-1 text-[10px] text-slate-500 shadow-sm">
                              Today
                            </span>
                          </div>

                          <div className="space-y-3">
                            <AnimatePresence>
                              {hasSentWhatsappMessage && (
                                <motion.div
                                  initial={{ opacity: 0, y: 28, scale: 0.94 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                  transition={{
                                    duration: 0.48,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-[#dcf8c6] px-3 py-2 text-[11px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                                >
                                  <p>{whatsappChatMessage}</p>
                                  <div className="mt-1 flex justify-end gap-1 text-[9px] text-slate-400">
                                    <span>9:12 AM</span>
                                    <motion.span
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.4 }}
                                      className="text-sky-500"
                                    >
                                      ✓✓
                                    </motion.span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 px-3 py-3">
                          <motion.div
                            animate={{
                              boxShadow:
                                typedInputMessage && !hasSentWhatsappMessage
                                  ? "0 0 0 2px rgba(34,197,94,0.08)"
                                  : "0 1px 2px rgba(0,0,0,0.06)",
                            }}
                            transition={{ duration: 0.25 }}
                            className="flex h-11 flex-1 items-center rounded-full bg-white px-4 text-[11px] shadow-sm"
                          >
                            <span
                              className={`line-clamp-1 ${
                                hasSentWhatsappMessage && !typedInputMessage
                                  ? "text-slate-400"
                                  : "text-slate-500"
                              }`}
                            >
                              {typedInputMessage ||
                                (hasSentWhatsappMessage ? "Message" : "")}

                              {typedInputMessage &&
                                !hasSentWhatsappMessage &&
                                typedInputMessage.length <
                                  whatsappChatMessage.length && (
                                  <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                      duration: 0.75,
                                      repeat: Infinity,
                                    }}
                                    className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-slate-500"
                                  />
                                )}
                            </span>
                          </motion.div>

                          <motion.div
                            animate={
                              typedInputMessage.length ===
                                whatsappChatMessage.length &&
                              !hasSentWhatsappMessage
                                ? {
                                    scale: [1, 1.12, 1],
                                    backgroundColor: [
                                      "#1fa855",
                                      "#16a34a",
                                      "#1fa855",
                                    ],
                                  }
                                : { scale: 1, backgroundColor: "#1fa855" }
                            }
                            transition={{
                              duration: 0.55,
                              repeat:
                                typedInputMessage.length ===
                                  whatsappChatMessage.length &&
                                !hasSentWhatsappMessage
                                  ? 1
                                  : 0,
                            }}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-md"
                          >
                            <motion.div
                              animate={
                                typedInputMessage.length ===
                                  whatsappChatMessage.length &&
                                !hasSentWhatsappMessage
                                  ? {
                                      x: [0, 8, 0],
                                      y: [0, -6, 0],
                                      opacity: [1, 0.75, 1],
                                    }
                                  : { x: 0, y: 0, opacity: 1 }
                              }
                              transition={{
                                duration: 0.45,
                                ease: "easeOut",
                              }}
                            >
                              <FaPaperPlane className="ml-px text-sm" />
                            </motion.div>
                          </motion.div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute left-3 top-10 h-[65%] w-[35%] rounded-full bg-white/8 blur-2xl" />
                      </div>

                      <div className="absolute bottom-2 left-1/2 z-30 h-1.5 w-28 -translate-x-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[3.2rem] bg-linear-to-tr from-white/0 via-white/0 to-white/20 opacity-70" />
                </div>
              </motion.div>
            </div>

            {/* TikTok section below */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 mb-10">
              <motion.div
                onMouseEnter={() => setIsHovering(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  y: phoneLift,
                  transformPerspective: 1200,
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: -36, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="relative flex w-full cursor-grab justify-center active:cursor-grabbing"
              >
                <div className="absolute left-1/2 top-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-pink-400/14 via-cyan-400/10 to-indigo-400/12 blur-[100px] sm:h-80 sm:w-80 md:blur-[120px]" />

                <div className="relative h-140 w-[min(292px,84vw)] sm:h-160 sm:w-[320px] md:h-170 md:w-85">
                  <div className="absolute inset-0 translate-y-8 scale-[0.95] rounded-[3.4rem] bg-black/25 blur-2xl" />

                  <div className="absolute -left-0.75 top-32.5 z-10 h-16 w-1 rounded-full bg-zinc-700 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
                  <div className="absolute -left-0.75 top-50 z-10 h-24 w-1 rounded-full bg-zinc-700 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />

                  <div className="relative h-full w-full rounded-[3.4rem] bg-linear-to-b from-[#1b1b1f] via-[#0f0f12] to-[#030303] p-1.75 shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <div className="pointer-events-none absolute inset-0.5 rounded-[3.25rem] border border-white/5" />

                    <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                      <div className="absolute left-1/2 top-0 z-30 h-7.5 w-34.5 -translate-x-1/2 rounded-b-[1.2rem] bg-black shadow-[0_8px_18px_rgba(0,0,0,0.45)]">
                        <div className="absolute left-1/2 top-2 h-1.5 w-13 -translate-x-1/2 rounded-full bg-zinc-800" />
                        <div className="absolute right-8.5 top-2 h-1.75 w-1.75 rounded-full bg-zinc-800">
                          <div className="absolute inset-[1.5px] rounded-full bg-zinc-700" />
                        </div>
                      </div>

                      <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-black">
                        <AnimatePresence mode="wait">
                          <motion.iframe
                            key={videos[index]}
                            src={`https://www.tiktok.com/player/v1/${videos[index]}?autoplay=1&mute=1&controls=0&description=0`}
                            className="absolute inset-0 my-auto h-[85%] w-full"
                            allow="autoplay; encrypted-media"
                            initial={{ y: 110, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -110, opacity: 0 }}
                            transition={{
                              duration: 0.55,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </AnimatePresence>

                        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-black/35 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-linear-to-t from-black/30 to-transparent" />

                        <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-br from-white/12 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute left-3 top-10 z-20 h-[70%] w-[32%] rounded-full bg-white/6 blur-2xl" />
                      </div>

                      <div className="pointer-events-none absolute inset-px rounded-[3rem] ring-1 ring-white/5" />

                      <div className="absolute bottom-4 left-1/2 z-30 h-1.5 w-28 -translate-x-1/2 rounded-full bg-white/18 backdrop-blur-sm" />

                      <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2">
                        {videos.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={`rounded-full transition-all ${
                              i === index
                                ? "h-7 w-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                                : "h-2.5 w-2.5 bg-white/45"
                            }`}
                            aria-label={`Phone video ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[3.4rem] bg-linear-to-tr from-white/0 via-white/0 to-white/10 opacity-60" />
                </div>
              </motion.div>

              <div>{tiktokCard}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}