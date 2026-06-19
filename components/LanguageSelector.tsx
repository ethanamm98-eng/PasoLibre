"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/language";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const flags = {
    en: { src: "/flags/usa.png", label: "English", short: "EN" },
    es: { src: "/flags/puerto-rico.png", label: "Español", short: "ES" },
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative cursor-pointer">
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/15"
      >
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10">
          <Image
            src={flags[language].src}
            alt={flags[language].label}
            width={24}
            height={24}
            className="rounded-sm object-cover"
          />
        </span>

        <span className="hidden text-left sm:block">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-white/70">
            {language === "en" ? "Language" : "Idioma"}
          </span>
          <span className="block text-sm font-semibold leading-tight">
            {flags[language].label}
          </span>
        </span>

        <FiChevronDown
          className={`text-sm transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 md:left-28 top-21.5 z-9999 w-[calc(100vw-2rem)] max-w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md xl:absolute xl:left-auto xl:right-0 xl:top-full xl:mt-3 xl:w-52 xl:translate-x-0"
          >
            {Object.entries(flags)?.map(([key, value]) => {
              const isActive = language === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setLanguage(key as "en" | "es");
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border shadow-sm ${
                      isActive
                        ? "border-white/20 bg-white/10"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <Image
                      src={value.src}
                      alt={value.label}
                      width={22}
                      height={22}
                      className="rounded-sm object-cover"
                    />
                  </span>

                  <div className="flex-1 text-left">
                    <span className="block font-medium">{value.label}</span>
                    <span
                      className={`block text-[10px] uppercase tracking-[0.14em] ${
                        isActive ? "text-white/75" : "text-slate-400"
                      }`}
                    >
                      {value.short}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
