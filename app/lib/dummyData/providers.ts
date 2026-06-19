/* ---------------- Dummy Categories ---------------- */
export const dummyCategories = [
    {
      id: "cat1",
      title: { en: "General Medicine", es: "Medicina General" },
    },
    {
      id: "cat2",
      title: { en: "Dermatology", es: "Dermatología" },
    },
    {
      id: "cat3",
      title: { en: "Gynecology & Reproductive Health", es: "Ginecología y Salud Reproductiva" },
    },
    {
      id: "cat4",
      title: { en: "Mental Health", es: "Salud Mental" },
    },
    {
      id: "cat5",
      title: { en: "Top Surgery", es: "Cirugía Afirmativa de Género" },
    },
  ];
  
  /* ---------------- Dummy Providers ---------------- */
  export const dummyProviders = [
    // Approved
    {
      id: "prov1",
      name: "Dra. María González, MD",
      specialty: { en: "Family Medicine", es: "Medicina Familiar" },
      location: "San Juan, PR",
      categoryId: "cat1",
      status: "approved",
    },
    {
      id: "prov2",
      name: "Dr. Carlos Rivera, MD",
      specialty: { en: "Internal Medicine", es: "Medicina Interna" },
      location: "Bayamón, PR",
      categoryId: "cat1",
      status: "approved",
    },
    {
      id: "prov3",
      name: "Dra. Ana López, MD",
      specialty: { en: "Clinical Dermatology", es: "Dermatología Clínica" },
      location: "Guaynabo, PR",
      categoryId: "cat2",
      status: "approved",
    },
  
    // Pending
    {
      id: "prov4",
      name: "Dr. Laura Méndez, MD",
      specialty: { en: "Obstetrics & Gynecology", es: "Obstetricia y Ginecología" },
      location: "San Juan, PR",
      categoryId: "cat3",
      status: "pending",
    },
    {
      id: "prov5",
      name: "Dr. José Martínez, PsyD",
      specialty: { en: "Clinical Psychology", es: "Psicología Clínica" },
      location: "Caguas, PR",
      categoryId: "cat4",
      status: "pending",
    },
    {
      id: "prov6",
      name: "Dr. Ricardo Morales, MD",
      specialty: { en: "Reconstructive Plastic Surgery – Top Surgery", es: "Cirugía Plástica Reconstructiva – Top Surgery" },
      location: "San Juan, PR",
      categoryId: "cat5",
      status: "pending",
    },
  ];