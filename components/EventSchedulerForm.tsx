"use client";
import { useState, useMemo } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { InviteeProfile, SchedulerForm } from "../lib/interfaces/events";
import { getNextRecurringDate } from "../helpers/calendar";

import EventSchedulerStep1 from "./EventSchedulerStep1";
import EventSchedulerStep2 from "./EventSchedulerStep2";
import EventSchedulerStep3 from "./EventSchedulerStep3";
import EventSchedulerStep4 from "./EventSchedulerStep4";
import EventSchedulerStep5 from "./EventSchedulerStep5";

const EventSchedulerForm = ({
  step,
  schedulerForm,
  setSchedulerForm,
  profiles,
  errors,
  setErrors,
  imagePreview,
  setImageFile,
  isEdit,
  setShowHostDropdown,
  showHostDropdown,
  profilesLoading,
  selectedInvitees,
  setSelectedInvitees,
  hostDropdownRef,
  inviteSearch,
  setInviteSearch,
  handleCancelSelectedOccurrence,
}: {
  step: number;
  schedulerForm: SchedulerForm;
  setSchedulerForm: React.Dispatch<React.SetStateAction<SchedulerForm>>;
  profiles: InviteeProfile[];
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  imagePreview?: string | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  isEdit?: boolean;
  showHostDropdown: boolean;
  setShowHostDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  profilesLoading: boolean;
  selectedInvitees: string[];
  setSelectedInvitees: React.Dispatch<React.SetStateAction<string[]>>;
  hostDropdownRef: React.RefObject<HTMLDivElement>;
  inviteSearch: string;
  setInviteSearch: React.Dispatch<React.SetStateAction<string>>;
  handleCancelSelectedOccurrence: () => void;
}) => {
  const [hostSearch, setHostSearch] = useState("");
  const [eventLanguage, setEventLanguage] = useState("en");
  const [detailsLanguage, setDetailsLanguage] = useState<"en" | "es">("en");

  const allMonthsSelected =
    schedulerForm?.monthsCsv &&
    schedulerForm?.monthsCsv.split(",").filter(Boolean).length === 12;

  const allDaysSelected =
    schedulerForm?.daysOfWeekCsv &&
    schedulerForm?.daysOfWeekCsv.split(",").filter(Boolean).length === 7;

  const filteredProfiles = profiles.filter((profile) => {
    const q = inviteSearch.trim().toLowerCase();
    if (!q) return true;

    const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`
      .trim()
      .toLowerCase();

    return (
      fullName.includes(q) ||
      String(profile.email || "")
        .toLowerCase()
        .includes(q)
    );
  });

  const resolvedOccurrenceDate =
    schedulerForm?.scheduleType === "recurrent"
      ? getNextRecurringDate(schedulerForm)
      : schedulerForm?.date || null;

  const attendanceReportHref =
    schedulerForm?.id && schedulerForm?.createAttendanceSheet
      ? `/attendance-report?eventId=${
          schedulerForm.id
        }&occurrenceDate=${encodeURIComponent(
          resolvedOccurrenceDate as string
        )}`
      : null;

  const checkInHref =
    schedulerForm?.id && resolvedOccurrenceDate
      ? `/check-in/${schedulerForm.id}?occurrenceDate=${encodeURIComponent(
          resolvedOccurrenceDate
        )}`
      : null;

  const hostOptions = useMemo(() => {
    return (profiles || []).map((profile) => ({
      id: profile.id,
      label: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
      email: profile.email || "",
    }));
  }, [profiles]);

  const filteredHostOptions = useMemo(() => {
    const q = hostSearch.trim().toLowerCase();

    return hostOptions.filter((option) => {
      return (
        !q ||
        option.label.toLowerCase().includes(q) ||
        option.email.toLowerCase().includes(q)
      );
    });
  }, [hostOptions, hostSearch]);

  const formatReadableDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return "";

    const date = new Date(y, m - 1, d);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const normalizeValue = (name: string, value: string) => {
    if (["price", "dayOfMonth", "month"].includes(name)) {
      return value === "" ? "" : value;
    }
    return value;
  };

  const handlePeriodChange = (name: string, value: string | number) => {
    setSchedulerForm((prev: SchedulerForm) => ({ ...prev, [name]: value }));
    setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setSchedulerForm((prev: SchedulerForm) => ({
      ...prev,
      [name]: normalizeValue(name, value),
    }));

    setErrors((prev: Record<string, string>) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setSchedulerForm((prev: SchedulerForm) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const toggleAttendanceSheet = () => {
    setSchedulerForm((prev: SchedulerForm) => ({
      ...prev,
      createAttendanceSheet: !prev.createAttendanceSheet,
    }));
  };

  const toggleInvitee = (id: string) => {
    setSelectedInvitees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {step === 1 && (
        <EventSchedulerStep1
          schedulerForm={schedulerForm}
          setSchedulerForm={setSchedulerForm}
          isEdit={isEdit as boolean}
          toggleAttendanceSheet={toggleAttendanceSheet}
          attendanceReportHref={attendanceReportHref as string}
          checkInHref={checkInHref as string}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview as string}
          handleCancelSelectedOccurrence={handleCancelSelectedOccurrence}
        />
      )}

      {step === 2 && (
        <EventSchedulerStep2
          schedulerForm={schedulerForm}
          setSchedulerForm={setSchedulerForm}
          handleChange={handleChange}
          errors={errors}
          setErrors={setErrors}
          eventLanguage={eventLanguage}
          setEventLanguage={setEventLanguage}
          hostDropdownRef={hostDropdownRef}
          hostSearch={hostSearch}
          setHostSearch={setHostSearch}
          showHostDropdown={showHostDropdown}
          setShowHostDropdown={setShowHostDropdown}
          filteredHostOptions={filteredHostOptions}
          profilesLoading={profilesLoading}
        />
      )}

      {step === 3 && (
        <EventSchedulerStep3
          schedulerForm={schedulerForm}
          handleChange={handleChange}
          handlePeriodChange={handlePeriodChange}
          errors={errors}
          allDaysSelected={allDaysSelected as boolean}
          allMonthsSelected={allMonthsSelected as boolean}
          formatReadableDate={formatReadableDate}
        />
      )}

      {step === 4 && (
        <EventSchedulerStep4
          schedulerForm={schedulerForm}
          handleChange={handleChange}
          errors={errors}
        />
      )}

      {step === 5 && (
        <EventSchedulerStep5
          schedulerForm={schedulerForm}
          setSchedulerForm={setSchedulerForm}
          handleChange={handleChange}
          errors={errors}
          setErrors={setErrors}
          inviteSearch={inviteSearch}
          setInviteSearch={setInviteSearch}
          filteredProfiles={filteredProfiles}
          profilesLoading={profilesLoading}
          selectedInvitees={selectedInvitees}
          setSelectedInvitees={setSelectedInvitees}
          toggleInvitee={toggleInvitee}
          detailsLanguage={detailsLanguage}
          setDetailsLanguage={setDetailsLanguage}
          // formatReadableDate={formatReadableDate}
        />
      )}
    </>
  );
};

export default EventSchedulerForm;

export const Section = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${
          open ? "border-b border-slate-200 py-3" : "py-4"
        } flex w-full items-center justify-between bg-linear-to-r from-white via-slate-50 to-blue-50 px-4 transition duration-300 hover:from-blue-50 hover:to-slate-100`}
      >
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <span className="text-blue-700 transition-all duration-300">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
