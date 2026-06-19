import Image from "next/image";

export function ParticipantAvatar({
  name,
  profilePicture,
  initials,
  size = "desktop",
}: {
  name: string;
  profilePicture: string;
  initials: string;
  size?: "desktop" | "mobile";
}) {
  const sizeClass = size === "mobile" ? "h-12 w-12" : "h-10 w-10";
  const radiusClass = size === "mobile" ? "rounded-2xl" : "rounded-2xl";

  if (profilePicture) {
    return (
      <div
        className={`${sizeClass} ${radiusClass} relative shrink-0 overflow-hidden border border-white bg-slate-100 shadow-sm ring-2 ring-blue-50`}
      >
        <Image
          src={profilePicture}
          alt={`${name} profile picture`}
          fill
          sizes={size === "mobile" ? "48px" : "40px"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} ${radiusClass} flex shrink-0 items-center justify-center bg-linear-to-br from-blue-600 to-indigo-700 text-xs font-semibold text-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

export function StatusBadge({
  status,
  language = "en",
  attendanceReportCopy,
  getLanguageKey,
}: {
  status: "registered" | "attended" | "no_show" | "cancelled";
  language?: string;
  attendanceReportCopy: Record<string, { statuses: Record<string, string> }>;
  getLanguageKey: (language: string) => string;
}) {
  const styles = {
    registered: "border-blue-100 bg-blue-50 text-blue-700",
    attended: "border-emerald-100 bg-emerald-50 text-emerald-700",
    no_show: "border-amber-100 bg-amber-50 text-amber-700",
    cancelled: "border-rose-100 bg-rose-50 text-rose-700",
  };

  const labels = attendanceReportCopy[getLanguageKey(language)].statuses;

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export function StatCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 truncate text-2xl font-semibold text-slate-900">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

export function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </label>
      <textarea
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

export function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
