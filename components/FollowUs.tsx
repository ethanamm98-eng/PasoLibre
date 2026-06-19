// FOR REAL API INTEGRATION
// Instagram (Meta Graph API)
// NEED:
// Business account
// Access token
/////////////////////////////
// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, animate } from "framer-motion";
// import { FaInstagram, FaTiktok } from "react-icons/fa";

// export default function FollowUsMini() {
//   const [counts, setCounts] = useState({
//     instagram: 0,
//     tiktok: 0,
//   });

//   const [growth, setGrowth] = useState({
//     instagram: 0,
//     tiktok: 0,
//   });

//   const [display, setDisplay] = useState({
//     instagram: 0,
//     tiktok: 0,
//   });

//   // 🚀 FETCH DATA
//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await fetch("/api/socials");
//         const data = await res.json();

//         setCounts({
//           instagram: data.instagram,
//           tiktok: data.tiktok,
//         });

//         setGrowth(data.growth);
//       } catch {
//         setCounts({ instagram: 1200, tiktok: 850 });
//       }
//     };

//     fetchCounts();
//   }, []);

//   // 🔢 SMOOTH COUNT UP
//   useEffect(() => {
//     const controls1 = animate(0, counts.instagram, {
//       duration: 1.2,
//       onUpdate: (v) =>
//         setDisplay((prev) => ({ ...prev, instagram: Math.floor(v) })),
//     });

//     const controls2 = animate(0, counts.tiktok, {
//       duration: 1.2,
//       onUpdate: (v) =>
//         setDisplay((prev) => ({ ...prev, tiktok: Math.floor(v) })),
//     });

//     return () => {
//       controls1.stop();
//       controls2.stop();
//     };
//   }, [counts]);

//   return (
//     <section className="relative py-16 px-6 overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

//       <div className="max-w-4xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="relative rounded-2xl border border-blue-100 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
//         >
//           {/* TEXT */}
//           <div>
//             <p className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-2">
//               Follow Us
//             </p>

//             <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
//               Join our growing community
//             </h3>

//             <p className="text-slate-500 text-sm mt-2">
//               Real moments, updates, and energy.
//             </p>
//           </div>

//           {/* SOCIALS */}
//           <div className="flex gap-4">
//             {/* Instagram */}
//             <motion.a
//               href="https://instagram.com"
//               target="_blank"
//               whileHover={{ y: -4, scale: 1.05 }}
//               className="flex flex-col items-center px-5 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
//             >
//               <FaInstagram />

//               <span className="text-xs mt-1">Instagram</span>

//               <span className="text-lg font-semibold">
//                 {display.instagram.toLocaleString()}
//               </span>

//               {/* Growth */}
//               <span className="text-xs text-white/80">
//                 +{growth.instagram} this week
//               </span>
//             </motion.a>

//             {/* TikTok */}
//             <motion.a
//               href="https://tiktok.com"
//               target="_blank"
//               whileHover={{ y: -4, scale: 1.05 }}
//               className="flex flex-col items-center px-5 py-4 rounded-xl border bg-white text-slate-700 shadow-sm"
//             >
//               <FaTiktok />

//               <span className="text-xs mt-1">TikTok</span>

//               <span className="text-lg font-semibold">
//                 {display.tiktok.toLocaleString()}
//               </span>

//               <span className="text-xs text-slate-400">
//                 +{growth.tiktok} this week
//               </span>
//             </motion.a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

export default function FollowFooterBridge() {
  const { language } = useLanguage();
  const t = aboutTranslations?.[language]?.followBridge;

  const socials = [
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/pasolibre.pr",
      label: "Instagram",
      style:
        "border border-fuchsia-300/25 bg-fuchsia-400/12 text-white hover:bg-fuchsia-400/18 hover:border-fuchsia-300/40 shadow-[0_12px_30px_rgba(0,0,0,0.16)]",
    },
    {
      Icon: FaTiktok,
      href: "https://tiktok.com/@pasolibre.pr",
      label: "TikTok",
      style:
        "border border-white/15 bg-white/10 text-white hover:bg-white/14 hover:border-white/25 shadow-[0_12px_30px_rgba(0,0,0,0.16)]",
    },
    {
      Icon: FaWhatsapp,
      href: "https://chat.whatsapp.com/HfEsdAkCobTIihCCAss7mN",
      label: "WhatsApp",
      style:
        "border border-emerald-300/25 bg-emerald-400/12 text-white hover:bg-emerald-400/18 hover:border-emerald-300/40 shadow-[0_12px_30px_rgba(0,0,0,0.16)]",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#0d4db0] text-white">
      {/* Background depth */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0d4db0] via-[#1557bc] to-[#233e91]" />

      {/* Floating glow */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-20 left-1/4 w-80 h-80 bg-sky-400/16 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
        className="absolute -bottom-20 right-1/4 w-80 h-80 bg-indigo-400/16 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-fuchsia-400/10 blur-[130px] rounded-full"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2.75rem] border border-white/14 bg-white/8 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.22)] px-8 md:px-16 py-16 text-center"
        >
          {/* subtle shine */}
          <div className="absolute inset-0 rounded-[2.75rem] bg-linear-to-br from-white/16 via-transparent to-transparent pointer-events-none" />

          {/* extra soft inner glow */}
          <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent opacity-60 pointer-events-none" />

          {/* LABEL */}
          <p className="text-xs tracking-[0.35em] uppercase text-white/60 mb-6">
            {t?.label}
          </p>

          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            <span className="bg-linear-to-r from-sky-300 via-white to-violet-300 bg-clip-text text-transparent">
              {t?.title}
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 text-white/72 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t?.description}
          </p>

          {/* SOCIAL CARDS */}
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {socials.map(({ Icon, href, label, style }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`group flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md ${style}`}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/10 group-hover:bg-white/14 transition-all duration-300">
                  <Icon className="text-[1rem]" />
                </span>
                <span className="text-sm font-medium tracking-wide">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <p className="mt-10 text-sm text-white/60 tracking-wide">{t?.cta}</p>
        </motion.div>
      </div>

      {/* Flow arrows */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none opacity-65">
        <motion.svg width="500" height="140" viewBox="0 0 500 140" fill="none">
          <motion.path
            d="M0 20 C 120 100, 380 100, 500 20"
            stroke="url(#gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          {[180, 250, 320].map((x, i) => (
            <motion.path
              key={i}
              d={`M${x} 100 L${x - 6} 112 L${x + 6} 112 Z`}
              fill="url(#gradient)"
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.3,
              }}
            />
          ))}

          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="500" y2="0">
              <stop stopColor="#7dd3fc" />
              <stop offset="0.5" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
}
