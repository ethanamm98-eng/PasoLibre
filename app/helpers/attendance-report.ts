import autoTable from "jspdf-autotable";
import { supabase } from "../lib/supabase/supabaseClient";
import jsPDF from "jspdf";
import { SchedulerForm } from "../lib/interfaces/events";
import {
  AttendanceForm,
  AttendanceSheetRecord,
  LanguageKey,
} from "../lib/interfaces/attendance-report";
import Swal from "sweetalert2";

export function formatDateLabel(dateValue: string | null) {
  if (!dateValue) return "No date";
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventSchedule(
  dateValue: string | null,
  timeValue: string | null,
) {
  const dateLabel = formatDateLabel(dateValue);
  if (!timeValue) return dateLabel;

  const [hours, minutes] = timeValue.split(":");
  const parsed = new Date();
  parsed.setHours(Number(hours || 0), Number(minutes || 0), 0, 0);

  const timeLabel = parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${dateLabel} • ${timeLabel}`;
}

export function getEventLocation(event?: SchedulerForm | null) {
  if (!event) return "No location";
  return (
    [event.street_address, event.city, event.country]
      .filter(Boolean)
      .join(", ") || "No location"
  );
}

export const exportToCSV = ({
  filteredRecords,
  eventMap,
}: {
  filteredRecords: Array<{
    name: string;
    email: string;
    phone: string;
    eventId: string;
    date: string;
    time?: string | null;
    location: string;
    status: string;
  }>;
  eventMap: Map<string, SchedulerForm>;
}) => {
  const rows = filteredRecords.map((record) => {
    const event = eventMap.get(record.eventId);

    return {
      Participant: record.name,
      Email: record.email,
      Phone: record.phone,
      Event: event?.name_en || record.eventId,
      Date: record.date,
      Time: record.time || "",
      Location: record.location,
    };
  });

  const headers = [
    "Participant",
    "Email",
    "Phone",
    "Event",
    "Date",
    "Time",
    "Location",
  ];

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map(
          (header) =>
            `"${String(row[header as keyof typeof row] ?? "").replace(
              /"/g,
              '""',
            )}"`,
        )
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "attendance-records.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = ({
  filteredRecords,
  eventMap,
  selectedEventLabel,
}: {
  filteredRecords: Array<{
    name: string;
    email: string;
    phone: string;
    eventId: string;
    date: string;
    time?: string | null;
    location: string;
    status: string;
  }>;
  eventMap: Map<string, SchedulerForm>;
  selectedEventLabel: string;
}) => {
  const doc = new jsPDF();

  const tableRows = filteredRecords.map((record) => {
    const event = eventMap.get(record.eventId);
    return [
      record.name,
      record.email,
      event?.name_en || record.eventId,
      record.date,
      record.location,
    ];
  });

  doc.setFontSize(18);
  doc.text("Attendance Records", 14, 18);

  doc.setFontSize(10);
  doc.text(`Event: ${selectedEventLabel}`, 14, 26);
  doc.text(`Participants: ${filteredRecords.length}`, 14, 32);

  autoTable(doc, {
    startY: 40,
    head: [["Participant", "Email", "Event", "Date", "Location"]],
    body: tableRows,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [13, 77, 176],
    },
  });

  doc.save("attendance-records.pdf");
};

export const getLanguageKey = (language?: string | null): LanguageKey =>
  language === "es" ? "es" : "en";

export const getLocalizedEventName = (
  event: SchedulerForm | undefined,
  lang: LanguageKey,
) => {
  if (!event) return "";
  return lang === "es"
    ? event.name_es || event.name_en || ""
    : event.name_en || event.name_es || "";
};

// ----------------------   API   ------------------------

export const getOrCreateAttendanceSheet = async ({
  eventId,
  eventMap,
  attendanceSheets,
  setAttendanceSheets,
  lang,
  t,
}: {
  eventId: string;
  eventMap: Map<string, SchedulerForm>;
  attendanceSheets: AttendanceSheetRecord[];
  setAttendanceSheets: React.Dispatch<React.SetStateAction<AttendanceSheetRecord[]>>;
  lang: LanguageKey;
  t: Record<string, string>;
}) => {
  const existing = attendanceSheets.find((sheet) => sheet.event_id === eventId);
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

export const handleSaveAttendanceRecord = async ({
  attendanceForm,
  editingRecordId,
  getOrCreateAttendanceSheet,
  loadAttendanceData,
  closeModal,
  setSaving,
  t,
  eventMap,
  attendanceSheets,
  setAttendanceSheets,
  lang,
}: {
  attendanceForm: AttendanceForm;
  editingRecordId: string | null;
  getOrCreateAttendanceSheet: any,
  loadAttendanceData: () => Promise<void>;
  closeModal: () => void;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  t: Record<string, string>;
  eventMap: Map<string, SchedulerForm>;
  attendanceSheets: AttendanceSheetRecord[];
  setAttendanceSheets: React.Dispatch<React.SetStateAction<AttendanceSheetRecord[]>>;
  lang: LanguageKey;
}) => {
  if (!attendanceForm.eventId.trim() || !attendanceForm.name.trim()) return;

  try {
    setSaving(true);

    const attendanceSheetId = await getOrCreateAttendanceSheet({
      eventId:attendanceForm.eventId,
      eventMap,
      attendanceSheets,
      setAttendanceSheets,
      lang,
      t
   });

    const payload = {
      attendance_sheet_id: attendanceSheetId,
      participant_name: attendanceForm.name.trim(),
      participant_email: attendanceForm.email.trim() || null,
      participant_phone: attendanceForm.phone.trim() || null,
      status: "attended",
      checked_in: attendanceForm.status === "attended",
      checked_in_at:
        attendanceForm.status === "attended" ? new Date().toISOString() : null,
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

export const handleDeleteAttendanceRecord = async ({
  id,
  loadAttendanceData,
  t,
}: {
  id: string;
  loadAttendanceData: () => Promise<void>;
  t: Record<string, string>;
}) => {
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

export const handleUpdateDonations = async ({
  eventId,
  eventMap,
  setEvents,
}: {
  eventId: string;
  eventMap: Map<string, SchedulerForm>;
  setEvents: React.Dispatch<React.SetStateAction<SchedulerForm[]>>;
}) => {
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
          ?.value || "0",
      );

      const totalMembers = parseInt(
        (document.getElementById("swal-total-members") as HTMLInputElement)
          ?.value || "0",
        10,
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
          : e,
      ),
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
