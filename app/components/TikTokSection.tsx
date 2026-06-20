const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useTransform,
//   useSpring,
//   useScroll,
// } from "framer-motion";
// import { FaTiktok } from "react-icons/fa";
// import { useLanguage } from "../context/language";
// import { aboutTranslations } from "../lib/translations/about";

// export default function AboutTikTokSection() {
//   const { language } = useLanguage();
//   const t = aboutTranslations?.[language]?.tiktokSection;

//   const videos = useMemo(
//     () => ["7623910862838943007", "7616444030641114399", "7609031445171997983"],
//     []
//   );

//   const [index, setIndex] = useState(0);
//   const [mounted, setMounted] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

//   useEffect(() => {
//     setMounted(true);

//     const generated = [...Array(6)].map(() => ({
//       x: Math.random() * 1000,
//       y: Math.random() * 600,
//     }));

//     setParticles(generated);
//   }, []);

//   useEffect(() => {
//     if (isHovering) return;

//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % videos.length);
//     }, 4500);

//     return () => clearInterval(interval);
//   }, [isHovering, videos.length]);

//   const handleDragEnd = (_: any, info: any) => {
//     if (info.offset.y < -50) {
//       setIndex((prev) => (prev + 1) % videos.length);
//     } else if (info.offset.y > 50) {
//       setIndex((prev) => (prev - 1 + videos.length) % videos.length);
//     }
//   };

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), {
//     stiffness: 120,
//     damping: 15,
//   });

//   const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
//     stiffness: 120,
//     damping: 15,
//   });

//   const phoneLift = useSpring(useTransform(y, [-120, 120], [-6, 6]), {
//     stiffness: 100,
//     damping: 18,
//   });

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     x.set(e.clientX - rect.left - rect.width / 2);
//     y.set(e.clientY - rect.top - rect.height / 2);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//     setIsHovering(false);
//   };

//   const { scrollYProgress } = useScroll();
//   const particleY = useTransform(scrollYProgress, [0, 1], [0, -200]);

//   return (
//     <section className="relative overflow-hidden bg-sky-50/90 px-6 py-40 text-slate-900 backdrop-blur-lg">
//       {mounted &&
//         particles.map((p, i) => (
//           <motion.div
//             key={i}
//             style={{
//               y: particleY,
//               x: p.x,
//             }}
//             className="absolute h-3 w-3 rounded-full bg-linear-to-r from-pink-400 to-cyan-400 opacity-20 blur-sm"
//             initial={{ y: p.y }}
//           />
//         ))}

//       <div className="relative z-10 mx-auto max-w-6xl">
//         <div className="relative">
//           <div className="absolute inset-0 rounded-[3rem] bg-linear-to-br from-white via-sky-100/40 to-indigo-100/40 opacity-70 blur-3xl" />

//           <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/70 px-8 py-16 shadow-[0_40px_120px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:px-16">
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: "200%" }}
//               transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
//               className="absolute left-0 top-0 h-full w-1/2 skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
//             />

//             <div className="mb-28 text-center">
//               <div className="mb-6 inline-block rounded-full bg-slate-100 px-4 py-1 text-xs uppercase tracking-widest text-slate-500">
//                 {t?.backgroundWord}
//               </div>

//               <h2 className="text-4xl font-semibold md:text-6xl">
//                 <span className="bg-linear-to-r from-pink-500 via-slate-900 to-cyan-500 bg-clip-text text-transparent">
//                   {t?.title}
//                 </span>
//               </h2>

//               <p className="mx-auto mt-8 max-w-xl text-lg text-slate-500">
//                 {t?.description}
//               </p>
//             </div>

//             <div className="grid items-center gap-16 md:grid-cols-2">
//               <div className="flex flex-col gap-6">
//                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-100 bg-linear-to-r from-pink-50 to-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
//                   <FaTiktok className="text-sm text-pink-500" />
//                   Social Presence
//                 </div>

//                 <h3 className="text-2xl font-medium md:text-3xl">
//                   {t?.ctaTitle}
//                 </h3>

//                 <p className="max-w-lg text-slate-500">{t?.ctaDescription}</p>

//                 <div className="flex flex-wrap gap-3">
//                   <a
//                     href="https://www.tiktok.com/@pasolibre.pr"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-white transition hover:scale-[1.03] hover:bg-black"
//                   >
//                     <FaTiktok />
//                     {t?.button}
//                   </a>
//                 </div>

//                 <div className="mt-2 flex gap-2">
//                   {videos.map((_, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       onClick={() => setIndex(i)}
//                       className={`h-2.5 rounded-full transition-all duration-300 ${
//                         i === index
//                           ? "w-8 bg-slate-900"
//                           : "w-2.5 bg-slate-300 hover:bg-slate-400"
//                       }`}
//                       aria-label={`Show video ${i + 1}`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <motion.div
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                   rotateX,
//                   rotateY,
//                   y: phoneLift,
//                   transformPerspective: 1200,
//                 }}
//                 drag="y"
//                 dragConstraints={{ top: 0, bottom: 0 }}
//                 onDragEnd={handleDragEnd}
//                 className="relative flex cursor-grab justify-center active:cursor-grabbing"
//               >
//                 <div className="relative h-160 w-[320px] md:h-170 md:w-85">
//                   <div className="absolute inset-0 translate-y-8 scale-[0.95] rounded-[3.4rem] bg-black/25 blur-2xl" />

//                   <div className="absolute -left-0.75 top-32.5 z-10 h-16 w-1 rounded-full bg-zinc-700 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
//                   <div className="absolute -left-0.75 top-50 z-10 h-24 w-1 rounded-full bg-zinc-700 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />
//                   <div className="absolute -right-0.75 top-47.5 z-10 h-20 w-1 rounded-full bg-zinc-700 shadow-[0_0_8px_rgba(255,255,255,0.08)]" />

//                   <div className="relative h-full w-full rounded-[3.4rem] bg-linear-to-b from-[#1b1b1f] via-[#0f0f12] to-[#030303] p-1.75 shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]">
//                     <div className="absolute inset-0.5 rounded-[3.25rem] border border-white/5 pointer-events-none" />

//                     <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//                       <div className="absolute left-1/2 top-0 z-30 h-7.5 w-34.5 -translate-x-1/2 rounded-b-[1.2rem] bg-black shadow-[0_8px_18px_rgba(0,0,0,0.45)]">
//                         <div className="absolute left-1/2 top-2 h-1.5 w-13 -translate-x-1/2 rounded-full bg-zinc-800" />
//                         <div className="absolute right-8.5 top-2 h-1.75 w-1.75 rounded-full bg-zinc-800">
//                           <div className="absolute inset-[1.5px] rounded-full bg-zinc-700" />
//                         </div>
//                       </div>

//                       <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-black">
//                         <AnimatePresence mode="wait">
//                           <motion.iframe
//                             key={videos[index]}
//                             src={`https://www.tiktok.com/player/v1/${videos[index]}?autoplay=1&mute=1&controls=0&description=0`}
//                             className="absolute inset-0 h-[85%] my-auto w-full"
//                             allow="autoplay; encrypted-media"
//                             initial={{ y: 110, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             exit={{ y: -110, opacity: 0 }}
//                             transition={{
//                               duration: 0.55,
//                               ease: [0.22, 1, 0.36, 1],
//                             }}
//                           />
//                         </AnimatePresence>

//                         <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-black/35 to-transparent" />
//                         <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-linear-to-t from-black/30 to-transparent" />

//                         <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-br from-white/12 via-transparent to-transparent" />
//                         <div className="pointer-events-none absolute left-3 top-10 z-20 h-[70%] w-[32%] rounded-full bg-white/6 blur-2xl" />
//                       </div>

//                       <div className="pointer-events-none absolute inset-px rounded-[3rem] ring-1 ring-white/5" />

//                       <div className="absolute bottom-4 left-1/2 z-30 h-1.5 w-28 -translate-x-1/2 rounded-full bg-white/18 backdrop-blur-sm" />

//                       <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2">
//                         {videos.map((_, i) => (
//                           <button
//                             key={i}
//                             type="button"
//                             onClick={() => setIndex(i)}
//                             className={`rounded-full transition-all ${
//                               i === index
//                                 ? "h-7 w-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.55)]"
//                                 : "h-2.5 w-2.5 bg-white/45"
//                             }`}
//                             aria-label={`Phone video ${i + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pointer-events-none absolute inset-0 rounded-[3.4rem] bg-linear-to-tr from-white/0 via-white/0 to-white/10 opacity-60" />
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
