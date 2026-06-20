"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase/supabaseClient";
import { SchedulerForm, InviteeProfile } from "../lib/interfaces/events";
import {
  getNextRecurringDate,
  getWeekdayIndexesFromCsv,
} from "../helpers/calendar";
import { useLanguage } from "../context/language";

import { IoClose } from "react-icons/io5";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { BiExpandAlt, BiCollapseAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { Save } from "lucide-react";

import EventSchedulerForm from "./EventSchedulerForm";

interface ConfirmationSwalOptions {
  icon: "success" | "error" | "warning" | "info" | "question";
  title: string;
  text: string;
  timer: number;
  timerProgressBar: boolean;
  showConfirmButton: boolean;
}

interface ErrorResponse {
  [x: string]: string;
}

const normalizeDirtyCheckValue = (value: unknown): unknown => {
  if (value instanceof File) {
    return {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified,
    };
  }

  if (Array.isArray(value)) {
    return value.map(normalizeDirtyCheckValue);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = normalizeDirtyCheckValue(
          (value as Record<string, unknown>)[key]
        );
        return acc;
      }, {});
  }

  return value ?? "";
};

const getDirtySnapshot = ({
  schedulerForm,
  selectedInvitees,
  imageFile,
}: {
  schedulerForm: SchedulerForm;
  selectedInvitees: string[];
  imageFile: File | null;
}) =>
  JSON.stringify(
    normalizeDirtyCheckValue({
      schedulerForm,
      selectedInvitees,
      imageFile,
    })
  );

const normalizeExcludedDate = (value?: string | null) => {
  if (!value) return "";

  return String(value).slice(0, 10);
};

const EventSchedulerModal = ({
  isEdit,
  onClose,
  createdBy,
  formRef,
  handleMouseDown,
  schedulerForm,
  setSchedulerForm,
  setReloadPageData,
  errors,
  setErrors,
  resetComposeForm,
  fullScreen,
  setFullScreen,
  selectedCalendarDate,
  setSelectedCalendarDate,
  loadEvents,
}: {
  isEdit?: boolean;
  onClose: () => void;
  createdBy?: string;
  formRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  schedulerForm: SchedulerForm;
  setSchedulerForm: React.Dispatch<React.SetStateAction<SchedulerForm>>;
  setReloadPageData: React.Dispatch<React.SetStateAction<boolean>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  resetComposeForm: () => void;
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCalendarDate?: string | null;
  setSelectedCalendarDate: React.Dispatch<React.SetStateAction<string | null>>;
  loadEvents?: () => void;
}) => {
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";
  const router = useRouter();

  const t = {
    options: isSpanish ? "Opciones" : "Options",
    details: isSpanish ? "Detalles" : "Details",
    schedule: isSpanish ? "Horario" : "Schedule",
    location: isSpanish ? "Ubicación" : "Location",
    access: isSpanish ? "Acceso" : "Access",

    discardChangesTitle: isSpanish ? "¿Descartar cambios?" : "Discard changes?",
    discardChangesText: isSpanish
      ? "Tienes información sin guardar. ¿Seguro que quieres cerrar este modal?"
      : "You have unsaved information. Are you sure you want to close this modal?",
    yesDiscard: isSpanish ? "Sí, descartar" : "Yes, discard",
    keepEditing: isSpanish ? "Seguir editando" : "Keep editing",

    eventNameRequired: isSpanish
      ? "El nombre del evento es requerido."
      : "Event name is required.",
    eventNameMin: isSpanish
      ? "El nombre del evento debe tener al menos 3 caracteres."
      : "Event name must be at least 3 characters.",
    descriptionRequired: isSpanish
      ? "La descripción es requerida."
      : "Description is required.",
    timeRequired: isSpanish ? "La hora es requerida." : "Time is required.",
    dateRequired: isSpanish ? "La fecha es requerida." : "Date is required.",
    priceInvalid: isSpanish
      ? "El precio debe ser 0 o mayor."
      : "Price must be 0 or greater.",
    locationUrlInvalid: isSpanish
      ? "La URL de ubicación debe ser una URL válida."
      : "Location URL must be a valid URL.",
    streetRequired: isSpanish
      ? "La dirección es requerida."
      : "Street address is required.",
    cityRequired: isSpanish ? "La ciudad es requerida." : "City is required.",
    countryRequired: isSpanish
      ? "El país es requerido."
      : "Country is required.",
    recurrenceRequired: isSpanish
      ? "La recurrencia es requerida."
      : "Recurrence is required.",
    selectOneDay: isSpanish
      ? "Selecciona al menos un día."
      : "Select at least one day.",
    dayOfMonthInvalid: isSpanish
      ? "El día del mes debe estar entre 1 y 31."
      : "Day of month must be between 1 and 31.",
    selectOneMonth: isSpanish
      ? "Selecciona al menos un mes."
      : "Select at least one month.",
    monthInvalid: isSpanish
      ? "El mes debe estar entre 1 y 12."
      : "Month must be between 1 and 12.",
    recurrenceIncomplete: isSpanish
      ? "Completa los ajustes de recurrencia para generar la próxima fecha."
      : "Complete the recurrence settings to generate the next date.",

    reviewStepTitle: isSpanish ? "Revisa este paso" : "Please review this step",
    reviewStepText: isSpanish
      ? "Faltan algunos campos requeridos o hay información inválida."
      : "Some required fields are missing or invalid.",

    invitationEmailsError: isSpanish
      ? "No se pudieron enviar los correos de invitación."
      : "Invitation emails could not be sent.",

    deleteEventTitle: isSpanish ? "¿Eliminar evento?" : "Delete event?",
    deleteEventText: isSpanish
      ? "Estás a punto de eliminar este evento de forma permanente. Los invitados ya no podrán acceder a él y todas las ocurrencias futuras serán eliminadas. Esta acción no se puede deshacer."
      : "You are about to permanently delete this event. Guests will no longer be able to access it, and any future occurrences will be removed. This action cannot be undone.",
    yesDelete: isSpanish ? "Sí, eliminar" : "Yes, delete it",
    cancel: isSpanish ? "Cancelar" : "Cancel",
    deletedTitle: isSpanish ? "Eliminado" : "Deleted",
    deletedText: isSpanish
      ? "El evento fue eliminado correctamente."
      : "The event was deleted successfully.",
    unableDeleteTitle: isSpanish
      ? "No se pudo eliminar el evento"
      : "Unable to delete event",
    unableDeleteText: isSpanish
      ? "Algo salió mal al eliminar el evento."
      : "Something went wrong while deleting the event.",

    cancelOccurrenceTitle: isSpanish
      ? "¿Cancelar esta fecha?"
      : "Cancel this occurrence?",
    cancelOccurrenceText: isSpanish
      ? "Esta fecha se agregará a las fechas excluidas de la recurrencia y se eliminarán sus registros de asistencia."
      : "This date will be added to the recurrence excluded dates and its attendance records will be removed.",
    cancelOccurrenceConfirm: isSpanish
      ? "Sí, cancelar fecha"
      : "Yes, cancel occurrence",
    cancelOccurrenceButton: isSpanish ? "Cancelar fecha" : "Cancel Date",
    cancellingOccurrence: isSpanish ? "Cancelando..." : "Cancelling...",
    occurrenceCancelledTitle: isSpanish
      ? "Fecha cancelada"
      : "Occurrence cancelled",
    occurrenceCancelledText: isSpanish
      ? "La fecha seleccionada fue excluida de la recurrencia correctamente."
      : "The selected date was successfully excluded from the recurrence.",
    unableCancelOccurrenceTitle: isSpanish
      ? "No se pudo cancelar la fecha"
      : "Unable to cancel occurrence",
    unableCancelOccurrenceText: isSpanish
      ? "Algo salió mal al cancelar esta fecha."
      : "Something went wrong while cancelling this occurrence.",
    missingOccurrenceDateTitle: isSpanish ? "Falta la fecha" : "Missing date",
    missingOccurrenceDateText: isSpanish
      ? "Selecciona una fecha válida para cancelar esta ocurrencia."
      : "Select a valid date before cancelling this occurrence.",
    onlyRecurringTitle: isSpanish
      ? "Solo eventos recurrentes"
      : "Recurring events only",
    onlyRecurringText: isSpanish
      ? "Esta acción solo aplica a eventos recurrentes."
      : "This action only applies to recurring events.",

    fixFormTitle: isSpanish ? "Corrige el formulario" : "Please fix the form",
    fixFormText: isSpanish
      ? "Faltan algunos campos o hay información inválida. Revisa el título y descripción del evento en ambos idiomas, y la fecha y hora."
      : "Some fields are missing or invalid. Check the event title and description in both languages, and date & time.",

    eventUpdatedTitle: isSpanish ? "Evento Actualizado" : "Event Updated",
    eventScheduledTitle: isSpanish ? "Evento Programado" : "Event Scheduled",
    eventSheetUpdated: isSpanish
      ? "Tu evento y la hoja de asistencia fueron actualizados correctamente."
      : "Your event and attendance sheet were updated successfully.",
    eventSheetCreated: isSpanish
      ? "Tu evento y la hoja de asistencia fueron creados correctamente."
      : "Your event and attendance sheet were created successfully.",
    eventUpdatedText: isSpanish
      ? "Tu evento fue actualizado correctamente."
      : "Your event has been updated successfully.",
    eventScheduledText: isSpanish
      ? "Tu evento fue programado correctamente."
      : "Your event has been scheduled successfully.",
    unableUpdateTitle: isSpanish
      ? "No se pudo actualizar el evento"
      : "Unable to update event",
    unableScheduleTitle: isSpanish
      ? "No se pudo programar el evento"
      : "Unable to schedule event",
    saveErrorText: isSpanish
      ? "Algo salió mal al guardar el evento."
      : "Something went wrong while saving the event.",

    editEvent: isSpanish ? "Editar Evento" : "Edit Event",
    scheduleEvent: isSpanish ? "Programar Evento" : "Schedule Event",
    updateDetails: isSpanish
      ? "Actualiza los detalles de tu evento"
      : "Update your event details",
    createExperience: isSpanish
      ? "Crea una experiencia de evento elegante"
      : "Create a polished event experience",

    wizardTitle: isSpanish
      ? "Asistente de Creación de Evento"
      : "Event Creation Wizard",
    wizardEditDescription: isSpanish
      ? "Actualiza los detalles de tu evento existente abajo."
      : "Update your existing event details below.",
    wizardCreateDescription: isSpanish
      ? "Crea un nuevo evento para Paso Libre con todos los detalles deseados abajo."
      : "Create a new event for Paso Libre with all the desired details below.",
    complete: isSpanish ? "Completado" : "Complete",
    step: isSpanish ? "Paso" : "Step",
    of: isSpanish ? "de" : "of",

    back: isSpanish ? "Atrás" : "Back",
    continue: isSpanish ? "Continuar" : "Continue",
    deleting: isSpanish ? "Eliminando..." : "Deleting...",
    delete: isSpanish ? "Eliminar" : "Delete",
    updating: isSpanish ? "Actualizando..." : "Updating...",
    scheduling: isSpanish ? "Programando..." : "Scheduling...",
    update: isSpanish ? "Actualizar" : "Update",
  };

  const [buttonLoading, setButtonLoading] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    schedulerForm?.imageUrl || null
  );

  const [step, setStep] = useState(1);

  const [profiles, setProfiles] = useState<InviteeProfile[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [inviteSearch, setInviteSearch] = useState("");
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [showHostDropdown, setShowHostDropdown] = useState(false);
  const hostDropdownRef = useRef<HTMLDivElement>(null);

  const initialFormSnapshotRef = useRef<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hostDropdownRef.current &&
        !hostDropdownRef.current.contains(event.target as Node)
      ) {
        setShowHostDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const steps = useMemo(
    () => [
      { id: 1, label: t.options },
      { id: 2, label: t.details },
      { id: 3, label: t.schedule },
      { id: 4, label: t.location },
      { id: 5, label: t.access },
    ],
    [t.options, t.details, t.schedule, t.location, t.access]
  );

  const progress = Math.round((step / steps.length) * 100);

  const showScopedSwal = (options: ConfirmationSwalOptions) => {
    return Swal.fire({
      target: formRef?.current || undefined,
      heightAuto: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      ...options,
    });
  };

  useEffect(() => {
    setImageFile(null);
    setImagePreview(schedulerForm?.imageUrl || null);
  }, [schedulerForm?.id, schedulerForm?.imageUrl]);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  useEffect(() => {
    initialFormSnapshotRef.current = getDirtySnapshot({
      schedulerForm,
      selectedInvitees,
      imageFile: null,
    });

    setHasUnsavedChanges(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedulerForm?.id, isEdit]);

  useEffect(() => {
    if (!initialFormSnapshotRef.current) return;

    const currentSnapshot = getDirtySnapshot({
      schedulerForm,
      selectedInvitees,
      imageFile,
    });

    setHasUnsavedChanges(currentSnapshot !== initialFormSnapshotRef.current);
  }, [schedulerForm, selectedInvitees, imageFile]);

  useEffect(() => {
    const container = formRef?.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step, formRef]);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setProfilesLoading(true);

        const { data, error } = await supabase
          .from("profiles")
          .select(
            "id, first_name, last_name, email, phone, is_approved, account_status, language_preference"
          )
          .eq("is_approved", true)
          .eq("account_status", "active")
          .order("first_name", { ascending: true });

        if (error) throw error;
        setProfiles((data || []) as InviteeProfile[]);
      } catch (error) {
        console.error("Failed to load invitee profiles:", error);
        setProfiles([]);
      } finally {
        setProfilesLoading(false);
      }
    };

    loadProfiles();
  }, []);

  useEffect(() => {
    if (schedulerForm?.scheduleType !== "recurrent") return;

    const recurrence = String(schedulerForm?.recurrence || "").toLowerCase();

    if (!recurrence) {
      if (schedulerForm?.date) {
        setSchedulerForm((prev: SchedulerForm) => ({
          ...prev,
          date: "",
        }));
      }
      return;
    }

    const nextDate = getNextRecurringDate(schedulerForm);

    if (!nextDate) {
      if (schedulerForm?.date) {
        setSchedulerForm((prev: SchedulerForm) => ({
          ...prev,
          date: "",
        }));
      }
      return;
    }

    if (schedulerForm?.date !== nextDate) {
      setSchedulerForm((prev: SchedulerForm) => ({
        ...prev,
        date: nextDate,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    schedulerForm?.scheduleType,
    schedulerForm?.recurrence,
    schedulerForm?.daysOfWeekCsv,
    schedulerForm?.dayOfMonth,
    schedulerForm?.month,
    schedulerForm?.monthsCsv,
    schedulerForm?.time,
  ]);

  const resetAndCloseModal = () => {
    resetComposeForm();
    setImageFile(null);
    setImagePreview(null);
    setSelectedInvitees([]);
    setInviteSearch("");
    setStep(1);
    setHasUnsavedChanges(false);
    initialFormSnapshotRef.current = "";
    onClose();
  };

  const handleClose = async () => {
    if (!hasUnsavedChanges) {
      resetAndCloseModal();
      return;
    }

    const result = await Swal.fire({
      target: formRef?.current || undefined,
      heightAuto: false,
      icon: "warning",
      title: t.discardChangesTitle,
      text: t.discardChangesText,
      showCancelButton: true,
      confirmButtonText: t.yesDiscard,
      cancelButtonText: t.keepEditing,
      reverseButtons: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
    });

    if (!result.isConfirmed) return;

    resetAndCloseModal();
  };

  const handleSetFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const uploadImageIfNeeded = async () => {
    if (!imageFile) return schedulerForm?.imageUrl || null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `event-${Date.now()}.${fileExt}`;
    const filePath = `events/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("events")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("events").getPublicUrl(filePath);
    return data?.publicUrl || null;
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    const trimmedNameEn = schedulerForm?.name_en?.trim() || "";
    const trimmedDescriptionEn = schedulerForm?.description_en?.trim() || "";
    const trimmedNameEs = schedulerForm?.name_es?.trim() || "";
    const trimmedDescriptionEs = schedulerForm?.description_es?.trim() || "";
    const trimmedLocationUrl = schedulerForm?.locationUrl?.trim() || "";
    const trimmedStreet = schedulerForm?.streetAddress?.trim() || "";
    const trimmedCity = schedulerForm?.city?.trim() || "";
    const trimmedCountry = schedulerForm?.country?.trim() || "";
    const trimmedZip = schedulerForm?.zipCode?.trim() || "";

    if (!trimmedNameEn) nextErrors.name_en = t.eventNameRequired;
    else if (trimmedNameEn.length < 3) {
      nextErrors.name_en = t.eventNameMin;
    }

    if (!trimmedDescriptionEn) {
      nextErrors.description_en = t.descriptionRequired;
    }

    if (!trimmedNameEs) nextErrors.name_es = t.eventNameRequired;
    else if (trimmedNameEs.length < 3) {
      nextErrors.name_es = t.eventNameMin;
    }

    if (!trimmedDescriptionEs) {
      nextErrors.description_es = t.descriptionRequired;
    }

    if (!schedulerForm?.time) {
      nextErrors.time = t.timeRequired;
    }

    if (schedulerForm?.scheduleType !== "recurrent" && !schedulerForm?.date) {
      nextErrors.date = t.dateRequired;
    }

    const priceValue =
      schedulerForm?.price === null ? 0 : Number(schedulerForm?.price);

    if (Number.isNaN(priceValue) || priceValue < 0) {
      nextErrors.price = t.priceInvalid;
    }

    if (trimmedLocationUrl) {
      try {
        new URL(trimmedLocationUrl);
      } catch {
        nextErrors.locationUrl = t.locationUrlInvalid;
      }
    }

    const hasLocationFields =
      trimmedStreet || trimmedCity || trimmedCountry || trimmedZip;

    if (hasLocationFields) {
      if (!trimmedStreet) {
        nextErrors.streetAddress = t.streetRequired;
      }
      if (!trimmedCity) nextErrors.city = t.cityRequired;
      if (!trimmedCountry) nextErrors.country = t.countryRequired;
    }

    if (schedulerForm?.scheduleType === "recurrent") {
      const recurrence = String(schedulerForm?.recurrence || "").toLowerCase();

      if (!recurrence) {
        nextErrors.recurrence = t.recurrenceRequired;
      }

      if (recurrence === "weekly") {
        const selectedDays = getWeekdayIndexesFromCsv(
          schedulerForm?.daysOfWeekCsv
        );

        if (!selectedDays.length) {
          nextErrors.daysOfWeekCsv = t.selectOneDay;
        }
      }

      if (recurrence === "monthly") {
        const dayOfMonth = Number(schedulerForm?.dayOfMonth);
        const selectedMonths =
          schedulerForm?.monthsCsv?.split(",").filter(Boolean) || [];

        if (!dayOfMonth || dayOfMonth < 1 || dayOfMonth > 31) {
          nextErrors.dayOfMonth = t.dayOfMonthInvalid;
        }

        if (!selectedMonths.length) {
          nextErrors.monthsCsv = t.selectOneMonth;
        }
      }

      if (recurrence === "yearly") {
        const dayOfMonth = Number(schedulerForm?.dayOfMonth);
        const month = Number(schedulerForm?.month);

        if (!dayOfMonth || dayOfMonth < 1 || dayOfMonth > 31) {
          nextErrors.dayOfMonth = t.dayOfMonthInvalid;
        }

        if (!month || month < 1 || month > 12) {
          nextErrors.month = t.monthInvalid;
        }
      }

      if (schedulerForm?.scheduleType !== "recurrent" && !schedulerForm?.date) {
        nextErrors.date = t.dateRequired;
      }

      if (recurrence && !getNextRecurringDate(schedulerForm)) {
        nextErrors.date = t.recurrenceIncomplete;
      }
    }

    setErrors(nextErrors);
    return {
      isValid: Object.keys(nextErrors).length === 0,
      nextErrors,
    };
  };

  const validateCurrentStep = () => {
    const { nextErrors } = validateForm();

    const stepFieldMap: Record<number, string[]> = {
      1: [],
      2: ["name_en", "description_en", "name_es", "description_es"],
      3: [
        "date",
        "time",
        "recurrence",
        "daysOfWeekCsv",
        "dayOfMonth",
        "month",
        "monthsCsv",
      ],
      4: ["streetAddress", "city", "country", "zipCode", "locationUrl"],
      5: ["price"],
    };

    return !stepFieldMap[step].some((field) => nextErrors[field]);
  };

  const nextStep = async () => {
    if (!validateCurrentStep()) {
      await showScopedSwal({
        icon: "warning",
        title: t.reviewStepTitle,
        text: t.reviewStepText,
        timer: 2200,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    setStep((prev: number) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setStep((prev: number) => Math.max(prev - 1, 1));
  };

  const deleteAttendanceForOccurrence = async ({
    eventId,
    occurrenceDate,
  }: {
    eventId: string;
    occurrenceDate: string;
  }) => {
    const { data: sheets, error: sheetsError } = await supabase
      .from("attendance_sheets")
      .select("id")
      .eq("event_id", eventId);

    if (sheetsError) throw sheetsError;

    const sheetIds = (sheets || []).map((sheet) => sheet.id).filter(Boolean);

    if (!sheetIds.length) return;

    const { error: entriesError } = await supabase
      .from("attendance_sheet_entries")
      .delete()
      .in("attendance_sheet_id", sheetIds)
      .eq("occurrence_date", occurrenceDate);

    if (entriesError) throw entriesError;

    const { error: occurrenceSheetsError } = await supabase
      .from("attendance_sheets")
      .delete()
      .eq("event_id", eventId)
      .eq("occurrence_date", occurrenceDate);

    if (occurrenceSheetsError) {
      console.warn(
        "Skipping occurrence attendance sheet delete. Make sure attendance_sheets.occurrence_date exists if you need per-date sheets.",
        occurrenceSheetsError
      );
    }
  };

  const handleCancelSelectedOccurrence = async () => {
    if (!schedulerForm?.id) return;

    const isRecurring =
      String(schedulerForm?.scheduleType || "").toLowerCase() === "recurrent";

    if (!isRecurring) {
      await Swal.fire({
        target: formRef?.current || undefined,
        heightAuto: false,
        icon: "info",
        title: t.onlyRecurringTitle,
        text: t.onlyRecurringText,
      });
      return;
    }

    // Fix the selectedDate
    const selectedDate =
      normalizeExcludedDate(selectedCalendarDate) ||
      normalizeExcludedDate(schedulerForm?.date) ||
      normalizeExcludedDate(getNextRecurringDate(schedulerForm));

    if (!selectedDate) {
      await Swal.fire({
        target: formRef?.current || undefined,
        heightAuto: false,
        icon: "warning",
        title: t.missingOccurrenceDateTitle,
        text: t.missingOccurrenceDateText,
      });
      return;
    }

    const result = await Swal.fire({
      target: formRef?.current || undefined,
      heightAuto: false,
      icon: "warning",
      title: t.cancelOccurrenceTitle,
      text: `${t.cancelOccurrenceText} (${selectedDate})`,
      showCancelButton: true,
      confirmButtonText: t.cancelOccurrenceConfirm,
      cancelButtonText: t.keepEditing,
      reverseButtons: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
    });

    if (!result.isConfirmed) return;

    try {
      setSubmitting(true);
      setButtonLoading("cancel-occurrence");

      const currentExcludedDates = Array.isArray(
        schedulerForm?.recurrence_excluded_dates
      )
        ? (schedulerForm.recurrence_excluded_dates as string[])
        : [];

      const nextExcludedDates = Array.from(
        new Set([...currentExcludedDates, selectedDate])
      ).sort();

      const { error: updateError } = await supabase
        .from("events")
        .update({
          recurrence_excluded_dates: nextExcludedDates,
        })
        .eq("id", schedulerForm.id);

      if (updateError) throw updateError;

      await deleteAttendanceForOccurrence({
        eventId: schedulerForm.id,
        occurrenceDate: selectedDate,
      });

      setSchedulerForm((prev) => ({
        ...prev,
        recurrence_excluded_dates: nextExcludedDates,
      }));

      await Swal.fire({
        target: formRef?.current || undefined,
        heightAuto: false,
        icon: "success",
        title: t.occurrenceCancelledTitle,
        text: t.occurrenceCancelledText,
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setReloadPageData((prev) => !prev);
    } catch (error: unknown) {
      console.error("Cancel selected occurrence error:", error);

      await Swal.fire({
        target: formRef?.current || undefined,
        heightAuto: false,
        icon: "error",
        title: t.unableCancelOccurrenceTitle,
        text: (error as ErrorResponse)?.message || t.unableCancelOccurrenceText,
      });
    } finally {
      setSubmitting(false);
      setButtonLoading("");
      setSelectedCalendarDate(null);
      onClose();
      setReloadPageData((prev) => !prev);
      // resetAndCloseModal?.();
      // router.refresh?.();

      setTimeout(() => {
        loadEvents?.();

        Swal.fire({
          target: formRef?.current || undefined,
          heightAuto: false,
          icon: "success",
          title: t.eventUpdatedTitle,
          text: t.eventSheetUpdated,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }, 500);
    }
  };

  const sendInvitationEmails = async (savedEvent: {
    id: string;
    name_en: string;
    name_es?: string;
  }) => {
    if (!selectedInvitees.length) return;

    const recipients = profiles?.filter((p) =>
      selectedInvitees?.includes(p.id)
    );

    const validRecipients = recipients
      ?.filter((p) => p?.email)
      ?.map((p) => ({
        email: p.email,
        first_name: p.first_name,
        last_name: p.last_name,
        language_preference: p.language_preference || "en",
      }));

    if (!validRecipients.length) return;

    const invitationPayload = {
      eventId: savedEvent.id,
      eventNameEn: schedulerForm?.name_en,
      eventNameEs: schedulerForm?.name_es,
      descriptionEn: schedulerForm?.description_en,
      descriptionEs: schedulerForm?.description_es,
      date: schedulerForm?.date,
      time: schedulerForm?.time,
      locationUrl: schedulerForm?.locationUrl,
      privacy: schedulerForm?.privacy,
      recipients: validRecipients,
      eventImage: schedulerForm?.imageUrl,
    };

    console.log("Sending invitation emails with payload:", invitationPayload);

    const response = await fetch("/api/send-event-invitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitationPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error?.message ||
          result?.error ||
          result?.message ||
          t.invitationEmailsError
      );
    }
  };

  const handleDeleteEvent = async () => {
    console.log("Attempting to delete event with ID:", schedulerForm?.id);
    console.log("Form", schedulerForm);
    if (!schedulerForm?.id) return;

    const result = await Swal.fire({
      title: t.deleteEventTitle,
      text: t.deleteEventText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.yesDelete,
      cancelButtonText: t.cancel,
      reverseButtons: true,
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      setSubmitting(true);
      setButtonLoading("delete-event");

      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", schedulerForm.id);

      if (error) throw error;

      await Swal.fire({
        icon: "success",
        title: t.deletedTitle,
        text: t.deletedText,
        timer: 1800,
        showConfirmButton: false,
      });

      resetAndCloseModal?.();
      router.refresh?.();
    } catch (error: unknown) {
      console.error("Delete event error:", error);

      Swal.fire({
        icon: "error",
        title: t.unableDeleteTitle,
        text: (error as ErrorResponse)?.message || t.unableDeleteText,
      });
    } finally {
      setSubmitting(false);
      setButtonLoading("");
      setTimeout(() => {
        loadEvents?.();
      }, 500);
    }
  };

  const handleScheduleEvent = async () => {
    try {
      setSubmitting(true);
      setButtonLoading("schedule-event");

      const { isValid } = validateForm();

      if (!isValid) {
        await showScopedSwal({
          icon: "error",
          title: t.fixFormTitle,
          text: t.fixFormText,
          timer: 2400,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }

      const uploadedImageUrl = await uploadImageIfNeeded();

      const normalizedDate =
        schedulerForm?.scheduleType === "recurrent"
          ? getNextRecurringDate(schedulerForm)
          : schedulerForm?.date || null;

      const payload = {
        image_url: uploadedImageUrl,
        color: schedulerForm?.color,
        name_en: schedulerForm?.name_en?.trim() || "",
        name_es: schedulerForm?.name_es?.trim() || "",
        description_en: schedulerForm?.description_en?.trim() || null,
        description_es: schedulerForm?.description_es?.trim() || null,
        details_en: schedulerForm?.details_en?.trim() || null,
        details_es: schedulerForm?.details_es?.trim() || null,
        date: normalizedDate,
        time: schedulerForm?.time || null,
        schedule_type:
          String(schedulerForm?.scheduleType || "one-time").toLowerCase() ===
          "recurrent"
            ? "recurrent"
            : "one-time",
        recurrence: schedulerForm?.recurrence || null,
        days_of_week_csv: schedulerForm?.daysOfWeekCsv || null,
        day_of_month:
          schedulerForm?.dayOfMonth !== ""
            ? Number(schedulerForm?.dayOfMonth)
            : null,
        month:
          schedulerForm?.month !== "" ? Number(schedulerForm?.month) : null,
        months_csv: schedulerForm?.monthsCsv || null,
        recurrence_excluded_dates:
          schedulerForm?.recurrence_excluded_dates || [],

        street_address: schedulerForm?.streetAddress?.trim() || null,
        city: schedulerForm?.city?.trim() || null,
        country: schedulerForm?.country?.trim() || null,
        zip_code: schedulerForm?.zipCode?.trim() || null,
        location_url: schedulerForm?.locationUrl?.trim() || null,

        price:
          schedulerForm?.price !== undefined &&
          schedulerForm?.price !== null &&
          schedulerForm?.price !== 0
            ? Number(schedulerForm.price)
            : 0,

        privacy:
          String(schedulerForm?.privacy || "Public").toLowerCase() === "private"
            ? "Private"
            : "Public",

        type: schedulerForm?.type || "event",
        dress_code: schedulerForm?.dressCode || "",
        status: schedulerForm?.status || "published",

        create_attendance_sheet: !!schedulerForm?.createAttendanceSheet,
        include_form: !!schedulerForm?.includeForm,

        created_by: createdBy || null,
        hosts: schedulerForm?.hosts || [],
        instructors: schedulerForm?.instructors || [],

        image_position_y: schedulerForm?.imagePositionY,
        image_height: schedulerForm?.imageHeight,

        audio_enabled: !!schedulerForm?.audioEnabled,
        audio_track_id: schedulerForm?.audioTrackId || null,
        audio_track_name: schedulerForm?.audioTrackName || null,
        audio_artist_name: schedulerForm?.audioArtistName || null,
        audio_artwork_url: schedulerForm?.audioArtworkUrl || null,
        audio_preview_url: schedulerForm?.audioPreviewUrl || null,
        audio_track_view_url: schedulerForm?.audioTrackViewUrl || null,
      };

      let savedEvent = null;

      if (isEdit && schedulerForm?.id) {
        const { data, error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", schedulerForm.id)
          .select("id, name_en, name_es")
          .single();

        if (error) throw error;
        savedEvent = data;
      } else {
        const { data, error } = await supabase
          .from("events")
          .insert(payload)
          .select("id, name_en, name_es")
          .single();

        if (error) throw error;
        savedEvent = data;
      }

      await sendInvitationEmails(savedEvent);

      // await showScopedSwal({
      //   icon: "success",
      //   title: isEdit ? t.eventUpdatedTitle : t.eventScheduledTitle,
      //   text: schedulerForm?.createAttendanceSheet
      //     ? isEdit
      //       ? t.eventSheetUpdated
      //       : t.eventSheetCreated
      //     : isEdit
      //     ? t.eventUpdatedText
      //     : t.eventScheduledText,
      //   timer: 1800,
      //   timerProgressBar: true,
      //   showConfirmButton: false,
      // });

      // setReloadPageData((prev: boolean) => !prev);
      resetAndCloseModal();
    } catch (error: unknown) {
      console.error("Event save error:", error);

      await showScopedSwal({
        icon: "error",
        title: isEdit ? t.unableUpdateTitle : t.unableScheduleTitle,
        text: (error as ErrorResponse)?.message || t.saveErrorText,
        timer: 2600,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    } finally {
      setSubmitting(false);
      setButtonLoading("");
      setTimeout(() => {
        loadEvents?.();

        Swal.fire({
          target: formRef?.current || undefined,
          heightAuto: false,
          icon: "success",
          title: t.eventUpdatedTitle,
          text: t.eventSheetUpdated,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }, 500);
    }
  };

  const canCancelSelectedOccurrence =
    isEdit &&
    !!schedulerForm?.id &&
    String(schedulerForm?.scheduleType || "").toLowerCase() === "recurrent";

  return (
    <div
      ref={formRef}
      onMouseDown={handleMouseDown}
      className={`${
        fullScreen
          ? "w-full sm:w-[92vw]"
          : "w-full sm:h-auto sm:max-h-[92vh] sm:w-[min(92vw,42rem)]"
      } fixed inset-x-0 bottom-0 top-auto z-50 overflow-hidden rounded-t-4xl border border-slate-200 bg-white shadow-[0_-20px_80px_rgba(15,23,42,0.22)] backdrop-blur-sm sm:absolute sm:inset-auto sm:right-6 sm:top-20 sm:rounded-3xl sm:shadow-[0_24px_80px_rgba(15,23,42,0.18)]`}
    >
      <div className="flex items-center justify-between gap-3 rounded-t-4xl bg-linear-to-r from-blue-600 via-blue-700 to-slate-900 px-4 py-4 sm:rounded-t-3xl sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
            <HiOutlineCalendarDays className="text-lg text-slate-100" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-white">
              {isEdit ? t.editEvent : t.scheduleEvent}{" "}
              <span className="hidden md:inline">
                {isEdit
                  ? language === "en"
                    ? `- ${schedulerForm.name_en}`
                    : `- ${schedulerForm.name_es}`
                  : ""}
              </span>
            </h2>
            <p className="hidden text-xs text-blue-100 xs:block sm:block">
              {isEdit ? t.updateDetails : t.createExperience}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSetFullScreen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20
            cursor-pointer"
          >
            {fullScreen ? (
              <BiCollapseAlt title="Minimize" className="text-base" />
            ) : (
              <BiExpandAlt title="Maximize" className="text-base" />
            )}
          </button>

          <button
            title="Close"
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition hover:bg-red-500/20 cursor-pointer"
          >
            <IoClose className="text-xl text-gray-100" />
          </button>
        </div>
      </div>

      <div className="max-h-[calc(100dvh-145px)] space-y-4 overflow-y-auto bg-linear-to-b from-slate-50/80 to-white px-3 pb-5 pt-4 sm:max-h-[75vh] sm:space-y-5 sm:px-6 sm:pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <p className="text-sm font-medium text-slate-800">
                {t.wizardTitle}
              </p>
              <p className="mt-1 text-sm font-light text-gray-600">
                {isEdit ? t.wizardEditDescription : t.wizardCreateDescription}
              </p>
            </div>
            <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm w-30 text-center">
              {progress}% {t.complete}
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>
                {t.step} {step} {t.of} {steps.length}
              </span>
              <span>{steps[step - 1]?.label}</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {steps?.map((s) => {
                const isActive = step === s.id;
                const isCompleted = step > s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStep(s.id)}
                    className={`rounded-xl border px-1.5 py-2 text-center transition sm:rounded-2xl sm:px-2 cursor-pointer ${
                      isActive
                        ? "border-blue-600 bg-blue-600 text-white shadow-md"
                        : isCompleted
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="text-[10px] font-semibold">
                      {t.step} {s.id}
                    </div>
                    <div className="mt-0.5 truncate text-[10px]">{s.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <EventSchedulerForm
          isEdit={isEdit as boolean}
          step={step}
          schedulerForm={schedulerForm}
          setSchedulerForm={setSchedulerForm}
          profiles={profiles}
          profilesLoading={profilesLoading}
          errors={errors}
          setErrors={setErrors}
          imagePreview={imagePreview}
          setImageFile={setImageFile}
          selectedInvitees={selectedInvitees}
          setSelectedInvitees={setSelectedInvitees}
          inviteSearch={inviteSearch}
          setInviteSearch={setInviteSearch}
          showHostDropdown={showHostDropdown}
          setShowHostDropdown={setShowHostDropdown}
          hostDropdownRef={hostDropdownRef as React.RefObject<HTMLDivElement>}
          handleCancelSelectedOccurrence={handleCancelSelectedOccurrence}
        />
      </div>

      <div className="border-t border-slate-200 bg-white/95 px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`rounded-xl px-4 py-2.5 text-sm transition ${
                step === 1
                  ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                  : "cursor-pointer border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {t.back}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={handleDeleteEvent}
                disabled={submitting}
                className="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="hidden md:block lg:block">
                  {submitting && buttonLoading === "delete-event"
                    ? t.deleting
                    : t.delete}
                </span>
                <FaTrash
                  className={`text-sm block md:hidden ${
                    submitting && buttonLoading === "delete-event"
                      ? "animate-spin text-red-400"
                      : "text-red-700"
                  }`}
                />
              </button>
            )}

            {canCancelSelectedOccurrence && (
              <button
                type="button"
                onClick={() => {
                  // Pass the calendar date selected to handler
                  handleCancelSelectedOccurrence();
                }}
                disabled={submitting}
                className="hidden md:inline cursor-pointer rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 transition 
                hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting && buttonLoading === "cancel-occurrence"
                  ? t.cancellingOccurrence
                  : t.cancelOccurrenceButton}
              </button>
            )}
          </div>

          {step < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-xl bg-linear-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-95 hover:shadow-lg cursor-pointer"
            >
              {t.continue}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleScheduleEvent}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-2.5 text-white 
              font-medium shadow-lg transition hover:shadow-xl disabled:opacity-60 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {submitting && buttonLoading === "schedule-event"
                ? isEdit
                  ? t.updating
                  : t.scheduling
                : isEdit
                ? t.update
                : t.scheduleEvent}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSchedulerModal;
