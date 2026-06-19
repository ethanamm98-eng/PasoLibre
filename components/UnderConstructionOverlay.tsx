"use client";
import { Construction, Sparkles } from "lucide-react";

type UnderConstructionOverlayProps = {
  title?: string;
  description?: string;
  show?: boolean;
};

export default function UnderConstructionOverlay({
  title = "Under Construction",
  description = "This page is being improved and will be available soon.",
  show = true,
}: UnderConstructionOverlayProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-999 flex min-h-full items-center justify-center overflow-hidden rounded-[inherit] bg-white/75 px-4 py-10 backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,77,176,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.18),transparent_28%)]" />

      <div className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/80 bg-white/90 p-6 text-center shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-amber-100 via-yellow-50 to-blue-50 text-amber-600 shadow-sm">
          <Construction size={34} />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#0d4db0]">
          <Sparkles size={13} />
          Coming Soon
        </div>

        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}