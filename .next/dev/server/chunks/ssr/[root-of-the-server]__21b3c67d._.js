module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/lib/translations/navigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "navigationTranslations",
    ()=>navigationTranslations
]);
const navigationTranslations = {
    en: {
        home: "Home",
        about: "About",
        initiatives: "Initiatives",
        resources: "Resources",
        healthResources: "Health-Care Resources",
        legalResources: "Legal Resources",
        genderResources: "Gender-Affirming Resources",
        contact: "Contact",
        donate: "Donate",
        profile: "Profile",
        dashboard: "Dashboard",
        calendar: "Calendar",
        logout: "Logout",
        signIn: "Sign In",
        followUs: "Follow us",
        signedInAs: "Signed in as",
        loggedIn: "Logged in"
    },
    es: {
        home: "Inicio",
        about: "Sobre Nosotrxs",
        initiatives: "Iniciativas",
        resources: "Recursos",
        healthResources: "Recursos de Salud",
        legalResources: "Recursos Legales",
        genderResources: "Recursos de Afirmación de Género",
        contact: "Contáctanos",
        donate: "Donar",
        profile: "Perfil",
        dashboard: "Panel",
        calendar: "Calendario",
        logout: "Cerrar sesión",
        signIn: "Iniciar sesión",
        followUs: "Síguenos",
        signedInAs: "Conectado como",
        loggedIn: "Conectado"
    }
};
}),
"[project]/app/lib/translations/home.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "homeTranslations",
    ()=>homeTranslations
]);
const homeTranslations = {
    es: {
        hero: {
            backgroundMedia: {
                type: "video",
                src: "/videos/hero.mp4"
            },
            headline: "construyendo nuestro bienestar JUNTXS.",
            boldHeadline: "JUNTXS",
            cta: {
                main: "¡Regístrate",
                connector: "con",
                ending: "nosotrxs!"
            }
        },
        about: {
            ghostTitle: "COMUNIDAD",
            title: "quiénes somos",
            intro: "Somos un colectivo LGBTQ+ en Puerto Rico enfocado en el bienestar.",
            description: "Pasolibre construye comunidad e impulsa el bienestar de las personas LGBTQ+ en Puerto Rico a través de recursos y programas que apoyan su bienestar físico, mental, profesional y educativo.",
            descriptionBoldBlue: "bienestar físico, mental, profesional y educativo.",
            descriptionBoldSkyBlue: [
                "LGBTQ+",
                "bienestar físico, mental, profesional y educativo."
            ],
            trajectoryTitle: "nuestrx trayectoria",
            stats: {
                impactedLives: {
                    title: "Vidas impactadas",
                    number: 120
                },
                memoriesCreated: {
                    title: "Eventos gestados",
                    number: 40
                },
                started: {
                    title: "Iniciado",
                    number: 2025
                }
            },
            button: "Conoce más"
        },
        features: {
            ghostTitle: "FUNCIONES",
            title: "Todo en un solo lugar",
            description: "Descubre cómo Paso Libre hace fácil mantenerte conectadx, asistir a eventos y seguir tu recorrido.",
            items: [
                {
                    title: "CALENDARIO DE EVENTOS",
                    description: "Explora todos los eventos de Paso Libre en un calendario elegante. Mantente al día, planifica con intención y no te pierdas ningún momento importante."
                },
                {
                    title: "CONFIRMACIÓN EN UN CLIC",
                    description: "Confirma tu asistencia al instante con un solo clic. Sin fricción, sin complicaciones — solo llega y sé parte de la experiencia."
                },
                {
                    title: "TU PERFIL",
                    description: "Accede a tu perfil personal y revisita cada evento al que has asistido. Tu recorrido, tu historia, todo en un solo lugar."
                }
            ],
            cta: "Crea tu cuenta"
        },
        whatWeDo: {
            ghostTitle: "HACEMOS",
            title: "qué hacemos",
            intro: "Nos movemos juntxs. Creamos comunidad a través del movimiento, aprendizaje y encuentros comunitarios.",
            activities: [
                {
                    title: "Running & Walking Club",
                    description: "En el Running & Walking Club nos reunimos para caminar, 'joguear' o correr a nuestro propio paso. Es un momento para hacer eiercicio y conectar con la comunidad LGBTQ+.",
                    image: {
                        src: "/group/group-picture-rw.JPG",
                        alt: "Running & Walking Club"
                    }
                },
                {
                    title: "Clases de Movimiento",
                    description: "Ofrecemos clases de movimiento para todos los niveles, como yoga, circuitos de fitness, baile y kickboxing, entre otras.",
                    image: {
                        src: "/group/group-picture-2.webp",
                        alt: "Clases de Movimiento"
                    }
                },
                {
                    title: "Comunidad & Educación",
                    description: "Creamos espacios y actividades para conocernos mejor, fortalecer lazos dentro de la comunidad y aprender juntxs mediante talleres, picnics y encuentros divertidos.",
                    image: {
                        src: "/group/group-picture-picnic-2.JPG",
                        alt: "Comunidad & Educación"
                    }
                }
            ],
            button: "únete a nosotrxs"
        },
        // Donations
        aboutCommunitySupport: {
            badge: "Apoyo comunitario directo",
            title: "Apoya a nuestra comunidad",
            description: "Estas iniciativas apoyan directamente a personas trans y BIPOC, facilitando el acceso a recursos esenciales y promoviendo su bienestar.",
            campaigns: [],
            disclaimer: "Paso Libre no administra, controla ni gestiona directamente estas campañas. Las donaciones se realizan y procesan a través de plataformas externas, bajo los términos y condiciones de dichas plataformas."
        },
        cta: {
            title: "ayúdanos a seguir creciendo",
            links: {
                volunteer: "voluntariado",
                collaborations: "colaboraciones",
                donations: "donaciones"
            }
        }
    },
    en: {
        hero: {
            backgroundMedia: {
                type: "video",
                src: "/videos/hero.mp4"
            },
            headline: "building our wellbeing TOGETHER.",
            boldHeadline: "TOGETHER",
            cta: {
                main: "Sign up",
                connector: "with",
                ending: "us!"
            }
        },
        about: {
            ghostTitle: "COMMUNITY",
            title: "who we are",
            intro: "We are an LGBTQ+ collective in Puerto Rico focused on well-being.",
            description: "Pasolibre builds community and promotes the well-being of LGBTQ+ people in Puerto Rico through resources and programs that support their physical, mental, professional, and educational well-being.",
            descriptionBoldBlue: "physical, mental, professional, and educational wellness.",
            descriptionBoldSkyBlue: [
                "LGBTQ+",
                "physical, mental, professional, and educational wellness."
            ],
            trajectoryTitle: "our journey",
            stats: {
                impactedLives: {
                    title: "Lives impacted",
                    number: 120
                },
                memoriesCreated: {
                    title: "Organized events",
                    number: 40
                },
                started: {
                    title: "Founded",
                    number: 2025
                }
            },
            button: "Learn more"
        },
        features: {
            ghostTitle: "FEATURES",
            title: "Everything in One Place",
            description: "Discover how Paso Libre makes it effortless to stay connected, attend events, and track your journey.",
            items: [
                {
                    title: "EVENT CALENDAR",
                    description: "Explore all Paso Libre events in one elegant calendar. Stay updated, plan ahead, and never miss a meaningful moment."
                },
                {
                    title: "ONE-CLICK ATTENDANCE",
                    description: "Confirm your attendance instantly with a single click. No friction, no hassle — just show up and be part of the experience."
                },
                {
                    title: "YOUR PROFILE",
                    description: "Access your personal profile and revisit every event you've attended. Your journey, your story, all in one place."
                }
            ],
            cta: "Create Your Account"
        },
        whatWeDo: {
            ghostTitle: "WE DO",
            title: "what we do",
            intro: "We move together. We build community through movement, learning, and community gatherings.",
            activities: [
                {
                    title: "Running & Walking Club",
                    description: "In the Running & Walking Club, we come together to walk, jog, or run at our own pace. It is a time to exercise and connect with the LGBTQ+ community.",
                    image: {
                        src: "/group/group-picture-rw.JPG",
                        alt: "Running & Walking Club"
                    }
                },
                {
                    title: "Movement Classes",
                    description: "We offer movement classes for all levels, such as yoga, fitness circuits, dance, and kickboxing, among others.",
                    image: {
                        src: "/group/group-picture-2.webp",
                        alt: "Fitness & Movement"
                    }
                },
                {
                    title: "Community & Education",
                    description: "We create spaces and activities to get to know each other better, strengthen community bonds, and learn together through workshops, picnics, and fun gatherings.",
                    image: {
                        src: "/group/group-picture-picnic-2.JPG",
                        alt: "Community & Education"
                    }
                }
            ],
            button: "join us"
        },
        // Donations
        aboutCommunitySupport: {
            badge: "Direct Community Support",
            title: "Support Our Community",
            description: "These initiatives directly support trans and BIPOC individuals by facilitating access to essential resources and promoting their well-being.",
            campaigns: [],
            disclaimer: "Paso Libre does not directly administer, control, or manage these campaigns. Donations are made and processed through external platforms, subject to the terms and conditions of those platforms."
        },
        cta: {
            title: "help us keep continue to grow",
            links: {
                volunteer: "volunteering",
                collaborations: "collaborations",
                donations: "donations"
            }
        }
    }
};
}),
"[project]/app/lib/translations/about.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aboutTranslations",
    ()=>aboutTranslations
]);
const aboutTranslations = {
    // SPANISH
    es: {
        // Hero Section
        heroTitle: "quiénes somos",
        heroTagline: "Movimiento que crea comunidad.",
        heroDescriptionStart: "es un colectivo que impulsa el bienestar de las personas",
        heroDescriptionHighlight: [
            "LGBTQ+",
            "bienestar físico, mental, profesional y educativo"
        ],
        heroDescriptionMiddle: "",
        heroDescriptionEnd: "en Puerto Rico mediante recursos y programas centrados en el bienestar.",
        heroImages: [
            {
                title: "Friendsgiving Celebration",
                src: "/group/group-picture-2.webp"
            },
            {
                title: "Beach Day",
                src: "/group/group-picture-4.jpg"
            },
            {
                title: "Yoga Class",
                src: "/group/group-picture-3.webp"
            }
        ],
        // Mission & Vision Section
        missionTitle: "misión",
        missionText: "Promovemos el bienestar físico, emocional y comunitario de las personas",
        missionHighlight: "LGBTQ+",
        missionTextEnd: "en Puerto Rico a través de movimiento, educación y espacios seguros.",
        visionTitle: "visión",
        visionText: "Soñamos con una comunidad donde todas las personas",
        visionHighlight: "LGBTQ+",
        visionTextEnd: "tengan acceso a espacios y herramientas seguras que les permitan trabajar en su bienestar propio y colectivo.",
        // Story Section
        pageContent: {
            title: "HISTORIA",
            paragraphs: [
                {
                    text: "Pasolibre nació de una necesidad compartida dentro de nuestra comunidad: encontrar un espacio donde pudiéramos movernos, aprender y conectar sin miedo, sin juicio y con un sentido de pertenencia.",
                    highlight: [
                        "movimiento",
                        "aprender",
                        "conectar"
                    ]
                },
                {
                    text: "Con el tiempo, entendimos que el bienestar que buscábamos iba mucho más allá del ejercicio. Queríamos espacios para hablar, aprender, reír, sanar y crear comunidad.",
                    highlight: [
                        "bienestar",
                        "hablar",
                        "aprender",
                        "reír",
                        "sanar",
                        "comunidad"
                    ]
                },
                {
                    text: "Cada actividad, desde un Running Club hasta un Movie Night, ha nacido del deseo de construir algo que muchas veces no encontramos en otros lugares: un espacio hecho por y para personas LGBTQ+, accesible, afirmativo y lleno de apoyo.",
                    highlight: [
                        "Running Club",
                        "Movie Night",
                        "LGBTQ+",
                        "accesible",
                        "apoyo"
                    ]
                },
                {
                    text: "Hoy, Pasolibre sigue creciendo gracias a la energía colectiva de quienes participan. No somos solo un programa o un calendario de actividades; somos una comunidad que se acompaña, se cuida y se mueve junta hacia un bienestar más pleno, propio y colectivo.",
                    highlight: [
                        "comunidad",
                        "acompaña",
                        "cuida",
                        "bienestar"
                    ]
                }
            ]
        },
        meetPlaces: {
            backgroundWord: "COMUNIDAD",
            title: "cómo creamos comunidad",
            description: "Paso Libre crea espacios donde las personas LGBTQ+ en Puerto Rico pueden moverse, aprender, conectar y cuidarse mutuamente.",
            places: [
                {
                    name: "Movimiento",
                    icon: "FaWalking"
                },
                {
                    name: "Aprendizaje",
                    icon: "FaBookOpen"
                },
                {
                    name: "Conexión",
                    icon: "FaUsers"
                },
                {
                    name: "Cuidado",
                    icon: "FaHeart"
                }
            ]
        },
        instagramSection: {
            backgroundWord: "INSTAGRAM",
            title: "Síguenos en Instagram",
            description: "Síguenos para mantenerte al tanto de nuestras actividades y formar parte de nosotrxs."
        },
        tiktokSection: {
            backgroundWord: "TIKTOK",
            title: "Míranos en movimiento",
            description: "Momentos reales, historias auténticas y la energía de nuestra comunidad en cada video.",
            ctaTitle: "Siente la vibra",
            ctaDescription: "Desliza y descubre nuestra comunidad en acción — conexión, movimiento y bienestar en tiempo real.",
            button: "Síguenos en TikTok"
        },
        whatsappTitle: "Únete a nuestra comunidad",
        whatsappText: "Conecta con nuestra comunidad y entérate de eventos, noticias y apoyo directo por WhatsApp.",
        whatsappButton: "Unirme al grupo",
        followBridge: {
            label: "Únete a nosotrxs",
            title: "Sé parte de nuestros espacios",
            description: "Únete a nuestras actividades y mantente cerca de una comunidad que se cuida y se acompaña.",
            cta: "Síguenos. Únete. Crece con nosotrxs."
        }
    },
    // ENGLISH
    en: {
        heroTitle: "Who We Are",
        heroTagline: "A movement that builds community.",
        heroDescriptionStart: "is a collective that promotes the wellbeing of",
        heroDescriptionHighlight: [
            "LGBTQ+",
            "physical, mental, professional, and educational wellbeing"
        ],
        heroDescriptionMiddle: "",
        heroDescriptionEnd: "people in Puerto Rico through programs and resources focused on overall wellbeing.",
        heroImages: [
            {
                title: "Friendsgiving Celebration",
                src: "/group/group-picture-2.webp"
            },
            {
                title: "Beach Day",
                src: "/group/group-picture-4.jpg"
            },
            {
                title: "Yoga Class",
                src: "/group/group-picture-3.webp"
            }
        ],
        missionTitle: "mission",
        missionText: "We promote the physical, emotional, and community wellbeing of",
        missionHighlight: "LGBTQ+",
        missionTextEnd: "people in Puerto Rico through movement, education, and safe spaces.",
        visionTitle: "vision",
        visionText: "We dream of a community where all",
        visionHighlight: "LGBTQ+",
        visionTextEnd: "people have access to safe spaces and tools to work on their own and collective wellbeing.",
        // Story
        pageContent: {
            title: "STORY",
            paragraphs: [
                {
                    text: "Pasolibre was born from a shared need within our community: to find a space where we could move, learn, and connect without fear, without judgment, and with a sense of belonging.",
                    highlight: [
                        "move",
                        "learn",
                        "connect"
                    ]
                },
                {
                    text: "Over time, we came to understand that the well-being we were seeking went far beyond exercise. We wanted spaces to talk, learn, laugh, heal, and build community.",
                    highlight: [
                        "wellbeing",
                        "talk",
                        "learn",
                        "laugh",
                        "heal",
                        "community"
                    ]
                },
                {
                    text: "Each activity, from a Running Club to a Movie Night, has been born from the desire to create something we often don’t find elsewhere: a space created by and for LGBTQ+ people, accessible, affirming, and full of support.",
                    highlight: [
                        "Running Club",
                        "Movie Night",
                        "LGBTQ+",
                        "accessible",
                        "support"
                    ]
                },
                {
                    text: "Today, Pasolibre continues to grow thanks to the collective energy of those who take part. We are not just a program or a calendar of activities; we are a community that supports one another, cares for each other, and moves together toward more complete, personal, and collective well-being.",
                    highlight: [
                        "community",
                        "supports",
                        "cares",
                        "wellbeing"
                    ]
                }
            ]
        },
        meetPlaces: {
            backgroundWord: "COMMUNITY",
            title: "how we build community",
            description: "Paso Libre creates spaces where LGBTQ+ people in Puerto Rico can move, learn, connect, and care for one another.",
            places: [
                {
                    name: "Movement",
                    icon: "FaWalking"
                },
                {
                    name: "Learning",
                    icon: "FaBookOpen"
                },
                {
                    name: "Connection",
                    icon: "FaUsers"
                },
                {
                    name: "Care",
                    icon: "FaHeart"
                }
            ]
        },
        instagramSection: {
            backgroundWord: "INSTAGRAM",
            title: "Follow Us on Instagram",
            description: "Our community in motion. Experience races, workouts, and special moments in real time."
        },
        tiktokSection: {
            backgroundWord: "TIKTOK",
            title: "See us in motion",
            description: "Real moments, authentic stories, and the energy of our community in every video.",
            ctaTitle: "Feel the vibe",
            ctaDescription: "Swipe through and experience our community in action — connection, movement, and wellbeing in real time.",
            button: "Follow us on TikTok"
        },
        // WhatsApp Section
        whatsappTitle: "Join Our Community",
        whatsappText: "Connect with people who share our LGBTQ+ wellbeing mission in Puerto Rico, and receive news, events, and support directly in your WhatsApp.",
        whatsappButton: "Join the group",
        // Connect Section
        followBridge: {
            label: "Join Us",
            title: "Be part of our spaces",
            description: "Join our activities, and stay close to a community that cares for and supports one another.",
            cta: "Follow us. Join us. Grow with us."
        }
    }
};
}),
"[project]/app/lib/translations/resources.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resourcesTranslations",
    ()=>resourcesTranslations
]);
const resourcesTranslations = {
    en: {
        /* ---------------- NAVIGATION ---------------- */ nav: {
            professionals: "Professionals",
            clinics: "Affirming Clinics",
            nameChange: "Name Change",
            community: "Community"
        },
        /* Added (new structure compatible) */ navigation: {
            professionals: "Professionals",
            clinics: "Affirming Clinics",
            nameChange: "Name Change",
            community: "Community"
        },
        /* ---------------- HERO ---------------- */ hero: {
            badge: "Safe Medical Spaces",
            title: "Health Resources in Puerto Rico",
            description: "Paso Libre promotes the well-being of LGBTQ+ individuals in Puerto Rico by connecting our community with safe medical spaces, informed professionals, and services that support physical, mental, and reproductive health.",
            disclaimer: "The information provided on this page was collected and suggested by members of the community. Our goal is to highlight resources recommended by queer individuals with lived experience."
        },
        /* ---------------- SEARCH / FILTERS ---------------- */ search: {
            providerPlaceholder: "Search by name, specialty, or city...",
            clinicPlaceholder: "Search clinic or service...",
            all: "All"
        },
        filters: {
            all: "All",
            searchPlaceholder: "Search by name, specialty or city...",
            anonymous: "Anonymous"
        },
        /* ---------------- SECTIONS ---------------- */ sections: {
            providers: "Medical Professionals",
            clinics: "Gender-Affirming Clinics",
            nameGuide: "Name & Gender Marker Guide",
            intention: "Our Intention"
        },
        /* ---------------- PROVIDERS ---------------- */ providers: {
            publicInfo: "Search public information",
            topSurgery: "Gender-Affirming Surgery (Top Surgery)",
            topSurgerySpecialty: "Reconstructive Plastic Surgery – Top Surgery"
        },
        /* ---------------- CATEGORIES (NEW) ---------------- */ categories: {
            generalMedicine: "General Medicine",
            dermatology: "Dermatology",
            gynecology: "Gynecology & Reproductive Health",
            mentalHealth: "Mental Health"
        },
        /* ---------------- COMMUNITY NOTE ---------------- */ communityNote: "This page is designed to help the LGBTQ+ community in Puerto Rico identify medical spaces where they can receive care with respect, dignity, and cultural sensitivity. We believe equitable access to health is fundamental to overall well-being.",
        /* Extended version (optional usage) */ communityNoteExtended: {
            title: "Our Intention",
            description: "This page is designed to help the LGBTQ+ community in Puerto Rico identify medical spaces where they can receive care with respect, dignity, and cultural sensitivity. We believe equitable access to healthcare is fundamental to overall well-being."
        },
        /* ---------------- DISCLAIMER / LEGAL ---------------- */ disclaimer: {
            p1: "The professionals listed on this page are independent providers. Paso Libre does not manage, supervise, or formally affiliate with these professionals or their practices.",
            p2: "The information presented is for informational purposes only and does not constitute medical advice, diagnosis, or clinical guidance. Always consult directly with a licensed healthcare professional.",
            p3: "If you are a listed professional and wish to update or remove your information, please contact us to make the appropriate modification."
        },
        legal: {
            p1: "The professionals listed on this page are independent providers. Paso Libre does not administer, supervise, or formally affiliate with these professionals or their practices.",
            p2: "The information presented is for informational purposes only and does not constitute medical advice, diagnosis, or clinical counseling. Always consult directly with a licensed healthcare professional.",
            p3: "If you are a listed professional and would like to update or remove your information, please contact us to make the appropriate changes."
        },
        /* ---------------- DEFAULT COMMENTS (NEW) ---------------- */ defaultComments: [
            {
                name: "Alex R.",
                message: "Clínica Transalud provided respectful guidance during my hormone process. The staff was very professional and affirming."
            },
            {
                name: "María L.",
                message: "Centro Ararat in Ponce offers excellent psychosocial support for LGBTQ+ youth. Highly recommended."
            },
            {
                name: "Javier T.",
                message: "Thank you for including resources in Mayagüez. CARIB has been a safe space for our community."
            }
        ],
        /* ---------------- GENDER-AFFIRMING CLINICS ---------------- */ genderAffirmingClinics: {
            sectionTitle: "Gender-Affirming Clinics",
            searchPlaceholder: "Search clinic or service...",
            allMunicipalities: "All",
            visitWebsite: "Visit Website",
            searchGoogle: "Search on Google"
        },
        /* ---------------- NAME CHANGE GUIDE ---------------- */ nameChangeGuide: {
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
          `
                },
                {
                    icon: "LuFileText",
                    text: `
          File a petition at the 
          <a href="https://www.ramajudicial.pr" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            Court of First Instance
          </a> 
          or through a public notary (non-contentious process).
          `
                },
                {
                    icon: "LuClipboardCheck",
                    text: `
          Submit required evidence, including identification and sworn statements.
          A copy must also be provided to the Public Prosecutor for review.
          `
                },
                {
                    icon: "LuScale",
                    text: `
          If no objection is filed within 10 days, the judge will issue a resolution approving the name change.
          `
                },
                {
                    icon: "LuSignature",
                    text: `
          Once approved, take the court resolution to the Demographic Registry to update your birth certificate.
          `
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
          `
                },
                {
                    icon: "LuCar",
                    text: `
          Update your driver's license at 
          <a href="https://www.dtop.pr.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            CESCO
          </a>.
          `
                },
                {
                    icon: "LuHeartPulse",
                    text: `
          For gender marker changes, obtain a gender dysphoria diagnosis from an affirming healthcare provider.
          `
                }
            ],
            legalInfo: `
      Name changes in Puerto Rico are processed through a petition filed with the Court of First Instance or a public notary under Law No. 24-1931 or Law No. 282-1999. 
      The process requires official documents such as birth certificate, criminal record, and certifications from ASUME, CRIM, and Hacienda. 
      If the Public Prosecutor does not object within 10 days, the judge issues a resolution.
      `,
            resources: [
                {
                    label: "Judicial Branch Guide",
                    link: "https://poderjudicial.pr/Documentos/Educo/Cambio-Nombre-proceso.pdf"
                },
                {
                    label: "CDC Puerto Rico Guide",
                    link: "https://cdc.pr.gov/InstitutoDeEducacion/RecursosEducativos/Opusculos_Recientes/CDC-Cambio%20de%20nombre.pdf"
                }
            ],
            disclaimer: "This guide is for informational purposes and does not replace professional legal advice."
        },
        /* ---------------- COMMUNITY COMMENTS ---------------- */ communityComments: {
            sectionTitle: "Community Comments",
            description: "Want to suggest a professional, ask a question, share an experience, or request removal from a list? Send us a message. All submissions are reviewed before publication.",
            placeholders: {
                name: "Your name (optional)",
                message: "Write your comment..."
            },
            ratingLabel: "(Optional rating)",
            submitButton: "Submit for review and publication",
            pagination: {
                prev: "Previous",
                next: "Next"
            },
            moderationPanel: {
                title: "Moderation Panel",
                approveButton: "Approve"
            }
        }
    },
    /* =================================================================== */ /* =============================== SPANISH ============================ */ /* =================================================================== */ es: {
        nav: {
            professionals: "Profesionales",
            clinics: "Clínicas Afirmativas",
            nameChange: "Cambio de Nombre",
            community: "Comunidad"
        },
        navigation: {
            professionals: "Profesionales",
            clinics: "Clínicas Afirmativas",
            nameChange: "Cambio de Nombre",
            community: "Comunidad"
        },
        hero: {
            badge: "Espacios Médicos Seguros",
            title: "Recursos de Salud en Puerto Rico",
            description: "Paso Libre impulsa el bienestar de las personas LGBTQ+ en Puerto Rico conectando a nuestra comunidad con espacios médicos seguros, profesionales informados y servicios que promueven el bienestar físico, mental y reproductivo.",
            disclaimer: "La información que se provee en esta página fue recopilada y sugerida por miembros de la comunidad. Nuestro objetivo es visibilizar recursos recomendados por personas (queer) con experiencias reales."
        },
        search: {
            providerPlaceholder: "Buscar por nombre, especialidad o ciudad...",
            clinicPlaceholder: "Buscar clínica o servicio...",
            all: "Todos"
        },
        filters: {
            all: "Todos",
            searchPlaceholder: "Buscar por nombre, especialidad o ciudad...",
            anonymous: "Anónimo"
        },
        sections: {
            providers: "Profesionales de la Salud",
            clinics: "Clínicas con Atención Afirmativa de Género",
            nameGuide: "Guía de Cambio de Nombre",
            intention: "Nuestra intención"
        },
        providers: {
            publicInfo: "Buscar información pública",
            topSurgery: "Cirugía de Afirmación de Género (Top Surgery)",
            topSurgerySpecialty: "Cirugía Plástica Reconstructiva – Top Surgery"
        },
        categories: {
            generalMedicine: "Medicina General",
            dermatology: "Dermatología",
            gynecology: "Ginecología y Salud Reproductiva",
            mentalHealth: "Salud Mental"
        },
        communityNote: "Esta página está diseñada para ayudar a la comunidad LGBTQ+ en Puerto Rico a identificar espacios médicos donde puedan recibir atención con respeto, dignidad y sensibilidad cultural. Creemos en el acceso equitativo a la salud como parte fundamental del bienestar integral.",
        communityNoteExtended: {
            title: "Nuestra intención",
            description: "Esta página está diseñada para ayudar a la comunidad LGBTQ+ en Puerto Rico a identificar espacios médicos donde puedan recibir atención con respeto, dignidad y sensibilidad cultural. Creemos en el acceso equitativo a la salud como parte fundamental del bienestar integral."
        },
        disclaimer: {
            p1: "Los profesionales listados en esta página son proveedores independientes. Paso Libre no administra, supervisa ni está afiliado formalmente con estos profesionales o sus prácticas.",
            p2: "La información presentada es de carácter informativo y no constituye recomendación médica, diagnóstico ni asesoramiento clínico. Siempre consulte directamente con un profesional de la salud licenciado.",
            p3: "Si usted es un profesional listado y desea actualizar o remover su información, puede comunicarse con nosotros para realizar la modificación correspondiente."
        },
        legal: {
            p1: "Los profesionales listados en esta página son proveedores independientes. Paso Libre no administra, supervisa ni está afiliado formalmente con estos profesionales o sus prácticas.",
            p2: "La información presentada es de carácter informativo y no constituye recomendación médica, diagnóstico ni asesoramiento clínico. Siempre consulte directamente con un profesional de la salud licenciado.",
            p3: "Si usted es un profesional listado y desea actualizar o remover su información, puede comunicarse con nosotros para realizar la modificación correspondiente."
        },
        defaultComments: [
            {
                name: "Alex R.",
                message: "Clínica Transalud me brindó acompañamiento respetuoso durante mi proceso hormonal. El personal fue muy profesional y afirmativo."
            },
            {
                name: "María L.",
                message: "Centro Ararat en Ponce ofrece apoyo psicosocial excelente para jóvenes LGBTQ+. Muy recomendado."
            },
            {
                name: "Javier T.",
                message: "Gracias por incluir recursos en Mayagüez. CARIB ha sido un espacio seguro para nuestra comunidad."
            }
        ],
        genderAffirmingClinics: {
            sectionTitle: "Clínicas con Atención Afirmativa de Género",
            searchPlaceholder: "Buscar clínica o servicio...",
            allMunicipalities: "Todos",
            visitWebsite: "Visitar sitio web",
            searchGoogle: "Buscar en Google"
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
          `
                },
                {
                    icon: "LuFileText",
                    text: `
          Presentar una petición en el 
          <a href="https://www.ramajudicial.pr" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            Tribunal de Primera Instancia
          </a> 
          o mediante un notario público (proceso no contencioso).
          `
                },
                {
                    icon: "LuClipboardCheck",
                    text: `
          Incluir evidencia requerida, como identificación válida y declaración jurada. 
          También se debe entregar copia al Ministerio Público para evaluación.
          `
                },
                {
                    icon: "LuScale",
                    text: `
          Si el Ministerio Público no presenta objeción en un plazo de 10 días, el juez emitirá una resolución aprobando el cambio.
          `
                },
                {
                    icon: "LuSignature",
                    text: `
          Una vez aprobada, llevar la resolución al Registro Demográfico para actualizar el acta de nacimiento.
          `
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
          `
                },
                {
                    icon: "LuCar",
                    text: `
          Actualizar la licencia de conducir en 
          <a href="https://www.dtop.pr.gov/" target="_blank" rel="noopener noreferrer" class="text-[#0d4db0] underline">
            CESCO
          </a>.
          `
                },
                {
                    icon: "LuHeartPulse",
                    text: `
          Para cambiar el marcador de género, obtener diagnóstico de disforia de género de un proveedor de salud afirmativo.
          `
                }
            ],
            legalInfo: `
      El cambio de nombre en Puerto Rico se gestiona mediante una petición ante el Tribunal de Primera Instancia o ante un notario público, bajo la Ley Núm. 24-1931 o Ley Núm. 282-1999. 
      Requiere presentar documentos como certificado de nacimiento, antecedentes penales y certificaciones de ASUME, CRIM y Hacienda. 
      Si el Ministerio Público no objeta en 10 días, el juez emite una resolución.
      `,
            resources: [
                {
                    label: "Guía del Poder Judicial",
                    link: "https://poderjudicial.pr/Documentos/Educo/Cambio-Nombre-proceso.pdf"
                },
                {
                    label: "Guía CDC Puerto Rico",
                    link: "https://cdc.pr.gov/InstitutoDeEducacion/RecursosEducativos/Opusculos_Recientes/CDC-Cambio%20de%20nombre.pdf"
                }
            ],
            disclaimer: "Esta guía es informativa y no sustituye asesoramiento legal profesional."
        },
        communityComments: {
            sectionTitle: "Comentarios Comunitarios",
            description: "¿Deseas sugerir un profesional, hacer una pregunta, compartir una experiencia o solicitar la remoción de una lista? Envíanos un mensaje. Todas las solicitudes son revisadas antes de ser publicadas.",
            placeholders: {
                name: "Tu nombre (opcional)",
                message: "Escribe tu comentario..."
            },
            ratingLabel: "(Calificación opcional)",
            submitButton: "Enviar para revisión y publicación",
            pagination: {
                prev: "Anterior",
                next: "Siguiente"
            },
            moderationPanel: {
                title: "Panel de Moderación",
                approveButton: "Aprobar"
            }
        }
    }
};
}),
"[project]/app/lib/translations/contact.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contactTranslations",
    ()=>contactTranslations
]);
const contactTranslations = {
    en: {
        getInTouch: "Get in touch with us",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone",
        email: "Email",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        successMessage: "Message sent successfully! We'll get back to you soon.",
        errorMessage: "An error occurred while sending your message. Please try again later.",
        subjectPlaceholder: "Select Subject",
        customSubject: "Custom Subject",
        subjects: {
            collaborations: "Collaborations",
            suggestions: "Suggestions",
            questions: "Questions",
            feedback: "Feedback",
            request: "Request",
            other: "Other"
        }
    },
    es: {
        getInTouch: "Ponte en contacto con nosotrxs",
        firstName: "Nombre",
        lastName: "Apellido",
        phone: "Teléfono",
        email: "Correo",
        message: "Tu mensaje",
        send: "Enviar mensaje",
        sending: "Enviando...",
        successMessage: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
        errorMessage: "Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
        subjectPlaceholder: "Selecciona un asunto",
        customSubject: "Asunto personalizado",
        subjects: {
            collaborations: "Colaboraciones",
            suggestions: "Sugerencias",
            questions: "Preguntas",
            feedback: "Comentarios",
            request: "Solicitud",
            other: "Otro"
        }
    }
};
}),
"[project]/app/lib/translations/privacy-policy.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "privacyPolicyTranslations",
    ()=>privacyPolicyTranslations
]);
const privacyPolicyTranslations = {
    es: {
        privacyTitle: "Política de Privacidad",
        privacyIntro: "En Pasolibre, valoramos profundamente la privacidad, seguridad y confianza de nuestra comunidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, protegemos y manejamos la información que recibimos a través de nuestra página web y nuestras plataformas digitales.",
        collectedInfoTitle: "Información que recopilamos",
        collectedInfoIntro: "Recopilamos únicamente la información necesaria para operar nuestros servicios y mejorar la experiencia de quienes visitan nuestra página. Esto puede incluir:",
        collectedInfoList: [
            "Información provista voluntariamente, como nombre, correo electrónico u otros datos enviados mediante formularios de contacto o registro.",
            "Datos de uso del sitio, como páginas visitadas, tiempo de navegación y tipo de dispositivo, recopilados de forma anónima mediante herramientas analíticas.",
            "Contenido multimedia, como fotos o videos, únicamente cuando contamos con consentimiento previo de las personas que aparecen en ellos."
        ],
        collectedInfoNote: "No solicitamos ni almacenamos información sensible sin autorización explícita.",
        useInfoTitle: "Cómo utilizamos la información",
        useInfoIntro: "La información recopilada se utiliza para:",
        useInfoList: [
            "Mantener y mejorar el funcionamiento de nuestra página web.",
            "Responder a mensajes, solicitudes o formularios enviados por las personas usuarias.",
            "Compartir información sobre actividades, programas o eventos, únicamente cuando la persona lo ha autorizado.",
            "Evaluar el alcance e impacto de nuestros servicios comunitarios."
        ],
        useInfoNote: "Pasolibre no vende, alquila ni comparte información personal con terceros para fines comerciales.",
        mediaUsageTitle: "Uso de fotos y videos",
        mediaUsageParagraphs: [
            "Antes de publicar fotos o videos donde aparezcan personas identificables, solicitamos su consentimiento. Si en algún momento deseas que eliminemos una imagen donde apareces, puedes comunicarte con nosotrxs y atenderemos tu solicitud con prioridad.",
            "La seguridad y el bienestar de nuestra comunidad son fundamentales."
        ],
        cookiesTitle: "Cookies y tecnologías similares",
        cookiesText: "Nuestro sitio puede utilizar cookies para mejorar la experiencia de navegación. Las cookies pueden ayudar a recordar preferencias o analizar el uso del sitio. Puedes desactivarlas desde la configuración de tu navegador si así lo prefieres.",
        externalLinksTitle: "Enlaces a sitios externos",
        externalLinksText: "Nuestra página puede incluir enlaces a sitios web de terceros. Pasolibre no se hace responsable por las prácticas de privacidad, contenido o seguridad de dichos sitios externos.",
        protectionTitle: "Protección de la información",
        protectionText: "Implementamos medidas razonables de seguridad para proteger la información que recopilamos. Sin embargo, ningún sistema digital es completamente infalible, por lo que no podemos garantizar seguridad absoluta.",
        changesTitle: "Cambios a esta política",
        changesText: "Podemos actualizar esta Política de Privacidad en cualquier momento. La versión más reciente siempre estará disponible en esta página, con la fecha de actualización correspondiente.",
        contactTitle: "Contacto",
        contactText: "Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer algún derecho relacionado con tu información, puedes comunicarte con nosotrxs a través de:",
        contactEmail: "pasolibre.pr@gmail.com",
        tosTitle: "Términos de Servicio",
        tosIntro: "Estos Términos de Servicio regulan el acceso y uso del sitio web de Pasolibre. Al utilizar nuestra página o participar en nuestros servicios digitales, aceptas cumplir con las condiciones descritas a continuación. Si no estás de acuerdo con estos términos, te recomendamos no utilizar el sitio.",
        tosSections: [
            {
                title: "Uso del sitio web",
                text: "El contenido de este sitio web se ofrece con fines informativos y comunitarios. Te comprometes a utilizarlo de manera responsable y a no realizar actividades que puedan afectar su funcionamiento, seguridad o integridad."
            },
            {
                title: "Contenido y propiedad intelectual",
                text: "Todo el contenido publicado en este sitio, incluyendo textos, imágenes, gráficos, logotipos y materiales educativos, pertenece a Pasolibre o se utiliza con autorización. No está permitido copiar, distribuir, modificar o reutilizar contenido sin permiso previo por escrito."
            },
            {
                title: "Participación en actividades",
                text: "La información sobre actividades, eventos y programas se ofrece de buena fe. Pasolibre no se hace responsable por cambios, cancelaciones o ajustes necesarios por razones operativas o de seguridad."
            },
            {
                title: "Fotos y videos",
                text: "Antes de publicar fotos o videos donde aparezcan personas identificables, solicitamos su consentimiento. Al participar en nuestras actividades, puedes elegir si deseas o no aparecer en contenido visual. Tu decisión será respetada en todo momento."
            },
            {
                title: "Enlaces externos",
                text: "Nuestro sitio puede incluir enlaces a páginas de terceros. Pasolibre no controla ni se responsabiliza por el contenido, políticas o prácticas de privacidad de dichos sitios."
            },
            {
                title: "Limitación de responsabilidad",
                text: "Aunque trabajamos para mantener la información actualizada y el sitio funcionando correctamente, no garantizamos que el contenido esté libre de errores o interrupciones. Pasolibre no será responsable por daños derivados del uso o imposibilidad de uso del sitio web."
            },
            {
                title: "Modificaciones a los términos",
                text: "Podemos actualizar estos Términos de Servicio en cualquier momento. La versión más reciente estará disponible en esta página con su fecha de actualización."
            },
            {
                title: "Contacto",
                text: "Si tienes preguntas sobre estos Términos de Servicio, puedes comunicarte con nosotrxs a través de nuestro correo electrónico o redes oficiales."
            }
        ]
    },
    en: {
        privacyTitle: "Privacy Policy",
        privacyIntro: "At Pasolibre, we deeply value the privacy, security, and trust of our community. This Privacy Policy explains how we collect, use, protect, and manage the information we receive through our website and digital platforms.",
        collectedInfoTitle: "Information We Collect",
        collectedInfoIntro: "We only collect information necessary to operate our services and improve the experience of those visiting our site. This may include:",
        collectedInfoList: [
            "Information voluntarily provided, such as name, email, or other data submitted through contact or registration forms.",
            "Website usage data, such as pages visited, browsing time, and device type, collected anonymously using analytics tools.",
            "Multimedia content, such as photos or videos, only when we have prior consent from the people appearing in them."
        ],
        collectedInfoNote: "We do not request or store sensitive information without explicit authorization.",
        useInfoTitle: "How We Use Information",
        useInfoIntro: "The collected information is used to:",
        useInfoList: [
            "Maintain and improve the functioning of our website.",
            "Respond to messages, requests, or forms submitted by users.",
            "Share information about activities, programs, or events only when authorized by the person.",
            "Evaluate the reach and impact of our community services."
        ],
        useInfoNote: "Pasolibre does not sell, rent, or share personal information with third parties for commercial purposes.",
        mediaUsageTitle: "Use of Photos and Videos",
        mediaUsageParagraphs: [
            "Before publishing photos or videos featuring identifiable people, we request their consent. If you ever want us to remove an image in which you appear, you can contact us and we will prioritize your request.",
            "The safety and wellbeing of our community are fundamental."
        ],
        cookiesTitle: "Cookies and Similar Technologies",
        cookiesText: "Our site may use cookies to enhance your browsing experience. Cookies can help remember preferences or analyze site usage. You can disable them via your browser settings if you prefer.",
        externalLinksTitle: "External Links",
        externalLinksText: "Our website may include links to third-party websites. Pasolibre is not responsible for the privacy practices, content, or security of these external sites.",
        protectionTitle: "Information Protection",
        protectionText: "We implement reasonable security measures to protect the information we collect. However, no digital system is completely foolproof, so we cannot guarantee absolute security.",
        changesTitle: "Changes to This Policy",
        changesText: "We may update this Privacy Policy at any time. The latest version will always be available on this page with the corresponding update date.",
        contactTitle: "Contact",
        contactText: "If you have questions about this Privacy Policy or wish to exercise any rights related to your information, you can contact us through:",
        contactEmail: "pasolibre.pr@gmail.com",
        tosTitle: "Terms of Service",
        tosIntro: "These Terms of Service govern access and use of the Pasolibre website. By using our site or participating in our digital services, you agree to comply with the conditions described below. If you do not agree with these terms, we recommend not using the site.",
        tosSections: [
            {
                title: "Website Use",
                text: "The content of this website is provided for informational and community purposes. You agree to use it responsibly and not engage in activities that may affect its functionality, security, or integrity."
            },
            {
                title: "Content and Intellectual Property",
                text: "All content published on this site, including text, images, graphics, logos, and educational materials, belongs to Pasolibre or is used with authorization. Copying, distributing, modifying, or reusing content without prior written permission is not allowed."
            },
            {
                title: "Participation in Activities",
                text: "Information about activities, events, and programs is provided in good faith. Pasolibre is not responsible for changes, cancellations, or adjustments necessary for operational or safety reasons."
            },
            {
                title: "Photos and Videos",
                text: "Before publishing photos or videos featuring identifiable people, we request their consent. When participating in our activities, you can choose whether or not to appear in visual content. Your decision will be respected at all times."
            },
            {
                title: "External Links",
                text: "Our site may include links to third-party websites. Pasolibre does not control or take responsibility for the content, policies, or privacy practices of such sites."
            },
            {
                title: "Limitation of Liability",
                text: "While we strive to keep information up-to-date and the site functioning properly, we do not guarantee that content is free of errors or interruptions. Pasolibre will not be liable for damages arising from use or inability to use the website."
            },
            {
                title: "Changes to Terms",
                text: "We may update these Terms of Service at any time. The latest version will be available on this page with its update date."
            },
            {
                title: "Contact",
                text: "If you have questions about these Terms of Service, you can contact us through our official email or social media channels."
            }
        ]
    }
};
}),
"[project]/app/lib/translations/footer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "footerTranslations",
    ()=>footerTranslations
]);
const footerTranslations = {
    es: {
        policyButton: "Política de Privacidad / Términos de Servicio",
        // emailLabel: "pasolibre.pr@gmail.com",
        emailLabel: "team@pasolibre.org",
        copyright: `© ${new Date().getFullYear()} Sitio Oficial de Paso Libre por EAM`
    },
    en: {
        policyButton: "Privacy Policy / Terms of Service",
        // emailLabel: "pasolibre.pr@gmail.com",
        emailLabel: "team@pasolibre.org",
        copyright: `© ${new Date().getFullYear()} Paso Libre Official Website by EAM`
    }
};
}),
"[project]/app/lib/translations/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/navigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$home$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/home.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/about.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$resources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/resources.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/contact.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$privacy$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/privacy-policy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$footer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/footer.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const translations = {
    en: {
        navigation: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigationTranslations"].en,
        home: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$home$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["homeTranslations"].en,
        about: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aboutTranslations"].en,
        resources: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$resources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resourcesTranslations"].en,
        contact: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactTranslations"].en,
        privacy: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$privacy$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["privacyPolicyTranslations"].en,
        footer: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$footer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["footerTranslations"].en
    },
    es: {
        navigation: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigationTranslations"].es,
        home: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$home$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["homeTranslations"].es,
        about: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$about$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aboutTranslations"].es,
        resources: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$resources$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resourcesTranslations"].es,
        contact: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contactTranslations"].es,
        privacy: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$privacy$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["privacyPolicyTranslations"].es,
        footer: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$footer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["footerTranslations"].es
    }
};
}),
"[project]/app/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    const supabaseUrl = "https://wusbcaffjonhexqrabzk.supabase.co";
    const supabaseAnonKey = "sb_publishable_5RQHh-f6_dVKyXUy--23aA_RT6-S74E";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    });
}
}),
"[project]/app/lib/supabase/supabaseClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
// lib/supabase/supabaseClient.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
}),
"[project]/app/context/language/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/translations/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/supabaseClient.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const isValidLanguage = (value)=>{
    return typeof value === "string" && value in __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"];
};
const LanguageProvider = ({ children })=>{
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadPreferredLanguage = async ()=>{
            const stored = localStorage.getItem("lang");
            if (isValidLanguage(stored)) {
                setLanguageState(stored);
            }
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (!user?.id) return;
            const { data: profile, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("language_preference").eq("id", user.id).maybeSingle();
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
    const setLanguage = async (lang)=>{
        if (!isValidLanguage(lang)) return;
        localStorage.setItem("lang", lang);
        setLanguageState(lang);
        const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (!user?.id) return;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("profiles").update({
            language_preference: lang
        }).eq("id", user.id);
        if (error) {
            console.error("Failed to update profile language:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$translations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/language/index.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useLanguage = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider");
    }
    return context;
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__21b3c67d._.js.map