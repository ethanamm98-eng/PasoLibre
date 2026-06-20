import { resourcesTranslations } from "../translations/resources";
import { Language } from "../translations";
import { Category, Provider } from "../store/providersStore";

export function buildInitialData(language: Language) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = resourcesTranslations[language];

  const categories: Category[] = [
    {
      id: "generalMedicine",
      title: {
        en: resourcesTranslations.en.categories.generalMedicine,
        es: resourcesTranslations.es.categories.generalMedicine,
      },
    },
    {
      id: "dermatology",
      title: {
        en: resourcesTranslations.en.categories.dermatology,
        es: resourcesTranslations.es.categories.dermatology,
      },
    },
    {
      id: "gynecology",
      title: {
        en: resourcesTranslations.en.categories.gynecology,
        es: resourcesTranslations.es.categories.gynecology,
      },
    },
    {
      id: "mentalHealth",
      title: {
        en: resourcesTranslations.en.categories.mentalHealth,
        es: resourcesTranslations.es.categories.mentalHealth,
      },
    },
    {
      id: "topSurgery",
      title: {
        en: resourcesTranslations.en.providers.topSurgery,
        es: resourcesTranslations.es.providers.topSurgery,
      },
    },
  ];

  const providers: Provider[] = [
    {
      id: crypto.randomUUID(),
      name: "Dra. María González, MD",
      specialty: {
        en: "Family Medicine",
        es: "Medicina Familiar",
      },
      location: "San Juan, PR",
      categoryId: "generalMedicine",
      status: "approved",
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Carlos Rivera, MD",
      specialty: {
        en: "Internal Medicine",
        es: "Medicina Interna",
      },
      location: "Bayamón, PR",
      categoryId: "generalMedicine",
      status: "approved",
    },
    {
      id: crypto.randomUUID(),
      name: "Dra. Ana López, MD",
      specialty: {
        en: "Clinical Dermatology",
        es: "Dermatología Clínica",
      },
      location: "Guaynabo, PR",
      categoryId: "dermatology",
      status: "approved",
    },
    {
      id: crypto.randomUUID(),
      name: "Dra. Laura Méndez, MD",
      specialty: {
        en: "Obstetrics & Gynecology",
        es: "Obstetricia y Ginecología",
      },
      location: "San Juan, PR",
      categoryId: "gynecology",
      status: "approved",
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. José Martínez, PsyD",
      specialty: {
        en: "Clinical Psychology",
        es: "Psicología Clínica",
      },
      location: "Caguas, PR",
      categoryId: "mentalHealth",
      status: "approved",
    },
    {
      id: crypto.randomUUID(),
      name: "Dr. Ricardo Morales, MD",
      specialty: {
        en: resourcesTranslations.en.providers.topSurgerySpecialty,
        es: resourcesTranslations.es.providers.topSurgerySpecialty,
      },
      location: "San Juan, PR",
      categoryId: "topSurgery",
      status: "approved",
    },
  ];

  return { categories, providers };
}
