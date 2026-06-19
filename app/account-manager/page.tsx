"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Search,
  UserCheck,
  FileText,
  FileSpreadsheet,
  Crown,
  Users,
  Clock3,
} from "lucide-react";

import { supabase } from "../lib/supabase/supabaseClient";
import { exportCSV, exportPDF } from "../helpers/account-manager";
import { useLanguage } from "../context/language";

import Navbar from "../components/NavBar";
import UserDetailsModal from "../components/UserDetailsModal";
import AccountManagerTable from "../components/AccountManagerTable";

export type UserStatus = "pending" | "active";
export type UserRole = "member" | "admin" | "super_admin";

export type UserEvent = {
  eventId: string;
  title: string;
  rsvpStatus: string;
};

export type UserFormResponse = {
  formId: string;
  formName: string;
  submittedAt: string;
};

export type UserAttendance = {
  id: string;
  attendanceSheetId: string;
  eventId?: string;
  eventTitleEn?: string;
  eventTitleEs?: string;
  occurrenceDate?: string;
  status?: string;
  checkedIn?: boolean;
  checkedInAt?: string;
};

export type User = {
  id: string;
  source: "profile" | "pending_signup";
  pendingSignupId?: string;
  profileId?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  status: UserStatus;
  role: UserRole;
  gender?: string;
  pronouns?: string;
  dob?: string;
  city?: string;
  country?: string;
  race?: string;
  nationality?: string;
  sexualOrientation?: string;
  occupation?: string;
  profilePicture?: string;
  isApproved?: boolean;
  createdAt?: string;
  reviewedAt?: string | null;
  denialReason?: string | null;
  eventsCount: number;
  formsCount: number;
  events?: UserEvent[];
  formResponses?: UserFormResponse[];
  attendance?: UserAttendance[];
  attendanceCount?: number;
  attendedCount?: number;
  registeredCount?: number;
  cancelledAttendanceCount?: number;
  languagePreference?: string;
  language_preference?: string;
};

export type UsersResponse = {
  success: boolean;
  users?: User[];
  message?: string;
};

const adminUsersText = {
  en: {
    adminFallback: "Admin",
    failedLoadUsers: "Failed to load users.",
    actionFailed: "Action failed.",
    pendingOnlyApprove: "Only pending signup requests can be approved here.",
    approveTitle: "Approve account?",
    approveText: (name: string) =>
      `This will approve ${name} and notify them by email.`,
    approveConfirm: "Yes, approve",
    cancel: "Cancel",
    approvedTitle: "Account approved",
    approvedText: "The user was approved successfully.",
    approvalFailedTitle: "Approval failed",
    approvalFailedText: "Unable to approve this account.",
    pendingOnlyDeny: "Only pending signup requests can be denied here.",
    denyTitle: "Deny account request?",
    denyInputLabel: "Reason for denial",
    denyInputPlaceholder: "Optional reason...",
    denyConfirm: "Deny request",
    deniedTitle: "Request denied",
    deniedText: "The user was notified by email.",
    denyFailedTitle: "Deny failed",
    denyFailedText: "Unable to deny this request.",
    approvedOnlyDelete:
      "Only approved user accounts can be permanently deleted.",
    superAdminDeleteBlocked: "Super admin accounts cannot be deleted here.",
    deleteTitle: "Permanently delete user?",
    deleteHtml: (name: string) => `
        <p>This will permanently delete <strong>${name}</strong>.</p>
        <p style="margin-top:8px;font-size:13px;color:#64748b;">This deletes their profile, related pending signup data, and Auth user. This cannot be undone.</p>
      `,
    deleteConfirm: "Yes, delete permanently",
    deletedTitle: "User deleted",
    deletedText: "The user was permanently deleted.",
    deleteFailedTitle: "Delete failed",
    deleteFailedText: "Unable to permanently delete this user.",
    approveBeforeRole: "Approve this user before changing their role.",
    superAdminRoleBlocked: "Super admin role cannot be changed here.",
    makeAdminTitle: "Make this user an admin?",
    makeMemberTitle: "Make this user a member?",
    roleChangeText: (name: string, role: "member" | "admin") =>
      `${name}'s role will be changed to ${role}.`,
    roleConfirm: "Yes, update role",
    roleUpdatedTitle: "Role updated",
    roleFailedTitle: "Role update failed",
    roleFailedText: "Unable to update this user's role.",
    checkingAdminAccess: "Checking admin access...",
    adminConsole: "Admin Console",
    pageTitle: "User Accounts",
    pageDescription:
      "Review pending approvals, manage active users, change roles, and export account data in a polished control center.",
    exportCsv: "Export CSV",
    exportingCsv: "Exporting CSV...",
    exportPdf: "Export PDF",
    exportingPdf: "Exporting PDF...",
    stats: {
      totalTitle: "Total Users",
      totalSubtitle: "Profiles + pending requests",
      pendingTitle: "Pending",
      pendingSubtitle: "Awaiting approval",
      activeTitle: "Active",
      activeSubtitle: "Approved users",
      adminsTitle: "Admins",
      adminsSubtitle: "Admin access",
    },
    allStatuses: "All Statuses",
    pending: "Pending",
    active: "Active",
    searchPlaceholder: "Search by name, username, email, role, or source...",
    showing: "Showing",
    of: "of",
    loadingUsers: "Loading users...",
    noUsersFound: "No users found",
    attended: "Attended",
    noAttendance: "No attendance",
  },
  es: {
    adminFallback: "Administrador",
    failedLoadUsers: "No se pudieron cargar los usuarios.",
    actionFailed: "La acción falló.",
    pendingOnlyApprove:
      "Solo las solicitudes de registro pendientes se pueden aprobar aquí.",
    approveTitle: "¿Aprobar cuenta?",
    approveText: (name: string) =>
      `Esto aprobará a ${name} y le notificará por correo electrónico.`,
    approveConfirm: "Sí, aprobar",
    cancel: "Cancelar",
    approvedTitle: "Cuenta aprobada",
    approvedText: "El usuario fue aprobado correctamente.",
    approvalFailedTitle: "No se pudo aprobar",
    approvalFailedText: "No se pudo aprobar esta cuenta.",
    pendingOnlyDeny:
      "Solo las solicitudes de registro pendientes se pueden denegar aquí.",
    denyTitle: "¿Denegar solicitud de cuenta?",
    denyInputLabel: "Razón de la denegación",
    denyInputPlaceholder: "Razón opcional...",
    denyConfirm: "Denegar solicitud",
    deniedTitle: "Solicitud denegada",
    deniedText: "El usuario fue notificado por correo electrónico.",
    denyFailedTitle: "No se pudo denegar",
    denyFailedText: "No se pudo denegar esta solicitud.",
    approvedOnlyDelete:
      "Solo las cuentas de usuarios aprobados se pueden eliminar permanentemente.",
    superAdminDeleteBlocked:
      "Las cuentas de superadministrador no se pueden eliminar aquí.",
    deleteTitle: "¿Eliminar usuario permanentemente?",
    deleteHtml: (name: string) => `
        <p>Esto eliminará permanentemente a <strong>${name}</strong>.</p>
        <p style="margin-top:8px;font-size:13px;color:#64748b;">Esto elimina su perfil, datos relacionados de registro pendiente y usuario de Auth. Esta acción no se puede deshacer.</p>
      `,
    deleteConfirm: "Sí, eliminar permanentemente",
    deletedTitle: "Usuario eliminado",
    deletedText: "El usuario fue eliminado permanentemente.",
    deleteFailedTitle: "No se pudo eliminar",
    deleteFailedText: "No se pudo eliminar permanentemente este usuario.",
    approveBeforeRole: "Aprueba este usuario antes de cambiar su rol.",
    superAdminRoleBlocked:
      "El rol de superadministrador no se puede cambiar aquí.",
    makeAdminTitle: "¿Convertir este usuario en administrador?",
    makeMemberTitle: "¿Convertir este usuario en miembro?",
    roleChangeText: (name: string, role: "member" | "admin") =>
      `${name} cambiará su rol a ${
        role === "admin" ? "administrador" : "miembro"
      }.`,
    roleConfirm: "Sí, actualizar rol",
    roleUpdatedTitle: "Rol actualizado",
    roleFailedTitle: "No se pudo actualizar el rol",
    roleFailedText: "No se pudo actualizar el rol de este usuario.",
    checkingAdminAccess: "Verificando acceso de administrador...",
    adminConsole: "Consola de administración",
    pageTitle: "Cuentas de usuarios",
    pageDescription:
      "Revisa aprobaciones pendientes, administra usuarios activos, cambia roles y exporta datos de cuentas desde un centro de control elegante.",
    exportCsv: "Exportar CSV",
    exportingCsv: "Exportando CSV...",
    exportPdf: "Exportar PDF",
    exportingPdf: "Exportando PDF...",
    stats: {
      totalTitle: "Usuarios totales",
      totalSubtitle: "Perfiles + solicitudes pendientes",
      pendingTitle: "Pendientes",
      pendingSubtitle: "En espera de aprobación",
      activeTitle: "Activos",
      activeSubtitle: "Usuarios aprobados",
      adminsTitle: "Administradores",
      adminsSubtitle: "Acceso administrativo",
    },
    allStatuses: "Todos los estados",
    pending: "Pendiente",
    active: "Activo",
    searchPlaceholder: "Buscar por nombre, usuario, correo, rol o fuente...",
    showing: "Mostrando",
    of: "de",
    loadingUsers: "Cargando usuarios...",
    noUsersFound: "No se encontraron usuarios",
    attended: "Asistió",
    noAttendance: "Sin asistencia",
  },
};

const getLocalizedUserRole = (
  role: UserRole,
  language: "en" | "es" | string
) => {
  const isSpanish = language === "es";

  if (role === "super_admin") {
    return isSpanish ? "Superadministrador" : "Super Admin";
  }

  if (role === "admin") {
    return isSpanish ? "Administrador" : "Admin";
  }

  return isSpanish ? "Miembro" : "Member";
};

const getLocalizedUserStatus = (
  status: UserStatus,
  language: "en" | "es" | string
) => {
  const isSpanish = language === "es";

  if (status === "pending") return isSpanish ? "Pendiente" : "Pending";
  if (status === "active") return isSpanish ? "Activo" : "Active";

  return status;
};

const getLocalizedUserSource = (
  source: User["source"],
  language: "en" | "es" | string
) => {
  const isSpanish = language === "es";
  return source === "pending_signup"
    ? isSpanish
      ? "Solicitud"
      : "Request"
    : isSpanish
    ? "Perfil"
    : "Profile";
};

export default function AdminUsersPage() {
  const { language } = useLanguage();
  const t = adminUsersText[language === "es" ? "es" : "en"];
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [exportLoading, setExportLoading] = useState<"pdf" | "csv" | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, account_status, is_approved")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        const isAdmin =
          profile?.is_approved === true &&
          profile?.account_status === "active" &&
          ["admin", "super_admin"].includes(profile?.role);

        if (!isAdmin) {
          router.replace("/");
          return;
        }

        setAuthChecked(true);
      } catch (error) {
        console.error("Admin validation error:", error);
        router.replace("/");
      }
    };

    validateAdmin();
  }, [router]);

  const loadUsers = async () => {
    try {
      setPageLoading(true);
      setGlobalError("");

      const response = await fetch("/api/admin/users", {
        method: "GET",
        cache: "no-store",
      });

      let result: UsersResponse | null = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.message || t.failedLoadUsers);
      }

      const baseUsers = result?.users || [];
      const profileUsers = baseUsers.filter(
        (user) => user.source === "profile"
      );

      const memberIds = profileUsers
        .map((user) => user.profileId || user.id)
        .filter(Boolean);

      const emails = profileUsers.map((user) => user.email).filter(Boolean);

      let attendanceRows: {
        id: string;
        attendance_sheet_id: string;
        member_id?: string;
        participant_email?: string;
        checked_in?: boolean;
        checked_in_at?: string;
        status?: string;
        occurrence_date?: string;
        attendance_sheets?: {
          id: string;
          event_id?: string;
          occurrence_date?: string;
          events?: {
            id: string;
            name_en?: string;
            name_es?: string;
          };
        };
      }[] = [];

      if (memberIds.length || emails.length) {
        const { data, error: attendanceError } = await supabase
          .from("attendance_sheet_entries")
          .select(
            `
            id,
            attendance_sheet_id,
            member_id,
            participant_email,
            checked_in,
            checked_in_at,
            status,
            occurrence_date,
            attendance_sheets (
              id,
              event_id,
              occurrence_date,
              events (
                id,
                name_en,
                name_es
              )
            )
          `
          )
          .or(
            [
              memberIds?.length ? `member_id.in.(${memberIds.join(",")})` : "",
              emails?.length
                ? `participant_email.in.(${emails.join(",")})`
                : "",
            ]
              .filter(Boolean)
              .join(",")
          );

        if (attendanceError) throw attendanceError;

        (attendanceRows as unknown) = data || [];
      }

      const attendanceByUser = new Map<string, UserAttendance[]>();

      attendanceRows.forEach((row) => {
        const matchedUser = profileUsers.find((user) => {
          const profileId = user.profileId || user.id;

          return (
            row.member_id === profileId ||
            row.participant_email?.toLowerCase() === user.email?.toLowerCase()
          );
        });

        if (!matchedUser) return;

        const key = matchedUser.id;
        const current = attendanceByUser.get(key) || [];

        current.push({
          id: row.id,
          attendanceSheetId: row.attendance_sheet_id,
          eventId: row.attendance_sheets?.event_id,
          eventTitleEn: row.attendance_sheets?.events?.name_en,
          eventTitleEs: row.attendance_sheets?.events?.name_es,
          occurrenceDate:
            row.occurrence_date || row.attendance_sheets?.occurrence_date,
          status: row.status,
          checkedIn: !!row.checked_in,
          checkedInAt: row.checked_in_at,
        });

        attendanceByUser.set(key, current);
      });

      const usersWithAttendance = baseUsers.map((user) => {
        const attendance = attendanceByUser.get(user.id) || [];

        return {
          ...user,
          attendance,
          attendanceCount: attendance.length,
          attendedCount: attendance.filter(
            (entry) => entry.status === "attended" || entry.checkedIn
          ).length,
          registeredCount: attendance.filter(
            (entry) => entry.status === "registered"
          ).length,
          cancelledAttendanceCount: attendance.filter(
            (entry) => entry.status === "cancelled"
          ).length,
        };
      });

      setUsers(usersWithAttendance);
    } catch (error) {
      console.error("loadUsers error:", error);
      setGlobalError(
        (error instanceof Error ? error.message : String(error)) ||
          t.failedLoadUsers
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (authChecked) loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authChecked, refreshKey]);

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const haystack =
        `${user.firstName} ${user.lastName} ${user.username} ${user.email} ${user.role} ${user.source}`.toLowerCase();

      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const summary = useMemo(() => {
    const pending = users.filter((u) => u.status === "pending").length;
    const active = users.filter((u) => u.status === "active").length;
    const admins = users.filter(
      (u) => u.role === "admin" || u.role === "super_admin"
    ).length;

    return {
      total: users.length,
      pending,
      active,
      admins,
    };
  }, [users]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / recordsPerPage)
  );

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * recordsPerPage;
    return filteredUsers.slice(start, start + recordsPerPage);
  }, [filteredUsers, currentPage, recordsPerPage]);

  const pageStart =
    filteredUsers.length === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;

  const pageEnd = Math.min(currentPage * recordsPerPage, filteredUsers.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, recordsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const runAction = async (
    url: string,
    body: Record<string, unknown>,
    loadingId: string
  ) => {
    setActionLoadingId(loadingId);
    setGlobalError("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let result = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.message || result?.error || t.actionFailed);
      }

      setRefreshKey((prev) => prev + 1);
      return result;
    } catch (error) {
      console.error("Action error:", error);
      setGlobalError(
        (error instanceof Error ? error.message : String(error)) ||
          t.actionFailed
      );
      throw error;
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleApprove = async (user: User) => {
    if (user.source !== "pending_signup") {
      setGlobalError(t.pendingOnlyApprove);
      return;
    }

    const result = await Swal.fire({
      title: t.approveTitle,
      text: t.approveText(`${user.firstName} ${user.lastName}`),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t.approveConfirm,
      cancelButtonText: t.cancel,
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    try {
      await runAction(
        "/api/admin/approve-user",
        { pendingSignupId: user.pendingSignupId || user.id },
        user.id
      );

      await Swal.fire({
        icon: "success",
        title: t.approvedTitle,
        text: t.approvedText,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: t.approvalFailedTitle,
        text: t.approvalFailedText,
      });
    }
  };

  const handleDeny = async (user: User) => {
    if (user.source !== "pending_signup") {
      setGlobalError(t.pendingOnlyDeny);
      return;
    }

    const result = await Swal.fire({
      title: t.denyTitle,
      input: "textarea",
      inputLabel: t.denyInputLabel,
      inputPlaceholder: t.denyInputPlaceholder,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.denyConfirm,
      cancelButtonText: t.cancel,
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await runAction(
        "/api/admin/deny-user",
        {
          pendingSignupId: user.pendingSignupId || user.id,
          reason: result.value || "",
        },
        user.id
      );

      await Swal.fire({
        icon: "success",
        title: t.deniedTitle,
        text: t.deniedText,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: t.denyFailedTitle,
        text: t.denyFailedText,
      });
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.source !== "profile") {
      setGlobalError(t.approvedOnlyDelete);
      return;
    }

    if (user.role === "super_admin") {
      setGlobalError(t.superAdminDeleteBlocked);
      return;
    }

    const result = await Swal.fire({
      title: t.deleteTitle,
      html: t.deleteHtml(`${user.firstName} ${user.lastName}`),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.deleteConfirm,
      cancelButtonText: t.cancel,
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await runAction(
        "/api/admin/delete-user",
        { profileId: user.profileId || user.id },
        user.id
      );

      await Swal.fire({
        icon: "success",
        title: t.deletedTitle,
        text: t.deletedText,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: t.deleteFailedTitle,
        text: t.deleteFailedText,
      });
    }
  };

  const handleRoleChange = async (user: User, role: "member" | "admin") => {
    if (user.source !== "profile") {
      setGlobalError(t.approveBeforeRole);
      return;
    }

    if (user.role === "super_admin") {
      setGlobalError(t.superAdminRoleBlocked);
      return;
    }

    const result = await Swal.fire({
      title: role === "admin" ? t.makeAdminTitle : t.makeMemberTitle,
      text: t.roleChangeText(`${user.firstName} ${user.lastName}`, role),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t.roleConfirm,
      cancelButtonText: t.cancel,
      confirmButtonColor: "#4f46e5",
    });

    if (!result.isConfirmed) return;

    try {
      await runAction(
        "/api/admin/update-user-role",
        { profileId: user.profileId || user.id, role },
        user.id
      );

      await Swal.fire({
        icon: "success",
        title: t.roleUpdatedTitle,
        timer: 1600,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: t.roleFailedTitle,
        text: t.roleFailedText,
      });
    }
  };

  if (!authChecked) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
          {t.checkingAdminAccess}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_30%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] 
      py-4 md:py-10 px-4 md:px-6"
      >
        <div className="w-full md:max-w-7xl mx-auto space-y-4 md:space-y-8">
          <div
            className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white/80 backdrop-blur-xl 
          shadow-[0_30px_80px_rgba(15,23,42,0.10)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_22%)] pointer-events-none" />

            <div className="relative px-6 md:px-8 py-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="min-w-30 my-auto mx-4 hidden sm:hidden md:block lg:block">
                  <div className="p-1.5 border border-solid shadow-xl rounded-full bg-white border-slate-300 m-auto">
                    <div className="m-auto border rounded-full bg-linear-to-br from-[#0d4db0] to-blue-700 shadow-xl w-26 h-26 flex justify-center items-center">
                      <Image
                        src="/logo-title-2.png"
                        alt="Paso Libre Logo"
                        width={140}
                        height={80}
                        className="rounded-xl object-contain m-auto scale-150"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-auto">
                  {/* <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 text-xs font-semibold mb-3">
                    <Sparkles size={14} />
                    {t.adminConsole}
                  </div> */}

                  <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-slate-900">
                    {t.pageTitle}
                  </h1>
                  <p className="text-slate-500 mt-2 max-w-2xl text-xs md:text-sm">
                    {t.pageDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4">
            <StatCard
              title={t.stats.totalTitle}
              value={summary.total}
              subtitle={t.stats.totalSubtitle}
              icon={<Users size={18} />}
            />
            <StatCard
              title={t.stats.pendingTitle}
              value={summary.pending}
              subtitle={t.stats.pendingSubtitle}
              icon={<Clock3 size={18} />}
            />
            <StatCard
              title={t.stats.activeTitle}
              value={summary.active}
              subtitle={t.stats.activeSubtitle}
              icon={<UserCheck size={18} />}
            />
            <StatCard
              title={t.stats.adminsTitle}
              value={summary.admins}
              subtitle={t.stats.adminsSubtitle}
              icon={<Crown size={18} />}
            />
          </div>

          {globalError && (
            <div className="rounded-2xl border border-red-200 bg-red-50/90 backdrop-blur-sm px-5 py-4 text-sm text-red-600 shadow-sm">
              {globalError}
            </div>
          )}

          <div className="rounded-[1.75rem] border border-slate-200  backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-5 md:p-6">
            <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
              <div className="flex md:min-w-[40%] items-center gap-3">
                <ActionPill
                  icon={<FileSpreadsheet size={16} />}
                  label={exportLoading === "csv" ? t.exportingCsv : t.exportCsv}
                  onClick={() => {
                    // const updated = {
                    //   ...filteredUsers,
                    //   attendedCount: users?.attendedCount,
                    // };
                    exportCSV({
                      filteredUsers: filteredUsers,
                      setExportLoading,
                      setGlobalError,
                    });
                  }}
                  disabled={
                    exportLoading !== null || filteredUsers.length === 0
                  }
                  variant="secondary"
                />
                <ActionPill
                  icon={<FileText size={16} />}
                  label={exportLoading === "pdf" ? t.exportingPdf : t.exportPdf}
                  onClick={() =>
                    exportPDF({
                      filteredUsers,
                      setExportLoading,
                      setGlobalError,
                    })
                  }
                  disabled={
                    exportLoading !== null || filteredUsers.length === 0
                  }
                  variant="primary"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="relative w-full md:max-w-xs">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as "all" | UserStatus)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="all">{t.allStatuses}</option>
                    <option value="pending">{t.pending}</option>
                    <option value="active">{t.active}</option>
                  </select>
                </div>

                <div className="relative w-full md:max-w-md">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* <div className="text-sm text-slate-500 min-w-25">
                {t.showing}{" "}
                <span className="font-semibold text-slate-800">
                  {filteredUsers.length}
                </span>{" "}
                {t.of}{" "}
                <span className="font-semibold text-slate-800">
                  {users?.length}
                </span>
              </div> */}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(15,23,42,0.08)] overflow-hidden">
            {pageLoading ? (
              <div className="p-16 text-center text-slate-400">
                {t.loadingUsers}
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-16 text-center text-slate-400">
                {t.noUsersFound}
              </div>
            ) : (
              <AccountManagerTable
                filteredUsers={filteredUsers}
                paginatedUsers={paginatedRecords}
                setSelectedUser={setSelectedUser}
                setOpenUserModal={setOpenUserModal}
                handleRoleChange={handleRoleChange}
                handleApprove={handleApprove}
                handleDeny={handleDeny}
                handleDeleteUser={handleDeleteUser}
                actionLoadingId={actionLoadingId}
                // exportLoading={exportLoading}
                // setExportLoading={setExportLoading}
                // setGlobalError={setGlobalError}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                recordsPerPage={recordsPerPage}
                setRecordsPerPage={setRecordsPerPage}
                totalPages={totalPages}
                pageStart={pageStart}
                pageEnd={pageEnd}
              />
            )}
          </div>
        </div>

        {openUserModal && selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => {
              setOpenUserModal(false);
              setSelectedUser(null);
            }}
            onRoleChange={handleRoleChange}
            loading={actionLoadingId === selectedUser.id}
          />
        )}
      </div>
    </>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-semibold text-slate-900 mt-2">{value}</p>
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: UserStatus }) {
  const { language } = useLanguage();

  const styles =
    status === "pending"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : status === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles}`}
    >
      {getLocalizedUserStatus(status, language)}
    </span>
  );
}

export function SourceBadge({ source }: { source: User["source"] }) {
  const { language } = useLanguage();
  const label = getLocalizedUserSource(source, language);

  const styles =
    source === "pending_signup"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}

export function RoleBadge({ role }: { role: UserRole }) {
  const { language } = useLanguage();

  const styles =
    role === "super_admin"
      ? "bg-purple-50 text-purple-700 border-purple-200"
      : role === "admin"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : role === "member"
      ? "bg-teal-50 text-teal-700 border-teal-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase ${styles}`}
    >
      {getLocalizedUserRole(role, language)}
    </span>
  );
}

export function IconButton({
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
  variant: "neutral" | "green" | "red" | "indigo";
}) {
  const variantStyles =
    variant === "green"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
      : variant === "red"
      ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
      : variant === "indigo"
      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200"
      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} cursor-pointer`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function ActionPill({
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
  variant: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#0d4db0] to-indigo-700 text-white shadow-lg hover:shadow-xl"
      : " text-white border border-slate-200 hover:bg-slate-50   bg-linear-to-r from-green-600 to-green-700";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles} cursor-pointer`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
