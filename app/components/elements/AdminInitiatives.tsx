import { ReactNode } from "react";

export function StepPanel({
  title,
  description,
  tone,
  children,
}: {
  title: string;
  description: string;
  tone: "blue" | "indigo" | "amber" | "purple";
  children: ReactNode;
}) {
  const toneClasses = {
    blue: "border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50",
    indigo: "border-indigo-100 bg-linear-to-br from-indigo-50 to-blue-50",
    amber: "border-amber-100 bg-linear-to-br from-amber-50 to-orange-50",
    purple: "border-purple-100 bg-linear-to-br from-purple-50 to-indigo-50",
  };

  return (
    <div className="space-y-5">
      <div className={`rounded-3xl border p-5 ${toneClasses[tone]}`}>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      <div className="space-y-5">{children}</div>
    </div>
  );
}

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-solid border-slate-300 bg-white px-4 py-3 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="text-lg font-bold text-blue-900 text-center">{value}</p>
    </div>
  );
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  onFocus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  onFocus?: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
      >
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
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

export function Badge({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
      }`}
    >
      {children}
    </span>
  );
}

export function TypeBadge({
  type,
  small,
}: {
  type?: string | null;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-blue-50 font-semibold text-[#0d4db0] ring-1 ring-blue-100 capitalize ${
        small ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs"
      }`}
    >
      {type || "info"}
    </span>
  );
}

export function SourceBadge({
  source,
  small,
}: {
  source?: string | null;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-indigo-50 font-semibold text-indigo-700 ring-1 ring-indigo-100 ${
        small ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs"
      }`}
    >
      {source === "event" ? "Event Source" : "Custom Source"}
    </span>
  );
}

export function MiniBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
      {label}
    </span>
  );
}
