"use client";

import { useState } from "react";
import {
  FaRegQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  UserRound,
  Users,
  LayoutTemplate,
  HeartPulse,
  Sparkles,
  MessageSquareMore,
} from "lucide-react";

export default function AdminHelpGuide() {
  const [open] = useState(false);

  const sections = [
    {
      title: "Events",
      description:
        "Create, edit, and manage scheduled events. This controls the public event calendar.",
      icon: <CalendarDays size={18} />,
    },
    {
      title: "Attendance",
      description:
        "View attendance records and export reports for tracking participation.",
      icon: <ClipboardList size={18} />,
    },
    {
      title: "Forms",
      description: "Create and manage dynamic forms used across the platform.",
      icon: <FileText size={18} />,
    },
    {
      title: "Profile",
      description:
        "Update your administrator profile and organization details.",
      icon: <UserRound size={18} />,
    },
    {
      title: "Account Manager",
      description: "Manage user roles, permissions, and platform access.",
      icon: <Users size={18} />,
    },
    {
      title: "Content Management",
      description: "Update static pages, homepage content, and site templates.",
      icon: <LayoutTemplate size={18} />,
    },
    {
      title: "Health Resources",
      description:
        "Add or edit community health providers and informational materials.",
      icon: <HeartPulse size={18} />,
    },
    {
      title: "Gender-Affirming Resources",
      description:
        "Manage gender-affirming clinics, services, and supportive resources.",
      icon: <Sparkles size={18} />,
    },
    {
      title: "Community Feedback",
      description: "Review, approve, or moderate submitted community comments.",
      icon: <MessageSquareMore size={18} />,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/88 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_18%)] pointer-events-none" />

      <div className="relative p-6 md:p-7">
        <button
          // onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shadow-sm">
              <FaRegQuestionCircle className="text-xl" />
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                Admin Help Guide
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Quick guidance for the main areas of your admin workspace
              </p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-500 flex items-center justify-center shadow-sm">
            {open ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </div>
        </button>

        {open && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm leading-relaxed">
            {sections.map((section) => (
              <GuideSection
                key={section.title}
                title={section.title}
                description={section.description}
                icon={section.icon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GuideSection({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-white/90 px-5 py-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-50 text-blue-700 border border-slate-200 flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="mt-1.5 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
