"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
} from "date-fns";
import {
  FiRepeat,
  FiSearch,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiEdit3,
  FiEye,
} from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";

import { useLanguage } from "../context/language";
import {
  calendarThemes,
  getEventColorClasses,
  getEventTimeLabel,
  occursOnDate,
} from "../helpers/calendar";
import { SchedulerForm } from "../lib/interfaces/events";

type CalendarThemeKey = "ocean" | "midnight" | "rose" | "emerald" | "sunset";

type CalendarListViewProps = {
  events: SchedulerForm[];
  // selectedEvent?: SchedulerForm;
  onEventClick?: unknown;
  calendarMode?: "admin" | "member";
  calendarThemeKey?: CalendarThemeKey;
  setCalendarThemeKey?: (key: CalendarThemeKey) => void;
};

const getOccurrenceDateKey = (date: Date) => format(date, "yyyy-MM-dd");

const getAttendanceKey = (eventId?: string, occurrenceDate?: string | null) =>
  `${eventId || "unknown"}::${occurrenceDate || "no-date"}`;

const getNextUpcomingRecurringOccurrenceDate = (event: SchedulerForm) => {
  const today = startOfDay(new Date());

  for (let index = 0; index < 730; index += 1) {
    const candidate = addDays(today, index);

    if (occursOnDate(event, candidate)) {
      return getOccurrenceDateKey(candidate);
    }
  }

  return null;
};

const getScheduledOccurrenceDate = (event: SchedulerForm) => {
  if (event?.date) return String(event.date).slice(0, 10);

  if (event?.start) {
    const parsed = new Date(event.start);
    if (!Number.isNaN(parsed.getTime())) return format(parsed, "yyyy-MM-dd");
  }

  return null;
};

const normalizeHexColor = (color?: string) => {
  if (!color) return null;

  const trimmed = String(color).trim();

  if (/^#[0-9A-F]{6}$/i.test(trimmed)) return trimmed;

  if (/^#[0-9A-F]{3}$/i.test(trimmed)) {
    return `#${trimmed
      .slice(1)
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }

  return null;
};

const getEventIconStyle = (color?: string): React.CSSProperties => {
  const baseColor = normalizeHexColor(color);

  if (!baseColor) return {};

  return {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.14))",
    borderColor: "rgba(255,255,255,0.35)",
    color: "#ffffff",
  };
};

export default function CalendarListView({
  events = [],
  onEventClick,
  calendarMode,
  calendarThemeKey,
  setCalendarThemeKey,
}: CalendarListViewProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    listView: isSpanish ? "Vista de Lista" : "List View",
    description: isSpanish
      ? "Administra todos los eventos programados y recurrentes en una vista elegante."
      : "Manage all scheduled and recurring events in one elegant view.",
    search: isSpanish ? "Buscar eventos..." : "Search events...",
    all: isSpanish ? "Todos" : "All",
    scheduled: isSpanish ? "Programados" : "Scheduled",
    recurring: isSpanish ? "Recurrentes" : "Recurring",
    upcoming: isSpanish ? "Próximos" : "Upcoming",
    past: isSpanish ? "Pasados" : "Past",
    active: isSpanish ? "Activos" : "Active",
    total: isSpanish ? "Total" : "Total",
    participants: isSpanish ? "Participantes" : "Participants",
    noEvents: isSpanish ? "No se encontraron eventos" : "No events found",
    noEventsHint: isSpanish
      ? "Intenta cambiar los filtros o crear un nuevo evento."
      : "Try changing the filters or creating a new event.",
    eventType: isSpanish ? "Tipo" : "Type",
    dateTime: isSpanish ? "Fecha y hora" : "Date & time",
    location: isSpanish ? "Ubicación" : "Location",
    status: isSpanish ? "Estado" : "Status",
    actions: isSpanish ? "Acciones" : "Actions",
    viewManage: isSpanish ? "Ver / Administrar" : "View / Manage",
    today: isSpanish ? "Hoy" : "Today",
    noDate: isSpanish ? "Sin fecha" : "No date",
    noLocation: isSpanish ? "Sin ubicación" : "No location",
    confirmed: isSpanish ? "confirmados" : "confirmed",
    calendarTheme: isSpanish ? "Tema del Calendario" : "Calendar Theme",
    oneTime: isSpanish ? "Una vez" : "One-time",
  };

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "scheduled" | "recurring"
  >("all");
  const [dateFilter, setDateFilter] = useState<"all" | "upcoming" | "past">(
    "all"
  );
  const [attendanceCounts, setAttendanceCounts] = useState<
    Record<string, number>
  >({});
  const [localThemeKey, setLocalThemeKey] = useState<CalendarThemeKey>(
    calendarThemeKey as CalendarThemeKey
  );

  const activeThemeKey = calendarThemeKey || localThemeKey;
  const theme = calendarThemes[activeThemeKey] || calendarThemes.ocean;

  const setActiveThemeKey = (key: CalendarThemeKey) => {
    if (setCalendarThemeKey) setCalendarThemeKey(key);
    setLocalThemeKey(key);
    sessionStorage?.setItem("calendarTheme", key);
  };

  const getLocalizedEventName = (event: SchedulerForm) => {
    if (isSpanish) return event.name_es || event.name_en || "";
    return event.name_en || event.name_es || "";
  };

  const getLocalizedDescription = (event: SchedulerForm) => {
    if (isSpanish) {
      return event.description_es || event.description_en || "";
    }

    return event.description_en || event.description_es || "";
  };

  const getEventLocation = (event: SchedulerForm) => {
    const location = [event?.streetAddress, event?.city, event?.country]
      .filter(Boolean)
      .join(", ");

    return location || t.noLocation;
  };

  const getEventOccurrenceDate = (event: SchedulerForm) => {
    const isRecurring = event?.scheduleType === "recurrent";

    if (isRecurring) return getNextUpcomingRecurringOccurrenceDate(event);

    return getScheduledOccurrenceDate(event);
  };

  const getEventDateObject = (event: SchedulerForm) => {
    const occurrenceDate = getEventOccurrenceDate(event);

    if (!occurrenceDate) return null;

    const time = event?.time || "00:00:00";
    const parsed = new Date(`${occurrenceDate}T${time}`);

    if (Number.isNaN(parsed.getTime())) return parseISO(occurrenceDate);

    return parsed;
  };

  const formatEventDate = (event: SchedulerForm) => {
    const date = getEventDateObject(event);

    if (!date) return t.noDate;

    const base = new Intl.DateTimeFormat(isSpanish ? "es-PR" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);

    return isToday(date) ? `${t.today} · ${base}` : base;
  };

  const normalizedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aDate = getEventDateObject(a)?.getTime() || Number.MAX_SAFE_INTEGER;
      const bDate = getEventDateObject(b)?.getTime() || Number.MAX_SAFE_INTEGER;

      return aDate - bDate;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, language]);

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    const now = startOfDay(new Date());

    return normalizedEvents.filter((event) => {
      const isRecurring = event?.scheduleType === "recurrent";
      const eventDate = getEventDateObject(event);

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "recurring" && isRecurring) ||
        (typeFilter === "scheduled" && !isRecurring);

      const matchesDate =
        dateFilter === "all" ||
        !eventDate ||
        (dateFilter === "upcoming" &&
          (isAfter(eventDate, now) || isToday(eventDate))) ||
        (dateFilter === "past" &&
          isBefore(eventDate, now) &&
          !isToday(eventDate));

      const haystack = [
        getLocalizedEventName(event),
        getLocalizedDescription(event),
        getEventLocation(event),
        event.status,
        event.type,
        event.privacy,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);

      return matchesType && matchesDate && matchesSearch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedEvents, search, typeFilter, dateFilter, language]);

  useEffect(() => {
    const fetchAttendanceCounts = async () => {
      try {
        const targets = normalizedEvents
          .map((event) => {
            const occurrenceDate = getEventOccurrenceDate(event);

            return {
              event,
              occurrenceDate,
              key: getAttendanceKey(event.id, occurrenceDate),
            };
          })
          .filter((item) => item.event?.id && item.occurrenceDate);

        if (targets.length === 0) {
          setAttendanceCounts({});
          return;
        }

        const results = await Promise.all(
          targets.map(async ({ event, occurrenceDate, key }) => {
            try {
              const params = new URLSearchParams({
                eventId: event.id,
                occurrenceDate: String(occurrenceDate),
              });

              const response = await fetch(`/api/event-attendance?${params}`);
              const result = await response.json();

              if (!response.ok || !result?.success) {
                return { key, count: 0 };
              }

              return {
                key,
                count: result?.confirmedCount ?? result?.participantCount ?? 0,
              };
            } catch (error) {
              console.error(
                `Unable to fetch attendance for ${event.id}:`,
                error
              );

              return { key, count: 0 };
            }
          })
        );

        const counts = results.reduce((acc, item) => {
          acc[item.key] = Number(item.count) || 0;
          return acc;
        }, {} as Record<string, number>);

        setAttendanceCounts(counts);
      } catch (error) {
        console.error("Unable to fetch event list attendance counts:", error);
        setAttendanceCounts({});
      }
    };

    fetchAttendanceCounts();
  }, [normalizedEvents]);

  const handleEventClick = (
    clickEvent: React.MouseEvent,
    event: SchedulerForm
  ) => {
    const occurrenceDate = getEventOccurrenceDate(event);

    const eventForClick = {
      ...event,
      occurrenceDate,
    };

    if (typeof onEventClick === "function") {
      try {
        onEventClick({
          clickEvent,
          event: eventForClick,
        });
      } catch {
        onEventClick(eventForClick);
      }
    }
  };

  const totalCount = events.length;
  const recurringCount = events.filter(
    (event) => event.scheduleType === "recurrent"
  ).length;
  const scheduledCount = totalCount - recurringCount;
  const activeCount = events.filter(
    (event) => String(event.status || "").toLowerCase() !== "draft"
  ).length;

  return (
    <div className={`p-3 sm:p-4 ${theme.shell}`}>
      <div className="mb-4 flex flex-col gap-3 rounded-3xl border border-white/50 bg-white/45 p-4 shadow-sm backdrop-blur-xl xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p
            className={`text-xs font-black uppercase tracking-[0.18em] ${theme.eyebrow}`}
          >
            {t.listView}
          </p>
          <h2 className={`mt-1 text-2xl font-black ${theme.title}`}>
            {t.eventType} / {t.dateTime}
          </h2>
          <p className={`mt-1 text-sm ${theme.muted}`}>{t.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(calendarThemes) as CalendarThemeKey[]).map((key) => {
            const item = calendarThemes[key];
            const isActive = activeThemeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveThemeKey(key)}
                className={`group flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                    : "border-white/60 bg-white/60 text-slate-600 hover:-translate-y-0.5 hover:bg-white"
                }`}
                title={item.name}
              >
                <span
                  className={`h-4 w-4 rounded-full bg-linear-to-br ${
                    item.preview
                  } shadow-sm ring-2 ${
                    isActive ? "ring-white/40" : "ring-white"
                  }`}
                />
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label={t.total} value={totalCount} theme={theme} />
        <StatCard label={t.scheduled} value={scheduledCount} theme={theme} />
        <StatCard label={t.recurring} value={recurringCount} theme={theme} />
        <StatCard label={t.active} value={activeCount} theme={theme} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 rounded-3xl border border-white/50 bg-white/45 p-3 shadow-sm backdrop-blur-xl lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.search}
            className="w-full rounded-2xl border border-white/70 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(
              event.target.value as "all" | "scheduled" | "recurring"
            )
          }
          className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          <option value="all">{t.all}</option>
          <option value="scheduled">{t.scheduled}</option>
          <option value="recurring">{t.recurring}</option>
        </select>

        <select
          value={dateFilter}
          onChange={(event) =>
            setDateFilter(event.target.value as "all" | "upcoming" | "past")
          }
          className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          <option value="all">{t.all}</option>
          <option value="upcoming">{t.upcoming}</option>
          <option value="past">{t.past}</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="hidden grid-cols-[1.2fr_0.8fr_1fr_0.7fr_0.7fr] gap-4 border-b border-slate-200/70 bg-white/65 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 lg:grid">
          <span>{t.eventType}</span>
          <span>{t.dateTime}</span>
          <span>{t.location}</span>
          <span>{t.participants}</span>
          <span className="text-right">{t.actions}</span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className={`p-10 text-center ${theme.emptyState}`}>
            <p className={`text-sm font-black ${theme.title}`}>{t.noEvents}</p>
            <p className={`mt-1 text-xs font-medium ${theme.muted}`}>
              {t.noEventsHint}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200/70">
            {filteredEvents.map((event) => {
              const isRecurring = event.scheduleType === "recurrent";
              const colors = getEventColorClasses(event);
              const timeLabel = getEventTimeLabel(event);
              const occurrenceDate = getEventOccurrenceDate(event);
              const attendanceKey = getAttendanceKey(event.id, occurrenceDate);
              const participantCount = attendanceCounts[attendanceKey] || 0;
              const hasCustomColor = !!colors?.style;
              const eventTitle = getLocalizedEventName(event);
              const eventDescription = getLocalizedDescription(event);

              return (
                <button
                  key={`${event.id}-${occurrenceDate || "no-date"}`}
                  type="button"
                  onClick={(clickEvent) => handleEventClick(clickEvent, event)}
                  className="group block w-full cursor-pointer px-4 py-4 text-left transition hover:bg-white/80 lg:px-5"
                >
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr_0.7fr_0.7fr] lg:items-center">
                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <div
                          style={colors.style}
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-white shadow-sm ${
                            hasCustomColor ? "border-white/25" : "bg-[#0d4db0]"
                          }`}
                        >
                          <span
                            style={getEventIconStyle(event?.color)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/25 bg-white/20 text-white"
                          >
                            {isRecurring ? <FiRepeat /> : <FaRegClock />}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`line-clamp-1 font-black ${theme.title}`}
                            >
                              {eventTitle}
                            </h3>

                            <span
                              style={colors.style}
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-white ${
                                hasCustomColor ? "border-white/25" : colors.pill
                              }`}
                            >
                              {isRecurring ? t.recurring : t.scheduled}
                            </span>
                          </div>

                          <div
                            className={`mt-1 line-clamp-2 text-xs leading-5 ${theme.muted}`}
                            dangerouslySetInnerHTML={{
                              __html: eventDescription || "",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:block">
                      <MetaPill
                        icon={<FiCalendar />}
                        label={formatEventDate(event)}
                      />
                      <div className="mt-0 lg:mt-2">
                        <MetaPill icon={<FiClock />} label={timeLabel} />
                      </div>
                    </div>

                    <div>
                      <MetaPill
                        icon={<FiMapPin />}
                        label={getEventLocation(event)}
                      />
                    </div>

                    <div>
                      <MetaPill
                        icon={<HiUsers />}
                        label={`${participantCount} ${t.confirmed}`}
                      />
                    </div>

                    <div className="flex justify-start lg:justify-end">
                      <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition group-hover:border-blue-100 group-hover:text-[#0d4db0]">
                        {calendarMode === "admin" ? <FiEdit3 /> : <FiEye />}
                        {t.viewManage}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  theme,
}: {
  label: string;
  value: number;
  theme: {
    shell: string;
    eyebrow: string;
    title: string;
    muted: string;
    emptyState: string;
  };
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/55 p-4 shadow-sm backdrop-blur-xl">
      <p
        className={`text-[11px] font-black uppercase tracking-[0.16em] ${theme.eyebrow}`}
      >
        {label}
      </p>
      <p className={`mt-1 text-2xl font-black ${theme.title}`}>{value}</p>
    </div>
  );
}

function MetaPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
      <span className="shrink-0 text-[#0d4db0]">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
  );
}
