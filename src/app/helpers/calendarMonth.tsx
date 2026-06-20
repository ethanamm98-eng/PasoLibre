import { addDays, format } from "date-fns";
import { SchedulerForm } from "../lib/interfaces/events";
import { occursOnDate } from "./calendar";

export type CalendarThemeKey =
  | "ocean"
  | "midnight"
  | "rose"
  | "emerald"
  | "sunset";

export const normalizeHexColor = (color?: string) => {
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

export const getEventIconStyle = (color?: string): React.CSSProperties => {
  const baseColor = normalizeHexColor(color);

  if (!baseColor) return {};

  return {
    background: `linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.14))`,
    borderColor: "rgba(255,255,255,0.35)",
    color: "#ffffff",
  };
};

export const getOccurrenceDateKey = (date: Date) => format(date, "yyyy-MM-dd");

export const getAttendanceKey = (
  eventId?: string,
  occurrenceDate?: string | null
) => `${eventId || "unknown"}::${occurrenceDate || "no-date"}`;

export const getExcludedDates = (event: SchedulerForm) => {
  const camelCaseDates = event?.recurrenceExcludedDates;
  const snakeCaseDates = event?.recurrence_excluded_dates;

  const dates = Array.isArray(camelCaseDates)
    ? camelCaseDates
    : Array.isArray(snakeCaseDates)
    ? snakeCaseDates
    : [];

  return dates.map((date) => String(date || "").slice(0, 10)).filter(Boolean);
};

export const isOccurrenceExcluded = (event: SchedulerForm, date: Date) => {
  if (event?.scheduleType !== "recurrent") return false;

  const occurrenceDate = getOccurrenceDateKey(date);
  return getExcludedDates(event).includes(occurrenceDate);
};

export const getScheduledOccurrenceDate = (
  event: SchedulerForm,
  day?: Date
) => {
  if (day) return getOccurrenceDateKey(day);

  if (event?.date) {
    return String(event.date).slice(0, 10);
  }

  if (event?.start) {
    return format(new Date(event.start), "yyyy-MM-dd");
  }

  return null;
};

export const getNextUpcomingRecurringOccurrenceDate = (
  event: SchedulerForm
) => {
  const today = new Date();

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  for (let index = 0; index < 730; index += 1) {
    const candidate = addDays(start, index);

    if (
      occursOnDate(event, candidate) &&
      !isOccurrenceExcluded(event, candidate)
    ) {
      return getOccurrenceDateKey(candidate);
    }
  }

  return null;
};
