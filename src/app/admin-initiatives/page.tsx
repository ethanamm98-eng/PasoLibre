"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useEditor } from "@tiptap/react";
import {
  Plus,
  Save,
  Trash2,
  Eye,
  EyeOff,
  CalendarDays,
  FileText,
  Gift,
  Shapes,
  Search,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import { supabase } from "../lib/supabase/supabaseClient";
import {
  loadInitiatives,
  toggleActive,
  resetForm,
  handleEdit,
  handleSave,
  deleteInitiative,
  InitiativeRecord,
  InitiativeSource,
  InitiativeForm,
} from "../helpers/admin-initiatives";
import { useLanguage } from "../context/language";

import Navbar from "../components/NavBar";
import StarterKit from "@tiptap/starter-kit";
import InitiativePreview from "../components/InitiativePreview";
import {
  Input,
  Select,
  StatPill,
  StepPanel,
  ToggleRow,
  MiniBadge,
  TypeBadge,
  SourceBadge,
  Badge,
} from "../components/elements/AdminInitiatives";
import { RichTextField } from "../components/RichTextEditor";
import { SchedulerForm } from "../lib/interfaces/events";

export type PreviewLanguage = "en" | "es";

const emptyForm: InitiativeForm = {
  title_en: "",
  title_es: "",
  description_en: "",
  description_es: "",
  type: "info",
  source_type: "custom",
  linked_event_id: "",
  location: "",
  time_label: "",
  price_label: 0,
  image_url: "",
  cta_label_en: "More Information",
  cta_label_es: "Más información",
  cta_url: "",
  is_active: true,
  is_featured: false,
  sort_order: 0,
  image_position_y: 50,
};

export default function AdminInitiativesPage() {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    pageTitle: isSpanish
      ? "Administrador de Iniciativas"
      : "Initiatives Manager",
    pageDescription: isSpanish
      ? "Crea iniciativas bilingües de forma clara con un flujo guiado paso a paso."
      : "Create clear, bilingual initiatives with a guided step-by-step flow.",
    total: isSpanish ? "Total" : "Total",
    active: isSpanish ? "Activas" : "Active",
    featured: isSpanish ? "Destacadas" : "Featured",

    stepSource: isSpanish ? "Fuente" : "Source",
    stepSourceSub: isSpanish ? "Evento o personalizado" : "Event or custom",
    stepLanguages: isSpanish ? "Idiomas" : "Languages",
    stepLanguagesSub: isSpanish ? "Inglés y español" : "English & Spanish",
    stepDetails: isSpanish ? "Detalles" : "Details",
    stepDetailsSub: isSpanish
      ? "Lugar, fecha, donación"
      : "Location, date, donation",
    stepPublish: isSpanish ? "Publicar" : "Publish",
    stepPublishSub: isSpanish ? "Foto, URL, ajustes" : "Photo, URL, settings",

    editInitiative: isSpanish ? "Editar Iniciativa" : "Edit Initiative",
    createInitiative: isSpanish ? "Crear Iniciativa" : "Create Initiative",
    formHelp: isSpanish
      ? "Sigue cada paso para evitar que falte información importante."
      : "Follow each step to avoid missing important information.",

    step1Title: isSpanish
      ? "Paso 1 — Elige la fuente del contenido"
      : "Step 1 — Choose Content Source",
    step1Description: isSpanish
      ? "Comienza eligiendo si esta iniciativa debe usar un evento existente o contenido completamente personalizado."
      : "Start by choosing whether this initiative should pull from an existing event or use fully custom content.",
    contentSource: isSpanish ? "Fuente del contenido" : "Content Source",
    contentSourceHelp: isSpanish
      ? "Elige cómo se debe crear esta iniciativa."
      : "Choose how this initiative should be created.",
    fromEvent: isSpanish ? "Desde Evento" : "From Event",
    fromEventHelp: isSpanish
      ? "Usa el título, descripción, fecha y detalles de un evento existente."
      : "Pull title, description, date, and event details from an existing event.",
    customContent: isSpanish ? "Contenido Personalizado" : "Custom Content",
    customContentHelp: isSpanish
      ? "Crea subvenciones, recursos, actualizaciones, servicios y anuncios especiales manualmente."
      : "Create grants, resources, updates, services, and special announcements manually.",
    selectEvent: isSpanish ? "Seleccionar Evento" : "Select Event",
    loadingEvents: isSpanish ? "Cargando eventos..." : "Loading events...",
    chooseEvent: isSpanish ? "Elige un evento" : "Choose an event",
    publishingSettings: isSpanish
      ? "Ajustes de Publicación"
      : "Publishing Settings",
    publishingSettingsHelp: isSpanish
      ? "Controla si esta iniciativa aparece públicamente y si debe destacarse."
      : "Control whether this initiative appears publicly and whether it should be highlighted.",
    activeTitle: isSpanish ? "Activa" : "Active",
    activeSubtitle: isSpanish
      ? "Mostrar esta iniciativa públicamente"
      : "Show this initiative publicly",
    featuredTitle: isSpanish ? "Destacada" : "Featured",
    featuredSubtitle: isSpanish
      ? "Resaltar esta iniciativa en la sección"
      : "Highlight this initiative in the section",

    step2Title: isSpanish
      ? "Paso 2 — Agrega información en ambos idiomas"
      : "Step 2 — Add Information in Both Languages",
    step2Description: isSpanish
      ? "El inglés y el español están separados para que sea más fácil ver qué falta antes de publicar."
      : "English and Spanish are separated so it is easier to see what is missing before publishing.",
    englishSection: isSpanish ? "Sección en Inglés" : "English Section",
    englishSectionHelp: isSpanish
      ? "Contenido que visitantes ven en inglés."
      : "Content visitors see in English.",
    spanishSection: isSpanish ? "Sección en Español" : "Spanish Section",
    spanishSectionHelp: isSpanish
      ? "Contenido que visitantes ven en español."
      : "Content visitors see in Spanish.",
    titleEn: isSpanish ? "Título (EN)" : "Title (EN)",
    titleEs: isSpanish ? "Título (ES)" : "Title (ES)",
    descriptionEn: isSpanish ? "Descripción (EN)" : "Description (EN)",
    descriptionEs: isSpanish ? "Descripción (ES)" : "Description (ES)",
    ctaLabelEn: isSpanish ? "Etiqueta CTA (EN)" : "CTA Label (EN)",
    ctaLabelEs: isSpanish ? "Etiqueta CTA (ES)" : "CTA Label (ES)",
    titleEnPlaceholder: isSpanish
      ? "Subvención de bienestar comunitario"
      : "Community Wellness Grant",
    titleEsPlaceholder: isSpanish
      ? "Subvención de bienestar comunitario"
      : "Subvención de bienestar comunitario",
    moreInformation: isSpanish ? "Más información" : "More Information",

    step3Title: isSpanish
      ? "Paso 3 — Lugar, Fecha/Hora y Donación Sugerida"
      : "Step 3 — Location, Date/Time & Suggested Donation",
    step3Description: isSpanish
      ? "Agrega detalles simples para el público. El precio fue reemplazado por donación sugerida."
      : "Add simple public-facing details. Price wording has been replaced with suggested donation wording.",
    initiativeType: isSpanish ? "Tipo de Iniciativa" : "Initiative Type",
    event: isSpanish ? "Evento" : "Event",
    grant: isSpanish ? "Subvención" : "Grant",
    info: isSpanish ? "Información" : "Info",
    program: isSpanish ? "Programa" : "Program",
    resource: isSpanish ? "Recurso" : "Resource",
    announcement: isSpanish ? "Anuncio" : "Announcement",
    location: isSpanish ? "Lugar" : "Location",
    suggestedDonation: isSpanish ? "Donación Sugerida" : "Suggested Donation",
    donationPlaceholder: isSpanish
      ? "Gratis, opcional, o donación sugerida de $10"
      : "Free, Optional, or $10 suggested donation",
    date: isSpanish ? "Fecha" : "Date",
    time: isSpanish ? "Hora" : "Time",

    step4Title: isSpanish
      ? "Paso 4 — Imagen, URL, Orden y Publicación"
      : "Step 4 — Picture, URL, Sort Order & Publishing",
    step4Description: isSpanish
      ? "Finaliza la iniciativa con imagen, enlace CTA y orden de visualización."
      : "Finish the initiative with media, CTA link and display order.",
    initiativeImage: isSpanish ? "Imagen de la Iniciativa" : "Initiative Image",
    imageHelp: isSpanish
      ? "Sube una imagen personalizada o una imagen de respaldo"
      : "Upload a custom image or fallback image",
    uploading: isSpanish ? "Subiendo..." : "Uploading...",
    uploadPhoto: isSpanish ? "Subir Foto" : "Upload Photo",
    uploadInitiativeImage: isSpanish
      ? "Subir imagen de la iniciativa"
      : "Upload initiative image",
    imagePosition: isSpanish
      ? "Posición Vertical de la Imagen"
      : "Image Vertical Position",
    position: isSpanish ? "Posición" : "Position",
    top: isSpanish ? "Arriba" : "Top",
    center: isSpanish ? "Centro" : "Center",
    bottom: isSpanish ? "Abajo" : "Bottom",
    sortOrder: isSpanish ? "Orden" : "Sort Order",
    ctaUrl: isSpanish ? "URL del CTA" : "CTA URL",

    previous: isSpanish ? "Anterior" : "Previous",
    clear: isSpanish ? "Limpiar" : "Clear",
    continue: isSpanish ? "Continuar" : "Continue",
    saving: isSpanish ? "Guardando..." : "Saving...",
    updateInitiative: isSpanish ? "Actualizar Iniciativa" : "Update Initiative",

    existingInitiatives: isSpanish
      ? "Iniciativas Existentes"
      : "Existing Initiatives",
    searchPlaceholder: isSpanish
      ? "Buscar iniciativas..."
      : "Search initiatives...",
    allTypes: isSpanish ? "Todos los tipos" : "All Types",
    loadingInitiatives: isSpanish
      ? "Cargando iniciativas..."
      : "Loading initiatives...",
    noInitiativesFound: isSpanish
      ? "No se encontraron iniciativas"
      : "No initiatives found",
    inactive: isSpanish ? "Inactiva" : "Inactive",
    untitled: isSpanish ? "Sin título" : "Untitled",
    descriptionPreview: isSpanish
      ? "<p>Vista previa de la descripción de la iniciativa</p>"
      : "<p>Initiative description preview</p>",
    edit: isSpanish ? "Editar" : "Edit",

    uploadTypeError: isSpanish
      ? "Por favor sube una imagen JPG, PNG o WEBP."
      : "Please upload a JPG, PNG, or WEBP image.",
    uploadSizeError: isSpanish
      ? "La imagen debe pesar menos de 5MB."
      : "Image must be smaller than 5MB.",
    uploadFailed: isSpanish
      ? "No se pudo subir la imagen."
      : "Failed to upload image.",
    imageUrlFailed: isSpanish
      ? "No se pudo generar la URL de la imagen."
      : "Failed to generate image URL.",
  };

  const initiativeSteps = [
    { id: 1, title: t.stepSource, subtitle: t.stepSourceSub },
    { id: 2, title: t.stepLanguages, subtitle: t.stepLanguagesSub },
    { id: 3, title: t.stepDetails, subtitle: t.stepDetailsSub },
    { id: 4, title: t.stepPublish, subtitle: t.stepPublishSub },
  ];

  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const stepperSectionRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [initiatives, setInitiatives] = useState<InitiativeRecord[]>([]);
  const [events, setEvents] = useState<SchedulerForm[]>([]);

  const [form, setForm] = useState<InitiativeForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [contentLanguage, setContentLanguage] = useState<PreviewLanguage>("en");
  const [previewLanguage, setPreviewLanguage] = useState<PreviewLanguage>("en");
  const [currentStep, setCurrentStep] = useState(1);

  const [localImagePreview, setLocalImagePreview] = useState<string | null>(
    null
  );

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (localImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(localImagePreview);
      }
    };
  }, [localImagePreview]);

  const loadEvents = async () => {
    setEventsLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select(
        "id, name_en, name_es, description_en, description_es, city, country, date, time, price, image_url, privacy, type"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    } else {
      setEvents((data || []) as SchedulerForm[]);
    }

    setEventsLoading(false);
  };

  useEffect(() => {
    loadInitiatives({
      setLoading,
      setInitiatives,
    });
    loadEvents();
  }, []);

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((item) => {
      const q = search.toLowerCase().trim();

      const matchesSearch =
        !q ||
        (item.title_en || item.title || "").toLowerCase().includes(q) ||
        (item.title_es || item.title || "").toLowerCase().includes(q) ||
        (item.description_en || item.description || "")
          .toLowerCase()
          .includes(q) ||
        (item.description_es || item.description || "")
          .toLowerCase()
          .includes(q);

      const matchesType = typeFilter === "all" || item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [initiatives, search, typeFilter]);

  const activeCount = useMemo(
    () => initiatives.filter((item) => item.is_active).length,
    [initiatives]
  );

  // const featuredCount = useMemo(
  //   () => initiatives.filter((item) => item.is_featured).length,
  //   [initiatives]
  // );

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === form.linked_event_id),
    [events, form.linked_event_id]
  );

  const previewData = useMemo(() => {
    const eventTitle =
      language === "en"
        ? selectedEvent?.name_en || ""
        : selectedEvent?.name_es || "";
    const eventDescription =
      language === "en"
        ? selectedEvent?.description_en || ""
        : selectedEvent?.description_es || "";

    if (form.source_type === "event" && selectedEvent) {
      return {
        title:
          previewLanguage === "es"
            ? form.title_es || eventTitle
            : form.title_en || eventTitle,
        description:
          previewLanguage === "es"
            ? form.description_es || eventDescription
            : form.description_en || eventDescription,
        location:
          [selectedEvent.city, selectedEvent.country]
            .filter(Boolean)
            .join(", ") || form.location,
        time_label:
          [selectedEvent.date, selectedEvent.time]
            .filter(Boolean)
            .join(" • ") || form.time_label,
        price_label: selectedEvent?.price
          ? selectedEvent?.price
          : form?.price_label,
        image_url:
          selectedEvent.image_url || localImagePreview || form.image_url,
        cta_label:
          previewLanguage === "es" ? form.cta_label_es : form.cta_label_en,
        image_position_y: form.image_position_y,
      };
    }

    return {
      title: previewLanguage === "es" ? form.title_es : form.title_en,
      description:
        previewLanguage === "es" ? form.description_es : form.description_en,
      location: form.location,
      time_label: form.time_label,
      price_label: form?.price_label,
      image_url: localImagePreview || form.image_url,
      cta_label:
        previewLanguage === "es" ? form.cta_label_es : form.cta_label_en,
    };
  }, [form, selectedEvent, localImagePreview, previewLanguage, language]);

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
    if (!englishEditor || englishEditor.isDestroyed) return;

    const nextContent = form.description_en || "";
    const currentContent = englishEditor.getHTML();

    if (currentContent !== nextContent) {
      englishEditor.commands.setContent(nextContent, false);
    }
  }, [englishEditor, form.description_en]);

  useEffect(() => {
    if (!spanishEditor || spanishEditor.isDestroyed) return;

    const nextContent = form.description_es || "";
    const currentContent = spanishEditor.getHTML();

    if (currentContent !== nextContent) {
      spanishEditor.commands.setContent(nextContent, false);
    }
  }, [spanishEditor, form.description_es]);

  const syncRichTextEditors = ({
    description_en,
    description_es,
  }: {
    description_en?: string | null;
    description_es?: string | null;
  }) => {
    if (englishEditor && !englishEditor.isDestroyed) {
      englishEditor.commands.setContent(description_en || "", false);
    }

    if (spanishEditor && !spanishEditor.isDestroyed) {
      spanishEditor.commands.setContent(description_es || "", false);
    }
  };

  const handleChange = (
    key: keyof InitiativeForm,
    value: string | boolean | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSourceChange = (value: InitiativeSource) => {
    setForm((prev) => ({
      ...prev,
      source_type: value,
      linked_event_id: value === "custom" ? "" : prev.linked_event_id,
    }));
  };

  const handleEventSelect = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);

    setForm((prev) => {
      const nextDescriptionEn =
        prev.description_en || event?.description_en || "";
      const nextDescriptionEs =
        prev.description_es || event?.description_es || "";

      syncRichTextEditors({
        description_en: nextDescriptionEn,
        description_es: nextDescriptionEs,
      });

      return {
        ...prev,
        source_type: "event",
        linked_event_id: eventId,
        title_en: prev.title_en || event?.name_en || "",
        title_es: prev.title_es || event?.name_es || "",
        description_en: nextDescriptionEn,
        description_es: nextDescriptionEs,
        location:
          [event?.city, event?.country].filter(Boolean).join(", ") ||
          prev.location,
        time_label:
          [event?.date, event?.time].filter(Boolean).join(" • ") ||
          prev.time_label,
        price_label:
          event?.price !== undefined && event?.price !== null
            ? Number(event.price)
            : prev.price_label,
        image_url: event?.image_url || prev.image_url,
        type: "event",
        cta_url: "/check-in/" + eventId,
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let nextPreviewUrl: string | null = null;

    try {
      setUploadingImage(true);

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(t.uploadTypeError);
      }

      const maxSizeInMb = 5;
      if (file.size > maxSizeInMb * 1024 * 1024) {
        throw new Error(t.uploadSizeError);
      }

      if (localImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(localImagePreview);
      }

      nextPreviewUrl = URL.createObjectURL(file);
      setLocalImagePreview(nextPreviewUrl);

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const filePath = `initiative-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("initiatives")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message || t.uploadFailed);
      }

      const { data: publicUrlData } = supabase.storage
        .from("initiatives")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl) {
        throw new Error(t.imageUrlFailed);
      }

      setForm((prev) => ({
        ...prev,
        image_url: publicUrl,
      }));

      if (nextPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(nextPreviewUrl);
      }

      setLocalImagePreview(null);
    } catch (error) {
      console.error("Failed to upload initiative image:", error);

      if (nextPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(nextPreviewUrl);
      }

      setLocalImagePreview(null);
      alert(error instanceof Error ? error.message : t.uploadFailed);
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const displayFormImage = localImagePreview || form.image_url;

  const handleClearForm = () => {
    resetForm({
      localImagePreview,
      setLocalImagePreview,
      setEditingId,
      setForm,
      emptyForm,
      imageInputRef: imageInputRef as React.RefObject<HTMLInputElement>,
    });

    syncRichTextEditors({
      description_en: "",
      description_es: "",
    });

    setCurrentStep(1);
  };

  const handleEditInitiative = (item: InitiativeRecord) => {
    handleEdit({
      item: {
        ...item,
        price_label: selectedEvent?.price
          ? Number(selectedEvent.price)
          : item.price_label,
      },
      localImagePreview,
      setLocalImagePreview,
      setEditingId,
      setForm,
    });

    syncRichTextEditors({
      description_en: item.description_en || item.description || "",
      description_es: item.description_es || item.description || "",
    });

    setCurrentStep(1);

    requestAnimationFrame(() => {
      stepperSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleSaveInitiative = () => {
    handleSave({
      form,
      editingId,
      setSaving,
      loadInitiatives: loadInitiatives as never,
      resetForm,
      setLoading,
      setInitiatives,
      localImagePreview,
      setLocalImagePreview,
      setEditingId,
      setForm,
      emptyForm,
      imageInputRef: imageInputRef as React.RefObject<HTMLInputElement>,
    });
  };

  const formatDate = (dateString: string) => {
    const [datePart, timePart] = dateString.split(" • ");
    if (!datePart || !timePart) return dateString;

    const date = new Date(`${datePart}T${timePart}`);
    if (Number.isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat(isSpanish ? "es-PR" : "en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: !isSpanish,
    }).format(date);
  };

  return (
    <div
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] 
    pb-16 pt-2"
    >
      <Navbar />

      <div className="mx-auto mt-1 md:mt-10 max-w-7xl px-2 md:px-6">
        <div className="overflow-hidden rounded-4xl border border-solid border-slate-300 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div
            className="border-b border-slate-300 bg-slate-50/70 px-6 py-6 md:px-8"
            ref={stepperSectionRef}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex px-2 h-10 w-10 items-center justify-center rounded-[1.25rem] bg-blue-50 text-[#0d4db0]">
                  <Shapes className="h-5 w-5 md:h-7 md:w-7" />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    {t.pageTitle}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {t.pageDescription}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-center md:justify-start">
                <StatPill label={t.total} value={String(initiatives.length)} />
                <StatPill label={t.active} value={String(activeCount)} />
                {/* <StatPill label={t.featured} value={String(featuredCount)} /> */}
              </div>
            </div>
          </div>

          <div className="pt-4 px-2 md:px-8 -mb-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {initiativeSteps?.map((step) => {
                const isActive = currentStep === step.id;
                const isComplete = currentStep > step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    className={`group rounded-2xl border p-3 text-left transition cursor-pointer ${
                      isActive
                        ? "border-[#0d4db0]/30 bg-blue-50 shadow-sm"
                        : isComplete
                        ? "border-emerald-300 bg-emerald-50/70"
                        : "border-slate-300 bg-white hover:border-blue-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                          isActive
                            ? "bg-[#0d4db0] text-white shadow-sm"
                            : isComplete
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0d4db0]"
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          step.id
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {step.title}
                        </p>
                        <p className="truncate text-[11px] text-slate-500">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-2 mt-6 md:p-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div
              className="flex min-h-full flex-col overflow-hidden rounded-[1.75rem] bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] 
              backdrop-blur-xl border border-solid border-slate-300"
            >
              <div className="shrink-0 border-b border-slate-300 bg-slate-50/70 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Plus className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {editingId ? t.editInitiative : t.createInitiative}
                    </h2>
                    <p className="text-sm text-slate-500">{t.formHelp}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6" ref={formSectionRef}>
                <div className="flex-1 space-y-6">
                  {currentStep === 1 && (
                    <StepPanel
                      title={t.step1Title}
                      description={t.step1Description}
                      tone="blue"
                    >
                      <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                {t.contentSource}
                              </label>
                              <p className="mt-1 text-xs text-slate-500">
                                {t.contentSourceHelp}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <button
                              type="button"
                              onClick={() => handleSourceChange("event")}
                              className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
                                form.source_type === "event"
                                  ? "border-blue-200 bg-blue-50 shadow-sm"
                                  : "border-slate-200 bg-white hover:border-blue-100 hover:bg-blue-50/40"
                              }`}
                            >
                              <div className="relative z-10 flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-sm">
                                  <CalendarDays className="h-5 w-5" />
                                </div>

                                <div>
                                  <p className="font-semibold text-slate-800">
                                    {t.fromEvent}
                                  </p>
                                  <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {t.fromEventHelp}
                                  </p>
                                </div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSourceChange("custom")}
                              className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
                                form.source_type === "custom"
                                  ? "border-indigo-200 bg-indigo-50 shadow-sm"
                                  : "border-slate-200 bg-white hover:border-indigo-100 hover:bg-indigo-50/40"
                              }`}
                            >
                              <div className="relative z-10 flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-indigo-700 shadow-sm">
                                  <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                  <p className="font-semibold text-slate-800">
                                    {t.customContent}
                                  </p>
                                  <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {t.customContentHelp}
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>

                        {form.source_type === "event" && (
                          <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-4">
                            <Select
                              label={t.selectEvent}
                              value={form.linked_event_id}
                              onChange={handleEventSelect}
                              disabled={eventsLoading}
                              options={[
                                {
                                  value: "",
                                  label: eventsLoading
                                    ? t.loadingEvents
                                    : t.chooseEvent,
                                },
                                ...events.map((event) => ({
                                  value: event.id,
                                  label:
                                    language === "en"
                                      ? event.name_en
                                      : event.name_es,
                                })),
                              ]}
                            />
                          </div>
                        )}

                        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="mb-4">
                            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {t.publishingSettings}
                            </label>
                            <p className="mt-1 text-xs text-slate-500">
                              {t.publishingSettingsHelp}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                            <ToggleRow
                              title={t.activeTitle}
                              subtitle={t.activeSubtitle}
                              checked={form.is_active}
                              onToggle={() =>
                                handleChange("is_active", !form.is_active)
                              }
                            />

                            {/* <ToggleRow
                              title={t.featuredTitle}
                              subtitle={t.featuredSubtitle}
                              checked={form.is_featured}
                              onToggle={() =>
                                handleChange("is_featured", !form.is_featured)
                              }
                            /> */}
                          </div>
                        </div>
                      </div>
                    </StepPanel>
                  )}

                  {currentStep === 2 && (
                    <StepPanel
                      title={t.step2Title}
                      description={t.step2Description}
                      tone="indigo"
                    >
                      <div className="mb-5 flex justify-center md:justify-end">
                        <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                          <button
                            type="button"
                            onClick={() => setContentLanguage("en")}
                            className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition ${
                              contentLanguage === "en"
                                ? "bg-[#0d4db0] text-white shadow-sm"
                                : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            EN
                          </button>

                          <button
                            type="button"
                            onClick={() => setContentLanguage("es")}
                            className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition ${
                              contentLanguage === "es"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            ES
                          </button>
                        </div>
                      </div>

                      {contentLanguage === "en" ? (
                        <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5">
                          <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-[#0d4db0] px-3 py-2 text-sm font-bold text-white">
                              EN
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800">
                                {t.englishSection}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {t.englishSectionHelp}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-5">
                            <Input
                              label={t.titleEn}
                              value={form.title_en}
                              onChange={(v) => handleChange("title_en", v)}
                              placeholder={t.titleEnPlaceholder}
                            />

                            <RichTextField editor={englishEditor} />

                            <Input
                              label={t.ctaLabelEn}
                              value={form.cta_label_en}
                              onChange={(v) => handleChange("cta_label_en", v)}
                              placeholder="More Information"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5">
                          <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white">
                              ES
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800">
                                {t.spanishSection}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {t.spanishSectionHelp}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-5">
                            <Input
                              label={t.titleEs}
                              value={form.title_es}
                              onChange={(v) => handleChange("title_es", v)}
                              placeholder={t.titleEsPlaceholder}
                            />

                            <RichTextField editor={spanishEditor} />

                            <Input
                              label={t.ctaLabelEs}
                              value={form.cta_label_es}
                              onChange={(v) => handleChange("cta_label_es", v)}
                              placeholder="Más información"
                            />
                          </div>
                        </div>
                      )}
                    </StepPanel>
                  )}

                  {currentStep === 3 && (
                    <StepPanel
                      title={t.step3Title}
                      description={t.step3Description}
                      tone="purple"
                    >
                      <Select
                        label={t.initiativeType}
                        value={form.type}
                        onChange={(v) => handleChange("type", v)}
                        options={[
                          { value: "event", label: t.event },
                          { value: "grant", label: t.grant },
                          { value: "info", label: t.info },
                          { value: "program", label: t.program },
                          { value: "resource", label: t.resource },
                          { value: "announcement", label: t.announcement },
                        ]}
                      />

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Input
                          label={t.location}
                          value={form.location}
                          onChange={(v) => handleChange("location", v)}
                          placeholder="San Juan, PR"
                        />

                        <Input
                          label={t.suggestedDonation}
                          value={String(form.price_label)}
                          onChange={(v) => handleChange("price_label", v)}
                          placeholder={t.donationPlaceholder}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Input
                          label={t.date}
                          type="date"
                          value={form.time_label?.split(" • ")?.[0] || ""}
                          onChange={(dateValue) => {
                            const currentTime =
                              form.time_label?.split(" • ")?.[1] || "";
                            handleChange(
                              "time_label",
                              [dateValue, currentTime]
                                .filter(Boolean)
                                .join(" • ")
                            );
                          }}
                        />

                        <Input
                          label={t.time}
                          type="time"
                          value={form.time_label?.split(" • ")?.[1] || ""}
                          onChange={(timeValue) => {
                            const currentDate =
                              form.time_label?.split(" • ")?.[0] || "";
                            handleChange(
                              "time_label",
                              [currentDate, timeValue]
                                .filter(Boolean)
                                .join(" • ")
                            );
                          }}
                        />
                      </div>
                    </StepPanel>
                  )}

                  {currentStep === 4 && (
                    <StepPanel
                      title={t.step4Title}
                      description={t.step4Description}
                      tone="purple"
                    >
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div>
                          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            {t.initiativeImage}
                          </label>

                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <p className="text-xs text-slate-500">
                                {t.imageHelp}
                              </p>

                              <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                disabled={uploadingImage}
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                              >
                                <Upload className="h-4 w-4" />
                                {uploadingImage ? t.uploading : t.uploadPhoto}
                              </button>
                            </div>

                            <input
                              ref={imageInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />

                            {displayFormImage ? (
                              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                                <div className="relative h-60 w-full">
                                  <Image
                                    src={displayFormImage}
                                    alt="Initiative preview"
                                    fill
                                    className="object-cover transition-all duration-300"
                                    style={{
                                      objectPosition: `center ${
                                        form.image_position_y ?? 50
                                      }%`,
                                    }}
                                    unoptimized={displayFormImage.startsWith(
                                      "blob:"
                                    )}
                                  />
                                </div>

                                <div className="absolute bottom-3 left-3 rounded-2xl bg-black/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                  {t.position}: {form.image_position_y ?? 50}%
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      localImagePreview?.startsWith("blob:")
                                    ) {
                                      URL.revokeObjectURL(localImagePreview);
                                    }
                                    setLocalImagePreview(null);
                                    handleChange("image_url", "");
                                  }}
                                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/65"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="flex h-40 w-full items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-[#0d4db0]/30 hover:text-[#0d4db0]"
                              >
                                <div className="text-center">
                                  <ImageIcon className="mx-auto mb-3 h-7 w-7" />
                                  <p className="text-sm font-medium">
                                    {t.uploadInitiativeImage}
                                  </p>
                                </div>
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {t.imagePosition}
                            </label>

                            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-[#0d4db0] shadow-sm">
                              {form.image_position_y ?? 50}%
                            </span>
                          </div>

                          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={1}
                              value={form.image_position_y ?? 50}
                              onChange={(e) =>
                                handleChange(
                                  "image_position_y",
                                  Number(e.target.value)
                                )
                              }
                              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-linear-to-r from-[#0d4db0] to-sky-400"
                            />

                            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                              <span>{t.top}</span>
                              <span>{t.center}</span>
                              <span>{t.bottom}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <Input
                            label={t.sortOrder}
                            type="number"
                            value={String(form.sort_order)}
                            onChange={(v) =>
                              handleChange("sort_order", Number(v))
                            }
                            placeholder="0"
                          />

                          <Input
                            label={t.ctaUrl}
                            value={form.cta_url}
                            onChange={(v) => handleChange("cta_url", v)}
                            placeholder="/events/123 or /initiatives/grant"
                          />
                        </div>
                      </div>
                    </StepPanel>
                  )}
                </div>

                <div className="mt-8 shrink-0 border-t border-slate-100 bg-white/70 pt-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentStep((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentStep === 1}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {t.previous}
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleClearForm}
                        className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        {t.clear}
                      </button>

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentStep((prev) => Math.min(4, prev + 1))
                          }
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl"
                        >
                          {t.continue}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveInitiative}
                          disabled={saving}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl disabled:opacity-60"
                        >
                          <Save className="h-4 w-4" />
                          {saving
                            ? t.saving
                            : editingId
                            ? t.updateInitiative
                            : t.createInitiative}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <InitiativePreview
              form={form}
              previewLanguage={previewLanguage}
              setPreviewLanguage={setPreviewLanguage}
              previewData={previewData}
            />
          </div>

          <div
            className="m-4 md:m-6 overflow-hidden rounded-[1.75rem] bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl
            border border-solid border-slate-300"
          >
            <div className="border-b border-slate-300 bg-slate-50/70 px-4 py-5 sm:px-6">
              <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
                {t.existingInitiatives}
              </h2>
            </div>

            <div className="space-y-4 p-4 sm:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 md:w-55 md:shrink-0"
                >
                  <option value="all">{t.allTypes}</option>
                  <option value="event">{t.event}</option>
                  <option value="grant">{t.grant}</option>
                  <option value="info">{t.info}</option>
                  <option value="program">{t.program}</option>
                  <option value="resource">{t.resource}</option>
                  <option value="announcement">{t.announcement}</option>
                </select>
              </div>

              {loading ? (
                <p className="text-sm text-slate-500">{t.loadingInitiatives}</p>
              ) : filteredInitiatives.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                  <p className="text-sm italic text-slate-400">
                    {t.noInitiativesFound}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInitiatives?.map((item) => {
                    const displayTitle =
                      language === "es"
                        ? item.title_es || item.title || t.untitled
                        : item.title_en || item.title || t.untitled;

                    const displayDescription =
                      language === "es"
                        ? item.description_es ||
                          item.description ||
                          t.descriptionPreview
                        : item.description_en ||
                          item.description ||
                          t.descriptionPreview;

                    const displayImage = item.image_url || "/events/event1.jpg";

                    return (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                      >
                        <div className="flex flex-col gap-0 lg:flex-row">
                          <div className="relative h-52 w-full shrink-0 overflow-hidden bg-slate-100 lg:h-auto lg:w-64 xl:w-72">
                            {displayImage ? (
                              <Image
                                src={displayImage}
                                alt={displayTitle}
                                fill
                                className="object-cover"
                                style={{
                                  objectPosition: `center ${
                                    form.image_position_y ?? 50
                                  }%`,
                                }}
                                unoptimized={displayImage.startsWith("blob:")}
                              />
                            ) : (
                              <div className="flex h-full min-h-52 items-center justify-center text-slate-400">
                                <ImageIcon className="h-8 w-8" />
                              </div>
                            )}

                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                              <Badge active={item.is_active}>
                                {item.is_active ? t.active : t.inactive}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="w-full font-semibold text-slate-900 sm:w-auto">
                                    {displayTitle}
                                  </h3>

                                  <TypeBadge type={item.type} small />
                                  <SourceBadge
                                    source={item.source_type}
                                    small
                                  />
                                  <MiniBadge label="EN / ES" />
                                </div>

                                <div
                                  className="prose prose-sm mt-3 mb-5 max-w-none text-slate-600 line-clamp-3"
                                  dangerouslySetInnerHTML={{
                                    __html: displayDescription,
                                  }}
                                />

                                <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2 xl:grid-cols-3">
                                  {item.location && (
                                    <span className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                                      <MapPin className="h-4 w-4 shrink-0 text-[#0d4db0]" />
                                      <span className="truncate">
                                        {item.location}
                                      </span>
                                    </span>
                                  )}

                                  {item.time_label && (
                                    <span className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                                      <CalendarDays className="h-4 w-4 shrink-0 text-[#0d4db0]" />
                                      <span className="truncate">
                                        {formatDate(item.time_label)}
                                      </span>
                                    </span>
                                  )}

                                  {item.price_label && (
                                    <span className="inline-flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                                      <Gift className="h-4 w-4 shrink-0 text-[#0d4db0]" />
                                      <span className="truncate">
                                        ${item.price_label}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-[auto_1fr_auto] gap-2 sm:flex sm:shrink-0 sm:flex-wrap sm:justify-end">
                                <button
                                  onClick={() =>
                                    toggleActive({
                                      item,
                                      loadInitiatives: loadInitiatives as never,
                                      setLoading,
                                      setInitiatives,
                                    })
                                  }
                                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50"
                                >
                                  {item.is_active ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>

                                <button
                                  onClick={() => handleEditInitiative(item)}
                                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                  {t.edit}
                                </button>

                                <button
                                  onClick={() =>
                                    deleteInitiative({
                                      id: item.id,
                                      loadInitiatives: loadInitiatives as never,
                                      editingId,
                                      resetForm,
                                      setLoading,
                                      setInitiatives,
                                      localImagePreview,
                                      setLocalImagePreview,
                                      setEditingId,
                                      setForm,
                                      emptyForm,
                                      imageInputRef:
                                        imageInputRef as React.RefObject<HTMLInputElement>,
                                    })
                                  }
                                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-red-300 bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
