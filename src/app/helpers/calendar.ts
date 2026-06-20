import { MutableRefObject, useEffect, useState, useCallback } from "react";
import { SchedulerForm } from "../lib/interfaces/events";
import { format, getDate, getDay, getMonth, isBefore } from "date-fns";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const monthsWithIds = [
  { num: 1, name: "Jan" },
  { num: 2, name: "Feb" },
  { num: 3, name: "Mar" },
  { num: 4, name: "Apr" },
  { num: 5, name: "May" },
  { num: 6, name: "Jun" },
  { num: 7, name: "Jul" },
  { num: 8, name: "Aug" },
  { num: 9, name: "Sep" },
  { num: 10, name: "Oct" },
  { num: 11, name: "Nov" },
  { num: 12, name: "Dec" },
];

export const weekdayMap = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export const monthMap = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

///////////////////////////////////////////////////////////////////////////
export const pad2 = (value: number) => String(value).padStart(2, "0");

export const toDateOnlyString = (date: Date) => {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate()
  )}`;
};

export const getMonthIndexesFromCsv = (monthsCsv?: string | null) => {
  if (!monthsCsv) return [];

  return monthsCsv
    .split(",")
    .map((m) => m.trim().toLowerCase())
    .map((m) => {
      const found = monthsWithIds.find((x) => x.name.toLowerCase() === m);
      return found ? Number(found.num) - 1 : null;
    })
    .filter((v): v is number => v !== null);
};

export const WEEKDAY_ALIASES: Record<string, number> = {
  sun: 0,
  sunday: 0,
  mon: 1,
  monday: 1,
  tue: 2,
  tues: 2,
  tuesday: 2,
  wed: 3,
  wednesday: 3,
  thu: 4,
  thur: 4,
  thurs: 4,
  thursday: 4,
  fri: 5,
  friday: 5,
  sat: 6,
  saturday: 6,
};

export const getWeekdayIndexesFromCsv = (daysCsv?: string | null) => {
  if (!daysCsv) return [];

  return daysCsv
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .map((d) => WEEKDAY_ALIASES[d])
    .filter((v): v is number => Number.isInteger(v));
};

export const hasCompleteRecurringSettings = (form: SchedulerForm) => {
  const recurrence = String(form?.recurrence || "").toLowerCase();

  if (!form?.time) return false;
  if (!recurrence) return false;

  if (recurrence === "weekly") {
    return getWeekdayIndexesFromCsv(form?.daysOfWeekCsv).length > 0;
  }

  if (recurrence === "monthly") {
    const dayOfMonth = Number(form?.dayOfMonth);
    const selectedMonths = getMonthIndexesFromCsv(form?.monthsCsv);

    return (
      Number.isInteger(dayOfMonth) &&
      dayOfMonth >= 1 &&
      dayOfMonth <= 31 &&
      selectedMonths.length > 0
    );
  }

  if (recurrence === "yearly") {
    const dayOfMonth = Number(form?.dayOfMonth);
    const month = Number(form?.month);

    return (
      Number.isInteger(dayOfMonth) &&
      dayOfMonth >= 1 &&
      dayOfMonth <= 31 &&
      Number.isInteger(month) &&
      month >= 1 &&
      month <= 12
    );
  }

  return false;
};

export const getNextRecurringDate = (form: SchedulerForm) => {
  if (!hasCompleteRecurringSettings(form)) return "";

  const now = new Date();
  const [hours = 0, minutes = 0] = (form?.time || "00:00")
    .split(":")
    .map((v) => Number(v || 0));

  const recurrence = String(form?.recurrence || "").toLowerCase();

  if (recurrence === "weekly") {
    const selectedDays = [
      ...new Set(getWeekdayIndexesFromCsv(form?.daysOfWeekCsv)),
    ];

    let bestCandidate: Date | null = null;

    for (const weekday of selectedDays) {
      const candidate = new Date(now);
      candidate.setHours(hours, minutes, 0, 0);

      const currentWeekday = candidate.getDay();
      let daysToAdd = weekday - currentWeekday;

      if (daysToAdd < 0) daysToAdd += 7;

      candidate.setDate(candidate.getDate() + daysToAdd);

      if (daysToAdd === 0 && candidate < now) {
        candidate.setDate(candidate.getDate() + 7);
      }

      if (!bestCandidate || candidate.getTime() < bestCandidate.getTime()) {
        bestCandidate = candidate;
      }
    }

    return bestCandidate ? toDateOnlyString(bestCandidate) : "";
  }

  if (recurrence === "monthly") {
    const dayOfMonth = Number(form?.dayOfMonth);
    const allowedMonths = getMonthIndexesFromCsv(form?.monthsCsv);

    let bestCandidate: Date | null = null;

    for (let yearOffset = 0; yearOffset <= 2; yearOffset++) {
      const year = now.getFullYear() + yearOffset;

      for (const monthIndex of allowedMonths) {
        const lastDay = new Date(year, monthIndex + 1, 0).getDate();
        const safeDay = Math.min(dayOfMonth, lastDay);

        const candidate = new Date(
          year,
          monthIndex,
          safeDay,
          hours,
          minutes,
          0,
          0
        );

        if (candidate >= now && (!bestCandidate || candidate < bestCandidate)) {
          bestCandidate = candidate;
        }
      }
    }

    return bestCandidate ? toDateOnlyString(bestCandidate) : "";
  }

  if (recurrence === "yearly") {
    const dayOfMonth = Number(form?.dayOfMonth);
    const chosenMonthIndex = Number(form?.month) - 1;

    for (let yearOffset = 0; yearOffset <= 5; yearOffset++) {
      const year = now.getFullYear() + yearOffset;
      const lastDay = new Date(year, chosenMonthIndex + 1, 0).getDate();
      const safeDay = Math.min(dayOfMonth, lastDay);

      const candidate = new Date(
        year,
        chosenMonthIndex,
        safeDay,
        hours,
        minutes,
        0,
        0
      );

      if (candidate >= now) {
        return toDateOnlyString(candidate);
      }
    }
  }

  return "";
};

export function useDrag(formRef: MutableRefObject<HTMLDivElement | null>) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const isInteractiveElement = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;

    return !!target.closest(
      [
        "input",
        "textarea",
        "select",
        "button",
        "a",
        "[contenteditable='true']",
        "[role='textbox']",
        ".ProseMirror",
        "[data-no-drag]",
      ].join(",")
    );
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!formRef?.current) return;

      if (isInteractiveElement(e.target)) return;

      const rect = formRef.current.getBoundingClientRect();

      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setIsDragging(true);
    },
    [formRef]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !formRef.current) return;

      formRef.current.style.left = `${e.clientX - offset.x}px`;
      formRef.current.style.top = `${e.clientY - offset.y}px`;
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset, formRef]);

  return { handleMouseDown, isDragging };
}

/**
 * Custom hook: clicks outside detection for closing floating forms
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

///////////////////////////////////////////////////////////////////////

export const normalizeDate = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const formatTimeOnlyString = (time: string) => {
  if (!time) return "Time TBA";

  const [hourValue, minuteValue] = time.split(":");
  const hour = Number(hourValue);
  const minute = Number(minuteValue || 0);

  if (Number.isNaN(hour) || Number.isNaN(minute)) return time;

  const date = new Date();
  date.setHours(hour, minute, 0, 0);

  return format(date, "h:mm a");
};

export const getEventTimeLabel = (ev: SchedulerForm) => {
  if (ev?.time) return formatTimeOnlyString(ev.time);

  const dateValue =
    ev?.start ||
    ev?.date ||
    // ||
    // ev?.startDate ||
    // ev?.startDateTime ||
    // ev?.eventDate ||
    null;

  if (!dateValue) return "Time TBA";

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) return "Time TBA";

  return format(parsedDate, "h:mm a");
};

export const getEventParticipantCount = (
  ev: { [key: string]: unknown },
  attendanceCounts: Record<string, number>
) => {
  if (!ev?.id) return 0;
  return attendanceCounts?.[Number(ev.id)] || 0;
};

export const occursOnDate = (ev: SchedulerForm, date: Date) => {
  if (ev.scheduleType !== "recurrent") return false;

  const normalizedStatus = String(ev.status || "").toLowerCase();
  if (
    normalizedStatus &&
    normalizedStatus !== "published" &&
    normalizedStatus !== "scheduled" &&
    normalizedStatus !== "active"
  ) {
    return false;
  }

  const start = new Date(ev.start as string);
  if (isBefore(normalizeDate(date), normalizeDate(start))) return false;

  const freq = String(ev.recurrence || "").toLowerCase();

  const parseMonthsCsv = (csv: string | null) => {
    if (!csv) return [];
    return csv
      .split(",")
      .map((m) => m.trim().toLowerCase())
      .map((m) => monthMap[m as keyof typeof monthMap])
      .filter((m) => m !== undefined);
  };

  switch (freq) {
    case "daily":
      return true;

    case "weekly": {
      let daysOfWeek: number[] = [];

      if (ev.daysOfWeekCsv && String(ev.daysOfWeekCsv).trim().length > 0) {
        daysOfWeek = String(ev.daysOfWeekCsv)
          .split(",")
          .map(
            (d: string) =>
              weekdayMap[d.trim().toLowerCase() as keyof typeof weekdayMap]
          )
          .filter((d: number) => d !== undefined);
      } else {
        daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
      }

      return daysOfWeek.includes(getDay(date));
    }

    case "monthly":
    case "selectedmonths": {
      if (ev.dayOfMonth && Number(ev.dayOfMonth) > 0) {
        if (getDate(date) !== Number(ev.dayOfMonth)) return false;
      }

      const allowedMonths = parseMonthsCsv(ev.monthsCsv as string | null);

      return allowedMonths.length > 0
        ? allowedMonths.includes(getMonth(date))
        : true;
    }

    case "yearly": {
      if (!ev.dayOfMonth || ev.dayOfMonth === 0) return false;

      const allowedMonths = parseMonthsCsv(ev.monthsCsv as string);

      if (allowedMonths.length > 0) {
        if (!allowedMonths.includes(getMonth(date))) return false;
      } else if (
        ev.month !== null &&
        ev.month !== undefined &&
        (ev.month as number) >= 0
      ) {
        if (getMonth(date) !== (ev.month as number) - 1) return false;
      } else {
        return false;
      }

      return getDate(date) === Number(ev.dayOfMonth);
    }

    default:
      return false;
  }
};

export const getEventColorClasses = (ev: {
  scheduleType?: string;
  color?: string;
  event_color?: string;
  eventColor?: string;
  backgroundColor?: string;
}) => {
  const isRecurring = ev?.scheduleType === "recurrent";

  const rawColor =
    ev?.color || ev?.event_color || ev?.eventColor || ev?.backgroundColor || "";

  const color = String(rawColor).trim();
  const isValidHex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);

  if (isValidHex) {
    return {
      pill: "text-white border-white/25 shadow-[0_14px_35px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]",
      icon: "bg-white/20 text-white border border-white/25 shadow-sm backdrop-blur-md",
      badge:
        "bg-white/20 text-white border border-white/20 shadow-sm backdrop-blur-md",
      style: {
        background: `linear-gradient(135deg, ${color} 0%, ${color}ee 42%, ${color}bb 100%)`,
        borderColor: `${color}66`,
        boxShadow: `0 14px 35px ${color}44`,
      },
    };
  }

  if (!isRecurring) {
    return {
      pill: "border-blue-300/80 bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.34)] hover:from-blue-600 hover:via-sky-600 hover:to-indigo-700",
      icon: "bg-white/20 text-white shadow-[0_4px_10px_rgba(255,255,255,0.18)]",
      badge:
        "bg-white/20 text-white border border-white/20 shadow-[0_4px_10px_rgba(255,255,255,0.12)]",
      style: undefined,
    };
  }

  return {
    pill: "border-violet-300/80 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 text-white shadow-[0_12px_30px_rgba(99,102,241,0.32)] hover:from-violet-600 hover:via-fuchsia-600 hover:to-indigo-700",
    icon: "bg-white/20 text-white",
    badge: "bg-white/20 text-white",
    style: undefined,
  };
};

export type CalendarThemeKey =
  | "ocean"
  | "midnight"
  | "rose"
  | "emerald"
  | "sunset";

export const calendarThemes: Record<
  CalendarThemeKey,
  {
    name: string;
    preview: string;
    shell: string;
    monthText: string;
    mobileHeader: string;
    eyebrow: string;
    title: string;
    muted: string;
    todayCard: string;
    todayText: string;
    weekday: string;
    weekdayCell: string;
    dayCell: string;
    mutedDayCell: string;
    todayCircle: string;
    normalCircle: string;
    mobileGrid: string;
    mobileDayButton: string;
    mobileActiveDayButton: string;
    mobileEventDayButton: string;
    mobileMutedDayButton: string;
    eventDot: string;
    mobileDaySection: string;
    mobileDateBadge: string;
    emptyState: string;
    eventCountBadge?: string;
  }
> = {
  ocean: {
    name: "Ocean",
    preview: "from-blue-500 to-cyan-400",
    shell: "bg-gradient-to-br from-sky-100 via-sky-200 to-blue-200",
    monthText: "text-blue-900/90 drop-shadow-[0_6px_18px_rgba(37,99,235,0.16)]",
    mobileHeader: "border-white/70 bg-white/75 shadow-sm backdrop-blur-xl",
    eyebrow: "text-blue-600",
    title: "text-slate-900",
    muted: "text-slate-500",
    todayCard: "border-blue-100 bg-blue-50",
    todayText: "text-blue-700",
    weekday: "text-slate-600",
    weekdayCell: "border-white/30 bg-white/40",
    dayCell:
      "border-white/70 bg-white/65 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]",
    mutedDayCell: "border-slate-200 bg-slate-50/80 opacity-40",
    todayCircle:
      "bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-md",
    normalCircle: "border border-slate-200/70 bg-white/70 text-gray-700",
    mobileGrid: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDayButton: "border-slate-100 bg-white/70 text-slate-500",
    mobileActiveDayButton: "border-blue-500 bg-blue-600 text-white shadow-md",
    mobileEventDayButton: "border-blue-100 bg-white text-slate-800 shadow-sm",
    mobileMutedDayButton: "border-slate-100 bg-slate-50/70 text-slate-300",
    eventDot: "bg-blue-500",
    mobileDaySection: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDateBadge: "border border-slate-200 bg-white text-slate-700",
    emptyState: "border-slate-300 bg-white/70",
  },
  midnight: {
    name: "Midnight",
    preview: "from-slate-950 to-indigo-700",
    shell: "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950",
    monthText: "text-white/90 drop-shadow-[0_8px_24px_rgba(129,140,248,0.35)]",
    mobileHeader: "border-white/10 bg-white/10 shadow-xl backdrop-blur-xl",
    eyebrow: "text-indigo-200",
    title: "text-white",
    muted: "text-slate-300",
    todayCard: "border-indigo-400/30 bg-indigo-400/15",
    todayText: "text-indigo-100",
    weekday: "text-slate-300",
    weekdayCell: "border-white/10 bg-white/10",
    dayCell:
      "border-white/10 bg-white/10 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
    mutedDayCell: "border-white/5 bg-white/5 opacity-30",
    todayCircle:
      "bg-linear-to-br from-indigo-400 to-fuchsia-500 text-white shadow-lg",
    normalCircle: "border border-white/10 bg-white/10 text-slate-100",
    mobileGrid: "border-white/10 bg-white/10 shadow-xl backdrop-blur-xl",
    mobileDayButton: "border-white/10 bg-white/10 text-slate-300",
    mobileActiveDayButton:
      "border-indigo-300 bg-indigo-500 text-white shadow-md",
    mobileEventDayButton: "border-white/10 bg-white/15 text-white shadow-sm",
    mobileMutedDayButton: "border-white/5 bg-white/5 text-slate-600",
    eventDot: "bg-indigo-300",
    mobileDaySection: "border-white/10 bg-white/10 shadow-xl backdrop-blur-xl",
    mobileDateBadge: "border border-white/10 bg-white/10 text-white",
    emptyState: "border-white/20 bg-white/10",
  },
  rose: {
    name: "Rose",
    preview: "from-rose-500 to-fuchsia-500",
    shell: "bg-gradient-to-br from-rose-100 via-rose-200 to-fuchsia-100",
    monthText: "text-rose-900/90 drop-shadow-[0_6px_18px_rgba(244,63,94,0.18)]",
    mobileHeader: "border-white/70 bg-white/75 shadow-sm backdrop-blur-xl",
    eyebrow: "text-rose-600",
    title: "text-slate-900",
    muted: "text-slate-500",
    todayCard: "border-rose-100 bg-rose-50",
    todayText: "text-rose-700",
    weekday: "text-slate-600",
    weekdayCell: "border-white/40 bg-white/50",
    dayCell:
      "border-white/70 bg-white/70 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(244,63,94,0.12)]",
    mutedDayCell: "border-rose-100 bg-rose-50/60 opacity-40",
    todayCircle:
      "bg-linear-to-br from-rose-500 to-fuchsia-600 text-white shadow-md",
    normalCircle: "border border-rose-100 bg-white/80 text-gray-700",
    mobileGrid: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDayButton: "border-rose-100 bg-white/70 text-slate-500",
    mobileActiveDayButton: "border-rose-500 bg-rose-600 text-white shadow-md",
    mobileEventDayButton: "border-rose-100 bg-white text-slate-800 shadow-sm",
    mobileMutedDayButton: "border-rose-100 bg-rose-50/70 text-rose-200",
    eventDot: "bg-rose-500",
    mobileDaySection: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDateBadge: "border border-rose-100 bg-white text-slate-700",
    emptyState: "border-rose-200 bg-white/70",
  },
  emerald: {
    name: "Emerald",
    preview: "from-emerald-500 to-teal-400",
    shell: "bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100",
    monthText:
      "text-emerald-900/90 drop-shadow-[0_6px_18px_rgba(16,185,129,0.18)]",
    mobileHeader: "border-white/70 bg-white/75 shadow-sm backdrop-blur-xl",
    eyebrow: "text-emerald-600",
    title: "text-slate-900",
    muted: "text-slate-500",
    todayCard: "border-emerald-100 bg-emerald-50",
    todayText: "text-emerald-700",
    weekday: "text-slate-600",
    weekdayCell: "border-white/40 bg-white/50",
    dayCell:
      "border-white/70 bg-white/70 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(16,185,129,0.12)]",
    mutedDayCell: "border-emerald-100 bg-emerald-50/60 opacity-40",
    todayCircle:
      "bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md",
    normalCircle: "border border-emerald-100 bg-white/80 text-gray-700",
    mobileGrid: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDayButton: "border-emerald-100 bg-white/70 text-slate-500",
    mobileActiveDayButton:
      "border-emerald-500 bg-emerald-600 text-white shadow-md",
    mobileEventDayButton:
      "border-emerald-100 bg-white text-slate-800 shadow-sm",
    mobileMutedDayButton:
      "border-emerald-100 bg-emerald-50/70 text-emerald-200",
    eventDot: "bg-emerald-500",
    mobileDaySection: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDateBadge: "border border-emerald-100 bg-white text-slate-700",
    emptyState: "border-emerald-200 bg-white/70",
  },
  sunset: {
    name: "Sunset",
    preview: "from-orange-500 to-amber-400",
    shell: "bg-gradient-to-br from-orange-100 via-red-100 to-amber-100",
    monthText:
      "text-orange-900/90 drop-shadow-[0_6px_18px_rgba(249,115,22,0.18)]",
    mobileHeader: "border-white/70 bg-white/75 shadow-sm backdrop-blur-xl",
    eyebrow: "text-orange-600",
    title: "text-slate-900",
    muted: "text-slate-500",
    todayCard: "border-orange-100 bg-orange-50",
    todayText: "text-orange-700",
    weekday: "text-slate-600",
    weekdayCell: "border-white/40 bg-white/50",
    dayCell:
      "border-white/70 bg-white/70 backdrop-blur-sm hover:shadow-[0_10px_30px_rgba(249,115,22,0.12)]",
    mutedDayCell: "border-orange-100 bg-orange-50/60 opacity-40",
    todayCircle:
      "bg-linear-to-br from-orange-500 to-amber-500 text-white shadow-md",
    normalCircle: "border border-orange-100 bg-white/80 text-gray-700",
    mobileGrid: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDayButton: "border-orange-100 bg-white/70 text-slate-500",
    mobileActiveDayButton:
      "border-orange-500 bg-orange-600 text-white shadow-md",
    mobileEventDayButton: "border-orange-100 bg-white text-slate-800 shadow-sm",
    mobileMutedDayButton: "border-orange-100 bg-orange-50/70 text-orange-200",
    eventDot: "bg-orange-500",
    mobileDaySection: "border-white/70 bg-white/80 shadow-sm backdrop-blur-xl",
    mobileDateBadge: "border border-orange-100 bg-white text-slate-700",
    emptyState: "border-orange-200 bg-white/70",
  },
};
