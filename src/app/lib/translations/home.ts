export type Language = "en" | "es";

export const homeTranslations = {
  es: {
    hero: {
      backgroundMedia: {
        type: "video",
        src: "/videos/hero.mp4",
      },
      headline: "construyendo nuestro bienestar JUNTXS.",
      boldHeadline: "JUNTXS",
      cta: {
        main: "¡Regístrate",
        connector: "con",
        ending: "nosotrxs!",
      },
    },

    about: {
      ghostTitle: "COMUNIDAD",
      title: "quiénes somos",
      intro:
        "Somos un colectivo LGBTQ+ en Puerto Rico enfocado en el bienestar.",
      description:
        "Pasolibre construye comunidad e impulsa el bienestar de las personas LGBTQ+ en Puerto Rico a través de recursos y programas que apoyan su bienestar físico, mental, profesional y educativo.",
      descriptionBoldBlue: "bienestar físico, mental, profesional y educativo.",
      descriptionBoldSkyBlue: [
        "LGBTQ+",
        "bienestar físico, mental, profesional y educativo.",
      ],
      trajectoryTitle: "nuestrx trayectoria",
      stats: {
        impactedLives: { title: "Vidas impactadas", number: 120 },
        memoriesCreated: { title: "Eventos gestados", number: 40 },
        started: { title: "Iniciado", number: 2025 },
      },
      button: "Conoce más",
    },

    features: {
      ghostTitle: "FUNCIONES",
      title: "Todo en un solo lugar",
      description:
        "Descubre cómo Paso Libre hace fácil mantenerte conectadx, asistir a eventos y seguir tu recorrido.",

      items: [
        {
          title: "CALENDARIO DE EVENTOS",
          description:
            "Explora todos los eventos de Paso Libre en un calendario elegante. Mantente al día, planifica con intención y no te pierdas ningún momento importante.",
        },
        {
          title: "CONFIRMACIÓN EN UN CLIC",
          description:
            "Confirma tu asistencia al instante con un solo clic. Sin fricción, sin complicaciones — solo llega y sé parte de la experiencia.",
        },
        {
          title: "TU PERFIL",
          description:
            "Accede a tu perfil personal y revisita cada evento al que has asistido. Tu recorrido, tu historia, todo en un solo lugar.",
        },
      ],

      cta: "Crea tu cuenta",
    },

    whatWeDo: {
      ghostTitle: "HACEMOS",
      title: "qué hacemos",
      intro:
        "Nos movemos juntxs. Creamos comunidad a través del movimiento, aprendizaje y encuentros comunitarios.",

      activities: [
        {
          title: "Running & Walking Club",
          description:
            "En el Running & Walking Club nos reunimos para caminar, 'joguear' o correr a nuestro propio paso. Es un momento para hacer eiercicio y conectar con la comunidad LGBTQ+.",
          image: {
            src: "/group/group-picture-rw.JPG",
            alt: "Running & Walking Club",
          },
        },
        {
          title: "Clases de Movimiento",
          description:
            "Ofrecemos clases de movimiento para todos los niveles, como yoga, circuitos de fitness, baile y kickboxing, entre otras.",
          image: {
            src: "/group/group-picture-2.webp",
            alt: "Clases de Movimiento",
          },
        },
        {
          title: "Comunidad & Educación",
          description:
            "Creamos espacios y actividades para conocernos mejor, fortalecer lazos dentro de la comunidad y aprender juntxs mediante talleres, picnics y encuentros divertidos.",
          image: {
            src: "/group/group-picture-picnic-2.JPG",
            alt: "Comunidad & Educación",
          },
        },
      ],

      button: "únete a nosotrxs",
    },

    // Donations
    aboutCommunitySupport: {
      badge: "Apoyo comunitario directo",
      title: "Apoya a nuestra comunidad",
      description:
        "Estas iniciativas apoyan directamente a personas trans y BIPOC, facilitando el acceso a recursos esenciales y promoviendo su bienestar.",
      campaigns: [
        // {
        //   picture: "/campaigns/campaign-1.webp",
        //   title: "Fondo para cirugía de afirmación de género",
        //   description:
        //     "Apoya a una persona trans afrocaribeña en su proceso de acceso a atención médica de afirmación de género y recuperación segura.",
        //   cta: "Contribuir ahora",
        // },
      ],
      disclaimer:
        "Paso Libre no administra, controla ni gestiona directamente estas campañas. Las donaciones se realizan y procesan a través de plataformas externas, bajo los términos y condiciones de dichas plataformas.",
    },

    cta: {
      title: "ayúdanos a seguir creciendo",
      links: {
        volunteer: "voluntariado",
        collaborations: "colaboraciones",
        donations: "donaciones",
      },
    },
  },

  en: {
    hero: {
      backgroundMedia: {
        type: "video",
        src: "/videos/hero.mp4",
      },
      headline: "building our wellbeing TOGETHER.",
      boldHeadline: "TOGETHER",
      cta: {
        main: "Sign up",
        connector: "with",
        ending: "us!",
      },
    },

    about: {
      ghostTitle: "COMMUNITY",
      title: "who we are",
      intro:
        "We are an LGBTQ+ collective in Puerto Rico focused on well-being.",
      description:
        "Pasolibre builds community and promotes the well-being of LGBTQ+ people in Puerto Rico through resources and programs that support their physical, mental, professional, and educational well-being.",
      descriptionBoldBlue:
        "physical, mental, professional, and educational wellness.",
      descriptionBoldSkyBlue: [
        "LGBTQ+",
        "physical, mental, professional, and educational wellness.",
      ],
      trajectoryTitle: "our journey",
      stats: {
        impactedLives: { title: "Lives impacted", number: 120 },
        memoriesCreated: { title: "Organized events", number: 40 },
        started: { title: "Founded", number: 2025 },
      },
      button: "Learn more",
    },

    features: {
      ghostTitle: "FEATURES",
      title: "Everything in One Place",
      description:
        "Discover how Paso Libre makes it effortless to stay connected, attend events, and track your journey.",

      items: [
        {
          title: "EVENT CALENDAR",
          description:
            "Explore all Paso Libre events in one elegant calendar. Stay updated, plan ahead, and never miss a meaningful moment.",
        },
        {
          title: "ONE-CLICK ATTENDANCE",
          description:
            "Confirm your attendance instantly with a single click. No friction, no hassle — just show up and be part of the experience.",
        },
        {
          title: "YOUR PROFILE",
          description:
            "Access your personal profile and revisit every event you've attended. Your journey, your story, all in one place.",
        },
      ],

      cta: "Create Your Account",
    },

    whatWeDo: {
      ghostTitle: "WE DO",
      title: "what we do",
      intro:
        "We move together. We build community through movement, learning, and community gatherings.",

      activities: [
        {
          title: "Running & Walking Club",
          description:
            "In the Running & Walking Club, we come together to walk, jog, or run at our own pace. It is a time to exercise and connect with the LGBTQ+ community.",
          image: {
            src: "/group/group-picture-rw.JPG",
            alt: "Running & Walking Club",
          },
        },
        {
          title: "Movement Classes",
          description:
            "We offer movement classes for all levels, such as yoga, fitness circuits, dance, and kickboxing, among others.",
          image: {
            src: "/group/group-picture-2.webp",
            alt: "Fitness & Movement",
          },
        },
        {
          title: "Community & Education",
          description:
            "We create spaces and activities to get to know each other better, strengthen community bonds, and learn together through workshops, picnics, and fun gatherings.",
          image: {
            src: "/group/group-picture-picnic-2.JPG",
            alt: "Community & Education",
          },
        },
      ],

      button: "join us",
    },

    // Donations
    aboutCommunitySupport: {
      badge: "Direct Community Support",
      title: "Support Our Community",
      description:
        "These initiatives directly support trans and BIPOC individuals by facilitating access to essential resources and promoting their well-being.",
      campaigns: [
        // {
        //   title: "Gender-Affirming Surgery Fund",
        //   description:
        //     "Support an Afro-Caribbean trans person in their access to gender-affirming healthcare and safe recovery.",
        //   cta: "Contribute Now",
        // },
      ],
      disclaimer:
        "Paso Libre does not directly administer, control, or manage these campaigns. Donations are made and processed through external platforms, subject to the terms and conditions of those platforms.",
    },

    cta: {
      title: "help us keep continue to grow",
      links: {
        volunteer: "volunteering",
        collaborations: "collaborations",
        donations: "donations",
      },
    },
  },
};
