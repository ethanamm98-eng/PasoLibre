"use client";
import Image from "next/image";
import {
  IconButton,
  RoleBadge,
  StatusBadge,
  User,
} from "../account-manager/page";
import {
  Eye,
  ShieldCheck,
  Trash2,
  UserCog,
  UserX,
  CheckCircle2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useLanguage } from "../context/language";

const translations = {
  en: {
    status: "Status",
    source: "Source",
    role: "Role",
    activity: "Activity",
    events: "events",
    user: "User",
    eventsHeader: "Events",
    attendanceHeader: "Attendance",
    attended: "Attended",
    registered: "Registered",
    actions: "Actions",
    view: "View",
    makeMember: "Make Member",
    makeAdmin: "Make Admin",
    approve: "Approve",
    deny: "Deny",
    delete: "Delete",
    showing: "Showing",
    users: "users",
    quickCsv: "Quick CSV",
    totalUsers: "Total Users",
    noAttendance: "No attendance yet",
    page: "Page",
    of: "of",
    rowsPerPage: "Rows per page",
  },
  es: {
    status: "Estado",
    source: "Origen",
    role: "Rol",
    activity: "Actividad",
    events: "eventos",
    user: "Usuario",
    eventsHeader: "Eventos",
    attendanceHeader: "Asistencia",
    attended: "Asistió",
    registered: "Registrado",
    actions: "Acciones",
    view: "Ver",
    makeMember: "Hacer Miembro",
    makeAdmin: "Hacer Admin",
    approve: "Aprobar",
    deny: "Denegar",
    delete: "Eliminar",
    showing: "Mostrando",
    users: "usuarios",
    quickCsv: "CSV Rápido",
    totalUsers: "Total de Usuarios",
    noAttendance: "Sin asistencia aún",
    page: "Página",
    of: "de",
    rowsPerPage: "Filas por página",
  },
};

const PaginationButton = ({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
};

const AccountManagerTable = ({
  filteredUsers,
  paginatedUsers,
  setSelectedUser,
  setOpenUserModal,
  handleRoleChange,
  handleApprove,
  handleDeny,
  handleDeleteUser,
  actionLoadingId,
  // exportLoading,
  // setExportLoading,
  // setGlobalError,
  currentPage,
  setCurrentPage,
  recordsPerPage,
  setRecordsPerPage,
  totalPages,
  pageStart,
  pageEnd,
}: {
  filteredUsers: User[];
  paginatedUsers: User[];
  setSelectedUser: (user: User) => void;
  setOpenUserModal: (open: boolean) => void;
  handleRoleChange: (user: User, newRole: "member" | "admin") => void;
  handleApprove: (user: User) => void;
  handleDeny: (user: User) => void;
  handleDeleteUser: (user: User) => void;
  actionLoadingId: string | null;
  // exportLoading: string | null;
  // setExportLoading: (format: Partial<User>) => void;
  // setGlobalError: (message: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  recordsPerPage: number;
  setRecordsPerPage: (value: number) => void;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
}) => {
  const { language } = useLanguage();
  const t = translations[language === "es" ? "es" : "en"];

  return (
    <>
      <div className="block lg:hidden divide-y divide-slate-100">
        {paginatedUsers?.map((user: User) => {
          const isBusy = actionLoadingId === user?.id;

          return (
            <div
              key={`${user?.source}-${user?.id}-mobile`}
              className="p-4 sm:p-5 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xs font-semibold overflow-hidden shadow-md ring-2 ring-white">
                  {user?.profilePicture ? (
                    <Image
                      src={user?.profilePicture}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    @{user?.username}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                    {t.status}
                  </p>
                  <StatusBadge status={user.status} />
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                    {t.role}
                  </p>
                  <RoleBadge role={user.role} />
                </div>

                {/* <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                    {t.source}
                  </p>
                  <SourceBadge source={user.source} />
                </div> */}
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                  {t.attendanceHeader}
                </p>
                <AttendanceSummary user={user} />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <IconButton
                  icon={<Eye size={15} />}
                  label={t.view}
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenUserModal(true);
                  }}
                  disabled={isBusy}
                  variant="neutral"
                />

                {user.source === "profile" &&
                  (user.role === "member" || user.role === "admin") && (
                    <IconButton
                      icon={<UserCog size={15} />}
                      label={user.role === "admin" ? t.makeMember : t.makeAdmin}
                      onClick={() =>
                        handleRoleChange(
                          user,
                          user.role === "admin" ? "member" : "admin"
                        )
                      }
                      disabled={isBusy}
                      variant="indigo"
                    />
                  )}

                {user.source === "pending_signup" &&
                  user.status === "pending" && (
                    <>
                      <IconButton
                        icon={<ShieldCheck size={15} />}
                        label={t.approve}
                        onClick={() => handleApprove(user)}
                        disabled={isBusy}
                        variant="green"
                      />
                      <IconButton
                        icon={<UserX size={15} />}
                        label={t.deny}
                        onClick={() => handleDeny(user)}
                        disabled={isBusy}
                        variant="red"
                      />
                    </>
                  )}

                {user.source === "profile" && user.role !== "super_admin" && (
                  <IconButton
                    icon={<Trash2 size={15} />}
                    label={t.delete}
                    onClick={() => handleDeleteUser(user)}
                    disabled={isBusy}
                    variant="red"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-7xl text-sm">
          <thead className="bg-slate-50/90 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.user}
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.status}
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.role}
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.attendanceHeader}
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.actions}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedUsers?.map((user) => {
              const isBusy = actionLoadingId === user.id;

              return (
                <tr
                  key={`${user.source}-${user.id}`}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xs font-semibold overflow-hidden shadow-md ring-2 ring-white">
                        {user.profilePicture ? (
                          <Image
                            src={user.profilePicture}
                            alt={`${user.firstName} ${user.lastName}`}
                            width={44}
                            height={44}
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
                        <p className="font-semibold text-slate-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                        <p className="text-xs text-slate-400">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-6 py-5">
                    <RoleBadge role={user.role} />
                  </td>

                  <td className="px-6 py-5">
                    <AttendanceSummary user={user} />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <IconButton
                        icon={<Eye size={15} />}
                        label={t.view}
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenUserModal(true);
                        }}
                        disabled={isBusy}
                        variant="neutral"
                      />

                      {user.source === "profile" &&
                        (user.role === "member" || user.role === "admin") && (
                          <IconButton
                            icon={<UserCog size={15} />}
                            label={
                              user.role === "admin" ? t.makeMember : t.makeAdmin
                            }
                            onClick={() =>
                              handleRoleChange(
                                user,
                                user.role === "admin" ? "member" : "admin"
                              )
                            }
                            disabled={isBusy}
                            variant="indigo"
                          />
                        )}

                      {user.source === "pending_signup" &&
                        user.status === "pending" && (
                          <>
                            <IconButton
                              icon={<ShieldCheck size={15} />}
                              label={t.approve}
                              onClick={() => handleApprove(user)}
                              disabled={isBusy}
                              variant="green"
                            />
                            <IconButton
                              icon={<UserX size={15} />}
                              label={t.deny}
                              onClick={() => handleDeny(user)}
                              disabled={isBusy}
                              variant="red"
                            />
                          </>
                        )}

                      {user?.source === "profile" &&
                        user?.role !== "super_admin" && (
                          <IconButton
                            icon={<Trash2 size={15} />}
                            label={t.delete}
                            onClick={() => handleDeleteUser(user)}
                            disabled={isBusy}
                            variant="red"
                          />
                        )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 px-4 sm:px-6 py-5 bg-slate-50/80 border-t border-slate-200">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <p className="text-sm text-slate-500 text-center xl:text-left">
            {t.showing}{" "}
            <span className="font-semibold text-slate-800">{pageStart}</span>
            {" - "}
            <span className="font-semibold text-slate-800">{pageEnd}</span>{" "}
            {t.of}{" "}
            <span className="font-semibold text-slate-800">
              {filteredUsers.length}
            </span>{" "}
            {t.users}
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label className="flex items-center justify-center gap-2 text-sm text-slate-500">
              {t.rowsPerPage}
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>

            <div className="flex items-center justify-center gap-2">
              <PaginationButton
                label="First page"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft size={16} />
              </PaginationButton>

              <PaginationButton
                label="Previous page"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </PaginationButton>

              <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm whitespace-nowrap">
                {t.page} {currentPage} {t.of} {totalPages}
              </span>

              <PaginationButton
                label="Next page"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </PaginationButton>

              <PaginationButton
                label="Last page"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight size={16} />
              </PaginationButton>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <ActionPill
            icon={<Download size={15} />}
            label={t.quickCsv}
            onClick={() =>
              exportCSV({
                filteredUsers,
                setExportLoading,
                setGlobalError,
              })
            }
            disabled={exportLoading !== null || filteredUsers.length === 0}
            variant="secondary"
          />

          <p className="text-sm font-semibold text-slate-700">
            {t.totalUsers}: {users.length}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default AccountManagerTable;

export const AttendanceSummary = ({ user }: { user: User }) => {
  const { language } = useLanguage();
  const t = translations[language === "es" ? "es" : "en"];

  const attendanceCount = Number(user?.attendanceCount || 0);
  const attendedCount = Number(user?.attendedCount || 0);

  if (!attendanceCount) {
    return (
      <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
        <CalendarCheck size={14} />
        {t.noAttendance}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          <CheckCircle2 size={12} />
          {attendedCount} {t.attended}
        </span>
      </div>
    </div>
  );
};
