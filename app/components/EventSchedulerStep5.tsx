"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FiMail, FiSearch, FiUsers } from "react-icons/fi";

import { InviteeProfile, SchedulerForm } from "../lib/interfaces/events";
import { useLanguage } from "../context/language";

import { Section } from "./EventSchedulerForm";
import FloatingLabelInput from "./elements/FloatingLabelInput";
import FloatingLabelSelect from "./elements/FloatingLabelSelect";
import { RichTextField } from "./RichTextEditor";

const EventSchedulerStep5 = ({
  schedulerForm,
  setSchedulerForm,
  handleChange,
  errors,
  setErrors,
  inviteSearch,
  setInviteSearch,
  filteredProfiles,
  profilesLoading,
  selectedInvitees,
  setSelectedInvitees,
  toggleInvitee,
  detailsLanguage,
  setDetailsLanguage,
}: {
  schedulerForm: SchedulerForm;
  setSchedulerForm: React.Dispatch<React.SetStateAction<SchedulerForm>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  errors: Partial<Record<keyof SchedulerForm, string>>;
  setErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<keyof SchedulerForm, string>>>
  >;
  inviteSearch: string;
  setInviteSearch: (value: string) => void;
  filteredProfiles: InviteeProfile[];
  profilesLoading: boolean;
  selectedInvitees: string[];
  setSelectedInvitees: (ids: string[]) => void;
  toggleInvitee: (id: string) => void;
  detailsLanguage: "en" | "es";
  setDetailsLanguage: (lang: "en" | "es") => void;
}) => {
  const { language } = useLanguage();

  const t = {
    en: {
      accessCost: "Access & Cost",
      suggestedDonation: "Suggested Donation (USD)",
      privacy: "Privacy",
      public: "Public",
      private: "Private",
      dressCode: "Dress Code",
      none: "None",
      casual: "Casual",
      sportwear: "Sportwear",
      swimwear: "Swimwear",
      semiFormal: "Semi-formal",
      formal: "Formal",
      additionalDetails: "Additional Details",
      additionalDetailsDesc:
        "Add extra event notes in both English and Spanish.",
      description: "Description",
      invitationEmails: "Invitation Emails",
      invitationTitle: "Send invitation emails to selected user accounts",
      invitationDesc:
        "Select approved active user accounts below. After the event is saved, invitation emails will be sent to the selected recipients.",
      searchUsers: "Search users by name or email",
      inviteRecipients: "Invite Recipients",
      selected: "selected",
      selectAll: "Select All",
      clear: "Clear",
      loadingUsers: "Loading user accounts...",
      noUsers: "No matching users found.",
    },
    es: {
      accessCost: "Acceso y Costo",
      suggestedDonation: "Donación Sugerida (USD)",
      privacy: "Privacidad",
      public: "Público",
      private: "Privado",
      dressCode: "Código de Vestimenta",
      none: "Ninguno",
      casual: "Casual",
      sportwear: "Ropa Deportiva",
      swimwear: "Ropa de Baño",
      semiFormal: "Semi-formal",
      formal: "Formal",
      additionalDetails: "Detalles Adicionales",
      additionalDetailsDesc:
        "Agrega notas adicionales del evento en inglés y español.",
      description: "Descripción",
      invitationEmails: "Correos de Invitación",
      invitationTitle:
        "Enviar correos de invitación a las cuentas de usuario seleccionadas",
      invitationDesc:
        "Selecciona las cuentas activas aprobadas a continuación. Después de guardar el evento, se enviarán correos de invitación a los destinatarios seleccionados.",
      searchUsers: "Buscar usuarios por nombre o correo electrónico",
      inviteRecipients: "Destinatarios de Invitación",
      selected: "seleccionados",
      selectAll: "Seleccionar Todos",
      clear: "Limpiar",
      loadingUsers: "Cargando cuentas de usuario...",
      noUsers: "No se encontraron usuarios coincidentes.",
    },
  }[language as "en" | "es"];

  const enDetailsEditor = useEditor({
    extensions: [StarterKit],
    content: schedulerForm?.details_en || "",
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
        details_en: html,
      }));

      setErrors((prev: Record<string, string>) => ({
        ...prev,
        details_en: "",
      }));
    },
  });

  const spaDetailsEditor = useEditor({
    extensions: [StarterKit],
    content: schedulerForm?.details_es || "",
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
        details_es: html,
      }));

      setErrors((prev: Record<string, string>) => ({
        ...prev,
        details_es: "",
      }));
    },
  });

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      <Section title={t.accessCost}>
        <div>
          <FloatingLabelInput
            id="price"
            name="price"
            label={t.suggestedDonation}
            type="number"
            value={Number(schedulerForm?.price)}
            autoComplete="price"
            onChange={handleChange}
            maxLength={50}
          />
          {errors?.price && (
            <p className="mt-1 text-xs text-red-500">{errors?.price}</p>
          )}
        </div>

        {/* <div>
          <FloatingLabelSelect
            id="privacy"
            name="privacy"
            label={t.privacy}
            value={schedulerForm?.privacy}
            onChange={handleChange}
            options={[
              { value: "Public", label: t.public },
              { value: "Private", label: t.private },
            ]}
          />
        </div> */}

        <div>
          <FloatingLabelSelect
            id="dressCode"
            name="dressCode"
            label={t.dressCode}
            value={schedulerForm?.dressCode as string}
            onChange={handleChange}
            options={[
              { value: "None", label: t.none },
              { value: "Casual", label: t.casual },
              { value: "Sportwear", label: t.sportwear },
              { value: "Swimwear", label: t.swimwear },
              { value: "Semi-formal", label: t.semiFormal },
              { value: "Formal", label: t.formal },
            ]}
          />
        </div>

        <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-2 py-4 md:p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {t.additionalDetails}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {t.additionalDetailsDesc}
              </p>
            </div>

            <div className="inline-flex rounded-2xl border border-blue-100 bg-white p-1 shadow-sm w-27.5">
              <button
                type="button"
                onClick={() => setDetailsLanguage("en")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  detailsLanguage === "en"
                    ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => setDetailsLanguage("es")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  detailsLanguage === "es"
                    ? "bg-linear-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "text-slate-500 hover:bg-blue-50 hover:text-green-700"
                }`}
              >
                ES
              </button>
            </div>
          </div>

          {detailsLanguage === "en" && (
            <div>
              <div>
                <RichTextField editor={enDetailsEditor} />

                {errors?.details_en && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors?.details_en}
                  </p>
                )}
              </div>
            </div>
          )}

          {detailsLanguage === "es" && (
            <div>
              <div>
                <RichTextField editor={spaDetailsEditor} />

                {errors?.details_es && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors?.details_es}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section title={t.invitationEmails} defaultOpen={true}>
        <div className="rounded-2xl border border-slate-200 bg-linear-to-r from-white to-slate-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-blue-50 p-2 text-blue-700">
              <FiMail />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">
                {t.invitationTitle}
              </h4>
              <p className="mt-1 text-xs text-slate-500">{t.invitationDesc}</p>
            </div>
          </div>

          <div className="mt-4 relative">
            <FiSearch className="absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={inviteSearch}
              onChange={(e) => setInviteSearch(e.target.value)}
              placeholder={t.searchUsers}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FiUsers />
                {t.inviteRecipients}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  {selectedInvitees?.length} {t.selected}
                </span>

                <button
                  type="button"
                  disabled={profilesLoading || filteredProfiles?.length === 0}
                  onClick={() => {
                    const filteredIds = filteredProfiles?.map(
                      (profile) => profile.id
                    );

                    setSelectedInvitees(
                      Array.from(new Set([...selectedInvitees, ...filteredIds]))
                    );
                  }}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.selectAll}
                </button>

                <button
                  type="button"
                  disabled={profilesLoading || selectedInvitees.length === 0}
                  onClick={() => {
                    const filteredIds = new Set(
                      filteredProfiles.map((profile) => profile.id)
                    );

                    setSelectedInvitees(
                      selectedInvitees.filter((id) => !filteredIds.has(id))
                    );
                  }}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.clear}
                </button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {profilesLoading ? (
                <div className="px-4 py-6 text-sm text-slate-500">
                  {t.loadingUsers}
                </div>
              ) : filteredProfiles.length ? (
                filteredProfiles.map((profile) => {
                  const selected = selectedInvitees?.includes(profile?.id);

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => toggleInvitee(profile?.id)}
                      className={`flex w-full items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 ${
                        selected ? "bg-blue-50/70" : "hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {profile.first_name} {profile.last_name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {profile.email}
                        </p>
                      </div>

                      <div
                        className={`mt-1 h-5 w-5 rounded-md border transition ${
                          selected
                            ? "border-blue-600 bg-blue-600"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-sm text-slate-500">
                  {t.noUsers}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default EventSchedulerStep5;
