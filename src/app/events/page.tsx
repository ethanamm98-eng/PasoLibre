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
import Swal from "sweetalert2";

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
    "0",
  )}-${String(now.getDate()).padStart(2, "0")}`;

  const time = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
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
    "member",
  );
  const [showForm, setShowForm] = useState(false);
  const [createdBy, setCreatedBy] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [, setReloadPageData] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<
    string | null
  >(null);

  const [schedulerForm, setSchedulerForm] = useState<SchedulerForm>(
    buildEmptySchedulerForm(),
  );

  const [eventsLoading, setEventsLoading] = useState(true);
  const [events, setEvents] = useState<SchedulerForm[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEdit, setIsEdit] = useState(false);

  const [attendanceAnchor, setAttendanceAnchor] = useState<DOMRect | null>(
    null,
  );
  const [attendanceEvent, setAttendanceEvent] = useState<SchedulerForm | null>(
    null,
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
            "first_name, last_name, role, is_approved, account_status, language_preference",
          )
          .eq("id", user.id)
          .maybeSingle<ProfileRecord>();

        if (profileError || !profile) {
          setAccessDenied(true);
          setAccessMessage(
            "We could not verify your account profile for events access.",
          );
          return;
        }

        if (!profile.is_approved) {
          setAccessDenied(true);
          setAccessMessage(
            "Your account is pending approval. You will be able to access events once approved.",
          );
          return;
        }

        if (profile.account_status === "suspended") {
          setAccessDenied(true);
          setAccessMessage(
            "Your account has been suspended. Please contact an administrator.",
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
      "0",
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
        `,
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
    event: Partial<SchedulerForm>,
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

  const normalizeScheduleValue = (value?: string | null) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replaceAll("_", "-")
      .replaceAll(" ", "-");

  const parseCsvValues = (value?: string | null) =>
    String(value || "")
      .split(",")
      .map((item) => normalizeScheduleValue(item))
      .filter(Boolean);

  const startOfLocalDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const addLocalDays = (date: Date, amount: number) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

  const toDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const parseDateOnly = (value?: string | Date | null): Date | null => {
    if (!value) return null;

    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) return null;
      return startOfLocalDay(value);
    }

    const datePart = String(value).trim().split("T")[0];
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);

    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const parsedDate = new Date(year, month - 1, day);

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      return null;
    }

    return parsedDate;
  };

  const parseEventTime = (value?: string | null) => {
    const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(
      String(value || "00:00:00").trim(),
    );

    if (!match) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const seconds = Number(match[3] || 0);

    return {
      hours: Number.isFinite(hours) && hours >= 0 && hours <= 23 ? hours : 0,
      minutes:
        Number.isFinite(minutes) && minutes >= 0 && minutes <= 59 ? minutes : 0,
      seconds:
        Number.isFinite(seconds) && seconds >= 0 && seconds <= 59 ? seconds : 0,
    };
  };

  const combineDateAndTime = (date: Date, time?: string | null) => {
    const { hours, minutes, seconds } = parseEventTime(time);

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      seconds,
      0,
    );
  };

  const getExcludedDateKeys = (event: SchedulerForm) =>
    new Set(
      (Array.isArray(event.recurrence_excluded_dates)
        ? event.recurrence_excluded_dates
        : []
      )
        .map((value) => parseDateOnly(String(value)))
        .filter((value): value is Date => value !== null)
        .map(toDateKey),
    );

  const weekdayAliases: Record<number, string[]> = {
    0: ["sun", "sunday", "domingo", "dom", "0", "7"],
    1: ["mon", "monday", "lunes", "lun", "1"],
    2: ["tue", "tues", "tuesday", "martes", "mar", "2"],
    3: ["wed", "wednesday", "miércoles", "miercoles", "mié", "mie", "3"],
    4: ["thu", "thur", "thurs", "thursday", "jueves", "jue", "4"],
    5: ["fri", "friday", "viernes", "vie", "5"],
    6: ["sat", "saturday", "sábado", "sabado", "sáb", "sab", "6"],
  };

  const monthAliases: Record<number, string[]> = {
    1: ["1", "01", "jan", "january", "ene", "enero"],
    2: ["2", "02", "feb", "february", "febrero"],
    3: ["3", "03", "mar", "march", "marzo"],
    4: ["4", "04", "apr", "april", "abr", "abril"],
    5: ["5", "05", "may", "mayo"],
    6: ["6", "06", "jun", "june", "junio"],
    7: ["7", "07", "jul", "july", "julio"],
    8: ["8", "08", "aug", "august", "ago", "agosto"],
    9: ["9", "09", "sep", "sept", "september", "septiembre"],
    10: ["10", "oct", "october", "octubre"],
    11: ["11", "nov", "november", "noviembre"],
    12: ["12", "dec", "december", "dic", "diciembre"],
  };

  const matchesRecurringDate = (event: SchedulerForm, candidate: Date) => {
    const recurrence = normalizeScheduleValue(event.recurrence);
    const selectedDays = parseCsvValues(event.daysOfWeekCsv);
    const selectedMonths = parseCsvValues(event.monthsCsv);

    const dayOfMonth = Number(event.dayOfMonth || 0);
    const month = Number(event.month || 0);

    if (recurrence === "daily" || recurrence === "day") {
      return true;
    }

    if (recurrence === "weekly" || recurrence === "week") {
      if (selectedDays.length === 0) {
        return false;
      }

      const aliases = weekdayAliases[candidate.getDay()] || [];

      return selectedDays.some((day) => aliases.includes(day));
    }

    if (recurrence === "monthly" || recurrence === "month") {
      return dayOfMonth >= 1 && candidate.getDate() === dayOfMonth;
    }

    if (recurrence === "selectedmonth" || recurrence === "selected-month") {
      if (dayOfMonth < 1 || candidate.getDate() !== dayOfMonth) {
        return false;
      }

      const aliases = monthAliases[candidate.getMonth() + 1] || [];

      return selectedMonths.some((selectedMonth) =>
        aliases.includes(selectedMonth),
      );
    }

    if (recurrence === "yearly" || recurrence === "year") {
      if (dayOfMonth < 1 || candidate.getDate() !== dayOfMonth) {
        return false;
      }

      if (month >= 1 && month <= 12) {
        return candidate.getMonth() + 1 === month;
      }

      const aliases = monthAliases[candidate.getMonth() + 1] || [];

      return selectedMonths.some((selectedMonth) =>
        aliases.includes(selectedMonth),
      );
    }

    return false;
  };

  const getNextOccurrenceDate = (event: SchedulerForm): string | null => {
    const scheduleType = String(event.scheduleType || "").toLowerCase();

    const recurrence = String(event.recurrence || "").toLowerCase();

    const now = new Date();

    const toDateKey = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const parseTime = (value?: string | null) => {
      const [hour = "0", minute = "0", second = "0"] = String(
        value || "00:00:00",
      ).split(":");

      return {
        hour: Number(hour) || 0,
        minute: Number(minute) || 0,
        second: Number(second) || 0,
      };
    };

    const createDateTime = (date: Date) => {
      const { hour, minute, second } = parseTime(event.time);

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hour,
        minute,
        second,
        0,
      );
    };

    const excludedDates = new Set(
      (event.recurrence_excluded_dates || []).map((value) =>
        String(value).substring(0, 10),
      ),
    );

    if (scheduleType === "one-time") {
      if (!event.date) return null;

      return String(event.date).substring(0, 10);
    }

    if (scheduleType !== "recurrent") {
      return null;
    }

    const selectedDays = String(event.daysOfWeekCsv || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    const selectedMonths = String(event.monthsCsv || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    const weekdayNames = [
      ["sunday", "sun", "domingo", "dom"],
      ["monday", "mon", "lunes", "lun"],
      ["tuesday", "tue", "martes", "mar"],
      ["wednesday", "wed", "miércoles", "miercoles", "mie"],
      ["thursday", "thu", "jueves", "jue"],
      ["friday", "fri", "viernes", "vie"],
      ["saturday", "sat", "sábado", "sabado", "sab"],
    ];

    const monthNames = [
      ["january", "jan", "enero", "ene", "1", "01"],
      ["february", "feb", "febrero", "2", "02"],
      ["march", "mar", "marzo", "3", "03"],
      ["april", "apr", "abril", "abr", "4", "04"],
      ["may", "mayo", "5", "05"],
      ["june", "jun", "junio", "6", "06"],
      ["july", "jul", "julio", "7", "07"],
      ["august", "aug", "agosto", "ago", "8", "08"],
      ["september", "sep", "septiembre", "9", "09"],
      ["october", "oct", "octubre", "10"],
      ["november", "nov", "noviembre", "11"],
      ["december", "dec", "diciembre", "dic", "12"],
    ];

    const matchesDate = (candidate: Date) => {
      if (recurrence === "daily") {
        return true;
      }

      if (recurrence === "weekly") {
        if (selectedDays.length === 0) {
          return false;
        }

        const validNames = weekdayNames[candidate.getDay()];

        return selectedDays.some((day) => validNames.includes(day));
      }

      if (recurrence === "monthly") {
        const dayOfMonth = Number(event.dayOfMonth);

        return dayOfMonth > 0 && candidate.getDate() === dayOfMonth;
      }

      if (recurrence === "yearly") {
        const dayOfMonth = Number(event.dayOfMonth);

        const configuredMonth = Number(event.month);

        if (dayOfMonth <= 0 || candidate.getDate() !== dayOfMonth) {
          return false;
        }

        if (configuredMonth >= 1 && configuredMonth <= 12) {
          return candidate.getMonth() + 1 === configuredMonth;
        }

        const validMonths = monthNames[candidate.getMonth()];

        return selectedMonths.some((month) => validMonths.includes(month));
      }

      return false;
    };

    let candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (let index = 0; index < 3660; index += 1) {
      const dateKey = toDateKey(candidate);

      const matchesRecurrence = matchesDate(candidate);

      const hasNotPassed = createDateTime(candidate) >= now;

      const isExcluded = excludedDates.has(dateKey);

      if (matchesRecurrence && hasNotPassed && !isExcluded) {
        return dateKey;
      }

      candidate = new Date(
        candidate.getFullYear(),
        candidate.getMonth(),
        candidate.getDate() + 1,
      );
    }

    return null;
  };

  const formatOccurrenceDate = (occurrenceDate: string) => {
    const parsedDate = parseDateOnly(occurrenceDate);

    if (!parsedDate) return occurrenceDate;

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  };

  const escapeHtml = (value: unknown) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const handleMemberAttendance = async (event: SchedulerForm) => {
    if (!event?.id) return;

    const eventName = event.name_en || event.name_es || "this event";

    const occurrenceDate = getNextOccurrenceDate(event);

    if (!occurrenceDate) {
      await Swal.fire({
        icon: "warning",
        title: "Missing occurrence date",
        text:
          normalizeScheduleValue(event.scheduleType) === "recurrent"
            ? "The next occurrence could not be determined from the recurrence settings, event time, and excluded dates."
            : "A valid future occurrence date is required to confirm attendance.",
        confirmButtonColor: "#0d4db0",
      });

      return;
    }

    const formattedOccurrenceDate = formatOccurrenceDate(occurrenceDate);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        await Swal.fire({
          icon: "warning",
          title: "Sign in required",
          text: "Please sign in before confirming your attendance.",
          confirmButtonColor: "#0d4db0",
        });

        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, email, phone")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const participantName =
        [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
        user.email ||
        "Attendee";

      const participantEmail = profile?.email || user.email || null;
      const participantPhone = profile?.phone || null;

      /*
       * Check whether this user already has an attendance record
       * for this specific event occurrence.
       */
      const params = new URLSearchParams({
        eventId: event.id,
        occurrenceDate,
        memberId: user.id,
      });

      if (participantEmail) {
        params.set("email", participantEmail);
      }

      const attendanceResponse = await fetch(
        `/api/event-attendance?${params.toString()}`,
      );

      const attendanceResult = await attendanceResponse.json();

      if (!attendanceResponse.ok || !attendanceResult?.success) {
        throw new Error(
          attendanceResult?.message ||
            "Unable to load your attendance information.",
        );
      }

      const existingEntry = attendanceResult?.existingEntry || null;

      const hasConfirmed =
        existingEntry?.status === "attended" ||
        existingEntry?.checked_in === true;

      const checkInHref = `/check-in/${event?.id || ""}${
        occurrenceDate
          ? `?occurrenceDate=${encodeURIComponent(occurrenceDate)}`
          : ""
      }`;

      const result = await Swal.fire({
        icon: hasConfirmed ? "success" : "question",

        title: hasConfirmed ? "Attendance confirmed" : "Confirm attendance",

        html: `
        <div style="text-align:left">
          <div
            style="
              padding:16px;
              border:1px solid #e2e8f0;
              border-radius:16px;
              background:#f8fafc;
              margin-bottom:14px;
            "
          >
            <div
              style="
                color:#0f172a;
                font-size:16px;
                font-weight:700;
                margin-bottom:5px;
              "
            >
              ${escapeHtml(eventName)}
            </div>

            <div
              style="
                color:#64748b;
                font-size:13px;
                line-height:1.5;
              "
            >
              ${
                hasConfirmed
                  ? "You have already confirmed attendance for this event."
                  : "Would you like to confirm your attendance for this event?"
              }
            </div>

            <div
              style="
                margin-top:10px;
                color:#94a3b8;
                font-size:12px;
                font-weight:600;
              "
            >
              Occurrence: ${escapeHtml(formattedOccurrenceDate)}
            </div>

            <a
              href="${escapeHtml(checkInHref)}"
              style="
                display:inline-flex;
                align-items:center;
                justify-content:center;
                width:100%;
                margin-top:14px;
                padding:11px 14px;
                border:1px solid #bfdbfe;
                border-radius:12px;
                background:#eff6ff;
                color:#0d4db0;
                font-size:13px;
                font-weight:700;
                text-decoration:none;
                transition:all .2s ease;
                box-sizing:border-box;
              "
              onmouseover="
                this.style.background='#dbeafe';
                this.style.borderColor='#93c5fd';
              "
              onmouseout="
                this.style.background='#eff6ff';
                this.style.borderColor='#bfdbfe';
              "
            >
              View invitation
            </a>
          </div>

          <div
            style="
              padding:13px;
              border:1px solid #e2e8f0;
              border-radius:16px;
            "
          >
            <div
              style="
                color:#94a3b8;
                font-size:10px;
                font-weight:700;
                letter-spacing:.08em;
                text-transform:uppercase;
              "
            >
              Signed in as
            </div>

            <div
              style="
                color:#1e293b;
                font-size:14px;
                font-weight:600;
                margin-top:2px;
              "
            >
              ${participantName}
            </div>

            ${
              participantEmail
                ? `
                  <div
                    style="
                      color:#64748b;
                      font-size:12px;
                      margin-top:2px;
                    "
                  >
                    ${participantEmail}
                  </div>
                `
                : ""
            }
          </div>
        </div>
      `,

        showCancelButton: true,

        confirmButtonText: hasConfirmed
          ? "Cancel attendance"
          : "Yes, I’ll attend",

        cancelButtonText: "Close",

        confirmButtonColor: hasConfirmed ? "#e11d48" : "#059669",
        cancelButtonColor: "#64748b",

        reverseButtons: true,
        focusCancel: false,
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading(),

        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-5 py-2.5",
          cancelButton: "rounded-xl px-5 py-2.5",
        },

        preConfirm: async () => {
          try {
            const response = await fetch("/api/event-attendance", {
              method: hasConfirmed ? "DELETE" : "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                hasConfirmed
                  ? {
                      eventId: event.id,
                      occurrenceDate,
                      memberId: user.id,
                      participantEmail,
                    }
                  : {
                      eventId: event.id,
                      occurrenceDate,
                      participantName,
                      participantEmail,
                      participantPhone,
                      memberId: user.id,
                      status: "attended",
                    },
              ),
            });

            const responseResult = await response.json();

            if (!response.ok || !responseResult?.success) {
              throw new Error(
                responseResult?.message ||
                  (hasConfirmed
                    ? "Unable to cancel attendance."
                    : "Unable to confirm attendance."),
              );
            }

            return responseResult;
          } catch (error) {
            Swal.showValidationMessage(
              error instanceof Error
                ? error.message
                : "Unable to update attendance.",
            );

            return false;
          }
        },
      });

      if (!result.isConfirmed) return;

      await loadEvents();

      await Swal.fire({
        icon: "success",

        title: hasConfirmed ? "Attendance cancelled" : "Attendance confirmed",

        text: hasConfirmed
          ? `Your attendance for ${eventName} was cancelled.`
          : `You are now attending ${eventName}.`,

        confirmButtonText: "Close",
        confirmButtonColor: "#0d4db0",

        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-5 py-2.5",
        },
      });
    } catch (error) {
      console.error("Attendance error:", error);

      await Swal.fire({
        icon: "error",
        title: "Unable to update attendance",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong while updating attendance.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleCalendarClick = async ({
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

    if (calendarMode === "member") {
      await handleMemberAttendance(event);
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
