"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiRepeat } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

import { useLanguage } from "../context/language";
import { calendarThemes } from "../helpers/calendar";
import { SchedulerForm } from "../lib/interfaces/events";

const scheduledTheme =
  "border-sky-300/80 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_10px_25px_rgba(14,165,233,0.28)] hover:from-sky-600 hover:to-blue-700";

const recurringTheme =
  "border-violet-300/80 bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-[0_10px_25px_rgba(99,102,241,0.28)] hover:from-violet-600 hover:to-indigo-700";

const CalendarToolbar = ({
  handleToday,
  recurringEvents,
  scheduledEvents,
  showScheduled,
  setShowScheduled,
  showRecurring,
  setShowRecurring,
  clearSchedulerForm,
  setShowCalendarPanel,
  setPanelMode,
  handlePrevMonth,
  handleNextMonth,
  calendarMode,
  calendarThemeKey,
}: {
  handleToday: () => void;
  recurringEvents: SchedulerForm[];
  scheduledEvents: SchedulerForm[];
  showScheduled: boolean;
  setShowScheduled: React.Dispatch<React.SetStateAction<boolean>>;
  showRecurring: boolean;
  setShowRecurring: React.Dispatch<React.SetStateAction<boolean>>;
  clearSchedulerForm: () => void;
  setShowCalendarPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setPanelMode: React.Dispatch<React.SetStateAction<"Recurring" | "Scheduled">>;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  calendarMode: "admin" | "member";
  calendarThemeKey: keyof typeof calendarThemes;
}) => {
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";

  const t = {
    visibilityOptions: isSpanish
      ? "Opciones de Visibilidad"
      : "Visibility Options",
    jumpToToday: isSpanish ? "Ir a Hoy" : "Jump to Today",
    slots: isSpanish ? "Espacios" : "Slots",
    conflicts: isSpanish ? "Conflictos" : "Conflicts",
    scheduled: isSpanish ? "Programados" : "Scheduled",
    recurring: isSpanish ? "Recurrentes" : "Recurring",
    viewAllScheduled: isSpanish
      ? "Ver Todos los Programados"
      : "View All Scheduled",
    viewAllRecurrences: isSpanish
      ? "Ver Todas las Recurrencias"
      : "View All Recurrences",
    legend: isSpanish ? "Leyenda" : "Legend",
    close: isSpanish ? "Cerrar" : "Close",
    deleted: isSpanish ? "Eliminado" : "Deleted",
  };

  const pathname = usePathname();
  const [showMobileLegend, setShowMobileLegend] = useState(false);
  const [showMobileToolbar, setShowMobileToolbar] = useState(false);
  const legendRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const theme =
    calendarThemes[calendarThemeKey as keyof typeof calendarThemes] ||
    calendarThemes.ocean;

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    if (showMobileLegend && dragRef.current) {
      const { innerWidth, innerHeight } = window;
      const el = dragRef.current;
      const rect = el.getBoundingClientRect();
      setPos({
        x: (innerWidth - rect.width) / 2,
        y: (innerHeight - rect.height) / 2,
      });
    }
  }, [showMobileLegend]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (legendRef.current && !legendRef.current.contains(e.target as Node)) {
        setShowMobileLegend(false);
      }
    };

    if (showMobileLegend) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMobileLegend]);

  useEffect(() => {
    if (!showMobileLegend) return;

    const el = dragRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;
    let dragging = false;

    const pointerDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = posRef.current.x;
      initialY = posRef.current.y;
      el.setPointerCapture(e.pointerId);
    };

    const pointerMove = (e: PointerEvent) => {
      if (!dragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setPos({
        x: Math.max(0, initialX + dx),
        y: Math.max(0, initialY + dy),
      });
    };

    const pointerUp = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("pointerdown", pointerDown);
    el.addEventListener("pointermove", pointerMove);
    el.addEventListener("pointerup", pointerUp);
    el.addEventListener("pointercancel", pointerUp);
    el.addEventListener("pointerleave", pointerUp);

    return () => {
      el.removeEventListener("pointerdown", pointerDown);
      el.removeEventListener("pointermove", pointerMove);
      el.removeEventListener("pointerup", pointerUp);
      el.removeEventListener("pointercancel", pointerUp);
      el.removeEventListener("pointerleave", pointerUp);
    };
  }, [showMobileLegend]);

  return (
    <div className="relative">
      <div
        className={`mb-3 rounded-2xl border shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-sm md:hidden ${theme.mobileHeader}`}
      >
        {calendarMode === "member" ? (
          <div className="flex items-center justify-between gap-2 p-2.5">
            <GrFormPreviousLink
              onClick={handlePrevMonth}
              size={34}
              className={`cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-white/60 ${theme.todayText}`}
            />

            <button
              onClick={handleToday}
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-blue-300/70 bg-linear-to-r from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-px"
            >
              <span className="relative flex items-center justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                {t.jumpToToday}
              </span>
            </button>

            <GrFormNextLink
              onClick={handleNextMonth}
              size={34}
              className={`cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-white/60 ${theme.todayText}`}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2 p-2.5">
              <GrFormPreviousLink
                onClick={handlePrevMonth}
                size={34}
                className={`cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-white/60 ${theme.todayText}`}
              />

              <button
                type="button"
                onClick={() => setShowMobileToolbar((prev) => !prev)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] shadow-sm transition hover:bg-white ${theme.eyebrow}`}
              >
                {t.visibilityOptions}
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    showMobileToolbar ? "rotate-180" : ""
                  }`}
                />
              </button>

              <GrFormNextLink
                onClick={handleNextMonth}
                size={34}
                className={`cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-white/60 ${theme.todayText}`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                showMobileToolbar
                  ? "max-h-140 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3 border-t border-white/70 p-3">
                <button
                  onClick={handleToday}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-blue-300/70 bg-linear-to-r from-teal-500 to-emerald-600 
                  px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-px"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                    {t.jumpToToday}
                  </span>
                </button>

                {pathname.includes("booking") && (
                  <div
                    className={`grid grid-cols-2 gap-2 rounded-2xl border p-3 text-xs ${theme.mobileGrid}`}
                  >
                    <LegendDot color="#22C55E" label={t.slots} />
                    <LegendDot color="#EF4444" label={t.conflicts} />
                  </div>
                )}

                {calendarMode === "admin" && (
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 ${
                        showScheduled
                          ? scheduledTheme
                          : "border-sky-200 bg-sky-50 text-sky-700"
                      } ${
                        scheduledEvents?.length === 0
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={showScheduled}
                        disabled={scheduledEvents?.length === 0}
                        onChange={() => {
                          clearSchedulerForm();
                          setShowScheduled((v: boolean) => !v);
                        }}
                        className="accent-sky-500"
                      />
                      <FaRegClock size={12} />
                      <span>{t.scheduled}</span>
                    </label>

                    <label
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 ${
                        showRecurring
                          ? recurringTheme
                          : "border-violet-200 bg-violet-50 text-violet-700"
                      } ${
                        recurringEvents?.length === 0
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={showRecurring}
                        disabled={recurringEvents?.length === 0}
                        onChange={() => {
                          clearSchedulerForm();
                          setShowRecurring((v: boolean) => !v);
                        }}
                        className="accent-violet-500"
                      />
                      <FiRepeat size={12} />
                      <span>{t.recurring}</span>
                    </label>
                  </div>
                )}

                {calendarMode === "admin" && (
                  <div className="grid-cols-1 gap-2 hidden md:grid">
                    {showScheduled && scheduledEvents?.length > 0 && (
                      <button
                        disabled={scheduledEvents?.length === 0}
                        onClick={() => {
                          setPanelMode("Scheduled");
                          setShowCalendarPanel((v: boolean) => !v);
                        }}
                        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-bold transition disabled:opacity-60 ${scheduledTheme}`}
                      >
                        <FaRegClock size={12} /> {t.viewAllScheduled}
                      </button>
                    )}

                    {showRecurring && recurringEvents?.length > 0 && (
                      <button
                        disabled={recurringEvents?.length === 0}
                        onClick={() => {
                          setPanelMode("Recurring");
                          setShowCalendarPanel((v: boolean) => !v);
                        }}
                        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-bold transition disabled:opacity-60 ${recurringTheme}`}
                      >
                        <FiRepeat size={12} /> {t.viewAllRecurrences}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={`mb-4 hidden rounded-2xl border backdrop-blur-sm shadow-[0_14px_34px_rgba(15,23,42,0.08)] md:block ${theme.mobileHeader}`}
      >
        <div className="flex items-center justify-between gap-2 p-3">
          <GrFormPreviousLink
            onClick={handlePrevMonth}
            size={36}
            className={`cursor-pointer rounded-full p-2 transition-all duration-500 hover:bg-white/60 hover:shadow-sm ${theme.todayText}`}
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleToday}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-300/70 bg-linear-to-r from-teal-500 to-emerald-600 
              px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-px
              hover:from-sky-600 hover:to-blue-700 hover:shadow-[0_14px_35px_rgba(14,165,233,0.38)]"
            >
              <span
                className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 
              group-hover:opacity-100"
              />

              <span className="relative flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                {t.jumpToToday}
              </span>
            </button>

            {calendarMode !== "member" && pathname.includes("booking") && (
              <div
                className={`hidden items-center gap-4 border-l pl-3 text-xs select-none sm:flex ${theme.muted}`}
              >
                <LegendDot color="#22C55E" label={t.slots} />
                <LegendDot color="#EF4444" label={t.conflicts} />
              </div>
            )}

            {calendarMode === "admin" && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="hidden h-6 w-px bg-white/70 md:inline" />

                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 ${
                    showScheduled
                      ? scheduledTheme
                      : "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                  } ${
                    scheduledEvents?.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={showScheduled}
                    disabled={scheduledEvents?.length === 0}
                    onChange={() => {
                      clearSchedulerForm();
                      setShowScheduled((v: boolean) => !v);
                    }}
                    className="accent-sky-500"
                  />
                  <FaRegClock size={12} />
                  <span>{t.scheduled}</span>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black transition-all duration-200 ${
                    showRecurring
                      ? recurringTheme
                      : "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
                  } ${
                    recurringEvents?.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={showRecurring}
                    disabled={recurringEvents?.length === 0}
                    onChange={() => {
                      clearSchedulerForm();
                      setShowRecurring((v: boolean) => !v);
                    }}
                    className="accent-violet-500"
                  />
                  <FiRepeat size={12} />
                  <span>{t.recurring}</span>
                </label>

                <div className="hidden h-6 w-px bg-white/70 md:inline" />
              </div>
            )}

            {calendarMode === "admin" && (
              <div className="items-center gap-2 flex">
                {showScheduled && scheduledEvents?.length > 0 && (
                  <button
                    disabled={scheduledEvents?.length === 0}
                    onClick={() => {
                      setPanelMode("Scheduled");
                      setShowCalendarPanel((v: boolean) => !v);
                    }}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition disabled:opacity-60 ${scheduledTheme}`}
                  >
                    <FaRegClock size={12} /> {t.viewAllScheduled}
                  </button>
                )}

                {showRecurring && recurringEvents?.length > 0 && (
                  <button
                    disabled={recurringEvents?.length === 0}
                    onClick={() => {
                      setPanelMode("Recurring");
                      setShowCalendarPanel((v: boolean) => !v);
                    }}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition disabled:opacity-60 ${recurringTheme}`}
                  >
                    <FiRepeat size={12} /> {t.viewAllRecurrences}
                  </button>
                )}
              </div>
            )}
          </div>

          <GrFormNextLink
            onClick={handleNextMonth}
            size={36}
            className={`cursor-pointer rounded-full p-2 transition-all duration-500 hover:bg-white/60 hover:shadow-sm ${theme.todayText}`}
          />
        </div>
      </div>

      {showMobileLegend && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[1px]">
          <div
            ref={legendRef}
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
          >
            <div className="w-64 overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
              <div
                ref={dragRef}
                className="flex cursor-move items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-slate-800">
                  {t.legend}
                </p>
                <button
                  type="button"
                  onClick={() => setShowMobileLegend(false)}
                  className="text-xs text-slate-500 transition hover:text-slate-800"
                >
                  {t.close}
                </button>
              </div>

              <div className="space-y-3 p-4 text-sm text-slate-700">
                <LegendDot color="#22C55E" label={t.slots} />
                <LegendDot color="#EF4444" label={t.conflicts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarToolbar;

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="relative flex items-center gap-2 select-none">
    <div className="relative flex h-3 w-3 items-center justify-center">
      <span
        className="h-3 w-3 rounded-full shadow-sm ring-2 ring-white"
        style={{ backgroundColor: color }}
      />

      {(label === "Deleted" || label === "Eliminado") && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="block h-px w-3.5 bg-gray-600" />
        </span>
      )}
    </div>

    <span className="text-slate-700">{label}</span>
  </div>
);
