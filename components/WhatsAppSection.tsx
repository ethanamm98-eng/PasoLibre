"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

const WhatsAppCommunitySection = () => {
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  return (
    <section className="relative overflow-hidden border border-white/20 bg-white/90 px-6 py-24 text-center shadow-lg backdrop-blur-md md:px-24">
      {/* Background subtle animated glows */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 -top-20 h-75 w-75 rounded-full bg-green-400/20 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 right-10 h-100 w-100 rounded-full bg-emerald-400/20 blur-[140px]"
      />

      {/* Elegant circular background behind phone */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-1/2 top-1/2 z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-green-400/20 to-emerald-400/10 blur-[120px] md:h-96 md:w-96"
      />

      {/* Premium iPhone-style mockup */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-8 flex justify-center"
      >
        <div className="relative h-133.75 w-65.5 md:h-155 md:w-75">
          {/* floor shadow */}
          <div className="absolute inset-0 translate-y-6 scale-[0.92] rounded-[3.2rem] bg-black/20 blur-2xl" />

          {/* side buttons */}
          <div className="absolute -left-0.75 top-28 z-20 h-10 w-0.75 rounded-full bg-gray-300 shadow-sm md:top-32 md:h-12" />
          <div className="absolute -left-0.75 top-40 z-20 h-16 w-0.75 rounded-full bg-gray-300 shadow-sm md:top-48 md:h-20" />
          <div className="absolute -right-0.75 top-40 z-20 h-20 w-0.75 rounded-full bg-gray-300 shadow-sm md:top-48 md:h-24" />

          {/* phone frame */}
          <div className="relative h-full w-full rounded-[3.2rem] bg-linear-to-b from-white via-[#f8f8f9] to-[#e7e8eb] p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
            {/* metallic rim */}
            <div className="absolute inset-[1.5px] rounded-[3rem] border border-white/70 pointer-events-none" />
            <div className="absolute inset-0.75 rounded-[2.95rem] border border-gray-200/80 pointer-events-none" />

            {/* black bezel / screen cavity */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.85rem] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              {/* iPhone dynamic island style */}
              <div className="absolute left-1/2 top-3 z-30 h-7 w-29.5 -translate-x-1/2 rounded-full bg-black shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                <div className="absolute left-4.5 top-1/2 h-1.75 w-13 -translate-y-1/2 rounded-full bg-zinc-800" />
                <div className="absolute right-4.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-zinc-800">
                  <div className="absolute inset-[1.5px] rounded-full bg-zinc-700" />
                </div>
              </div>

              {/* screen */}
              <div className="absolute inset-0 overflow-hidden bg-[#efeae2]">
                {/* subtle whatsapp wallpaper */}
                <div className="absolute inset-0 opacity-[0.12]">
                  <div className="absolute left-5 top-20 h-20 w-20 rounded-full border border-green-300/50" />
                  <div className="absolute right-6 top-32 h-14 w-14 rounded-full border border-emerald-300/40" />
                  <div className="absolute bottom-24 left-10 h-24 w-24 rounded-full border border-teal-300/30" />
                  <div className="absolute bottom-36 right-8 h-10 w-10 rounded-full border border-lime-300/30" />
                </div>

                {/* status bar */}
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

                {/* whatsapp header */}
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
                      <p className="text-[13px] font-semibold leading-none">
                        Paso Libre
                      </p>
                      <p className="mt-1 text-[10px] text-white/80">
                        comunidad activa • online
                      </p>
                    </div>
                  </div>
                </div>

                {/* messages */}
                <div className="absolute inset-x-0 bottom-16 top-28 overflow-hidden px-3 py-4 text-left">
                  <div className="mb-3 flex justify-center">
                    <span className="rounded-full bg-[#f7f3c7] px-3 py-1 text-[10px] text-slate-500 shadow-sm">
                      Today
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="max-w-[79%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[11px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p className="font-medium text-emerald-700">Paso Libre</p>
                      <p className="mt-1">
                        Hola familia 💚 Ya está disponible el próximo evento.
                      </p>
                      <div className="mt-1 flex justify-end gap-1 text-[9px] text-slate-400">
                        <span>9:12 AM</span>
                      </div>
                    </div>

                    <div className="ml-auto max-w-[72%] rounded-2xl rounded-tr-md bg-[#dcf8c6] px-3 py-2 text-[11px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p>¡Qué emoción! ¿Dónde será? ✨</p>
                      <div className="mt-1 flex justify-end gap-1 text-[9px] text-slate-400">
                        <span>9:14 AM</span>
                        <span className="text-sky-500">✓✓</span>
                      </div>
                    </div>

                    <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[11px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p>
                        En Mayagüez 📍 Tendremos apoyo comunitario, recursos y
                        actividades.
                      </p>
                      <div className="mt-1 flex justify-end gap-1 text-[9px] text-slate-400">
                        <span>9:16 AM</span>
                      </div>
                    </div>

                    <div className="ml-auto max-w-[76%] rounded-2xl rounded-tr-md bg-[#dcf8c6] px-3 py-2 text-[11px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p>Perfecto. Nos vemos allá 💙🏳️‍⚧️</p>
                      <div className="mt-1 flex justify-end gap-1 text-[9px] text-slate-400">
                        <span>9:18 AM</span>
                        <span className="text-sky-500">✓✓</span>
                      </div>
                    </div>

                    <div className="max-w-[84%] rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[11px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p className="font-medium text-emerald-700">Paso Libre</p>
                      <p className="mt-1">
                        Gracias por ser parte de esta comunidad 🌈
                      </p>
                      <div className="mt-1 flex justify-end gap-1 text-[9px] text-slate-400">
                        <span>9:19 AM</span>
                      </div>
                    </div>

                    {/* typing indicator */}
                    <div className="max-w-[38%] rounded-2xl rounded-tl-md bg-white px-3 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.2s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.1s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* input bar */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 px-3 py-3">
                  <div className="flex h-11 flex-1 items-center rounded-full bg-white px-4 text-[11px] text-slate-400 shadow-sm">
                    Hola Cori! 💙 Nos vemos...
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-md">
                    <FaPaperPlane className="ml-px text-sm" />
                  </div>
                </div>

                {/* glass / reflections */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent" />
                <div className="pointer-events-none absolute left-3 top-10 h-[65%] w-[35%] rounded-full bg-white/8 blur-2xl" />
              </div>

              {/* home bar */}
              <div className="absolute bottom-2 left-1/2 z-30 h-1.5 w-28 -translate-x-1/2 rounded-full bg-white/20" />
            </div>
          </div>

          {/* outer glossy edge */}
          <div className="pointer-events-none absolute inset-0 rounded-[3.2rem] bg-linear-to-tr from-white/0 via-white/0 to-white/20 opacity-70" />
        </div>
      </motion.div>

      <motion.h2
        className="relative z-10 mb-6 text-4xl font-bold text-green-800 md:text-5xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t.whatsappTitle}
      </motion.h2>

      <motion.p
        className="relative z-10 mx-auto mb-8 max-w-2xl text-lg text-green-700/90 md:text-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {t.whatsappText}
      </motion.p>

      <motion.a
        href="https://chat.whatsapp.com/HfEsdAkCobTIihCCAss7mN"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <FaWhatsapp className="text-2xl" />
        {t.whatsappButton}
      </motion.a>
    </section>
  );
};

export default WhatsAppCommunitySection;
