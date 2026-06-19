"use client";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  Megaphone,
  Plus,
  Save,
  CalendarDays,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  Tag,
  Lock,
  ArrowRight,
  Mail,
  Users,
  Search,
  CheckCircle2,
  Languages,
  Pencil,
} from "lucide-react";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";
import {
  AnnouncementForm,
  AnnouncementRecord,
  EmailRecipient,
} from "../lib/interfaces/announcements";
import {
  capitalize,
  emptyForm,
  getAnnouncementTheme,
  getVariantMeta,
} from "../helpers/announcements";

import Navbar from "../components/NavBar";
import {
  Input,
  Select,
  StatPill,
  ToggleRow,
} from "../components/elements/AdminInitiatives";

type ContentLanguage = "en" | "es";

type MultilingualAnnouncementForm = AnnouncementForm & {
  title_en?: string;
  title_es?: string;
  message_en?: string;
  message_es?: string;
  cta_label_en?: string;
  cta_label_es?: string;
};

type MultilingualAnnouncementRecord = AnnouncementRecord & {
  title_en?: string | null;
  title_es?: string | null;
  message_en?: string | null;
  message_es?: string | null;
  cta_label_en?: string | null;
  cta_label_es?: string | null;
};

export default function AdminAnnouncementsPage() {
  const router = useRouter();
  const { language } = useLanguage(); // es or en
  const isSpanish = language === "es";

  const t = {
    loadingManager: isSpanish ? "Cargando administrador" : "Loading manager",
    verifyingAccess: isSpanish
      ? "Verificando acceso de administrador..."
      : "Verifying administrator access...",
    accessRestricted: isSpanish ? "Acceso restringido" : "Access restricted",
    accessRestrictedText: isSpanish
      ? "Este administrador solo está disponible para administradores aprobados."
      : "This manager is only available to approved administrators.",
    returnHome: isSpanish ? "Volver al inicio" : "Return Home",
    managerTitle: isSpanish
      ? "Administrador de Anuncios"
      : "Announcements Manager",
    managerDescription: isSpanish
      ? "Crea anuncios premium para actualizaciones importantes del sitio web."
      : "Create premium hero banner announcements for important website updates.",
    total: isSpanish ? "Total" : "Total",
    active: isSpanish ? "Activos" : "Active",
    editAnnouncement: isSpanish ? "Editar Anuncio" : "Edit Announcement",
    createAnnouncement: isSpanish ? "Crear Anuncio" : "Create Announcement",
    formDescription: isSpanish
      ? "Configura cómo debe aparecer el anuncio sobre el hero de la página principal."
      : "Configure how the overlay should appear on the homepage hero.",
    contentLanguage: isSpanish ? "Idioma del contenido" : "Content Language",
    english: isSpanish ? "Inglés" : "English",
    spanish: isSpanish ? "Español" : "Spanish",
    title: isSpanish ? "Título" : "Title",
    message: isSpanish ? "Mensaje" : "Message",
    ctaLabel: isSpanish ? "Etiqueta CTA" : "CTA Label",
    ctaUrl: isSpanish ? "URL del CTA" : "CTA URL",
    titlePlaceholderEn: "Website maintenance tonight",
    titlePlaceholderEs: "Mantenimiento del sitio web esta noche",
    messagePlaceholderEn:
      "Add the important details users should see right away.",
    messagePlaceholderEs:
      "Agrega los detalles importantes que las personas deben ver de inmediato.",
    ctaPlaceholderEn: "Learn More",
    ctaPlaceholderEs: "Ver más",
    status: isSpanish ? "Estado" : "Status",
    color: isSpanish ? "Color" : "Color",
    variant: isSpanish ? "Variante" : "Variant",
    startsAt: isSpanish ? "Comienza" : "Starts At",
    endsAt: isSpanish ? "Termina" : "Ends At",
    important: isSpanish ? "Importante" : "Important",
    urgent: isSpanish ? "Urgente" : "Urgent",
    update: isSpanish ? "Actualización" : "Update",
    event: isSpanish ? "Evento" : "Event",
    success: isSpanish ? "Éxito" : "Success",
    notice: isSpanish ? "Aviso" : "Notice",
    info: isSpanish ? "Información" : "Info",
    warning: isSpanish ? "Advertencia" : "Warning",
    blue: isSpanish ? "Azul" : "Blue",
    indigo: isSpanish ? "Índigo" : "Indigo",
    emerald: isSpanish ? "Esmeralda" : "Emerald",
    amber: isSpanish ? "Ámbar" : "Amber",
    rose: isSpanish ? "Rosa" : "Rose",
    slate: isSpanish ? "Pizarra" : "Slate",
    activeTitle: isSpanish ? "Activo" : "Active",
    activeSubtitle: isSpanish
      ? "Controla si el anuncio se muestra"
      : "Controls whether the announcement is shown",
    showOnHome: isSpanish ? "Mostrar en Inicio" : "Show on Home",
    showOnHomeSubtitle: isSpanish
      ? "Mostrar en la página principal."
      : "Show in homepage.",
    sendEmailNotification: isSpanish
      ? "Enviar Notificación por Correo"
      : "Send Email Notification",
    sendEmailSubtitle: isSpanish
      ? "Opcionalmente envía este anuncio a usuarios aprobados seleccionados"
      : "Optionally email this announcement to selected approved users",
    selectRecipients: isSpanish
      ? "Seleccionar destinatarios"
      : "Select Recipients",
    selected: isSpanish ? "seleccionados" : "selected",
    toggleVisibleUsers: isSpanish
      ? "Seleccionar usuarios visibles"
      : "Toggle Visible Users",
    searchPlaceholder: isSpanish
      ? "Buscar por nombre o correo..."
      : "Search by name or email...",
    noUsersFound: isSpanish ? "No se encontraron usuarios." : "No users found.",
    unnamedUser: isSpanish ? "Usuario sin nombre" : "Unnamed user",
    noEmail: isSpanish ? "Sin correo" : "No email",
    sendingEmails: isSpanish ? "Enviando correos..." : "Sending Emails...",
    saving: isSpanish ? "Guardando..." : "Saving...",
    updateAnnouncement: isSpanish
      ? "Actualizar Anuncio"
      : "Update Announcement",
    clear: isSpanish ? "Borrar" : "Clear",
    livePreview: isSpanish ? "Vista Previa" : "Live Preview",
    previewDescription: isSpanish
      ? "Así se verá sobre el hero."
      : "This is how it will feel above the hero.",
    previewTitle: isSpanish
      ? "Vista previa del título del anuncio"
      : "Announcement title preview",
    previewMessage: isSpanish
      ? "Tu mensaje aparecerá aquí sobre los banners principales en una tarjeta elegante y legible."
      : "Your message will appear here and overlay the homepage hero banners in a polished, readable card.",
    existingAnnouncements: isSpanish
      ? "Anuncios Existentes"
      : "Existing Announcements",
    loadingAnnouncements: isSpanish
      ? "Cargando anuncios..."
      : "Loading announcements...",
    noAnnouncements: isSpanish
      ? "No hay anuncios creados todavía"
      : "No announcements created yet",
    inactive: isSpanish ? "Inactivo" : "Inactive",
    noStart: isSpanish ? "Sin inicio" : "No start",
    noEnd: isSpanish ? "Sin fin" : "No end",
    ends: isSpanish ? "Termina:" : "Ends:",
    ctaLinked: isSpanish ? "CTA enlazado" : "CTA linked",
    edit: isSpanish ? "Editar" : "Edit",
    savedTitle: isSpanish ? "¡Guardado!" : "Saved!",
    savedText: isSpanish
      ? "El anuncio se guardó correctamente."
      : "The announcement has been saved successfully.",
    errorValidationTitle: isSpanish ? "¡Error!" : "Error!",
    errorValidationText: isSpanish
      ? "Por favor, asegúrate de que todos los campos requeridos estén completos y sean válidos."
      : "Please make sure all required fields are filled out and valid.",
    errorTitle: isSpanish ? "¡Error!" : "Error!",
    errorText: isSpanish
      ? "No se pudo guardar el anuncio o enviar el correo."
      : "Unable to save announcement or send email.",
    deactivateQuestion: isSpanish
      ? "¿Desactivar anuncio?"
      : "Deactivate announcement?",
    activateQuestion: isSpanish
      ? "¿Activar anuncio?"
      : "Activate announcement?",
    deactivateText: isSpanish
      ? "Este anuncio se ocultará de los usuarios, pero podrá reactivarse luego."
      : "This announcement will be hidden from users but can be reactivated later.",
    activateText: isSpanish
      ? "Este anuncio será visible para los usuarios inmediatamente."
      : "This announcement will become visible to users immediately.",
    deactivate: isSpanish ? "Desactivar" : "Deactivate",
    activate: isSpanish ? "Activar" : "Activate",
    cancel: isSpanish ? "Cancelar" : "Cancel",
    deactivated: isSpanish ? "Desactivado" : "Deactivated",
    activated: isSpanish ? "Activado" : "Activated",
    deactivatedText: isSpanish
      ? "El anuncio fue desactivado."
      : "The announcement has been deactivated.",
    activatedText: isSpanish
      ? "El anuncio está activo."
      : "The announcement is now active.",
    areYouSure: isSpanish ? "¿Estás seguro?" : "Are you sure?",
    deleteText: isSpanish
      ? "Este anuncio se eliminará permanentemente."
      : "This announcement will be permanently deleted.",
    yesDelete: isSpanish ? "Sí, eliminar" : "Yes, delete it",
    deleted: isSpanish ? "¡Eliminado!" : "Deleted!",
    deletedText: isSpanish
      ? "El anuncio fue eliminado."
      : "The announcement has been deleted.",
    emailFailedFallback: isSpanish
      ? "El anuncio fue creado, pero falló el envío del correo."
      : "Announcement was created, but the email failed to send.",
  };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [announcements, setAnnouncements] = useState<
    MultilingualAnnouncementRecord[]
  >([]);
  const [form, setForm] = useState<MultilingualAnnouncementForm>({
    ...emptyForm,
    title_en: "",
    title_es: "",
    message_en: "",
    message_es: "",
    cta_label_en: "",
    cta_label_es: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [, setAdminName] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [contentLanguage, setContentLanguage] = useState<ContentLanguage>("en");

  const [sendEmail, setSendEmail] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState<EmailRecipient[]>([]);
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>(
    []
  );
  const [recipientSearch, setRecipientSearch] = useState("");

  useEffect(() => {
    const validateAdminAccess = async () => {
      try {
        setPageLoading(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, role, is_approved, account_status")
          .eq("id", user.id)
          .maybeSingle<{
            first_name: string | null;
            last_name: string | null;
            role: string | null;
            is_approved: boolean | null;
            account_status: string | null;
          }>();

        if (profileError || !profile) {
          setAccessDenied(true);
          return;
        }

        const normalizedRole = (profile.role || "").toLowerCase();
        const isAdmin =
          normalizedRole === "admin" || normalizedRole === "super_admin";

        const isApproved = !!profile.is_approved;
        const isActive = profile.account_status !== "suspended";

        if (!isAdmin || !isApproved || !isActive) {
          setAccessDenied(true);
          return;
        }

        const fullName =
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
          "Admin";

        setAdminName(fullName);
      } catch (error) {
        console.error("Dashboard access check error:", error);
        setAccessDenied(true);
      } finally {
        setPageLoading(false);
      }
    };

    validateAdminAccess();
  }, [router]);

  const loadAnnouncements = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAnnouncements(data as MultilingualAnnouncementRecord[]);
    }

    setLoading(false);
  };

  const loadEmailRecipients = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email, language_preference")
      .eq("is_approved", true)
      .neq("account_status", "suspended")
      .not("email", "is", null)
      .order("first_name", { ascending: true });

    if (!error && data) {
      setEmailRecipients(data);
    }
  };

  useEffect(() => {
    loadAnnouncements();
    loadEmailRecipients();
  }, []);

  const activeCount = useMemo(
    () => announcements.filter((a) => a.is_active).length,
    [announcements]
  );

  const filteredRecipients = useMemo(() => {
    const search = recipientSearch.trim().toLowerCase();

    return emailRecipients.filter((user) => {
      const fullName = `${user.first_name || ""} ${user.last_name || ""}`
        .trim()
        .toLowerCase();

      const email = String(user.email || "").toLowerCase();

      if (!search) return true;

      return fullName.includes(search) || email.includes(search);
    });
  }, [emailRecipients, recipientSearch]);

  const selectedRecipients = useMemo(
    () =>
      emailRecipients.filter(
        (user) => user.email && selectedRecipientIds.includes(user.id)
      ),
    [emailRecipients, selectedRecipientIds]
  );

  const handleChange = (
    name: keyof MultilingualAnnouncementForm,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDateTimeLocal = (date: Date) => {
    const pad = (value: number) => String(value).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const getStartOfToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return formatDateTimeLocal(today);
  };

  const getEndOfToday = () => {
    const today = new Date();
    today.setHours(23, 59, 0, 0);
    return formatDateTimeLocal(today);
  };

  const handleDateTimeFocus = (
    field: "starts_at" | "ends_at",
    fallbackValue: string
  ) => {
    if (form[field]) return;
    handleChange(field, fallbackValue);
  };

  const handleLocalizedChange = (
    field: "title" | "message" | "cta_label",
    value: string
  ) => {
    const localizedKey =
      `${field}_${contentLanguage}` as keyof MultilingualAnnouncementForm;

    setForm((prev) => ({
      ...prev,
      [localizedKey]: value,
      [field]: value,
    }));
  };

  const getLocalizedValue = (
    item: MultilingualAnnouncementRecord | MultilingualAnnouncementForm,
    field: "title" | "message" | "cta_label",
    preferredLanguage: ContentLanguage = language === "es" ? "es" : "en"
  ) => {
    const preferred = item[
      `${field}_${preferredLanguage}` as keyof typeof item
    ] as string | null | undefined;

    const fallback = item[
      `${field}_${
        preferredLanguage === "es" ? "en" : "es"
      }` as keyof typeof item
    ] as string | null | undefined;

    const legacy = item[field as keyof typeof item] as
      | string
      | null
      | undefined;

    return preferred || fallback || legacy || "";
  };

  const toggleRecipient = (id: string) => {
    setSelectedRecipientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllRecipients = () => {
    const visibleIds = filteredRecipients
      .filter((user) => user.email)
      .map((user) => user.id);

    const allVisibleSelected = visibleIds.every((id) =>
      selectedRecipientIds.includes(id)
    );

    setSelectedRecipientIds((prev) =>
      allVisibleSelected
        ? prev.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...prev, ...visibleIds]))
    );
  };

  const sendAnnouncementEmail = async (
    announcement: MultilingualAnnouncementRecord
  ) => {
    console.log(
      "Sending announcement email to:",
      sendEmail,
      selectedRecipients,
      announcement
    );

    if (!sendEmail || selectedRecipients.length === 0) return;

    setEmailSending(true);

    const response = await fetch("/api/send-announcement-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        announcement,
        recipients: selectedRecipients,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      console.error("Announcement email failed:", result);
      throw new Error(
        result?.message || result?.error || t.emailFailedFallback
      );
    }

    return result;
  };

  const handleEdit = (item: MultilingualAnnouncementRecord) => {
    setEditingId(item.id);
    setForm({
      id: item.id,
      title: item.title,
      title_en: item.title_en || item.title || "",
      title_es: item.title_es || item.title || "",
      message: item.message,
      message_en: item.message_en || item.message || "",
      message_es: item.message_es || item.message || "",
      cta_label: item.cta_label || "",
      cta_label_en: item.cta_label_en || item.cta_label || "",
      cta_label_es: item.cta_label_es || item.cta_label || "",
      cta_url: item.cta_url || "",
      variant: item.variant || "info",
      status: item.status || "important",
      color: item.color || "blue",
      is_active: item.is_active,
      show_on_home: item.show_on_home,
      starts_at: item.starts_at ? item.starts_at.slice(0, 16) : "",
      ends_at: item.ends_at ? item.ends_at.slice(0, 16) : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      title_en: "",
      title_es: "",
      message_en: "",
      message_es: "",
      cta_label_en: "",
      cta_label_es: "",
    });
    setContentLanguage("en");
    setSendEmail(false);
    setSelectedRecipientIds([]);
    setRecipientSearch("");
  };

  const handleSave = async () => {
    const titleEn = String(form.title_en || "").trim();
    const titleEs = String(form.title_es || "").trim();
    const messageEn = String(form.message_en || "").trim();
    const messageEs = String(form.message_es || "").trim();

    const missingFields: string[] = [];

    if (!titleEn)
      missingFields.push(
        language === "es" ? "Título en inglés" : "English title"
      );
    if (!titleEs)
      missingFields.push(
        language === "es" ? "Título en español" : "Spanish title"
      );
    if (!messageEn)
      missingFields.push(
        language === "es" ? "Mensaje en inglés" : "English message"
      );
    if (!messageEs)
      missingFields.push(
        language === "es" ? "Mensaje en español" : "Spanish message"
      );

    if (missingFields.length > 0) {
      Swal.fire({
        title: t.errorValidationTitle,
        html: `
          <div style="text-align:left;">
            <p style="margin-bottom:10px;">${t.errorValidationText}</p>
            <ul style="margin:0;padding-left:20px;">
              ${missingFields.map((field) => `<li>${field}</li>`).join("")}
            </ul>
          </div>
        `,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setSaving(true);

    try {
      const announcementData = {
        title: form.title,
        title_en: form.title_en,
        title_es: form.title_es,
        message: form.message,
        message_en: form.message_en,
        message_es: form.message_es,
        cta_label: form.cta_label,
        cta_label_en: form.cta_label_en,
        cta_label_es: form.cta_label_es,
        cta_url: form.cta_url,
        variant: form.variant,
        status: form.status,
        color: form.color,
        show_on_home: form.show_on_home,
        starts_at: form.starts_at
          ? new Date(form.starts_at).toISOString()
          : null,
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      };

      console.log(
        "Saving announcement:",
        announcementData,
        "Send email:",
        sendEmail
      );

      if (editingId) {
        await supabase
          .from("announcements")
          .update(announcementData)
          .eq("id", editingId);

        if (sendEmail) {
          await sendAnnouncementEmail({
            id: editingId,
            ...announcementData,
            is_active: false,
            created_at: "",
          });
        }
      } else {
        const { data, error } = await supabase
          .from("announcements")
          .insert(announcementData)
          .select()
          .single();

        if (error || !data) {
          throw new Error(error?.message || "Failed to create announcement");
        } else {
          Swal.fire({
            title: t.saving,
            text: t.sendingEmails,
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
          });
        }

        if (sendEmail) {
          await sendAnnouncementEmail(data);
        }
      }

      Swal.fire({
        title: t.savedTitle,
        text: t.savedText,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      await loadAnnouncements();
      resetForm();
    } catch (error) {
      console.error("Save announcement error:", error);

      Swal.fire({
        title: t.errorTitle,
        text: error instanceof Error ? error.message : t.errorText,
        icon: "error",
      });
    } finally {
      setSaving(false);
      setEmailSending(false);
    }
  };

  const toggleActive = async (item: MultilingualAnnouncementRecord) => {
    Swal.fire({
      title: item.is_active ? t.deactivateQuestion : t.activateQuestion,
      text: item.is_active ? t.deactivateText : t.activateText,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: item.is_active ? t.deactivate : t.activate,
      cancelButtonText: t.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await supabase
          .from("announcements")
          .update({ is_active: !item.is_active })
          .eq("id", item.id);

        Swal.fire({
          title: item.is_active ? t.deactivated : t.activated,
          text: item.is_active ? t.deactivatedText : t.activatedText,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        await loadAnnouncements();
      }
    });
  };

  const deleteAnnouncement = async (id: string) => {
    Swal.fire({
      title: t.areYouSure,
      text: t.deleteText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t.yesDelete,
      cancelButtonText: t.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await supabase.from("announcements").delete().eq("id", id);

        Swal.fire({
          title: t.deleted,
          text: t.deletedText,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        await loadAnnouncements();

        if (editingId === id) {
          resetForm();
        }
      }
    });
  };

  const previewTheme = getAnnouncementTheme(form.color);
  const previewVariant = getVariantMeta(form.variant);

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="rounded-4xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] px-10 py-12 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700 animate-pulse" />
            <h2 className="text-xl font-semibold text-slate-900">
              {t.loadingManager}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">{t.verifyingAccess}</p>
          </div>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] flex flex-col py-4">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-lg w-full rounded-4xl border border-red-100 bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] p-10 text-center">
            <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {t.accessRestricted}
            </h1>
            <p className="text-slate-500 mt-3 leading-relaxed">
              {t.accessRestrictedText}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 text-white font-medium shadow-lg hover:shadow-xl transition"
            >
              {t.returnHome}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const localizedTitle = getLocalizedValue(form, "title", contentLanguage);
  const localizedMessage = getLocalizedValue(form, "message", contentLanguage);
  const localizedCtaLabel = getLocalizedValue(
    form,
    "cta_label",
    contentLanguage
  );

  return (
    <div
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] 
    pb-16 pt-2"
    >
      <Navbar />

      <div className="mx-auto mt-2 md:mt-10 max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-4xl border border-white/60 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="border-b border-slate-300 bg-slate-50/70 px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex px-2 h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-[1.25rem] bg-blue-50 text-[#0d4db0]">
                  <Megaphone className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900 md:text-3xl">
                    {t.managerTitle}
                  </h1>
                  <p className="mt-1 text-xs md:text-sm text-slate-500">
                    {t.managerDescription}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-center md:justify-start">
                <StatPill
                  label={t.total}
                  value={String(announcements.length)}
                />
                <StatPill label={t.active} value={String(activeCount)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-4 md:p-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-slate-300 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden">
              <div className="border-b border-slate-300 bg-slate-50/70 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex px-2 h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-slate-800">
                      {editingId ? t.editAnnouncement : t.createAnnouncement}
                    </h2>
                    <p className="leading-4 text-xs md:text-sm text-slate-500">
                      {t.formDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                        <Languages className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {t.contentLanguage}
                        </p>
                        <p className="text-xs text-slate-500">
                          {contentLanguage === "en" ? t.english : t.spanish}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 rounded-2xl border border-blue-100 bg-white p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setContentLanguage("en")}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                          contentLanguage === "en"
                            ? "bg-blue-600 text-white shadow"
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        type="button"
                        onClick={() => setContentLanguage("es")}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                          contentLanguage === "es"
                            ? "bg-green-600 text-white shadow"
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        ES
                      </button>
                    </div>
                  </div>
                </div>

                <Input
                  label={`${t.title} (${contentLanguage.toUpperCase()})*`}
                  value={localizedTitle}
                  onChange={(v) => handleLocalizedChange("title", v)}
                  placeholder={
                    contentLanguage === "es"
                      ? t.titlePlaceholderEs
                      : t.titlePlaceholderEn
                  }
                />

                <TextArea
                  label={`${t.message} (${contentLanguage.toUpperCase()})*`}
                  value={localizedMessage}
                  onChange={(v) => handleLocalizedChange("message", v)}
                  placeholder={
                    contentLanguage === "es"
                      ? t.messagePlaceholderEs
                      : t.messagePlaceholderEn
                  }
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label={`${t.ctaLabel} (${contentLanguage.toUpperCase()})`}
                    value={localizedCtaLabel}
                    onChange={(v) => handleLocalizedChange("cta_label", v)}
                    placeholder={
                      contentLanguage === "es"
                        ? t.ctaPlaceholderEs
                        : t.ctaPlaceholderEn
                    }
                  />

                  <Input
                    label={t.ctaUrl}
                    value={form.cta_url}
                    onChange={(v) => handleChange("cta_url", v)}
                    placeholder="/events or https://..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <Select
                    label={t.status}
                    value={form.status}
                    onChange={(v) => handleChange("status", v)}
                    options={[
                      { value: "important", label: t.important },
                      { value: "urgent", label: t.urgent },
                      { value: "update", label: t.update },
                      { value: "event", label: t.event },
                      { value: "success", label: t.success },
                      { value: "notice", label: t.notice },
                    ]}
                  />

                  <Select
                    label={t.color}
                    value={form.color}
                    onChange={(v) => handleChange("color", v)}
                    options={[
                      { value: "blue", label: t.blue },
                      { value: "indigo", label: t.indigo },
                      { value: "emerald", label: t.emerald },
                      { value: "amber", label: t.amber },
                      { value: "rose", label: t.rose },
                      { value: "slate", label: t.slate },
                    ]}
                  />

                  <Select
                    label={t.variant}
                    value={form.variant}
                    onChange={(v) => handleChange("variant", v)}
                    options={[
                      { value: "info", label: t.info },
                      { value: "warning", label: t.warning },
                      { value: "success", label: t.success },
                      { value: "urgent", label: t.urgent },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
                  <Input
                    label={t.startsAt}
                    type="datetime-local"
                    value={form.starts_at}
                    onChange={(v) => handleChange("starts_at", v)}
                    onFocus={() =>
                      handleDateTimeFocus("starts_at", getStartOfToday())
                    }
                  />

                  <Input
                    label={t.endsAt}
                    type="datetime-local"
                    value={form.ends_at}
                    onChange={(v) => handleChange("ends_at", v)}
                    onFocus={() =>
                      handleDateTimeFocus("ends_at", getEndOfToday())
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                  <ToggleRow
                    title={t.activeTitle}
                    subtitle={t.activeSubtitle}
                    checked={form.is_active}
                    onToggle={() => handleChange("is_active", !form.is_active)}
                  />

                  {/* <ToggleRow
                    title={t.showOnHome}
                    subtitle={t.showOnHomeSubtitle}
                    checked={form.show_on_home}
                    onToggle={() =>
                      handleChange("show_on_home", !form.show_on_home)
                    }
                  /> */}
                </div>

                <div>
                  <ToggleRow
                    title={t.sendEmailNotification}
                    subtitle={""}
                    checked={sendEmail}
                    onToggle={() => setSendEmail((prev) => !prev)}
                  />

                  {sendEmail && (
                    <div className="mt-5 space-y-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {t.selectRecipients}
                          </p>
                          <p className="text-xs text-slate-500">
                            {selectedRecipients.length} {t.selected}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={toggleAllRecipients}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-2.5 text-sm 
                          font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 cursor-pointer"
                        >
                          <Users size={16} />
                          {t.toggleVisibleUsers}
                        </button>
                      </div>

                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={recipientSearch}
                          onChange={(event) =>
                            setRecipientSearch(event.target.value)
                          }
                          placeholder={t.searchPlaceholder}
                          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>

                      <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                        {filteredRecipients.length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-5 text-center text-sm text-slate-400">
                            {t.noUsersFound}
                          </div>
                        ) : (
                          filteredRecipients.map((user) => {
                            const fullName =
                              `${user.first_name || ""} ${
                                user.last_name || ""
                              }`.trim() || t.unnamedUser;

                            const selected = selectedRecipientIds.includes(
                              user.id
                            );

                            return (
                              <button
                                key={user.id}
                                type="button"
                                onClick={() => toggleRecipient(user.id)}
                                disabled={!user.email}
                                className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                                  selected
                                    ? "border-blue-200 bg-blue-50 shadow-sm"
                                    : "border-slate-200 bg-white hover:bg-slate-50"
                                } disabled:cursor-not-allowed disabled:opacity-50`}
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-slate-800">
                                    {fullName}
                                  </p>
                                  <p className="truncate text-xs text-slate-500">
                                    {user.email || t.noEmail}
                                  </p>
                                </div>

                                {selected ? (
                                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                                ) : (
                                  <Mail className="h-5 w-5 shrink-0 text-slate-300" />
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving || emailSending}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 text-white 
                    font-medium shadow-lg transition hover:shadow-xl disabled:opacity-60 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {saving || emailSending
                      ? emailSending
                        ? t.sendingEmails
                        : t.saving
                      : editingId
                      ? t.updateAnnouncement
                      : t.createAnnouncement}
                  </button>

                  <button
                    onClick={resetForm}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-700 font-medium 
                    shadow-sm transition hover:bg-slate-50 cursor-pointer"
                  >
                    {t.clear}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-300 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden">
                <div className="border-b border-slate-300 bg-slate-50/70 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {t.livePreview}
                      </h2>
                      <p className="text-sm text-slate-500">
                        {t.previewDescription}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div
                    className={`relative overflow-hidden rounded-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl p-5 min-h-65 ${
                      form.color === "indigo"
                        ? "bg-indigo-600"
                        : form.color === "emerald"
                        ? "bg-emerald-600"
                        : form.color === "amber"
                        ? "bg-amber-600"
                        : form.color === "rose"
                        ? "bg-rose-600"
                        : form.color === "slate"
                        ? "bg-slate-700"
                        : "bg-blue-600"
                    } bg-linear-to-r from-white/10 to-slate-700/60`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-r ${previewTheme.glow}`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_28%)]" />

                    <div className="relative">
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${previewTheme.pill}`}
                        >
                          {previewVariant.icon}
                          {capitalize(form.status)}
                        </span>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${previewTheme.softPill}`}
                        >
                          <Tag className="w-3.5 h-3.5" />
                          {capitalize(form.variant)}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {localizedTitle || t.previewTitle}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/80">
                        {localizedMessage || t.previewMessage}
                      </p>

                      {localizedCtaLabel && (
                        <div className="mt-5">
                          <span
                            className={`inline-flex rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-lg ${previewTheme.button}`}
                          >
                            {localizedCtaLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-300 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden">
                <div className="border-b border-slate-300 bg-slate-50/70 px-6 py-5">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {t.existingAnnouncements}
                  </h2>
                </div>

                <div className="p-6">
                  {loading ? (
                    <p className="text-sm text-slate-500">
                      {t.loadingAnnouncements}
                    </p>
                  ) : announcements.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                      <p className="text-sm italic text-slate-400">
                        {t.noAnnouncements}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {announcements?.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-[1.35rem] border border-slate-200 bg-white/90 p-4 shadow-sm"
                        >
                          <div className="flex md:flex-row flex-col items-start justify-between gap-4">
                            {/* Data */}
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-slate-900">
                                  {getLocalizedValue(
                                    item,
                                    "title",
                                    language === "es" ? "es" : "en"
                                  )}
                                </h3>

                                <Badge active={item.is_active}>
                                  {item.is_active ? t.activeTitle : t.inactive}
                                </Badge>

                                <AnnouncementStatusBadge status={item.status} />
                                <AnnouncementColorBadge color={item.color} />
                              </div>

                              <p className="mt-2 text-sm text-slate-500">
                                {getLocalizedValue(
                                  item,
                                  "message",
                                  language === "es" ? "es" : "en"
                                )}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 border border-slate-200">
                                  <CalendarDays className="w-3.5 h-3.5" />
                                  {item.starts_at
                                    ? new Date(item.starts_at).toLocaleString()
                                    : t.noStart}
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 border border-slate-200">
                                  {t.ends}{" "}
                                  {item.ends_at
                                    ? new Date(item.ends_at).toLocaleString()
                                    : t.noEnd}
                                </span>

                                {item.cta_url && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 border border-slate-200">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    {t.ctaLinked}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex shrink-0 gap-2">
                              <button
                                onClick={() => toggleActive(item)}
                                className="rounded-xl border border-slate-300 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50 cursor-pointer"
                              >
                                {item.is_active ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>

                              <button
                                onClick={() => handleEdit(item)}
                                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition
                               hover:bg-slate-50 cursor-pointer"
                              >
                                {/* {t.edit} */}
                                <Pencil className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => deleteAnnouncement(item.id)}
                                className="rounded-xl border border-red-300 bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </label>
      <textarea
        rows={5}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

function Badge({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold border ${
        active
          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
          : "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {children}
    </span>
  );
}

function AnnouncementStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    important: "bg-blue-50 text-blue-700 border-blue-100",
    urgent: "bg-red-50 text-red-700 border-red-100",
    update: "bg-indigo-50 text-indigo-700 border-indigo-100",
    event: "bg-amber-50 text-amber-700 border-amber-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    notice: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold border ${
        styles[status] || styles.notice
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function AnnouncementColorBadge({ color }: { color: string }) {
  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold border ${
        styles[color] || styles.slate
      }`}
    >
      {color.charAt(0).toUpperCase() + color.slice(1)}
    </span>
  );
}
