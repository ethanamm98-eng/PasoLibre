"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { GoHeartFill } from "react-icons/go";
import { useLanguage } from "../context/language";
import { aboutTranslations } from "../lib/translations/about";

function AboutParagraph({
  p,
  index,
  scrollYProgress,
}: {
  p: {
    text: string;
    highlight: string[];
  };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [0, 20] : [0, -20]
  );

  return (
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: index * 0.3 }}
      style={{ x }}
    >
      {p.text.split(" ").map((word, wi) => (
        <span
          key={wi}
          className={
            p.highlight.includes(word)
              ? "bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-indigo-400 font-semibold"
              : ""
          }
        >
          {word}{" "}
        </span>
      ))}
    </motion.p>
  );
}

const AboutPageContent = () => {
  const { language } = useLanguage();
  const t = aboutTranslations[language].pageContent;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative about-page-content text-white bg-[#0d4db0] py-36 overflow-hidden px-6 md:px-16"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-400 to-indigo-400 origin-left z-50"
      />

      {/* Floating Glow */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 28, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-175 h-175 bg-sky-400/20 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-175 h-175 bg-indigo-400/20 blur-[140px] rounded-full"
      />

      {/* Glass Panel */}
      <div className="relative max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl px-8 md:px-16 py-14 shadow-xl">
        {/* Handwritten Title */}
        <svg
          viewBox="0 0 700 120"
          preserveAspectRatio="xMidYMid meet"
          className="w-[120%] -ml-[10%] sm:w-[110%] sm:-ml-[5%] md:w-full md:ml-0 h-35 sm:h-37.5 md:h-30 mb-12 sm:mb-14 md:mb-16 stroke-white/90"
        >
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[4.8rem] sm:text-[5.8rem] md:text-[7rem] lg:text-[8rem] font-black tracking-widest fill-transparent stroke-current"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          >
            {t.title}
          </motion.text>
        </svg>

        {/* Paragraphs with parallax + highlight */}
        <div className="flex flex-col gap-10 text-lg md:text-xl leading-relaxed tracking-[0.01em] text-center">
          {t?.paragraphs?.map((p, i) => (
            <AboutParagraph
              key={i}
              p={p}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Signature Heart */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-sky-400 text-3xl mt-6 flex justify-center"
          >
            <GoHeartFill />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPageContent;