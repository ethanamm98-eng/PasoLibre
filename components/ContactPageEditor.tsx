"use client";
import { useState } from "react";
import { contactTranslations } from "../lib/translations/contact";

interface Props {
  draft: typeof contactTranslations;
  setDraft: (data: typeof contactTranslations) => void;
}

export default function ContactPageEditor({ draft, setDraft }: Props) {
  const [activeLang, setActiveLang] = useState<"en" | "es">("en");

  const updateField = (
    key: keyof (typeof contactTranslations)["en"],
    value: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated: any = { ...draft };
    updated[activeLang][key] = value;
    setDraft(updated);
  };

  const content = draft[activeLang];

  return (
    <div className="space-y-8">
      {/* Language Toggle */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveLang("en")}
          className={`px-4 py-2 rounded-lg ${
            activeLang === "en" ? "bg-blue-600" : "bg-neutral-800"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setActiveLang("es")}
          className={`px-4 py-2 rounded-lg ${
            activeLang === "es" ? "bg-blue-600" : "bg-neutral-800"
          }`}
        >
          Español
        </button>
      </div>

      {/* Contact Page Fields */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
          Contact Page
        </h2>

        <input
          type="text"
          value={content.getInTouch}
          onChange={(e) => updateField("getInTouch", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Get in Touch Text"
        />

        <input
          type="text"
          value={content.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="First Name Label"
        />

        <input
          type="text"
          value={content.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Last Name Label"
        />

        <input
          type="text"
          value={content.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Phone Label"
        />

        <input
          type="text"
          value={content.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Email Label"
        />

        <textarea
          value={content.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg h-24"
          placeholder="Message Label"
        />

        <input
          type="text"
          value={content.send}
          onChange={(e) => updateField("send", e.target.value)}
          className="w-full bg-neutral-900 p-3 rounded-lg"
          placeholder="Send Button Text"
        />
      </section>
    </div>
  );
}
