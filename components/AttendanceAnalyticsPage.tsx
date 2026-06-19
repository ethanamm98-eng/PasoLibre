"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Activity,
  CalendarDays,
  DollarSign,
  Users,
  Trophy,
} from "lucide-react";
import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";

import Navbar from "./NavBar";
import { SchedulerForm } from "../lib/interfaces/events";

type AttendanceSheet = {
  id: string;
  event_id: string;
  occurrence_date: string;
};

type AttendanceEntry = {
  id: string;
  attendance_sheet_id: string;
  member_id: string | null;
  participant_name: string;
  participant_email: string | null;
  checked_in: boolean;
  status: "registered" | "attended" | "no_show" | "cancelled";
  occurrence_date: string | null;
};

type ProfileRecord = {
  id: string;
  gender: string | null;
  race: string | null;
  dob: string | null;
  city: string | null;
  sexual_orientation: string | null;
};

type DemographicKey =
  | "gender"
  | "race"
  | "ageGroup"
  | "city"
  | "sexualOrientation";

type PageLanguage = "en" | "es";

const chartColors = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#ef4444",
  "#64748b",
];

const analyticsText = {
  en: {
    dashboardBadge: "Analytics Dashboard",
    pageTitle: "Attendance Insights",
    pageDescription:
      "Visualize attendance demographics, participation trends, event performance, and donation impact.",
    totalParticipants: "Total Participants",
    totalParticipantsSubtitle: "Across all attendance sheets",
    checkedIn: "Checked In",
    checkedInSubtitle: "Participants marked present",
    eventsTracked: "Events Tracked",
    eventsTrackedSubtitle: "Events with attendance entries",
    totalDonations: "Total Donations",
    totalDonationsSubtitle: "Collected across events",
    noFrequentParticipants: "No frequent participants yet.",
    loadingAnalytics: "Loading analytics...",
    demographicsBy: "Demographics by",
    topEventsByAttendance: "Top Events by Attendance",
    topEventsByAttendanceSubtitle:
      "Highest participation counts across attendance sheets",
    donationsVsAttendance: "Donations vs Attendance",
    donationsVsAttendanceSubtitle: "Compare event turnout with total donations",
    attendanceOverTime: "Attendance Over Time",
    attendanceOverTimeSubtitle: "Participation count by event occurrence date",
    unknown: "Unknown",
    unknownEvent: "Unknown Event",
    unknownParticipant: "Unknown Participant",
    under18: "Under 18",
    topParticipant: "Top Participant",
    rank: "Rank",
    attendanceSingular: "attendance",
    attendancePlural: "attendances",
    chartAttendance: "attendance",
    chartDonations: "donations",
    demographicOptions: {
      gender: {
        label: "Gender",
        description: "Attendance grouped by gender per event.",
      },
      race: {
        label: "Race",
        description: "Attendance grouped by race per event.",
      },
      ageGroup: {
        label: "Age",
        description: "Attendance grouped by age range per event.",
      },
      city: {
        label: "City",
        description: "Attendance grouped by participant city per event.",
      },
      sexualOrientation: {
        label: "Sexual Orientation",
        description: "Attendance grouped by sexual orientation per event.",
      },
    },
  },
  es: {
    dashboardBadge: "Panel de analíticas",
    pageTitle: "Estadísticas de asistencia",
    pageDescription:
      "Visualiza datos demográficos de asistencia, tendencias de participación, rendimiento de eventos e impacto de donaciones.",
    totalParticipants: "Participantes totales",
    totalParticipantsSubtitle: "En todas las hojas de asistencia",
    checkedIn: "Registrados presentes",
    checkedInSubtitle: "Participantes marcados como presentes",
    eventsTracked: "Eventos monitoreados",
    eventsTrackedSubtitle: "Eventos con registros de asistencia",
    totalDonations: "Donaciones totales",
    totalDonationsSubtitle: "Recaudado entre todos los eventos",
    noFrequentParticipants: "Aún no hay participantes frecuentes.",
    loadingAnalytics: "Cargando analíticas...",
    demographicsBy: "Datos demográficos por",
    topEventsByAttendance: "Eventos principales por asistencia",
    topEventsByAttendanceSubtitle:
      "Conteos de participación más altos en las hojas de asistencia",
    donationsVsAttendance: "Donaciones vs asistencia",
    donationsVsAttendanceSubtitle:
      "Compara la participación del evento con el total de donaciones",
    attendanceOverTime: "Asistencia a través del tiempo",
    attendanceOverTimeSubtitle:
      "Conteo de participación por fecha de ocurrencia del evento",
    unknown: "Desconocido",
    unknownEvent: "Evento desconocido",
    unknownParticipant: "Participante desconocido",
    under18: "Menor de 18",
    topParticipant: "Participante destacado",
    rank: "Puesto",
    attendanceSingular: "asistencia",
    attendancePlural: "asistencias",
    chartAttendance: "asistencia",
    chartDonations: "donaciones",
    demographicOptions: {
      gender: {
        label: "Género",
        description: "Asistencia agrupada por género en cada evento.",
      },
      race: {
        label: "Raza",
        description: "Asistencia agrupada por raza en cada evento.",
      },
      ageGroup: {
        label: "Edad",
        description: "Asistencia agrupada por rango de edad en cada evento.",
      },
      city: {
        label: "Ciudad",
        description:
          "Asistencia agrupada por ciudad del participante en cada evento.",
      },
      sexualOrientation: {
        label: "Orientación sexual",
        description:
          "Asistencia agrupada por orientación sexual en cada evento.",
      },
    },
  },
} as const;

const demographicOptionKeys: DemographicKey[] = [
  "gender",
  "race",
  "ageGroup",
  "city",
  "sexualOrientation",
];

const normalizeLabel = (value?: string | null, fallback = "Unknown") => {
  if (!value || !String(value).trim()) return fallback;
  return String(value).trim();
};

const getAgeGroup = (dob?: string | null, language: PageLanguage = "en") => {
  const text = analyticsText[language];

  if (!dob) return text.unknown;

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return text.unknown;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) age -= 1;

  if (age < 18) return text.under18;
  if (age <= 24) return "18–24";
  if (age <= 34) return "25–34";
  if (age <= 44) return "35–44";
  if (age <= 54) return "45–54";
  if (age <= 64) return "55–64";
  return "65+";
};

export default function AttendanceAnalyticsPage() {
  const { language } = useLanguage();
  const pageLanguage: PageLanguage = language === "es" ? "es" : "en";
  const text = analyticsText[pageLanguage];

  const [events, setEvents] = useState<SchedulerForm[]>([]);
  const [sheets, setSheets] = useState<AttendanceSheet[]>([]);
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDemographic, setSelectedDemographic] =
    useState<DemographicKey>("gender");

  const money = useMemo(
    () =>
      new Intl.NumberFormat(pageLanguage === "es" ? "es-US" : "en-US", {
        style: "currency",
        currency: "USD",
      }),
    [pageLanguage]
  );

  const demographicOptions = useMemo(
    () =>
      demographicOptionKeys.map((key) => ({
        key,
        label: text.demographicOptions[key].label,
        description: text.demographicOptions[key].description,
      })),
    [text]
  );

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);

      const [eventsRes, sheetsRes, entriesRes, profilesRes] = await Promise.all(
        [
          supabase
            .from("events")
            .select(
              "id, name_en, name_es, total_donations_usd, total_members_donated, color"
            )
            .order("created_at", { ascending: false }),

          supabase
            .from("attendance_sheets")
            .select("id, event_id, occurrence_date"),

          supabase
            .from("attendance_sheet_entries")
            .select(
              "id, attendance_sheet_id, member_id, participant_name, participant_email, checked_in, status, occurrence_date"
            ),

          supabase
            .from("profiles")
            .select("id, gender, race, dob, city, sexual_orientation"),
        ]
      );

      if (!eventsRes.error) setEvents(eventsRes?.data || []);
      if (!sheetsRes.error) setSheets(sheetsRes.data || []);
      if (!entriesRes.error) setEntries(entriesRes.data || []);
      if (!profilesRes.error) setProfiles(profilesRes.data || []);

      setLoading(false);
    };

    loadAnalytics();
  }, []);

  const eventMap = useMemo(
    () => new Map(events.map((event) => [event.id, event])),
    [events]
  );

  const sheetMap = useMemo(
    () => new Map(sheets.map((sheet) => [sheet.id, sheet])),
    [sheets]
  );

  const profileMap = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles]
  );

  const enrichedEntries = useMemo(() => {
    return entries.map((entry) => {
      const sheet = sheetMap.get(entry.attendance_sheet_id);
      const event = sheet ? eventMap.get(sheet.event_id) : null;
      const profile = entry.member_id ? profileMap.get(entry.member_id) : null;
      const eventName =
        pageLanguage === "es"
          ? event?.name_es || event?.name_en || text.unknownEvent
          : event?.name_en || event?.name_es || text.unknownEvent;

      return {
        ...entry,
        eventId: sheet?.event_id || "unknown",
        eventName,
        eventColor: event?.color || "#2563eb",
        occurrenceDate:
          entry.occurrence_date || sheet?.occurrence_date || text.unknown,
        gender: normalizeLabel(profile?.gender, text.unknown),
        race: normalizeLabel(profile?.race, text.unknown),
        ageGroup: getAgeGroup(profile?.dob, pageLanguage),
        city: normalizeLabel(profile?.city, text.unknown),
        sexualOrientation: normalizeLabel(
          profile?.sexual_orientation,
          text.unknown
        ),
      };
    });
  }, [entries, sheetMap, eventMap, profileMap, pageLanguage, text]);

  const topParticipants = useMemo(() => {
    const rows = new Map<
      string,
      {
        name: string;
        email: string;
        attendance: number;
      }
    >();

    enrichedEntries
      .filter((entry) => entry.checked_in || entry.status === "attended")
      .forEach((entry) => {
        const name = normalizeLabel(
          entry.participant_name,
          text.unknownParticipant
        );
        const email = normalizeLabel(entry.participant_email, "");

        const key = entry.member_id || email || name;

        if (!rows.has(key)) {
          rows.set(key, {
            name,
            email,
            attendance: 0,
          });
        }

        rows.get(key)!.attendance += 1;
      });

    return Array.from(rows.values())
      .sort((a, b) => b.attendance - a.attendance)
      .slice(0, 3);
  }, [enrichedEntries, text.unknownParticipant]);

  const totalParticipants = enrichedEntries.length;
  const totalCheckedIn = enrichedEntries.filter((x) => x.checked_in).length;
  const totalDonations = events.reduce(
    (sum, event) => sum + Number(event?.total_members_donated || 0),
    0
  );
  const totalEventsWithAttendance = new Set(
    enrichedEntries.map((x) => x.eventId)
  ).size;

  const activeDemographic = demographicOptions.find(
    (item) => item.key === selectedDemographic
  );

  const demographicsByEvent = useMemo(() => {
    const rows = new Map<string, Record<string, number | string>>();

    enrichedEntries.forEach((entry) => {
      if (!rows.has(entry.eventName)) {
        rows.set(entry.eventName, { event: entry.eventName });
      }

      const row = rows.get(entry.eventName)!;
      const key = normalizeLabel(entry[selectedDemographic], text.unknown);
      row[key] = (Number(row[key]) || 0) + 1;
    });

    return Array.from(rows.values());
  }, [enrichedEntries, selectedDemographic, text.unknown]);

  const demographicKeys = useMemo(() => {
    const keys = new Set<string>();

    demographicsByEvent.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "event") keys.add(key);
      });
    });

    return Array.from(keys);
  }, [demographicsByEvent]);

  const topEventsByAttendance = useMemo(() => {
    const rows = new Map<string, number>();

    enrichedEntries.forEach((entry) => {
      rows.set(entry.eventName, (rows.get(entry.eventName) || 0) + 1);
    });

    return Array.from(rows.entries())
      .map(([event, attendance]) => ({ event, attendance }))
      .sort((a, b) => b.attendance - a.attendance)
      .slice(0, 8);
  }, [enrichedEntries]);

  const donationsVsAttendance = useMemo(() => {
    return events.map((event) => {
      const attendance = enrichedEntries.filter(
        (entry) => entry.eventId === event.id
      ).length;

      return {
        event:
          pageLanguage === "es"
            ? event.name_es || event.name_en
            : event.name_en || event.name_es,
        [text.chartAttendance]: attendance,
        [text.chartDonations]: Number(event?.total_members_donated || 0),
      };
    });
  }, [events, enrichedEntries, pageLanguage, text]);

  const attendanceOverTime = useMemo(() => {
    const rows = new Map<string, number>();

    enrichedEntries.forEach((entry) => {
      rows.set(entry.occurrenceDate, (rows.get(entry.occurrenceDate) || 0) + 1);
    });

    return Array.from(rows.entries())
      .map(([date, attendance]) => ({
        date,
        [text.chartAttendance]: attendance,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [enrichedEntries, text.chartAttendance]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] px-4 py-10 md:px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_24%)]" />

            <div className="relative">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Activity size={14} />
                {text.dashboardBadge}
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                {text.pageTitle}
              </h1>

              <p className="mt-2 max-w-2xl text-slate-500">
                {text.pageDescription}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <KpiCard
              icon={<Users size={18} />}
              title={text.totalParticipants}
              value={String(totalParticipants)}
              subtitle={text.totalParticipantsSubtitle}
            />
            <KpiCard
              icon={<Activity size={18} />}
              title={text.checkedIn}
              value={String(totalCheckedIn)}
              subtitle={text.checkedInSubtitle}
            />
            <KpiCard
              icon={<CalendarDays size={18} />}
              title={text.eventsTracked}
              value={String(totalEventsWithAttendance)}
              subtitle={text.eventsTrackedSubtitle}
            />
            <KpiCard
              icon={<DollarSign size={18} />}
              title={text.totalDonations}
              value={money.format(totalDonations)}
              subtitle={text.totalDonationsSubtitle}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {topParticipants.length ? (
              topParticipants.map((participant, index) => (
                <TopParticipantCard
                  key={`${participant.name}-${participant.email}-${index}`}
                  rank={index + 1}
                  name={participant.name}
                  email={participant.email}
                  attendance={participant.attendance}
                  text={text}
                />
              ))
            ) : (
              <div className="rounded-3xl border border-white/70 bg-white/90 p-5 text-sm text-slate-500 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:col-span-3">
                {text.noFrequentParticipants}
              </div>
            )}
          </div>

          {loading ? (
            <div className="rounded-4xl border border-white/70 bg-white/90 p-10 text-center text-slate-500 shadow-xl">
              {text.loadingAnalytics}
            </div>
          ) : (
            <div className="space-y-6">
              <ChartCard
                icon={<Users size={18} />}
                title={`${text.demographicsBy} ${activeDemographic?.label}`}
                subtitle={activeDemographic?.description || ""}
                action={
                  <div className="flex flex-wrap gap-2">
                    {demographicOptions.map((option) => {
                      const active = selectedDemographic === option.key;

                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => setSelectedDemographic(option.key)}
                          className={[
                            "rounded-full border px-4 py-2 text-xs font-semibold transition",
                            active
                              ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-900/15"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                          ].join(" ")}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                }
              >
                <ResponsiveContainer width="100%" height={390}>
                  <BarChart data={demographicsByEvent}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="event" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {demographicKeys.map((key, index) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        stackId="demographics"
                        fill={chartColors[index % chartColors.length]}
                        radius={[8, 8, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ChartCard
                  icon={<Activity size={18} />}
                  title={text.topEventsByAttendance}
                  subtitle={text.topEventsByAttendanceSubtitle}
                >
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={topEventsByAttendance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="event" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar
                        dataKey="attendance"
                        fill="#2563eb"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                  icon={<DollarSign size={18} />}
                  title={text.donationsVsAttendance}
                  subtitle={text.donationsVsAttendanceSubtitle}
                >
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={donationsVsAttendance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="event" tick={{ fontSize: 11 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey={text.chartAttendance}
                        fill="#2563eb"
                        radius={[10, 10, 0, 0]}
                      />
                      <Bar
                        dataKey={text.chartDonations}
                        fill="#10b981"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <ChartCard
                icon={<CalendarDays size={18} />}
                title={text.attendanceOverTime}
                subtitle={text.attendanceOverTimeSubtitle}
              >
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart data={attendanceOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={text.chartAttendance}
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function KpiCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            {icon}
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        {action}
      </div>

      {children}
    </div>
  );
}

function TopParticipantCard({
  rank,
  name,
  email,
  attendance,
  text,
}: {
  rank: number;
  name: string;
  email: string;
  attendance: number;
  text: (typeof analyticsText)[PageLanguage];
}) {
  const rankLabel = rank === 1 ? text.topParticipant : `${text.rank} #${rank}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/20">
          <Trophy size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">
            {rankLabel}
          </div>

          <h3 className="truncate text-base font-bold text-slate-950">
            {name}
          </h3>

          {email && (
            <p className="mt-1 truncate text-xs text-slate-400">{email}</p>
          )}

          <p className="mt-3 text-sm font-semibold text-slate-700">
            {attendance}{" "}
            {attendance === 1 ? text.attendanceSingular : text.attendancePlural}
          </p>
        </div>
      </div>
    </div>
  );
}
