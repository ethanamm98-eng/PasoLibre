import { AlertCircle, TriangleAlert, Sparkles, Info } from "lucide-react";
import { AnnouncementForm } from "../lib/interfaces/announcements";

///////////////////////////////////////////////////////////////////////////

export const emptyForm: AnnouncementForm = {
  title: "",
  message: "",
  cta_label: "",
  cta_url: "",
  variant: "info",
  status: "important",
  color: "blue",
  is_active: true,
  show_on_home: true,
  starts_at: "",
  ends_at: "",
};

export function getVariantMeta(variant?: string) {
  switch (variant) {
    case "urgent":
      return { icon: <TriangleAlert className="w-4 h-4" /> };
    case "warning":
      return { icon: <AlertCircle className="w-4 h-4" /> };
    case "success":
      return { icon: <Sparkles className="w-4 h-4" /> };
    default:
      return { icon: <Info className="w-4 h-4" /> };
  }
}

export function getAnnouncementTheme(color?: string) {
  switch (color) {
    case "indigo":
      return {
        pill: "bg-indigo-500/15 text-indigo-100 border-indigo-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-indigo-500/20 via-violet-500/10 to-transparent",
        button: "bg-white text-indigo-700 hover:bg-indigo-50",
        previewBg: "from-indigo-700 to-slate-900",
      };
    case "emerald":
      return {
        pill: "bg-emerald-500/15 text-emerald-100 border-emerald-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-emerald-500/20 via-teal-500/10 to-transparent",
        button: "bg-white text-emerald-700 hover:bg-emerald-50",
        previewBg: "from-emerald-700 to-slate-900",
      };
    case "amber":
      return {
        pill: "bg-amber-500/15 text-amber-100 border-amber-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-amber-500/20 via-yellow-500/10 to-transparent",
        button: "bg-white text-amber-700 hover:bg-amber-50",
        previewBg: "from-amber-600 to-slate-900",
      };
    case "rose":
      return {
        pill: "bg-rose-500/15 text-rose-100 border-rose-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-rose-500/20 via-pink-500/10 to-transparent",
        button: "bg-white text-rose-700 hover:bg-rose-50",
        previewBg: "from-rose-700 to-slate-900",
      };
    case "slate":
      return {
        pill: "bg-slate-500/15 text-slate-100 border-slate-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-slate-500/20 via-slate-400/10 to-transparent",
        button: "bg-white text-slate-700 hover:bg-slate-50",
        previewBg: "from-slate-700 to-slate-950",
      };
    default:
      return {
        pill: "bg-sky-500/15 text-sky-100 border-sky-300/20",
        softPill: "bg-white/10 text-white/85 border-white/15",
        glow: "from-sky-500/20 via-indigo-500/10 to-transparent",
        button: "bg-white text-[#0d4db0] hover:bg-sky-50",
        previewBg: "from-[#0d4db0] to-slate-900",
      };
  }
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
