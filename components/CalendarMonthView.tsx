"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isToday,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { enUS, es } from "date-fns/locale";
import Swal from "sweetalert2";

import { supabase } from "../lib/supabase/supabaseClient";
import {
  getEventColorClasses,
  getEventTimeLabel,
  occursOnDate,
  calendarThemes,
} from "../helpers/calendar";
import { useLanguage } from "../context/language";

import { FiRepeat, FiChevronDown, FiExternalLink } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { IoColorPaletteOutline } from "react-icons/io5";

import CalendarToolbar from "./CalendarToolbar";
import CalendarPanel from "./CalendarPanel";
import EventAttendanceDropdown from "./EventAttendanceDropdown";
import { SchedulerForm } from "../lib/interfaces/events";
import {
  CalendarThemeKey,
  getAttendanceKey,
  getEventIconStyle,
  getExcludedDates,
  getNextUpcomingRecurringOccurrenceDate,
  getOccurrenceDateKey,
  getScheduledOccurrenceDate,
  isOccurrenceExcluded,
} from "../helpers/calendarMonth";

const MonthView = ({
  events,
  calendarMode,
  onEventClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOpenScheduleForm,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOpenRecurringForm,
  clearSchedulerForm,
  setMonthSelected,
  setYearSelected,
  attendanceAnchor,
  attendanceEvent,
  setAttendanceEvent,
  calendarThemeKey,
  setCalendarThemeKey,
  setSelectedCalendarDate,
  allMonthsSelected,
  allDaysSelected,
  onRangeSelect,
}: {
  events: SchedulerForm[];
  calendarMode: "admin" | "member";
  onEventClick: (params: {
    clickEvent: React.MouseEvent;
    event: SchedulerForm;
  }) => void;
  onOpenScheduleForm: () => void;
  onOpenRecurringForm: () => void;
  clearSchedulerForm: () => void;
  setMonthSelected: (monthIndex: number) => void;
  setYearSelected: (year: number) => void;
  attendanceAnchor: DOMRect | null;
  attendanceEvent: SchedulerForm | null;
  setAttendanceEvent: (event: SchedulerForm | null) => void;
  calendarThemeKey: CalendarThemeKey;
  setCalendarThemeKey: (key: CalendarThemeKey) => void;
  setSelectedCalendarDate: (date: string) => void;
  allMonthsSelected?: boolean;
  allDaysSelected?: boolean;
  onRangeSelect?: (start: Date, end: Date) => void;
}) => {
  const router = useRouter();
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";
  const dateLocale = isSpanish ? es : enUS;

  const t = {
    calendarTheme: isSpanish ? "Tema del Calendario" : "Calendar Theme",
    calendar: isSpanish ? "Calendario" : "Calendar",
    today: isSpanish ? "Hoy" : "Today",
    recurring: isSpanish ? "Recurrente" : "Recurring",
    scheduled: isSpanish ? "Programado" : "Scheduled",
    canceled: isSpanish ? "Cancelado" : "Canceled",
    excluded: isSpanish ? "Fecha excluida" : "Excluded date",
    subscribed: isSpanish ? "inscritos" : "subscribed",
    confirmed: isSpanish ? "Confirmado" : "Confirmed",
    noVisibleEvents: isSpanish
      ? "No hay eventos visibles este mes"
      : "No visible events this month",
    emptyHint: isSpanish
      ? "Intenta activar eventos programados o recurrentes desde la barra de herramientas."
      : "Try enabling scheduled or recurring events from the toolbar.",
    signInRequiredTitle: isSpanish
      ? "Inicio de sesión requerido"
      : "Sign in required",
    signInRequiredText: isSpanish
      ? "Por favor inicia sesión para confirmar tu asistencia."
      : "Please sign in to confirm attendance.",
    attendee: isSpanish ? "Asistente" : "Attendee",
    missingOccurrenceTitle: isSpanish
      ? "Falta la fecha de ocurrencia"
      : "Missing occurrence date",
    missingOccurrenceText: isSpanish
      ? "Este evento necesita una fecha válida antes de poder confirmar asistencia."
      : "This event needs a valid date before attendance can be confirmed.",
    unableConfirm: isSpanish
      ? "No se pudo confirmar la asistencia."
      : "Unable to confirm attendance.",
    attendanceUpdated: isSpanish
      ? "Asistencia actualizada"
      : "Attendance updated",
    markedAttending: isSpanish
      ? "Has sido marcado como asistiendo a"
      : "You have been marked as attending",
    declined: isSpanish ? "Has rechazado" : "You have declined",
    responseSaved: isSpanish
      ? "Tu respuesta fue guardada para"
      : "Your response for",
    wasSaved: isSpanish ? "." : "was saved.",
    unableConfirmTitle: isSpanish
      ? "No se pudo confirmar la asistencia"
      : "Unable to confirm attendance",
    confirmErrorFallback: isSpanish
      ? "Algo salió mal al confirmar tu asistencia."
      : "Something went wrong while confirming your attendance.",
    attendanceOpensTitle: isSpanish
      ? "La asistencia abre para la próxima ocurrencia"
      : "Attendance opens for the upcoming occurrence",
    attendanceOpensText: isSpanish
      ? "Solo puedes confirmar asistencia para la próxima fecha de este evento recurrente."
      : "You can only confirm attendance for the next upcoming date of this recurring event.",
    canceledOccurrenceTitle: isSpanish
      ? "Fecha cancelada"
      : "Canceled occurrence",
    canceledOccurrenceText: isSpanish
      ? "Esta fecha fue excluida de la secuencia recurrente."
      : "This date was excluded from the recurring sequence.",
    uncancelOccurrenceTitle: isSpanish
      ? "¿Restaurar esta fecha?"
      : "Restore this occurrence?",
    uncancelOccurrenceText: isSpanish
      ? "Esta fecha volverá a aparecer como parte activa de la secuencia recurrente."
      : "This date will become an active part of the recurring sequence again.",
    uncancelOccurrenceConfirm: isSpanish
      ? "Sí, restaurar fecha"
      : "Yes, restore occurrence",
    keepCanceled: isSpanish ? "Mantener cancelada" : "Keep canceled",
    occurrenceRestoredTitle: isSpanish
      ? "Fecha restaurada"
      : "Occurrence restored",
    occurrenceRestoredText: isSpanish
      ? "La fecha seleccionada fue removida de las fechas excluidas."
      : "The selected date was removed from the excluded dates.",
    unableRestoreOccurrenceTitle: isSpanish
      ? "No se pudo restaurar la fecha"
      : "Unable to restore occurrence",
    unableRestoreOccurrenceText: isSpanish
      ? "Algo salió mal al restaurar esta fecha."
      : "Something went wrong while restoring this occurrence.",
    weekdaysShort: isSpanish
      ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekdaysTiny: isSpanish
      ? ["D", "L", "M", "M", "J", "V", "S"]
      : ["S", "M", "T", "W", "T", "F", "S"],
    confirmAttendance: isSpanish
      ? "Confirmar asistencia"
      : "Confirm attendance",
    cancelAttendance: isSpanish ? "Cancelar asistencia" : "Cancel attendance",
    savingAttendance: isSpanish ? "Guardando..." : "Saving...",
  };

  const getLocalizedEventName = (event?: SchedulerForm | null) => {
    if (!event) return "";
    if (isSpanish) return event.name_es || event.name_en || "";
    return event.name_en || event.name_es || "";
  };

  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showScheduled, setShowScheduled] = useState(true);
  const [showRecurring, setShowRecurring] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmingAttendance, setConfirmingAttendance] = useState(false);
  const [panelMode, setPanelMode] = useState<"Recurring" | "Scheduled">(
    "Recurring"
  );

  const [attendanceCounts, setAttendanceCounts] = useState<
    Record<string, number>
  >({});

  const [attendanceResponses, setAttendanceResponses] = useState<
    Record<string, { confirmed: boolean; status?: string | null }>
  >({});

  const theme = calendarThemes[calendarThemeKey];

  const recurringEvents = events?.filter(
    (e) => e?.scheduleType === "recurrent"
  );

  const scheduledEvents = events?.filter(
    (e) => e?.scheduleType !== "recurrent"
  );

  const [visibleRecurringIds, setVisibleRecurringIds] = useState<string[]>(
    recurringEvents?.map((e) => e?.id) || []
  );

  const [visibleScheduledIds, setVisibleScheduledIds] = useState<string[]>(
    scheduledEvents?.map((e) => e?.id) || []
  );

  // const [statusFilter, setStatusFilter] = useState({
  //   published: true,
  //   scheduled: true,
  //   active: true,
  // });

  const [showCalendarPanel, setShowCalendarPanel] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [locallyRestoredOccurrenceKeys, setLocallyRestoredOccurrenceKeys] =
    useState<string[]>([]);

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
      setCalendarThemeKey(savedTheme as CalendarThemeKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sessionStorage?.setItem("calendarTheme", calendarThemeKey);
  }, [calendarThemeKey]);

  useEffect(() => {
    const recurringEvents = events?.filter(
      (e) => e.scheduleType === "recurrent"
    );
    const scheduledEvents = events?.filter(
      (e) => e.scheduleType !== "recurrent"
    );

    setVisibleRecurringIds(recurringEvents?.map((e) => e.id) || []);
    setVisibleScheduledIds(scheduledEvents?.map((e) => e.id) || []);
  }, [events]);

  const handleRangeMouseDown = (date: Date) => setRangeStart(date);

  const handleRangeMouseUp = (date: Date) => {
    if (rangeStart && onRangeSelect) {
      onRangeSelect(
        rangeStart < date ? rangeStart : date,
        rangeStart < date ? date : rangeStart
      );
      setRangeStart(null);
    }
  };

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

  const getOccurrenceRestoreKey = (
    eventId?: string,
    occurrenceDate?: string | null
  ) => `${eventId || "unknown"}::${occurrenceDate || "no-date"}`;

  const isOccurrenceCanceledForView = (event: SchedulerForm, date: Date) => {
    const occurrenceDate = getOccurrenceDateKey(date);
    const restoreKey = getOccurrenceRestoreKey(event?.id, occurrenceDate);

    return (
      isOccurrenceExcluded(event, date) &&
      !locallyRestoredOccurrenceKeys.includes(restoreKey)
    );
  };

  const handleUncancelOccurrence = async (
    event: SchedulerForm,
    occurrenceDate: string
  ) => {
    if (!event?.id || !occurrenceDate || calendarMode === "member") return;

    const result = await Swal.fire({
      icon: "question",
      title: t.uncancelOccurrenceTitle,
      text: `${t.uncancelOccurrenceText} (${occurrenceDate})`,
      showCancelButton: true,
      confirmButtonText: t.uncancelOccurrenceConfirm,
      cancelButtonText: t.keepCanceled,
      reverseButtons: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    try {
      const currentExcludedDates = getExcludedDates(event);

      const nextExcludedDates = currentExcludedDates.filter(
        (date) => date !== occurrenceDate
      );

      const { error } = await supabase
        .from("events")
        .update({
          recurrence_excluded_dates: nextExcludedDates,
        })
        .eq("id", event.id);

      if (error) throw error;

      const restoreKey = getOccurrenceRestoreKey(event.id, occurrenceDate);

      setLocallyRestoredOccurrenceKeys((prev) =>
        Array.from(new Set([...prev, restoreKey]))
      );

      await Swal.fire({
        icon: "success",
        title: t.occurrenceRestoredTitle,
        text: t.occurrenceRestoredText,
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error: unknown) {
      console.error("Restore canceled occurrence error:", error);

      await Swal.fire({
        icon: "error",
        title: t.unableRestoreOccurrenceTitle,
        text:
          (error instanceof Error ? error.message : "") ||
          t.unableRestoreOccurrenceText,
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
        .select("id, first_name, last_name, email, phone, language_preference")
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

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
    setMonthSelected((currentMonth.getMonth() - 1 + 12) % 12);
    if (currentMonth.getMonth() === 0)
      setYearSelected(currentMonth.getFullYear() - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
    setMonthSelected((currentMonth.getMonth() + 1) % 12);
    if (currentMonth.getMonth() === 11)
      setYearSelected(currentMonth.getFullYear() + 1);
  };

  const handleToday = () => setCurrentMonth(new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),
  });

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

            return dayEvents.map((event) => {
              const isRecurring = event?.scheduleType === "recurrent";
              const isCanceledOccurrence = isOccurrenceCanceledForView(
                event,
                day
              );

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
    events,
    currentMonth,
    visibleRecurringIds,
    visibleScheduledIds,
    showRecurring,
    showScheduled,
  ]);

  const mobileDaysWithEvents = days
    .filter((day) => isSameMonth(day, currentMonth))
    .map((day) => ({
      day,
      events: getEventsForDay(day),
    }))
    .filter((item) => item.events.length > 0);

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

  // Month View

  return (
    <div
      className={`flex flex-col gap-3 p-2 transition-all duration-300 sm:p-4 lg:flex-row ${theme.shell}`}
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
            {format(currentMonth, "MMMM", { locale: dateLocale })}
          </div>

          <div className={`mb-2 mt-2 text-center font-semibold ${theme.muted}`}>
            <span
              className="block leading-none"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
            >
              {format(currentMonth, "yyyy")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {calendarMode !== "member" && (
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
              {(Object.keys(calendarThemes) as CalendarThemeKey[]).map(
                (key) => {
                  const item = calendarThemes[key];
                  const isActive = calendarThemeKey === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setCalendarThemeKey(key);
                        setShowThemeOptions(false);
                      }}
                      className={`group flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 cursor-pointer ${
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
                }
              )}
            </div>
          </div>
        )}

        <CalendarToolbar
          handleToday={handleToday}
          setPanelMode={setPanelMode}
          recurringEvents={recurringEvents}
          scheduledEvents={scheduledEvents}
          showScheduled={showScheduled}
          setShowScheduled={setShowScheduled}
          showRecurring={showRecurring}
          setShowRecurring={setShowRecurring}
          clearSchedulerForm={clearSchedulerForm}
          setShowCalendarPanel={setShowCalendarPanel}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          calendarMode={calendarMode}
          calendarThemeKey={calendarThemeKey}
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
                  {t.calendar}
                </p>

                <h2
                  className={`mt-1 text-3xl font-black leading-none ${theme.title}`}
                >
                  {format(currentMonth, "MMMM", { locale: dateLocale })}
                </h2>

                <p className={`mt-1 text-sm font-semibold ${theme.muted}`}>
                  {format(currentMonth, "yyyy")}
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

        <div className="hidden lg:block">
          <div
            className={`mb-2 grid grid-cols-7 px-1 text-center text-[11px] uppercase tracking-[0.22em] ${theme.weekday}`}
          >
            {t.weekdaysShort.map((d) => (
              <div
                key={d}
                className={`rounded-xl border py-2 backdrop-blur-sm ${theme.weekdayCell}`}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 py-2">
            {days?.map((day) => {
              const isCurrentDay = isToday(day);
              const dayEvents = getEventsForDay(day);

              const isPastDay = isPastCalendarDay(day);

              return (
                <div
                  key={day.toString()}
                  onMouseDown={() => handleRangeMouseDown(day)}
                  onMouseUp={() => handleRangeMouseUp(day)}
                  className={`h-32 overflow-y-auto rounded-2xl border border-slate-200 p-2.5 transition-all duration-200 ${
                    !isSameMonth(day, currentMonth)
                      ? theme.mutedDayCell
                      : isPastDay
                      ? "bg-slate-100/80 text-slate-400 opacity-70 grayscale"
                      : theme.dayCell
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div
                      className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-black uppercase tracking-[0.08em] transition-all duration-200 ${
                        dayEvents.length > 0
                          ? `${theme?.eventCountBadge} border border-white/60 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md`
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {dayEvents?.length > 0 && (
                        <>
                          <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-slate-900 px-1 text-[9px] font-black leading-none text-white shadow-sm">
                            {dayEvents?.length}
                          </span>

                          <span className="text-[9px] font-black text-slate-500">
                            {dayEvents?.length === 1 ? "Event" : "Events"}
                          </span>
                        </>
                      )}
                    </div>

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                        isCurrentDay ? theme.todayCircle : theme.normalCircle
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                  </div>

                  {dayEvents?.map((ev) => {
                    const occurrenceDate = getOccurrenceDateKey(day);
                    const isRecurring = ev?.scheduleType === "recurrent";
                    const isCanceledOccurrence = isOccurrenceCanceledForView(
                      ev,
                      day
                    );

                    const nextRecurringDate = isRecurring
                      ? getNextUpcomingRecurringOccurrenceDate(ev)
                      : null;

                    const isAllowedRecurringOccurrence =
                      !isRecurring ||
                      (!isCanceledOccurrence &&
                        nextRecurringDate === occurrenceDate);

                    const attendanceKey = getAttendanceKey(
                      ev.id,
                      occurrenceDate
                    );

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

                    const isPastOccurrence = isPastOccurrenceForCalendar(
                      day,
                      ev
                    );

                    return (
                      <button
                        key={ev.id + format(day, "yyyy-MM-dd")}
                        type="button"
                        style={
                          isCanceledOccurrence || isPastOccurrence
                            ? undefined
                            : colors.style
                        }
                        className={`relative mt-1.5 w-full overflow-hidden rounded-xl border px-2.5 py-2 text-left text-white transition-all duration-200 ${
                          isPastOccurrence
                            ? "cursor-default border-slate-300 bg-slate-400 opacity-60 grayscale hover:translate-y-0 hover:shadow-none"
                            : "cursor-pointer hover:-translate-y-0.5 hover:shadow-xl"
                        } ${
                          isCanceledOccurrence
                            ? "border-rose-200 bg-linear-to-r from-rose-500/80 to-slate-700/80 opacity-85"
                            : isPastOccurrence
                            ? ""
                            : hasCustomColor
                            ? "border-white/25"
                            : colors.pill
                        }`}
                        onClick={(clickEvent) => {
                          const isPastMemberEvent = isPastEventForMember(
                            day,
                            ev
                          );

                          setSelectedCalendarDate(format(day, "yyyy-MM-dd"));

                          if (calendarMode === "member" && isPastMemberEvent) {
                            return;
                          }

                          if (
                            calendarMode === "member" &&
                            isCanceledOccurrence
                          ) {
                            return;
                          }

                          if (isCanceledOccurrence) {
                            handleUncancelOccurrence(ev, occurrenceDate);
                            return;
                          }

                          if (
                            calendarMode === "member" &&
                            !isAllowedRecurringOccurrence
                          ) {
                            Swal.fire({
                              icon: "info",
                              title: t.attendanceOpensTitle,
                              text: t.attendanceOpensText,
                            });
                            return;
                          }

                          onEventClick({
                            clickEvent,
                            event: eventForClick,
                          });
                        }}
                      >
                        {isCanceledOccurrence && (
                          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_6px,transparent_6px,transparent_12px)]" />
                        )}

                        <div className="relative flex items-start gap-2">
                          <span
                            style={
                              isCanceledOccurrence
                                ? undefined
                                : getEventIconStyle(ev?.color)
                            }
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
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
                              className={`truncate text-[11px] font-black leading-tight text-white drop-shadow-sm ${
                                isCanceledOccurrence ? "line-through" : ""
                              }`}
                            >
                              {getLocalizedEventName(ev)}
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-white/90">
                              {isCanceledOccurrence ? (
                                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-white ring-1 ring-white/20">
                                  {t.canceled}
                                </span>
                              ) : (
                                <>
                                  <span className="inline-flex items-center gap-1">
                                    <FaRegClock className="text-[9px]" />
                                    {timeLabel}
                                  </span>

                                  <span className="inline-flex items-center gap-1">
                                    <HiUsers className="text-xs" />
                                    {participantCount}
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
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {!showCalendarPanel && (
          <div className="lg:hidden">
            <div className={`mb-3 rounded-3xl border p-2 ${theme.mobileGrid}`}>
              <div className="mb-1 grid grid-cols-7 gap-1 text-center">
                {t.weekdaysTiny.map((d, index) => (
                  <div
                    key={`${d}-${index}`}
                    className="py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days?.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentDay = isToday(day);
                  const isCurrentMonthDay = isSameMonth(day, currentMonth);
                  const hasCanceledEvent = dayEvents.some((event) =>
                    isOccurrenceCanceledForView(event, day)
                  );

                  return (
                    <button
                      key={day.toString()}
                      type="button"
                      onMouseDown={() => handleRangeMouseDown(day)}
                      onMouseUp={() => handleRangeMouseUp(day)}
                      onClick={() => {
                        const target = document.getElementById(
                          `mobile-day-${format(day, "yyyy-MM-dd")}`
                        );
                        target?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className={`relative flex aspect-square min-h-10.5 flex-col items-center justify-center rounded-xl border text-center transition active:scale-[0.97] ${
                        !isCurrentMonthDay
                          ? theme.mobileMutedDayButton
                          : isCurrentDay
                          ? theme.mobileActiveDayButton
                          : dayEvents.length > 0
                          ? hasCanceledEvent
                            ? "border-rose-200 bg-rose-50 text-rose-700"
                            : theme.mobileEventDayButton
                          : theme.mobileDayButton
                      }`}
                    >
                      <span className="text-[11px] font-black leading-none">
                        {format(day, "d")}
                      </span>

                      {dayEvents.length > 0 &&
                        (() => {
                          const firstEventWithColor = dayEvents.find(
                            (event) =>
                              !isOccurrenceCanceledForView(event, day) &&
                              getEventColorClasses(event)?.style
                          );

                          const customColor = firstEventWithColor?.color;

                          return (
                            <span
                              style={
                                hasCanceledEvent
                                  ? undefined
                                  : !isCurrentDay && customColor
                                  ? {
                                      background: `linear-gradient(135deg, ${customColor}, ${customColor}cc)`,
                                      boxShadow: `0 0 10px ${customColor}88`,
                                    }
                                  : undefined
                              }
                              className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                                hasCanceledEvent
                                  ? "bg-rose-500"
                                  : isCurrentDay
                                  ? "bg-white"
                                  : customColor
                                  ? ""
                                  : theme.eventDot
                              }`}
                            />
                          );
                        })()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              {mobileDaysWithEvents.length > 0 ? (
                mobileDaysWithEvents.map(({ day, events: dayEvents }) => {
                  const isPastDay = isPastCalendarDay(day);

                  return (
                    <div
                      key={day.toString()}
                      id={`mobile-day-${format(day, "yyyy-MM-dd")}`}
                      className={`scroll-mt-24 rounded-3xl border p-3 transition-all duration-200 ${
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
                        {dayEvents?.map((ev) => {
                          const occurrenceDate = getOccurrenceDateKey(day);
                          const isRecurring = ev?.scheduleType === "recurrent";
                          const isCanceledOccurrence =
                            isOccurrenceCanceledForView(ev, day);
                          const isPastOccurrence = isPastOccurrenceForCalendar(
                            day,
                            ev
                          );

                          const nextRecurringDate = isRecurring
                            ? getNextUpcomingRecurringOccurrenceDate(ev)
                            : null;

                          const isAllowedRecurringOccurrence =
                            !isRecurring ||
                            (!isCanceledOccurrence &&
                              nextRecurringDate === occurrenceDate);

                          const attendanceKey = getAttendanceKey(
                            ev.id,
                            occurrenceDate
                          );

                          const participantCount = isAllowedRecurringOccurrence
                            ? attendanceCounts[attendanceKey] || 0
                            : 0;

                          const userHasConfirmed =
                            isAllowedRecurringOccurrence &&
                            attendanceResponses[attendanceKey]?.confirmed ===
                              true;

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

                          const isPastMemberEvent = isPastEventForMember(
                            day,
                            ev
                          );

                          return (
                            <article
                              key={ev.id + format(day, "yyyy-MM-dd")}
                              style={
                                isCanceledOccurrence || isPastOccurrence
                                  ? undefined
                                  : colors.style
                              }
                              onClick={(clickEvent) => {
                                if (
                                  isPastOccurrence &&
                                  calendarMode === "member"
                                ) {
                                  return;
                                }

                                if (
                                  calendarMode !== "member" &&
                                  isCanceledOccurrence
                                ) {
                                  handleUncancelOccurrence(ev, occurrenceDate);
                                  return;
                                }

                                if (
                                  (calendarMode === "member" &&
                                    isPastMemberEvent) ||
                                  (calendarMode === "member" &&
                                    isCanceledOccurrence)
                                ) {
                                  return;
                                }

                                if (
                                  calendarMode === "member" &&
                                  !isAllowedRecurringOccurrence
                                ) {
                                  Swal.fire({
                                    icon: "info",
                                    title: t.attendanceOpensTitle,
                                    text: t.attendanceOpensText,
                                  });

                                  return;
                                }

                                onEventClick({
                                  clickEvent,
                                  event: eventForClick,
                                });
                              }}
                              className={`relative w-full overflow-hidden rounded-2xl border p-3 text-left text-white shadow-sm transition active:scale-[0.99] ${
                                isPastOccurrence
                                  ? "cursor-default border-slate-300 bg-slate-400 opacity-70 grayscale hover:translate-y-0 hover:shadow-sm"
                                  : "cursor-pointer hover:-translate-y-0.5 hover:shadow-xl"
                              } ${
                                isCanceledOccurrence
                                  ? "border-rose-200 bg-linear-to-r from-rose-500/85 to-slate-700/85 opacity-90"
                                  : isPastOccurrence
                                  ? ""
                                  : hasCustomColor
                                  ? "border-white/25"
                                  : colors.pill
                              }`}
                            >
                              {isCanceledOccurrence && (
                                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0px,rgba(255,255,255,0.16)_6px,transparent_6px,transparent_12px)]" />
                              )}

                              <div className="relative flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                                    isCanceledOccurrence
                                      ? "border-white/30 bg-white/20 text-white"
                                      : isPastOccurrence
                                      ? "border-white/30 bg-white/20 text-white"
                                      : hasCustomColor
                                      ? "border-white/30 bg-white/20 text-white shadow-sm backdrop-blur"
                                      : colors.icon
                                  }`}
                                >
                                  {isRecurring ? <FiRepeat /> : <FaRegClock />}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`flex align-middle line-clamp-2 truncate text-sm font-black text-white drop-shadow-sm ${
                                      isCanceledOccurrence ? "line-through" : ""
                                    }`}
                                  >
                                    {getLocalizedEventName(ev)}

                                    {!isPastOccurrence && (
                                      <span
                                        className="ml-2 mt-[0.8px] inline text-xs text-white/70"
                                        onClick={(redirectEvent) => {
                                          redirectEvent.stopPropagation();
                                          router.push(
                                            `/check-in/${ev.id}?occurenceDate=${occurrenceDate}`
                                          );
                                        }}
                                      >
                                        <FiExternalLink className="my-auto" />
                                      </span>
                                    )}
                                  </p>

                                  <div className="mt-2 flex flex-wrap items-center gap-2">
                                    {isCanceledOccurrence ? (
                                      <>
                                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/25">
                                          {t.canceled}
                                        </span>

                                        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white ring-1 ring-white/15">
                                          {t.excluded}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span
                                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                                            isPastOccurrence
                                              ? "bg-white/20 text-white ring-1 ring-white/25"
                                              : hasCustomColor
                                              ? "bg-white/20 text-white ring-1 ring-white/25"
                                              : colors.badge
                                          }`}
                                        >
                                          {isRecurring
                                            ? t.recurring
                                            : t.scheduled}
                                        </span>

                                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white ring-1 ring-white/15">
                                          <FaRegClock className="text-[10px]" />
                                          {timeLabel}
                                        </span>

                                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white ring-1 ring-white/15">
                                          <HiUsers className="text-sm" />
                                          {participantCount} {t.subscribed}
                                        </span>

                                        {userHasConfirmed && (
                                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-white ring-1 ring-white/20">
                                            {t.confirmed}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </div>

                                  {calendarMode === "member" &&
                                    !isCanceledOccurrence &&
                                    !isPastMemberEvent &&
                                    !isPastOccurrence &&
                                    isAllowedRecurringOccurrence && (
                                      <div className="mt-3">
                                        <button
                                          type="button"
                                          disabled={confirmingAttendance}
                                          onClick={(actionEvent) => {
                                            actionEvent.stopPropagation();
                                            handleConfirmAttendance(
                                              eventForClick,
                                              userHasConfirmed
                                                ? "declined"
                                                : "accepted"
                                            );
                                          }}
                                          className={`w-full rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                            userHasConfirmed
                                              ? "border-red-300 bg-red-400/50 text-white backdrop-blur hover:bg-white/25"
                                              : "border-green-300 bg-green-400/50 text-white hover:bg-white/90"
                                          }`}
                                        >
                                          {confirmingAttendance
                                            ? t.savingAttendance
                                            : userHasConfirmed
                                            ? t.cancelAttendance
                                            : t.confirmAttendance}
                                        </button>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </article>
                          );
                        })}
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
          <div className="max-h-vh h-full absolute top-0 inset-0 z-99999 flex items-stretch justify-center overflow-hidden bg-slate-950/60 p-0 backdrop-blur-md lg:hidden">
            <div className="flex w-full max-h-vh h-full flex-col-reverse justify-start overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
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
            if (!confirmingAttendance) setAttendanceEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default MonthView;
