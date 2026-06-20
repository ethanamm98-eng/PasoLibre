import { supabase } from "../lib/supabase/supabaseClient";
import Swal from "sweetalert2";

export type InitiativeType =
  | "event"
  | "grant"
  | "info"
  | "program"
  | "resource"
  | "announcement";

export type InitiativeSource = "event" | "custom";

export type InitiativeRecord = {
  id: string;
  title_en: string | null;
  title_es: string | null;
  description_en: string | null;
  description_es: string | null;
  type: InitiativeType;
  source_type: InitiativeSource;
  linked_event_id: string | null;
  location: string | null;
  time_label: string | null;
  price_label: number | null;
  image_url: string | null;
  cta_label_en: string | null;
  cta_label_es: string | null;
  cta_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;

  // legacy/back-compat
  title?: string | null;
  description?: string | null;
  cta_label?: string | null;
};

export type InitiativeForm = {
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  type: InitiativeType;
  source_type: InitiativeSource;
  linked_event_id: string;
  location: string;
  time_label: string;
  price_label: number | null;
  image_url: string;
  cta_label_en: string;
  cta_label_es: string;
  cta_url: string;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  image_position_y?: number;
};

export const loadInitiatives = async ({
  setLoading,
  setInitiatives,
}: {
  setLoading: (loading: boolean) => void;
  setInitiatives: (initiatives: InitiativeRecord[]) => void;
}) => {
  setLoading(true);

  const { data, error } = await supabase
    .from("initiatives")
    .select(
      `
          id,
          title_en,
          title_es,
          description_en,
          description_es,
          type,
          source_type,
          linked_event_id,
          location,
          time_label,
          price_label,
          image_url,
          cta_label_en,
          cta_label_es,
          cta_url,
          is_active,
          is_featured,
          sort_order,
          created_at,
          title,
          description,
          cta_label
        `
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load initiatives:", error);
    setInitiatives([]);
  } else {
    setInitiatives((data || []) as InitiativeRecord[]);
  }

  setLoading(false);
};

export const toggleActive = async ({
  item,
  loadInitiatives,
  setLoading,
  setInitiatives,
}: {
  item: InitiativeRecord;
  loadInitiatives: (options?: {
    setLoading?: (loading: boolean) => void;
    setInitiatives?: (initiatives: InitiativeRecord[]) => void;
  }) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setInitiatives: (initiatives: InitiativeRecord[]) => void;
}) => {
  const activating = !item.is_active;

  const result = await Swal.fire({
    title: activating ? "Activate Initiative?" : "Deactivate Initiative?",
    text: activating
      ? "This initiative will become publicly visible."
      : "This initiative will be hidden from the public.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: activating ? "Yes, activate it" : "Yes, deactivate it",
    cancelButtonText: "Cancel",
    confirmButtonColor: activating ? "#16a34a" : "#dc2626",
    cancelButtonColor: "#64748b",
    reverseButtons: true,
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-2xl px-5 py-2.5",
      cancelButton: "rounded-2xl px-5 py-2.5",
    },
  });

  if (!result.isConfirmed) return;

  const { error } = await supabase
    .from("initiatives")
    .update({ is_active: activating })
    .eq("id", item.id);

  if (error) {
    console.error("Failed to toggle initiative:", error);

    await Swal.fire({
      icon: "error",
      title: "Could not update initiative",
      text:
        error.message || "Something went wrong while updating the initiative.",
      confirmButtonText: "Got it",
      confirmButtonColor: "#0d4db0",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-2xl px-5 py-2.5",
      },
    });

    return;
  }

  await loadInitiatives({
    setLoading,
    setInitiatives,
  });

  await Swal.fire({
    icon: "success",
    title: activating ? "Initiative activated" : "Initiative deactivated",
    text: activating
      ? "The initiative is now publicly visible."
      : "The initiative has been hidden successfully.",
    timer: 1800,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: "rounded-3xl",
      title: "text-slate-900",
      htmlContainer: "text-slate-500",
    },
  });
};

export const resetForm = ({
  localImagePreview,
  setLocalImagePreview,
  setEditingId,
  setForm,
  emptyForm,
  imageInputRef,
}: {
  localImagePreview: string | null;
  setLocalImagePreview: (url: string | null) => void;
  setEditingId: (id: string | null) => void;
  setForm: (form: InitiativeForm) => void;
  emptyForm: InitiativeForm;
  imageInputRef: React.RefObject<HTMLInputElement>;
}) => {
  if (localImagePreview?.startsWith("blob:")) {
    URL.revokeObjectURL(localImagePreview);
  }

  setLocalImagePreview(null);
  setEditingId(null);
  setForm(emptyForm);

  if (imageInputRef.current) {
    imageInputRef.current.value = "";
  }
};

export const handleEdit = ({
  item,
  localImagePreview,
  setLocalImagePreview,
  setEditingId,
  setForm,
}: {
  item: InitiativeRecord;
  localImagePreview: string | null;
  setLocalImagePreview: (url: string | null) => void;
  setEditingId: (id: string | null) => void;
  setForm: (form: InitiativeForm) => void;
}) => {
  if (localImagePreview?.startsWith("blob:")) {
    URL.revokeObjectURL(localImagePreview);
  }

  setLocalImagePreview(null);
  setEditingId(item.id);
  setForm({
    title_en: item.title_en || item.title || "",
    title_es: item.title_es || item.title || "",
    description_en: item.description_en || item.description || "",
    description_es: item.description_es || item.description || "",
    type: item.type || "info",
    source_type: item.source_type || "custom",
    linked_event_id: item.linked_event_id || "",
    location: item.location || "",
    time_label: item.time_label || "",
    price_label: item.price_label || 0,
    image_url: item.image_url || "",
    cta_label_en: item.cta_label_en || item.cta_label || "More Information",
    cta_label_es: item.cta_label_es || "Más información",
    cta_url: item.cta_url || "",
    is_active: item.is_active,
    is_featured: item.is_featured,
    sort_order: item.sort_order || 0,
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const handleSave = async ({
  form,
  editingId,
  setSaving,
  loadInitiatives,
  resetForm,
  setLoading,
  setInitiatives,
  localImagePreview,
  setLocalImagePreview,
  setEditingId,
  setForm,
  emptyForm,
  imageInputRef,
}: {
  form: InitiativeForm;
  editingId: string | null;
  setSaving: (saving: boolean) => void;
  loadInitiatives: (options?: {
    setLoading?: (loading: boolean) => void;
    setInitiatives?: (initiatives: InitiativeRecord[]) => void;
  }) => Promise<void>;
  resetForm: (options: {
    localImagePreview: string | null;
    setLocalImagePreview: (url: string | null) => void;
    setEditingId: (id: string | null) => void;
    setForm: (form: InitiativeForm) => void;
    emptyForm: InitiativeForm;
    imageInputRef: React.RefObject<HTMLInputElement>;
  }) => void;
  setLoading: (loading: boolean) => void;
  setInitiatives: (initiatives: InitiativeRecord[]) => void;
  localImagePreview: string | null;
  setLocalImagePreview: (url: string | null) => void;
  setEditingId: (id: string | null) => void;
  setForm: (form: InitiativeForm) => void;
  emptyForm: InitiativeForm;
  imageInputRef: React.RefObject<HTMLInputElement>;
}) => {
  if (
    !form.title_en.trim() ||
    !form.title_es.trim() ||
    !form.description_en.trim() ||
    !form.description_es.trim()
  ) {
    Swal.fire({
      icon: "error",
      title: "Missing required fields",
      text: "Please complete both English and Spanish title and description fields.",
      confirmButtonText: "Got it",
      confirmButtonColor: "#0d4db0",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-2xl px-5 py-2.5",
      },
    });
    // alert("Please complete both English and Spanish title/description fields.");
    return;
  }

  setSaving(true);

  const payload = {
    title_en: form.title_en.trim(),
    title_es: form.title_es.trim(),
    description_en: form.description_en.trim(),
    description_es: form.description_es.trim(),
    type: form.type,
    source_type: form.source_type,
    linked_event_id:
      form.source_type === "event" ? form.linked_event_id || null : null,
    location: form.location.trim() || null,
    time_label: form.time_label.trim() || null,
    price_label: form.price_label || null,
    image_url: form.image_url.trim() || null,
    cta_label_en: form.cta_label_en.trim() || "More Information",
    cta_label_es: form.cta_label_es.trim() || "Más información",
    cta_url: form.cta_url.trim() || null,
    is_active: form.is_active,
    is_featured: form.is_featured,
    sort_order: Number(form.sort_order) || 0,

    // legacy/back-compat
    title: form.title_en.trim(),
    description: form.description_en.trim(),
    cta_label: form.cta_label_en.trim() || "More Information",
  };

  const response = editingId
    ? await supabase.from("initiatives").update(payload).eq("id", editingId)
    : await supabase.from("initiatives").insert(payload);

  if (response.error) {
    console.error("Failed to save initiative:", response.error);
    alert(response.error.message || "Failed to save initiative.");
    setSaving(false);
    return;
  }

  await loadInitiatives({
    setLoading: setLoading,
    setInitiatives: setInitiatives,
  });

  resetForm({
    localImagePreview: localImagePreview,
    setLocalImagePreview: setLocalImagePreview,
    setEditingId: setEditingId,
    setForm: setForm,
    emptyForm: emptyForm,
    imageInputRef: imageInputRef,
  });

  setSaving(false);
};

export const deleteInitiative = async ({
  id,
  loadInitiatives,
  editingId,
  resetForm,
  setLoading,
  setInitiatives,
  localImagePreview,
  setLocalImagePreview,
  setEditingId,
  setForm,
  emptyForm,
  imageInputRef,
}: {
  id: string;
  loadInitiatives: (options?: {
    setLoading?: (loading: boolean) => void;
    setInitiatives?: (initiatives: InitiativeRecord[]) => void;
  }) => Promise<void>;
  editingId: string | null;
  resetForm: (options: {
    localImagePreview: string | null;
    setLocalImagePreview: (url: string | null) => void;
    setEditingId: (id: string | null) => void;
    setForm: (form: InitiativeForm) => void;
    emptyForm: InitiativeForm;
    imageInputRef: React.RefObject<HTMLInputElement>;
  }) => void;
  setLoading: (loading: boolean) => void;
  setInitiatives: (initiatives: InitiativeRecord[]) => void;
  localImagePreview: string | null;
  setLocalImagePreview: (url: string | null) => void;
  setEditingId: (id: string | null) => void;
  setForm: (form: InitiativeForm) => void;
  emptyForm: InitiativeForm;
  imageInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const result = await Swal.fire({
    title: "Delete this initiative?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    reverseButtons: true,
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-2xl px-5 py-2.5",
      cancelButton: "rounded-2xl px-5 py-2.5",
    },
  });

  if (!result.isConfirmed) return;

  const { error } = await supabase.from("initiatives").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete initiative:", error);

    await Swal.fire({
      icon: "error",
      title: "Could not delete initiative",
      text: error.message || "Something went wrong while deleting.",
      confirmButtonText: "Got it",
      confirmButtonColor: "#0d4db0",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-2xl px-5 py-2.5",
      },
    });

    return;
  }

  await loadInitiatives({
    setLoading,
    setInitiatives,
  });

  if (editingId === id) {
    resetForm({
      localImagePreview,
      setLocalImagePreview,
      setEditingId,
      setForm,
      emptyForm,
      imageInputRef,
    });
  }

  await Swal.fire({
    icon: "success",
    title: "Initiative deleted",
    text: "The initiative has been removed successfully.",
    timer: 1800,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: "rounded-3xl",
      title: "text-slate-900",
      htmlContainer: "text-slate-500",
    },
  });
};
