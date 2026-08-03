import { addDays, format } from "date-fns";
import { SchedulerForm } from "../lib/interfaces/events";

export type CalendarThemeKey =
  | "ocean"
  | "midnight"
  | "rose"
  | "emerald"
  | "sunset";

export const normalizeHexColor = (color?: string) => {
  if (!color) return null;

  const trimmed = String(color).trim();

  if (/^#[0-9A-F]{6}$/i.test(trimmed)) {
    return trimmed;
  }

  if (/^#[0-9A-F]{3}$/i.test(trimmed)) {
    return `#${trimmed
      .slice(1)
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }

  return null;
};

export const getEventIconStyle = (
  color?: string
): React.CSSProperties => {
  const baseColor = normalizeHexColor(color);

  if (!baseColor) return {};

  return {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.14))",
    borderColor: "rgba(255,255,255,0.35)",
    color: "#ffffff",
  };
};

/* -------------------------------------------------------------------------- */
/* Date helpers                                                                */
/* -------------------------------------------------------------------------- */

export const getOccurrenceDateKey = (date: Date) =>
  format(date, "yyyy-MM-dd");

export const getAttendanceKey = (
  eventId?: string,
  occurrenceDate?: string | null
) => `${eventId || "unknown"}::${occurrenceDate || "no-date"}`;

const startOfLocalDay = (date: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

const normalizeValue = (value?: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-");

const getCsvValues = (...values: unknown[]) =>
  values
    .filter(
      (value) =>
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    )
    .flatMap((value) => String(value).split(","))
    .map((value) => normalizeValue(value))
    .filter(Boolean);

const parseDateOnly = (
  value?: string | Date | null
): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return startOfLocalDay(value);
  }

  const rawValue = String(value).trim();

  if (!rawValue) return null;

  const datePart = rawValue.split("T")[0];

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(
    datePart
  );

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const parsedDate = new Date(
    year,
    month - 1,
    day
  );

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
};

const parseEventTime = (
  value?: string | null
) => {
  const match =
    /^(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(
      String(value || "").trim()
    );

  if (!match) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const parsedHours = Number(match[1]);
  const parsedMinutes = Number(match[2]);
  const parsedSeconds = Number(match[3] || 0);

  return {
    hours:
      Number.isFinite(parsedHours) &&
      parsedHours >= 0 &&
      parsedHours <= 23
        ? parsedHours
        : 0,

    minutes:
      Number.isFinite(parsedMinutes) &&
      parsedMinutes >= 0 &&
      parsedMinutes <= 59
        ? parsedMinutes
        : 0,

    seconds:
      Number.isFinite(parsedSeconds) &&
      parsedSeconds >= 0 &&
      parsedSeconds <= 59
        ? parsedSeconds
        : 0,
  };
};

const combineDateAndEventTime = (
  date: Date,
  time?: string | null
) => {
  const { hours, minutes, seconds } =
    parseEventTime(time);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    seconds,
    0
  );
};

/* -------------------------------------------------------------------------- */
/* Excluded occurrences                                                        */
/* -------------------------------------------------------------------------- */

export const getExcludedDates = (
  event: SchedulerForm
) => {
  const camelCaseDates =
    event?.recurrenceExcludedDates;

  const snakeCaseDates =
    event?.recurrence_excluded_dates;

  const dates = Array.isArray(camelCaseDates)
    ? camelCaseDates
    : Array.isArray(snakeCaseDates)
      ? snakeCaseDates
      : [];

  return dates
    .map((date) => {
      const parsedDate = parseDateOnly(
        String(date || "")
      );

      return parsedDate
        ? getOccurrenceDateKey(parsedDate)
        : null;
    })
    .filter((date): date is string => Boolean(date));
};

export const isOccurrenceExcluded = (
  event: SchedulerForm,
  date: Date
) => {
  if (
    normalizeValue(event?.scheduleType) !==
    "recurrent"
  ) {
    return false;
  }

  const occurrenceDate =
    getOccurrenceDateKey(date);

  return getExcludedDates(event).includes(
    occurrenceDate
  );
};

/* -------------------------------------------------------------------------- */
/* Stored one-time occurrence                                                  */
/* -------------------------------------------------------------------------- */

export const getScheduledOccurrenceDate = (
  event: SchedulerForm,
  day?: Date
) => {
  if (day) {
    return getOccurrenceDateKey(day);
  }

  const storedDate = parseDateOnly(event?.date);

  if (storedDate) {
    return getOccurrenceDateKey(storedDate);
  }

  const startDate = parseDateOnly(
    event?.start as string | undefined
  );

  if (startDate) {
    return getOccurrenceDateKey(startDate);
  }

  return null;
};

/* -------------------------------------------------------------------------- */
/* Recurrence matching                                                         */
/* -------------------------------------------------------------------------- */

const weekdayAliases: Record<
  number,
  string[]
> = {
  0: [
    "sun",
    "sunday",
    "domingo",
    "dom",
    "0",
    "7",
  ],

  1: [
    "mon",
    "monday",
    "lunes",
    "lun",
    "1",
  ],

  2: [
    "tue",
    "tues",
    "tuesday",
    "martes",
    "mar",
    "2",
  ],

  3: [
    "wed",
    "wednesday",
    "miércoles",
    "miercoles",
    "mié",
    "mie",
    "3",
  ],

  4: [
    "thu",
    "thur",
    "thurs",
    "thursday",
    "jueves",
    "jue",
    "4",
  ],

  5: [
    "fri",
    "friday",
    "viernes",
    "vie",
    "5",
  ],

  6: [
    "sat",
    "saturday",
    "sábado",
    "sabado",
    "sáb",
    "sab",
    "6",
  ],
};

const monthAliases: Record<
  number,
  string[]
> = {
  1: [
    "1",
    "01",
    "jan",
    "january",
    "ene",
    "enero",
  ],

  2: [
    "2",
    "02",
    "feb",
    "february",
    "febrero",
  ],

  3: [
    "3",
    "03",
    "mar",
    "march",
    "marzo",
  ],

  4: [
    "4",
    "04",
    "apr",
    "april",
    "abr",
    "abril",
  ],

  5: ["5", "05", "may", "mayo"],

  6: [
    "6",
    "06",
    "jun",
    "june",
    "junio",
  ],

  7: [
    "7",
    "07",
    "jul",
    "july",
    "julio",
  ],

  8: [
    "8",
    "08",
    "aug",
    "august",
    "ago",
    "agosto",
  ],

  9: [
    "9",
    "09",
    "sep",
    "sept",
    "september",
    "septiembre",
  ],

  10: [
    "10",
    "oct",
    "october",
    "octubre",
  ],

  11: [
    "11",
    "nov",
    "november",
    "noviembre",
  ],

  12: [
    "12",
    "dec",
    "december",
    "dic",
    "diciembre",
  ],
};

const getEventCreatedDate = (
  event: SchedulerForm
) => {
  const rawCreatedAt =
    event?.createdAt ||
    event?.created_at ||
    null;

  if (!rawCreatedAt) {
    return null;
  }

  const parsedDate = new Date(rawCreatedAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return startOfLocalDay(parsedDate);
};

const isOnOrAfterEventCreatedDate = (
  event: SchedulerForm,
  candidate: Date
) => {
  const createdDate =
    getEventCreatedDate(event);

  if (!createdDate) {
    return true;
  }

  return (
    startOfLocalDay(candidate) >= createdDate
  );
};

export const recurringEventOccursOnDate = (
  event: SchedulerForm,
  candidate: Date
) => {
  if (
    normalizeValue(event?.scheduleType) !==
    "recurrent"
  ) {
    return false;
  }

  if (
    !isOnOrAfterEventCreatedDate(
      event,
      candidate
    )
  ) {
    return false;
  }

  const recurrence = normalizeValue(
    event?.recurrence ||
      event?.frequency ||
      "weekly"
  );

  const daysOfWeek = getCsvValues(
    event?.daysOfWeekCsv,
    event?.days_of_week_csv
  );

  const selectedMonths = getCsvValues(
    event?.monthsCsv,
    event?.months_csv
  );

  const configuredDayOfMonth = Number(
    event?.dayOfMonth ||
      event?.day_of_month ||
      0
  );

  const configuredMonth = Number(
    event?.month || 0
  );

  const candidateDayOfMonth =
    candidate.getDate();

  const candidateMonth =
    candidate.getMonth() + 1;

  if (
    recurrence === "daily" ||
    recurrence === "day"
  ) {
    return true;
  }

  if (
    recurrence === "weekly" ||
    recurrence === "week"
  ) {
    /*
     * This mirrors your MonthView behavior:
     * no selected weekdays means every day.
     */
    if (daysOfWeek.length === 0) {
      return true;
    }

    const aliases =
      weekdayAliases[candidate.getDay()] || [];

    return daysOfWeek.some((day) =>
      aliases.includes(day)
    );
  }

  if (
    recurrence === "monthly" ||
    recurrence === "month"
  ) {
    /*
     * This also mirrors MonthView:
     * no configured day means every day.
     */
    if (!configuredDayOfMonth) {
      return true;
    }

    return (
      candidateDayOfMonth ===
      configuredDayOfMonth
    );
  }

  if (
    recurrence === "selectedmonth" ||
    recurrence === "selected-month"
  ) {
    const matchesDay =
      !configuredDayOfMonth ||
      candidateDayOfMonth ===
        configuredDayOfMonth;

    if (!matchesDay) {
      return false;
    }

    if (selectedMonths.length === 0) {
      return true;
    }

    const aliases =
      monthAliases[candidateMonth] || [];

    return selectedMonths.some((month) =>
      aliases.includes(month)
    );
  }

  if (
    recurrence === "yearly" ||
    recurrence === "year"
  ) {
    const matchesDay =
      !configuredDayOfMonth ||
      candidateDayOfMonth ===
        configuredDayOfMonth;

    if (!matchesDay) {
      return false;
    }

    if (
      configuredMonth >= 1 &&
      configuredMonth <= 12
    ) {
      return (
        candidateMonth === configuredMonth
      );
    }

    if (selectedMonths.length === 0) {
      return true;
    }

    const aliases =
      monthAliases[candidateMonth] || [];

    return selectedMonths.some((month) =>
      aliases.includes(month)
    );
  }

  return false;
};

/* -------------------------------------------------------------------------- */
/* Next occurrence                                                             */
/* -------------------------------------------------------------------------- */

export const getNextUpcomingRecurringOccurrenceDate =
  (
    event: SchedulerForm,
    referenceDate: Date = new Date()
  ): string | null => {
    if (
      normalizeValue(event?.scheduleType) !==
      "recurrent"
    ) {
      return null;
    }

    const now = referenceDate;
    const firstCandidate =
      startOfLocalDay(now);

    const excludedDates = new Set(
      getExcludedDates(event)
    );

    /*
     * Ten years safely covers yearly events and long
     * exclusion sequences.
     */
    const maximumSearchDays = 366 * 10;

    for (
      let index = 0;
      index <= maximumSearchDays;
      index += 1
    ) {
      const candidate = addDays(
        firstCandidate,
        index
      );

      const occurrenceDate =
        getOccurrenceDateKey(candidate);

      const occurrenceDateTime =
        combineDateAndEventTime(
          candidate,
          event?.time
        );

      const matchesRecurrence =
        recurringEventOccursOnDate(
          event,
          candidate
        );

      const hasNotPassed =
        occurrenceDateTime >= now;

      const isExcluded =
        excludedDates.has(occurrenceDate);

      if (
        matchesRecurrence &&
        hasNotPassed &&
        !isExcluded
      ) {
        return occurrenceDate;
      }
    }

    return null;
  };

/* -------------------------------------------------------------------------- */
/* Unified occurrence resolver                                                 */
/* -------------------------------------------------------------------------- */

export const getNextOccurrenceDate = (
  event: SchedulerForm,
  referenceDate: Date = new Date()
): string | null => {
  const scheduleType = normalizeValue(
    event?.scheduleType
  );

  if (scheduleType === "one-time") {
    return getScheduledOccurrenceDate(event);
  }

  if (scheduleType === "recurrent") {
    return getNextUpcomingRecurringOccurrenceDate(
      event,
      referenceDate
    );
  }

  return null;
};