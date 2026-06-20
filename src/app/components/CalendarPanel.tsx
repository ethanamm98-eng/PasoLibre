import React, { useState } from "react";
import { IoChevronForward, IoChevronDown, IoClose } from "react-icons/io5";
import { format, isBefore } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";

const CalendarPanel = ({
  mode, // "Recurring" or "Scheduled"
  showCalendarPanel,
  setShowCalendarPanel,
  recurringEvents = [],
  scheduledEvents = [],
  visibleRecurringIds,
  setVisibleRecurringIds,
  visibleScheduledIds,
  setVisibleScheduledIds,
  expandedId,
  setExpandedId,
  allMonthsSelected,
  allDaysSelected,
}: // statusFilter,
// setStatusFilter,
// onEventClick,
// panelRef,
// handleMouseDown,
{
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
  // statusFilter: { Past: boolean; Future: boolean };
  // setStatusFilter: (filter: { Past: boolean; Future: boolean }) => void;
  // onEventClick?: (event: SchedulerForm) => void;
  // panelRef: React.RefObject<HTMLDivElement>;
  // handleMouseDown: (e: React.MouseEvent) => void;
}) => {
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";
  const dateLocale = isSpanish ? es : enUS;

  const t = {
    scheduledEvents: isSpanish ? "Eventos Programados" : "Scheduled Events",
    recurringEvents: isSpanish ? "Eventos Recurrentes" : "Recurring Events",
    unselectAll: isSpanish ? "Deseleccionar Todo" : "Unselect All",
    selectAll: isSpanish ? "Seleccionar Todo" : "Select All",
    showing: isSpanish ? "Mostrando" : "Showing",
    when: isSpanish ? "Cuándo" : "When",
    recurrence: isSpanish ? "Recurrencia" : "Recurrence",
    custom: isSpanish ? "Personalizado" : "Custom",
    weekly: isSpanish ? "Semanal" : "Weekly",
    monthly: isSpanish ? "Mensual" : "Monthly",
    selectedMonth: isSpanish ? "Mes Seleccionado" : "Selected Month",
    yearly: isSpanish ? "Anual" : "Yearly",
    days: isSpanish ? "Días" : "Days",
    everyDay: isSpanish ? "Todos los días" : "Every Day",
    dayOfMonth: isSpanish ? "Día del Mes" : "Day of Month",
    month: isSpanish ? "Mes" : "Month",
    months: isSpanish ? "Meses" : "Months",
    everyMonth: isSpanish ? "Todos los meses" : "Every Month",
    time: isSpanish ? "Hora" : "Time",
    noEvents: isSpanish
      ? "No hay eventos que coincidan con los filtros seleccionados."
      : "No events match the selected filters.",
  };

  const getLocalizedEventName = (ev: SchedulerForm) => {
    if (!ev) return "";
    if (isSpanish) return ev?.name_es || ev?.name_en || "";
    return ev?.name_en || ev?.name_es || "";
  };

  const formatRecurrenceLabel = (value?: string | null) => {
    const normalized = String(value || "").toLowerCase();

    if (normalized === "weekly") return t.weekly;
    if (normalized === "monthly") return t.monthly;
    if (normalized === "selectedmonth") return t.selectedMonth;
    if (normalized === "yearly") return t.yearly;

    return value || t.custom;
  };

  const formatMonthName = (monthNumber?: number | null) => {
    if (!monthNumber || monthNumber < 1 || monthNumber > 12) return "";

    return format(new Date(2020, monthNumber - 1, 1), "MMM", {
      locale: dateLocale,
    });
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [panelPos, setPanelPos] = useState({
    x: 20,
    y: isMobile ? window.innerHeight - 420 : 80,
  });

  if (!showCalendarPanel) return null;

  const panelTitle =
    mode === "Scheduled" ? t.scheduledEvents : t.recurringEvents;

  const events = mode === "Scheduled" ? scheduledEvents : recurringEvents;

  const visibleIds =
    mode === "Scheduled" ? visibleScheduledIds : visibleRecurringIds;

  const setVisibleIds =
    mode === "Scheduled" ? setVisibleScheduledIds : setVisibleRecurringIds;

  const supportsRecurrenceDetails = mode === "Recurring";

  const toggleVisibility = (id: string) =>
    setVisibleIds?.((prev: string[]) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );

  const toggleAll = () => {
    if (visibleIds?.length === events?.length) {
      setVisibleIds?.([]);
    } else {
      setVisibleIds?.(events?.map((e) => e.id));
    }
  };

  // const now = new Date();
  // const filteredEvents = events
  //   // .filter((e: any) => statusFilter[e.status])
  //   .filter((e: SchedulerForm) => {
  //     if (mode !== "Scheduled") return true;
  //     const eventTime = new Date(e.date as string);
  //     const isPast = isBefore(eventTime, now);
  //     if (isPast && !statusFilter.Past) return false;
  //     if (!isPast && !statusFilter.Future) return false;
  //     return true;
  //   });

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCalendarPanel(false);
  };

  return (
    <>
      <div
        className="absolute md:fixed inset-0 z-9998 h-full"
        onClick={() => setShowCalendarPanel(false)}
      />

      <aside
        className={`
          absolute top-0 md:fixed z-9999 bg-white shadow-2xl
          transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
          ${
            isMobile
              ? `left-0 right-0 bottom-0 h-[80vh] rounded-t-2xl ${
                  showCalendarPanel ? "translate-y-0" : "translate-y-full"
                }`
              : `top-0 right-0 h-full w-80 ${
                  showCalendarPanel ? "translate-x-0" : "translate-x-full"
                }`
          }
        `}
      >
        <div
          className={`${
            mode === "Scheduled" ? "bg-blue-600" : "bg-purple-600"
          }  text-white font-semibold px-5 py-5 select-none cursor-move flex justify-between items-center`}
        >
          <div>{panelTitle}</div>
          <button onClick={handleClose}>
            <IoClose className="text-2xl hover:text-red-500 transition cursor-pointer" />
          </button>
        </div>

        <div className="pt-3 p-5">
          <div className="flex justify-between items-center gap-2 text-sm mb-3">
            <div>
              <input
                type="checkbox"
                checked={visibleIds?.length === events?.length}
                onChange={toggleAll}
              />
              <span className="text-gray-700 ml-2">
                {visibleIds?.length === events?.length
                  ? t.unselectAll
                  : t.selectAll}
              </span>
            </div>

            <div className="text-sm">
              {t.showing}:{" "}
              <span className="font-normal">
                {events?.filter((x) => visibleIds?.includes(x?.id)).length}
              </span>
              /<span className="font-semibold">{events?.length}</span>
            </div>
          </div>

          {events?.length > 0 ? (
            <ul className="space-y-2 max-h-full overflow-y-auto text-sm pr-1">
              {events?.map((ev) => {
                const isExpanded = expandedId === ev?.id;
                const isPast =
                  mode === "Scheduled" &&
                  isBefore(new Date(ev.date as string), new Date());

                return (
                  <li
                    key={ev?.id}
                    className={`border border-slate-200 rounded-lg p-2 bg-white transition-all duration-200 ${
                      isPast ? "opacity-60 grayscale" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={visibleIds?.includes(ev?.id)}
                        onChange={() => toggleVisibility(ev?.id)}
                      />

                      <div className="flex-1 flex justify-between items-center gap-2 min-w-0">
                        <span
                          className={`truncate ${
                            ev?.status === "Paused"
                              ? "text-red-600"
                              : ev?.status === "Deleted"
                              ? "text-gray-500 line-through"
                              : mode === "Scheduled"
                              ? "text-sky-700"
                              : "text-purple-700"
                          }`}
                          title={getLocalizedEventName(ev)}
                        >
                          {getLocalizedEventName(ev)}
                        </span>

                        {/* Fix */}
                        {/* <button
                          onClick={() => onEventClick?.(ev)}
                          className="text-gray-600 hover:text-gray-900 shrink-0"
                        >
                          <FiEdit2 size={14} />
                        </button> */}

                        <button
                          onClick={() =>
                            setExpandedId?.(isExpanded ? null : ev?.id)
                          }
                          className="text-gray-500 hover:text-gray-700 shrink-0 cursor-pointer"
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
                      <div className="mt-2 text-xs text-gray-600 space-y-1 border-t border-slate-200 pt-2">
                        <div>
                          <span className="font-semibold">{t.when}:</span>{" "}
                          {ev?.date
                            ? format(new Date(ev?.date), "MMM d, yyyy", {
                                locale: dateLocale,
                              })
                            : ""}
                        </div>

                        {/* {ev?.executionTime && (
                          <div>
                            <span className="font-semibold">Time:</span>{" "}
                            {ev?.executionTime
                              ? format(new Date(`${ev?.executionTime}`), "h:mm a")
                              : ""}
                          </div>
                        )} */}

                        {supportsRecurrenceDetails && (
                          <>
                            <div>
                              <span className="font-semibold">
                                {t.recurrence}:
                              </span>{" "}
                              {formatRecurrenceLabel(ev?.recurrence)}
                            </div>

                            {ev?.recurrence === "Weekly" && (
                              <div>
                                <span className="font-semibold">{t.days}:</span>{" "}
                                {allDaysSelected || !ev?.daysOfWeekCsv
                                  ? t.everyDay
                                  : ev?.daysOfWeekCsv?.toUpperCase()}
                              </div>
                            )}

                            {(ev?.dayOfMonth as number) > 0 && (
                              <div>
                                <span className="font-semibold">
                                  {t.dayOfMonth}:
                                </span>{" "}
                                {ev?.dayOfMonth}
                              </div>
                            )}

                            {(ev?.month as number) > 0 && (
                              <div>
                                <span className="font-semibold">
                                  {t.month}:
                                </span>{" "}
                                {formatMonthName(ev?.month as number)}
                              </div>
                            )}
                          </>
                        )}

                        {(ev?.recurrence === "Monthly" ||
                          ev?.recurrence === "SelectedMonth") && (
                          <div>
                            <span className="font-semibold">{t.months}:</span>{" "}
                            {allMonthsSelected || !ev?.monthsCsv
                              ? t.everyMonth
                              : ev?.monthsCsv?.toUpperCase()}
                          </div>
                        )}

                        {ev?.executionTime && mode === "Recurring" ? (
                          <div>
                            <span className="font-semibold">{t.time}:</span>{" "}
                            {format(
                              new Date(`1970-01-01T${ev?.time}`),
                              "h:mm a",
                              { locale: dateLocale }
                            )}
                          </div>
                        ) : (
                          <div>
                            <span className="font-semibold">{t.time}:</span>{" "}
                            {format(new Date(ev?.date as string), "h:mm a", {
                              locale: dateLocale,
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-gray-500 text-sm my-2 px-8 py-4">
              {t.noEvents}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CalendarPanel;
