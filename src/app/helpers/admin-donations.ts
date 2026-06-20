import Swal from "sweetalert2";
import { supabase } from "../lib/supabase/supabaseClient";
import { DonationCampaign, FormState } from "../admin-donations/page";

export const stripHtml = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

export const uploadImageToBucket = async ({
  file,
  folder,
}: {
  file: File;
  folder: string;
}) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, or WEBP image.");
  }

  //TODO: Consider re-adding file size limit if needed
  // const maxSizeInMb = 5;
  // if (file.size > maxSizeInMb * 1024 * 1024) {
  //   throw new Error(`Image must be smaller than ${maxSizeInMb}MB.`);
  // }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;

  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("donation-campaigns")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Failed to upload image.");
  }

  const { data: publicUrlData } = supabase.storage
    .from("donation-campaigns")
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl;

  if (!publicUrl) {
    throw new Error("Failed to generate image URL.");
  }

  return publicUrl;
};

export const handleImageUpload = async ({
  e,
  setUploadingImage,
  localImagePreview,
  setLocalImagePreview,
  setForm,
  imageInputRef,
}: {
  e: React.ChangeEvent<HTMLInputElement>;
  setUploadingImage: (uploading: boolean) => void;
  localImagePreview: string | null;
  setLocalImagePreview: (url: string | null) => void;
  setForm: React.Dispatch<
    React.SetStateAction<FormState>
  >;
  imageInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const file = e.target.files?.[0];
  if (!file) return;

  let nextPreviewUrl: string | null = null;

  try {
    setUploadingImage(true);

    if (localImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localImagePreview);
    }

    nextPreviewUrl = URL.createObjectURL(file);
    setLocalImagePreview(nextPreviewUrl);

    const publicUrl = await uploadImageToBucket({
      file,
      folder: "campaign-images",
    });

    setForm((prev) => ({
      ...prev,
      image_url: publicUrl,
    }));

    if (nextPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(nextPreviewUrl);
    }

    setLocalImagePreview(null);
  } catch (error) {
    console.error("Failed to upload donation image:", error);

    if (nextPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(nextPreviewUrl);
    }

    setLocalImagePreview(null);
    alert(error instanceof Error ? error.message : "Failed to upload image.");
  } finally {
    setUploadingImage(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  }
};

export const handleAthQrUpload = async ({
  e,
  setUploadingAthQr,
  localAthQrPreview,
  setLocalAthQrPreview,
  setForm,
  athQrInputRef,
}: {
  e: React.ChangeEvent<HTMLInputElement>;
  setUploadingAthQr: (uploading: boolean) => void;
  localAthQrPreview: string | null;
  setLocalAthQrPreview: (url: string | null) => void;
  setForm: React.Dispatch<
    React.SetStateAction<FormState>
  >;
  athQrInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const file = e.target.files?.[0];
  if (!file) return;

  let nextPreviewUrl: string | null = null;

  try {
    setUploadingAthQr(true);

    if (localAthQrPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localAthQrPreview);
    }

    nextPreviewUrl = URL.createObjectURL(file);
    setLocalAthQrPreview(nextPreviewUrl);

    const publicUrl = await uploadImageToBucket({
      file,
      folder: "ath-movil-qrs",
    });

    setForm((prev) => ({
      ...prev,
      ath_movil_link: publicUrl,
    }));

    if (nextPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(nextPreviewUrl);
    }

    setLocalAthQrPreview(null);
  } catch (error) {
    console.error("Failed to upload ATH Móvil QR:", error);

    if (nextPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(nextPreviewUrl);
    }

    setLocalAthQrPreview(null);
    alert(error instanceof Error ? error.message : "Failed to upload ATH QR.");
  } finally {
    setUploadingAthQr(false);
    if (athQrInputRef.current) athQrInputRef.current.value = "";
  }
};

export const handleSave = async ({
  form,
  activeCountExcludingEditing,
  loadCampaigns,
  editingId,
  resetForm,
  setSaving,
}: {
  form: {
    title_en: string;
    description_en: string;
    title_es: string;
    description_es: string;
    is_active: boolean;
    sort_order: number | string;
    image_url: string;
    ath_movil_link: string;
    paypal_link: string;
    venmo_link: string;
    cashapp_link: string;
    zelle_link: string;
    image_position_y?: number | null;
  };
  activeCountExcludingEditing: number;
  loadCampaigns: () => Promise<void>;
  editingId: string | null;
  resetForm: () => void;
  setSaving: (saving: boolean) => void;
}) => {
  try {
    if (!form.title_en.trim()) throw new Error("English title is required.");
    if (!stripHtml(form.description_en))
      throw new Error("English description is required.");
    if (!form.title_es.trim()) throw new Error("Spanish title is required.");
    if (!stripHtml(form.description_es))
      throw new Error("Spanish description is required.");

    if (form.is_active && activeCountExcludingEditing >= 3) {
      throw new Error(
        "You can only have 3 active donation campaigns at a time."
      );
    }

    setSaving(true);

    const wasEditing = !!editingId;

    const payload = {
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
      image_url: form.image_url.trim() || null,
      title_en: form.title_en.trim(),
      description_en: form.description_en,
      title_es: form.title_es.trim(),
      description_es: form.description_es,
      ath_movil_link: form.ath_movil_link.trim() || null,
      paypal_link: form.paypal_link.trim() || null,
      venmo_link: form.venmo_link.trim() || null,
      cashapp_link: form.cashapp_link.trim() || null,
      zelle_link: form.zelle_link.trim() || null,
      image_position_y: form.image_position_y ?? 50,
    };

    if (editingId) {
      const { error } = await supabase
        .from("donation_campaigns")
        .update(payload)
        .eq("id", editingId);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("donation_campaigns")
        .insert(payload);

      if (error) throw error;
    }

    await loadCampaigns();
    resetForm();

    Swal.fire({
      icon: "success",
      title: wasEditing ? "Campaign updated!" : "Campaign created!",
      text: wasEditing
        ? "Your donation campaign has been updated successfully."
        : "Your donation campaign has been created successfully.",
      timer: 2200,
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-3xl",
        title: "text-slate-900",
        htmlContainer: "text-slate-500",
      },
    });
  } catch (error) {
    console.error("Failed to save donation campaign:", error);

    Swal.fire({
      icon: "error",
      title: "Could not save campaign",
      text: error instanceof Error ? error.message : "Failed to save campaign.",
      confirmButtonText: "Got it",
      confirmButtonColor: "#0d4db0",
      customClass: {
        popup: "rounded-3xl",
      },
    });
  } finally {
    setSaving(false);
  }
};

export const handleDelete = async ({
  id,
  loadCampaigns,
  editingId,
  resetForm,
}: {
  id: string;
  loadCampaigns: () => Promise<void>;
  editingId: string | null;
  resetForm: () => void;
}) => {
  Swal.fire({
    title: "Delete this campaign?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from("donation_campaigns")
          .delete()
          .eq("id", id);

        if (error) throw error;

        await loadCampaigns();

        if (editingId === id) {
          resetForm();
        }
      } catch (error) {
        console.error("Failed to delete donation campaign:", error);
      }
    }
  });
};

export const toggleActive = async ({
  campaign,
  activeCount,
  loadCampaigns,
}: {
  campaign: DonationCampaign;
  activeCount: number;
  loadCampaigns: () => Promise<void>;
}) => {
  Swal.fire({
    title: campaign.is_active
      ? "Deactivate this campaign?"
      : "Activate this campaign?",
    text: campaign.is_active
      ? "This will hide the campaign from the public site."
      : "This will make the campaign visible on the public site.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: campaign.is_active ? "Deactivate" : "Activate",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        if (!campaign.is_active && activeCount >= 3) {
          alert("You can only have 3 active donation campaigns at a time.");
          return;
        }

        const { error } = await supabase
          .from("donation_campaigns")
          .update({ is_active: !campaign.is_active })
          .eq("id", campaign.id);

        if (error) throw error;
        await loadCampaigns();
      } catch (error) {
        console.error("Failed to toggle campaign:", error);
      }
    }
  });
};
