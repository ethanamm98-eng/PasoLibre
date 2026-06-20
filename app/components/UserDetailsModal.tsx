"use client";
import Image from "next/image";
import {
  Mail,
  Phone,
  User,
  Shield,
  CalendarDays,
  MapPin,
  Heart,
  Briefcase,
  UserRound,
  Sparkles,
  CheckCircle2,
  Clock3,
  Crown,
  ShieldCheck,
  UserCog,
  CalendarRange,
  X,
} from "lucide-react";
import { TbRainbow } from "react-icons/tb";

import { useLanguage } from "../context/language";
import { User as UserInterface } from "../account-manager/page";

type UserRole = "member" | "admin" | "super_admin";

const translations = {
  en: {
    userDetails: "User Details",
    approved: "Approved",
    notApproved: "Not Approved",
    roleManagement: "Role Management",
    updating: "Updating...",
    setMember: "Set Member",
    setAdmin: "Set Admin",
    profileInformation: "Profile Information",
    profileInformationSubtitle: "Core account and personal profile details",
    accountOverview: "Account Overview",
    accountOverviewSubtitle: "Approval, status, and system information",
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    gender: "Gender",
    pronouns: "Pronouns",
    dateOfBirth: "Date of Birth",
    raceEthnicity: "Race/Ethnicity",
    nationality: "Nationality",
    city: "City",
    country: "Country",
    sexualOrientation: "Sexual Orientation",
    occupation: "Occupation",
    userId: "User ID",
    languagePreference: "Language Preference",
    email: "Email",
    phone: "Phone",
    createdAt: "Created At",
    eventParticipation: "Event Participation",
    eventParticipationSubtitle: "Attendance and RSVP activity",
    noEventsYet: "No events yet.",
    eventId: "Event ID",
    formResponses: "Form Responses",
    formResponsesSubtitle: "Submitted forms and completion history",
    noSubmissions: "No submissions.",
    formId: "Form ID",
    submitted: "Submitted",
    statuses: {
      pending: "Pending",
      active: "Active",
      suspended: "Suspended",
    },
    roles: {
      member: "Member",
      admin: "Admin",
      super_admin: "Super Admin",
    },
    languages: {
      en: "English",
      es: "Spanish",
    },
  },
  es: {
    userDetails: "Detalles del Usuario",
    approved: "Aprobado",
    notApproved: "No Aprobado",
    roleManagement: "Gestión de Rol",
    updating: "Actualizando...",
    setMember: "Asignar Miembro",
    setAdmin: "Asignar Admin",
    profileInformation: "Información del Perfil",
    profileInformationSubtitle:
      "Detalles principales de la cuenta y del perfil personal",
    accountOverview: "Resumen de la Cuenta",
    accountOverviewSubtitle: "Aprobación, estado e información del sistema",
    firstName: "Nombre",
    lastName: "Apellido",
    username: "Nombre de Usuario",
    gender: "Género",
    pronouns: "Pronombres",
    dateOfBirth: "Fecha de Nacimiento",
    raceEthnicity: "Raza/Etnicidad",
    nationality: "Nacionalidad",
    city: "Ciudad",
    country: "País",
    sexualOrientation: "Orientación Sexual",
    occupation: "Ocupación",
    userId: "ID del Usuario",
    languagePreference: "Preferencia de Idioma",
    email: "Correo Electrónico",
    phone: "Teléfono",
    createdAt: "Creado El",
    eventParticipation: "Participación en Eventos",
    eventParticipationSubtitle: "Actividad de asistencia y RSVP",
    noEventsYet: "Aún no hay eventos.",
    eventId: "ID del Evento",
    formResponses: "Respuestas de Formularios",
    formResponsesSubtitle: "Formularios enviados e historial de finalización",
    noSubmissions: "No hay envíos.",
    formId: "ID del Formulario",
    submitted: "Enviado",
    statuses: {
      pending: "Pendiente",
      active: "Activo",
      suspended: "Suspendido",
    },
    roles: {
      member: "Miembro",
      admin: "Admin",
      super_admin: "Super Admin",
    },
    languages: {
      en: "Inglés",
      es: "Español",
    },
  },
};

export default function UserDetailsModal({
  user,
  onClose,
  onRoleChange,
  loading = false,
}: {
  user: UserInterface;
  onClose: () => void;
  onRoleChange?: (user: UserInterface, role: "member" | "admin") => void | Promise<void>;
  loading?: boolean;
}) {
  const { language } = useLanguage(); // es or en
  const t = translations[language === "es" ? "es" : "en"];
  const canChangeRole = user.role === "member" || user.role === "admin";

  // const translatedStatus = t?.statuses[user.status] || user?.status;
  const translatedRole = t?.roles[user.role] || user?.role;
  const translatedLanguagePreference =
    user?.language_preference === "en"
      ? t?.languages.en
      : user?.language_preference === "es"
      ? t?.languages.es
      : user?.language_preference;

  return (
    <div className="fixed inset-0 z-1200 bg-black/55 backdrop-blur-[2px] flex items-start justify-center px-4 pt-28 pb-6">
      <div className="relative w-full max-w-5xl max-h-[calc(100vh-8rem)] overflow-y-auto rounded-4xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_18%)] 
        pointer-events-none rounded-4xl"
        />

        <div className="relative">
          <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex items-start justify-between gap-4 sticky top-0 z-10 bg-white/85 backdrop-blur-md rounded-t-4xl border-b border-slate-100">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles size={14} />
              {t.userDetails}
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/90 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition 
              flex items-center justify-center shadow-sm cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 md:px-8 pb-8 space-y-4 md:space-y-8">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-linear-to-br from-[#0d4db0] to-indigo-700 text-white shadow-[0_20px_60px_rgba(37,99,235,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_20%)] pointer-events-none" />

              <div className="relative px-6 md:px-8 py-10 flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex md:flex-roe flex-col items-center gap-5">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/15 border border-white/25 overflow-hidden shadow-lg flex items-center 
                  justify-center text-white text-2xl font-semibold flex-col md:flex-row">
                    {user.profilePicture ? (
                      <Image
                        src={user.profilePicture}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </>
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-white/75 mt-1">@{user.username}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {/* <HeaderBadge
                        icon={getStatusIcon(user.status)}
                        label={translatedStatus}
                        variant={getStatusVariant(user.status)}
                      /> */}
                      <HeaderBadge
                        icon={getRoleIcon(user.role)}
                        label={translatedRole}
                        variant={getRoleVariant(user.role)}
                      />
                      <HeaderBadge
                        icon={
                          user.isApproved ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock3 size={14} />
                          )
                        }
                        label={user.isApproved ? t.approved : t.notApproved}
                        variant={user.isApproved ? "green" : "amber"}
                      />
                    </div>
                  </div>
                </div>

                {canChangeRole && (
                  <div className="lg:ml-auto">
                    <div className="rounded-[1.25rem] border border-white/20 bg-white/10 backdrop-blur-md p-4 shadow-lg">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
                        {t.roleManagement}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <PremiumButton
                          icon={<User size={15} />}
                          label={
                            loading && user.role !== "member"
                              ? t.updating
                              : t.setMember
                          }
                          onClick={() => onRoleChange?.(user, "member")}
                          disabled={loading || user.role === "member"}
                          variant="light"
                        />

                        <PremiumButton
                          icon={<ShieldCheck size={15} />}
                          label={
                            loading && user.role !== "admin"
                              ? t.updating
                              : t.setAdmin
                          }
                          onClick={() => onRoleChange?.(user, "admin")}
                          disabled={loading || user.role === "admin"}
                          variant="solid"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
              <SectionCard
                title={t.profileInformation}
                subtitle={t.profileInformationSubtitle}
                icon={<UserRound size={18} />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    label={t.firstName}
                    value={user.firstName}
                    icon={<User size={15} />}
                  />
                  <InfoCard
                    label={t.lastName}
                    value={user.lastName}
                    icon={<User size={15} />}
                  />
                  {/* <InfoCard
                    label={t.username}
                    value={user.username}
                    icon={<UserRound size={15} />}
                  /> */}
                  <InfoCard
                    label={t.gender}
                    value={user.gender}
                    icon={<UserRound size={15} />}
                  />
                  <InfoCard
                    label={t.pronouns}
                    value={user.pronouns}
                    icon={<TbRainbow size={15} />}
                  />
                  <InfoCard
                    label={t.dateOfBirth}
                    value={user.dob}
                    icon={<CalendarDays size={15} />}
                  />

                  <InfoCard
                    label={t.raceEthnicity}
                    value={user?.race}
                    icon={<MapPin size={15} />}
                  />
                  <InfoCard
                    label={t.nationality}
                    value={user?.nationality}
                    icon={<Heart size={15} />}
                  />

                  <InfoCard
                    label={t.city}
                    value={user?.city}
                    icon={<MapPin size={15} />}
                  />
                  <InfoCard
                    label={t.country}
                    value={user?.country}
                    icon={<MapPin size={15} />}
                  />
                  <InfoCard
                    label={t.sexualOrientation}
                    value={user.sexualOrientation}
                    icon={<Heart size={15} />}
                  />
                  <InfoCard
                    label={t.occupation}
                    value={user.occupation}
                    icon={<Briefcase size={15} />}
                  />
                </div>
              </SectionCard>

              <SectionCard
                title={t.accountOverview}
                subtitle={t.accountOverviewSubtitle}
                icon={<Shield size={18} />}
              >
                <div className="space-y-4">
                  {/* <OverviewRow label={t.userId} value={user.id} mono /> */}
                  <InfoCard
                    label={t.email}
                    value={user.email}
                    icon={<Mail size={15} />}
                  />
                  <InfoCard
                    label={t.phone}
                    value={user.phone}
                    icon={<Phone size={15} />}
                  />
                  <InfoCard
                    label={t.createdAt}
                    value={formatDate(user.createdAt)}
                    icon={<CalendarRange size={15} />}
                  />
                  <InfoCard
                    label={t.languagePreference}
                    value={translatedLanguagePreference}
                    icon={<Phone size={15} />}
                  />
                </div>
              </SectionCard>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
              {/* TODO: Finish */}
              {/* <SectionCard
                title={t.eventParticipation}
                subtitle={t.eventParticipationSubtitle}
                icon={<CalendarDays size={18} />}
              >
                {!user?.events?.length ? (
                  <EmptyPanel text={t.noEventsYet} />
                ) : (
                  <div className="space-y-3">
                    {user.events.map((e) => (
                      <div
                        key={e.eventId}
                        className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {e.title}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                              {t.eventId}: {e.eventId}
                            </p>
                          </div>

                          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {e.rsvpStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard> */}

              {/* ----------------------------  WORKING ON ENDPOINTS ------------------------------- */}
              {/* <SectionCard
                title={t.formResponses}
                subtitle={t.formResponsesSubtitle}
                icon={<FileText size={18} />}
              >
                {!user?.formResponses?.length ? (
                  <EmptyPanel text={t.noSubmissions} />
                ) : (
                  <div className="space-y-3">
                    {user.formResponses.map((f) => (
                      <div
                        key={f.formId}
                        className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm hover:shadow-md transition"
                      >
                        <p className="font-semibold text-slate-900">
                          {f.formName}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {t.formId}: {f.formId}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          {t.submitted} {formatDate(f.submittedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="px-5 md:px-6 py-5 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white px-4 py-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-slate-400">{icon}</span>
        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
          {label}
        </p>
      </div>
      <p className="text-sm font-medium text-slate-800 wrap-break-word">
        {value || "—"}
      </p>
    </div>
  );
}

function PremiumButton({
  icon,
  label,
  onClick,
  disabled,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: "solid" | "light";
}) {
  const styles =
    variant === "solid"
      ? "bg-white text-[#0d4db0] hover:bg-blue-50 shadow-md"
      : "bg-white/10 text-white border border-white/20 hover:bg-white/20";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed 
        cursor-pointer ${styles}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function HeaderBadge({
  icon,
  label,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  variant: "green" | "blue" | "amber" | "red" | "purple" | "slate";
}) {
  const styles =
    variant === "green"
      ? "bg-emerald-400/15 border-emerald-300/30 text-white"
      : variant === "blue"
      ? "bg-blue-400/15 border-blue-300/30 text-white"
      : variant === "amber"
      ? "bg-amber-400/15 border-amber-300/30 text-white"
      : variant === "red"
      ? "bg-red-400/15 border-red-300/30 text-white"
      : variant === "purple"
      ? "bg-purple-400/15 border-purple-300/30 text-white"
      : "bg-white/10 border-white/20 text-white";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${styles}`}
    >
      {icon}
      {label}
    </span>
  );
}

function getRoleIcon(role: UserRole) {
  if (role === "super_admin") return <Crown size={14} />;
  if (role === "admin") return <ShieldCheck size={14} />;
  return <UserCog size={14} />;
}

function getRoleVariant(role: UserRole): "purple" | "blue" | "slate" {
  if (role === "super_admin") return "purple";
  if (role === "admin") return "blue";
  return "slate";
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}
