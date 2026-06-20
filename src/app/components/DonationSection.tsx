"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHeartHandshake, LuSparkles, LuQrCode, LuX } from "react-icons/lu";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

import { useLanguage } from "../context/language";
import { homeTranslations } from "../lib/translations/home";
import { supabase } from "../lib/supabase/supabaseClient";

type PaymentKey =
  | "ath_movil_link"
  | "paypal_link"
  | "venmo_link"
  | "cashapp_link"
  | "zelle_link";

type DonationCampaign = {
  id: string;
  is_active: boolean;
  sort_order: number;
  image_url: string | null;
  image_position_y: number | null;
  title_en: string;
  description_en: string;
  title_es: string;
  description_es: string;
  ath_movil_link: string | null;
  paypal_link: string | null;
  venmo_link: string | null;
  cashapp_link: string | null;
  zelle_link: string | null;
  created_at?: string;
};

type PaymentOption = {
  key: PaymentKey;
  label: string;
  icon: string;
  url: string;
};

const paymentMethods: {
  key: PaymentKey;
  label: string;
  icon: string;
}[] = [
  { key: "ath_movil_link", label: "ATH Móvil", icon: "/icons/ath-movil.svg" },
  { key: "paypal_link", label: "PayPal", icon: "/icons/paypal.svg" },
  { key: "venmo_link", label: "Venmo", icon: "/icons/venmo.svg" },
  { key: "cashapp_link", label: "Cash App", icon: "/icons/cashapp.svg" },
  { key: "zelle_link", label: "Zelle", icon: "/icons/zelle.svg" },
];

export default function AboutCommunitySupportSection() {
  const { language } = useLanguage();
  const t = homeTranslations[language].aboutCommunitySupport;

  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption | null>(
    null
  );

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("donation_campaigns")
          .select(
            `
              id,
              is_active,
              sort_order,
              image_url,
              image_position_y,
              title_en,
              description_en,
              title_es,
              description_es,
              ath_movil_link,
              paypal_link,
              venmo_link,
              cashapp_link,
              zelle_link,
              created_at
            `
          )
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;

        setCampaigns((data || []) as DonationCampaign[]);
      } catch (error) {
        console.error("Failed to load donation campaigns:", error);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const getPaymentLinks = (campaign: DonationCampaign) => {
    return paymentMethods
      .map((method) => ({
        ...method,
        url: String(campaign[method.key] || "").trim(),
      }))
      .filter((method) => method.url);
  };

  const campaignGridClasses =
    campaigns.length === 1
      ? "grid gap-8 md:grid-cols-1"
      : campaigns.length === 2
      ? "grid gap-8 md:grid-cols-2"
      : "grid gap-8 md:grid-cols-3";

  const campaignGridWrapperClasses =
    campaigns.length === 1
      ? "mx-auto max-w-2xl"
      : campaigns.length === 2
      ? "mx-auto max-w-5xl"
      : "max-w-none";

  if (loading) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-32">
        <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-pink-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-150 w-150 rounded-full bg-sky-100 opacity-50 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center will-change-transform"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-100 to-sky-100 px-4 py-2 text-sm font-medium text-[#0d4db0]">
              <LuSparkles />
              {t.badge}
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#0d4db0] md:text-6xl">
              {t.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-600">
              {t.description}
            </p>
          </motion.div>

          {campaigns.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl"
            >
              <div className="rounded-[1.75rem] border border-[#0d4db0]/10 bg-linear-to-r from-pink-50 via-white to-sky-50 px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0d4db0]">
                      {language === "es"
                        ? "Seguimos apoyando a nuestra comunidad"
                        : "We still support our community"}
                    </p>
                    <p className="mt-1 text-xs font-light text-slate-500">
                      {language === "es"
                        ? "No hay campañas activas en este momento. Escríbenos para apoyo o para contribuir."
                        : "There are no active campaigns right now. Reach out to us for support or ways to contribute."}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0d4db0] shadow-sm">
                    <LuHeartHandshake />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className={campaignGridWrapperClasses}>
              <div className={campaignGridClasses}>
                {campaigns.map((campaign) => {
                  const localizedTitle =
                    language === "es" ? campaign.title_es : campaign.title_en;
                  const localizedDescription =
                    language === "es"
                      ? campaign.description_es
                      : campaign.description_en;

                  const paymentLinks = getPaymentLinks(campaign);
                  const imagePositionY = campaign.image_position_y ?? 50;

                  return (
                    <motion.article
                      key={campaign.id}
                      whileHover={{ y: -8 }}
                      className="group relative rounded-3xl border border-[#0d4db0]/10 bg-linear-to-br from-white via-pink-50/40 to-sky-50/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] md:p-8 lg:p-10"
                    >
                      <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm">
                        <div className="relative h-60 w-full">
                          {campaign.image_url ? (
                            <Image
                              src={campaign.image_url}
                              alt={
                                localizedTitle || "Community support campaign"
                              }
                              fill
                              className="object-cover transition-all duration-500"
                              style={{
                                objectPosition: `center ${imagePositionY}%`,
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-pink-50 to-sky-50 text-[#0d4db0]">
                              <LuHeartHandshake className="text-3xl" />
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#0d4db0] shadow-lg backdrop-blur-md">
                          <LuHeartHandshake />
                        </div>
                      </div>

                      <h3 className="mb-4 text-xl font-semibold text-[#0d4db0]">
                        {localizedTitle}
                      </h3>

                      <div
                        className="prose prose-sm mb-7 max-w-none font-light leading-relaxed text-slate-600"
                        dangerouslySetInnerHTML={{
                          __html: localizedDescription || "",
                        }}
                      />

                      {paymentLinks.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            <LuQrCode />
                            {language === "es"
                              ? "Opciones para donar"
                              : "Donation options"}
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            {paymentLinks.map((method) => (
                              <button
                                key={method.key}
                                type="button"
                                onClick={() => setSelectedPayment(method)}
                                className="group/link flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0d4db0]/20 hover:shadow-md"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <Image
                                      src={method.icon}
                                      alt={method.label}
                                      width={24}
                                      height={24}
                                      className="h-6 w-6 object-contain"
                                    />
                                  </span>

                                  <span className="text-sm font-semibold text-slate-800">
                                    {method.label}
                                  </span>
                                </div>

                                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-[#0d4db0] transition group-hover/link:translate-x-0.5">
                                  <LuQrCode />
                                  {language === "es" ? "Ver QR" : "View QR"}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-400">
                          {language === "es"
                            ? "Pronto compartiremos opciones para donar."
                            : "Donation options will be shared soon."}
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition duration-500 group-hover:border-[#0d4db0]/20" />
                    </motion.article>
                  );
                })}
              </div>
            </div>
          )}

          <p className="mx-auto mt-14 max-w-2xl text-center text-xs font-light text-slate-500">
            {t.disclaimer}
          </p>
        </div>
      </section>

      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setSelectedPayment(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-4xl border border-white/70 bg-white shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-pink-400 via-sky-400 to-[#0d4db0]" />

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              >
                <LuX />
              </button>

              <div className="px-7 pb-7 pt-9 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src={selectedPayment.icon}
                    alt={selectedPayment.label}
                    width={38}
                    height={38}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-[#0d4db0]">
                  {selectedPayment.label}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  {selectedPayment.label === "ATH Móvil"
                    ? language === "es"
                      ? "Entra a la aplicación de ATH Móvil y escanea el código QR para donar."
                      : "Open the ATH Móvil mobile app and scan the QR code to donate."
                    : language === "es"
                    ? "Escanea el código QR o abre el enlace para donar."
                    : "Scan the QR code or open the link to donate."}
                </p>

                {selectedPayment.label === "ATH Móvil" ? (
                  <div>
                    <Image
                      src={selectedPayment.url}
                      alt="ATH Móvil QR Code"
                      width={190}
                      height={190}
                      className="mx-auto mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-inner"
                    />
                  </div>
                ) : (
                  <div className="mx-auto mt-6 inline-flex rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
                    <QRCodeSVG
                      value={selectedPayment.url}
                      size={190}
                      includeMargin
                    />
                  </div>
                )}

                {selectedPayment.label !== "ATH Móvil" && (
                  <a
                    href={selectedPayment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-[#0d4db0] to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]"
                  >
                    {language === "es" ? "Abrir enlace" : "Open donation link"}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
