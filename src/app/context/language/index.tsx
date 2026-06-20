"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "../../lib/translations";
import { supabase } from "../../lib/supabase/supabaseClient";

type TranslationSchema = typeof translations.en;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: TranslationSchema;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const isValidLanguage = (value: unknown): value is Language => {
  return typeof value === "string" && value in translations;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const loadPreferredLanguage = async () => {
      const stored = localStorage.getItem("lang");

      if (isValidLanguage(stored)) {
        setLanguageState(stored);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) return;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("language_preference")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Failed to load profile language:", error);
        return;
      }

      if (isValidLanguage(profile?.language_preference)) {
        localStorage.setItem("lang", profile.language_preference);
        setLanguageState(profile.language_preference);
      }
    };

    loadPreferredLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    if (!isValidLanguage(lang)) return;

    localStorage.setItem("lang", lang);
    setLanguageState(lang);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) return;

    const { error } = await supabase
      .from("profiles")
      .update({ language_preference: lang })
      .eq("id", user.id);

    if (error) {
      console.error("Failed to update profile language:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};