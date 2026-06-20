"use client";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/language";
import {
  FieldInput,
  FieldSelect,
} from "../components/elements/AttendanceReport";

import {
  CalendarDays,
  MapPin,
  PenLineIcon,
  Plus,
  Save,
  XIcon,
  Search,
  Users,
  UserPlus,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "../lib/supabase/supabaseClient";
import { SchedulerForm } from "../lib/interfaces/events";
import { getOrCreateAttendanceSheet } from "../helpers/attendance-report";
import { AttendanceSheetRecord } from "../lib/interfaces/attendance-report";

type ProfileOption = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  is_approved?: boolean | null;
  account_status?: string | null;
};

const translations = {
  en: {
    editAttendanceRecord: "Edit Attendance Record",
    addAttendanceRecord: "Add Attendance Record",
    modalSubtitle:
      "Select an existing user or add a custom participant manually.",
    addFromUsers: "Add from users",
    addFromUsersDescription:
      "Choose an approved user to auto-fill their name, email, and phone.",
    searchUsers: "Search users by name, email, or phone",
    loadingUsers: "Loading users...",
    noUsersFound: "No users found",
    noUsersFoundDescription: "You can still add a custom participant manually.",
    unnamedUser: "Unnamed user",
    customParticipant: "Custom participant",
    customParticipantDescription:
      "You can edit the fields below even after selecting a user. This keeps custom attendee support fully available.",
    selected: "Selected",
    event: "Event",
    selectEvent: "Select an event",
    participantName: "Participant Name",
    enterParticipantName: "Enter participant name",
    email: "Email",
    phone: "Phone",
    eventDetails: "Event Details",
    noDate: "No date",
    noLocation: "No location",
    previewEventDetails: "Select an event to preview its date and location",
    cancel: "Cancel",
    saving: "Saving...",
    saveChanges: "Save Changes",
    addRecord: "Add Record",
  },
  es: {
    editAttendanceRecord: "Editar Registro de Asistencia",
    addAttendanceRecord: "Agregar Registro de Asistencia",
    modalSubtitle:
      "Selecciona un usuario existente o agrega un participante personalizado manualmente.",
    addFromUsers: "Agregar desde usuarios",
    addFromUsersDescription:
      "Elige un usuario aprobado para completar automáticamente su nombre, correo electrónico y teléfono.",
    searchUsers: "Buscar usuarios por nombre, correo electrónico o teléfono",
    loadingUsers: "Cargando usuarios...",
    noUsersFound: "No se encontraron usuarios",
    noUsersFoundDescription:
      "Aún puedes agregar un participante personalizado manualmente.",
    unnamedUser: "Usuario sin nombre",
    customParticipant: "Participante personalizado",
    customParticipantDescription:
      "Puedes editar los campos de abajo incluso después de seleccionar un usuario. Esto mantiene disponible el soporte para asistentes personalizados.",
    selected: "Seleccionado",
    event: "Evento",
    selectEvent: "Selecciona un evento",
    participantName: "Nombre del Participante",
    enterParticipantName: "Ingresa el nombre del participante",
    email: "Correo Electrónico",
    phone: "Teléfono",
    eventDetails: "Detalles del Evento",
    noDate: "Sin fecha",
    noLocation: "Sin ubicación",
    previewEventDetails: "Selecciona un evento para ver su fecha y ubicación",
    cancel: "Cancelar",
    saving: "Guardando...",
    saveChanges: "Guardar Cambios",
    addRecord: "Agregar Registro",
  },
};

const AddAttendanceRecordModal = ({
  events,
  selectedEventDetails,
  attendanceForm,
  handleAttendanceFormChange,
  handleSaveAttendanceRecord,
  saving,
  editingRecordId,
  closeModal,
  eventMap,
  attendanceSheets,
  setAttendanceSheets,
  lang,
  loadAttendanceData,
  setSaving,
}: {
  events: { id: string; name_en: string }[];
  selectedEventDetails: { date: string; time: string; location: string } | null;
  attendanceForm: {
    eventId: string;
    name: string;
    email: string;
    phone: string;
    status: "registered" | "attended" | "no_show" | "cancelled";
    notes: string;
  };
  handleAttendanceFormChange: (
    field: keyof typeof attendanceForm,
    value: string,
  ) => void;
  handleSaveAttendanceRecord: any;
  saving: boolean;
  editingRecordId?: string;
  closeModal: () => void;
  eventMap: Map<string, SchedulerForm>;
  attendanceSheets: AttendanceSheetRecord[];
  setAttendanceSheets: React.Dispatch<
    React.SetStateAction<AttendanceSheetRecord[]>
  >;
  lang: string;
  loadAttendanceData: () => Promise<void>;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { language } = useLanguage();
  const t = translations[language === "es" ? "es" : "en"];

  const [profiles, setProfiles] = useState<ProfileOption[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [profileSearch, setProfileSearch] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setProfilesLoading(true);

        const { data, error } = await supabase
          .from("profiles")
          .select(
            "id, first_name, last_name, email, phone, race, nationality, is_approved, account_status, language_preference",
          )
          .eq("is_approved", true)
          .neq("account_status", "suspended")
          .order("first_name", { ascending: true });

        if (error) throw error;

        setProfiles((data || []) as ProfileOption[]);
      } catch (error) {
        console.error("Failed to load profiles for attendance modal:", error);
        setProfiles([]);
      } finally {
        setProfilesLoading(false);
      }
    };

    loadProfiles();
  }, []);

  function formatDateLabel(dateValue: string | null) {
    if (!dateValue) return t.noDate;
    const date = new Date(`${dateValue}T00:00:00`);
    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatEventSchedule(
    dateValue: string | null,
    timeValue: string | null,
  ) {
    const dateLabel = formatDateLabel(dateValue);
    if (!timeValue) return dateLabel;

    const [hours, minutes] = timeValue.split(":");
    const parsed = new Date();
    parsed.setHours(Number(hours || 0), Number(minutes || 0), 0, 0);

    const timeLabel = parsed.toLocaleTimeString(
      language === "es" ? "es-ES" : "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      },
    );

    return `${dateLabel} • ${timeLabel}`;
  }

  function getEventLocation(event?: SchedulerForm | null) {
    if (!event) return t.noLocation;
    return (
      [event.street_address, event.city, event.country]
        .filter(Boolean)
        .join(", ") || t.noLocation
    );
  }

  const getProfileName = (profile: ProfileOption) => {
    return (
      `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
      profile.email ||
      t.unnamedUser
    );
  };

  const filteredProfiles = useMemo(() => {
    const query = profileSearch.trim().toLowerCase();

    return profiles.filter((profile) => {
      const haystack = [
        profile.first_name,
        profile.last_name,
        profile.email,
        profile.phone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return !query || haystack.includes(query);
    });
  }, [profiles, profileSearch]);

  const handleSelectProfile = (profile: ProfileOption) => {
    const fullName = getProfileName(profile);

    setSelectedProfileId(profile.id);
    handleAttendanceFormChange("name", fullName);
    handleAttendanceFormChange("email", profile.email || "");
    handleAttendanceFormChange("phone", profile.phone || "");
  };

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.id === selectedProfileId) || null,
    [profiles, selectedProfileId],
  );

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 px-2 text-blue-700">
              {editingRecordId ? <PenLineIcon size={18} /> : <Plus size={18} />}
            </div>
            <div>
              <h2 className="text-base font-semibold leading-5 text-slate-800 md:text-lg">
                {editingRecordId
                  ? t.editAttendanceRecord
                  : t.addAttendanceRecord}
              </h2>
              <p className="mt-1 text-xs leaing-4 text-slate-500 md:text-sm">
                {t.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-slate-600 transition hover:bg-slate-50"
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="grid min-h-0 grid-cols-1 overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
          <div
            className={`border-b border-slate-100 bg-slate-50/60 p-6 lg:border-b-0 lg:border-r ${
              editingRecordId ? "hidden lg:block" : ""
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {t.addFromUsers}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.addFromUsersDescription}
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                <Users size={18} />
              </div>
            </div>

            <div className="relative mb-4">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={profileSearch}
                onChange={(e) => setProfileSearch(e.target.value)}
                placeholder={t.searchUsers}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="max-h-107.5 space-y-2 overflow-y-auto pr-1">
              {profilesLoading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
                  {t.loadingUsers}
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-5 text-center">
                  <UserPlus className="mx-auto mb-2 text-slate-300" size={22} />
                  <p className="text-sm font-medium text-slate-500">
                    {t.noUsersFound}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {t.noUsersFoundDescription}
                  </p>
                </div>
              ) : (
                filteredProfiles.map((profile) => {
                  const name = getProfileName(profile);
                  const isSelected = selectedProfileId === profile.id;

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => handleSelectProfile(profile)}
                      className={`group w-full cursor-pointer rounded-2xl border p-3 text-left transition hover:-translate-y-px hover:shadow-md ${
                        isSelected
                          ? "border-blue-200 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-blue-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700"
                          }`}
                        >
                          {name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {name}
                            </p>
                            {isSelected && (
                              <CheckCircle2
                                size={17}
                                className="shrink-0 text-blue-700"
                              />
                            )}
                          </div>

                          {profile.email && (
                            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500">
                              <Mail size={12} />
                              {profile.email}
                            </p>
                          )}

                          {profile.phone && (
                            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500">
                              <Phone size={12} />
                              {profile.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <UserPlus size={18} />
                  </div>
                  <div className="my-auto">
                    <p className="text-sm font-semibold text-slate-800">
                      {t.customParticipant}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 hidden md:block">
                      {t.customParticipantDescription}
                    </p>
                    {selectedProfile && (
                      <p className="mt-2 inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                        {t.selected}: {getProfileName(selectedProfile)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <form className="my-6 flex flex-col gap-4">
              <div className="w-full">
                <FieldSelect
                  label={t.event}
                  value={attendanceForm.eventId}
                  onChange={(value) =>
                    handleAttendanceFormChange("eventId", value)
                  }
                  options={[
                    { value: "", label: t.selectEvent },
                    ...events.map((event) => ({
                      value: event.id,
                      label: event.name_en,
                    })),
                  ]}
                />
              </div>

              <FieldInput
                label={t.participantName}
                value={attendanceForm.name}
                onChange={(value) => {
                  setSelectedProfileId(null);
                  handleAttendanceFormChange("name", value);
                }}
                placeholder={t.enterParticipantName}
              />

              <FieldInput
                label={t.email}
                value={attendanceForm.email}
                onChange={(value) => {
                  setSelectedProfileId(null);
                  handleAttendanceFormChange("email", value);
                }}
                placeholder="participant@email.com"
              />

              <FieldInput
                label={t.phone}
                value={attendanceForm.phone}
                onChange={(value) => {
                  setSelectedProfileId(null);
                  handleAttendanceFormChange("phone", value);
                }}
                placeholder="(000) 000-0000"
              />
            </form>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {t.eventDetails}
              </p>

              {selectedEventDetails ? (
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-blue-600" />
                    {formatEventSchedule(
                      selectedEventDetails.date,
                      selectedEventDetails.time,
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-blue-600" />
                    {getEventLocation(selectedEventDetails as SchedulerForm)}
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-400">
                  {t.previewEventDetails}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5">
          <button
            onClick={closeModal}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            {t.cancel}
          </button>

          <button
            onClick={() =>
              handleSaveAttendanceRecord({
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
              })
            }
            disabled={saving}
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg 
              transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? t.saving : editingRecordId ? t.saveChanges : t.addRecord}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAttendanceRecordModal;
