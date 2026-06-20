"use client";
import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  format,
  isSameDay,
  isToday,
} from "date-fns";
import { enUS, es } from "date-fns/locale";
import Swal from "sweetalert2";

import {
  calendarThemes,
  getEventColorClasses,
  getEventTimeLabel,
  occursOnDate,
} from "../helpers/calendar";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";
import {
  getAttendanceKey,
  getExcludedDates,
  getOccurrenceDateKey,
  getScheduledOccurrenceDate,
  getNextUpcomingRecurringOccurrenceDate,
  isOccurrenceExcluded,
  getEventIconStyle,
} from "../helpers/calendarMonth";
import { getWeekTranslations } from "../lib/translations/calendar/week";

import { FiChevronDown, FiRepeat } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { IoColorPaletteOutline } from "react-icons/io5";

import CalendarToolbar from "./CalendarToolbar";
import CalendarPanel from "./CalendarPanel";
import EventAttendanceDropdown from "./EventAttendanceDropdown";

type CalendarThemeKey = "ocean" | "midnight" | "rose" | "emerald" | "sunset";

const WeekView = ({
  events,
  onEventClick,
  setSelectedCalendarDate,
  allMonthsSelected,
  allDaysSelected,
  clearSchedulerForm,
  calendarMode = "admin",
  calendarThemeKey,
  setCalendarThemeKey,
}: {
  events: SchedulerForm[];
  onEventClick?: (params: {
    clickEvent: React.MouseEvent;
    event: SchedulerForm;
  }) => void;
  onOpenScheduleForm?: () => void;
  onOpenRecurringForm?: () => void;
  setSelectedCalendarDate: (date: string) => void;
  allMonthsSelected?: boolean;
  allDaysSelected?: boolean;
  clearSchedulerForm?: () => void;
  calendarMode?: "admin" | "member";
  calendarThemeKey?: string | null;
  setCalendarThemeKey?: (key: CalendarThemeKey) => void;
}) => {
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";
  const dateLocale = isSpanish ? es : enUS;
  const t = getWeekTranslations(language);

  const getLocalizedEventName = (event?: SchedulerForm | null) => {
    if (!event) return "";
    if (isSpanish) return event.name_es || event.name_en || "";
    return event.name_en || event.name_es || "";
  };

  const [localEvents, setLocalEvents] = useState<SchedulerForm[]>(events || []);
  const [showScheduled, setShowScheduled] = useState(true);
  const [showRecurring, setShowRecurring] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [localThemeKey, setLocalThemeKey] = useState<CalendarThemeKey>("ocean");

  const activeThemeKey = (calendarThemeKey ||
    localThemeKey) as CalendarThemeKey;

  const setActiveThemeKey = (key: CalendarThemeKey) => {
    if (setCalendarThemeKey) {
      setCalendarThemeKey(key);
      return;
    }

    setLocalThemeKey(key);
  };

  const theme = calendarThemes[activeThemeKey] || calendarThemes.ocean;

  const recurringEvents = (localEvents || []).filter(
    (e: SchedulerForm) => e?.scheduleType === "recurrent"
  );

  const scheduledEvents = (localEvents || []).filter(
    (e: SchedulerForm) => e?.scheduleType !== "recurrent"
  );

  const [visibleRecurringIds, setVisibleRecurringIds] = useState<string[]>(
    recurringEvents.map((e: SchedulerForm) => e?.id)
  );

  const [visibleScheduledIds, setVisibleScheduledIds] = useState<string[]>(
    scheduledEvents.map((e: SchedulerForm) => e?.id)
  );

  const [showCalendarPanel, setShowCalendarPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<"Recurring" | "Scheduled">(
    "Recurring"
  );

  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [attendanceCounts, setAttendanceCounts] = useState<
    Record<string, number>
  >({});

  const [attendanceResponses, setAttendanceResponses] = useState<
    Record<string, { confirmed: boolean; status?: string | null }>
  >({});

  const [attendanceAnchor, setAttendanceAnchor] = useState<DOMRect | null>(
    null
  );
  const [attendanceEvent, setAttendanceEvent] = useState<SchedulerForm | null>(
    null
  );
  const [confirmingAttendance, setConfirmingAttendance] = useState(false);

  const [currentWeek, setCurrentWeek] = useState(new Date());

  const start = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  useEffect(() => {
    setLocalEvents(events || []);
  }, [events]);

  useEffect(() => {
    if (!showCalendarPanel) return;

    if (window.innerWidth < 1024) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCalendarPanel]);

  useEffect(() => {
    const savedTheme = sessionStorage?.getItem("calendarTheme");

    if (savedTheme && savedTheme in calendarThemes) {
      setActiveThemeKey(savedTheme as CalendarThemeKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage?.setItem("calendarTheme", activeThemeKey);
  }, [activeThemeKey]);

  useEffect(() => {
    const nextRecurringEvents = (localEvents || []).filter(
      (e: SchedulerForm) => e?.scheduleType === "recurrent"
    );

    const nextScheduledEvents = (localEvents || []).filter(
      (e: SchedulerForm) => e?.scheduleType !== "recurrent"
    );

    setVisibleRecurringIds(
      nextRecurringEvents.map((e: SchedulerForm) => e?.id)
    );
    setVisibleScheduledIds(
      nextScheduledEvents.map((e: SchedulerForm) => e?.id)
    );
  }, [localEvents]);

  const handlePrevWeek = () => setCurrentWeek((prev) => subWeeks(prev, 1));
  const handleNextWeek = () => setCurrentWeek((prev) => addWeeks(prev, 1));
  const handleToday = () => setCurrentWeek(new Date());

  const getEventCreatedDate = (event: SchedulerForm) => {
    const rawCreatedAt =
      event?.createdAt || event?.created_at || event?.date || null;

    if (!rawCreatedAt) return null;

    const parsed = new Date(rawCreatedAt);

    if (Number.isNaN(parsed.getTime())) return null;

    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  };

  const isOnOrAfterEventCreatedDate = (event: SchedulerForm, day: Date) => {
    const createdDate = getEventCreatedDate(event);

    if (!createdDate) return true;

    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    return dayStart >= createdDate;
  };

  const getCsvValues = (...values: unknown[]) => {
    return values
      .filter(Boolean)
      .flatMap((value) => String(value).split(","))
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
  };

  const recurringEventOccursOnCalendarDay = (
    event: SchedulerForm,
    day: Date
  ) => {
    if (event?.scheduleType !== "recurrent") return false;

    if (!isOnOrAfterEventCreatedDate(event, day)) return false;

    const recurrence = String(
      event?.recurrence || event?.frequency || "weekly"
    ).toLowerCase();

    const dayName = format(day, "EEEE").toLowerCase();
    const dayShort = format(day, "EEE").toLowerCase();
    const dayIndex = day.getDay();
    const dayOfMonth = day.getDate();
    const monthNumber = day.getMonth() + 1;

    const daysOfWeek = getCsvValues(
      event?.daysOfWeekCsv,
      event?.days_of_week_csv
    );

    const months = getCsvValues(event?.monthsCsv, event?.months_csv);

    const configuredDayOfMonth = Number(
      event?.dayOfMonth || event?.day_of_month || 0
    );

    const configuredMonth = Number(event?.month || 0);

    if (recurrence === "daily") {
      return true;
    }

    if (recurrence === "weekly") {
      if (daysOfWeek.length === 0) return true;

      return daysOfWeek.some((value) => {
        const normalized = value.toLowerCase();

        return (
          normalized === dayName ||
          normalized === dayShort ||
          normalized === String(dayIndex) ||
          normalized === String(dayIndex + 1)
        );
      });
    }

    if (recurrence === "monthly") {
      if (!configuredDayOfMonth) return true;

      return dayOfMonth === configuredDayOfMonth;
    }

    if (recurrence === "yearly") {
      const matchesMonth =
        !configuredMonth ||
        configuredMonth === monthNumber ||
        months.includes(String(monthNumber)) ||
        months.includes(format(day, "MMMM").toLowerCase()) ||
        months.includes(format(day, "MMM").toLowerCase());

      const matchesDay =
        !configuredDayOfMonth || dayOfMonth === configuredDayOfMonth;

      return matchesMonth && matchesDay;
    }

    return occursOnDate(event, day);
  };

  const getEventsForDay = (day: Date) => {
    const scheduled = scheduledEvents.filter((ev) => {
      const passesModeFilter =
        calendarMode === "admin"
          ? true
          : String(ev?.status || "").toLowerCase() !== "draft";

      return (
        ev?.start &&
        isSameDay(new Date(ev?.start), day) &&
        visibleScheduledIds.includes(ev.id) &&
        showScheduled &&
        passesModeFilter
      );
    });

    const recurringOnDay = recurringEvents.filter((ev) => {
      const occurrenceDate = getOccurrenceDateKey(day);
      const excludedDates = getExcludedDates(ev);
      const isExcludedDate = excludedDates.includes(occurrenceDate);

      const passesModeFilter =
        calendarMode === "admin"
          ? true
          : String(ev?.status || "").toLowerCase() !== "draft";

      return (
        visibleRecurringIds.includes(ev.id) &&
        showRecurring &&
        passesModeFilter &&
        (recurringEventOccursOnCalendarDay(ev, day) || isExcludedDate)
      );
    });

    return [...scheduled, ...recurringOnDay];
  };

  const handleCalendarEventClick = (
    clickEvent: React.MouseEvent,
    event: SchedulerForm
  ) => {
    setAttendanceAnchor(
      (clickEvent.currentTarget as HTMLElement).getBoundingClientRect()
    );
    setAttendanceEvent(event);

    if (typeof onEventClick === "function") {
      onEventClick({
        clickEvent,
        event,
      });
    }
  };

  const handleRestoreCanceledOccurrence = async (
    event: SchedulerForm,
    occurrenceDate: string
  ) => {
    if (!event?.id || !occurrenceDate) return;

    const result = await Swal.fire({
      icon: "info",
      title: t.canceledOccurrenceTitle,
      text: `${t.canceledOccurrenceText} (${occurrenceDate})`,
      showCancelButton: true,
      confirmButtonText: t.restoreOccurrenceConfirm,
      cancelButtonText: t.keepCanceled,
      reverseButtons: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    try {
      const nextExcludedDates = getExcludedDates(event).filter(
        (date) => date !== occurrenceDate
      );

      const { error } = await supabase
        .from("events")
        .update({
          recurrence_excluded_dates: nextExcludedDates,
        })
        .eq("id", event.id);

      if (error) throw error;

      setLocalEvents((prev) =>
        (prev || []).map((item) => {
          if (item.id !== event.id) return item;

          return {
            ...item,
            recurrenceExcludedDates: nextExcludedDates,
            recurrence_excluded_dates: nextExcludedDates,
          } as SchedulerForm;
        })
      );

      await Swal.fire({
        icon: "success",
        title: t.occurrenceRestoredTitle,
        text: t.occurrenceRestoredText,
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Restore canceled occurrence error:", error);

      await Swal.fire({
        icon: "error",
        title: t.unableRestoreOccurrenceTitle,
        text:
          error instanceof Error
            ? error.message
            : t.unableRestoreOccurrenceText,
      });
    }
  };

  const handleConfirmAttendance = async (
    event: SchedulerForm,
    status: string
  ) => {
    if (!event?.id) return;

    try {
      setConfirmingAttendance(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        Swal.fire({
          icon: "warning",
          title: t.signInRequiredTitle,
          text: t.signInRequiredText,
        });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, phone")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const fullName =
        [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
        user.email ||
        t.attendee;

      const email = profile?.email || user.email || null;
      const phone = profile?.phone || null;

      const resolvedStatus =
        status === "accepted"
          ? "attended"
          : status === "declined"
          ? "cancelled"
          : "registered";

      const occurrenceDate =
        event?.occurrenceDate ||
        getScheduledOccurrenceDate(event) ||
        getNextUpcomingRecurringOccurrenceDate(event);

      if (!occurrenceDate) {
        Swal.fire({
          icon: "warning",
          title: t.missingOccurrenceTitle,
          text: t.missingOccurrenceText,
        });

        return;
      }

      const response = await fetch("/api/event-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          occurrenceDate,
          participantName: fullName,
          participantEmail: email,
          participantPhone: phone,
          memberId: user.id,
          status: resolvedStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || t.unableConfirm);
      }

      const attendanceKey = getAttendanceKey(event.id, occurrenceDate);

      setAttendanceCounts((prev) => ({
        ...prev,
        [attendanceKey]:
          result?.confirmedCount ??
          result?.participantCount ??
          prev?.[attendanceKey] ??
          0,
      }));

      setAttendanceResponses((prev) => ({
        ...prev,
        [attendanceKey]: {
          confirmed: resolvedStatus === "attended",
          status: resolvedStatus,
        },
      }));

      const eventName = getLocalizedEventName(event);

      Swal.fire({
        icon: "success",
        title: t.attendanceUpdated,
        text:
          resolvedStatus === "attended"
            ? `${t.markedAttending} ${eventName}.`
            : resolvedStatus === "cancelled"
            ? `${t.declined} ${eventName}.`
            : isSpanish
            ? `${t.responseSaved} ${eventName}.`
            : `${t.responseSaved} ${eventName} ${t.wasSaved}`,
      });

      setAttendanceEvent(null);
      setAttendanceAnchor(null);
    } catch (error: unknown) {
      console.error("Attendance confirm error:", error);

      Swal.fire({
        icon: "error",
        title: t.unableConfirmTitle,
        text:
          (error instanceof Error ? error.message : "") ||
          t.confirmErrorFallback,
      });
    } finally {
      setConfirmingAttendance(false);
    }
  };

  useEffect(() => {
    const fetchAttendanceCounts = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let userEmail = user?.email || "";

        if (user?.id) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", user.id)
            .maybeSingle();

          userEmail = profile?.email || user.email || "";
        }

        const targets = days
          .flatMap((day) => {
            const dayEvents = getEventsForDay(day);
            const occurrenceDate = getOccurrenceDateKey(day);

            return dayEvents.map((event: SchedulerForm) => {
              const isRecurring = event?.scheduleType === "recurrent";
              const isCanceledOccurrence = isOccurrenceExcluded(event, day);

              const nextRecurringDate = isRecurring
                ? getNextUpcomingRecurringOccurrenceDate(event)
                : null;

              const isAllowedRecurringOccurrence =
                !isRecurring ||
                (!isCanceledOccurrence && nextRecurringDate === occurrenceDate);

              return {
                event,
                occurrenceDate,
                key: getAttendanceKey(event.id, occurrenceDate),
                shouldFetch: isAllowedRecurringOccurrence,
              };
            });
          })
          .filter((item) => item.event?.id);

        if (targets.length === 0) {
          setAttendanceCounts({});
          setAttendanceResponses({});
          return;
        }

        const uniqueTargets = Array.from(
          new Map(targets.map((item) => [item.key, item])).values()
        );

        const results = await Promise.all(
          uniqueTargets.map(
            async ({ event, occurrenceDate, key, shouldFetch }) => {
              if (!shouldFetch) {
                return {
                  key,
                  count: 0,
                  confirmed: false,
                  status: null,
                };
              }

              try {
                const params = new URLSearchParams({
                  eventId: event.id,
                  occurrenceDate,
                });

                if (user?.id) params.set("memberId", user.id);
                if (userEmail) params.set("email", userEmail);

                const response = await fetch(`/api/event-attendance?${params}`);
                const result = await response.json();

                if (!response.ok || !result?.success) {
                  return {
                    key,
                    count: 0,
                    confirmed: false,
                    status: null,
                  };
                }

                const existingEntry = result?.existingEntry || null;

                return {
                  key,
                  count:
                    result?.confirmedCount ?? result?.participantCount ?? 0,
                  confirmed:
                    existingEntry?.status === "attended" ||
                    existingEntry?.checked_in === true,
                  status: existingEntry?.status || null,
                };
              } catch (error) {
                console.error(
                  `Unable to fetch attendance for ${event.id} on ${occurrenceDate}:`,
                  error
                );

                return {
                  key,
                  count: 0,
                  confirmed: false,
                  status: null,
                };
              }
            }
          )
        );

        const counts = results.reduce((acc, item) => {
          acc[item.key] = Number(item.count) || 0;
          return acc;
        }, {} as Record<string, number>);

        const responses = results.reduce((acc, item) => {
          acc[item.key] = {
            confirmed: item.confirmed,
            status: item.status,
          };

          return acc;
        }, {} as Record<string, { confirmed: boolean; status?: string | null }>);

        setAttendanceCounts(counts);
        setAttendanceResponses(responses);
      } catch (error) {
        console.error("Unable to fetch attendance counts:", error);
        setAttendanceCounts({});
        setAttendanceResponses({});
      }
    };

    fetchAttendanceCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    localEvents,
    currentWeek,
    visibleRecurringIds,
    visibleScheduledIds,
    showRecurring,
    showScheduled,
  ]);

  const weekDaysWithEvents = days
    .map((day) => ({
      day,
      events: getEventsForDay(day),
    }))
    .filter((item) => item.events.length > 0);

  const renderEventButton = ({
    ev,
    day,
    compact = false,
  }: {
    ev: SchedulerForm;
    day: Date;
    compact?: boolean;
  }) => {
    const occurrenceDate = getOccurrenceDateKey(day);
    const isRecurring = ev?.scheduleType === "recurrent";
    const isCanceledOccurrence = isOccurrenceExcluded(ev, day);
    const isPastOccurrence = isPastOccurrenceForCalendar(day, ev);

    const nextRecurringDate = isRecurring
      ? getNextUpcomingRecurringOccurrenceDate(ev)
      : null;

    const isAllowedRecurringOccurrence =
      !isRecurring ||
      (!isCanceledOccurrence && nextRecurringDate === occurrenceDate);

    const attendanceKey = getAttendanceKey(ev.id, occurrenceDate);

    const participantCount = isAllowedRecurringOccurrence
      ? attendanceCounts[attendanceKey] || 0
      : 0;

    const userHasConfirmed =
      isAllowedRecurringOccurrence &&
      attendanceResponses[attendanceKey]?.confirmed === true;

    const eventForClick = {
      ...ev,
      occurrenceDate,
      userHasConfirmed,
      isAllowedRecurringOccurrence,
      isCanceledOccurrence,
    } as SchedulerForm;

    const colors = getEventColorClasses(ev);
    const timeLabel = getEventTimeLabel(ev);
    const hasCustomColor = !!colors?.style;

    return (
      <button
        key={ev.id + format(day, "yyyy-MM-dd")}
        type="button"
        style={isCanceledOccurrence ? undefined : colors.style}
        className={`relative w-full cursor-pointer overflow-hidden rounded-xl border text-left text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99] ${
          compact ? "px-2 py-2" : "p-3"
        } ${
          isCanceledOccurrence
            ? "border-rose-200 bg-linear-to-r from-rose-500/85 to-slate-700/85 opacity-90"
            : hasCustomColor
            ? "border-white/25"
            : isPastOccurrence
            ? "border-white/20 bg-white/10 text-white/80"
            : colors.pill
        }`}
        onClick={(clickEvent) => {
          const isPastMemberEvent = isPastEventForMember(day, ev);

          setSelectedCalendarDate(format(day, "yyyy-MM-dd"));

          if (calendarMode === "member" && isPastMemberEvent) {
            return;
          }

          if (calendarMode === "member" && isCanceledOccurrence) {
            return;
          }

          if (isCanceledOccurrence) {
            handleRestoreCanceledOccurrence(ev, occurrenceDate);
            return;
          }

          if (calendarMode === "member" && !isAllowedRecurringOccurrence) {
            Swal.fire({
              icon: "info",
              title: t.attendanceOpensTitle,
              text: t.attendanceOpensText,
            });

            return;
          }

          handleCalendarEventClick(clickEvent, eventForClick);
        }}
        title={getLocalizedEventName(ev)}
      >
        {isCanceledOccurrence && (
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_6px,transparent_6px,transparent_12px)]" />
        )}

        <div
          className={`relative flex items-start ${compact ? "gap-2" : "gap-3"}`}
        >
          <span
            style={
              isCanceledOccurrence ? undefined : getEventIconStyle(ev?.color)
            }
            className={`mt-0.5 flex shrink-0 items-center justify-center rounded-xl border ${
              compact ? "h-7 w-7" : "h-10 w-10"
            } ${
              isCanceledOccurrence
                ? "border-white/30 bg-white/20 text-white"
                : hasCustomColor
                ? "border-white/30 bg-white/20 text-white shadow-sm backdrop-blur"
                : colors.icon
            }`}
          >
            {isRecurring ? <FiRepeat /> : <FaRegClock />}
          </span>

          <div className="min-w-0 flex-1">
            <p
              className={`text-white drop-shadow-sm ${
                compact
                  ? "truncate text-[11px] font-black leading-tight"
                  : "line-clamp-2 text-sm font-black"
              } ${isCanceledOccurrence ? "line-through" : ""}`}
            >
              {getLocalizedEventName(ev)}
            </p>

            <div
              className={`mt-2 flex flex-wrap items-center ${
                compact ? "gap-1.5" : "gap-2"
              }`}
            >
              {isCanceledOccurrence ? (
                <>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/25">
                    {t.canceled}
                  </span>
                  {!compact && (
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white ring-1 ring-white/15">
                      {t.excluded}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white ring-1 ring-white/15">
                    <FaRegClock className="text-[10px]" />
                    {timeLabel}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white ring-1 ring-white/15">
                    <HiUsers className="text-sm" />
                    {participantCount} {!compact && t.subscribed}
                  </span>

                  {userHasConfirmed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-white ring-1 ring-white/20">
                      {t.confirmed}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </button>
    );
  };

  const isPastCalendarDay = (day: Date) => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    return dayStart < todayStart;
  };

  const isPastOccurrenceForCalendar = (day: Date, ev: SchedulerForm) => {
    const occurrenceDate = getOccurrenceDateKey(day);
    const eventTime = ev?.time || "23:59";
    const eventDateTime = new Date(`${occurrenceDate}T${eventTime}`);

    return eventDateTime < new Date();
  };

  const isPastEventForMember = (day: Date, ev: SchedulerForm) => {
    if (calendarMode !== "member") return false;

    const occurrenceDate = getOccurrenceDateKey(day);
    const eventTime = ev?.time || "23:59";

    const eventDateTime = new Date(`${occurrenceDate}T${eventTime}`);

    return eventDateTime < new Date();
  };

  return (
    <div
      className={`mb-2 mt-2 flex flex-col gap-3 rounded-3xl p-2 transition-all duration-300 sm:p-4 lg:flex-row ${theme.shell}`}
    >
      <div className="hidden items-stretch lg:flex">
        <div className="flex h-full w-18 flex-col items-center justify-between sm:w-22">
          <div
            className={`select-none font-black uppercase leading-none tracking-[0.22em] ${theme.monthText}`}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            }}
          >
            {format(currentWeek, "MMMM", { locale: dateLocale })}
          </div>

          <div className={`mb-2 mt-2 text-center font-semibold ${theme.muted}`}>
            <span
              className="block leading-none"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
            >
              {format(currentWeek, "yyyy")}
            </span>
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-col gap-3 rounded-3xl border border-white/50 bg-white/45 p-3 shadow-sm backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => setShowThemeOptions((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none md:w-auto"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/50 bg-white/60 shadow-sm">
                <IoColorPaletteOutline className="text-lg text-slate-700" />
              </div>

              <div>
                <p
                  className={`text-xs font-black uppercase tracking-[0.18em] ${theme.eyebrow}`}
                >
                  {t.calendarTheme}
                </p>
                <p className={`text-sm font-semibold ${theme.muted}`}>
                  {theme.name}
                </p>
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/60 bg-white/60 text-slate-600 shadow-sm md:hidden">
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  showThemeOptions ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          <div
            className={`flex flex-wrap gap-2 overflow-hidden transition-all duration-300 md:flex md:max-h-none md:opacity-100 ${
              showThemeOptions
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
            }`}
          >
            {(Object.keys(calendarThemes) as CalendarThemeKey[]).map((key) => {
              const item = calendarThemes[key];
              const isActive = activeThemeKey === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveThemeKey(key);
                    setShowThemeOptions(false);
                  }}
                  className={`group flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                      : "border-white/60 bg-white/60 text-slate-600 hover:-translate-y-0.5 hover:bg-white"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-linear-to-br ${
                      item.preview
                    } shadow-sm ring-2 ${
                      isActive ? "ring-white/40" : "ring-white"
                    }`}
                  />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <CalendarToolbar
          handleToday={handleToday}
          recurringEvents={recurringEvents}
          scheduledEvents={scheduledEvents}
          showScheduled={showScheduled}
          setShowScheduled={setShowScheduled}
          showRecurring={showRecurring}
          setShowRecurring={setShowRecurring}
          setShowCalendarPanel={setShowCalendarPanel}
          setPanelMode={setPanelMode}
          handlePrevMonth={handlePrevWeek}
          handleNextMonth={handleNextWeek}
          calendarMode={calendarMode}
          calendarThemeKey={activeThemeKey}
          clearSchedulerForm={clearSchedulerForm as () => void}
        />

        {!showCalendarPanel && (
          <div
            className={`mb-3 rounded-[1.75rem] border p-4 lg:hidden ${theme.mobileHeader}`}
          >
            <div className="flex items-end justify-between gap-3">
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.eyebrow}`}
                >
                  {t.weekView}
                </p>

                <h2
                  className={`mt-1 text-3xl font-black leading-none ${theme.title}`}
                >
                  {format(currentWeek, "MMMM", { locale: dateLocale })}
                </h2>

                <p className={`mt-1 text-sm font-semibold ${theme.muted}`}>
                  {t.weekOf} {format(start, "MMM d", { locale: dateLocale })} ·{" "}
                  {format(currentWeek, "yyyy")}
                </p>
              </div>

              <div
                className={`rounded-2xl border px-3 py-2 text-center shadow-sm ${theme.todayCard}`}
              >
                <p className={`text-xl font-black ${theme.todayText}`}>
                  {format(new Date(), "d")}
                </p>

                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.18em] ${theme.eyebrow}`}
                >
                  {t.today}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-3 hidden items-center justify-between lg:flex">
          <div className="mx-auto rounded-2xl border border-white/60 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-sm">
            <div
              className={`text-2xl font-semibold tracking-tight ${theme.title}`}
            >
              {t.weekOf} {format(start, "MMM d", { locale: dateLocale })}
            </div>
          </div>
        </div>

        <div
          className={`mb-1 hidden grid-cols-7 gap-2 px-1 text-center text-[11px] uppercase tracking-[0.22em] sm:grid ${theme.weekday}`}
        >
          {t.weekdaysShort.map((d, index) => (
            <div
              key={`${d}-${index}`}
              className={`rounded-xl border py-2 font-black backdrop-blur-sm ${theme.weekdayCell}`}
            >
              {d}
            </div>
          ))}
        </div>

        {!showCalendarPanel && (
          <div
            className={`mb-3 grid grid-cols-7 gap-1 rounded-3xl border p-2 sm:hidden ${theme.mobileGrid}`}
          >
            {days?.map((day, index) => {
              const today = isToday(day);
              const dayEvents = getEventsForDay(day);
              const isPastDay = isPastCalendarDay(day);

              return (
                <button
                  key={day.toString()}
                  type="button"
                  onClick={() => {
                    const target = document.getElementById(
                      `mobile-week-day-${format(day, "yyyy-MM-dd")}`
                    );
                    target?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`relative flex aspect-square min-h-11 flex-col items-center justify-center rounded-xl border text-center transition active:scale-[0.97] ${
                    today
                      ? theme.mobileActiveDayButton
                      : isPastDay
                      ? "border-slate-200 bg-slate-100/80 text-slate-400 opacity-70 grayscale"
                      : dayEvents.length > 0
                      ? theme.mobileEventDayButton
                      : theme.mobileDayButton
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
                    {t.weekdaysTiny[index]}
                  </span>

                  <span className="mt-0.5 text-xs font-black leading-none">
                    {format(day, "d")}
                  </span>

                  {dayEvents.length > 0 && (
                    <span
                      className={`my-1 h-1.5 w-1.5 rounded-full ${
                        today
                          ? "bg-white"
                          : isPastDay
                          ? "bg-slate-400"
                          : theme.eventDot
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {!showCalendarPanel && (
          <div className="mb-0 hidden grid-cols-7 gap-2 py-2 sm:grid lg:min-h-[50vh]">
            {days.map((day) => {
              const dayEvents = getEventsForDay(day);
              const today = isToday(day);
              const isPastDay = isPastCalendarDay(day);

              return (
                <div
                  key={day.toString()}
                  className={`min-h-35 overflow-hidden rounded-2xl border p-2.5 transition-all duration-200 lg:overflow-y-auto ${
                    today
                      ? theme.dayCell
                      : isPastDay
                      ? "border-slate-200 bg-slate-100/80 text-slate-400 opacity-70 grayscale"
                      : theme.dayCell
                  } ${
                    isPastDay
                      ? "hover:shadow-none"
                      : "hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  <div className="mb-1.5 flex justify-end">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition ${
                        today
                          ? theme.todayCircle
                          : isPastDay
                          ? "border border-slate-200 bg-white text-slate-400"
                          : theme.normalCircle
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {dayEvents
                      ?.slice(0, 2)
                      .map((ev: SchedulerForm) =>
                        renderEventButton({ ev, day, compact: true })
                      )}

                    {dayEvents.length > 2 && (
                      <button
                        type="button"
                        onClick={(clickEvent) => {
                          const ev = dayEvents[2] as SchedulerForm;
                          handleCalendarEventClick(clickEvent, {
                            ...ev,
                            occurrenceDate: getOccurrenceDateKey(day),
                          } as SchedulerForm);
                        }}
                        className={`w-full rounded-lg border px-1 py-1 text-center text-xs font-black shadow-sm ${
                          isPastDay
                            ? "border-slate-200 bg-white/70 text-slate-400"
                            : "border-slate-200 bg-white/70 text-slate-500"
                        }`}
                      >
                        +{dayEvents.length - 2}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!showCalendarPanel && (
          <div className="mt-3 space-y-3 sm:hidden">
            {weekDaysWithEvents.length > 0 ? (
              weekDaysWithEvents.map(({ day, events: dayEvents }) => {
                const isPastDay = isPastCalendarDay(day);

                return (
                  <div
                    key={day.toString()}
                    id={`mobile-week-day-${format(day, "yyyy-MM-dd")}`}
                    className={`scroll-mt-4 rounded-3xl border p-3 transition-all duration-200 ${
                      isPastDay
                        ? "border-slate-200 bg-slate-100/80 opacity-75 grayscale"
                        : theme.mobileDaySection
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p
                          className={`text-xs font-bold uppercase tracking-[0.2em] ${
                            isPastDay ? "text-slate-400" : "text-slate-400"
                          }`}
                        >
                          {format(day, "EEEE", { locale: dateLocale })}
                        </p>

                        <h3
                          className={`text-lg font-black ${
                            isPastDay ? "text-slate-500" : theme.title
                          }`}
                        >
                          {format(day, "MMM d", { locale: dateLocale })}
                        </h3>
                      </div>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black ${
                          isToday(day)
                            ? theme.todayCircle
                            : isPastDay
                            ? "border border-slate-200 bg-white text-slate-400"
                            : theme.mobileDateBadge
                        }`}
                      >
                        {format(day, "d")}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {dayEvents.map((ev: SchedulerForm) =>
                        renderEventButton({ ev, day })
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className={`rounded-3xl border border-dashed p-6 text-center shadow-sm ${theme.emptyState}`}
              >
                <p className={`text-sm font-black ${theme.title}`}>
                  {t.noVisibleEvents}
                </p>
                <p className={`mt-1 text-xs font-medium ${theme.muted}`}>
                  {t.emptyHint}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="hidden lg:block">
          <CalendarPanel
            mode={panelMode}
            showCalendarPanel={showCalendarPanel}
            setShowCalendarPanel={setShowCalendarPanel}
            recurringEvents={recurringEvents}
            scheduledEvents={scheduledEvents}
            visibleRecurringIds={visibleRecurringIds}
            setVisibleRecurringIds={setVisibleRecurringIds}
            visibleScheduledIds={visibleScheduledIds}
            setVisibleScheduledIds={setVisibleScheduledIds}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            allMonthsSelected={allMonthsSelected}
            allDaysSelected={allDaysSelected}
          />
        </div>

        {showCalendarPanel && (
          <div className="absolute inset-0 top-0 z-99999 flex h-full max-h-vh items-stretch justify-center overflow-hidden bg-slate-950/60 p-0 backdrop-blur-md lg:hidden">
            <div className="flex h-full max-h-vh w-full flex-col-reverse justify-start overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
              <div className="min-h-0 h-full max-h-vh flex-1 overflow-y-auto px-3 py-3">
                <div className="min-h-full rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                  <CalendarPanel
                    mode={panelMode}
                    showCalendarPanel={showCalendarPanel}
                    setShowCalendarPanel={setShowCalendarPanel}
                    recurringEvents={recurringEvents}
                    scheduledEvents={scheduledEvents}
                    visibleRecurringIds={visibleRecurringIds}
                    setVisibleRecurringIds={setVisibleRecurringIds}
                    visibleScheduledIds={visibleScheduledIds}
                    setVisibleScheduledIds={setVisibleScheduledIds}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    allMonthsSelected={allMonthsSelected}
                    allDaysSelected={allDaysSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {attendanceEvent && (
        <EventAttendanceDropdown
          anchorRect={attendanceAnchor}
          event={attendanceEvent}
          onConfirm={(event, status) => handleConfirmAttendance(event, status)}
          onClose={() => {
            if (!confirmingAttendance) {
              setAttendanceEvent(null);
              setAttendanceAnchor(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default WeekView;
