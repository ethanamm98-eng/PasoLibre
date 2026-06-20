"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Megaphone,
  Info,
  TriangleAlert,
  Sparkles,
  BellRing,
  Eye,
  EyeOff,
} from "lucide-react";

import { useLanguage } from "../context/language";

export type AnnouncementItem = {
  id: string;
  title: string;
  title_en?: string | null;
  title_es?: string | null;
  message: string;
  message_en?: string | null;
  message_es?: string | null;
  cta_label?: string | null;
  cta_label_en?: string | null;
  cta_label_es?: string | null;
  cta_url?: string | null;
  variant?: "info" | "warning" | "success" | "urgent" | string;
  color?: "blue" | "indigo" | "emerald" | "amber" | "rose" | "slate" | string;
  status?:
    | "important"
    | "urgent"
    | "update"
    | "event"
    | "success"
    | "notice"
    | string;
};

function getColorTheme(color?: string) {
  switch (color) {
    case "indigo":
      return {
        pill: "bg-indigo-500/15 text-indigo-100 border-indigo-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-indigo-500/20 via-violet-500/10 to-transparent",
        button: "bg-white text-indigo-700 hover:bg-indigo-50",
        bg: "bg-indigo-600",
      };
    case "emerald":
      return {
        pill: "bg-emerald-500/15 text-emerald-100 border-emerald-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-emerald-500/20 via-teal-500/10 to-transparent",
        button: "bg-white text-emerald-700 hover:bg-emerald-50",
        bg: "bg-emerald-600",
      };
    case "amber":
      return {
        pill: "bg-amber-500/15 text-amber-100 border-amber-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-amber-500/20 via-yellow-500/10 to-transparent",
        button: "bg-white text-amber-700 hover:bg-amber-50",
        bg: "bg-amber-600",
      };
    case "rose":
      return {
        pill: "bg-rose-500/15 text-rose-100 border-rose-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-rose-500/20 via-pink-500/10 to-transparent",
        button: "bg-white text-rose-700 hover:bg-rose-50",
        bg: "bg-rose-600",
      };
    case "slate":
      return {
        pill: "bg-slate-500/15 text-slate-100 border-slate-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-slate-500/20 via-slate-400/10 to-transparent",
        button: "bg-white text-slate-700 hover:bg-slate-50",
        bg: "bg-slate-700",
      };
    default:
      return {
        pill: "bg-sky-500/15 text-sky-100 border-sky-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-sky-500/20 via-indigo-500/10 to-transparent",
        button: "bg-white text-[#0d4db0] hover:bg-sky-50",
        bg: "bg-blue-600",
      };
  }
}

function getVariantIcon(
  variant?: string,
  size: "mobile" | "desktop" = "desktop"
) {
  const iconClass = size === "mobile" ? "h-2.5 w-2.5" : "h-4 w-4";

  switch (variant) {
    case "urgent":
      return <TriangleAlert className={iconClass} />;
    case "warning":
      return <AlertCircle className={iconClass} />;
    case "success":
      return <Sparkles className={iconClass} />;
    default:
      return <Info className={iconClass} />;
  }
}

function getStatusLabel(status?: string, isSpanish?: boolean) {
  switch (status) {
    case "urgent":
      return isSpanish ? "Urgente" : "Urgent";
    case "update":
      return isSpanish ? "Actualización" : "Update";
    case "event":
      return isSpanish ? "Evento" : "Event";
    case "success":
      return isSpanish ? "Éxito" : "Success";
    case "notice":
      return isSpanish ? "Aviso" : "Notice";
    case "important":
    default:
      return isSpanish ? "Importante" : "Important";
  }
}

function getVariantLabel(variant?: string, isSpanish?: boolean) {
  switch (variant) {
    case "urgent":
      return isSpanish ? "Urgente" : "Urgent";
    case "warning":
      return isSpanish ? "Advertencia" : "Warning";
    case "success":
      return isSpanish ? "Éxito" : "Success";
    case "info":
    default:
      return isSpanish ? "Información" : "Info";
  }
}

function getLocalizedValue(
  announcement: AnnouncementItem,
  field: "title" | "message" | "cta_label",
  language: string
) {
  const preferredLanguage = language === "es" ? "es" : "en";

  const preferred = announcement[
    `${field}_${preferredLanguage}` as keyof AnnouncementItem
  ] as string | null | undefined;

  const fallback = announcement[
    `${field}_${
      preferredLanguage === "es" ? "en" : "es"
    }` as keyof AnnouncementItem
  ] as string | null | undefined;

  const legacy = announcement[field] as string | null | undefined;

  return preferred || fallback || legacy || "";
}

export default function AnnouncementHeroOverlay({
  announcements,
}: {
  announcements: AnnouncementItem[];
}) {
  const { language } = useLanguage();
  const isSpanish = language === "es";
  const [showAnnouncements, setShowAnnouncements] = useState(true);

  const t = {
    announcement: isSpanish ? "Anuncio" : "Announcement",
    hide: isSpanish ? "Ocultar" : "Hide",
    show: isSpanish ? "Mostrar anuncios" : "Show announcements",
  };

  if (!announcements?.length) return null;

  if (!showAnnouncements) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-3 sm:top-28 sm:px-4 md:px-6">
        <div className="mx-auto flex max-w-6xl justify-end">
          <button
            type="button"
            onClick={() => setShowAnnouncements(true)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/45 px-3 py-2 text-xs font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-slate-950/60"
          >
            <Eye className="h-3.5 w-3.5" />
            {t.show}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-3 sm:top-28 sm:px-4 md:px-6">
      <div className="mx-auto max-w-6xl space-y-3">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAnnouncements(false)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/35 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-xl transition hover:bg-slate-950/50"
          >
            <EyeOff className="h-3.5 w-3.5" />
            {t.hide}
          </button>
        </div>

        {announcements.map((announcement) => {
          const styles = getColorTheme(announcement.color);
          const title = getLocalizedValue(announcement, "title", language);
          const message = getLocalizedValue(announcement, "message", language);
          const ctaLabel = getLocalizedValue(
            announcement,
            "cta_label",
            language
          );

          return (
            <div
              key={announcement.id}
              className={`pointer-events-auto relative overflow-hidden rounded-3xl border border-white/20 ${styles.bg}
              bg-linear-to-r from-white/10 to-slate-700/60 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl md:rounded-[1.75rem] md:shadow-[0_20px_60px_rgba(0,0,0,0.25)]`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-r ${styles.glow}`}
              />

              {/* Mobile Version */}
              <div className="relative block px-4 py-4 md:hidden">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-wrap gap-1.5">
                    <div
                      className={`inline-flex max-w-full items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] ${styles.pill}`}
                    >
                      {getVariantIcon(announcement.variant, "mobile")}
                      <span className="truncate">
                        {getStatusLabel(announcement.status, isSpanish)}{" "}
                        {t.announcement}
                      </span>
                    </div>

                    {announcement.variant && (
                      <div
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] ${styles.softPill}`}
                      >
                        <BellRing className="h-2.5 w-2.5" />
                        {getVariantLabel(announcement.variant, isSpanish)}
                      </div>
                    )}
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-sm">
                    <Megaphone className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-base font-semibold leading-snug text-white">
                  {title}
                </h3>

                <p className="mt-2 line-clamp-4 text-sm leading-6 text-white/82">
                  {message}
                </p>

                {ctaLabel && announcement.cta_url && (
                  <div className="mt-4">
                    <Link
                      href={announcement.cta_url}
                      className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition active:scale-[0.98] ${styles.button}`}
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                )}
              </div>

              {/* Desktop / Tablet Version */}
              <div className="relative hidden px-5 py-4 md:block md:px-6 md:py-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                      <Megaphone className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${styles.pill}`}
                        >
                          {getVariantIcon(announcement.variant)}
                          {getStatusLabel(announcement.status, isSpanish)}{" "}
                          {t.announcement}
                        </div>

                        {announcement.variant && (
                          <div
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${styles.softPill}`}
                          >
                            <BellRing className="h-3.5 w-3.5" />
                            {getVariantLabel(
                              announcement.variant,
                              isSpanish
                            )}
                          </div>
                        )}
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-white md:text-xl">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-white/80 md:text-[15px]">
                        {message}
                      </p>
                    </div>
                  </div>

                  {ctaLabel && announcement.cta_url && (
                    <div className="shrink-0">
                      <Link
                        href={announcement.cta_url}
                        className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition ${styles.button}`}
                      >
                        {ctaLabel}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}