"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/language";
import { MdAttachMoney } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DonateDropdown() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const options = [
    {
      label: "ATH Móvil",
      link: "https://www.athmovil.com/donate",
      icon: "/icons/ath-movil.svg",
      iconAlt: "ATH Móvil",
    },
    {
      label: "PayPal",
      link: "https://www.paypal.com/donate",
      icon: "/icons/paypal.svg",
      iconAlt: "PayPal",
    },
  ];

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
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white/15 cursor-pointer"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
          <MdAttachMoney className="text-base" />
        </span>

        <span>{t?.navigation?.donate || "Donate"}</span>

        <FiChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-21.5 z-9999 w-[calc(100vw-2rem)] max-w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl backdrop-blur-md xl:absolute xl:left-auto xl:right-0 xl:top-full xl:mt-2 xl:w-56 xl:translate-x-0"
          >
            <div className="p-2">
              {options?.map((option) => (
                <a
                  key={option.label}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-800 transition hover:bg-slate-100 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm cursor-pointer">
                    <Image
                      src={option.icon}
                      alt={option.iconAlt}
                      width={26}
                      height={26}
                      className="h-7 w-7 object-contain"
                    />
                  </span>

                  <span className="font-semibold">{option.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
