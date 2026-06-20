"use client";
import Image from "next/image";
import { Camera, MapPin, Phone, Save, UserRound, X, Check } from "lucide-react";
import { BsGenderTrans } from "react-icons/bs";
import { HiOutlineGlobeAmericas } from "react-icons/hi2";
import { RiUserHeartLine } from "react-icons/ri";
import { BsPostageHeart } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import { BsSuitcaseLg } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";

// import { useLanguage } from "../context/language";
import { TbRainbow } from "react-icons/tb";

type ProfileState = {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  pronouns: string;
  dob: string;
  city: string;
  country: string;
  sexualOrientation: string;
  race: string;
  nationality: string;
  languagePreference: string;
  occupation: string;
  profilePicture: string;
  createdAt: string;
};

type EditProfileOffCanvasProps = {
  open: boolean;
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  handleFieldChange: (key: keyof ProfileState, value: string) => void;
  handleSave: () => void;
  saveLoading: boolean;
  uploadingAvatar: boolean;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  avatarLabel: string;
  onClose: () => void;
  language: string;
  t: Record<string, string>;
};

const genderOptions = [
  {
    value: "Cis Woman",
    en: "Cis Woman",
    es: "Mujer Cisgénero",
  },
  {
    value: "Cis Man",
    en: "Cis Man",
    es: "Hombre Cisgénero",
  },
  {
    value: "Non-binary",
    en: "Non-binary",
    es: "No Binario",
  },
  {
    value: "Trans Woman",
    en: "Trans Woman",
    es: "Mujer Trans",
  },
  {
    value: "Trans Man",
    en: "Trans Man",
    es: "Hombre Trans",
  },
  {
    value: "Genderqueer",
    en: "Genderqueer",
    es: "Genderqueer",
  },
  {
    value: "Genderfluid",
    en: "Genderfluid",
    es: "Género Fluido",
  },
  {
    value: "Agender",
    en: "Agender",
    es: "Agénero",
  },
  {
    value: "Two-Spirit",
    en: "Two-Spirit",
    es: "Dos Espíritus",
  },
  {
    value: "Intersex",
    en: "Intersex",
    es: "Intersexual",
  },
  {
    value: "Prefer to self-describe",
    en: "Prefer to self-describe",
    es: "Prefiero describirme",
  },
  {
    value: "Prefer not to say",
    en: "Prefer not to say",
    es: "Prefiero no decirlo",
  },
];

const pronounOptions = [
  {
    value: "he/him",
    en: "he/him",
    es: "él",
  },
  {
    value: "she/her",
    en: "she/her",
    es: "ella",
  },
  {
    value: "they/them",
    en: "they/them",
    es: "elle",
  },
  {
    value: "other",
    en: "Other",
    es: "Otro",
  },
];

const sexualOrientationOptions = [
  {
    value: "Heterosexual",
    en: "Heterosexual",
    es: "Heterosexual",
  },
  {
    value: "Gay",
    en: "Gay",
    es: "Gay",
  },
  {
    value: "Lesbian",
    en: "Lesbian",
    es: "Lesbiana",
  },
  {
    value: "Bisexual",
    en: "Bisexual",
    es: "Bisexual",
  },
  {
    value: "Pansexual",
    en: "Pansexual",
    es: "Pansexual",
  },
  {
    value: "Demisexual",
    en: "Demisexual",
    es: "Demisexual",
  },
  {
    value: "Sapiosexual",
    en: "Sapiosexual",
    es: "Sapiosexual",
  },
  {
    value: "Asexual",
    en: "Asexual",
    es: "Asexual",
  },
  {
    value: "Heteroflexible",
    en: "Heteroflexible",
    es: "Heteroflexible",
  },
  {
    value: "Bicurious",
    en: "Bicurious",
    es: "Bicuriose",
  },
  {
    value: "Queer",
    en: "Queer",
    es: "Queer",
  },
  {
    value: "Questioning",
    en: "Questioning",
    es: "Cuestionando",
  },
  {
    value: "Other",
    en: "Other",
    es: "Otro",
  },
  {
    value: "Prefer not to say",
    en: "Prefer not to say",
    es: "Prefiero no decirlo",
  },
];

const raceOptions = [
  {
    value: "Native American or Alaska Native",
    en: "Native American or Alaska Native",
    es: "Nativo Americano o Nativo de Alaska",
  },
  {
    value: "Asian",
    en: "Asian",
    es: "Asiático",
  },
  {
    value: "Black or African American",
    en: "Black or African American",
    es: "Negro o Afroamericano",
  },
  {
    value: "Hispanic/Latinx",
    en: "Hispanic/Latinx",
    es: "Hispano/Latinx",
  },
  {
    value: "Middle Eastern",
    en: "Middle Eastern",
    es: "Medio Oriente",
  },
  {
    value: "Native Hawaiian or Other Pacific Islander",
    en: "Native Hawaiian or Other Pacific Islander",
    es: "Nativo Hawaiano u Otro Isleño del Pacífico",
  },
  {
    value: "White",
    en: "White",
    es: "Blanco",
  },
  {
    value: "Two or more races",
    en: "Two or more races",
    es: "Dos o más razas",
  },
  {
    value: "Another race or ethnicity",
    en: "Another race or ethnicity",
    es: "Otra raza o etnicidad",
  },
  {
    value: "Prefer not to say",
    en: "Prefer not to say",
    es: "Prefiero no decirlo",
  },
];

const splitMultiValue = (value: string) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function EditProfileOffCanvas({
  open,
  profile,
  handleFieldChange,
  handleSave,
  saveLoading,
  uploadingAvatar,
  handleAvatarChange,
  fileInputRef,
  avatarLabel,
  onClose,
  language,
  t,
}: EditProfileOffCanvasProps) {
  // const { setLanguage } = useLanguage();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-90 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-white/60 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
        <div className="relative overflow-hidden border-b border-slate-100 bg-linear-to-br from-[#0d4db0] via-blue-700 to-indigo-800 px-6 py-6 text-white">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                {t.profileDetails}
              </p>
              <h2 className="mt-1 text-2xl font-semibold">{t.editProfile}</h2>
              <p className="mt-1 text-sm text-blue-100">
                {t.profileDetailsSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_30%),linear-gradient(to_bottom,#f8fafc,#ffffff)] px-5 py-6 md:px-6">
          <section className="mb-5 rounded-4xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div
                className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-3xl border-4 border-white bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-xl"
                onClick={() => {
                  if (!uploadingAvatar) fileInputRef.current?.click();
                }}
              >
                {profile.profilePicture ? (
                  <Image
                    src={profile.profilePicture}
                    alt="Profile Picture"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-3xl font-semibold">
                      {avatarLabel}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-950">
                  {`${profile.firstName} ${profile.lastName}`.trim() || "—"}
                </h3>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {profile.email || t.noEmail}
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                >
                  <Camera size={14} />
                  {uploadingAvatar ? t.uploading : t.changePhoto}
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProfileField
              label={t.firstName}
              value={profile.firstName}
              onChange={(value) => handleFieldChange("firstName", value)}
              icon={<UserRound size={16} />}
            />

            <ProfileField
              label={t.lastName}
              value={profile.lastName}
              onChange={(value) => handleFieldChange("lastName", value)}
              icon={<UserRound size={16} />}
            />

            <ProfileField
              label={t.phone}
              value={profile.phone}
              onChange={(value) => handleFieldChange("phone", value)}
              type="tel"
              icon={<Phone size={16} />}
            />

            <ProfileField
              label={t.city}
              value={profile.city}
              onChange={(value) => handleFieldChange("city", value)}
              icon={<MapPin size={16} />}
            />

            <ProfileField
              label={t.country}
              value={profile.country}
              onChange={(value) => handleFieldChange("country", value)}
              icon={<MapPin size={16} />}
            />

            <SelectWithOptionalCustom
              language={profile.languagePreference}
              label={t.gender}
              value={profile.gender}
              onChange={(value) => handleFieldChange("gender", value)}
              icon={<BsGenderTrans size={16} />}
              options={genderOptions}
              placeholder={`${t.select} ${t.gender}`}
              customTriggerValue="Prefer to self-describe"
              customPlaceholder={
                language === "es"
                  ? "Describe tu género"
                  : "Self-describe your gender"
              }
            />

            <MultiSelectField
              language={profile.languagePreference}
              label={t.pronouns}
              value={profile.pronouns}
              onChange={(value) => handleFieldChange("pronouns", value)}
              icon={<TbRainbow size={16} />}
              options={pronounOptions}
              placeholder={`${t.select} ${t.pronouns}`}
            />

            <SelectWithOptionalCustom
              language={profile.languagePreference}
              label={t.sexualOrientation}
              value={profile.sexualOrientation}
              onChange={(value) =>
                handleFieldChange("sexualOrientation", value)
              }
              icon={<RiUserHeartLine size={16} />}
              options={sexualOrientationOptions}
              placeholder={`${t.select} ${t.sexualOrientation}`}
              customTriggerValue="Other"
              customPlaceholder={
                language === "es"
                  ? "Especifica tu orientación"
                  : "Specify your orientation"
              }
            />

            <ProfileField
              label={t.dob}
              value={profile.dob}
              onChange={(value) => handleFieldChange("dob", value)}
              type="date"
              icon={<LuCalendarDays size={16} />}
            />

            <ProfileField
              label={t.occupation}
              value={profile.occupation}
              onChange={(value) => handleFieldChange("occupation", value)}
              icon={<BsSuitcaseLg size={16} />}
            />

            <SelectWithOptionalCustom
              language={profile.languagePreference}
              label={t.race}
              value={profile.race}
              onChange={(value) => handleFieldChange("race", value)}
              icon={<HiOutlineGlobeAmericas size={16} />}
              options={raceOptions}
              placeholder={`${t.select} ${t.race}`}
              customTriggerValue="Another race or ethnicity"
              customPlaceholder={
                language === "es"
                  ? "Especifica tu raza o etnicidad"
                  : "Specify race or ethnicity"
              }
            />

            <ProfileField
              label={t.nationality}
              value={profile.nationality}
              onChange={(value) => handleFieldChange("nationality", value)}
              icon={<BsPostageHeart size={16} />}
            />

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="text-blue-700">
                  <GrLanguage size={16} />
                </span>
                {t.languagePreference}
              </label>

              <select
                value={profile.languagePreference}
                onChange={(event) => {
                  handleFieldChange("languagePreference", event.target.value);

                  // setLanguage(event.target.value as "en" | "es");
                }}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  {t.select} {t.languagePreference}
                </option>
                <option value="en">
                  {language === "es" ? "Inglés" : "English"}
                </option>
                <option value="es">
                  {language === "es" ? "Español" : "Spanish"}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white/95 px-5 py-4">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              {language === "es" ? "Cancelar" : "Cancel"}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saveLoading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-500 via-blue-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {saveLoading ? t.saving : t.saveChanges}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProfileField({
  label,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  type?: "text" | "tel" | "date";
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
        <span className="text-blue-700">{icon}</span>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

type OptionType = {
  value: string;
  en: string;
  es: string;
};

function SelectWithOptionalCustom({
  label,
  value,
  onChange,
  icon,
  options,
  placeholder,
  customTriggerValue,
  customPlaceholder,
  language,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  options: OptionType[];
  placeholder: string;
  customTriggerValue: string;
  customPlaceholder: string;
  language: string;
}) {
  const isKnownOption = options.some((o) => o.value === value);

  const shouldShowCustom =
    value === customTriggerValue || (!!value && !isKnownOption);

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
        <span className="text-blue-700">{icon}</span>
        {label}
      </label>

      <select
        value={
          isKnownOption ? value : shouldShowCustom ? customTriggerValue : ""
        }
        onChange={(event) => {
          const nextValue = event.target.value;

          if (nextValue === customTriggerValue) {
            onChange("");
            return;
          }

          onChange(nextValue);
        }}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {language === "es" ? option.es : option.en}
          </option>
        ))}
      </select>

      {shouldShowCustom && (
        <input
          type="text"
          value={value === customTriggerValue ? "" : value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={customPlaceholder}
          className="mt-3 h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      )}
    </div>
  );
}

function MultiSelectField({
  label,
  value,
  onChange,
  icon,
  options,
  placeholder,
  language,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  options: OptionType[];
  placeholder: string;
  language: string;
}) {
  const selectedValues = splitMultiValue(value);

  const toggleOption = (optionValue: string) => {
    const exists = selectedValues.includes(optionValue);

    const nextValues = exists
      ? selectedValues.filter((item) => item !== optionValue)
      : [...selectedValues, optionValue];

    onChange(nextValues.join(", "));
  };

  return (
    <div className="md:col-span-2">
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
        <span className="text-blue-700">{icon}</span>
        {label}
      </label>

      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        {selectedValues.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {selectedValues.map((item) => {
              const option = options.find((o) => o.value === item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleOption(item)}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                >
                  {language === "es" ? option?.es : option?.en}
                  <X size={12} />
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mb-3 text-sm text-slate-400">{placeholder}</p>
        )}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "border-blue-200 bg-blue-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {isSelected && <Check size={14} />}
                {language === "es" ? option.es : option.en}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
