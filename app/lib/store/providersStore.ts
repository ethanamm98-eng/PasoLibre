export type Category = {
    id: string;
    title: {
      en: string;
      es: string;
    };
  };
  
  export type ProviderStatus = "approved" | "pending";
  
  export type Provider = {
    id: string;
    name: string;
    specialty: {
      en: string;
      es: string;
    };
    location: string;
    categoryId: string;
    status: ProviderStatus;
  };
  
  /* ---------------- INITIAL DATA ---------------- */
  
  export const initialCategories: Category[] = [
    {
      id: "general",
      title: {
        en: "General Medicine",
        es: "Medicina General",
      },
    },
    {
      id: "mental",
      title: {
        en: "Mental Health",
        es: "Salud Mental",
      },
    },
  ];
  
  export const initialProviders: Provider[] = [
    {
      id: crypto.randomUUID(),
      name: "Dra. María González",
      specialty: {
        en: "Family Medicine",
        es: "Medicina Familiar",
      },
      location: "San Juan, PR",
      categoryId: "general",
      status: "approved",
    },
  ];