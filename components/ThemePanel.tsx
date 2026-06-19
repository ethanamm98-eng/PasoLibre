import { Dispatch, SetStateAction } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import FloatingLabelSelect from "./elements/FloatingLabelSelect";

type FontValue = "Inter" | "Roboto" | "Poppins" | "Montserrat";

type SizeValue = "12px" | "14px" | "16px" | "18px" | "24px" | "32px";

type ThemeConfig = {
  headerFont: FontValue;
  headerSize: SizeValue;
  questionFont: FontValue;
  questionSize: SizeValue;
  textFont: FontValue;
  textSize: SizeValue;
  headerImage?: File | null;
  backgroundColor: string;
  dividerColor: string;
};

type ThemeKey = keyof ThemeConfig;

type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

type TextStyleRow = {
  label: string;
  fontKey: "headerFont" | "questionFont" | "textFont";
  sizeKey: "headerSize" | "questionSize" | "textSize";
};

type ThemePanelProps = {
  open: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  setTheme: Dispatch<SetStateAction<ThemeConfig>>;
};

const FONTS: SelectOption<FontValue>[] = [
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Poppins", value: "Poppins" },
  { label: "Montserrat", value: "Montserrat" },
];

const SIZES: SelectOption<SizeValue>[] = [
  { label: "12 px", value: "12px" },
  { label: "14 px", value: "14px" },
  { label: "16 px", value: "16px" },
  { label: "18 px", value: "18px" },
  { label: "24 px", value: "24px" },
  { label: "32 px", value: "32px" },
];

const TEXT_STYLE_ROWS: TextStyleRow[] = [
  {
    label: "Header",
    fontKey: "headerFont",
    sizeKey: "headerSize",
  },
  {
    label: "Question",
    fontKey: "questionFont",
    sizeKey: "questionSize",
  },
  {
    label: "Text",
    fontKey: "textFont",
    sizeKey: "textSize",
  },
];

export type { ThemeConfig, FontValue, SizeValue };

export function ThemePanel({
  open,
  onClose,
  theme,
  setTheme,
}: ThemePanelProps) {
  const update = <K extends ThemeKey>(key: K, value: ThemeConfig[K]) => {
    setTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close theme panel"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-90 transform bg-white shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <IoColorPaletteOutline className="h-5 w-5 text-blue-600" />
            Theme
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl font-medium leading-none text-gray-500 transition hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <div className="h-full space-y-10 overflow-y-auto px-6 py-6">
          <section className="space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Text style
            </h3>

            {TEXT_STYLE_ROWS.map(({ label, fontKey, sizeKey }) => (
              <div key={label} className="space-y-3">
                <p className="text-sm font-medium text-gray-700">{label}</p>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <FloatingLabelSelect
                      id={`${fontKey}-font`}
                      name={`${fontKey}-font`}
                      label="Font"
                      value={theme[fontKey]}
                      onChange={(e) =>
                        update(fontKey, e.target.value as FontValue)
                      }
                      options={FONTS}
                    />
                  </div>

                  <div className="w-27.5">
                    <FloatingLabelSelect
                      id={`${sizeKey}-size`}
                      name={`${sizeKey}-size`}
                      label="Size"
                      value={theme[sizeKey]}
                      onChange={(e) =>
                        update(sizeKey, e.target.value as SizeValue)
                      }
                      options={SIZES}
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Header
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Header image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  update("headerImage", e.target.files?.[0] ?? null)
                }
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-md file:border-0
                  file:bg-blue-50 file:px-4 file:py-2
                  file:text-sm file:font-medium
                  file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Colors
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Background
              </span>

              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => update("backgroundColor", e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-200"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Section divider
              </span>

              <input
                type="color"
                value={theme.dividerColor}
                onChange={(e) => update("dividerColor", e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-200"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
