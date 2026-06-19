"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FiChevronUp } from "react-icons/fi";
import { motion, useScroll } from "framer-motion";
import { footerTranslations } from "../lib/translations/footer";
import { useLanguage } from "../context/language";

export default function Footer() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = footerTranslations[language];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [showButton, setShowButton] = useState(false);

  const isSpanish = language === "es";

  const supportText = isSpanish
    ? "¿Problemas con el sitio web? Contacta al soporte técnico"
    : "Having website issues? Contact IT Support";

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className="relative bg-white text-gray-900 pt-20 md:pt-24 pb-16 overflow-hidden"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-200 to-indigo-200 origin-left z-1"
      />

      {/* Floating Background Blobs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 32, repeat: Infinity }}
        className="absolute -top-32 -left-32 w-150 h-150 bg-sky-200/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 34, repeat: Infinity }}
        className="absolute -bottom-32 -right-32 w-150 h-150 bg-indigo-200/20 blur-[120px] rounded-full"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative container mx-auto px-6 text-center flex flex-col gap-10 md:gap-12"
      >
        {/* Brand + Socials + Email */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 text-center md:text-left">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo-title-4.png"
              alt="Paso Libre Logo"
              width={260}
              height={130}
              className="w-56 sm:w-64 md:w-75 h-auto"
            />
          </div>

          {/* Social Icons (VISIBLE ON MOBILE NOW) */}
          <div className="flex items-center justify-center gap-6 text-2xl text-[#0d4db0]">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.instagram.com/pasolibre.pr"
              className="hover:text-pink-400 transition duration-500"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://tiktok.com/@pasolibre.pr"
              className="hover:text-gray-700 transition duration-500"
            >
              <FaTiktok />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://chat.whatsapp.com/HfEsdAkCobTIihCCAss7mN"
              className="hover:text-green-400 transition duration-500"
            >
              <FaWhatsapp />
            </motion.a>
            {/* <motion.a whileHover={{ scale: 1.2 }} href={`mailto:${t.emailLabel}`} className="hover:text-black transition duration-500">
              <MdMailOutline />
            </motion.a> */}
          </div>

          {/* Email */}
          <div className="flex justify-center md:justify-end">
            <a
              href={`mailto:${t.emailLabel}`}
              className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tighter text-[#0d4db0]/80 hover:text-sky-400 transition-all duration-500
              wrap-break-words"
            >
              <span className="underline underline-offset-4 text-sky-600 hover:text-[#0d4db0]/80 duration-500 transition">
                {t.emailLabel.split("@")[0]}@
              </span>
              {t.emailLabel.split("@")[1]}
            </a>
          </div>
        </div>

        {/* Premium Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 rounded-3xl border border-sky-100/80 bg-white/75 p-4 shadow-[0_18px_60px_rgba(13,77,176,0.10)] backdrop-blur-xl sm:grid-cols-2"
        >
          <button
            onClick={() => router.push("/privacy-policy")}
            className="group flex w-full cursor-pointer items-center justify-center rounded-2xl border border-[#0d4db0]/15 bg-white px-6 py-4 text-sm font-semibold text-[#0d4db0] shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-transparent hover:bg-linear-to-r hover:from-sky-400 hover:to-indigo-400 hover:text-white hover:shadow-xl"
          >
            {t.policyButton}
          </button>

          {/* IT Support */}
          <button
            onClick={() => router.push("/support")}
            className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 to-indigo-50 px-6 py-4 text-sm font-semibold text-[#0d4db0] shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-transparent hover:from-[#0d4db0] hover:to-indigo-600 hover:text-white hover:shadow-xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white px-1.5 text-[#0d4db0] shadow-sm transition duration-500 group-hover:scale-110">
              <MdMailOutline className="text-lg" />
            </span>

            <span className="text-left leading-tight">{supportText}</span>
          </button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs text-[#0d4db0] mt-10 md:mt-12 px-4"
        >
          {t.copyright}
        </motion.p>
      </motion.div>

      {/* Scroll to Top Button */}
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 md:w-16 md:h-16 bg-linear-to-tr from-sky-400 to-indigo-400 text-white rounded-full shadow-xl 
          flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 z-50"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiChevronUp className="text-xl md:text-3xl" />
        </motion.button>
      )}
    </footer>
  );
}
