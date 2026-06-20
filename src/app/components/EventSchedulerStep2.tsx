"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useLanguage } from "../context/language";
import { Section } from "./EventSchedulerForm";
import { SchedulerForm } from "../lib/interfaces/events";

import { RichTextField } from "./RichTextEditor";
import FloatingLabelSelect from "./elements/FloatingLabelSelect";
import FloatingLabelInput from "./elements/FloatingLabelInput";

type ProfileOption = {
  id: string;
  name?: string;
  label?: string;
  email?: string;
};

type PersonOption = {
  id: string;
  name: string;
  label: string;
  email?: string;
};

const translations = {
  en: {
    eventDetails: "Event Details",
    eventLanguage: "Event Language",
    eventLanguageDescription:
      "Add the event title and description in both English and Spanish.",
    eventName: "Event Name",
    description: "Description",
    eventType: "Event Type",
    hostHelper: "Optionally add who will be hosting this event",
    hosts: "Host(s)",
    instructorHelper: "Optionally add who will be instructing this event",
    instructors: "Instructor(s)",
    totalDonations: "Total Donations Collected (USD)",
    loadingProfiles: "Loading profiles...",
    noProfilesFound: "No profiles found.",
    eventTypes: {
      social: "Social",
      charity: "Charity & Fundraising",
      sports: "Sports & Fitness",
      corporate: "Corporate",
      educational: "Educational",
      cultural: "Cultural & Entertainment",
      virtual: "Virtual",
      promotional: "Promotional",
      other: "Other",
    },
  },
  es: {
    eventDetails: "Detalles del Evento",
    eventLanguage: "Idioma del Evento",
    eventLanguageDescription:
      "Agrega el título y la descripción del evento en inglés y español.",
    eventName: "Nombre del Evento",
    description: "Descripción",
    eventType: "Tipo de Evento",
    hostHelper: "Opcionalmente agrega quién estará organizando este evento",
    hosts: "Anfitrión(es)",
    instructorHelper:
      "Opcionalmente agrega quién estará instruyendo este evento",
    instructors: "Instructor(es)",
    totalDonations: "Total de Donaciones Recaudadas (USD)",
    loadingProfiles: "Cargando perfiles...",
    noProfilesFound: "No se encontraron perfiles.",
    eventTypes: {
      social: "Social",
      charity: "Caridad y Recaudación de Fondos",
      sports: "Deportes y Bienestar",
      corporate: "Corporativo",
      educational: "Educativo",
      cultural: "Cultural y Entretenimiento",
      virtual: "Virtual",
      promotional: "Promocional",
      other: "Otro",
    },
  },
};

const normalizePerson = (option: ProfileOption): PersonOption => ({
  id: option.id,
  name: option.name || option.label || "",
  label: option.label || option.name || "",
  email: option.email || "",
});

const normalizeSelectedPeople = (
  people: (ProfileOption | string)[] = []
): PersonOption[] =>
  people.map((person) =>
    typeof person === "string"
      ? { id: person, name: person, label: person, email: "" }
      : {
          id: person.id,
          name: person.name || person.label || "",
          label: person.label || person.name || "",
          email: person.email || "",
        }
  );

const PeopleMultiSelect = ({
  helper,
  label,
  search,
  setSearch,
  showDropdown,
  setShowDropdown,
  dropdownRef,
  selectedPeople,
  options,
  profilesLoading,
  loadingLabel,
  emptyLabel,
  onToggle,
  onRemove,
  zIndexClass = "z-40",
}: {
  helper: string;
  label: string;
  search: string;
  setSearch: (value: string) => void;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  selectedPeople: PersonOption[];
  options: ProfileOption[];
  profilesLoading: boolean;
  loadingLabel: string;
  emptyLabel: string;
  onToggle: (option: ProfileOption) => void;
  onRemove: (id: string) => void;
  zIndexClass?: string;
}) => {
  return (
    <div
      className={`relative mt-4 ${showDropdown ? zIndexClass : "z-10"}`}
      ref={dropdownRef}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="mb-2 ml-4 text-[13px] font-light capitalize text-blue-600">
        {helper}
      </p>

      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          value={search}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!showDropdown) setShowDropdown(true);
          }}
          placeholder=" "
          className="w-full rounded-md border border-gray-400 bg-white py-2 pl-10 pr-10 text-gray-800 transition focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <label
          className={`pointer-events-none absolute left-10 bg-white px-1 text-sm transition-all duration-300 ${
            showDropdown || search || selectedPeople?.length
              ? "-top-2 text-xs text-blue-600"
              : "top-2.5 text-gray-500"
          }`}
        >
          {label}
        </label>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#0d4db0]"
        >
          <FiChevronDown
            className={`transition-transform duration-200 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showDropdown && (
          <div
            className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-999 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.16)]"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-72 overflow-y-auto">
              {profilesLoading ? (
                <div className="px-4 py-6 text-sm text-slate-500">
                  {loadingLabel}
                </div>
              ) : options.length ? (
                options.map((option) => {
                  const normalized = normalizePerson(option);
                  const isSelected = selectedPeople.some(
                    (person) => person.id === normalized.id
                  );

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onToggle(option)}
                      className={`flex w-full items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 ${
                        isSelected ? "bg-blue-50/70" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {normalized.label}
                        </p>

                        {!!normalized.email && (
                          <p className="truncate text-xs text-slate-500">
                            {normalized.email}
                          </p>
                        )}
                      </div>

                      <div
                        className={`mt-0.5 h-5 w-5 shrink-0 rounded-md border transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 shadow-sm"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-sm text-slate-500">
                  {emptyLabel}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!!selectedPeople?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedPeople.map((person) => (
            <div
              key={person.id}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 shadow-sm"
            >
              <span>{person.label || person.name}</span>

              <button
                type="button"
                onClick={() => onRemove(person.id)}
                className="rounded-full p-1 text-blue-700 transition hover:bg-blue-100"
              >
                <IoClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EventSchedulerStep2 = ({
  schedulerForm,
  setSchedulerForm,
  handleChange,
  errors,
  setErrors,
  eventLanguage,
  setEventLanguage,
  hostDropdownRef,
  hostSearch,
  setHostSearch,
  showHostDropdown,
  setShowHostDropdown,
  filteredHostOptions,
  profilesLoading,
}: {
  schedulerForm: SchedulerForm;
  setSchedulerForm: React.Dispatch<React.SetStateAction<SchedulerForm>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  eventLanguage: string;
  setEventLanguage: (lang: string) => void;
  hostDropdownRef: React.RefObject<HTMLDivElement>;
  hostSearch: string;
  setHostSearch: (search: string) => void;
  showHostDropdown: boolean;
  setShowHostDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  filteredHostOptions: ProfileOption[];
  profilesLoading: boolean;
}) => {
  const { language } = useLanguage();
  const t = translations[language === "es" ? "es" : "en"];

  const instructorDropdownRef = useRef<HTMLDivElement>(null);
  const [instructorSearch, setInstructorSearch] = useState("");
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const clickedOutsideHosts =
        hostDropdownRef.current && !hostDropdownRef.current.contains(target);

      const clickedOutsideInstructors =
        instructorDropdownRef.current &&
        !instructorDropdownRef.current.contains(target);

      if (clickedOutsideHosts) {
        setShowHostDropdown(false);
      }

      if (clickedOutsideInstructors) {
        setShowInstructorDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [hostDropdownRef, setShowHostDropdown]);

  const selectedHosts = useMemo(
    () => normalizeSelectedPeople(schedulerForm?.hosts || []),
    [schedulerForm?.hosts]
  );

  const selectedInstructors = useMemo(
    () => normalizeSelectedPeople(schedulerForm?.instructors || []),
    [schedulerForm?.instructors]
  );

  const sharedProfileOptions = useMemo(() => {
    return filteredHostOptions || [];
  }, [filteredHostOptions]);

  const filteredInstructorOptions = useMemo(() => {
    const query = instructorSearch.trim().toLowerCase();

    if (!query) return sharedProfileOptions;

    return sharedProfileOptions.filter((option) => {
      const normalized = normalizePerson(option);

      return (
        normalized.label.toLowerCase().includes(query) ||
        normalized.name.toLowerCase().includes(query) ||
        normalized.email?.toLowerCase().includes(query)
      );
    });
  }, [sharedProfileOptions, instructorSearch]);

  const enDescriptionEditor = useEditor({
    extensions: [StarterKit],
    content: schedulerForm?.description_en || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] rounded-b-2xl border-x border-b border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none prose prose-sm max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      setSchedulerForm((prev: SchedulerForm) => ({
        ...prev,
        description_en: html,
      }));

      setErrors((prev: Record<string, string>) => ({
        ...prev,
        description_en: "",
      }));
    },
  });

  const spaDescriptionEditor = useEditor({
    extensions: [StarterKit],
    content: schedulerForm?.description_es || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] rounded-b-2xl border-x border-b border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none prose prose-sm max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      setSchedulerForm((prev: SchedulerForm) => ({
        ...prev,
        description_es: html,
      }));

      setErrors((prev: Record<string, string>) => ({
        ...prev,
        description_es: "",
      }));
    },
  });

  const handleToggleHost = (option: ProfileOption) => {
    const person = normalizePerson(option);

    setSchedulerForm((prev: SchedulerForm) => {
      const current = normalizeSelectedPeople(prev?.hosts || []);
      const exists = current.some((item) => item.id === person.id);

      return {
        ...prev,
        hosts: exists
          ? current.filter((item) => item.id !== person.id)
          : [...current, person],
      };
    });
  };

  const handleRemoveHost = (value: string) => {
    setSchedulerForm((prev: SchedulerForm) => ({
      ...prev,
      hosts: normalizeSelectedPeople(prev?.hosts || []).filter(
        (item) => item.id !== value
      ),
    }));
  };

  const handleToggleInstructor = (option: ProfileOption) => {
    const person = normalizePerson(option);

    setSchedulerForm((prev: SchedulerForm) => {
      const current = normalizeSelectedPeople(prev?.instructors || []);
      const exists = current.some((item) => item.id === person.id);

      return {
        ...prev,
        instructors: exists
          ? current.filter((item) => item.id !== person.id)
          : [...current, person],
      };
    });
  };

  const handleRemoveInstructor = (value: string) => {
    setSchedulerForm((prev: SchedulerForm) => ({
      ...prev,
      instructors: normalizeSelectedPeople(prev?.instructors || []).filter(
        (item) => item.id !== value
      ),
    }));
  };

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      <Section title={t.eventDetails}>
        <div className="mb-6 rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {t.eventLanguage}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {t.eventLanguageDescription}
              </p>
            </div>

            <div className="inline-flex rounded-2xl border border-blue-100 bg-white p-1 shadow-sm w-27.5">
              <button
                type="button"
                onClick={() => setEventLanguage("en")}
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  eventLanguage === "en"
                    ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => setEventLanguage("es")}
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  eventLanguage === "es"
                    ? "bg-linear-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "text-slate-500 hover:bg-blue-50 hover:text-green-700"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>

        {eventLanguage === "en" && (
          <div className="space-y-4">
            <div>
              <FloatingLabelInput
                id="name_en"
                name="name_en"
                label={t.eventName}
                type="text"
                value={schedulerForm?.name_en}
                autoComplete="name"
                onChange={handleChange}
                maxLength={50}
              />

              {errors?.name_en && (
                <p className="mt-1 text-xs text-red-500">{errors?.name_en}</p>
              )}
            </div>

            <div>
              <div>
                <span className="mb-0 ml-4 block text-[12px] tracking-wide text-blue-600">
                  {t.description}
                </span>
                <RichTextField editor={enDescriptionEditor} />
              </div>

              {errors?.description_en && (
                <p className="mt-1 text-xs text-red-500">
                  {errors?.description_en}
                </p>
              )}
            </div>
          </div>
        )}

        {eventLanguage === "es" && (
          <div className="space-y-4">
            <div>
              <FloatingLabelInput
                id="name_es"
                name="name_es"
                label={t.eventName}
                type="text"
                value={schedulerForm?.name_es || ""}
                autoComplete="off"
                onChange={handleChange}
                maxLength={50}
              />

              {errors?.name_es && (
                <p className="mt-1 text-xs text-red-500">{errors?.name_es}</p>
              )}
            </div>

            <div>
              <div>
                <span className="mb-0 ml-4 block text-[12px] tracking-wide text-blue-600">
                  {t.description}
                </span>
                <RichTextField editor={spaDescriptionEditor} />
              </div>

              {errors?.description_es && (
                <p className="mt-1 text-xs text-red-500">
                  {errors?.description_es}
                </p>
              )}
            </div>
          </div>
        )}

        <FloatingLabelSelect
          id="type"
          name="type"
          label={t.eventType}
          value={schedulerForm?.type as string}
          onChange={handleChange}
          options={[
            { value: "Social", label: t.eventTypes.social },
            {
              value: "Charity & Fundraising",
              label: t.eventTypes.charity,
            },
            { value: "Sports & Fitness", label: t.eventTypes.sports },
            { value: "Corporate", label: t.eventTypes.corporate },
            { value: "Educational", label: t.eventTypes.educational },
            {
              value: "Cultural & Entertainment",
              label: t.eventTypes.cultural,
            },
            { value: "Virtual", label: t.eventTypes.virtual },
            { value: "Promotional", label: t.eventTypes.promotional },
            { value: "Other", label: t.eventTypes.other },
          ]}
        />

        <PeopleMultiSelect
          helper={t.hostHelper}
          label={t.hosts}
          search={hostSearch}
          setSearch={setHostSearch}
          showDropdown={showHostDropdown}
          setShowDropdown={setShowHostDropdown}
          dropdownRef={hostDropdownRef}
          selectedPeople={selectedHosts}
          options={sharedProfileOptions}
          profilesLoading={profilesLoading}
          loadingLabel={t.loadingProfiles}
          emptyLabel={t.noProfilesFound}
          onToggle={handleToggleHost}
          onRemove={handleRemoveHost}
          zIndexClass="z-50"
        />

        <PeopleMultiSelect
          helper={t.instructorHelper}
          label={t.instructors}
          search={instructorSearch}
          setSearch={setInstructorSearch}
          showDropdown={showInstructorDropdown}
          setShowDropdown={setShowInstructorDropdown}
          dropdownRef={instructorDropdownRef as React.RefObject<HTMLDivElement>}
          selectedPeople={selectedInstructors}
          options={filteredInstructorOptions}
          profilesLoading={profilesLoading}
          loadingLabel={t.loadingProfiles}
          emptyLabel={t.noProfilesFound}
          onToggle={handleToggleInstructor}
          onRemove={handleRemoveInstructor}
          zIndexClass="z-40"
        />
      </Section>
    </div>
  );
};

export default EventSchedulerStep2;
