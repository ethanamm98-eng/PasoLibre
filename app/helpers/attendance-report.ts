import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { SchedulerForm } from "../lib/interfaces/events";

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
  timeValue: string | null
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
              '""'
            )}"`
        )
        .join(",")
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
