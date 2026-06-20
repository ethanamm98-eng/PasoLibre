"use client";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Mail,
  Phone,
  PencilLine,
  Trash2,
} from "lucide-react";

import { useLanguage } from "../context/language";
import { ParticipantAvatar } from "./elements/AttendanceReport";
import { AttendanceRecord } from "../attendance-report/page";
import { SchedulerForm } from "../lib/interfaces/events";

const translations = {
  en: {
    loadingAttendanceData: "Loading attendance data...",
    noAttendanceRecordsFound: "No attendance records found",
    adjustFilters: "Adjust your filters or add a new attendance record.",
    event: "Event",
    unknownEvent: "Unknown Event",
    date: "Date",
    location: "Location",
    participant: "Participant",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    showing: "Showing",
    of: "of",
    records: "records",
    prev: "Prev",
    next: "Next",
    showAll: "Show all",
    hideAll: "Hide all",
  },
  es: {
    loadingAttendanceData: "Cargando datos de asistencia...",
    noAttendanceRecordsFound: "No se encontraron registros de asistencia",
    adjustFilters:
      "Ajusta tus filtros o añade un nuevo registro de asistencia.",
    event: "Evento",
    unknownEvent: "Evento desconocido",
    date: "Fecha",
    location: "Ubicación",
    participant: "Participante",
    actions: "Acciones",
    edit: "Editar",
    delete: "Eliminar",
    showing: "Mostrando",
    of: "de",
    records: "registros",
    prev: "Anterior",
    next: "Siguiente",
    showAll: "Mostrar todo",
    hideAll: "Ocultar todo",
  },
};

const AttendanceReportTable = ({
  dataLoading,
  filteredRecords,
  paginatedRecords,
  eventMap,
  currentPage,
  setCurrentPage,
  totalPages,
  pageStart,
  pageEnd,
  openEditModal,
  formatEventSchedule,
  getInitials,
  handleDeleteAttendanceRecord,
}: {
  dataLoading: boolean;
  filteredRecords: AttendanceRecord[];
  paginatedRecords: AttendanceRecord[] | null;
  eventMap: Map<string, SchedulerForm>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
  openEditModal: (record: AttendanceRecord) => void;
  formatEventSchedule: (date: string | null, time: string | null) => string;
  getInitials: (name: string) => string;
  handleDeleteAttendanceRecord: (recordId: string) => void;
}) => {
  const { language } = useLanguage();
  const t = translations[language === "es" ? "es" : "en"];

  const recordsScopeKey = useMemo(
    () =>
      `${currentPage}:${paginatedRecords
        ?.map((record) => String(record.id))
        .join("|")}`,
    [currentPage, paginatedRecords]
  );

  const [expandedState, setExpandedState] = useState<{
    scopeKey: string;
    records: Record<string, boolean>;
  }>({
    scopeKey: "",
    records: {},
  });

  const expandedRecords =
    expandedState.scopeKey === recordsScopeKey ? expandedState.records : {};

  const toggleRecordDetails = (recordId: string) => {
    setExpandedState((prev) => {
      const currentRecords =
        prev.scopeKey === recordsScopeKey ? prev.records : {};

      return {
        scopeKey: recordsScopeKey,
        records: {
          ...currentRecords,
          [recordId]: !currentRecords[recordId],
        },
      };
    });
  };

  const showAllMobileDetails = () => {
    const nextState: Record<string, boolean> = {};

    paginatedRecords?.forEach((record) => {
      nextState[String(record.id)] = true;
    });

    setExpandedState({
      scopeKey: recordsScopeKey,
      records: nextState,
    });
  };

  const hideAllMobileDetails = () => {
    setExpandedState({
      scopeKey: recordsScopeKey,
      records: {},
    });
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/92 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      {dataLoading ? (
        <div className="p-16 text-center">
          <p className="font-medium text-slate-500">
            {t.loadingAttendanceData}
          </p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="p-16 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Users size={22} />
          </div>
          <p className="font-medium text-slate-500">
            {t.noAttendanceRecordsFound}
          </p>
          <p className="mt-1 text-sm text-slate-400">{t.adjustFilters}</p>
        </div>
      ) : (
        <>
          <div className="block lg:hidden">
            <div className="flex items-center justify-end gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
              <button
                onClick={showAllMobileDetails}
                className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm transition active:scale-95"
              >
                {t.showAll}
              </button>

              <button
                onClick={hideAllMobileDetails}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition active:scale-95"
              >
                {t.hideAll}
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {paginatedRecords?.map((record) => {
                const event = eventMap.get(record.eventId);
                const initials = getInitials(record.name);
                const isExpanded = !!expandedRecords[String(record.id)];

                return (
                  <div
                    key={`${record.id}-mobile`}
                    className="space-y-4 p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <ParticipantAvatar
                        name={record.name}
                        profilePicture={record.profilePicture}
                        initials={initials}
                        size="mobile"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="truncate font-semibold text-slate-900">
                            {record.name}
                          </p>

                          <button
                            onClick={() =>
                              toggleRecordDetails(String(record.id))
                            }
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50"
                          >
                            <ChevronDown
                              size={17}
                              className={`transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </button>
                        </div>

                        <div className="mt-1 space-y-1 text-xs text-slate-400">
                          {record.email && (
                            <p className="flex items-center gap-1 truncate">
                              <Mail size={12} />
                              {record.email}
                            </p>
                          )}

                          {record.phone && (
                            <p className="flex items-center gap-1 truncate">
                              <Phone size={12} />
                              {record.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {t.event}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {language === "es"
                                ? event?.name_es ||
                                  event?.name_en ||
                                  t.unknownEvent
                                : event?.name_en ||
                                  event?.name_es ||
                                  t.unknownEvent}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {formatEventSchedule(
                                event?.date || null,
                                event?.time || null
                              )}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {t.date}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {record.date}
                            </p>
                            {/* <div className="mt-2">
                              <StatusBadge
                                status={record.status}
                                attendanceReportCopy={attendanceReportCopy}
                                getLanguageKey={getLanguageKey}
                              />
                            </div> */}
                          </div>
                        </div>

                        {record.location && (
                          <div className="rounded-2xl border border-slate-100 bg-white p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {t.location}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {record.location}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => openEditModal(record)}
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border 
                        border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                      >
                        <PencilLine size={15} />
                        {t.edit}
                      </button>

                      <button
                        onClick={() => handleDeleteAttendanceRecord(record.id)}
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 shadow-sm transition hover:bg-red-100"
                      >
                        <Trash2 size={15} />
                        {t.delete}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-225 w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/90">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t.participant}
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t.event}
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t.date}
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedRecords?.map((record) => {
                  const event = eventMap?.get(record.eventId);
                  const initials = getInitials(record.name);

                  return (
                    <tr
                      key={record.id}
                      className="transition-colors hover:bg-blue-50/40"
                    >
                      <td className="px-6 py-5">
                        <div className="flex max-w-60 items-center gap-3">
                          <ParticipantAvatar
                            name={record.name}
                            profilePicture={record.profilePicture}
                            initials={initials}
                          />

                          <div className="min-w-0">
                            <span className="font-medium text-slate-900">
                              {record.name}
                            </span>

                            {(record.email || record.phone) && (
                              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                                {record.email && (
                                  <span className="mb-0 flex items-center gap-1">
                                    <Mail size={12} />
                                    {record.email}
                                  </span>
                                )}
                                {record.phone && (
                                  <span className="mb-0 flex items-center gap-1">
                                    <Phone size={12} />
                                    {record.phone}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-900">
                          {language === "es"
                            ? event?.name_es || event?.name_en || t.unknownEvent
                            : event?.name_en ||
                              event?.name_es ||
                              t.unknownEvent}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {formatEventSchedule(
                            event?.date || null,
                            event?.time || null
                          )}
                        </p>
                      </td>

                      <td className="px-6 py-5 font-medium text-slate-700">
                        {record.date}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(record)}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 
                            text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                          >
                            <PencilLine size={15} />
                            {t.edit}
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteAttendanceRecord(record.id)
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-600 shadow-sm transition hover:bg-red-100"
                          >
                            <Trash2 size={15} />
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="flex mx-auto justify-center flex-col gap-4 border-t border-slate-200 bg-slate-50/80 px-4 py-5 sm:px-6 
          lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="text-sm text-slate-500 text-center md:text-left">
              {t.showing}{" "}
              <span className="font-semibold text-slate-800">
                {pageStart}-{pageEnd}
              </span>{" "}
              {t.of}{" "}
              <span className="font-semibold text-slate-800">
                {filteredRecords.length}
              </span>{" "}
              {t.records}
            </div>

            <div className="flex justify-center w-full flex-wrap items-center gap-2 lg:w-auto">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm 
                font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                {t.prev}
              </button>

              <div className="flex max-w-full items-center gap-2 overflow-x-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 3),
                    Math.max(0, currentPage - 3) + 5
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 min-w-10 rounded-xl px-3 text-xs sm:text-sm  font-semibold transition ${
                        currentPage === page
                          ? "bg-linear-to-r from-[#0d4db0] to-indigo-700 text-white shadow-md"
                          : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm 
                font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.next}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceReportTable;
