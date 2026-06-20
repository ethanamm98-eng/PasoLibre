import { navigationTranslations } from "./navigation";
import { homeTranslations } from "./home";
import { aboutTranslations } from "./about";
import { resourcesTranslations } from "./resources";
import { contactTranslations } from "./contact";
import { privacyPolicyTranslations } from "./privacy-policy";
import { footerTranslations } from "./footer";

export const translations = {
  en: {
    navigation: navigationTranslations.en,
    home: homeTranslations.en,
    about: aboutTranslations.en,
    resources: resourcesTranslations.en,
    contact: contactTranslations.en,
    privacy: privacyPolicyTranslations.en,
    footer: footerTranslations.en,
  },
  es: {
    navigation: navigationTranslations.es,
    home: homeTranslations.es,
    about: aboutTranslations.es,
    resources: resourcesTranslations.es,
    contact: contactTranslations.es,
    privacy: privacyPolicyTranslations.es,
    footer: footerTranslations.es,
  },
};

export type Language = keyof typeof translations;
