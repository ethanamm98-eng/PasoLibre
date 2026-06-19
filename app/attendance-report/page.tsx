"use client";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Users,
  CalendarDays,
  MapPin,
  Sparkles,
  Lock,
  Plus,
  FileText,
  Sheet,
  Edit,
  ChartBar,
  Calendar,
} from "lucide-react";
import { LuHeartHandshake } from "react-icons/lu";

import { supabase } from "../lib/supabase/supabaseClient";
import {
  formatDateLabel,
  getInitials,
  normalizeEmail,
  normalizePhone,
} from "../helpers/common";
import { useLanguage } from "../context/language";
import {
  exportToCSV,
  exportToPDF,
  formatEventSchedule,
  getEventLocation,
} from "../helpers/attendance-report";

import Navbar from "../components/NavBar";
import AddAttendanceRecordModal from "../components/AddAttendanceRecordModal";
import AttendanceReportTable from "../components/AttendanceReportTable";
import { StatCard } from "../components/elements/AttendanceReport";
import { SchedulerForm } from "../lib/interfaces/events";

export type ProfileRecord = {
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  is_approved?: boolean;
  account_status?: "active" | "suspended" | null;
  profile_picture?: string | null;
  language_preference?: string | null;
  source?: string | null;
  status?: string | null;
};

export type MemberProfileRecord = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  profile_picture?: string | null;
};

export type AttendanceSheetRecord = {
  id: string;
  event_id: string;
  occurrence_date?: string | null;
  title: string | null;
  notes: string | null;
  is_active: boolean;
};

export type AttendanceEntryRecord = {
  id: string;
  attendance_sheet_id: string;
  participant_name: string;
  participant_email: string | null;
  participant_phone: string | null;
  checked_in: boolean;
  checked_in_at: string | null;
  notes: string | null;
  created_at: string;
};

export type AttendanceRecord = {
  id: string;
  attendanceSheetId: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  date: string;
  rawDate: string;
  time: string;
  location: string;
  status: "registered" | "attended" | "no_show" | "cancelled";
  checkedIn: boolean;
  checkedInAt: string | null;
  notes: string;
};

export type AttendanceForm = {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  status: "registered" | "attended" | "no_show" | "cancelled";
  notes: string;
};

const emptyForm: AttendanceForm = {
  eventId: "",
  name: "",
  email: "",
  phone: "",
  status: "attended",
  notes: "",
};

type LanguageKey = "en" | "es";

const attendanceReportCopy: Record<
  LanguageKey,
  {
    loadingTitle: string;
    loadingDescription: string;
    accessRestrictedTitle: string;
    accessRestrictedDescription: string;
    returnHome: string;
    consoleBadge: string;
    pageTitle: string;
    pageDescription: string;
    participants: string;
    participantsSubtitle: string;
    selectedEvent: string;
    selectedEventSubtitle: string;
    eventDates: string;
    eventDatesSubtitle: string;
    allEvents: string;
    allDates: string;
    selectedEventFallback: string;
    exportCsv: string;
    exportPdf: string;
    analytics: string;
    addRecord: string;
    searchPlaceholder: string;
    recordsHelper: string;
    rowsPerPage: string;
    donationSummary: string;
    totalDonations: string;
    donationsDescription: string;
    totalCollected: string;
    selectAnEvent: string;
    updateAmountButton: string;
    attendanceSheetSuffix: string;
    attendanceSheetFallback: string;
    saveSuccessTitle: string;
    saveSuccessText: string;
    deleteConfirmTitle: string;
    deleteConfirmText: string;
    deleteConfirmButton: string;
    deleteSuccessTitle: string;
    deleteSuccessText: string;
    profilePictureAlt: string;
    statuses: Record<AttendanceForm["status"], string>;
  }
> = {
  en: {
    loadingTitle: "Loading attendance records",
    loadingDescription: "Verifying administrator access...",
    accessRestrictedTitle: "Access restricted",
    accessRestrictedDescription:
      "This page is only available to approved administrators.",
    returnHome: "Return Home",
    consoleBadge: "Attendance Console",
    pageTitle: "Attendance Records",
    pageDescription:
      "Review participation by event using your real attendance sheets and entries.",
    participants: "Participants",
    participantsSubtitle: "Matching current filters",
    selectedEvent: "Selected Event",
    selectedEventSubtitle: "Current attendance scope",
    eventDates: "Event Dates",
    eventDatesSubtitle: "Available dated sessions",
    allEvents: "All Events",
    allDates: "All Dates",
    selectedEventFallback: "Selected Event",
    exportCsv: "Export CSV",
    exportPdf: "Export PDF",
    analytics: "Analytics",
    addRecord: "Add Record",
    searchPlaceholder: "Search by participant...",
    recordsHelper:
      "Manage how many records appear per page and export the current filtered results.",
    rowsPerPage: "Rows per page",
    donationSummary: "Donation Summary",
    totalDonations: "Total Donations",
    donationsDescription:
      "Update the total donations for an event to keep your records accurate.",
    totalCollected: "Total collected for this event",
    selectAnEvent: "Select an event to view and update its total donations.",
    updateAmountButton: "Update Amount",
    attendanceSheetSuffix: "Attendance Sheet",
    attendanceSheetFallback: "Attendance Sheet",
    saveSuccessTitle: "Successfully added",
    saveSuccessText:
      "The attendance record entry was successfully added to the event.",
    deleteConfirmTitle: "Delete attendance record?",
    deleteConfirmText: "This action cannot be undone.",
    deleteConfirmButton: "Yes, delete it!",
    deleteSuccessTitle: "Successfully deleted",
    deleteSuccessText:
      "The attendance record entry was successfully deleted from the selected event date.",
    profilePictureAlt: "profile picture",
    statuses: {
      registered: "Registered",
      attended: "Attended",
      no_show: "No Show",
      cancelled: "Cancelled",
    },
  },
  es: {
    loadingTitle: "Cargando registros de asistencia",
    loadingDescription: "Verificando acceso de administrador...",
    accessRestrictedTitle: "Acceso restringido",
    accessRestrictedDescription:
      "Esta página solo está disponible para administradores aprobados.",
    returnHome: "Volver al inicio",
    consoleBadge: "Consola de Asistencia",
    pageTitle: "Registros de Asistencia",
    pageDescription:
      "Revisa la participación por evento usando tus hojas y entradas reales de asistencia.",
    participants: "Participantes",
    participantsSubtitle: "Coinciden con los filtros actuales",
    selectedEvent: "Evento Seleccionado",
    selectedEventSubtitle: "Alcance actual de asistencia",
    eventDates: "Fechas del Evento",
    eventDatesSubtitle: "Sesiones disponibles con fecha",
    allEvents: "Todos los Eventos",
    allDates: "Todas las Fechas",
    selectedEventFallback: "Evento Seleccionado",
    exportCsv: "Exportar CSV",
    exportPdf: "Exportar PDF",
    analytics: "Estadíticas",
    addRecord: "Añadir Registro",
    searchPlaceholder: "Buscar por participante...",
    recordsHelper:
      "Administra cuántos registros aparecen por página y exporta los resultados filtrados actuales.",
    rowsPerPage: "Filas por página",
    donationSummary: "Resumen de Donaciones",
    totalDonations: "Total de Donaciones",
    donationsDescription:
      "Actualiza el total de donaciones para un evento y mantén tus registros precisos.",
    totalCollected: "Total recaudado para este evento",
    selectAnEvent:
      "Selecciona un evento para ver y actualizar su total de donaciones.",
    updateAmountButton: "Actualizar Cantidad",
    attendanceSheetSuffix: "Hoja de Asistencia",
    attendanceSheetFallback: "Hoja de Asistencia",
    saveSuccessTitle: "Añadido correctamente",
    saveSuccessText:
      "El registro de asistencia se añadió correctamente al evento.",
    deleteConfirmTitle: "¿Eliminar registro de asistencia?",
    deleteConfirmText: "Esta acción no se puede deshacer.",
    deleteConfirmButton: "Sí, eliminar",
    deleteSuccessTitle: "Eliminado correctamente",
    deleteSuccessText:
      "El registro de asistencia se eliminó correctamente de la fecha de evento seleccionada.",
    profilePictureAlt: "foto de perfil",
    statuses: {
      registered: "Registrado",
      attended: "Asistió",
      no_show: "No Asistió",
      cancelled: "Cancelado",
    },
  },
};

const getLanguageKey = (language?: string | null): LanguageKey =>
  language === "es" ? "es" : "en";

const getLocalizedEventName = (
  event: SchedulerForm | undefined,
  lang: LanguageKey
) => {
  if (!event) return "";
  return lang === "es"
    ? event.name_es || event.name_en || ""
    : event.name_en || event.name_es || "";
};

export default function AdminAttendancePage() {
  const { language } = useLanguage(); // es or en
  const lang = getLanguageKey(language);
  const t = attendanceReportCopy[lang];
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageLoading, setPageLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  const [, setProfile] = useState<ProfileRecord | null>(null);
  const [memberProfiles, setMemberProfiles] = useState<MemberProfileRecord[]>(
    []
  );
  const [events, setEvents] = useState<SchedulerForm[]>([]);
  const [attendanceSheets, setAttendanceSheets] = useState<
    AttendanceSheetRecord[]
  >([]);
  const [attendanceEntries, setAttendanceEntries] = useState<
    AttendanceEntryRecord[]
  >([]);

  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedEventDate, setSelectedEventDate] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [attendanceForm, setAttendanceForm] =
    useState<AttendanceForm>(emptyForm);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const validateAdminAccess = async () => {
      try {
        setPageLoading(true);

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
            "first_name, last_name, role, is_approved, account_status, profile_picture, language_preference"
          )
          .eq("id", user.id)
          .maybeSingle<ProfileRecord>();

        if (profileError || !profile) {
          setAccessDenied(true);
          return;
        }

        setProfile(profile);

        const normalizedRole = (profile.role || "").toLowerCase();
        const isAdmin =
          normalizedRole === "admin" || normalizedRole === "super_admin";
        const isApproved = !!profile.is_approved;
        const isActive = profile.account_status !== "suspended";

        if (!isAdmin || !isApproved || !isActive) {
          setAccessDenied(true);
          return;
        }
      } catch (error) {
        console.error("Admin attendance access check error:", error);
        setAccessDenied(true);
      } finally {
        setPageLoading(false);
      }
    };

    validateAdminAccess();
  }, [router]);

  const loadAttendanceData = async () => {
    try {
      setDataLoading(true);

      const [eventsRes, sheetsRes, entriesRes, profilesRes] = await Promise.all(
        [
          supabase
            .from("events")
            .select(
              "id, name_en, name_es, date, time, city, country, street_address, price, total_donations_usd, total_members_donated"
            )
            .order("created_at", { ascending: false }),
          supabase
            .from("attendance_sheets")
            .select("id, event_id, occurrence_date, title, notes, is_active")
            .order("created_at", { ascending: false }),
          supabase
            .from("attendance_sheet_entries")
            .select(
              "id, attendance_sheet_id, participant_name, participant_email, participant_phone, checked_in, checked_in_at, status, notes, created_at"
            )
            .order("created_at", { ascending: false }),
          supabase
            .from("profiles")
            .select("id, first_name, last_name, email, phone, profile_picture")
            .order("first_name", { ascending: true }),
        ]
      );

      if (eventsRes.error) throw eventsRes.error;
      if (sheetsRes.error) throw sheetsRes.error;
      if (entriesRes.error) throw entriesRes.error;
      if (profilesRes.error) throw profilesRes.error;

      setEvents((eventsRes?.data || []) as unknown as SchedulerForm[]);
      setAttendanceSheets((sheetsRes.data || []) as AttendanceSheetRecord[]);
      setAttendanceEntries((entriesRes.data || []) as AttendanceEntryRecord[]);
      setMemberProfiles((profilesRes.data || []) as MemberProfileRecord[]);
    } catch (error) {
      console.error("Failed to load attendance data:", error);
      setEvents([]);
      setAttendanceSheets([]);
      setAttendanceEntries([]);
      setMemberProfiles([]);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!pageLoading && !accessDenied) {
      loadAttendanceData();
    }
  }, [pageLoading, accessDenied]);

  const eventMap = useMemo(
    () => new Map(events.map((event) => [event.id, event])),
    [events]
  );

  const sheetMap = useMemo(
    () => new Map(attendanceSheets.map((sheet) => [sheet.id, sheet])),
    [attendanceSheets]
  );

  const profileByEmail = useMemo(() => {
    const map = new Map<string, MemberProfileRecord>();

    memberProfiles.forEach((member) => {
      const email = normalizeEmail(member.email);
      if (email) map.set(email, member);
    });

    return map;
  }, [memberProfiles]);

  const profileByPhone = useMemo(() => {
    const map = new Map<string, MemberProfileRecord>();

    memberProfiles.forEach((member) => {
      const phone = normalizePhone(member.phone);
      if (phone) map.set(phone, member);
    });

    return map;
  }, [memberProfiles]);

  const profileByName = useMemo(() => {
    const map = new Map<string, MemberProfileRecord>();

    memberProfiles.forEach((member) => {
      const fullName = `${member.first_name || ""} ${member.last_name || ""}`
        .trim()
        .toLowerCase();

      if (fullName) map.set(fullName, member);
    });

    return map;
  }, [memberProfiles]);

  const getMatchedProfile = (entry: AttendanceEntryRecord) => {
    const byEmail = profileByEmail.get(normalizeEmail(entry.participant_email));
    if (byEmail) return byEmail;

    const byPhone = profileByPhone.get(normalizePhone(entry.participant_phone));
    if (byPhone) return byPhone;

    const byName = profileByName.get(
      String(entry.participant_name || "")
        .trim()
        .toLowerCase()
    );
    if (byName) return byName;

    return null;
  };

  const attendanceRecords = useMemo<AttendanceRecord[]>(() => {
    return attendanceEntries
      .map((entry) => {
        const sheet = sheetMap.get(entry.attendance_sheet_id);
        if (!sheet) return null;

        const event = eventMap.get(sheet.event_id);
        if (!event) return null;

        const matchedProfile = getMatchedProfile(entry);
        const recordDate = sheet.occurrence_date || event.date || "";

        return {
          id: entry.id,
          attendanceSheetId: entry.attendance_sheet_id,
          eventId: event.id,
          name: entry.participant_name,
          email: entry.participant_email || "",
          phone: entry.participant_phone || "",
          profilePicture: matchedProfile?.profile_picture || "",
          date: formatDateLabel(recordDate),
          rawDate: recordDate,
          time: event.time || "",
          location: getEventLocation(event),
          status: "attended", // All entries are attended for now
          checkedIn: entry.checked_in,
          checkedInAt: entry.checked_in_at,
          notes: entry.notes || "",
        };
      })
      .filter(Boolean) as AttendanceRecord[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    attendanceEntries,
    sheetMap,
    eventMap,
    profileByEmail,
    profileByPhone,
    profileByName,
  ]);

  const availableDates = useMemo(() => {
    const dates = attendanceRecords
      .filter((r) => selectedEvent === "all" || r.eventId === selectedEvent)
      .map((r) => r.rawDate)
      .filter(Boolean);

    return Array.from(new Set(dates)).sort();
  }, [attendanceRecords, selectedEvent]);

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesEvent =
        selectedEvent === "all" || record.eventId === selectedEvent;

      const matchesDate =
        selectedEventDate === "all" || record.rawDate === selectedEventDate;

      const searchLower = search.toLowerCase();
      const matchesSearch =
        record.name.toLowerCase().includes(searchLower) ||
        record.email.toLowerCase().includes(searchLower) ||
        record.phone.toLowerCase().includes(searchLower);

      return matchesEvent && matchesDate && matchesSearch;
    });
  }, [attendanceRecords, selectedEvent, selectedEventDate, search]);

  const totalParticipants = filteredRecords.length;

  const selectedEventLabel =
    selectedEvent === "all"
      ? t.allEvents
      : getLocalizedEventName(eventMap.get(selectedEvent), lang) ||
        t.selectedEventFallback;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / recordsPerPage)
  );

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * recordsPerPage;
    return filteredRecords.slice(start, start + recordsPerPage);
  }, [filteredRecords, currentPage, recordsPerPage]);

  const pageStart =
    filteredRecords.length === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const pageEnd = Math.min(
    currentPage * recordsPerPage,
    filteredRecords.length
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedEvent, selectedEventDate, recordsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (dataLoading) return;

    const eventIdParam =
      searchParams.get("eventId") ||
      searchParams.get("event") ||
      searchParams.get("selectedEvent");

    const dateParam =
      searchParams.get("occurrenceDate") ||
      searchParams.get("date") ||
      searchParams.get("eventDate");

    if (eventIdParam && events.some((event) => event.id === eventIdParam)) {
      setSelectedEvent(eventIdParam);
    }

    if (dateParam) {
      const normalizedDate = dateParam.includes("T")
        ? dateParam.split("T")[0]
        : dateParam;

      setSelectedEventDate(normalizedDate);
    }
  }, [dataLoading, events, searchParams]);

  const selectedEventDetails = useMemo(() => {
    if (!attendanceForm.eventId) return null;
    return eventMap.get(attendanceForm.eventId) || null;
  }, [attendanceForm.eventId, eventMap]);

  const resetAttendanceForm = () => {
    setAttendanceForm(emptyForm);
    setEditingRecordId(null);
  };

  const handleAttendanceFormChange = (
    key: keyof AttendanceForm,
    value: string
  ) => {
    setAttendanceForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ------------------   Modal Controls   ------------------------

  const openCreateModal = () => {
    resetAttendanceForm();
    setIsModalOpen(true);
  };

  const openEditModal = (record: AttendanceRecord) => {
    setAttendanceForm({
      eventId: record.eventId,
      name: record.name,
      email: record.email,
      phone: record.phone,
      status: record.status,
      notes: record.notes,
    });
    setEditingRecordId(record.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetAttendanceForm();
  };

  // ----------------------   API   ------------------------

  const getOrCreateAttendanceSheet = async (eventId: string) => {
    const existing = attendanceSheets.find(
      (sheet) => sheet.event_id === eventId
    );
    if (existing) return existing.id;

    const event = eventMap.get(eventId);

    const { data, error } = await supabase
      .from("attendance_sheets")
      .insert({
        event_id: eventId,
        title: getLocalizedEventName(event, lang)
          ? `${getLocalizedEventName(event, lang)} ${t.attendanceSheetSuffix}`
          : t.attendanceSheetFallback,
        is_active: true,
      })
      .select("id, event_id, title, notes, is_active")
      .single();

    if (error) throw error;

    const created = data as AttendanceSheetRecord;
    setAttendanceSheets((prev) => [created, ...prev]);
    return created.id;
  };

  const handleSaveAttendanceRecord = async () => {
    if (!attendanceForm.eventId.trim() || !attendanceForm.name.trim()) return;

    try {
      setSaving(true);

      const attendanceSheetId = await getOrCreateAttendanceSheet(
        attendanceForm.eventId
      );

      const payload = {
        attendance_sheet_id: attendanceSheetId,
        participant_name: attendanceForm.name.trim(),
        participant_email: attendanceForm.email.trim() || null,
        participant_phone: attendanceForm.phone.trim() || null,
        status: "attended",
        checked_in: attendanceForm.status === "attended",
        checked_in_at:
          attendanceForm.status === "attended"
            ? new Date().toISOString()
            : null,
        notes: attendanceForm.notes.trim() || null,
      };

      if (editingRecordId) {
        const { error } = await supabase
          .from("attendance_sheet_entries")
          .update(payload)
          .eq("id", editingRecordId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("attendance_sheet_entries")
          .insert(payload);

        if (error) throw error;
      }

      Swal.fire({
        icon: "success",
        title: t.saveSuccessTitle,
        text: t.saveSuccessText,
        timer: 2000,
      });
      await loadAttendanceData();
      closeModal();
    } catch (error) {
      console.error("Failed to save attendance entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAttendanceRecord = async (id: string) => {
    const result = await Swal.fire({
      title: t.deleteConfirmTitle,
      text: t.deleteConfirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t.deleteConfirmButton,
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase
        .from("attendance_sheet_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: t.deleteSuccessTitle,
        text: t.deleteSuccessText,
        timer: 2000,
      });

      await loadAttendanceData();
    } catch (error) {
      console.error("Failed to delete attendance entry:", error);
    }
  };

  const handleUpdateDonations = async (eventId: string) => {
    const event = eventMap.get(eventId);
    if (!event) return;

    const result = await Swal.fire({
      title: "Update Donation Statistics",
      html: `
        <div style="display:flex;flex-direction:column;gap:12px;text-align:left;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px;">
              Total Donations (USD)
            </label>
            <input
              id="swal-total-donations"
              type="number"
              min="0"
              step="0.01"
              class="swal2-input"
              value="${event.total_donations_usd ?? 0}"
              style="margin:0;width:100%;"
            />
          </div>
  
          <div>
            <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px;">
              Total Members Donated
            </label>
            <input
              id="swal-total-members"
              type="number"
              min="0"
              step="1"
              class="swal2-input"
              value="${event.total_members_donated ?? 0}"
              style="margin:0;width:100%;"
            />
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const totalDonations = parseFloat(
          (document.getElementById("swal-total-donations") as HTMLInputElement)
            ?.value || "0"
        );

        const totalMembers = parseInt(
          (document.getElementById("swal-total-members") as HTMLInputElement)
            ?.value || "0",
          10
        );

        if (isNaN(totalDonations) || totalDonations < 0) {
          Swal.showValidationMessage("Please enter a valid donation amount.");
          return;
        }

        if (isNaN(totalMembers) || totalMembers < 0) {
          Swal.showValidationMessage("Please enter a valid member count.");
          return;
        }

        return {
          totalDonations,
          totalMembers,
        };
      },
    });

    if (!result.isConfirmed) return;

    const { totalDonations, totalMembers } = result.value;

    try {
      const { error } = await supabase
        .from("events")
        .update({
          total_donations_usd: totalDonations,
          total_members_donated: totalMembers,
        })
        .eq("id", eventId);

      if (error) throw error;

      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? {
                ...e,
                total_donations_usd: totalDonations,
                total_members_donated: totalMembers,
              }
            : e
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Donation statistics updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update donation statistics:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Unable to update donation statistics.",
      });
    }
  };

  // ----------------------   Render   ------------------------

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] px-4 py-12 md:px-6">
        <Navbar />
        <div className="mx-auto max-w-6xl pt-24">
          <div className="rounded-4xl border border-white/70 bg-white/85 p-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="mx-auto mb-5 h-14 w-14 animate-pulse rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700" />
            <h2 className="text-xl font-semibold text-slate-900">
              {t.loadingTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {t.loadingDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] px-4 py-12 md:px-6">
          <div className="mx-auto max-w-lg pt-24">
            <div className="rounded-4xl border border-red-100 bg-white/90 p-10 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Lock size={28} />
              </div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {t.accessRestrictedTitle}
              </h1>
              <p className="mt-3 leading-relaxed text-slate-500">
                {t.accessRestrictedDescription}
              </p>
              <button
                onClick={() => router.push("/")}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl"
              >
                {t.returnHome}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] 
        px-4 py-4 md:px-6 md:py-12"
      >
        <div className="mx-auto max-w-6xl space-y-4 md:space-y-8">
          {/* Page Header */}
          <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_20%)]" />
            <div className="relative flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="min-w-30 my-auto mx-4 hidden sm:hidden md:block lg:block">
                  <div className="m-auto rounded-full border border-solid border-slate-200 bg-white p-1.5 shadow-xl">
                    <div
                      className="m-auto flex h-26 w-26 items-center justify-center rounded-full border bg-linear-to-br from-[#0d4db0] 
                    to-blue-700 shadow-xl"
                    >
                      <Image
                        src="/logo-title-2.png"
                        alt="Paso Libre Logo"
                        width={140}
                        height={80}
                        className="m-auto rounded-xl object-cover scale-150"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-auto">
                  {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Sparkles size={14} />
                    {t.consoleBadge}
                  </div> */}

                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                    {t.pageTitle}
                  </h1>

                  <p className="mt-2 max-w-2xl text-slate-500 md:text-sm text-xs">
                    {t.pageDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
            <StatCard
              icon={<Users size={18} />}
              title={t.participants}
              value={String(totalParticipants)}
              subtitle={t.participantsSubtitle}
            />
            <StatCard
              icon={<CalendarDays size={18} />}
              title={t.selectedEvent}
              value={selectedEventLabel}
              subtitle={t.selectedEventSubtitle}
            />
            <StatCard
              icon={<MapPin size={18} />}
              title={t.eventDates}
              value={String(availableDates.length)}
              subtitle={t.eventDatesSubtitle}
            />
          </div>

          {/* Mobile Filters & Actions */}
          <div className="block md:hidden">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,77,176,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_24%)]" />

              <div className="relative space-y-4 ">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                      <Sparkles size={13} />
                      {t.recordsHelper}
                    </div>

                    <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                      {t.selectedEvent}
                    </h2>
                  </div>

                  {/* <button
                    onClick={openCreateModal}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 text-white shadow-lg shadow-blue-900/20 transition active:scale-95"
                    aria-label={t.addRecord}
                  >
                    <Plus size={18} />
                  </button> */}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <select
                    value={selectedEvent}
                    onChange={(e) => {
                      setSelectedEvent(e.target.value);
                      setSelectedEventDate("all");
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="all">{t.allEvents}</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {getLocalizedEventName(event, lang)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedEventDate}
                    onChange={(e) => setSelectedEventDate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="all">{t.allDates}</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {formatDateLabel(date)}
                      </option>
                    ))}
                  </select>

                  <div className="relative w-full">
                    <Search
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => exportToCSV({ filteredRecords, eventMap })}
                    className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-green-100 bg-green-50 px-3 py-3 text-xs font-semibold text-green-700 shadow-sm transition active:scale-95"
                  >
                    <Sheet size={17} />
                    {t.exportCsv}
                  </button>

                  <button
                    onClick={() =>
                      exportToPDF({
                        filteredRecords,
                        eventMap,
                        selectedEventLabel,
                      })
                    }
                    className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-blue-100 bg-blue-50 px-3 py-3 text-xs font-semibold text-blue-700 shadow-sm transition active:scale-95"
                  >
                    <FileText size={17} />
                    {t.exportPdf}
                  </button>

                  <button
                    onClick={() => router.push("/analytics")}
                    className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-purple-100 bg-purple-50 px-3 py-3 text-xs font-semibold text-purple-700 shadow-sm transition active:scale-95"
                  >
                    <ChartBar size={17} />
                    {t.analytics}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                  <span className="text-sm font-medium text-slate-600">
                    {t.rowsPerPage}
                  </span>

                  <select
                    value={recordsPerPage}
                    onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    {[5, 10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={openCreateModal}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3.5 font-medium text-white shadow-lg shadow-blue-900/20 transition active:scale-[0.98]"
                >
                  <Plus size={16} />
                  {t.addRecord}
                </button>
              </div>
            </div>
          </div>

          {/* Filters & Actions */}
          <div
            className="hidden rounded-[1.75rem] border border-slate-200 bg-white/88 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] 
          backdrop-blur-xl md:block"
          >
            <div className="flex flex-col gap-4">
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {/* Col 1 */}
                  <button
                    onClick={() => exportToCSV({ filteredRecords, eventMap })}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-green-600 px-5 py-3 font-medium text-white shadow-sm 
                      transition hover:bg-green-700/90 hover:shadow-sm"
                  >
                    <Sheet size={16} />
                    {t.exportCsv}
                  </button>

                  {/* Col 2 */}
                  <button
                    onClick={() =>
                      exportToPDF({
                        filteredRecords,
                        eventMap,
                        selectedEventLabel,
                      })
                    }
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-blue-600 px-5 py-3 font-medium text-white shadow-sm 
                      transition hover:bg-blue-700/90 hover:shadow-sm"
                  >
                    <FileText size={16} />
                    {t.exportPdf}
                  </button>

                  {/* Col 3 */}
                  <button
                    onClick={() => router.push("/analytics")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-purple-600 px-5 py-3 font-medium text-white shadow-sm 
                      transition hover:bg-purple-700/90 hover:shadow-sm"
                  >
                    <ChartBar size={16} />
                    {t.analytics}
                  </button>
                </div>

                <button
                  onClick={openCreateModal}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl"
                >
                  <Plus size={16} />
                  {t.addRecord}
                </button>
              </div>

              {/* Select Fields and Search Bar */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <div className="relative w-full md:max-w-xs">
                    <CalendarDays
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={selectedEvent}
                      onChange={(e) => {
                        setSelectedEvent(e.target.value);
                        setSelectedEventDate("all");
                      }}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="all">{t.allEvents}</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {getLocalizedEventName(event, lang)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative w-full md:max-w-xs">
                    <Calendar
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={selectedEventDate}
                      onChange={(e) => setSelectedEventDate(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                      <option value="all">{t.allDates}</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {formatDateLabel(date)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative w-full md:max-w-sm">
                    <Search
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">{t.recordsHelper}</p>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600">
                    {t.rowsPerPage}
                  </span>

                  <select
                    value={recordsPerPage}
                    onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    {[5, 10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Donations Summary */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_24%)]" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm">
                  <LuHeartHandshake className="text-base md:text-2xl" />
                </div>

                <div>
                  {/* <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {t.donationSummary}
                  </div> */}

                  <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                    {t.totalDonations}
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    {t.donationsDescription}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {selectedEvent !== "all" ? (
                  <div className="rounded-3xl border border-emerald-300 bg-linear-to-br from-emerald-50 to-white px-6 py-4 text-right shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      {selectedEventLabel}
                    </p>

                    <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                      $
                      {eventMap?.get(selectedEvent)?.total_donations_usd ||
                        "0.00"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {t.totalCollected}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-700 shadow-sm">
                    {t.selectAnEvent}
                  </div>
                )}

                {selectedEvent !== "all" && (
                  <button
                    onClick={() => {
                      handleUpdateDonations(selectedEvent);
                    }}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 
                      text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Edit size={15} />
                    {t.updateAmountButton}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table Data w/ Pagination */}
          <AttendanceReportTable
            dataLoading={dataLoading}
            filteredRecords={filteredRecords}
            paginatedRecords={paginatedRecords}
            eventMap={eventMap}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            pageStart={pageStart}
            pageEnd={pageEnd}
            openEditModal={openEditModal}
            formatEventSchedule={formatEventSchedule}
            getInitials={getInitials}
            handleDeleteAttendanceRecord={handleDeleteAttendanceRecord}
          />
        </div>
      </div>

      {isModalOpen && (
        <AddAttendanceRecordModal
          events={events}
          selectedEventDetails={{
            ...selectedEventDetails,
            date: selectedEventDetails?.date || "",
            time: selectedEventDetails?.time || "",
            location: selectedEventDetails?.location || "",
          }}
          attendanceForm={attendanceForm}
          handleAttendanceFormChange={handleAttendanceFormChange}
          handleSaveAttendanceRecord={handleSaveAttendanceRecord}
          saving={saving}
          editingRecordId={editingRecordId as string}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
