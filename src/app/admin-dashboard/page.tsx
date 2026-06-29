"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CalendarDays,
  ClipboardList,
  Megaphone,
  UserCircle2,
  Users,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { GoChecklist } from "react-icons/go";
import { FaRegLightbulb } from "react-icons/fa";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";

import Navbar from "../components/NavBar";
// import ITSupportFooter from "../components/ITSupportFooter";

type ProfileRecord = {
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  is_approved?: boolean;
  account_status?: "active" | "suspended" | null;
};

type DashboardCardItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
};

const dashboardTranslations = {
  en: {
    adminFallback: "Admin",
    loadingTitle: "Loading dashboard",
    loadingDescription: "Verifying administrator access...",
    accessRestrictedTitle: "Access restricted",
    accessRestrictedDescription:
      "This dashboard is only available to approved administrators.",
    returnHome: "Return Home",
    adminWorkspace: "Admin Workspace",
    dashboardTitle: "Dashboard",
    dashboardDescription:
      "Manage operations, oversee accounts, and keep the platform organized from one elegant control center.",
    accessLevel: "Access Level",
    approvedAdministrator: "Approved Administrator",
    openTool: "Open tool",

    sections: {
      toolsTitle: "Tools",
      toolsSubtitle: "Operational controls for your main platform workflows",
      accessTitle: "User & Access Management",
      accessSubtitle: "Manage users, permissions, and administrator settings",
      contentTitle: "Content & Website Management",
      contentSubtitle:
        "Internal tools to manage different website sections and content.",
    },

    badges: {
      core: "Core",
      reports: "Reports",
      broadcast: "Broadcast",
      account: "Account",
      admin: "Admin",
      addOn: "Add-On",
      inProgress: "In Progress",
    },

    cards: {
      events: {
        title: "Events",
        description:
          "View and manage events, confirm or cancel attendance, and navigate to event attendance reports and invitations.",
      },
      attendance: {
        title: "Attendance",
        description:
          "Review and manage participation history, check attendance records, and export reports.",
      },
      announcements: {
        title: "Announcements",
        description:
          "Publish important updates and keep members informed with platform-wide announcements.",
      },
      profile: {
        title: "Profile",
        description:
          "Update your administrator profile, personal information, and account settings.",
      },
      accountManager: {
        title: "Account Manager",
        description:
          "Approve, suspend, review, and manage user access in one centralized place.",
      },
      initiativesManager: {
        title: "Initiatives Manager",
        description:
          "Easily add new initiatives, events, community actions, and resources to the website.",
      },
      donationManager: {
        title: "Donation Manager",
        description:
          "Review, organize, and manage donation campaigns to publish on the home page.",
      },
    },

    stats: {
      administratorAccess: {
        title: "Administrator Access",
        value: "Verified",
        subtitle: "Role-based access confirmed",
      },
      workspace: {
        title: "Workspace",
        value: "Premium",
        subtitle: "Centralized operational control",
      },
      platformTools: {
        title: "Platform Tools",
        value: "Live",
        subtitle: "Manage key workflows instantly",
      },
    },

    welcome: "Welcome back",
  },
  es: {
    adminFallback: "Administrador",
    loadingTitle: "Cargando panel",
    loadingDescription: "Verificando acceso administrativo...",
    accessRestrictedTitle: "Acceso restringido",
    accessRestrictedDescription:
      "Este panel solo está disponible para administradores aprobados.",
    returnHome: "Regresar al Inicio",
    adminWorkspace: "Acceso Administrativo",
    dashboardTitle: "Panel Administrativo",
    dashboardDescription:
      "Gestiona operaciones, supervisa cuentas y mantén la plataforma organizada desde un centro de control elegante.",
    accessLevel: "Nivel de Acceso",
    approvedAdministrator: "Administrador Aprobado",
    openTool: "Abrir herramienta",

    sections: {
      toolsTitle: "Herramientas",
      toolsSubtitle:
        "Controles operacionales para los flujos principales de la plataforma",
      accessTitle: "Gestión de Usuarios y Accesos",
      accessSubtitle:
        "Administra usuarios, permisos y configuraciones administrativas",
      contentTitle: "Gestión de Contenido y Sitio Web",
      contentSubtitle:
        "Herramientas internas para administrar distintas secciones y contenido del sitio web.",
    },

    badges: {
      core: "Principal",
      reports: "Reportes",
      broadcast: "Difusión",
      account: "Cuenta",
      admin: "Admin",
      addOn: "Complemento",
      inProgress: "En Progreso",
    },

    cards: {
      events: {
        title: "Eventos",
        description:
          "Visualiza y administra eventos, confirma o cancela asistencia, y accede a reportes de asistencia e invitaciones.",
      },
      attendance: {
        title: "Asistencia",
        description:
          "Revisa y administra el historial de participación, verifica registros de asistencia y exporta reportes.",
      },
      announcements: {
        title: "Anuncios",
        description:
          "Publica actualizaciones importantes y mantén a los miembros informados con anuncios generales de la plataforma.",
      },
      profile: {
        title: "Perfil",
        description:
          "Actualiza tu perfil administrativo, información personal y configuraciones de cuenta.",
      },
      accountManager: {
        title: "Administrador de Cuentas",
        description:
          "Aprueba, suspende, revisa y administra el acceso de usuarios desde un solo lugar centralizado.",
      },
      initiativesManager: {
        title: "Administrador de Iniciativas",
        description:
          "Agrega fácilmente nuevas iniciativas, eventos, acciones comunitarias y recursos al sitio web.",
      },
      donationManager: {
        title: "Administrador de Donaciones",
        description:
          "Revisa, organiza y administra campañas de donación para publicarlas en la página de inicio.",
      },
    },

    stats: {
      administratorAccess: {
        title: "Acceso Administrativo",
        value: "Verificado",
        subtitle: "Acceso basado en rol confirmado",
      },
      workspace: {
        title: "Espacio de Trabajo",
        value: "Premium",
        subtitle: "Control operacional centralizado",
      },
      platformTools: {
        title: "Herramientas de Plataforma",
        value: "Activas",
        subtitle: "Gestiona flujos clave al instante",
      },
    },

    welcome: "Bienvenido de nuevo",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const t =
    dashboardTranslations[language as keyof typeof dashboardTranslations] ||
    dashboardTranslations.en;

  const [pageLoading, setPageLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [, setAdminName] = useState(t.adminFallback);
  const [, setProfile] = useState<ProfileRecord | null>(null);

  useEffect(() => {
    setAdminName((prev) =>
      prev === "Admin" || prev === "Administrador" ? t.adminFallback : prev
    );
  }, [t.adminFallback]);

  useEffect(() => {
    const validateAdminAccess = async () => {
      try {
        setPageLoading(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace("/login");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select(
            "first_name, last_name, role, is_approved, account_status, language_preference"
          )
          .eq("id", user.id)
          .maybeSingle<ProfileRecord>();

        if (profileError || !profile) {
          setAccessDenied(true);
          return;
        }

        setProfile(profile);

        const normalizedRole = (profile.role || "").toLowerCase();
        const isAdmin =
          normalizedRole === "admin" || normalizedRole === "super_admin";

        const isApproved = !!profile.is_approved;
        const isActive = profile.account_status !== "suspended";

        if (!isAdmin || !isApproved || !isActive) {
          setAccessDenied(true);
          return;
        }

        const fullName =
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
          t.adminFallback;

        setAdminName(fullName);
      } catch (error) {
        console.error("Dashboard access check error:", error);
        setAccessDenied(true);
      } finally {
        setPageLoading(false);
      }
    };

    validateAdminAccess();
  }, [router, t.adminFallback]);

  const tools = useMemo<DashboardCardItem[]>(
    () => [
      {
        title: t.cards.events.title,
        description: t.cards.events.description,
        icon: <CalendarDays size={24} />,
        badge: t.badges.core,
        onClick: () => router.push("/events"),
      },
      {
        title: t.cards.attendance.title,
        description: t.cards.attendance.description,
        icon: <ClipboardList size={24} />,
        badge: t.badges.reports,
        onClick: () => router.push("/attendance-report"),
      },
      {
        title: t.cards.announcements.title,
        description: t.cards.announcements.description,
        icon: <Megaphone size={24} />,
        badge: t.badges.broadcast,
        onClick: () => router.push("/admin-announcements"),
      },
    ],
    [router, t]
  );

  const accessTools = useMemo<DashboardCardItem[]>(
    () => [
      {
        title: t.cards.profile.title,
        description: t.cards.profile.description,
        icon: <UserCircle2 size={24} />,
        badge: t.badges.account,
        onClick: () => router.push("/profile"),
      },
      {
        title: t.cards.accountManager.title,
        description: t.cards.accountManager.description,
        icon: <Users size={24} />,
        badge: t.badges.admin,
        onClick: () => router.push("/account-manager"),
      },
    ],
    [router, t]
  );

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="rounded-4xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] px-10 py-12 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700 animate-pulse" />
            <h2 className="text-xl font-semibold text-slate-900">
              {t.loadingTitle}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              {t.loadingDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] flex flex-col py-4">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-lg w-full rounded-4xl border border-red-100 bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)] p-10 text-center">
            <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {t.accessRestrictedTitle}
            </h1>
            <p className="text-slate-500 mt-3 leading-relaxed">
              {t.accessRestrictedDescription}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 text-white font-medium shadow-lg hover:shadow-xl transition"
            >
              {t.returnHome}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] flex flex-col pt-20">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-6 pb-10 space-y-8">
          <div className="-mt-10 relative overflow-hidden rounded-4xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_20%)] pointer-events-none" />

            <div className="relative p-6 md:p-8 lg:p-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="min-w-30 my-auto mx-4 hidden sm:hidden md:block lg:block">
                  <div className="p-1.5 border border-solid shadow-xl rounded-full bg-white border-slate-300 m-auto">
                    <div className="m-auto border rounded-full bg-linear-to-br from-[#0d4db0] to-blue-700 shadow-xl w-26 h-26 flex justify-center items-center">
                      <Image
                        src="/logo-title-2.png"
                        alt="Paso Libre Logo"
                        width={140}
                        height={80}
                        className="rounded-xl object-contain m-auto scale-160"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
                    <Sparkles size={14} />
                    {t.adminWorkspace}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                    {t.dashboardTitle}
                  </h1>
                  <p className="text-slate-500 mt-2 max-w-2xl">
                    {t.dashboardDescription}
                  </p>
                </div>
              </div>

              {/* <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md px-5 py-4 shadow-sm min-w-65">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <LayoutDashboard size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
                      {t.accessLevel}
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {t.approvedAdministrator}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statCards.map((card) => (
              <StatCard
                key={card.title}
                title={card.title}
                value={card.value}
                subtitle={card.subtitle}
                icon={card.icon}
              />
            ))}
          </div> */}

          {/* <WelcomePanel adminName={adminName} welcomeLabel={t.welcome} /> */}

          <DashboardSection
            title={t.sections.toolsTitle}
            subtitle={t.sections.toolsSubtitle}
          >
            {tools.map((item) => (
              <PremiumDashboardCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                badge={item.badge}
                openToolLabel={t.openTool}
                onClick={item.onClick}
              />
            ))}
          </DashboardSection>

          <DashboardSection
            title={t.sections.accessTitle}
            subtitle={t.sections.accessSubtitle}
          >
            {accessTools.map((item) => (
              <PremiumDashboardCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                badge={item.badge}
                openToolLabel={t.openTool}
                onClick={item.onClick}
              />
            ))}
          </DashboardSection>

          {/* ================= CONTENT MANAGEMENT ================= */}

          {/* TODO: IN CONSTRUCTION */}

          <DashboardSection
            title={t.sections.contentTitle}
            subtitle={t.sections.contentSubtitle}
          >
            {/* <PremiumDashboardCard
              title={language === "es" ? "Formularios" : "Forms"}
              description={
                language === "es"
                  ? "Crea y administra formularios dinámicos."
                  : "Create and manage dynamic forms."
              }
              icon={<GoChecklist size={24} />}
              badge={t.badges.inProgress}
              openToolLabel={t.openTool}
              onClick={() => router.push("/forms")}
            /> */}

            {/* <PremiumDashboardCard
              title={
                language === "es"
                  ? "Gestión de Contenido"
                  : "Content Management"
              }
              description={
                language === "es"
                  ? "Edita textos y medios del sitio web desde las páginas de inicio, sobre nosotros y contacto."
                  : "Edit website text and media from homepage, about, and contact pages."
              }
              icon={<TbTemplate size={24} />}
              badge={t.badges.inProgress}
              openToolLabel={t.openTool}
              onClick={() => router.push("/content-management")}
            /> */}

            <PremiumDashboardCard
              title={t.cards.initiativesManager.title}
              description={t.cards.initiativesManager.description}
              icon={<FaRegLightbulb size={24} />}
              badge={t.badges.addOn}
              openToolLabel={t.openTool}
              onClick={() => router.push("/admin-initiatives")}
            />

            <PremiumDashboardCard
              title={t.cards.donationManager.title}
              description={t.cards.donationManager.description}
              icon={<GoChecklist size={24} />}
              badge={t.badges.addOn}
              openToolLabel={t.openTool}
              onClick={() => router.push("/admin-donations")}
            />

            {/* <PremiumDashboardCard
              title={
                language === "es"
                  ? "Recursos de Salud"
                  : "Health Resources"
              }
              description={
                language === "es"
                  ? "Administra recursos y materiales de salud comunitaria."
                  : "Manage community health resources and materials."
              }
              icon={<FaHeartbeat size={24} />}
              badge={t.badges.inProgress}
              openToolLabel={t.openTool}
              onClick={() => router.push("/manage-resources")}
            />

            <PremiumDashboardCard
              title={
                language === "es"
                  ? "Recursos de Afirmación de Género"
                  : "Gender-Affirming Resources"
              }
              description={
                language === "es"
                  ? "Administra servicios, clínicas e información de afirmación de género."
                  : "Manage gender-affirming services, clinics, and information."
              }
              icon={<RiGenderlessLine size={24} />}
              badge={t.badges.inProgress}
              openToolLabel={t.openTool}
              onClick={() => router.push("/manage-gender-affirming")}
            />

            <PremiumDashboardCard
              title={
                language === "es"
                  ? "Retroalimentación Comunitaria"
                  : "Community Feedback"
              }
              description={
                language === "es"
                  ? "Revisa y aprueba comentarios enviados por la comunidad."
                  : "Review and approve submitted community feedback."
              }
              icon={<MdOutlineRateReview size={24} />}
              badge={t.badges.inProgress}
              openToolLabel={t.openTool}
              onClick={() => router.push("/manage-community-feedback")}
            /> */}
          </DashboardSection>

          {/* <AdminHelpGuide /> */}

          <div className="pt-10">{/* <ITSupportFooter /> */}</div>
        </div>
      </main>
    </div>
  );
}

export function WelcomePanel({
  adminName,
  welcomeLabel,
}: {
  adminName: string;
  welcomeLabel: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50/70 p-6 md:p-7 shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_25%)] pointer-events-none" />
      <div className="relative">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
          {welcomeLabel}, {adminName} 👋
        </h2>
      </div>
    </div>
  );
}

export function DashboardSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}

export function PremiumDashboardCard({
  title,
  description,
  icon,
  onClick,
  badge,
  openToolLabel,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  openToolLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:shadow-[0_26px_70px_rgba(59,130,246,0.14)] hover:-translate-y-1 transition-all duration-300 p-6 text-left cursor-pointer"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_26%)] opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center shadow-sm">
            {icon}
          </div>

          {badge && (
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
              {badge}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-xl tracking-tight text-slate-900 mt-5">
          {title}
        </h3>

        <p className="text-slate-500 mt-2 leading-relaxed text-sm">
          {description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-700">
          {openToolLabel}
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </div>
      </div>
    </button>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">{value}</p>
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
