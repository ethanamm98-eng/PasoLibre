"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/language";
import { privacyPolicyTranslations } from "../lib/translations/privacy-policy";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    className="space-y-5"
  >
    {React.Children.map(children, (child, i) => (
      <motion.div key={i} variants={item as Variants}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const t = privacyPolicyTranslations[language];

  return (
    <section className="bg-white text-gray-800 py-24 px-6">
      <div className="max-w-4xl mx-auto leading-relaxed space-y-16">
        {/* Title */}
        <Section>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#0d4db0]">
            {t.privacyTitle}
          </h1>
          <p>{t.privacyIntro}</p>
        </Section>

        {/* Información que recopilamos */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.collectedInfoTitle}
          </h2>
          <p>{t.collectedInfoIntro}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.collectedInfoList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{t.collectedInfoNote}</p>
        </Section>

        {/* Cómo utilizamos la información */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.useInfoTitle}
          </h2>
          <p>{t.useInfoIntro}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.useInfoList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>{t.useInfoNote}</p>
        </Section>

        {/* Uso de fotos y videos */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.mediaUsageTitle}
          </h2>
          {t.mediaUsageParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>

        {/* Cookies */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.cookiesTitle}
          </h2>
          <p>{t.cookiesText}</p>
        </Section>

        {/* Enlaces externos */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.externalLinksTitle}
          </h2>
          <p>{t.externalLinksText}</p>
        </Section>

        {/* Protección */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.protectionTitle}
          </h2>
          <p>{t.protectionText}</p>
        </Section>

        {/* Cambios */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.changesTitle}
          </h2>
          <p>{t.changesText}</p>
        </Section>

        {/* Contacto */}
        <Section>
          <h2 className="text-2xl font-semibold text-[#0d4db0]">
            {t.contactTitle}
          </h2>
          <p>{t.contactText}</p>
          <p className="font-medium">{t.contactEmail}</p>
        </Section>

        {/* Términos de Servicio */}
        <Section>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#0d4db0]">
            {t.tosTitle}
          </h1>
          <p>{t.tosIntro}</p>
        </Section>

        {t.tosSections.map((section, i) => (
          <Section key={i}>
            <h2 className="text-2xl font-semibold text-[#0d4db0]">
              {section.title}
            </h2>
            <p>{section.text}</p>
          </Section>
        ))}
      </div>
    </section>
  );
}
