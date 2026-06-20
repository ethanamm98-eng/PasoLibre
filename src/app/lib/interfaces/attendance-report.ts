export type LanguageKey = "en" | "es";

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