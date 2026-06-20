"use client";
import Image from "next/image";
import { HeartHandshake, ImageIcon, QrCode, Upload, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Editor } from "@tiptap/react";

import { Input, StepPanel, ToggleRow } from "./elements/AdminDonations";
import {
  handleAthQrUpload,
  handleImageUpload,
} from "../helpers/admin-donations";
import { RichTextField } from "./RichTextEditor";

import { useLanguage } from "../context/language";
import { FormState } from "../admin-donations/page";

const AdminDonationsForm = ({
  currentStep,
  form,
  setForm,
  handleChange,
  contentLanguage,
  setContentLanguage,
  englishEditor,
  spanishEditor,
  paymentMethods,
  selectedPaymentKey,
  setSelectedPaymentKey,
  displayAthQr,
  uploadingAthQr,
  athQrInputRef,
  localAthQrPreview,
  setLocalAthQrPreview,
  setUploadingAthQr,
  displayImage,
  uploadingImage,
  imageInputRef,
  localImagePreview,
  setLocalImagePreview,
  setUploadingImage,
}: {
  currentStep: number;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  handleChange: (
    field: keyof FormState,
    value: string | number | boolean
  ) => void;

  contentLanguage: "en" | "es";
  setContentLanguage: React.Dispatch<React.SetStateAction<"en" | "es">>;
  englishEditor: Editor;
  spanishEditor: Editor;
  paymentMethods: {
    key: string;
    label: string;
    icon: string;
    placeholder: string;
  }[];
  selectedPaymentKey: string;
  setSelectedPaymentKey: React.Dispatch<React.SetStateAction<string>>;
  displayAthQr: string | null;
  uploadingAthQr: boolean;
  athQrInputRef: React.RefObject<HTMLInputElement>;
  localAthQrPreview: string | null;
  setLocalAthQrPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setUploadingAthQr: React.Dispatch<React.SetStateAction<boolean>>;
  displayImage: string | null;
  uploadingImage: boolean;
  imageInputRef: React.RefObject<HTMLInputElement>;
  localImagePreview: string | null;
  setLocalImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      step1Title: "Step 1 — Payment Links & ATH Móvil QR",
      step1Description:
        "Add external donation links and upload the ATH Móvil QR image visitors should scan.",
      activeCampaign: "Active Campaign",
      activeCampaignSubtitle: "Only active campaigns appear publicly",
      athMovilQr: "ATH Móvil QR",
      uploadQrImage: "Upload QR image",
      uploading: "Uploading...",
      uploadQr: "Upload QR",
      qrPreview: "QR Preview",
      athQrPreviewDescription:
        "This uploaded image will appear as the ATH Móvil donation QR.",
      uploadAthMovilQr: "Upload ATH Móvil QR",
      otherPaymentLinks: "Other Payment Links",
      linkGeneratedQrCode: "Link + generated QR code",
      linkLabel: "Link",
      qrOpensLinkPrefix: "This QR opens the",
      qrOpensLinkSuffix: "link.",
      step2Title: "Step 2 — English & Spanish Content",
      step2Description:
        "Add the public-facing campaign title and message in both languages.",
      englishContent: "English Content",
      englishContentDescription: "Content visitors see in English.",
      spanishContent: "Spanish Content",
      spanishContentDescription: "Content visitors see in Spanish.",
      titleEn: "Title (EN)",
      descriptionEn: "Description (EN)",
      titleEs: "Title (ES)",
      descriptionEs: "Description (ES)",
      titleEnPlaceholder: "Support our community initiatives",
      titleEsPlaceholder: "Support our community initiatives",
      step3Title: "Step 3 — Campaign Image & Sort Order",
      step3Description:
        "Upload the campaign image, control image positioning, and choose the display order.",
      sortOrder: "Sort Order",
      imageVerticalPosition: "Image Vertical Position",
      top: "Top",
      center: "Center",
      bottom: "Bottom",
      campaignImage: "Campaign Image",
      campaignImageDescription:
        "Upload the picture shown at the top of the donation card.",
      uploadPhoto: "Upload Photo",
      campaignPreview: "Campaign preview",
      position: "Position",
      uploadCampaignImage: "Upload campaign image",
    },
    es: {
      step1Title: "Paso 1 — Enlaces de pago y QR de ATH Móvil",
      step1Description:
        "Añade enlaces externos para donaciones y sube la imagen QR de ATH Móvil que las personas visitantes deben escanear.",
      activeCampaign: "Campaña activa",
      activeCampaignSubtitle: "Solo las campañas activas aparecen públicamente",
      athMovilQr: "QR de ATH Móvil",
      uploadQrImage: "Subir imagen QR",
      uploading: "Subiendo...",
      uploadQr: "Subir QR",
      qrPreview: "Vista previa del QR",
      athQrPreviewDescription:
        "Esta imagen subida aparecerá como el QR de donación de ATH Móvil.",
      uploadAthMovilQr: "Subir QR de ATH Móvil",
      otherPaymentLinks: "Otros enlaces de pago",
      linkGeneratedQrCode: "Enlace + código QR generado",
      linkLabel: "Enlace",
      qrOpensLinkPrefix: "Este QR abre el enlace de",
      qrOpensLinkSuffix: ".",
      step2Title: "Paso 2 — Contenido en inglés y español",
      step2Description:
        "Añade el título y mensaje público de la campaña en ambos idiomas.",
      englishContent: "Contenido en inglés",
      englishContentDescription:
        "Contenido que las personas visitantes ven en inglés.",
      spanishContent: "Contenido en español",
      spanishContentDescription:
        "Contenido que las personas visitantes ven en español.",
      titleEn: "Título (EN)",
      descriptionEn: "Descripción (EN)",
      titleEs: "Título (ES)",
      descriptionEs: "Descripción (ES)",
      titleEnPlaceholder: "Apoya nuestras iniciativas comunitarias",
      titleEsPlaceholder: "Apoya nuestras iniciativas comunitarias",
      step3Title: "Paso 3 — Imagen de campaña y orden",
      step3Description:
        "Sube la imagen de la campaña, controla su posición y elige el orden de visualización.",
      sortOrder: "Orden",
      imageVerticalPosition: "Posición vertical de la imagen",
      top: "Arriba",
      center: "Centro",
      bottom: "Abajo",
      campaignImage: "Imagen de campaña",
      campaignImageDescription:
        "Sube la imagen que se muestra en la parte superior de la tarjeta de donación.",
      uploadPhoto: "Subir foto",
      campaignPreview: "Vista previa de campaña",
      position: "Posición",
      uploadCampaignImage: "Subir imagen de campaña",
    },
  };

  const t = translations[language === "es" ? "es" : "en"];

  return (
    <form>
      <div className="flex-1 space-y-5">
        {currentStep === 1 && (
          <StepPanel title={t.step1Title} description={t.step1Description}>
            <ToggleRow
              title={t.activeCampaign}
              subtitle={t.activeCampaignSubtitle}
              checked={form.is_active}
              onToggle={() =>
                handleChange("is_active", Boolean(!form?.is_active))
              }
            />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 md:p-4">
              <p className="mb-4 text-sm font-semibold text-slate-800">
                {t.athMovilQr}
              </p>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                      <Image
                        src="/icons/ath-movil.png"
                        alt="ATH Móvil"
                        width={26}
                        height={26}
                        className="h-7 w-7 object-contain"
                      />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        ATH Móvil
                      </p>
                      <p className="text-xs text-slate-400">
                        {t.uploadQrImage}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => athQrInputRef.current?.click()}
                    disabled={uploadingAthQr}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    <Upload className="h-4 w-4" />
                    {uploadingAthQr ? t.uploading : t.uploadQr}
                  </button>
                </div>

                <input
                  ref={athQrInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleAthQrUpload({
                      e,
                      setUploadingAthQr,
                      localAthQrPreview,
                      setLocalAthQrPreview,
                      setForm: setForm as React.Dispatch<
                        React.SetStateAction<FormState>
                      >,
                      athQrInputRef,
                    })
                  }
                />

                {displayAthQr ? (
                  <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                    <div className="flex shrink-0 justify-center rounded-xl bg-white p-3 shadow-sm">
                      <Image
                        src={displayAthQr}
                        alt={t.athMovilQr}
                        width={110}
                        height={110}
                        className="max-h-32 w-auto object-contain"
                        unoptimized={displayAthQr.startsWith("blob:")}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <QrCode className="h-4 w-4" />
                        {t.qrPreview}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {t.athQrPreviewDescription}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (localAthQrPreview?.startsWith("blob:")) {
                          URL.revokeObjectURL(localAthQrPreview);
                        }

                        setLocalAthQrPreview(null);
                        handleChange("ath_movil_link", "");
                      }}
                      className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/65"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => athQrInputRef.current?.click()}
                    className="mt-4 flex h-40 w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-[#0d4db0]/30 hover:bg-blue-50/40 hover:text-[#0d4db0]"
                  >
                    <div className="text-center">
                      <QrCode className="mx-auto mb-3 h-8 w-8" />
                      <p className="text-sm font-medium">
                        {t.uploadAthMovilQr}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Other Payment Links */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-4 text-sm font-semibold text-slate-800">
                {t.otherPaymentLinks}
              </p>

              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPaymentKey === method.key;
                  const hasValue = !!form[method.key];

                  return (
                    <button
                      key={method.key}
                      type="button"
                      onClick={() => setSelectedPaymentKey(method.key)}
                      className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition ${
                        isSelected
                          ? "border-[#0d4db0]/30 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-[#0d4db0]/20 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                        <Image
                          src={method.icon}
                          alt={method.label}
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                        />
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? "text-[#0d4db0]" : "text-slate-600"
                        }`}
                      >
                        {method.label}
                      </span>

                      {hasValue && (
                        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {paymentMethods
                  .filter((method) => method.key === selectedPaymentKey)
                  .map((method) => {
                    const value = form[method.key];

                    return (
                      <div
                        key={method.key}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                            <Image
                              src={method.icon}
                              alt={method.label}
                              width={26}
                              height={26}
                              className="h-7 w-7 object-contain"
                            />
                          </span>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {method.label}
                            </p>
                            <p className="text-xs text-slate-400">
                              {t.linkGeneratedQrCode}
                            </p>
                          </div>
                        </div>

                        <Input
                          label={`${method.label} ${t.linkLabel}`}
                          value={String(value)}
                          onChange={(v) => handleChange(method.key, v)}
                          placeholder={method.placeholder}
                        />

                        {String(value).trim() && (
                          <div className="mt-4 flex md:flex-row flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="rounded-xl bg-white p-2 shadow-sm">
                              <QRCodeSVG
                                value={String(value).trim()}
                                size={82}
                                includeMargin
                              />
                            </div>

                            <div>
                              <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <QrCode className="h-4 w-4" />
                                {t.qrPreview}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {t.qrOpensLinkPrefix} {method.label}{" "}
                                {t.qrOpensLinkSuffix}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </StepPanel>
        )}

        {currentStep === 2 && (
          <StepPanel title={t.step2Title} description={t.step2Description}>
            <div className="flex justify-center md:justify-end">
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
              <div className="rounded-3xl md:border border-blue-100 md:bg-blue-50/50 p-0 md:p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="hidden md:block rounded-xl bg-[#0d4db0] px-3 py-2 text-sm font-bold text-white">
                    EN
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {t.englishContent}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {t.englishContentDescription}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label={t.titleEn}
                    value={String(form.title_en)}
                    onChange={(v) => handleChange("title_en", v)}
                    placeholder={t.titleEnPlaceholder}
                  />

                  <RichTextField editor={englishEditor} />
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-2 md:p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white">
                    ES
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {t.spanishContent}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {t.spanishContentDescription}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label={t.titleEs}
                    value={String(form.title_es)}
                    onChange={(v) => handleChange("title_es", v)}
                    placeholder={t.titleEsPlaceholder}
                  />

                  <RichTextField editor={spanishEditor} />
                </div>
              </div>
            )}
          </StepPanel>
        )}

        {currentStep === 3 && (
          <StepPanel title={t.step3Title} description={t.step3Description}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
              <Input
                label={t.sortOrder}
                type="number"
                value={String(form.sort_order)}
                onChange={(v) => handleChange("sort_order", Number(v))}
                placeholder="0"
              />

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {t.imageVerticalPosition}
                  </label>

                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-[#0d4db0] shadow-sm">
                    {Number(form.image_position_y) ?? 50}%
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={Number(form.image_position_y) ?? 50}
                    onChange={(e) =>
                      handleChange("image_position_y", Number(e.target.value))
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
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {t.campaignImage}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.campaignImageDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
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
                onChange={(e) =>
                  handleImageUpload({
                    e,
                    setUploadingImage,
                    localImagePreview,
                    setLocalImagePreview,
                    setForm: setForm as React.Dispatch<
                      React.SetStateAction<FormState>
                    >,
                    imageInputRef:
                      imageInputRef as React.RefObject<HTMLInputElement>,
                  })
                }
              />

              {displayImage ? (
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative h-60 w-full">
                    <Image
                      src={displayImage}
                      alt={t.campaignPreview}
                      fill
                      className="object-cover transition-all duration-300"
                      style={{
                        objectPosition: `center ${
                          form.image_position_y ?? 50
                        }%`,
                      }}
                      unoptimized={displayImage.startsWith("blob:")}
                    />
                  </div>

                  <div className="absolute bottom-3 left-3 rounded-2xl bg-black/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                    {t.position}: {Number(form.image_position_y) ?? 50}%
                  </div>

                  <div className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#0d4db0] shadow-lg backdrop-blur-md">
                    <HeartHandshake className="h-5 w-5" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (localImagePreview?.startsWith("blob:")) {
                        URL.revokeObjectURL(localImagePreview);
                      }

                      setLocalImagePreview(null);
                      handleChange("image_url", "");
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/65"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex h-40 w-full cursor-pointer items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-[#0d4db0]/30 hover:text-[#0d4db0]"
                >
                  <div className="text-center">
                    <ImageIcon className="mx-auto mb-3 h-7 w-7" />
                    <p className="text-sm font-medium">
                      {t.uploadCampaignImage}
                    </p>
                  </div>
                </button>
              )}
            </div>
          </StepPanel>
        )}
      </div>
    </form>
  );
};

export default AdminDonationsForm;
