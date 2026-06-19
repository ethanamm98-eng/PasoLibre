"use client";
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { IoEyeOutline, IoCalendarOutline } from "react-icons/io5";

import { useOutsideClick, useDrag } from "../helpers/calendar";
import { supabase } from "../lib/supabase/supabaseClient";
import { calendarThemes } from "../helpers/calendar";
import { useLanguage } from "../context/language";

import CalendarListView from "./CalendarListView";
import CalendarWeekView from "./CalendarWeekView";
import CalendarMonthView from "./CalendarMonthView";
import { SchedulerForm } from "../lib/interfaces/events";

type CalendarThemeKey = "ocean" | "midnight" | "rose" | "emerald" | "sunset";

const CalendarMain = ({
  selectedEvent,
  handleCalendarClick,
  setActiveSchedulerTab,
  setShowSchedulerForm,
  setRecurrenceSettingsMode,
  setSchedulerForm,
  setMonthSelected,
  setYearSelected,
  calendarMode,
  setCalendarMode,
  attendanceAnchor,
  setAttendanceAnchor,
  attendanceEvent,
  setAttendanceEvent,
  handleOpenCreate,
  calendarThemeKey,
  setCalendarThemeKey,
  loadEvents,
  eventsLoading,
  events,
  setSelectedCalendarDate,
}: {
  selectedEvent: SchedulerForm | null;
  handleCalendarClick: ({
    clickEvent,
    event,
  }: {
    clickEvent: React.MouseEvent;
    event: SchedulerForm;
  }) => void;
  setActiveSchedulerTab: (tab: string) => void;
  setShowSchedulerForm: (show: boolean) => void;
  setRecurrenceSettingsMode: (mode: string) => void;
  setSchedulerForm: (form: SchedulerForm) => void;
  setMonthSelected: (month: number | null) => void;
  setYearSelected: (year: number | null) => void;
  calendarMode: "admin" | "member";
  setCalendarMode: (mode: "admin" | "member") => void;
  attendanceAnchor: DOMRect | null;
  setAttendanceAnchor: (anchor: DOMRect | null) => void;
  attendanceEvent: SchedulerForm;
  setAttendanceEvent: (event: SchedulerForm | null) => void;
  handleOpenCreate: () => void;
  calendarThemeKey: CalendarThemeKey;
  setCalendarThemeKey: (key: CalendarThemeKey) => void;
  loadEvents: () => void;
  eventsLoading: boolean;
  events: SchedulerForm[];
  setSelectedCalendarDate: (date: string) => void;
}) => {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";

  const t = {
    verifyingAccess: isSpanish
      ? "Verificando acceso..."
      : "Verifying access...",
    calendar: isSpanish ? "Calendario" : "Calendar",
    eventPlanner: isSpanish ? "Planificador de Eventos" : "Event Planner",
    adminDescription: isSpanish
      ? "Administra eventos programados y recurrentes"
      : "Manage scheduled and recurring events",
    memberDescription: isSpanish
      ? "Explora próximos eventos y confirma tu asistencia"
      : "Browse upcoming events and confirm attendance",
    scheduleNewEvent: isSpanish ? "Crear Evento Nuevo" : "Schedule New Event",
    scheduleNewEventMobile: isSpanish ? "Crear Evento" : "New Event",
    memberView: isSpanish ? "Modo de Miembro" : "Member View",
    adminView: isSpanish ? "Modo de Admin" : "Admin View",
    memberViewMobile: isSpanish ? "Modo Miembro" : "Member Mode",
    adminViewMobile: isSpanish ? "Modo Admin" : "Admin Mode",
    week: isSpanish ? "Semana" : "Week",
    month: isSpanish ? "Mes" : "Month",
    list: isSpanish ? "Lista" : "List",
    loadingEvents: isSpanish ? "Cargando eventos..." : "Loading events...",
  };

  const [calendarView, setCalendarView] = useState<"list" | "week" | "month">(
    "month"
  );

  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitted] = useState(false);

  const theme = calendarThemes[calendarThemeKey];

  const { handleMouseDown } = useDrag(panelRef);

  useOutsideClick(panelRef as MutableRefObject<HTMLDivElement>, () => {
    setShowSchedulerForm(false);
  });

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
    let mounted = true;

    const validateAccess = async () => {
      try {
        setAuthLoading(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        const adminUser =
          (profileData?.role || "").toString().toLowerCase() === "admin" ||
          (profileData?.role || "").toString().toLowerCase() === "super_admin";

        if (!mounted) return;

        setIsAdmin(adminUser);
        setCalendarMode(adminUser ? "admin" : "member");
      } catch (error) {
        console.error("Calendar auth error:", error);
        router.replace("/login");
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    validateAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.replace("/login");
      else loadEvents();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setCalendarMode, submitted]);

  useEffect(() => {
    if (!authLoading) loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  const clearSchedulerForm = () => {
    setSchedulerForm({
      id: "",
      imageUrl: "",
      name_en: "",
      name_es: "",
      description_en: "",
      description_es: "",
      details_en: "",
      details_es: "",
      date: "",
      time: "",
      scheduleType: "one-time",
      streetAddress: "",
      city: "",
      country: "",
      zipCode: "",
      locationUrl: "",
      price: 0,
      privacy: "Public",
      type: "event",
      recurrence: "",
      daysOfWeekCsv: "",
      dayOfMonth: 0,
      month: 0,
      monthsCsv: "",
      status: "published",
      createAttendanceSheet: false,
      includeForm: false,
      color: "#2563eb",
      dressCode: "",
      recurrence_excluded_dates: [],
      hosts: [],
      instructors: [],
    });

    setRecurrenceSettingsMode("create");
    setActiveSchedulerTab("schedule");
  };

  const normalizedEvents = useMemo(() => events, [events]);

  const sharedViewProps = {
    events: normalizedEvents,
    selectedEvent,
    onEventClick: handleCalendarClick,
    panelRef,
    handleMouseDown,
    setMonthSelected,
    setYearSelected,
    attendanceAnchor,
    setAttendanceAnchor,
    attendanceEvent,
    setAttendanceEvent,
    calendarThemeKey,
    setCalendarThemeKey,
  };

  const renderCalendarView = () => {
    switch (calendarView) {
      case "list":
        return (
          <CalendarListView
            {...sharedViewProps}
            calendarMode={calendarMode}
            events={normalizedEvents}
            onEventClick={handleCalendarClick}
            calendarThemeKey={calendarThemeKey}
            setCalendarThemeKey={setCalendarThemeKey}
            // clearSchedulerForm={clearSchedulerForm}
          />
        );

      case "week":
        return (
          <CalendarWeekView
            {...sharedViewProps}
            events={normalizedEvents}
            calendarMode={calendarMode}
            calendarThemeKey={calendarThemeKey}
            setCalendarThemeKey={setCalendarThemeKey}
            setSelectedCalendarDate={setSelectedCalendarDate}
            onEventClick={handleCalendarClick}
            onOpenScheduleForm={handleOpenCreate}
            onOpenRecurringForm={() => setRecurrenceSettingsMode("edit")}
            clearSchedulerForm={clearSchedulerForm}
          />
        );

      case "month":
        return (
          <CalendarMonthView
            {...sharedViewProps}
            events={normalizedEvents}
            calendarMode={calendarMode}
            clearSchedulerForm={clearSchedulerForm}
            calendarThemeKey={calendarThemeKey}
            setCalendarThemeKey={setCalendarThemeKey}
            setSelectedCalendarDate={setSelectedCalendarDate}
            onEventClick={handleCalendarClick}
            onOpenScheduleForm={handleOpenCreate}
            onOpenRecurringForm={() => setRecurrenceSettingsMode("edit")}
          />
        );

      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <div
        className={`mb-2 overflow-hidden rounded-3xl border border-slate-300 shadow-2xl backdrop-blur-sm ${theme.shell}`}
      >
        <div className="flex min-h-55 items-center justify-center text-gray-500">
          {t.verifyingAccess}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mb-2 overflow-hidden rounded-3xl border border-slate-300 shadow-2xl backdrop-blur-sm ${theme.shell}`}
    >
      <div
        className={`relative rounded-t-3xl border-b px-10 pb-4 pt-6 backdrop-blur ${theme.mobileHeader}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_28%)]" />

        <div className="relative flex-row items-center justify-between md:flex">
          <div>
            <p
              className={`text-center text-xs font-black uppercase tracking-[0.18em] md:text-left ${theme?.eyebrow}`}
            >
              {t?.calendar}
            </p>

            <h1
              className={`text-center text-3xl font-semibold tracking-tight md:text-left ${theme?.title}`}
            >
              {t?.eventPlanner}
            </h1>

            <p
              className={`mt-1 text-center text-sm md:text-left ${theme?.muted}`}
            >
              {calendarMode === "admin"
                ? t?.adminDescription
                : t?.memberDescription}
            </p>
          </div>

          <div className="mt-4 flex flex-row-reverse gap-2 md:mt-0">
            {isAdmin && calendarMode === "admin" && (
              <button
                onClick={handleOpenCreate}
                type="button"
                className="mx-auto cursor-pointer rounded-xl border border-white/60 bg-linear-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm 
                font-medium text-white shadow-sm transition hhover:from-blue-600/90 hover:to-blue-600 hover:shadow-lg active:scale-[0.98]"
              >
                <IoCalendarOutline className="my-auto mb-1 mr-1 inline h-4 w-4" />
                <span className="hidden md:inline">{t?.scheduleNewEvent}</span>
                <span className="ml-1 inline-flex text-xs text-white md:hidden">
                  {t.scheduleNewEventMobile}
                </span>
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() =>
                  setCalendarMode(calendarMode === "admin" ? "member" : "admin")
                }
                type="button"
                className="mx-auto cursor-pointer rounded-xl border border-sky-500/50 bg-linear-to-r from-sky-400 to-sky-500 px-5 py-2 text-sm font-medium 
                text-white shadow-md transition hover:from-sky-400/90 hover:to-sky-400 hover:shadow-lg active:scale-[0.98] duration-500"
              >
                <IoEyeOutline className="my-auto mb-0.5 mr-1 inline h-4 w-4" />
                <span className="hidden md:inline">
                  {calendarMode === "admin" ? t.memberView : t.adminView}
                </span>
                <span className="inline-flex text-xs text-white md:hidden">
                  {calendarMode === "admin"
                    ? t.memberViewMobile
                    : t.adminViewMobile}
                </span>
              </button>
            )}
          </div>
        </div>

        {isAdmin && calendarMode === "admin" && (
          <div className="mt-6 flex justify-center">
            <div className="flex rounded-xl border border-slate-100 bg-slate-100 p-1 shadow-inner backdrop-blur-sm">
              {["list", "week", "month"].map((mode) => {
                const active = calendarView === mode;

                const label =
                  mode === "week"
                    ? t.week
                    : mode === "month"
                    ? t.month
                    : t.list;

                return (
                  <button
                    key={mode}
                    onClick={() =>
                      setCalendarView(mode as "list" | "week" | "month")
                    }
                    className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                      active
                        ? "border border-slate-200 bg-white text-slate-900 shadow-sm"
                        : `${theme.muted} hover:bg-white/60 hover:text-gray-900`
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {eventsLoading ? (
        <div
          className={`flex my-auto h-full min-h-45 items-center justify-center text-gray-400 ${theme.dayCell}`}
        >
          {t.loadingEvents}
        </div>
      ) : (
        renderCalendarView()
      )}
    </div>
  );
};

export default CalendarMain;
