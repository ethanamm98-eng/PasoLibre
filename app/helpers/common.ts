export const normalizeEmail = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

export const normalizePhone = (value?: string | null) =>
  String(value || "").replace(/[^\d+]/g, "");

export const getInitials = (name: string) =>
  String(name || "U")
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function formatDateLabel(dateValue: string | null) {
  if (!dateValue) return "No date";
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
