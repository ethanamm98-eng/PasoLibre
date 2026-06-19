export type DbEvent = {
    id: string;
    name: string;
    description: string | null;
    details: string | null;
    date: string | null;
    time: string | null;
    schedule_type: "one-time" | "recurrent";
    recurrence: string | null;
    days_of_week_csv: string | null;
    day_of_month: number | null;
    month: number | null;
    months_csv: string | null;
    street_address: string | null;
    city: string | null;
    country: string | null;
    zip_code: string | null;
    location_url: string | null;
    price: number | null;
    privacy: string | null;
    type: string | null;
    status: string | null;
    create_attendance_sheet: boolean | null;
    include_form: boolean | null;
    image_url: string | null;
    created_at?: string | null;
  };
  
  export type CalendarEvent = {
    id: string;
    name: string;
    description: string;
    details: string;
    start: string;
    end: string;
    date: string | null;
    time: string | null;
    scheduleType: "one-time" | "recurrent";
    recurrence: string;
    daysOfWeekCsv: string;
    dayOfMonth: number | null;
    month: number | null;
    monthsCsv: string;
    streetAddress: string;
    city: string;
    country: string;
    zipCode: string;
    locationUrl: string;
    price: number;
    privacy: string;
    type: string;
    status: string;
    createAttendanceSheet: boolean;
    includeForm: boolean;
    imageUrl: string;
  };
  
  function buildStartIso(date: string | null, time: string | null) {
    if (!date) return new Date().toISOString();
    return `${date}T${time || "00:00"}:00`;
  }
  
  function buildEndIso(date: string | null, time: string | null) {
    if (!date) return new Date().toISOString();
  
    if (!time) return `${date}T01:00:00`;
  
    const [hours, minutes] = time.split(":").map(Number);
    const end = new Date(`${date}T${time}:00`);
    end.setHours(hours + 1, minutes || 0, 0, 0);
    return end.toISOString();
  }
  
  export function mapDbEventToCalendarEvent(ev: DbEvent): CalendarEvent {
    return {
      id: ev.id,
      name: ev.name || "",
      description: ev.description || "",
      details: ev.details || "",
      start: buildStartIso(ev.date, ev.time),
      end: buildEndIso(ev.date, ev.time),
      date: ev.date,
      time: ev.time,
      scheduleType: ev.schedule_type || "one-time",
      recurrence: ev.recurrence || "",
      daysOfWeekCsv: ev.days_of_week_csv || "",
      dayOfMonth: ev.day_of_month ?? null,
      month: ev.month ?? null,
      monthsCsv: ev.months_csv || "",
      streetAddress: ev.street_address || "",
      city: ev.city || "",
      country: ev.country || "",
      zipCode: ev.zip_code || "",
      locationUrl: ev.location_url || "",
      price: ev.price ?? 0,
      privacy: ev.privacy || "Public",
      type: ev.type || "event",
      status: ev.status || "published",
      createAttendanceSheet: !!ev.create_attendance_sheet,
      includeForm: !!ev.include_form,
      imageUrl: ev.image_url || "",
    };
  }