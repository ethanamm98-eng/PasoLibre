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

if (attendanceSheetError) {
  console.error("Attendance sheet load error:", {
    message: attendanceSheetError.message,
    details: attendanceSheetError.details,
    hint: attendanceSheetError.hint,
    code: attendanceSheetError.code,
  });
}

let participants: ParticipantRecord[] = [];
let participantsError = null;

if (attendanceSheet?.id) {
  const participantsResponse = await supabase
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
    .eq("occurrence_date", resolvedOccurrenceDate)
    .order("created_at", { ascending: false });

  participants = participantsResponse.data || [];
  participantsError = participantsResponse.error;
}

if (participantsError) {
  console.error("Participants load error:", {
    message: participantsError.message,
    details: participantsError.details,
    hint: participantsError.hint,
    code: participantsError.code,
  });
}

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
    <main className="relative min-h-screen overflow-hidden bg-[#fdf8fb] px-3 pb-8 pt-16 sm:px-5 sm:pb-10 sm:pt-4 lg:px-8 lg:pt-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 8%, rgba(91,206,250,0.58), transparent 31%), radial-gradient(circle at 90% 10%, rgba(245,169,184,0.58), transparent 31%), radial-gradient(circle at 50% 38%, rgba(255,255,255,0.96), transparent 36%), radial-gradient(circle at 16% 78%, rgba(245,169,184,0.34), transparent 30%), radial-gradient(circle at 84% 82%, rgba(91,206,250,0.34), transparent 30%), linear-gradient(180deg, #dff6ff 0%, #fff9fc 31%, #ffffff 50%, #fff5f8 70%, #dff6ff 100%)",
        }}
      />

      <div className="pointer-events-none absolute -left-24 top-8 h-96 w-96 rounded-full bg-[#5BCEFA]/30 blur-[135px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[#F5A9B8]/30 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-white/80 blur-[150px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-linear-to-t from-white/95 via-white/65 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 shadow-[0_38px_130px_rgba(74,72,105,0.20)] backdrop-blur-2xl sm:rounded-[2.75rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,206,250,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(245,169,184,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))]" />

          <header className="relative isolate overflow-hidden border-b border-white/15 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% -12%, rgba(255,255,255,0.34), transparent 36%), radial-gradient(circle at 18% 18%, rgba(91,206,250,0.32), transparent 31%), radial-gradient(circle at 84% 15%, rgba(245,169,184,0.18), transparent 30%), radial-gradient(circle at 50% 112%, rgba(13,77,176,0.5), transparent 48%), linear-gradient(135deg, #061f52 0%, #0a357f 18%, #0d4db0 42%, #1f68cf 64%, #4aa8e8 82%, #aee8ff 100%)",
              }}
            />

            <div className="pointer-events-none absolute left-1/2 top-[-5.5rem] h-72 w-[42rem] -translate-x-1/2 rotate-[-7deg] rounded-full bg-white/10 blur-[95px]" />
            <div className="pointer-events-none absolute -left-14 top-0 h-60 w-60 rounded-full bg-[#0d4db0]/40 blur-[105px]" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#F5A9B8]/16 blur-[115px]" />
            <div className="pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-[#0d4db0]/35 blur-[100px]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.10), transparent 48%), radial-gradient(circle, rgba(255,255,255,0.34) 0.75px, transparent 0.75px)",
                backgroundSize: "auto, 24px 24px",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent_0%,rgba(13,77,176,0.14)_42%,rgba(223,246,255,0.34)_72%,rgba(255,255,255,0.74)_100%)]" />

            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
              <Link
                href="/"
                className="group flex flex-col items-center rounded-[2rem] outline-none transition focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d4db0]"
              >
                <span className="relative">
                  <span className="pointer-events-none absolute inset-[-18%] rounded-[2.5rem] bg-[#0d4db0]/55 blur-3xl transition duration-500 group-hover:bg-[#0d4db0]/70" />
                  <span className="pointer-events-none absolute inset-[-8%] rounded-[2.25rem] bg-[#5BCEFA]/20 blur-2xl" />

                  <span className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] border border-white/30 bg-white/14 p-2.5 shadow-[0_24px_75px_rgba(2,20,66,0.42)] ring-1 ring-white/10 backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                    <span className="absolute inset-0 bg-linear-to-br from-white/28 via-white/5 to-[#0d4db0]/18" />
                    <span className="absolute inset-x-4 top-2 h-px bg-linear-to-r from-transparent via-white/80 to-transparent" />

                    <Image
                      src="/logo-title-2.png"
                      alt="Paso Libre"
                      className="relative h-full w-full scale-[1.7] bg-[#0d4db0]/90 object-contain transition-transform duration-700 group-hover:scale-[1.82]"
                      width={220}
                      height={220}
                      priority
                    />
                  </span>
                </span>

                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/22 bg-[#0d4db0]/24 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-white shadow-[0_10px_30px_rgba(3,28,82,0.18)] backdrop-blur-xl sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5BCEFA] shadow-[0_0_14px_rgba(91,206,250,0.95)]" />
                  {profileLanguage === "es"
                    ? "Eventos queer"
                    : "Queer events"}
                </span>

                <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.045em] text-white drop-shadow-[0_8px_28px_rgba(2,18,58,0.34)] sm:text-5xl lg:text-6xl">
                  Paso Libre
                </h1>
              </Link>

              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-blue-50/92 sm:text-lg lg:text-xl">
                {profileLanguage === "es"
                  ? "Revisa los detalles del evento y confirma tu asistencia."
                  : "Review the event details and confirm your attendance."}
              </p>

              <div className="mt-7 flex items-center gap-3" aria-hidden="true">
                <span className="h-px w-12 bg-linear-to-r from-transparent to-[#5BCEFA]/70 sm:w-20" />
                <span className="h-2 w-2 rotate-45 rounded-[2px] border border-white/45 bg-white/25 shadow-[0_0_16px_rgba(91,206,250,0.55)]" />
                <span className="h-px w-12 bg-linear-to-l from-transparent to-[#F5A9B8]/55 sm:w-20" />
              </div>
            </div>
          </header>

          <div className="relative bg-[radial-gradient(circle_at_8%_10%,rgba(91,206,250,0.13),transparent_28%),radial-gradient(circle_at_92%_12%,rgba(245,169,184,0.15),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(250,248,255,0.92)_42%,rgba(255,246,250,0.92)_70%,rgba(241,250,255,0.94)_100%)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent" />
            <div className="relative grid grid-cols-1 items-start gap-8 p-4 sm:p-7 lg:grid-cols-2 lg:gap-0 lg:p-10 xl:p-12">
            <div className="min-w-0 lg:pr-10 xl:pr-12">
              <EventDetails
                event={eventForView}
                attendanceSheet={attendanceSheet || null}
                confirmed={confirmed}
                participants={participants || []}
              />
            </div>

            <div className="min-w-0 border-t border-slate-200/70 pt-8 lg:sticky lg:top-8 lg:border-l lg:border-t-0 lg:border-slate-200/70 lg:pl-10 lg:pt-0 xl:pl-12">
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
        </section>
      </div>
    </main>
  );
}
