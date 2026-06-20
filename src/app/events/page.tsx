"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useDrag } from "../helpers/calendar";
import { supabase } from "../lib/supabase/supabaseClient";
import { calendarThemes } from "../helpers/calendar";
import { SchedulerForm, DbEvent } from "../lib/interfaces/events";

import Navbar from "../components/NavBar";
import CalendarMain from "../components/CalendarMain";
import EventSchedulerModal from "../components/EventSchedulerModal";
import Footer from "../components/Footer";

type ProfileRecord = {
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  is_approved?: boolean;
  account_status?: "active" | "suspended" | null;
};

type CalendarThemeKey = "ocean" | "midnight" | "rose" | "emerald" | "sunset";

const getDefaultDateTime = () => {
  const now = new Date();

  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;

  const time = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  return { date, time };
};

const buildEmptySchedulerForm = (): SchedulerForm => {
  const { date, time } = getDefaultDateTime();

  return {
    id: "",
    imageUrl: "",
    name_en: "",
    name_es: "",
    description_en: "",
    description_es: "",
    details_en: "",
    details_es: "",
    date,
    time,
    scheduleType: "one-time",
    streetAddress: "",
    city: "",
    country: "",
    zipCode: "",
    locationUrl: "",
    price: 0,
    privacy: "Public",
    type: "Social",
    recurrence: "",
    daysOfWeekCsv: "",
    dayOfMonth: "",
    month: "",
    monthsCsv: "",
    status: "published",
    createAttendanceSheet: false,
    includeForm: false,
    color: "#2563eb",
    recurrence_excluded_dates: [],
    hosts: [],
    instructors: [],
    audioEnabled: false,
    audioTrackId: "",
    audioTrackName: "",
    audioArtistName: "",
    audioArtworkUrl: "",
    audioPreviewUrl: "",
    audioTrackViewUrl: "",
    createdAt: "",
  };
};

const Page = () => {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [authLoading, setAuthLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [accessMessage, setAccessMessage] = useState("");

  const [calendarMode, setCalendarMode] = useState<"admin" | "member">(
    "member"
  );
  const [showForm, setShowForm] = useState(false);
  const [createdBy, setCreatedBy] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [, setReloadPageData] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    string | null
  >(null);

  const [schedulerForm, setSchedulerForm] = useState<SchedulerForm>(
    buildEmptySchedulerForm()
  );

  const [eventsLoading, setEventsLoading] = useState(true);
  const [events, setEvents] = useState<SchedulerForm[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEdit, setIsEdit] = useState(false);

  const [attendanceAnchor, setAttendanceAnchor] = useState<DOMRect | null>(
    null
  );
  const [attendanceEvent, setAttendanceEvent] = useState<SchedulerForm | null>(
    null
  );

  const [calendarThemeKey, setCalendarThemeKey] =
    useState<CalendarThemeKey>("ocean");

  const theme = calendarThemes[calendarThemeKey];

  const { handleMouseDown } = useDrag(formRef);

  useEffect(() => {
    const savedTheme = sessionStorage?.getItem("calendarTheme");

    if (savedTheme && savedTheme in calendarThemes) {
      setCalendarThemeKey(savedTheme as CalendarThemeKey);
    }
  }, []);

  useEffect(() => {
    sessionStorage?.setItem("calendarTheme", calendarThemeKey);
  }, [calendarThemeKey]);

  useEffect(() => {
    const validateAccess = async () => {
      try {
        setAuthLoading(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select(
            "first_name, last_name, role, is_approved, account_status, language_preference"
          )
          .eq("id", user.id)
          .maybeSingle<ProfileRecord>();

        if (profileError || !profile) {
          setAccessDenied(true);
          setAccessMessage(
            "We could not verify your account profile for events access."
          );
          return;
        }

        if (!profile.is_approved) {
          setAccessDenied(true);
          setAccessMessage(
            "Your account is pending approval. You will be able to access events once approved."
          );
          return;
        }

        if (profile.account_status === "suspended") {
          setAccessDenied(true);
          setAccessMessage(
            "Your account has been suspended. Please contact an administrator."
          );
          return;
        }

        const normalizedRole = (profile.role || "member").toLowerCase();
        const isAdmin =
          normalizedRole === "admin" || normalizedRole === "super_admin";

        setCalendarMode(isAdmin ? "admin" : "member");

        const fullName =
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
          user.email ||
          "User";

        setCreatedBy(fullName);
      } catch (error) {
        console.error("Events access validation error:", error);
        setAccessDenied(true);
        setAccessMessage("Unable to verify access to the events page.");
      } finally {
        setAuthLoading(false);
      }
    };

    validateAccess();
  }, [router]);

  // Refactoring

  const padTime = (value: string | null) => {
    if (!value) return "00:00:00";

    const parts = value.split(":");
    const hours = parts[0] ?? "00";
    const minutes = parts[1] ?? "00";
    const seconds = parts[2] ?? "00";

    return `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}:${seconds.padStart(2, "0")}`;
  };

  const buildStartIso = (date: string | null, time: string | null) => {
    if (!date) return "";
    return `${date}T${padTime(time)}`;
  };

  const buildEndIso = (date: string | null, time: string | null) => {
    if (!date) return "";

    const safeTime = padTime(time);
    const start = new Date(`${date}T${safeTime}`);

    if (Number.isNaN(start.getTime())) {
      return `${date}T01:00:00`;
    }

    start.setHours(start.getHours() + 1);

    const year = start.getFullYear();
    const month = String(start.getMonth() + 1).padStart(2, "0");
    const day = String(start.getDate()).padStart(2, "0");
    const hours = String(start.getHours()).padStart(2, "0");
    const minutes = String(start.getMinutes()).padStart(2, "0");
    const seconds = String(start.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const mapDbEventToCalendarEvent = (ev: DbEvent) => {
    return {
      id: ev.id,
      name_en: ev.name_en || "",
      name_es: ev.name_es || "",
      description_en: ev.description_en || "",
      description_es: ev.description_es || "",
      details_en: ev.details_en || "",
      details_es: ev.details_es || "",
      start: buildStartIso(ev.date, ev.time),
      end: buildEndIso(ev.date, ev.time),
      date: ev.date || "",
      time: ev.time || "",
      scheduleType:
        (ev.schedule_type as "one-time" | "recurrent") || "one-time",
      recurrence: ev.recurrence || "",
      daysOfWeekCsv: ev.days_of_week_csv || "",
      dayOfMonth: ev.day_of_month ?? 0,
      month: ev.month ?? 0,
      monthsCsv: ev.months_csv || "",
      streetAddress: ev.street_address || "",
      city: ev.city || "",
      country: ev.country || "",
      zipCode: ev.zip_code || "",
      locationUrl: ev.location_url || "",
      price: ev.price ?? 0,
      privacy: ev.privacy || "Public",
      type: ev.type || "event",
      status: (ev.status || "published").toLowerCase(),
      createAttendanceSheet: !!ev.create_attendance_sheet,
      includeForm: !!ev.include_form,
      color: ev.color || "",
      imageUrl: ev.image_url || "",
      dressCode: ev?.dress_code || "",
      recurrence_excluded_dates: ev?.recurrence_excluded_dates || [],
      hosts: ev.hosts || [],
      instructors: ev.instructors || [],
      audioEnabled: ev.audio_enabled || false,
      audioTrackId: ev.audio_track_id || "",
      audioTrackName: ev.audio_track_name || "",
      audioArtistName: ev.audio_artist_name || "",
      audioArtworkUrl: ev.audio_artwork_url || "",
      audioPreviewUrl: ev.audio_preview_url || "",
      audioTrackViewUrl: ev.audio_track_view_url || "",
      createdAt: ev?.created_at || "",
    };
  };

  const loadEvents = async () => {
    try {
      setEventsLoading(true);

      const { data, error } = await supabase
        .from("events")
        .select(
          `
          id,
          name_en,
          name_es,
          description_en,
          description_es,
          details_en,
          details_es,
          date,
          time,
          schedule_type,
          recurrence,
          days_of_week_csv,
          day_of_month,
          month,
          months_csv,
          street_address,
          city,
          country,
          zip_code,
          location_url,
          price,
          privacy,
          type,
          status,
          create_attendance_sheet,
          include_form,
          image_url,
          color,
          created_at,
          dress_code,
          recurrence_excluded_dates,
          hosts,
          instructors,
          audio_enabled,
          audio_track_id,
          audio_track_name,
          audio_artist_name,
          audio_artwork_url,
          audio_preview_url,
          audio_track_view_url
        `
        )
        .order("date", { ascending: true, nullsFirst: false })
        .order("time", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) throw error;

      setEvents(((data || []) as DbEvent[]).map(mapDbEventToCalendarEvent));
    } catch (error) {
      console.error("Failed to load calendar events:", error);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  const normalizeEventToForm = (
    event: Partial<SchedulerForm>
  ): SchedulerForm => ({
    id: event?.id || "",
    imageUrl: event?.imageUrl || "",
    color: event?.color || "#2563eb",
    name_en: event?.name_en || "",
    name_es: event?.name_es || "",
    description_en: event?.description_en || "",
    description_es: event?.description_es || "",
    details_en: event?.details_en || "",
    details_es: event?.details_es || "",
    date: event?.date || "",
    time: event?.time || "",
    scheduleType:
      event?.scheduleType || (event?.recurrence ? "recurrent" : "one-time"),
    streetAddress: event?.streetAddress || "",
    city: event?.city || "",
    country: event?.country || "",
    zipCode: event?.zipCode || "",
    locationUrl: event?.locationUrl || "",
    price: event?.price ?? 0,
    privacy: event?.privacy || "Public",
    type: event?.type || "event",
    recurrence: event?.recurrence || "",
    daysOfWeekCsv: event?.daysOfWeekCsv || "",
    dayOfMonth: event?.dayOfMonth || "",
    month: event?.month || "",
    monthsCsv: event?.monthsCsv || "",
    status: event?.status || "published",
    createAttendanceSheet: !!event?.createAttendanceSheet,
    includeForm: !!event?.includeForm,
    dressCode: event?.dressCode,
    image_height: event?.image_height,
    image_position_y: event?.image_position_y,
    recurrence_excluded_dates: event?.recurrence_excluded_dates || [],
    hosts:
      event?.hosts?.map((host: { id: string; name: string }) => ({
        id: host.id,
        name: host.name,
      })) || [],
    instructors:
      event?.instructors?.map((instructor: { id: string; name: string }) => ({
        id: instructor.id,
        name: instructor.name,
      })) || [],
    audioEnabled: event?.audioEnabled as boolean,
    audioTrackId: event?.audioTrackId || "",
    audioTrackName: event?.audioTrackName || "",
    audioArtistName: event?.audioArtistName || "",
    audioArtworkUrl: event?.audioArtworkUrl || "",
    audioPreviewUrl: event?.audioPreviewUrl || "",
    audioTrackViewUrl: event?.audioTrackViewUrl || "",
    createdAt: event?.createdAt || "",
  });

  const handleCalendarClick = ({
    clickEvent,
    event,
  }: {
    clickEvent?: React.MouseEvent<Element, MouseEvent>;
    event: SchedulerForm;
  }) => {
    if (calendarMode === "admin") {
      setSchedulerForm(normalizeEventToForm(event));
      setErrors({});
      setIsEdit(true);
      setShowForm(true);
      return;
    }

    if (calendarMode === "member" && clickEvent) {
      const rect = (
        clickEvent.currentTarget as HTMLElement
      ).getBoundingClientRect();

      setAttendanceAnchor(rect);
      setAttendanceEvent(event);
    }
  };

  const resetComposeForm = () => {
    setSchedulerForm(buildEmptySchedulerForm());
    setErrors({});
    setIsEdit(false);
  };

  const handleOpenCreate = () => {
    resetComposeForm();
    setIsEdit(false);
    setShowForm(true);
  };

  useEffect(() => {
    if (!showForm) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (formRef.current && !formRef.current.contains(target)) {
        resetComposeForm();
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showForm]);

  const pageThemeClass = `${theme.shell} bg-linear-to-br`;

  if (authLoading) {
    return (
      <div
        className={`min-h-dvh flex flex-col pt-10 transition-all duration-300 ${pageThemeClass}`}
      >
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="rounded-4xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.12)] px-10 py-12 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700 animate-pulse" />
            <h2 className="text-xl font-semibold text-slate-900">
              Loading events
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Verifying your account access...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div
        className={`min-h-dvh flex flex-col pt-10 transition-all duration-300 ${pageThemeClass}`}
      >
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-lg w-full rounded-4xl border border-red-100 bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] p-10 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Access restricted
            </h1>
            <p className="text-slate-500 mt-3 leading-relaxed">
              {accessMessage}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 text-white font-medium shadow-lg hover:shadow-xl transition"
            >
              Return Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`min-h-dvh py-0 flex flex-col justify-between transition-all duration-300 ${pageThemeClass}`}
    >
      <Navbar />

      <div className="px-4 md:px-8 pb-2 pt-4">
        <CalendarMain
          events={events}
          selectedEvent={null}
          handleCalendarClick={handleCalendarClick}
          setActiveSchedulerTab={() => {}}
          setShowSchedulerForm={setShowForm}
          setRecurrenceSettingsMode={() => {}}
          setSchedulerForm={setSchedulerForm}
          setMonthSelected={() => {}}
          setYearSelected={() => {}}
          calendarMode={calendarMode}
          setCalendarMode={setCalendarMode}
          attendanceAnchor={attendanceAnchor}
          setAttendanceAnchor={setAttendanceAnchor}
          attendanceEvent={attendanceEvent as SchedulerForm}
          setAttendanceEvent={setAttendanceEvent}
          handleOpenCreate={handleOpenCreate}
          calendarThemeKey={calendarThemeKey}
          setCalendarThemeKey={setCalendarThemeKey}
          loadEvents={loadEvents}
          eventsLoading={eventsLoading}
          setSelectedCalendarDate={setSelectedCalendarDate}
        />
      </div>

      {showForm && calendarMode === "admin" && (
        <div>
          <EventSchedulerModal
            isEdit={isEdit}
            onClose={() => setShowForm(false)}
            createdBy={createdBy}
            formRef={formRef as React.RefObject<HTMLDivElement>}
            handleMouseDown={handleMouseDown}
            schedulerForm={schedulerForm}
            setSchedulerForm={setSchedulerForm}
            setReloadPageData={setReloadPageData}
            errors={errors}
            setErrors={setErrors}
            resetComposeForm={resetComposeForm}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            selectedCalendarDate={selectedCalendarDate}
            setSelectedCalendarDate={setSelectedCalendarDate}
            loadEvents={loadEvents}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Page;
