import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Eye,
  Gift,
  Link2,
  MapPin,
  ImageIcon,
} from "lucide-react";

import { useLanguage } from "../context/language";
import { InitiativeForm } from "../helpers/admin-initiatives";
import { MiniBadge, TypeBadge, SourceBadge } from "./elements/AdminInitiatives";
import { PreviewLanguage } from "../admin-initiatives/page";

const translations = {
  en: {
    livePreview: "Live Preview",
    livePreviewDescription: "Preview how the initiative card will feel.",
    featured: "Featured",
    initiativeImageAlt: "Initiative preview",
    initiativeTitlePreview: "Initiative title preview",
    initiativeDescriptionPreview:
      "Your initiative description will appear here so you can preview grants, info, events, and other community content.",
    tbd: "TBD",
    suggestedDonation: "Suggested Donation:",
    moreInformation: "More Information",
    locale: "en-US",
  },
  es: {
    livePreview: "Vista Previa",
    livePreviewDescription:
      "Visualiza cómo se verá la tarjeta de la iniciativa.",
    featured: "Destacado",
    initiativeImageAlt: "Vista previa de la iniciativa",
    initiativeTitlePreview: "Vista previa del título de la iniciativa",
    initiativeDescriptionPreview:
      "La descripción de tu iniciativa aparecerá aquí para que puedas previsualizar subvenciones, información, eventos y otros contenidos comunitarios.",
    tbd: "Por determinar",
    suggestedDonation: "Donativo Sugerido:",
    moreInformation: "Más Información",
    locale: "es-PR",
  },
};

const InitiativePreview = ({
  form,
  previewLanguage,
  setPreviewLanguage,
  previewData,
}: {
  form: InitiativeForm;
  previewLanguage: string;
  setPreviewLanguage: (lang: PreviewLanguage) => void;
  previewData: {
    title: string | null;
    description: string | null;
    image_url: string | null;
    location: string | null;
    time_label: string | null;
    price_label: number | null;
    cta_label: string | null;
  };
}) => {
  const { language } = useLanguage(); // es or en

  const activeLanguage =
    previewLanguage === "es" || previewLanguage === "en"
      ? previewLanguage
      : language === "es"
      ? "es"
      : "en";

  const t = translations[activeLanguage];

  const formattedDate = useMemo(() => {
    if (!previewData.time_label) return "";

    try {
      const [datePart, timePart] = previewData.time_label.split(" • ");
      if (!datePart || !timePart) return previewData.time_label;

      const date = new Date(`${datePart}T${timePart}`);
      if (Number.isNaN(date.getTime())) return previewData.time_label;

      return new Intl.DateTimeFormat(t.locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    } catch {
      return previewData.time_label;
    }
  }, [previewData.time_label, t.locale]);

  return (
    <div className="space-y-6">
      <div
        className="overflow-hidden rounded-[1.75rem] bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl
      border border-solid border-slate-300"
      >
        <div className="border-b border-slate-300 bg-slate-50/70 px-6 md:px-6 py-5">
          <div className="flex-col md:flex-row flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0d4db0] px-2">
                <Eye className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {t.livePreview}
                </h2>
                <p className="text-sm text-slate-500">
                  {t.livePreviewDescription}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setPreviewLanguage("en")}
                className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition ${
                  previewLanguage === "en"
                    ? "bg-[#0d4db0] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => setPreviewLanguage("es")}
                className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition ${
                  previewLanguage === "es"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="relative rounded-4xl bg-linear-to-r from-[#0d4db0]/40 via-sky-400/30 to-indigo-400/40 p-px shadow-[0_28px_80px_rgba(13,77,176,0.18)]">
            <div className="relative overflow-hidden rounded-4xl bg-white p-5 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,77,176,0.08),transparent_32%)]" />

              <div className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.20)]">
                  {previewData.image_url ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={previewData.image_url}
                        alt={previewData.title || t.initiativeImageAlt}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: `center ${
                            form.image_position_y ?? 50
                          }%`,
                        }}
                        unoptimized={previewData.image_url.startsWith("blob:")}
                      />
                    </motion.div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <ImageIcon className="h-9 w-9" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute inset-0 rounded-3xl border border-white/20" />
                </div>

                <div className="mt-5 flex flex-wrap gap-2 capitalize">
                  <TypeBadge type={form.type} />
                  <SourceBadge source={form.source_type} />
                  {form.is_featured && <MiniBadge label={t.featured} />}
                  <MiniBadge label={previewLanguage.toUpperCase()} />
                </div>

                <h3 className="mt-5 text-2xl font-semibold leading-tight text-[#0d4db0] md:text-3xl">
                  {previewData.title || t.initiativeTitlePreview}
                </h3>

                <div
                  className="prose prose-sm mt-4 max-w-none leading-relaxed text-slate-600"
                  dangerouslySetInnerHTML={{
                    __html:
                      previewData.description || t.initiativeDescriptionPreview,
                  }}
                />

                <div className="mt-6 grid grid-cols-1 gap-3 text-sm">
                  {previewData?.location && (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      <MapPin className="h-4 w-4 shrink-0 text-[#0d4db0]" />
                      <span>{previewData.location || t.tbd}</span>
                    </div>
                  )}

                  {previewData.time_label && (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      <CalendarDays className="h-4 w-4 shrink-0 text-[#0d4db0]" />
                      <span>{formattedDate}</span>
                    </div>
                  )}

                  {previewData.price_label && previewData.price_label != 0 ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      <Gift className="h-4 w-4 shrink-0 text-[#0d4db0]" />
                      <span>
                        <span className="">{t.suggestedDonation}</span> $
                        {previewData.price_label}
                      </span>
                    </div>
                  ) : null}
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative mt-6 inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#0d4db0] bg-white px-6 py-3 font-semibold text-[#0d4db0] shadow-lg transition hover:text-white"
                >
                  <span className="relative z-10 flex items-center gap-2 transition duration-500">
                    <Link2 className="h-4 w-4" />
                    {previewData.cta_label || t.moreInformation}
                  </span>

                  <span className="absolute inset-0 bg-linear-to-r from-[#0d4db0] to-sky-400 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-0 z-20 flex items-center justify-center gap-2 text-white opacity-0 transition duration-500 group-hover:opacity-100">
                    <Link2 className="h-4 w-4" />
                    {previewData.cta_label || t.moreInformation}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativePreview;
