"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FaMapMarkerAlt, FaCalendarAlt, FaGift } from "react-icons/fa";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";

type InitiativeRecord = {
  id: string;
  title: string;
  title_en?: string | null;
  title_es?: string | null;
  description: string;
  description_en?: string | null;
  description_es?: string | null;
  type: "event" | "grant" | "info" | "program" | "resource" | "announcement";
  source_type: "event" | "custom";
  linked_event_id: string | null;
  location: string | null;
  time_label: string | null;
  price_label: number | null;
  image_url: string | null;
  cta_label: string | null;
  cta_label_en?: string | null;
  cta_label_es?: string | null;
  cta_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  image_position_y: number | null;
};

function EventRow({
  event,
  index,
}: {
  event: InitiativeRecord;
  index: number;
}) {
  const ref = useRef(null);
  const router = useRouter();
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    featured: isSpanish ? "Destacado" : "Featured",
    suggestedDonation: isSpanish ? "Donativo sugerido:" : "Suggested donation:",
    moreInformation: isSpanish ? "Más información" : "More Information",
    tbd: isSpanish ? "Por confirmar" : "TBD",
    event: isSpanish ? "Evento" : "Event",
    grant: isSpanish ? "Subvención" : "Grant",
    info: isSpanish ? "Información" : "Info",
    program: isSpanish ? "Programa" : "Program",
    resource: isSpanish ? "Recurso" : "Resource",
    announcement: isSpanish ? "Anuncio" : "Announcement",
  };

  const getTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      event: t.event,
      grant: t.grant,
      info: t.info,
      program: t.program,
      resource: t.resource,
      announcement: t.announcement,
    };

    return labels[type || ""] || type || "";
  };

  const getLocalizedValue = (
    field: "title" | "description" | "cta_label"
  ) => {
    const preferred =
      language === "es"
        ? event[`${field}_es` as keyof InitiativeRecord]
        : event[`${field}_en` as keyof InitiativeRecord];

    const fallback =
      language === "es"
        ? event[`${field}_en` as keyof InitiativeRecord]
        : event[`${field}_es` as keyof InitiativeRecord];

    const legacy = event[field as keyof InitiativeRecord];

    return String(preferred || fallback || legacy || "");
  };

  const scrollData = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollData.scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [40, -40] : [-40, 40]
  );

  const isReverse = index % 2 !== 0;
  const isBlueCard = index % 2 !== 0;

  const title = getLocalizedValue("title");
  const description = getLocalizedValue("description");
  const ctaLabel = getLocalizedValue("cta_label") || t.moreInformation;

  const handleNavigate = () => {
    if (event.cta_url) {
      router.push(event.cta_url);
      return;
    }

    if (event.type === "event") {
      router.push("/check-in/" + event.id);
      return;
    }

    router.push(`/initiatives/${event.id}`);
  };

  const formattedDate = useMemo(() => {
    if (!event.time_label) return "";
  
    try {
      const [datePart, timePart] = event.time_label.split(" • ");
  
      if (!datePart || !timePart) return event.time_label;
  
      const date = new Date(`${datePart}T${timePart}`);
  
      if (Number.isNaN(date.getTime())) return event.time_label;
  
      return new Intl.DateTimeFormat(
        isSpanish ? "es-PR" : "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      ).format(date);
    } catch {
      return event.time_label;
    }
  }, [event.time_label, isSpanish]);
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative rounded-4xl bg-linear-to-r from-[#0d4db0]/40 via-sky-400/30 to-indigo-400/40 p-px shadow-[0_28px_80px_rgba(13,77,176,0.18)]"
    >
      <div
        className={`relative overflow-hidden rounded-4xl p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-8 ${
          isBlueCard
            ? "bg-linear-to-br from-[#0d4db0] via-[#0d4db0]/70 to-[#0d4db0]/90 text-white"
            : "bg-white text-slate-900"
        }`}
      >
        <div
          className={`absolute inset-0 pointer-events-none ${
            isBlueCard
              ? "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%)]"
              : "bg-[radial-gradient(circle_at_top_right,rgba(13,77,176,0.08),transparent_32%)]"
          }`}
        />

        <div
          className={`relative flex flex-col items-center gap-8 md:gap-10 md:flex-row ${
            isReverse ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="relative h-75 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.20)] md:w-1/2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full"
            >
              <Image
                src={event.image_url || "/events/event1.jpg"}
                alt={title}
                fill
                className="object-cover"
                style={{
                  objectPosition: `center ${event?.image_position_y ?? 50}%`,
                }}
              />
            </motion.div>

            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute inset-0 rounded-3xl border border-white/20" />
          </div>

          <div className="flex w-full flex-col justify-center md:w-1/2">
            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  isBlueCard
                    ? "border-white/25 bg-white/15 text-white"
                    : "border-blue-100 bg-blue-50 text-blue-700"
                }`}
              >
                {getTypeLabel(event.type)}
              </span>

              {event.is_featured && (
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    isBlueCard
                      ? "border-amber-200/40 bg-amber-300/20 text-amber-50"
                      : "border-amber-100 bg-amber-50 text-amber-700"
                  }`}
                >
                  {t.featured}
                </span>
              )}
            </div>

            <h3
              className={`mb-4 text-2xl font-semibold leading-tight md:text-3xl ${
                isBlueCard ? "text-white" : "text-[#0d4db0]"
              }`}
            >
              {title}
            </h3>

            <div
              className={`prose prose-sm mb-6 max-w-none leading-relaxed ${
                isBlueCard ? "prose-invert text-blue-50/90" : "text-slate-600"
              }`}
              dangerouslySetInnerHTML={{
                __html: description || "",
              }}
            />

            <div className="mb-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-1">
              {event?.location && (
                <div
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                    isBlueCard
                      ? "border-white/15 bg-white/10 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  <FaMapMarkerAlt
                    className={isBlueCard ? "text-sky-100" : "text-[#0d4db0]"}
                  />
                  <span>{event?.location ? event?.location : t.tbd}</span>
                </div>
              )}

              {event.time_label && (
                <div
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                    isBlueCard
                      ? "border-white/15 bg-white/10 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  <FaCalendarAlt
                    className={isBlueCard ? "text-sky-100" : "text-[#0d4db0]"}
                  />
                  <span>{formattedDate}</span>
                </div>
              )}

              {event.price_label && event.price_label != 0 && (
                <span
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 sm:col-span-2 ${
                    isBlueCard
                      ? "border-white/15 bg-white/10 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  <FaGift
                    className={isBlueCard ? "text-sky-100" : "text-[#0d4db0]"}
                  />
                  <span>
                    <span>{t.suggestedDonation}</span> ${event.price_label}
                  </span>
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNavigate}
              className={`group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-2xl px-6 py-3 font-semibold shadow-lg transition cursor-pointer ${
                isBlueCard
                  ? "border border-white/30 bg-white text-[#0d4db0] hover:text-white"
                  : "border border-[#0d4db0] bg-white text-[#0d4db0] hover:text-white"
              }`}
            >
              <span className="relative z-10 transition duration-500">
                {ctaLabel}
              </span>

              <span className="absolute inset-0 bg-linear-to-r from-[#0d4db0] to-sky-400 opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 transition duration-500 group-hover:opacity-100">
                {ctaLabel}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsVerticalSection() {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    backgroundWord: isSpanish ? "INICIATIVAS" : "EVENTS",
    title: isSpanish ? "Iniciativas" : "Initiatives",
    description: isSpanish
      ? "Mantente conectade con experiencias, programas, subvenciones y oportunidades comunitarias diseñadas para Paso Libre."
      : "Stay connected with experiences, programs, grants, and community opportunities designed for Paso Libre.",
    loading: isSpanish ? "Cargando iniciativas..." : "Loading initiatives...",
    emptyTitle: isSpanish
      ? "No hay iniciativas disponibles ahora mismo"
      : "No initiatives available right now",
    emptyText: isSpanish
      ? "Vuelve pronto para ver próximas oportunidades y actualizaciones comunitarias."
      : "Check back soon for upcoming opportunities and community updates.",
  };

  const [initiatives, setInitiatives] = useState<InitiativeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitiatives = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("initiatives")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;

        setInitiatives((data || []) as InitiativeRecord[]);
      } catch (error) {
        console.error("Failed to load initiatives:", error);
        setInitiatives([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitiatives();
  }, []);

  const displayedInitiatives = useMemo(() => initiatives, [initiatives]);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -left-32 -top-32 h-96 w-96 bg-[#0d4db0]/10 blur-[120px]"
      />

      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
        className="absolute -bottom-32 -right-32 h-96 w-96 bg-sky-400/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="relative mb-20 text-center">
          <span className="absolute inset-0 text-[4rem] font-bold tracking-widest text-[#0d4db0] opacity-[0.04] md:text-[7rem]">
            {t.backgroundWord}
          </span>

          <h2 className="relative text-3xl font-semibold text-[#0d4db0] underline underline-offset-8 md:text-5xl">
            {t.title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-light text-gray-500">
            {t.description}
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <p className="text-slate-500">{t.loading}</p>
          </div>
        ) : displayedInitiatives.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-12 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <p className="font-medium text-slate-500">{t.emptyTitle}</p>
            <p className="mt-2 text-sm text-slate-400">{t.emptyText}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            {displayedInitiatives.map((event, index) => (
              <EventRow key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}