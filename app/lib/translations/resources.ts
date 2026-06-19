export const resourcesTranslations = {
  en: {
    /* ---------------- NAVIGATION ---------------- */
    nav: {
      professionals: "Professionals",
      clinics: "Affirming Clinics",
      nameChange: "Name Change",
      community: "Community",
    },

    /* Added (new structure compatible) */
    navigation: {
      professionals: "Professionals",
      clinics: "Affirming Clinics",
      nameChange: "Name Change",
      community: "Community",
    },

    /* ---------------- HERO ---------------- */
    hero: {
      badge: "Safe Medical Spaces",
      title: "Health Resources in Puerto Rico",
      description:
        "Paso Libre promotes the well-being of LGBTQ+ individuals in Puerto Rico by connecting our community with safe medical spaces, informed professionals, and services that support physical, mental, and reproductive health.",
      disclaimer:
        "The information provided on this page was collected and suggested by members of the community. Our goal is to highlight resources recommended by queer individuals with lived experience.",
    },

    /* ---------------- SEARCH / FILTERS ---------------- */
    search: {
      providerPlaceholder: "Search by name, specialty, or city...",
      clinicPlaceholder: "Search clinic or service...",
      all: "All",
    },

    filters: {
      all: "All",
      searchPlaceholder: "Search by name, specialty or city...",
      anonymous: "Anonymous",
    },

    /* ---------------- SECTIONS ---------------- */
    sections: {
      providers: "Medical Professionals",
      clinics: "Gender-Affirming Clinics",
      nameGuide: "Name & Gender Marker Guide",
      intention: "Our Intention",
    },

    /* ---------------- PROVIDERS ---------------- */
    providers: {
      publicInfo: "Search public information",
      topSurgery: "Gender-Affirming Surgery (Top Surgery)",
      topSurgerySpecialty: "Reconstructive Plastic Surgery – Top Surgery",
    },

    /* ---------------- CATEGORIES (NEW) ---------------- */
    categories: {
      generalMedicine: "General Medicine",
      dermatology: "Dermatology",
      gynecology: "Gynecology & Reproductive Health",
      mentalHealth: "Mental Health",
    },

    /* ---------------- COMMUNITY NOTE ---------------- */
    communityNote:
      "This page is designed to help the LGBTQ+ community in Puerto Rico identify medical spaces where they can receive care with respect, dignity, and cultural sensitivity. We believe equitable access to health is fundamental to overall well-being.",

    /* Extended version (optional usage) */
    communityNoteExtended: {
      title: "Our Intention",
      description:
        "This page is designed to help the LGBTQ+ community in Puerto Rico identify medical spaces where they can receive care with respect, dignity, and cultural sensitivity. We believe equitable access to healthcare is fundamental to overall well-being.",
    },

    /* ---------------- DISCLAIMER / LEGAL ---------------- */
    disclaimer: {
      p1: "The professionals listed on this page are independent providers. Paso Libre does not manage, supervise, or formally affiliate with these professionals or their practices.",
      p2: "The information presented is for informational purposes only and does not constitute medical advice, diagnosis, or clinical guidance. Always consult directly with a licensed healthcare professional.",
      p3: "If you are a listed professional and wish to update or remove your information, please contact us to make the appropriate modification.",
    },

    legal: {
      p1: "The professionals listed on this page are independent providers. Paso Libre does not administer, supervise, or formally affiliate with these professionals or their practices.",
      p2: "The information presented is for informational purposes only and does not constitute medical advice, diagnosis, or clinical counseling. Always consult directly with a licensed healthcare professional.",
      p3: "If you are a listed professional and would like to update or remove your information, please contact us to make the appropriate changes.",
    },

    /* ---------------- DEFAULT COMMENTS (NEW) ---------------- */
    defaultComments: [
      {
        name: "Alex R.",
        message:
          "Clínica Transalud provided respectful guidance during my hormone process. The staff was very professional and affirming.",
      },
      {
        name: "María L.",
        message:
          "Centro Ararat in Ponce offers excellent psychosocial support for LGBTQ+ youth. Highly recommended.",
      },
      {
        name: "Javier T.",
        message:
          "Thank you for including resources in Mayagüez. CARIB has been a safe space for our community.",
      },
    ],
    /* ---------------- GENDER-AFFIRMING CLINICS ---------------- */
    genderAffirmingClinics: {
      sectionTitle: "Gender-Affirming Clinics",
      searchPlaceholder: "Search clinic or service...",
      allMunicipalities: "All",
      visitWebsite: "Visit Website",
      searchGoogle: "Search on Google",
    },
    /* ---------------- NAME CHANGE GUIDE ---------------- */
    nameChangeGuide: {
      title: "Name & Gender Marker Change Guide in Puerto Rico",

      steps: [
        {
          icon: "LuFolderCheck",
          text: `
          Gather all required documents:
          <ul class="list-disc ml-5 mt-2">
            <li>Birth certificate</li>
            <li>Social Security card</li>
            <li>Negative criminal record certificate</li>
            <li>ASUME certification</li>
            <li>Hacienda certification</li>
            <li>CRIM certification</li>
            <li>Legal stamps and internal revenue stamps</li>
          </ul>
          `,
        },
        {
          icon: "LuFileText",
          text: `
          File a petition at the 
          <a href="https://www.ramajudicial.pr" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            Court of First Instance
          </a> 
          or through a public notary (non-contentious process).
          `,
        },
        {
          icon: "LuClipboardCheck",
          text: `
          Submit required evidence, including identification and sworn statements.
          A copy must also be provided to the Public Prosecutor for review.
          `,
        },
        {
          icon: "LuScale",
          text: `
          If no objection is filed within 10 days, the judge will issue a resolution approving the name change.
          `,
        },
        {
          icon: "LuSignature",
          text: `
          Once approved, take the court resolution to the Demographic Registry to update your birth certificate.
          `,
        },
        {
          icon: "LuGlobe",
          text: `
          Update federal documents such as 
          <a href="https://www.ssa.gov/espanol/" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            Social Security
          </a> 
          and 
          <a href="https://travel.state.gov/content/travel/es.html" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            passport
          </a>.
          `,
        },
        {
          icon: "LuCar",
          text: `
          Update your driver's license at 
          <a href="https://www.dtop.pr.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            CESCO
          </a>.
          `,
        },
        {
          icon: "LuHeartPulse",
          text: `
          For gender marker changes, obtain a gender dysphoria diagnosis from an affirming healthcare provider.
          `,
        },
      ],

      legalInfo: `
      Name changes in Puerto Rico are processed through a petition filed with the Court of First Instance or a public notary under Law No. 24-1931 or Law No. 282-1999. 
      The process requires official documents such as birth certificate, criminal record, and certifications from ASUME, CRIM, and Hacienda. 
      If the Public Prosecutor does not object within 10 days, the judge issues a resolution.
      `,

      resources: [
        {
          label: "Judicial Branch Guide",
          link: "https://poderjudicial.pr/Documentos/Educo/Cambio-Nombre-proceso.pdf",
        },
        {
          label: "CDC Puerto Rico Guide",
          link: "https://cdc.pr.gov/InstitutoDeEducacion/RecursosEducativos/Opusculos_Recientes/CDC-Cambio%20de%20nombre.pdf",
        },
      ],

      disclaimer:
        "This guide is for informational purposes and does not replace professional legal advice.",
    },
    /* ---------------- COMMUNITY COMMENTS ---------------- */
    communityComments: {
      sectionTitle: "Community Comments",
      description:
        "Want to suggest a professional, ask a question, share an experience, or request removal from a list? Send us a message. All submissions are reviewed before publication.",
      placeholders: {
        name: "Your name (optional)",
        message: "Write your comment...",
      },
      ratingLabel: "(Optional rating)",
      submitButton: "Submit for review and publication",
      pagination: {
        prev: "Previous",
        next: "Next",
      },
      moderationPanel: {
        title: "Moderation Panel",
        approveButton: "Approve",
      },
    },
  },

  /* =================================================================== */
  /* =============================== SPANISH ============================ */
  /* =================================================================== */

  es: {
    nav: {
      professionals: "Profesionales",
      clinics: "Clínicas Afirmativas",
      nameChange: "Cambio de Nombre",
      community: "Comunidad",
    },

    navigation: {
      professionals: "Profesionales",
      clinics: "Clínicas Afirmativas",
      nameChange: "Cambio de Nombre",
      community: "Comunidad",
    },

    hero: {
      badge: "Espacios Médicos Seguros",
      title: "Recursos de Salud en Puerto Rico",
      description:
        "Paso Libre impulsa el bienestar de las personas LGBTQ+ en Puerto Rico conectando a nuestra comunidad con espacios médicos seguros, profesionales informados y servicios que promueven el bienestar físico, mental y reproductivo.",
      disclaimer:
        "La información que se provee en esta página fue recopilada y sugerida por miembros de la comunidad. Nuestro objetivo es visibilizar recursos recomendados por personas (queer) con experiencias reales.",
    },

    search: {
      providerPlaceholder: "Buscar por nombre, especialidad o ciudad...",
      clinicPlaceholder: "Buscar clínica o servicio...",
      all: "Todos",
    },

    filters: {
      all: "Todos",
      searchPlaceholder: "Buscar por nombre, especialidad o ciudad...",
      anonymous: "Anónimo",
    },

    sections: {
      providers: "Profesionales de la Salud",
      clinics: "Clínicas con Atención Afirmativa de Género",
      nameGuide: "Guía de Cambio de Nombre",
      intention: "Nuestra intención",
    },

    providers: {
      publicInfo: "Buscar información pública",
      topSurgery: "Cirugía de Afirmación de Género (Top Surgery)",
      topSurgerySpecialty: "Cirugía Plástica Reconstructiva – Top Surgery",
    },

    categories: {
      generalMedicine: "Medicina General",
      dermatology: "Dermatología",
      gynecology: "Ginecología y Salud Reproductiva",
      mentalHealth: "Salud Mental",
    },

    communityNote:
      "Esta página está diseñada para ayudar a la comunidad LGBTQ+ en Puerto Rico a identificar espacios médicos donde puedan recibir atención con respeto, dignidad y sensibilidad cultural. Creemos en el acceso equitativo a la salud como parte fundamental del bienestar integral.",

    communityNoteExtended: {
      title: "Nuestra intención",
      description:
        "Esta página está diseñada para ayudar a la comunidad LGBTQ+ en Puerto Rico a identificar espacios médicos donde puedan recibir atención con respeto, dignidad y sensibilidad cultural. Creemos en el acceso equitativo a la salud como parte fundamental del bienestar integral.",
    },

    disclaimer: {
      p1: "Los profesionales listados en esta página son proveedores independientes. Paso Libre no administra, supervisa ni está afiliado formalmente con estos profesionales o sus prácticas.",
      p2: "La información presentada es de carácter informativo y no constituye recomendación médica, diagnóstico ni asesoramiento clínico. Siempre consulte directamente con un profesional de la salud licenciado.",
      p3: "Si usted es un profesional listado y desea actualizar o remover su información, puede comunicarse con nosotros para realizar la modificación correspondiente.",
    },

    legal: {
      p1: "Los profesionales listados en esta página son proveedores independientes. Paso Libre no administra, supervisa ni está afiliado formalmente con estos profesionales o sus prácticas.",
      p2: "La información presentada es de carácter informativo y no constituye recomendación médica, diagnóstico ni asesoramiento clínico. Siempre consulte directamente con un profesional de la salud licenciado.",
      p3: "Si usted es un profesional listado y desea actualizar o remover su información, puede comunicarse con nosotros para realizar la modificación correspondiente.",
    },

    defaultComments: [
      {
        name: "Alex R.",
        message:
          "Clínica Transalud me brindó acompañamiento respetuoso durante mi proceso hormonal. El personal fue muy profesional y afirmativo.",
      },
      {
        name: "María L.",
        message:
          "Centro Ararat en Ponce ofrece apoyo psicosocial excelente para jóvenes LGBTQ+. Muy recomendado.",
      },
      {
        name: "Javier T.",
        message:
          "Gracias por incluir recursos en Mayagüez. CARIB ha sido un espacio seguro para nuestra comunidad.",
      },
    ],
    genderAffirmingClinics: {
      sectionTitle: "Clínicas con Atención Afirmativa de Género",
      searchPlaceholder: "Buscar clínica o servicio...",
      allMunicipalities: "Todos",
      visitWebsite: "Visitar sitio web",
      searchGoogle: "Buscar en Google",
    },
    nameChangeGuide: {
      title: "Guía para Cambio de Nombre y Marcador de Género en Puerto Rico",

      steps: [
        {
          icon: "LuFolderCheck",
          text: `
          Recopilar todos los documentos requeridos:
          <ul class="list-disc ml-5 mt-2">
            <li>Acta de nacimiento</li>
            <li>Tarjeta de Seguro Social</li>
            <li>Certificación negativa de antecedentes penales</li>
            <li>Certificación de ASUME</li>
            <li>Certificación de Hacienda</li>
            <li>Certificación de CRIM</li>
            <li>Sellos de asistencia legal y rentas internas</li>
          </ul>
          `,
        },
        {
          icon: "LuFileText",
          text: `
          Presentar una petición en el 
          <a href="https://www.ramajudicial.pr" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            Tribunal de Primera Instancia
          </a> 
          o mediante un notario público (proceso no contencioso).
          `,
        },
        {
          icon: "LuClipboardCheck",
          text: `
          Incluir evidencia requerida, como identificación válida y declaración jurada. 
          También se debe entregar copia al Ministerio Público para evaluación.
          `,
        },
        {
          icon: "LuScale",
          text: `
          Si el Ministerio Público no presenta objeción en un plazo de 10 días, el juez emitirá una resolución aprobando el cambio.
          `,
        },
        {
          icon: "LuSignature",
          text: `
          Una vez aprobada, llevar la resolución al Registro Demográfico para actualizar el acta de nacimiento.
          `,
        },
        {
          icon: "LuGlobe",
          text: `
          Actualizar documentos federales como 
          <a href="https://www.ssa.gov/espanol/" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            Seguro Social
          </a> 
          y 
          <a href="https://travel.state.gov/content/travel/es.html" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            pasaporte
          </a>.
          `,
        },
        {
          icon: "LuCar",
          text: `
          Actualizar la licencia de conducir en 
          <a href="https://www.dtop.pr.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            CESCO
          </a>.
          `,
        },
        {
          icon: "LuHeartPulse",
          text: `
          Para cambiar el marcador de género, obtener diagnóstico de disforia de género de un proveedor de salud afirmativo.
          `,
        },
      ],

      legalInfo: `
      El cambio de nombre en Puerto Rico se gestiona mediante una petición ante el Tribunal de Primera Instancia o ante un notario público, bajo la Ley Núm. 24-1931 o Ley Núm. 282-1999. 
      Requiere presentar documentos como certificado de nacimiento, antecedentes penales y certificaciones de ASUME, CRIM y Hacienda. 
      Si el Ministerio Público no objeta en 10 días, el juez emite una resolución.
      `,

      resources: [
        {
          label: "Guía del Poder Judicial",
          link: "https://poderjudicial.pr/Documentos/Educo/Cambio-Nombre-proceso.pdf",
        },
        {
          label: "Guía CDC Puerto Rico",
          link: "https://cdc.pr.gov/InstitutoDeEducacion/RecursosEducativos/Opusculos_Recientes/CDC-Cambio%20de%20nombre.pdf",
        },
      ],

      disclaimer:
        "Esta guía es informativa y no sustituye asesoramiento legal profesional.",
    },
    communityComments: {
      sectionTitle: "Comentarios Comunitarios",
      description:
        "¿Deseas sugerir un profesional, hacer una pregunta, compartir una experiencia o solicitar la remoción de una lista? Envíanos un mensaje. Todas las solicitudes son revisadas antes de ser publicadas.",
      placeholders: {
        name: "Tu nombre (opcional)",
        message: "Escribe tu comentario...",
      },
      ratingLabel: "(Calificación opcional)",
      submitButton: "Enviar para revisión y publicación",
      pagination: {
        prev: "Anterior",
        next: "Siguiente",
      },
      moderationPanel: {
        title: "Panel de Moderación",
        approveButton: "Aprobar",
      },
    },
  },
};

export type Language = keyof typeof resourcesTranslations;
