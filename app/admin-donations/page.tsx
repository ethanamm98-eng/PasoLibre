"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  HeartHandshake,
  Plus,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Image as ImageIcon,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Navbar from "../components/NavBar";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";

import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Badge,
  NoCampaignStripPreview,
  StatPill,
  Stepper,
} from "../components/elements/AdminDonations";
import {
  handleDelete,
  handleSave,
  toggleActive,
} from "../helpers/admin-donations";
import AdminDonationsForm from "../components/AdminDonationsForm";

export type PaymentKey =
  | "paypal_link"
  | "venmo_link"
  | "cashapp_link"
  | "zelle_link";

export type DonationCampaign = {
  id: string;
  is_active: boolean;
  sort_order: number;
  image_url: string | null;
  title_en: string;
  description_en: string;
  title_es: string;
  description_es: string;
  ath_movil_link: string | null;
  paypal_link: string | null;
  venmo_link: string | null;
  cashapp_link: string | null;
  zelle_link: string | null;
  created_at: string;
  image_position_y?: number;
};

export type FormState = {
  is_active: boolean;
  sort_order: number;
  image_url: string;
  title_en: string;
  description_en: string;
  title_es: string;
  description_es: string;
  ath_movil_link: string;
  paypal_link: string;
  venmo_link: string;
  cashapp_link: string;
  zelle_link: string;
  image_position_y: number;
  [key: string]: string | number | boolean | null; // index signature
};

const emptyForm: FormState = {
  is_active: true,
  sort_order: 0,
  image_url: "",
  title_en: "",
  description_en: "",
  title_es: "",
  description_es: "",
  ath_movil_link: "",
  paypal_link: "",
  venmo_link: "",
  cashapp_link: "",
  zelle_link: "",
  image_position_y: 50,
};

const paymentMethods: {
  key: PaymentKey;
  label: string;
  icon: string;
  placeholder: string;
}[] = [
  {
    key: "paypal_link",
    label: "PayPal",
    icon: "/icons/paypal.svg",
    placeholder: "https://www.paypal.me/username",
  },
  {
    key: "venmo_link",
    label: "Venmo",
    icon: "/icons/venmo.svg",
    placeholder: "https://venmo.com/u/username",
  },
  {
    key: "cashapp_link",
    label: "Cash App",
    icon: "/icons/cashapp.svg",
    placeholder: "https://cash.app/$...",
  },
  {
    key: "zelle_link",
    label: "Zelle",
    icon: "/icons/zelle.svg",
    placeholder: "mailto:donations@example.com",
  },
];

const adminDonationsText = {
  en: {
    adminFallback: "Admin",
    checkingAccess: "Checking admin access...",
    accessDeniedTitle: "Access denied",
    accessDeniedDescription:
      "You need admin access to manage donation campaigns.",
    pageTitle: "Donation Campaigns",
    pageDescription:
      "Manage campaign content, payment links, and QR codes for each donation method.",
    statTotal: "Total",
    statActive: "Active",
    statMaxActive: "Max Active",
    editCampaign: "Edit Donation Campaign",
    createCampaign: "Create Donation Campaign",
    formDescription: "Build each donation campaign in three clean steps.",
    previous: "Previous",
    clear: "Clear",
    continue: "Continue",
    saving: "Saving...",
    updateCampaign: "Update Campaign",
    createCampaignButton: "Create Campaign",
    livePreview: "Live Preview",
    livePreviewDescription:
      "Preview only the current draft or campaign being edited.",
    campaignImageAlt: "Campaign image",
    campaignTitleFallback: "Campaign title",
    campaignDescriptionFallback: "<p>Campaign description preview</p>",
    paymentOptions: "Payment Options",
    qrReady: "QR Ready",
    viewQr: "View QR",
    addPaymentOption:
      "Add an ATH QR image or at least one payment link to show donation options.",
    existingCampaigns: "Existing Campaigns",
    loadingCampaigns: "Loading campaigns...",
    emptyCampaigns: "No donation campaigns created yet",
    active: "Active",
    inactive: "Inactive",
    athQrUploaded: "ATH QR Uploaded",
    edit: "Edit",
    dashboardAccessError: "Dashboard access check error:",
    loadCampaignsError: "Failed to load donation campaigns:",
    validationTitle: "Missing required fields",
    validationDonationLink:
      "Add at least one donation option before continuing.",
    validationContent:
      "Add the title and description in both English and Spanish before continuing.",
  },
  es: {
    adminFallback: "Administrador",
    checkingAccess: "Verificando acceso de administrador...",
    accessDeniedTitle: "Acceso denegado",
    accessDeniedDescription:
      "Necesitas acceso de administrador para gestionar las campañas de donación.",
    pageTitle: "Campañas de donación",
    pageDescription:
      "Gestiona el contenido de las campañas, enlaces de pago y códigos QR para cada método de donación.",
    statTotal: "Total",
    statActive: "Activas",
    statMaxActive: "Máximo activas",
    editCampaign: "Editar campaña de donación",
    createCampaign: "Crear campaña de donación",
    formDescription: "Crea cada campaña de donación en tres pasos simples.",
    previous: "Anterior",
    clear: "Borrar",
    continue: "Continuar",
    saving: "Guardando...",
    updateCampaign: "Actualizar campaña",
    createCampaignButton: "Crear campaña",
    livePreview: "Vista previa en vivo",
    livePreviewDescription:
      "Previsualiza solamente el borrador actual o la campaña que se está editando.",
    campaignImageAlt: "Imagen de campaña",
    campaignTitleFallback: "Título de campaña",
    campaignDescriptionFallback:
      "<p>Vista previa de la descripción de la campaña</p>",
    paymentOptions: "Opciones para donar",
    qrReady: "QR listo",
    viewQr: "Ver QR",
    addPaymentOption:
      "Añade un QR de ATH o al menos un enlace de pago para mostrar opciones de donación.",
    existingCampaigns: "Campañas existentes",
    loadingCampaigns: "Cargando campañas...",
    emptyCampaigns: "Aún no se han creado campañas de donación",
    active: "Activa",
    inactive: "Inactiva",
    athQrUploaded: "QR de ATH cargado",
    edit: "Editar",
    dashboardAccessError: "Error al verificar el acceso al panel:",
    loadCampaignsError: "No se pudieron cargar las campañas de donación:",
    validationTitle: "Faltan campos requeridos",
    validationDonationLink:
      "Agrega al menos una opción de donación antes de continuar.",
    validationContent:
      "Agrega el título y la descripción en inglés y español antes de continuar.",
  },
} as const;

export default function AdminDonationsPage() {
  const { language } = useLanguage(); // es or en
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAthQr, setUploadingAthQr] = useState(false);

  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [currentStep, setCurrentStep] = useState(1);

  const [localImagePreview, setLocalImagePreview] = useState<string | null>(
    null
  );
  const [localAthQrPreview, setLocalAthQrPreview] = useState<string | null>(
    null
  );

  const [accessDenied, setAccessDenied] = useState(false);
  const [, setAdminName] = useState("Admin");
  const [pageLoading, setPageLoading] = useState(true);

  const [previewLanguage, setPreviewLanguage] = useState<"en" | "es">(
    language === "es" ? "es" : "en"
  );
  const [contentLanguage, setContentLanguage] = useState<"en" | "es">(
    language === "es" ? "es" : "en"
  );
  const [selectedPaymentKey, setSelectedPaymentKey] =
    useState<PaymentKey | null>(paymentMethods[0]?.key || null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const athQrInputRef = useRef<HTMLInputElement | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  const text = adminDonationsText[language === "es" ? "es" : "en"];

  const englishEditor = useEditor({
    extensions: [StarterKit],
    content: form.description_en || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] prose prose-sm max-w-none focus:outline-none text-slate-700",
      },
    },
    onUpdate: ({ editor }) => {
      setForm((prev) => ({
        ...prev,
        description_en: editor.getHTML(),
      }));
    },
  });

  const spanishEditor = useEditor({
    extensions: [StarterKit],
    content: form.description_es || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] prose prose-sm max-w-none focus:outline-none text-slate-700",
      },
    },
    onUpdate: ({ editor }) => {
      setForm((prev) => ({
        ...prev,
        description_es: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    if (englishEditor && englishEditor.getHTML() !== form.description_en) {
      englishEditor.commands.setContent(form.description_en || "", false);
    }
  }, [form.description_en, englishEditor]);

  useEffect(() => {
    if (spanishEditor && spanishEditor.getHTML() !== form.description_es) {
      spanishEditor.commands.setContent(form.description_es || "", false);
    }
  }, [form.description_es, spanishEditor]);

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
          .select(
            "first_name, last_name, role, is_approved, account_status, language_preference"
          )
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
          text.adminFallback;

        setAdminName(fullName);
      } catch (error) {
        console.error(text.dashboardAccessError, error);
        setAccessDenied(true);
      } finally {
        setPageLoading(false);
      }
    };

    validateAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    return () => {
      if (localImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(localImagePreview);
      }

      if (localAthQrPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(localAthQrPreview);
      }
    };
  }, [localImagePreview, localAthQrPreview]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("donation_campaigns")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCampaigns((data || []) as DonationCampaign[]);
    } catch (error) {
      console.error(text.loadCampaignsError, error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCount = useMemo(
    () => campaigns.filter((c) => c.is_active).length,
    [campaigns]
  );

  const activeCountExcludingEditing = useMemo(() => {
    return campaigns.filter((c) => c.is_active && c.id !== editingId).length;
  }, [campaigns, editingId]);

  const previewCampaign = useMemo<DonationCampaign>(() => {
    return {
      id: editingId || "draft",
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
      image_url: form.image_url || null,
      title_en: form.title_en,
      description_en: form.description_en,
      title_es: form.title_es,
      description_es: form.description_es,
      ath_movil_link: form.ath_movil_link || null,
      paypal_link: form.paypal_link || null,
      venmo_link: form.venmo_link || null,
      cashapp_link: form.cashapp_link || null,
      zelle_link: form.zelle_link || null,
      created_at: new Date().toISOString(),
      image_position_y: form.image_position_y ?? 50,
    };
  }, [editingId, form]);

  const resetForm = () => {
    if (localImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localImagePreview);
    }

    if (localAthQrPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localAthQrPreview);
    }

    setLocalImagePreview(null);
    setLocalAthQrPreview(null);
    setEditingId(null);
    setCurrentStep(1);
    setForm(emptyForm);
    englishEditor?.commands.setContent("", false);
    spanishEditor?.commands.setContent("", false);

    if (imageInputRef.current) imageInputRef.current.value = "";
    if (athQrInputRef.current) athQrInputRef.current.value = "";
  };

  const handleChange = (
    key: keyof FormState,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getPaymentLinks = (campaign: Partial<FormState | DonationCampaign>) => {
    return paymentMethods
      .map((method) => ({
        ...method,
        url: String(campaign[method.key] || "").trim(),
      }))
      .filter((method) => method.url);
  };

  const handleEdit = (campaign: DonationCampaign) => {
    if (localImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localImagePreview);
    }

    if (localAthQrPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localAthQrPreview);
    }

    setLocalImagePreview(null);
    setLocalAthQrPreview(null);
    setEditingId(campaign.id);
    setCurrentStep(1);

    setForm({
      is_active: campaign.is_active,
      sort_order: campaign.sort_order,
      image_url: campaign.image_url || "",
      title_en: campaign.title_en || "",
      description_en: campaign.description_en || "",
      title_es: campaign.title_es || "",
      description_es: campaign.description_es || "",
      ath_movil_link: campaign.ath_movil_link || "",
      paypal_link: campaign.paypal_link || "",
      venmo_link: campaign.venmo_link || "",
      cashapp_link: campaign.cashapp_link || "",
      zelle_link: campaign.zelle_link || "",
      image_position_y: campaign.image_position_y ?? 50,
    });

    englishEditor?.commands.setContent(campaign.description_en || "", false);
    spanishEditor?.commands.setContent(campaign.description_es || "", false);

    requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // const goToNextStep = () => setCurrentStep((prev) => Math.min(3, prev + 1));
  // const goToPreviousStep = () =>
  //   setCurrentStep((prev) => Math.max(1, prev - 1));

  const displayImage = localImagePreview || form.image_url;
  const displayAthQr = localAthQrPreview || form.ath_movil_link;
  const previewLinks = getPaymentLinks(previewCampaign);

  const stripHtml = (value: string) => {
    if (typeof window === "undefined") {
      return String(value || "")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
    }

    const div = document.createElement("div");
    div.innerHTML = value || "";
    return div.textContent?.replace(/\u00a0/g, " ").trim() || "";
  };

  const hasDonationOption = () => {
    return [
      form.ath_movil_link,
      form.paypal_link,
      form.venmo_link,
      form.cashapp_link,
      form.zelle_link,
    ].some((value) => String(value || "").trim().length > 0);
  };

  const hasRequiredContent = () => {
    return (
      form.title_en.trim().length > 0 &&
      form.title_es.trim().length > 0 &&
      stripHtml(form.description_en).length > 0 &&
      stripHtml(form.description_es).length > 0
    );
  };

  const showValidationError = async (message: string) => {
    await Swal.fire({
      icon: "warning",
      title: text.validationTitle,
      text: message,
      confirmButtonColor: "#0d4db0",
    });
  };

  const validateCurrentStep = async () => {
    if (currentStep === 1 && !hasDonationOption()) {
      await showValidationError(text.validationDonationLink);
      return false;
    }

    if (currentStep === 2 && !hasRequiredContent()) {
      await showValidationError(text.validationContent);
      return false;
    }

    return true;
  };

  const goToNextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setCurrentStep((prev) => Math.min(3, prev + 1));
  };

  const goToPreviousStep = () =>
    setCurrentStep((prev) => Math.max(1, prev - 1));

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 text-center text-slate-500">
          {text.checkingAccess}
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <Navbar />
        <div className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            {text.accessDeniedTitle}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {text.accessDeniedDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] 
    pb-16 pt-2 md:pt-10"
    >
      <Navbar />

      <div className="mx-auto mt-0 w-full max-w-full md:max-w-7xl px-2 md:px-6">
        <div className="overflow-hidden rounded-4xl border border-slate-300 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="border-b border-slate-300 bg-slate-50/70 px-3 py-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-[1.25rem] bg-pink-50 text-[#0d4db0] px-2">
                  <HeartHandshake className="h-5 w-5 md:h-7 md:w-7" />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    {text.pageTitle}
                  </h1>
                  <p className="mt-1 text-xs leading-4 md:text-sm text-slate-500">
                    {text.pageDescription}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <StatPill
                  label={text.statTotal}
                  value={String(campaigns.length)}
                />
                <StatPill label={text.statActive} value={String(activeCount)} />
                {/* <StatPill label={text.statMaxActive} value="3" /> */}
              </div>
            </div>
          </div>

          <div
            ref={formSectionRef}
            className="grid grid-cols-1 gap-8 p-3 md:p-8 xl:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-300 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="shrink-0 border-b border-slate-300 bg-slate-50/70 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 px-2 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Plus className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-slate-800">
                      {editingId ? text.editCampaign : text.createCampaign}
                    </h2>
                    <p className="text-xs leading-4 md:text-sm text-slate-500">
                      {text.formDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4 md:p-6">
                <Stepper currentStep={currentStep} language={language} />
                {/* Form */}
                <AdminDonationsForm
                  currentStep={currentStep}
                  form={form}
                  setForm={setForm}
                  handleChange={handleChange}
                  contentLanguage={contentLanguage}
                  setContentLanguage={setContentLanguage}
                  englishEditor={englishEditor as Editor}
                  spanishEditor={spanishEditor as Editor}
                  paymentMethods={paymentMethods}
                  selectedPaymentKey={selectedPaymentKey as string}
                  setSelectedPaymentKey={
                    setSelectedPaymentKey as React.Dispatch<
                      React.SetStateAction<string>
                    >
                  }
                  displayAthQr={displayAthQr}
                  uploadingAthQr={uploadingAthQr}
                  athQrInputRef={
                    athQrInputRef as React.RefObject<HTMLInputElement>
                  }
                  localAthQrPreview={localAthQrPreview}
                  setLocalAthQrPreview={setLocalAthQrPreview}
                  setUploadingAthQr={setUploadingAthQr}
                  displayImage={displayImage}
                  uploadingImage={uploadingImage}
                  imageInputRef={
                    imageInputRef as React.RefObject<HTMLInputElement>
                  }
                  localImagePreview={localImagePreview}
                  setLocalImagePreview={setLocalImagePreview}
                  setUploadingImage={setUploadingImage}
                />

                {/* Action buttons */}
                <div className="mt-8 shrink-0 border-t border-slate-300 bg-white/70 pt-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      disabled={currentStep === 1}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {text.previous}
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        {text.clear}
                      </button>

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl"
                        >
                          {text.continue}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            if (!hasDonationOption()) {
                              setCurrentStep(1);
                              await showValidationError(
                                text.validationDonationLink
                              );
                              return;
                            }

                            if (!hasRequiredContent()) {
                              setCurrentStep(2);
                              await showValidationError(text.validationContent);
                              return;
                            }

                            await handleSave({
                              // form,
                              // editingId,
                              // campaigns,
                              // activeCountExcludingEditing,
                              // setSaving,
                              // setCampaigns,
                              // resetForm,

                              form,
                              activeCountExcludingEditing,
                              loadCampaigns,
                              editingId,
                              resetForm,
                              setSaving,
                            });
                          }}
                          disabled={saving}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl disabled:opacity-60"
                        >
                          <Save className="h-4 w-4" />
                          {saving
                            ? text.saving
                            : editingId
                            ? text.updateCampaign
                            : text.createCampaignButton}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div
              className="overflow-hidden rounded-[1.75rem] border border-slate-300 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] 
            backdrop-blur-xl"
            >
              <div className="border-b border-slate-300 bg-slate-50/70 px-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex px-2 h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-base md:text-lg font-semibold text-slate-800">
                        {text.livePreview}
                      </h2>
                      <p className="leading-4 text-xs md:text-sm text-slate-500">
                        {text.livePreviewDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center w-auto mx-auto md:inline-flex md:w-fit items-center gap-1 rounded-2xl border border-slate-300 bg-white p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setPreviewLanguage("en")}
                      className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        previewLanguage === "en"
                          ? "bg-[#0d4db0] text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      EN
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewLanguage("es")}
                      className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        previewLanguage === "es"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      ES
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {!previewCampaign.is_active ? (
                  <NoCampaignStripPreview />
                ) : (
                  <div
                    className="relative rounded-3xl border border-slate-300 bg-linear-to-br from-white via-pink-50/40 to-sky-50/40 p-4 sm:p-4 md:p-6 
                  shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                  >
                    <div className="relative mb-5 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
                      <div className="relative h-60 w-full">
                        {displayImage ? (
                          <Image
                            src={displayImage}
                            alt={
                              previewLanguage === "en"
                                ? previewCampaign.title_en ||
                                  text.campaignImageAlt
                                : previewCampaign.title_es ||
                                  adminDonationsText.es.campaignImageAlt
                            }
                            fill
                            className={`object-cover transition-all duration-300`}
                            unoptimized={displayImage.startsWith("blob:")}
                            style={{
                              objectPosition: `center ${
                                form.image_position_y ?? 50
                              }%`,
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-pink-50 to-sky-50 text-slate-400">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-[#0d4db0] shadow-lg backdrop-blur-md">
                        <HeartHandshake className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-[#0d4db0]">
                      {previewLanguage === "en"
                        ? previewCampaign.title_en || text.campaignTitleFallback
                        : previewCampaign.title_es ||
                          text.campaignTitleFallback}
                    </h3>

                    <div
                      className="prose prose-sm mb-5 max-w-none text-slate-600"
                      dangerouslySetInnerHTML={{
                        __html:
                          previewLanguage === "en"
                            ? previewCampaign.description_en ||
                              adminDonationsText.en.campaignDescriptionFallback
                            : previewCampaign.description_es ||
                              adminDonationsText.es.campaignDescriptionFallback,
                      }}
                    />

                    {displayAthQr || previewLinks.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          <QrCode className="h-4 w-4" />
                          {previewLanguage === "en"
                            ? adminDonationsText.en.paymentOptions
                            : adminDonationsText.es.paymentOptions}
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {displayAthQr && (
                            <div className="group/link flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0d4db0]/20 hover:shadow-md">
                              <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                                  <Image
                                    src="/icons/ath-movil.svg"
                                    alt="ATH Móvil"
                                    width={24}
                                    height={24}
                                    className="h-6 w-6 object-contain"
                                  />
                                </span>

                                <span className="text-sm font-semibold text-slate-800">
                                  ATH Móvil
                                </span>
                              </div>

                              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-[#0d4db0]">
                                <QrCode className="h-3.5 w-3.5" />
                                {previewLanguage === "en"
                                  ? adminDonationsText.en.qrReady
                                  : adminDonationsText.es.qrReady}
                              </span>
                            </div>
                          )}

                          {previewLinks?.map((link) => (
                            <a
                              key={link.key}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0d4db0]/20 hover:shadow-md"
                            >
                              <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                                  <Image
                                    src={link.icon}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                    className="h-6 w-6 object-contain"
                                  />
                                </span>

                                <span className="text-sm font-semibold text-slate-800">
                                  {link.label}
                                </span>
                              </div>

                              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-[#0d4db0] transition group-hover/link:translate-x-0.5">
                                <QrCode className="h-3.5 w-3.5" />
                                {previewLanguage === "en"
                                  ? adminDonationsText.en.viewQr
                                  : adminDonationsText.es.viewQr}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="rounded-2xl border border-dashed border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-400">
                        {previewLanguage === "en"
                          ? adminDonationsText.en.addPaymentOption
                          : adminDonationsText.es.addPaymentOption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Existing Campaigns */}
          <div className="px-6 pb-8 md:px-8">
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-300 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="border-b border-slate-300 bg-slate-50/70 px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
                  {text.existingCampaigns}
                </h2>
              </div>

              <div className="space-y-4 p-4 sm:p-6">
                {loading ? (
                  <p className="text-sm text-slate-500">
                    {text.loadingCampaigns}
                  </p>
                ) : campaigns?.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                    <p className="text-sm italic text-slate-400">
                      {text.emptyCampaigns}
                    </p>
                  </div>
                ) : (
                  campaigns?.map((campaign) => {
                    const links = getPaymentLinks(campaign);
                    const hasAthQr = !!campaign.ath_movil_link;

                    return (
                      <div
                        key={campaign.id}
                        className="rounded-[1.35rem] border border-slate-300 bg-white/90 p-4 shadow-sm"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-14 sm:w-14">
                                {campaign.image_url ? (
                                  <Image
                                    src={campaign.image_url}
                                    alt={
                                      language === "es"
                                        ? campaign.title_es || campaign.title_en
                                        : campaign.title_en || campaign.title_es
                                    }
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                                    <ImageIcon className="h-4 w-4" />
                                  </div>
                                )}

                                <div className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-white/90 text-[#0d4db0] shadow-md">
                                  <HeartHandshake className="h-3.5 w-3.5" />
                                </div>
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="w-full font-semibold text-slate-900 sm:w-auto">
                                    {language === "es"
                                      ? campaign.title_es || campaign.title_en
                                      : campaign.title_en || campaign.title_es}
                                  </h3>

                                  <Badge active={campaign.is_active}>
                                    {campaign.is_active
                                      ? text.active
                                      : text.inactive}
                                  </Badge>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-2">
                                  {hasAthQr && (
                                    <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                                      <Image
                                        src="/icons/ath-movil.svg"
                                        alt="ATH Móvil"
                                        width={14}
                                        height={14}
                                        className="h-3.5 w-3.5 shrink-0 object-contain"
                                      />
                                      <span className="truncate">
                                        {text.athQrUploaded}
                                      </span>
                                    </span>
                                  )}

                                  {links.map((link) => (
                                    <span
                                      key={link.key}
                                      className="inline-flex max-w-full items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                                    >
                                      <Image
                                        src={link.icon}
                                        alt={link.label}
                                        width={14}
                                        height={14}
                                        className="h-3.5 w-3.5 shrink-0 object-contain"
                                      />
                                      <span className="truncate">
                                        {link.label}
                                      </span>
                                    </span>
                                  ))}
                                </div>

                                <div
                                  className="prose prose-sm mt-2 line-clamp-3 max-w-none text-slate-500 sm:line-clamp-2"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      language === "es"
                                        ? campaign.description_es ||
                                          campaign.description_en
                                        : campaign.description_en ||
                                          campaign.description_es,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-[auto_1fr_auto] gap-2 sm:flex sm:shrink-0 sm:flex-wrap sm:justify-end">
                            <button
                              onClick={() =>
                                toggleActive({
                                  campaign,
                                  activeCount,
                                  loadCampaigns,
                                })
                              }
                              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50"
                            >
                              {campaign.is_active ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>

                            <button
                              onClick={() => handleEdit(campaign)}
                              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              {text.edit}
                            </button>

                            <button
                              onClick={() =>
                                handleDelete({
                                  id: campaign.id,
                                  loadCampaigns,
                                  editingId,
                                  resetForm,
                                })
                              }
                              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-red-300 bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
