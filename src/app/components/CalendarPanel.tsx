"use client";

import React, { useEffect, useState } from "react";
import { IoChevronDown, IoChevronForward, IoClose } from "react-icons/io5";
import { format, isBefore } from "date-fns";
import { enUS, es } from "date-fns/locale";

import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";

interface CalendarPanelProps {
  mode: "Recurring" | "Scheduled";
  showCalendarPanel: boolean;
  setShowCalendarPanel: (show: boolean) => void;
  recurringEvents?: SchedulerForm[];
  scheduledEvents?: SchedulerForm[];
  visibleRecurringIds?: string[];
  setVisibleRecurringIds?: React.Dispatch<React.SetStateAction<string[]>>;
  visibleScheduledIds?: string[];
  setVisibleScheduledIds?: React.Dispatch<React.SetStateAction<string[]>>;
  expandedId?: string | null;
  setExpandedId?: (id: string | null) => void;
  allMonthsSelected?: boolean;
  allDaysSelected?: boolean;
}

const normalizeValue = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

const normalizeCsvValues = (value?: string | null) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const startOfLocalDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseLocalDate = (value?: string | Date | null): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;

    return startOfLocalDay(value);
  }

  const normalizedValue = String(value).trim();

  if (!normalizedValue) return null;

  /*
   * Appending a local time prevents YYYY-MM-DD from being parsed
   * as UTC and appearing as the previous day in Puerto Rico.
   */
  const parsedDate = new Date(
    normalizedValue.includes("T")
      ? normalizedValue
      : `${normalizedValue}T00:00:00`,
  );

  if (Number.isNaN(parsedDate.getTime())) return null;

  return startOfLocalDay(parsedDate);
};

const addLocalDays = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const CalendarPanel = ({
  mode,
  showCalendarPanel,
  setShowCalendarPanel,
  recurringEvents = [],
  scheduledEvents = [],
  visibleRecurringIds = [],
  setVisibleRecurringIds,
  visibleScheduledIds = [],
  setVisibleScheduledIds,
  expandedId,
  setExpandedId,
  allMonthsSelected,
  allDaysSelected,
}: CalendarPanelProps) => {
  const { language } = useLanguage();

  const isSpanish = language === "es";
  const dateLocale = isSpanish ? es : enUS;

  const [isMobile, setIsMobile] = useState(false);

  const t = {
    scheduledEvents: isSpanish ? "Eventos Programados" : "Scheduled Events",

    recurringEvents: isSpanish ? "Eventos Recurrentes" : "Recurring Events",

    unselectAll: isSpanish ? "Deseleccionar Todo" : "Unselect All",

    selectAll: isSpanish ? "Seleccionar Todo" : "Select All",

    showing: isSpanish ? "Mostrando" : "Showing",
    when: isSpanish ? "Cuándo" : "When",

    nextOccurrence: isSpanish ? "Próxima ocurrencia" : "Next occurrence",

    recurrence: isSpanish ? "Recurrencia" : "Recurrence",
    custom: isSpanish ? "Personalizado" : "Custom",
    daily: isSpanish ? "Diaria" : "Daily",
    weekly: isSpanish ? "Semanal" : "Weekly",
    monthly: isSpanish ? "Mensual" : "Monthly",

    selectedMonth: isSpanish ? "Mes seleccionado" : "Selected month",

    yearly: isSpanish ? "Anual" : "Yearly",
    days: isSpanish ? "Días" : "Days",
    everyDay: isSpanish ? "Todos los días" : "Every day",

    dayOfMonth: isSpanish ? "Día del mes" : "Day of month",

    month: isSpanish ? "Mes" : "Month",
    months: isSpanish ? "Meses" : "Months",

    everyMonth: isSpanish ? "Todos los meses" : "Every month",

    time: isSpanish ? "Hora" : "Time",

    unableToDetermineOccurrence: isSpanish
      ? "No se pudo determinar"
      : "Unable to determine",

    noTime: isSpanish ? "Hora no disponible" : "Time unavailable",

    noEvents: isSpanish
      ? "No hay eventos que coincidan con los filtros seleccionados."
      : "No events match the selected filters.",

    closePanel: isSpanish ? "Cerrar panel" : "Close panel",
  };

  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateMobileState();

    window.addEventListener("resize", updateMobileState);

    return () => {
      window.removeEventListener("resize", updateMobileState);
    };
  }, []);

  const getLocalizedEventName = (event: SchedulerForm) => {
    if (isSpanish) {
      return event?.name_es || event?.name_en || "";
    }

    return event?.name_en || event?.name_es || "";
  };

  const formatRecurrenceLabel = (value?: string | null) => {
    const normalized = normalizeValue(value);

    if (normalized === "daily") return t.daily;
    if (normalized === "weekly") return t.weekly;
    if (normalized === "monthly") return t.monthly;

    if (normalized === "selectedmonth" || normalized === "selected-month") {
      return t.selectedMonth;
    }

    if (normalized === "yearly") return t.yearly;

    return value || t.custom;
  };

  const formatMonthName = (monthNumber?: number | null) => {
    if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
      return "";
    }

    return format(new Date(2020, monthNumber - 1, 1), "MMM", {
      locale: dateLocale,
    });
  };

  const formatCalendarDate = (value?: string | Date | null) => {
    const date = parseLocalDate(value);

    if (!date) return "";

    return format(date, "MMM d, yyyy", {
      locale: dateLocale,
    });
  };

  const formatTimeToAmPm = (value?: string | null) => {
    if (!value) return "";

    /*
     * Supports:
     * 08:00
     * 08:00:00
     * 18:30:00
     * 2026-08-02T18:30:00
     */
    const rawTime = String(value).trim();

    const timeSection = rawTime.includes("T")
      ? rawTime.split("T")[1] || ""
      : rawTime;

    /*
     * Removes timezone suffixes when a complete ISO value is passed.
     */
    const cleanedTime = timeSection
      .replace(/Z$/i, "")
      .replace(/([+-]\d{2}:\d{2})$/, "");

    const [hoursValue, minutesValue] = cleanedTime.split(":");

    const hours = Number(hoursValue);
    const minutes = Number(minutesValue);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return rawTime;
    }

    const timeDate = new Date(2000, 0, 1, hours, minutes);

    return format(timeDate, "h:mm a", {
      locale: dateLocale,
    });
  };

  const getConfiguredStartDate = (event: SchedulerForm) => {
    return (
      parseLocalDate(event?.date) ||
      parseLocalDate(event?.createdAt) ||
      startOfLocalDay(new Date())
    );
  };

  const getCandidateWeekdayValues = (candidate: Date) => {
    const fullEnglishName = format(candidate, "EEEE", {
      locale: enUS,
    }).toLowerCase();

    const shortEnglishName = format(candidate, "EEE", {
      locale: enUS,
    }).toLowerCase();

    const lowercaseShortName = shortEnglishName.slice(0, 3);

    const dayIndex = candidate.getDay();

    /*
     * Supports Sunday-based 0–6 and 1–7 values.
     */
    return [
      fullEnglishName,
      shortEnglishName,
      lowercaseShortName,
      String(dayIndex),
      String(dayIndex + 1),
    ];
  };

  const getCandidateMonthValues = (candidate: Date) => {
    const fullMonth = format(candidate, "MMMM", {
      locale: enUS,
    }).toLowerCase();

    const shortMonth = format(candidate, "MMM", {
      locale: enUS,
    }).toLowerCase();

    const monthNumber = candidate.getMonth() + 1;

    return [
      String(monthNumber),
      String(monthNumber).padStart(2, "0"),
      fullMonth,
      shortMonth,
    ];
  };

  const recurringEventOccursOnDate = (
    event: SchedulerForm,
    candidate: Date,
  ) => {
    const recurrence = normalizeValue(event?.recurrence || "weekly");

    const configuredDayOfMonth = Number(event?.dayOfMonth || 0);

    const configuredMonth = Number(event?.month || 0);

    const candidateDayOfMonth = candidate.getDate();
    const candidateMonth = candidate.getMonth() + 1;

    const configuredDays = normalizeCsvValues(event?.daysOfWeekCsv);

    const configuredMonths = normalizeCsvValues(event?.monthsCsv);

    if (recurrence === "daily") {
      return true;
    }

    if (recurrence === "weekly") {
      /*
       * No selected weekdays means the event occurs every day.
       */
      if (configuredDays.length === 0) {
        return true;
      }

      const candidateWeekdays = getCandidateWeekdayValues(candidate);

      return configuredDays.some((day) => candidateWeekdays.includes(day));
    }

    if (
      recurrence === "monthly" ||
      recurrence === "selectedmonth" ||
      recurrence === "selected-month"
    ) {
      const matchesDay =
        !configuredDayOfMonth || candidateDayOfMonth === configuredDayOfMonth;

      if (!matchesDay) return false;

      /*
       * A standard monthly recurrence with no selected months
       * occurs every month.
       */
      if (configuredMonths.length === 0) {
        return true;
      }

      const candidateMonths = getCandidateMonthValues(candidate);

      return configuredMonths.some((month) => candidateMonths.includes(month));
    }

    if (recurrence === "yearly") {
      const candidateMonths = getCandidateMonthValues(candidate);

      const matchesConfiguredMonth =
        !configuredMonth || candidateMonth === configuredMonth;

      const matchesSelectedMonths =
        configuredMonths.length === 0 ||
        configuredMonths.some((month) => candidateMonths.includes(month));

      const matchesDay =
        !configuredDayOfMonth || candidateDayOfMonth === configuredDayOfMonth;

      return matchesConfiguredMonth && matchesSelectedMonths && matchesDay;
    }

    return false;
  };

  const getExcludedOccurrenceDates = (event: SchedulerForm) => {
    const excludedDates = event?.recurrence_excluded_dates;

    if (!Array.isArray(excludedDates)) {
      return new Set<string>();
    }

    return new Set(
      excludedDates.map((date) => String(date).split("T")[0]).filter(Boolean),
    );
  };

  const getNextRecurringOccurrenceDate = (event: SchedulerForm) => {
    /*
     * An explicit occurrenceDate represents a calendar
     * occurrence already selected elsewhere.
     */
    if (event?.occurrenceDate) {
      return String(event.occurrenceDate).split("T")[0];
    }

    const today = startOfLocalDay(new Date());
    const configuredStartDate = getConfiguredStartDate(event);

    let candidate = configuredStartDate > today ? configuredStartDate : today;

    const excludedDates = getExcludedOccurrenceDates(event);

    /*
     * Search up to five years ahead so yearly events are covered
     * even when the current year's date has passed.
     */
    const maximumSearchDays = 366 * 5;

    for (let index = 0; index <= maximumSearchDays; index += 1) {
      const candidateKey = toLocalDateKey(candidate);

      const occursOnCandidate = recurringEventOccursOnDate(event, candidate);

      const isExcluded = excludedDates.has(candidateKey);

      if (occursOnCandidate && !isExcluded) {
        return candidateKey;
      }

      candidate = addLocalDays(candidate, 1);
    }

    return null;
  };

  const getDisplayedOccurrenceDate = (event: SchedulerForm) => {
    const isRecurring =
      mode === "Recurring" ||
      normalizeValue(event?.scheduleType) === "recurrent";

    if (isRecurring) {
      return getNextRecurringOccurrenceDate(event);
    }

    return (
      event?.occurrenceDate ||
      event?.date ||
      (event?.start ? String(event.start).split("T")[0] : null)
    );
  };

  const isScheduledEventPast = (event: SchedulerForm) => {
    if (mode !== "Scheduled") return false;

    const occurrenceDate = getDisplayedOccurrenceDate(event);

    if (!occurrenceDate) return false;

    const dateKey = String(occurrenceDate).split("T")[0];
    const eventTime = event?.time || "23:59:59";

    const eventDateTime = new Date(`${dateKey}T${eventTime}`);

    if (Number.isNaN(eventDateTime.getTime())) {
      const parsedDate = parseLocalDate(dateKey);

      return parsedDate
        ? isBefore(parsedDate, startOfLocalDay(new Date()))
        : false;
    }

    return isBefore(eventDateTime, new Date());
  };

  const formatDaysOfWeek = (value?: string | null) => {
    if (!value) return t.everyDay;

    const translations: Record<string, string> = {
      monday: isSpanish ? "Lunes" : "Monday",
      mon: isSpanish ? "Lun" : "Mon",

      tuesday: isSpanish ? "Martes" : "Tuesday",
      tue: isSpanish ? "Mar" : "Tue",
      tues: isSpanish ? "Mar" : "Tue",

      wednesday: isSpanish ? "Miércoles" : "Wednesday",
      wed: isSpanish ? "Mié" : "Wed",

      thursday: isSpanish ? "Jueves" : "Thursday",
      thu: isSpanish ? "Jue" : "Thu",
      thur: isSpanish ? "Jue" : "Thu",
      thurs: isSpanish ? "Jue" : "Thu",

      friday: isSpanish ? "Viernes" : "Friday",
      fri: isSpanish ? "Vie" : "Fri",

      saturday: isSpanish ? "Sábado" : "Saturday",
      sat: isSpanish ? "Sáb" : "Sat",

      sunday: isSpanish ? "Domingo" : "Sunday",
      sun: isSpanish ? "Dom" : "Sun",
    };

    return value
      .split(",")
      .map((day) => day.trim())
      .filter(Boolean)
      .map((day) => {
        const key = day.toLowerCase();
        return translations[key] ?? day;
      })
      .join(", ");
  };

  if (!showCalendarPanel) return null;

  const panelTitle =
    mode === "Scheduled" ? t.scheduledEvents : t.recurringEvents;

  const events = mode === "Scheduled" ? scheduledEvents : recurringEvents;

  const visibleIds =
    mode === "Scheduled" ? visibleScheduledIds : visibleRecurringIds;

  const setVisibleIds =
    mode === "Scheduled" ? setVisibleScheduledIds : setVisibleRecurringIds;

  const supportsRecurrenceDetails = mode === "Recurring";

  const allVisible =
    events.length > 0 && events.every((event) => visibleIds.includes(event.id));

  const visibleEventCount = events.filter((event) =>
    visibleIds.includes(event.id),
  ).length;

  const toggleVisibility = (id: string) => {
    setVisibleIds?.((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((visibleId) => visibleId !== id)
        : [...previousIds, id],
    );
  };

  const toggleAll = () => {
    if (allVisible) {
      setVisibleIds?.([]);
      return;
    }

    setVisibleIds?.(events.map((event) => event.id).filter(Boolean));
  };

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowCalendarPanel(false);
  };

  return (
    <>
      <div
        className="absolute inset-0 z-9998 h-full md:fixed"
        onClick={() => setShowCalendarPanel(false)}
        aria-hidden="true"
      />

      <aside
        className={`
          absolute z-9999 bg-white shadow-2xl
          transition-transform duration-300
          ease-[cubic-bezier(.22,1,.36,1)]
          ${
            isMobile
              ? `bottom-0 left-0 right-0 h-[80vh] rounded-t-2xl ${
                  showCalendarPanel ? "translate-y-0" : "translate-y-full"
                }`
              : `right-0 top-0 h-full w-80 ${
                  showCalendarPanel ? "translate-x-0" : "translate-x-full"
                }`
          }
        `}
      >
        <div
          className={`flex select-none items-center justify-between px-5 py-5 font-semibold text-white ${
            mode === "Scheduled" ? "bg-blue-600" : "bg-purple-600"
          }`}
        >
          <div>{panelTitle}</div>

          <button
            type="button"
            onClick={handleClose}
            aria-label={t.closePanel}
            className="cursor-pointer rounded-lg p-1 transition hover:bg-white/10"
          >
            <IoClose className="text-2xl transition hover:text-red-200" />
          </button>
        </div>

        <div className="flex h-[calc(100%-68px)] flex-col p-5 pt-3">
          <div className="mb-3 flex items-center justify-between gap-2 text-sm">
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={allVisible}
                onChange={toggleAll}
                disabled={events.length === 0}
                className="cursor-pointer disabled:cursor-not-allowed"
              />

              <span className="ml-2 text-gray-700">
                {allVisible ? t.unselectAll : t.selectAll}
              </span>
            </label>

            <div className="text-sm">
              {t.showing}:{" "}
              <span className="font-normal">{visibleEventCount}</span>/
              <span className="font-semibold">{events.length}</span>
            </div>
          </div>

          {events.length > 0 ? (
            <ul className="flex-1 space-y-2 overflow-y-auto pr-1 text-sm">
              {events.map((event) => {
                const isExpanded = expandedId === event.id;

                const isPast = isScheduledEventPast(event);

                const occurrenceDate = getDisplayedOccurrenceDate(event);

                const recurrence = normalizeValue(event.recurrence);

                const hasSelectedMonths =
                  recurrence === "monthly" ||
                  recurrence === "selectedmonth" ||
                  recurrence === "selected-month" ||
                  recurrence === "yearly";

                return (
                  <li
                    key={event.id}
                    className={`rounded-lg border border-slate-200 bg-white p-2 transition-all duration-200 ${
                      isPast ? "opacity-60 grayscale" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={visibleIds.includes(event.id)}
                        onChange={() => toggleVisibility(event.id)}
                        className="cursor-pointer"
                        aria-label={getLocalizedEventName(event)}
                      />

                      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                        <span
                          className={`truncate ${
                            normalizeValue(event.status) === "paused"
                              ? "text-red-600"
                              : normalizeValue(event.status) === "deleted"
                                ? "text-gray-500 line-through"
                                : mode === "Scheduled"
                                  ? "text-sky-700"
                                  : "text-purple-700"
                          }`}
                          title={getLocalizedEventName(event)}
                        >
                          {getLocalizedEventName(event)}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId?.(isExpanded ? null : event.id)
                          }
                          className="shrink-0 cursor-pointer rounded-md p-1 text-gray-500 transition hover:bg-slate-100 hover:text-gray-700"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? (
                            <IoChevronDown />
                          ) : (
                            <IoChevronForward />
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 space-y-1.5 border-t border-slate-200 pt-2 text-xs text-gray-600">
                        <div>
                          <span className="font-semibold">
                            {supportsRecurrenceDetails
                              ? t.nextOccurrence
                              : t.when}
                            :
                          </span>{" "}
                          {occurrenceDate
                            ? formatCalendarDate(occurrenceDate)
                            : t.unableToDetermineOccurrence}
                        </div>

                        <div>
                          <span className="font-semibold">{t.time}:</span>{" "}
                          {event?.time
                            ? formatTimeToAmPm(event.time)
                            : t.noTime}
                        </div>

                        {supportsRecurrenceDetails && (
                          <>
                            <div>
                              <span className="font-semibold">
                                {t.recurrence}:
                              </span>{" "}
                              {formatRecurrenceLabel(event.recurrence)}
                            </div>

                            {recurrence === "weekly" && (
                              <div>
                                <span className="font-semibold">{t.days}:</span>{" "}
                                {allDaysSelected || !event?.daysOfWeekCsv
                                  ? t.everyDay
                                  : formatDaysOfWeek(event.daysOfWeekCsv)}
                              </div>
                            )}

                            {Number(event.dayOfMonth) > 0 && (
                              <div>
                                <span className="font-semibold">
                                  {t.dayOfMonth}:
                                </span>{" "}
                                {event.dayOfMonth}
                              </div>
                            )}

                            {Number(event.month) > 0 && (
                              <div>
                                <span className="font-semibold">
                                  {t.month}:
                                </span>{" "}
                                {formatMonthName(Number(event.month))}
                              </div>
                            )}

                            {hasSelectedMonths && (
                              <div>
                                <span className="font-semibold">
                                  {t.months}:
                                </span>{" "}
                                {allMonthsSelected || !event.monthsCsv
                                  ? t.everyMonth
                                  : event.monthsCsv.toUpperCase()}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="my-2 px-8 py-4 text-center text-sm text-gray-500">
              {t.noEvents}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CalendarPanel;
