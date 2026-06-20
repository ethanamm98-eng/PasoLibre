import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import CheckInForm from "../../components/CheckInForm";
import EventDetails, { ParticipantRecord } from "../../components/EventDetails";
import { SchedulerForm } from "@/src/app/lib/interfaces/events";
import { DbEvent } from "@/src/app/lib/calendar/calendarEventMapper";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

type PageProps = {
  params: Promise<{
    eventId: string;
  }>;
  searchParams?: Promise<{
    email?: string;
    memberId?: string;
    name?: string;
    occurrenceDate?: string;
    occurrence_date?: string;
  }>;
};

const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });
};

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isValidDateKey = (value?: string | null) => {
  if (!value) return false;

  const cleanValue = String(value).trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanValue)) return false;

  const date = new Date(`${cleanValue}T00:00:00`);

  return !Number.isNaN(date.getTime());
};

const normalizeWeekday = (value: string) =>
  value.trim().slice(0, 3).toLowerCase();

const getExcludedDateKeys = (event: SchedulerForm) => {
  if (!Array.isArray(event?.recurrence_excluded_dates)) {
    return new Set<string>();
  }

  return new Set(
    event.recurrence_excluded_dates
      .map((date: string) => String(date || "").slice(0, 10))
      .filter(Boolean)
  );
};

const getNextUpcomingOccurrenceDate = (event: DbEvent) => {
  if (String(event?.schedule_type || "").toLowerCase() !== "recurrent") {
    return event?.date || null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const recurrence = String(event?.recurrence || "").toLowerCase();
  const excludedDates = getExcludedDateKeys(event as unknown as SchedulerForm);

  const allowedDays = String(event?.days_of_week_csv || "")
    .split(",")
    .map(normalizeWeekday)
    .filter(Boolean);

  const allowedMonths = String(event?.months_csv || "")
    .split(",")
    .map((item) => Number(item.trim()))
    .filter(Boolean);

  for (let index = 0; index < 730; index += 1) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + index);

    const candidateKey = toDateKey(candidate);

    if (excludedDates.has(candidateKey)) {
      continue;
    }

    const weekday = candidate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();

    const dayOfMonth = candidate.getDate();
    const month = candidate.getMonth() + 1;

    if (recurrence === "weekly") {
      if (allowedDays.includes(weekday)) return candidateKey;
    }

    if (recurrence === "monthly") {
      const matchesDay = Number(event?.day_of_month) === dayOfMonth;
      const matchesMonth =
        allowedMonths.length === 0 || allowedMonths.includes(month);

      if (matchesDay && matchesMonth) return candidateKey;
    }

    if (recurrence === "yearly") {
      const matchesDay = Number(event?.day_of_month) === dayOfMonth;
      const matchesMonth = Number(event?.month) === month;

      if (matchesDay && matchesMonth) return candidateKey;
    }
  }

  return event?.date || null;
};

export default async function CheckInPage({ params, searchParams }: PageProps) {
  const { eventId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const invitedEmail = resolvedSearchParams?.email || "";
  const invitedMemberId = resolvedSearchParams?.memberId || "";
  const invitedName = resolvedSearchParams?.name || "";

  const requestedOccurrenceDate =
    resolvedSearchParams?.occurrenceDate ||
    resolvedSearchParams?.occurrence_date ||
    "";

  const safeEventId = decodeURIComponent(eventId);

  const supabase = await createSupabaseServerClient();

  const {
    data: { user: loggedInUser },
    error: loggedInUserError,
  } = await supabase.auth.getUser();

  if (loggedInUserError) {
    console.error("Check-in auth load error:", loggedInUserError);
  }

  const { data: loggedInProfile, error: loggedInProfileError } =
    loggedInUser?.id
      ? await supabase
          .from("profiles")
          .select(
            `
            id,
            first_name,
            last_name,
            username,
            email,
            phone,
            role,
            gender,
            pronouns,
            dob,
            city,
            country,
            sexual_orientation,
            occupation,
            profile_picture,
            language_preference
          `
          )
          .eq("id", loggedInUser.id)
          .maybeSingle()
      : { data: null, error: null };

  if (loggedInProfileError) {
    console.error("Check-in profile load error:", loggedInProfileError);
  }

  const calendarMode =
    String(loggedInProfile?.role || "").toLowerCase() === "admin"
      ? "admin"
      : "member";

  const { data: event, error: eventError } = await supabase
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
      recurrence_excluded_dates,
      street_address,
      city,
      country,
      zip_code,
      location_url,
      price,
      privacy,
      type,
      status,
      image_url,
      include_form,
      dress_code,
      hosts,
      create_attendance_sheet,
      image_position_y,
      image_height,
      color,
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
    .eq("id", safeEventId)
    .maybeSingle();

  const profileLanguage =
    String(loggedInProfile?.language_preference || "en").toLowerCase() === "es"
      ? "es"
      : "en";

  const eventNotFoundCopy = {
    title:
      profileLanguage === "es" ? "Evento no encontrado" : "Event not found",
    description:
      profileLanguage === "es"
        ? "Este enlace de invitación puede ser inválido o el evento ya no está disponible."
        : "This invitation link may be invalid or the event is no longer available.",
    button: profileLanguage === "es" ? "Volver al inicio" : "Return Home",
  };

  if (
    eventError ||
    !event ||
    (event.status === "draft" && calendarMode !== "admin")
  ) {
    return (
      <div
        className="flex min-h-screen items-center justify-center overflow-y-auto
      bg-[radial-gradient(circle_at_top,#dbeafe,transparent_34%),linear-gradient(to_bottom,#ffffff,#f8fafc)] px-4"
      >
        <div className="max-w-lg rounded-4xl border border-white/70 bg-white/90 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <h1 className="text-2xl font-semibold text-slate-900">
            {eventNotFoundCopy.title}
          </h1>

          <p className="mt-3 text-slate-500">{eventNotFoundCopy.description}</p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-[#0d4db0] px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {eventNotFoundCopy.button}
          </Link>
        </div>
      </div>
    );
  }

  const resolvedOccurrenceDate = isValidDateKey(requestedOccurrenceDate)
    ? requestedOccurrenceDate
    : getNextUpcomingOccurrenceDate(event as unknown as DbEvent) || event.date;

  const eventForView: SchedulerForm = {
    ...event,
    date: resolvedOccurrenceDate,
    occurrenceDate: resolvedOccurrenceDate,
  };

  let attendanceSheet = null;
  let attendanceSheetError = null;

  if (resolvedOccurrenceDate) {
    const occurrenceSheetResponse = await supabase
      .from("attendance_sheets")
      .select(
        "id, title, notes, is_active, created_by, created_at, updated_at, occurrence_date"
      )
      .eq("event_id", safeEventId)
      .eq("occurrence_date", resolvedOccurrenceDate)
      .maybeSingle();

    attendanceSheet = occurrenceSheetResponse.data;
    attendanceSheetError = occurrenceSheetResponse.error;
  }

  if (!attendanceSheet && !attendanceSheetError) {
    const fallbackSheetResponse = await supabase
      .from("attendance_sheets")
      .select(
        "id, title, notes, is_active, created_by, created_at, updated_at, occurrence_date"
      )
      .eq("event_id", safeEventId)
      .maybeSingle();

    attendanceSheet = fallbackSheetResponse.data;
    attendanceSheetError = fallbackSheetResponse.error;
  }

  if (attendanceSheetError) {
    console.error("Attendance sheet load error:", attendanceSheetError);
  }

  let participants: ParticipantRecord[] = [];
  let participantsError = null;

  if (attendanceSheet?.id) {
    let participantsQuery = supabase
      .from("attendance_sheet_entries")
      .select(
        `
        id,
        participant_name,
        participant_email,
        participant_phone,
        checked_in,
        checked_in_at,
        status,
        member_id,
        occurrence_date
      `
      )
      .eq("attendance_sheet_id", attendanceSheet.id)
      .order("created_at", { ascending: false });

    if (resolvedOccurrenceDate) {
      participantsQuery = participantsQuery.or(
        `occurrence_date.eq.${resolvedOccurrenceDate},occurrence_date.is.null`
      );
    }

    const participantsResponse = await participantsQuery;

    participants = participantsResponse.data || [];
    participantsError = participantsResponse.error;
  }

  if (participantsError) {
    console.error("Participants load error:", participantsError);
  }

  const existingEntry =
    participants?.find((entry) => {
      if (invitedMemberId && entry.member_id === invitedMemberId) return true;

      if (
        invitedEmail &&
        String(entry.participant_email || "").toLowerCase() ===
          invitedEmail.toLowerCase()
      ) {
        return true;
      }

      return false;
    }) || null;

  const confirmed =
    existingEntry?.status === "attended" || !!existingEntry?.checked_in;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-8 pt-24 md:px-6 md:pb-10 md:pt-28">
      {/* Main luxury gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 15% 10%, rgba(59,130,246,0.95) 0%, transparent 30%), radial-gradient(circle at 85% 20%, rgba(99,102,241,0.75) 0%, transparent 26%),
          radial-gradient(circle at 50% 80%, rgba(14,165,233,0.25) 0%, transparent 35%), linear-gradient(180deg, #0d4db0 0%, #1e40af 20%, #172554 55%, #020617 100%)`,
        }}
      />

      {/* Soft glass highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_14%)]" />

      {/* Ambient color bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_10%_90%,rgba(168,85,247,0.18),transparent_24%)]" />

      {/* Bottom fade into content */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-white via-white/80 to-transparent" />

      {/* Subtle noise effect */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="relative overflow-visible rounded-[2.5rem] border border-white/40 bg-white/70 px-4 pb-5 pt-24 shadow-[0_35px_120px_rgba(15,23,42,0.28)] backdrop-blur-2xl sm:px-6 md:px-8 md:pb-8">
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_24%)]" />

          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="group flex h-36 w-36 items-center justify-center rounded-full border border-white/80 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl md:h-40 md:w-40"
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#0d4db0] to-blue-800">
                <Image
                  src="/logo-title-2.png"
                  alt="Logo"
                  className="h-28 w-28 scale-110 cursor-pointer object-contain transition-transform duration-500 group-hover:scale-125 md:h-32 md:w-32"
                  width={200}
                  height={200}
                />
              </div>
            </Link>
          </div>

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.85fr)] xl:gap-8">
            <div className="min-w-0 lg:order-1">
              <EventDetails
                event={eventForView}
                attendanceSheet={attendanceSheet || null}
                confirmed={confirmed}
                participants={participants || []}
              />
            </div>

            <div className="min-w-0 lg:order-2">
              <div className="lg:sticky lg:top-8">
                <CheckInForm
                  event={eventForView}
                  attendanceSheetId={attendanceSheet?.id || null}
                  attendanceSheet={attendanceSheet || null}
                  existingEntry={existingEntry}
                  invitedEmail={invitedEmail}
                  invitedMemberId={invitedMemberId}
                  invitedName={invitedName}
                  loggedInUser={loggedInUser || null}
                  loggedInProfile={loggedInProfile || null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
