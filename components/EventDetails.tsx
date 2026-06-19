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
import { PauseCircle, PlayCircle } from "lucide-react";

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
    null
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
    fallback = ""
  ) => {
    if (isSpanish) return es?.trim() || en?.trim() || fallback;
    return en?.trim() || es?.trim() || fallback;
  };

  // const eventName = isSpanish ? event?.name_en : event?.name_es;

  const eventDescription = getLocalizedText(
    event?.description_en,
    event?.description_es,
    t.noDescription
  );

  const eventDetails = getLocalizedText(
    event?.details_en,
    event?.details_es,
    ""
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
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-4xl border transition-all duration-700 ${
        confirmed
          ? "border-green-300 bg-linear-to-br from-green-50 via-white to-blue-50 shadow-[0_30px_90px_rgba(16,185,129,0.18)] scale-[1.01]"
          : "border-white/80 bg-linear-to-br from-white via-slate-50 to-blue-50 shadow-[0_24px_75px_rgba(15,23,42,0.10)]"
      }`}
    >
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
        className="relative w-full overflow-hidden"
        style={{
          height: `${imageHeight}px`,
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

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-2">
          <div
            className="mb-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold 
            capitalize text-slate-700 shadow-sm backdrop-blur-sm max-w-[45vw] md:max-w-none"
          >
            <FaTag className="text-blue-600" />
            <span className="truncate">{formatType(event.type)}</span>{" "}
          </div>
          {event.audio_enabled && event.audio_preview_url && (
            <div
              className="mb-5 min-w-0 max-w-[52vw] md:max-w-none rounded-[1.35rem] border border-blue-100 bg-linear-to-br relative left-4
              from-blue-50/90 via-white/80 to-indigo-50/85 px-2.5 py-2 md:px-4 md:py-3 shadow-sm scale-90 md:scale-100"
            >
              <div className="flex items-center gap-3">
                {event.audio_artwork_url && (
                  <Image
                    src={event.audio_artwork_url}
                    alt={event.audio_track_name || "Event audio"}
                    className="h-8 w-8 md:h-12 md:w-12 rounded-xl object-cover shadow-sm"
                    width={48}
                    height={48}
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] md:text-sm font-semibold text-slate-900 mb-0">
                    {event.audio_track_name || "Event audio"}
                  </p>
                  <p className="truncate text-[10px] md:text-xs text-slate-500">
                    {event.audio_artist_name || ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPlayingPreviewUrl((prev) =>
                      prev === event.audio_preview_url
                        ? null
                        : event.audio_preview_url || null
                    )
                  }
                  className="inline-flex h-8 w-8 md:h-11 md:w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg 
                  shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  {playingPreviewUrl === event.audio_preview_url ? (
                    <PauseCircle size={22} />
                  ) : (
                    <PlayCircle size={22} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-100">
              {t.event}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl">
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

      <div className="flex flex-1 flex-col p-5 md:p-7">
        <div
          className="prose prose-sm max-w-none text-slate-600 md:prose-base"
          dangerouslySetInnerHTML={{
            __html: eventDescription || t.noDescription,
          }}
        />

        <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2">
          <InfoTile
            icon={<FaCalendarAlt />}
            label={formatLocalizedDate(event.date)}
          />

          <InfoTile
            icon={<FaClock />}
            label={formatLocalizedTime(event.time)}
          />

          {(hasLocation || event?.location_url) && (
            <InfoTile
              icon={<FaMapMarkerAlt />}
              label={`${locationText}${
                event.zip_code ? ` • ${event.zip_code}` : ""
              }`}
            />
          )}

          {recurrenceText && (
            <InfoTile icon={<FiRepeat />} label={recurrenceText} />
          )}

          {!!event.dress_code && (
            <InfoTile
              icon={<FaShirt />}
              label={`${t.dressCode}: ${event.dress_code}`}
            />
          )}

          {!!event.price && (
            <InfoTile
              icon={<FaGift />}
              label={`${t.suggestedDonation}: $${Number(event.price).toFixed(
                2
              )}`}
            />
          )}

          {event.include_form && (
            <InfoTile icon={<SiGoogleforms />} label={t.includesForm} blue />
          )}
        </div>

        {!!eventDetails && (
          <div className="mt-5 rounded-[1.35rem] bg-white/85 px-4 py-4 backdrop-blur-sm">
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
          <div className="mt-5 grid grid-cols-1 gap-3 rounded-3xl backdrop-blur-sm sm:grid-cols-2">
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

        <div className="mt-6 rounded-[1.35rem] border-blue-100 bg-linear-to-br from-blue-50 via-white to-slate-50 p-4">
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

        <div className="mt-4 flex flex-col gap-2 text-sm">
          {event.location_url && (
            <a
              href={event.location_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-full border border-blue-300 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
            >
              {t.viewLocation}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  blue = false,
}: {
  icon: React.ReactNode;
  label: string;
  blue?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3">
      <span
        className={`my-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
          blue ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-blue-600"
        }`}
      >
        {icon}
      </span>
      <span
        className={`leading-6 ${
          blue ? "font-semibold text-blue-700" : "my-auto text-slate-700"
        }`}
      >
        {label}
      </span>
    </div>
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
    <div className={`rounded-2xl border p-3 ${toneClasses.card}`}>
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
