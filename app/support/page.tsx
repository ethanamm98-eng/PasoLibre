"use client";
import Link from "next/link";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLanguage } from "../context/language";

export default function SupportPage() {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const supportEmail = "ethan.a.mm98@gmail.com";

  const subject = "Paso Libre Website Support";
  const body = isSpanish
    ? "Hola, necesito ayuda con un problema en el sitio web de Paso Libre."
    : "Hi, I need help with an issue on the Paso Libre website.";

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const mailAppUrl = `mailto:${supportEmail}?subject=${encodedSubject}&body=${encodedBody}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=${encodedSubject}&body=${encodedBody}`;

  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${supportEmail}&subject=${encodedSubject}&body=${encodedBody}`;

  const options = [
    {
      title: isSpanish ? "Abrir en Gmail" : "Open in Gmail",
      description: isSpanish
        ? "Usa Gmail en el navegador para enviar tu solicitud."
        : "Use Gmail in the browser to send your support request.",
      href: gmailUrl,
      icon: FaGoogle,
      accent: "from-red-50 to-yellow-50",
      iconClass: "text-red-500",
    },
    {
      title: isSpanish ? "Abrir en Outlook" : "Open in Outlook",
      description: isSpanish
        ? "Usa Outlook en el navegador para contactar soporte."
        : "Use Outlook in the browser to contact support.",
      href: outlookUrl,
      icon: FaMicrosoft,
      accent: "from-blue-50 to-cyan-50",
      iconClass: "text-blue-600",
    },
    {
      title: isSpanish ? "Usar app de correo" : "Use mail app",
      description: isSpanish
        ? "Abre la aplicación de correo predeterminada de tu dispositivo."
        : "Open your device’s default email application.",
      href: mailAppUrl,
      icon: MdMailOutline,
      accent: "from-sky-50 to-indigo-50",
      iconClass: "text-[#0d4db0]",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-10 text-slate-950 sm:px-6 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,77,176,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_34%),linear-gradient(180deg,#ffffff,#f8fafc)]" />

      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -35, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-300/20 blur-[130px]"
      />

      <motion.div
        animate={{ x: [0, -45, 0], y: [0, 40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-[140px]"
      />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full overflow-hidden rounded-4xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_28px_90px_rgba(13,77,176,0.12)] backdrop-blur-xl sm:p-8 md:rounded-[2.5rem] md:p-10"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0d4db0] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <FiArrowLeft />
            {isSpanish ? "Volver al inicio" : "Back home"}
          </Link>

          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d4db0] text-white shadow-lg shadow-[#0d4db0]/20">
              <MdMailOutline className="text-2xl" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
              {isSpanish ? "Soporte técnico" : "IT Support"}
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-6xl">
              {isSpanish
                ? "¿Cómo prefieres contactarnos?"
                : "How would you like to contact us?"}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
              {isSpanish
                ? "Elige Gmail, Outlook o tu aplicación de correo. Prepararemos el mensaje automáticamente para que solo tengas que enviarlo."
                : "Choose Gmail, Outlook, or your mail app. We’ll prepare the message automatically so you only need to send it."}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {options.map((option, index) => {
              const Icon = option.icon;

              return (
                <motion.a
                  key={option.title}
                  href={option.href}
                  target={
                    option.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    option.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br ${option.accent} p-5 text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0d4db0]/20 hover:shadow-[0_20px_55px_rgba(13,77,176,0.14)]`}
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/70 blur-3xl transition duration-500 group-hover:scale-125" />

                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <Icon className={`text-xl ${option.iconClass}`} />
                      </span>

                      <FiExternalLink className="text-slate-400 transition group-hover:text-[#0d4db0]" />
                    </div>

                    <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                      {option.title}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {option.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white/70 p-5 text-center text-sm text-slate-500">
            {isSpanish
              ? "Enviarás tu mensaje a"
              : "You’ll send your message to"}{" "}
            <span className="font-semibold text-[#0d4db0]">{supportEmail}</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
