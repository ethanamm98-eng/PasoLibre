"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaTag,
  FaUserTie,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FaGift, FaShirt } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import { FiRepeat } from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";
import { BadgeInfoIcon, BookOpenText, PauseCircle, PlayCircle, Sparkles } from "lucide-react";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";

type AttendanceSheetRecord = {
  id: string;
  title?: string | null;
  notes?: string | null;
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  occurrence_date?: string | null;
};

export type ParticipantRecord = {
  id: string;
  participant_name?: string | null;
  participant_email?: string | null;
  participant_phone?: string | null;
  checked_in?: boolean | null;
  checked_in_at?: string | null;
  status?: string | null;
  member_id?: string | null;
  occurrence_date?: string | null;
};

type EventDetailsProps = {
  confirmed?: boolean;
  event: SchedulerForm;
  attendanceSheet?: AttendanceSheetRecord | null;
  participants?: ParticipantRecord[];
};

export default function EventDetails({
  confirmed = false,
  event,
  attendanceSheet,
  participants = [],
}: EventDetailsProps) {
  const { language } = useLanguage();

  const isSpanish = language == "es";
  const locale = isSpanish ? "es-PR" : "en-US";

  const [playingPreviewUrl, setPlayingPreviewUrl] = useState<string | null>(
    null,
  );
  const [eventStatus, setEventStatus] = useState(event?.status || "");
  const [publishingEvent, setPublishingEvent] = useState(false);

  const [resolvedAttendanceSheet, setResolvedAttendanceSheet] =
    useState<AttendanceSheetRecord | null>(attendanceSheet || null);

  const [resolvedParticipants, setResolvedParticipants] = useState<
    ParticipantRecord[]
  >(participants || []);

  const t = {
    event: isSpanish ? "Evento" : "Event",
    eventName: isSpanish ? event.name_es : event.name_en,
    locationTbd: isSpanish ? "Ubicación por confirmar" : "Location TBD",
    noDescription: isSpanish
      ? "<p>No hay descripción disponible todavía.</p>"
      : "<p>No description available yet.</p>",
    additionalDetails: isSpanish
      ? "Detalles adicionales"
      : "Additional Details",
    attending: isSpanish ? "Estás asistiendo" : "You’re attending",
    dressCode: isSpanish ? "Código de vestimenta" : "Dress code",
    suggestedDonation: isSpanish ? "Donativo sugerido" : "Suggested donation",
    hostedBy: isSpanish ? "Organizado por:" : "Hosted by:",
    instructedBy: isSpanish ? "Instruido por:" : "Instructed by:",
    includesForm: isSpanish
      ? "Este evento incluye un formulario"
      : "This event includes a form",
    participants: isSpanish ? "Participantes" : "Participants",
    participant: isSpanish ? "participante" : "participant",
    inscription: isSpanish ? "inscripción" : "registration",
    inscriptionsPlural: isSpanish ? "inscripciones" : "registrations",
    noParticipants: isSpanish
      ? "No hay participantes todavía"
      : "No participants yet",
    participantAlt: isSpanish ? "Participante" : "Participant",
    viewLocation: isSpanish
      ? "Ver ubicación en el mapa →"
      : "View location on map →",
    repeats: isSpanish ? "Recurrente" : "Recurring",
    weekly: isSpanish ? "Semanal" : "Weekly",
    monthly: isSpanish ? "Mensual" : "Monthly",
    yearly: isSpanish ? "Anual" : "Yearly",
    noDate: isSpanish ? "Fecha por confirmar" : "Date TBD",
    noTime: isSpanish ? "Hora por confirmar" : "Time TBD",
    draftEvent: isSpanish ? "Evento en borrador" : "Draft event",
    draftDescription: isSpanish
      ? "Este evento todavía no está publicado. Revísalo y publícalo cuando esté listo."
      : "This event is not published yet. Review it and publish it when it is ready.",
    publishEvent: isSpanish ? "Publicar evento" : "Publish event",
    publishingEvent: isSpanish ? "Publicando..." : "Publishing...",
    soundtrack: isSpanish ? "Banda sonora del evento" : "Event soundtrack",
    soundtrackDescription: isSpanish
      ? "Una canción seleccionada especialmente para este evento."
      : "A song selected especially for this event.",
    curatedForEvent: isSpanish
      ? "Seleccionada para este evento"
      : "Curated for this event",
    listenPreview: isSpanish ? "Escuchar" : "Play",
    pausePreview: isSpanish ? "Pausar" : "Pause",
    nowPlaying: isSpanish ? "Reproduciendo" : "Now playing",
    aboutEvent: isSpanish ? "Sobre este evento" : "About this event",
    eventStory: isSpanish
      ? "Conoce la historia, intención y experiencia detrás de este encuentro."
      : "Discover the story, intention, and experience behind this gathering.",
    eventEssentials: isSpanish ? "Información esencial" : "Event essentials",
    eventEssentialsDescription: isSpanish
      ? "Todo lo que necesitas saber antes de llegar."
      : "Everything you need to know before you arrive.",
    dateLabel: isSpanish ? "Fecha" : "Date",
    timeLabel: isSpanish ? "Hora" : "Time",
    locationLabel: isSpanish ? "Ubicación" : "Location",
    recurrenceLabel: isSpanish ? "Frecuencia" : "Schedule",
    dressCodeLabel: isSpanish ? "Vestimenta" : "Dress code",
    donationLabel: isSpanish ? "Donativo" : "Donation",
    registrationLabel: isSpanish ? "Registro" : "Registration",
    openMap: isSpanish ? "Abrir mapa" : "Open map",
  };

  const isDraftEvent = String(eventStatus || "").toLowerCase() === "draft";

  const handlePublishEvent = async () => {
    try {
      setPublishingEvent(true);

      const { error } = await supabase
        .from("events")
        .update({ status: "published" })
        .eq("id", event.id);

      if (error) {
        console.error("Publish event error:", error);
        return;
      }

      setEventStatus("published");
    } catch (error) {
      console.error("Publish event failed:", error);
    } finally {
      setPublishingEvent(false);
    }
  };

  const getLocalizedText = (
    en?: string | null,
    es?: string | null,
    fallback = "",
  ) => {
    if (isSpanish) return es?.trim() || en?.trim() || fallback;
    return en?.trim() || es?.trim() || fallback;
  };

  // const eventName = isSpanish ? event?.name_en : event?.name_es;

  const eventDescription = getLocalizedText(
    event?.description_en,
    event?.description_es,
    t.noDescription,
  );

  const eventDetails = getLocalizedText(
    event?.details_en,
    event?.details_es,
    "",
  );

  const imageHeight = Math.max(Number(event?.image_height || 320), 320);
  const imagePositionY = Number(event?.image_position_y ?? 50);

  const normalizedHosts = useMemo(() => {
    if (!Array.isArray(event?.hosts)) return [];

    return event.hosts
      .map((host) => {
        if (typeof host === "string") {
          return {
            id: host,
            name: host,
          };
        }

        return {
          id: host?.id || host?.name || "",
          name: host?.name || host?.id || "",
        };
      })
      .filter((host) => host.name);
  }, [event?.hosts]);

  const normalizedIntructors = useMemo(() => {
    if (!Array.isArray(event?.instructors)) return [];

    return event.instructors
      .map((instructor) => {
        if (typeof instructor === "string") {
          return {
            id: instructor,
            name: instructor,
          };
        }

        return {
          id: instructor?.id || instructor?.name || "",
          name: instructor?.name || instructor?.id || "",
        };
      })
      .filter((instructor) => instructor.name);
  }, [event?.instructors]);

  useEffect(() => {
    setEventStatus(event?.status || "");
  }, [event?.status]);

  useEffect(() => {
    setResolvedAttendanceSheet(attendanceSheet || null);
  }, [attendanceSheet]);

  useEffect(() => {
    setResolvedParticipants(participants || []);
  }, [participants]);

  useEffect(() => {
    if (!playingPreviewUrl) return;

    const audio = new Audio(playingPreviewUrl);

    audio.play().catch((error) => {
      console.error("Music preview play error:", error);
    });

    audio.addEventListener("ended", () => {
      setPlayingPreviewUrl(null);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [playingPreviewUrl]);

  const formatLocalizedDate = (value?: string | null) => {
    if (!value) return t.noDate;

    const dateValue = new Date(`${value}T00:00:00`);

    if (Number.isNaN(dateValue.getTime())) return t.noDate;

    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateValue);
  };

  const formatLocalizedTime = (value?: string | null) => {
    if (!value) return t.noTime;

    const [hours = "0", minutes = "0"] = String(value).split(":");
    const dateValue = new Date();

    dateValue.setHours(Number(hours), Number(minutes), 0, 0);

    if (Number.isNaN(dateValue.getTime())) return t.noTime;

    return new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(dateValue);
  };

  const formatLocalizedRecurrence = () => {
    const scheduleType = String(event?.schedule_type || "").toLowerCase();

    if (scheduleType !== "recurrent") return "";

    const recurrence = String(event?.recurrence || "").toLowerCase();

    const dayMap: Record<string, string> = {
      sunday: isSpanish ? "domingo" : "Sunday",
      monday: isSpanish ? "lunes" : "Monday",
      tuesday: isSpanish ? "martes" : "Tuesday",
      wednesday: isSpanish ? "miércoles" : "Wednesday",
      thursday: isSpanish ? "jueves" : "Thursday",
      friday: isSpanish ? "viernes" : "Friday",
      saturday: isSpanish ? "sábado" : "Saturday",
      sun: isSpanish ? "domingo" : "Sun",
      mon: isSpanish ? "lunes" : "Mon",
      tue: isSpanish ? "martes" : "Tue",
      wed: isSpanish ? "miércoles" : "Wed",
      thu: isSpanish ? "jueves" : "Thu",
      fri: isSpanish ? "viernes" : "Fri",
      sat: isSpanish ? "sábado" : "Sat",
    };

    const formatCsvDays = (value?: string | null) => {
      if (!value) return "";

      return value
        .split(",")
        .map((day) => {
          const cleanDay = day.trim();
          return dayMap[cleanDay.toLowerCase()] || cleanDay;
        })
        .filter(Boolean)
        .join(", ");
    };

    const formatMonthName = (monthNumber?: number | string | null) => {
      const parsedMonth = Number(monthNumber);

      if (!parsedMonth || parsedMonth < 1 || parsedMonth > 12) return "";

      return new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(new Date(2026, parsedMonth - 1, 1));
    };

    const formatCsvMonths = (value?: string | null) => {
      if (!value) return "";

      return value
        .split(",")
        .map((month) => formatMonthName(month.trim()) || month.trim())
        .filter(Boolean)
        .join(", ");
    };

    const recurrenceMap: Record<string, string> = {
      weekly: t.weekly,
      monthly: t.monthly,
      yearly: t.yearly,
      recurrent: t.repeats,
    };

    const baseText = recurrenceMap[recurrence] || t.repeats;

    if (recurrence === "weekly") {
      const daysText = formatCsvDays(event.days_of_week_csv);

      return daysText
        ? `${baseText} • ${isSpanish ? "Días" : "Days"}: ${daysText}`
        : baseText;
    }

    if (recurrence === "monthly") {
      const dayText = event.day_of_month
        ? `${isSpanish ? "Día" : "Day"} ${event.day_of_month}`
        : "";

      const monthsText = formatCsvMonths(event.months_csv);

      return [baseText, dayText, monthsText].filter(Boolean).join(" • ");
    }

    if (recurrence === "yearly") {
      const monthText = formatMonthName(event.month);

      const dayText = event.day_of_month
        ? `${isSpanish ? "Día" : "Day"} ${event.day_of_month}`
        : "";

      return [baseText, monthText, dayText].filter(Boolean).join(" • ");
    }

    return baseText;
  };

  const formatType = (value?: string | null) => {
    if (!value) return t.event;

    const cleanValue = String(value).trim();

    if (cleanValue.toLowerCase() === "event") return t.event;

    return cleanValue;
  };

  const allParticipants = useMemo(() => {
    const occurrenceDate =
      event?.occurrenceDate ||
      event?.date ||
      resolvedAttendanceSheet?.occurrence_date;

    return (resolvedParticipants || []).filter((participant) => {
      const isConfirmed =
        participant.status === "attended" || participant.checked_in === true;

      if (!isConfirmed) return false;

      if (!occurrenceDate) return true;

      if (!participant.occurrence_date) return true;

      return participant.occurrence_date === occurrenceDate;
    });
  }, [
    resolvedParticipants,
    event?.occurrenceDate,
    event?.date,
    resolvedAttendanceSheet?.occurrence_date,
  ]);

  const participantsCount = allParticipants.length;
  const visibleParticipants = allParticipants.slice(0, 5);
  const remainingParticipants =
    participantsCount > 5 ? participantsCount - 5 : 0;

  const recurrenceText = formatLocalizedRecurrence();

  const hasLocation = [
    event.street_address,
    event.city,
    event.country,
    event.zip_code,
  ].some(Boolean);

  const locationText =
    [event.street_address, event.city, event.country]
      .filter(Boolean)
      .join(", ") || t.locationTbd;

  return (
    <div className="relative flex h-full min-w-0 flex-col">
      <div className="pointer-events-none absolute -left-12 top-24 h-48 w-48 rounded-full bg-[#5BCEFA]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-40 w-40 rounded-full bg-[#F5A9B8]/10 blur-3xl" />
      {isDraftEvent && (
        <div className="relative z-20 border-b border-amber-200 bg-linear-to-r from-amber-50 via-orange-50 to-yellow-50 px-5 py-4 md:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-sm">
                <FaExclamationTriangle />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                    {t.draftEvent}
                  </p>

                  <span className="rounded-full border border-amber-200 bg-white/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-amber-700 shadow-sm">
                    Draft
                  </span>
                </div>

                <p className="mt-1 text-sm leading-5 text-amber-800/80">
                  {t.draftDescription}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePublishEvent}
              disabled={publishingEvent}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-green-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <FaCheckCircle />
              {publishingEvent ? t.publishingEvent : t.publishEvent}
            </button>
          </div>
        </div>
      )}

      <div
        className="relative w-full overflow-hidden rounded-[1.75rem] border border-white/80 shadow-[0_24px_65px_rgba(58,76,105,0.16)] sm:rounded-[2rem] -mb-4"
        style={{
          height: `${Math.min(imageHeight, 420)}px`,
        }}
      >
        <Image
          src={event.image_url || "/carousel/bridge.webp"}
          alt={t.eventName}
          fill
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover"
          style={{
            objectPosition: `center ${imagePositionY}%`,
          }}
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/35 to-slate-950/5" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
          <div
            className="mb-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/92 px-3.5 py-2 text-xs font-black shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl 
            capitalize text-slate-700 shadow-sm backdrop-blur-sm max-w-[45vw] md:max-w-none"
          >
            <FaTag className="text-blue-600" />
            <span className="truncate">{formatType(event.type)}</span>{" "}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-100">
              {t.event}
            </p>

            <h1 className="text-3xl font-bold tracking-[-0.045em] text-white drop-shadow-lg sm:text-5xl">
              {t.eventName}
            </h1>

            {confirmed && (
              <div className="mt-4 inline-flex animate-fade-in items-center gap-2 rounded-full border border-white/20 bg-green-500/90 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                <FaCheckCircle />
                {t.attending}
              </div>
            )}
          </div>
        </div>

        {confirmed && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-600/20 backdrop-blur-[1px]">
            <FaCheckCircle className="animate-scaleIn text-5xl text-white drop-shadow-xl" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-5">
        <section className="relative overflow-hidden rounded-[1.75rem] px-1 py-6 sm:px-2 sm:py-7">
          <div className="pointer-events-none absolute inset-0 " />
          <div className="pointer-events-none absolute -left-12 -top-14 h-36 w-36 rounded-full" />
          <div className="pointer-events-none absolute -bottom-16 right-0 h-40 w-40" />

          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-sky-700 shadow-[0_10px_28px_rgba(91,206,250,0.14)] ring-1 ring-white/90 backdrop-blur-xl">
                <BookOpenText className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[12px] font-black uppercase tracking-[0.24em] text-sky-700 my-auto">
                    {t.aboutEvent}
                  </p>
                  <Sparkles className="h-3.5 w-3.5 text-[#F5A9B8]" />
                </div>
              </div>
            </div>

            <div className="relative pl-5 sm:pl-6">
              <span className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-[#5BCEFA] via-slate-200 to-[#F5A9B8]" />
              <span className="absolute -left-[3px] top-1 h-2 w-2 rounded-full bg-[#5BCEFA] shadow-[0_0_14px_rgba(91,206,250,0.65)]" />

              <div
                className="prose prose-sm max-w-none text-slate-600 prose-p:leading-7 prose-p:tracking-[-0.01em] prose-strong:text-slate-900 prose-a:font-semibold prose-a:text-sky-700 md:prose-base md:prose-p:leading-8
                text-justify"
                dangerouslySetInnerHTML={{
                  __html: eventDescription || t.noDescription,
                }}
              />
            </div>
          </div>
        </section>

        {event.audio_enabled && event.audio_preview_url && (
          <section
            className="relative mt-7 overflow-hidden rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(240,249,255,0.94)_42%,rgba(253,242,248,0.92))] p-2
          shadow-[0_18px_48px_rgba(91,206,250,0.14)]"
          >
            <div className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-[#5BCEFA]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -right-8 h-40 w-40 rounded-full bg-[#F5A9B8]/20 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative mx-auto shrink-0 sm:mx-0">
                  <div
                    className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[#5BCEFA]/55 via-white to-[#F5A9B8]/55 blur-xl transition-opacity duration-500 ${
                      playingPreviewUrl === event.audio_preview_url
                        ? "opacity-100"
                        : "opacity-55"
                    }`}
                  />

                  {event.audio_artwork_url ? (
                    <Image
                      src={event.audio_artwork_url}
                      alt={event.audio_track_name || t.soundtrack}
                      className={`relative h-24 w-24 rounded-[1.4rem] object-cover shadow-[0_16px_35px_rgba(15,23,42,0.18)] ring-1 ring-white/90 sm:h-28 sm:w-28 ${
                        playingPreviewUrl === event.audio_preview_url
                          ? "animate-[spin_18s_linear_infinite]"
                          : ""
                      }`}
                      width={112}
                      height={112}
                    />
                  ) : (
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#5BCEFA] via-white to-[#F5A9B8] shadow-[0_16px_35px_rgba(15,23,42,0.16)] sm:h-28 sm:w-28">
                      <PlayCircle className="h-10 w-10 text-slate-700/80" />
                    </div>
                  )}

                  {playingPreviewUrl === event.audio_preview_url && (
                    <div className="absolute -bottom-2 -right-2 flex h-9 items-end gap-0.5 rounded-full border border-white/90 bg-slate-950 px-2.5 py-2 shadow-lg">
                      {[12, 18, 9, 16].map((height, index) => (
                        <span
                          key={index}
                          className="w-1 animate-pulse rounded-full bg-white"
                          style={{
                            height: `${height}px`,
                            animationDelay: `${index * 120}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-700">
                      {t.soundtrack}
                    </span>

                    {playingPreviewUrl === event.audio_preview_url && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5BCEFA]" />
                        {t.nowPlaying}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 truncate text-xl font-black tracking-[-0.03em] text-slate-900 sm:text-2xl">
                    {event.audio_track_name || t.soundtrack}
                  </h3>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-500 mb-1">
                    {event.audio_artist_name || t.curatedForEvent}
                  </p>

                  {/* <p className="mt-3 text-sm leading-6 text-slate-500">
                    {t.soundtrackDescription}
                  </p> */}

                  <button
                    type="button"
                    onClick={() =>
                      setPlayingPreviewUrl((previousUrl) =>
                        previousUrl === event.audio_preview_url
                          ? null
                          : event.audio_preview_url || null,
                      )
                    }
                    className="group mt-1 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#5BCEFA] via-[#8fddfb] to-[#F5A9B8] px-5 py-3.5 text-sm font-black text-slate-900 shadow-[0_14px_30px_rgba(91,206,250,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(245,169,184,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:w-auto"
                    aria-label={
                      playingPreviewUrl === event.audio_preview_url
                        ? t.pausePreview
                        : t.listenPreview
                    }
                  >
                    {playingPreviewUrl === event.audio_preview_url ? (
                      <PauseCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                    ) : (
                      <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                    )}

                    {playingPreviewUrl === event.audio_preview_url
                      ? t.pausePreview
                      : t.listenPreview}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Details Section */}
        <section className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40" />
          <div className="pointer-events-none absolute -right-14 bottom-0 h-40 w-40l" />

          <div className="relative">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-sky-700 shadow-[0_10px_26px_rgba(91,206,250,0.14)] ring-1 ring-white">
                <BadgeInfoIcon className="text-sm" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-700">
                    {t.eventEssentials}
                  </p>
                  <Sparkles className="h-3.5 w-3.5 text-[#F5A9B8]" />
                </div>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {t.eventEssentialsDescription}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoTile
                icon={<FaCalendarAlt />}
                eyebrow={t.dateLabel}
                value={formatLocalizedDate(event.date)}
                tone="sky"
              />

              <InfoTile
                icon={<FaClock />}
                eyebrow={t.timeLabel}
                value={formatLocalizedTime(event.time)}
                tone="pink"
              />

              {(hasLocation || event?.location_url) && (
                <InfoTile
                  icon={<FaMapMarkerAlt />}
                  eyebrow={t.locationLabel}
                  value={`${locationText}${
                    event.zip_code ? ` • ${event.zip_code}` : ""
                  }`}
                  tone="violet"
                  wide
                  href={event.location_url || undefined}
                  actionLabel={t.openMap}
                />
              )}

              {recurrenceText && (
                <InfoTile
                  icon={<FiRepeat />}
                  eyebrow={t.recurrenceLabel}
                  value={recurrenceText}
                  tone="sky"
                />
              )}

              {!!event.dress_code && (
                <InfoTile
                  icon={<FaShirt />}
                  eyebrow={t.dressCodeLabel}
                  value={event.dress_code}
                  tone="pink"
                />
              )}

              {!!event.price && (
                <InfoTile
                  icon={<FaGift />}
                  eyebrow={t.donationLabel}
                  value={`$${Number(event.price).toFixed(2)}`}
                  tone="violet"
                />
              )}

              {event.include_form && (
                <InfoTile
                  icon={<SiGoogleforms />}
                  eyebrow={t.registrationLabel}
                  value={t.includesForm}
                  tone="sky"
                />
              )}
            </div>
          </div>
        </section>

        {!!eventDetails && (
          <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-blue-50/40 px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] text-justify">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {t.additionalDetails}
            </p>
            <div
              className="prose prose-sm mt-2 max-w-none text-slate-700"
              dangerouslySetInnerHTML={{
                __html: eventDetails,
              }}
            />
          </div>
        )}

        {(!!normalizedHosts.length || !!normalizedIntructors.length) && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {!!normalizedHosts.length && (
              <PeopleCard
                title={t.hostedBy}
                count={normalizedHosts.length}
                people={normalizedHosts}
                icon={<FaUserTie className="text-sm" />}
                tone="blue"
              />
            )}

            {!!normalizedIntructors.length && (
              <PeopleCard
                title={t.instructedBy}
                count={normalizedIntructors.length}
                people={normalizedIntructors}
                icon={<GiTeacher className="text-base" />}
                tone="violet"
              />
            )}
          </div>
        )}

        <div className="mt-7 rounded-[1.5rem] border border-blue-100/80 bg-linear-to-br from-blue-50 via-white to-indigo-50/60 p-5 shadow-[0_12px_32px_rgba(37,99,235,0.08)] sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h4 className="text-sm font-semibold text-slate-900">
              {t.participants}
            </h4>
          </div>

          <div className="flex items-center">
            {visibleParticipants.length ? (
              <>
                {visibleParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="relative -ml-2 first:ml-0 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-linear-to-br from-blue-50 to-indigo-100 text-blue-700 shadow-sm"
                    title={participant.participant_name || t.participantAlt}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 12.5c2.35 0 4.25-1.9 4.25-4.25S14.35 4 12 4 7.75 5.9 7.75 8.25 9.65 12.5 12 12.5Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.75 20c.75-3.35 3.55-5.5 7.25-5.5s6.5 2.15 7.25 5.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}

                {remainingParticipants > 0 && (
                  <div className="relative -ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                    +{remainingParticipants}
                  </div>
                )}

                <span className="ml-3 text-sm text-slate-500">
                  {participantsCount}{" "}
                  {participantsCount === 1
                    ? t.inscription
                    : t.inscriptionsPlural}
                </span>
              </>
            ) : (
              <span className="text-sm text-slate-500">{t.noParticipants}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  eyebrow,
  value,
  tone = "sky",
  wide = false,
  href,
  actionLabel,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  value: string;
  tone?: "sky" | "pink" | "violet";
  wide?: boolean;
  href?: string;
  actionLabel?: string;
}) {
  const toneClasses = {
    sky: {
      icon: "bg-sky-50 text-sky-700 ring-sky-100",
      accent: "from-[#5BCEFA] to-sky-400",
      eyebrow: "text-sky-700",
      action: "text-sky-700 hover:bg-sky-50",
    },
    pink: {
      icon: "bg-pink-50 text-pink-700 ring-pink-100",
      accent: "from-[#F5A9B8] to-pink-400",
      eyebrow: "text-pink-700",
      action: "text-pink-700 hover:bg-pink-50",
    },
    violet: {
      icon: "bg-violet-50 text-violet-700 ring-violet-100",
      accent: "from-violet-400 to-[#F5A9B8]",
      eyebrow: "text-violet-700",
      action: "text-violet-700 hover:bg-violet-50",
    },
  }[tone];

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.45rem] border border-white/90 bg-white/72 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.045)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_16px_36px_rgba(15,23,42,0.075)] ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${toneClasses.accent}`}
      />

      <div className="flex items-start gap-3.5">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-105 ${toneClasses.icon}`}
        >
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={`text-[9px] font-black uppercase tracking-[0.22em] ${toneClasses.eyebrow}`}
          >
            {eyebrow}
          </p>

          <p className="mt-1.5 text-sm font-semibold leading-6 text-slate-800 sm:text-[15px]">
            {value}
          </p>

          {href && actionLabel && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-flex items-center rounded-xl px-2.5 py-1.5 text-xs font-black transition ${toneClasses.action}`}
            >
              {actionLabel}
              <span
                aria-hidden="true"
                className="ml-1.5 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function PeopleCard({
  title,
  people,
  icon,
  tone,
}: {
  title: string;
  count: number;
  people: { id?: string | null; name?: string | null }[];
  icon: React.ReactNode;
  tone: "blue" | "violet";
}) {
  const toneClasses =
    tone === "blue"
      ? {
          card: "border-blue-100 bg-linear-to-br from-blue-50 via-white to-slate-50",
          icon: "bg-blue-600 text-white",
          title: "text-blue-700",
          chip: "border-blue-100 text-blue-700",
          avatar: "bg-blue-600",
        }
      : {
          card: "border-violet-100 bg-linear-to-br from-violet-50 via-white to-slate-50",
          icon: "bg-violet-600 text-white",
          title: "text-violet-700",
          chip: "border-violet-100 text-violet-700",
          avatar: "bg-violet-600",
        };

  return (
    <div
      className={`rounded-[1.5rem] border p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] ${toneClasses.card}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl shadow-sm ${toneClasses.icon}`}
        >
          {icon}
        </div>

        <div>
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.16em] ${toneClasses.title}`}
          >
            {title}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {people.map((person, index) => (
          <span
            key={person.id || person.name || index}
            className={`inline-flex max-w-full items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs font-semibold shadow-sm ${toneClasses.chip}`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${toneClasses.avatar}`}
            >
              {String(person.name || "?")
                .trim()
                .slice(0, 1)
                .toUpperCase()}
            </span>
            <span className="truncate">{person.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
