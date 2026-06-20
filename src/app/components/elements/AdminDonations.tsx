import { EyeOff } from "lucide-react";

export function Stepper({
  currentStep,
  language,
}: {
  currentStep: number;
  language: string;
}) {
  const steps = [
    { id: 1, label: language === "en" ? "Links" : "Enlaces" },
    { id: 2, label: language === "en" ? "Content" : "Contenido" },
    { id: 3, label: language === "en" ? "Image" : "Imagen" },
  ];

  return (
    <div className="mb-6 grid grid-cols-3 gap-2">
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isComplete = currentStep > step.id;

        return (
          <div
            key={step.id}
            className={`rounded-2xl border px-1.5 md:px-3 py-3 text-center transition ${
              isActive
                ? "border-[#0d4db0]/30 bg-blue-50 text-[#0d4db0]"
                : isComplete
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-slate-300 bg-white text-slate-400"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em]">
              {language === "en" ? "Step" : "Paso"} {step.id}
            </p>
            <p className="mt-1 text-xs md:text-sm font-semibol truncate">
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function StepPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {children}
    </div>
  );
}

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-center shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="text-lg font-semibold text-[#0d4db0]">{value}</p>
    </div>
  );
}

export function Badge({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-50 text-slate-500"
      }`}
    >
      {children}
    </span>
  );
}

export function ToggleRow({
  title,
  subtitle,
  checked,
  onToggle,
}: {
  title: string;
  subtitle: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between gap-2 md:gap-4 rounded-2xl border p-3 md:p-4 text-left transition cursor-pointer ${
        checked
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="max-w-[60%]">
        <p className="font-semibold text-slate-800 md:text-lg text-sm">
          {title}
        </p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <span
        className={`relative h-5.75 w-10 md:h-7 md:w-12 rounded-full transition ${
          checked ? "bg-[#0d4db0]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white shadow transition ${
            checked ? "left-5 md:left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}

export function NoCampaignStripPreview() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <EyeOff className="h-5 w-5" />
      </div>
      <p className="font-semibold text-slate-700">Preview hidden</p>
      <p className="mt-2 text-sm text-slate-500">
        Activate the campaign to preview the public donation card.
      </p>
    </div>
  );
}
