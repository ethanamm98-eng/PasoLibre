"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";

type InitiativeType =
  | "event"
  | "grant"
  | "info"
  | "program"
  | "resource"
  | "announcement";

type InitiativeRecord = {
  id: string;
  title?: string | null;
  title_en?: string | null;
  title_es?: string | null;
  description?: string | null;
  description_en?: string | null;
  description_es?: string | null;
  type: InitiativeType;
  source_type: "event" | "custom";
  linked_event_id: string | null;
  initiative_date?: string | null;
  location: string | null;
  time_label: string | null;
  price_label: number | string | null;
  image_url?: string | null;
  cta_label?: string | null;
  cta_label_en?: string | null;
  cta_label_es?: string | null;
  cta_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

type TimelineItemData = {
  id: string;
  title: string;
  type: InitiativeType;
  featured: boolean;
  date: string;
  ctaLabel: string;
  ctaUrl: string | null;
};

function formatTimelineDate(dateString: string, language: string) {
  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString(language === "es" ? "es-PR" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function TimelineItem({
  event,
  index,
  onNavigate,
}: {
  event: TimelineItemData;
  index: number;
  onNavigate: (item: TimelineItemData) => void;
}) {
  const { language } = useLanguage();
  const isSpanish = language === "es";
  const isLeft = index % 2 === 0;

  const t = {
    featured: isSpanish ? "Destacado" : "Featured",
    event: isSpanish ? "Evento" : "Event",
    grant: isSpanish ? "Subvención" : "Grant",
    info: isSpanish ? "Información" : "Info",
    program: isSpanish ? "Programa" : "Program",
    resource: isSpanish ? "Recurso" : "Resource",
    announcement: isSpanish ? "Anuncio" : "Announcement",
  };

  const typeLabels: Record<string, string> = {
    event: t.event,
    grant: t.grant,
    info: t.info,
    program: t.program,
    resource: t.resource,
    announcement: t.announcement,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative grid grid-cols-[34px_1fr] gap-4 md:grid-cols-[1fr_80px_1fr] md:gap-0"
    >
      <div
        className={`relative order-2 md:px-4 ${
          isLeft ? "md:col-start-1" : "md:col-start-3"
        }`}
      >
        <button
          type="button"
          onClick={() => onNavigate(event)}
          className={`group w-full cursor-pointer text-left ${
            isLeft ? "md:mr-6" : "md:ml-6"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/15 group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.26)] md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/12 via-white/4 to-transparent" />
            <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-sky-300/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-200">
                    {typeLabels[event.type] || event.type}
                  </span>

                  {event.featured && (
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                      {t.featured}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">
                  {event.title}
                </h3>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-3.5 py-2 text-xs font-medium text-sky-100">
                  <CalendarDays className="h-4 w-4" />
                  {formatTimelineDate(event.date, language)}
                </div>
              </div>

              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/80 transition group-hover:border-sky-300/30 group-hover:text-sky-200">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </button>
      </div>

      <div className="relative order-1 flex justify-center md:order-0 md:col-start-2">
        <div className="absolute inset-y-0 left-1/2 hidden w-0.75 -translate-x-1/2 rounded-full bg-sky-200 md:block" />

        <div className="absolute bottom-0 left-1/2 top-0 w-0.75 -translate-x-1/2 rounded-full bg-sky-200 md:hidden" />

        <div className="relative z-10 mt-5 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0d4db0] bg-sky-200 shadow-[0_0_26px_rgba(125,211,252,0.85)] md:mt-6">
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
        </div>
      </div>

      <div
        className={`hidden md:block ${
          isLeft ? "md:col-start-3" : "md:col-start-1"
        }`}
      />
    </motion.div>
  );
}

export default function EventsTimelineSection() {
  const router = useRouter();
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    backgroundWord: "TIMELINE",
    eyebrow: isSpanish ? "Lo próximo" : "What’s Ahead",
    title: isSpanish ? "Línea de Tiempo" : "Upcoming Timeline",
    description: isSpanish
      ? "Sigue las próximas iniciativas y eventos de Paso Libre en orden cronológico."
      : "Follow upcoming Paso Libre initiatives and events in chronological order.",
    loading: isSpanish ? "Cargando línea de tiempo..." : "Loading timeline...",
    emptyTitle: isSpanish
      ? "No hay iniciativas con fecha disponibles ahora mismo"
      : "No dated initiatives available right now",
    emptyText: isSpanish
      ? "Cuando una iniciativa tenga fecha, aparecerá aquí automáticamente."
      : "Once an initiative has a date, it will appear here automatically.",
    viewDetails: isSpanish ? "Ver Detalles" : "View Details",
  };

  const [loading, setLoading] = useState(true);
  const [timelineItems, setTimelineItems] = useState<TimelineItemData[]>([]);

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        setLoading(true);

        const { data: initiativesData, error: initiativesError } =
          await supabase
            .from("initiatives")
            .select(
              "id, title, title_en, title_es, type, source_type, linked_event_id, initiative_date, time_label, cta_label, cta_label_en, cta_label_es, cta_url, is_active, is_featured, sort_order, created_at"
            )
            .eq("is_active", true)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (initiativesError) throw initiativesError;

        const initiatives = (initiativesData || []) as InitiativeRecord[];

        const eventIds = Array.from(
          new Set(
            initiatives
              .map((item) => item.linked_event_id)
              .filter(Boolean) as string[]
          )
        );

        let eventsById = new Map<string, SchedulerForm>();

        if (eventIds.length > 0) {
          const { data: eventsData, error: eventsError } = await supabase
            .from("events")
            .select("id, name_en, name_es, date, time")
            .in("id", eventIds);

          if (eventsError) throw eventsError;

          eventsById = new Map(
            ((eventsData || []) as SchedulerForm[]).map((event) => [
              event.id,
              event,
            ])
          );
        }

        const mapped = initiatives
          .map((initiative) => {
            const linkedEvent = initiative.linked_event_id
              ? eventsById.get(initiative.linked_event_id)
              : null;

            const localizedTitle =
              language === "es"
                ? initiative.title_es ||
                  initiative.title_en ||
                  initiative.title ||
                  linkedEvent?.name_es ||
                  linkedEvent?.name_en ||
                  ""
                : initiative.title_en ||
                  initiative.title_es ||
                  initiative.title ||
                  linkedEvent?.name_en ||
                  linkedEvent?.name_es ||
                  "";

            const initiativeDateFromTimeLabel = initiative.time_label?.includes(
              " • "
            )
              ? initiative.time_label.split(" • ")[0]
              : null;

            const resolvedDate =
              initiative.initiative_date ||
              initiativeDateFromTimeLabel ||
              linkedEvent?.date ||
              null;

            if (!resolvedDate) return null;

            const localizedCtaLabel =
              language === "es"
                ? initiative.cta_label_es ||
                  initiative.cta_label_en ||
                  initiative.cta_label ||
                  t.viewDetails
                : initiative.cta_label_en ||
                  initiative.cta_label_es ||
                  initiative.cta_label ||
                  t.viewDetails;

            return {
              id: initiative.id,
              title: localizedTitle,
              type: initiative.type,
              featured: initiative.is_featured,
              date: resolvedDate,
              ctaLabel: localizedCtaLabel,
              ctaUrl: initiative.cta_url || null,
            } satisfies TimelineItemData;
          })
          .filter(Boolean) as TimelineItemData[];

        mapped.sort((a, b) => {
          const aTime = new Date(`${a.date}T00:00:00`).getTime();
          const bTime = new Date(`${b.date}T00:00:00`).getTime();

          return aTime - bTime;
        });

        setTimelineItems(mapped);
      } catch (error) {
        console.error("Failed to load timeline initiatives:", error);
        setTimelineItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadTimeline();
  }, [language, t.viewDetails]);

  const displayedItems = useMemo(() => timelineItems, [timelineItems]);

  const handleNavigate = (item: TimelineItemData) => {
    if (item.ctaUrl) {
      router.push(item.ctaUrl);
      return;
    }

    router.push("/initiatives");
  };

  return (
    <section className="relative overflow-hidden bg-[#0d4db0] px-6 py-28">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -left-40 -top-40 h-125 w-125 bg-sky-400/20 blur-[160px]"
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 h-125 w-125 bg-indigo-400/20 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="relative mb-20 text-center md:mb-24">
          <span className="absolute inset-0 text-[4rem] font-bold tracking-widest text-white opacity-[0.05] md:text-[7rem]">
            {t.backgroundWord}
          </span>

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
              <Sparkles className="h-4 w-4" />
              {t.eyebrow}
            </div>

            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              {t.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl font-light leading-7 text-white/70">
              {t.description}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-md">
            <p className="text-white/75">{t.loading}</p>
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-12 text-center backdrop-blur-md">
            <p className="font-medium text-white/80">{t.emptyTitle}</p>
            <p className="mt-2 text-sm text-white/55">{t.emptyText}</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute bottom-0 left-4.25 top-0 w-0.75 rounded-full bg-sky-200 md:left-1/2 md:-translate-x-1/2" />

            <div className="relative flex flex-col gap-10 md:gap-14">
              {displayedItems.map((event, index) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  index={index}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
