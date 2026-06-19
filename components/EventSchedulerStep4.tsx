"use client";
import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";
import FloatingLabelInput from "./elements/FloatingLabelInput";
import { Section } from "./EventSchedulerForm";

const EventSchedulerStep4 = ({
  schedulerForm,
  handleChange,
  errors,
}: {
  schedulerForm: SchedulerForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}) => {
  const { language } = useLanguage();

  const t = {
    en: {
      locationDetails: "Location Details",
      streetAddress: "Street Address",
      city: "City",
      country: "Country",
      zipCode: "Zip Code",
      optionalLocationUrl:
        "Optional: Add a Google Maps link or any URL pointing to the event location.",
      location: "Location",
    },
    es: {
      locationDetails: "Detalles de Ubicación",
      streetAddress: "Dirección",
      city: "Ciudad",
      country: "País",
      zipCode: "Código Postal",
      optionalLocationUrl:
        "Opcional: Agrega un enlace de Google Maps o cualquier URL que apunte a la ubicación del evento.",
      location: "Ubicación",
    },
  }[language as "en" | "es"];

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      <Section title={t.locationDetails}>
        <FloatingLabelInput
          id="streetAddress"
          name="streetAddress"
          label={t.streetAddress}
          value={schedulerForm?.streetAddress as string}
          onChange={handleChange}
        />
        {errors?.streetAddress && (
          <p className="mt-1 text-xs text-red-500">{errors?.streetAddress}</p>
        )}

        <FloatingLabelInput
          id="city"
          name="city"
          label={t.city}
          value={schedulerForm?.city as string}
          onChange={handleChange}
        />
        {errors?.city && (
          <p className="mt-1 text-xs text-red-500">{errors?.city}</p>
        )}

        <FloatingLabelInput
          id="country"
          name="country"
          label={t.country}
          value={schedulerForm?.country as string}
          onChange={handleChange}
        />
        {errors?.country && (
          <p className="mt-1 text-xs text-red-500">{errors?.country}</p>
        )}

        <FloatingLabelInput
          id="zipCode"
          name="zipCode"
          label={t.zipCode}
          value={schedulerForm?.zipCode as string}
          onChange={handleChange}
        />

        <div>
          <p className="mb-2 mt-4 text-xs font-light text-blue-600">
            {t.optionalLocationUrl}
          </p>
          <FloatingLabelInput
            id="locationUrl"
            name="locationUrl"
            label={t.location}
            type="text"
            value={schedulerForm?.locationUrl as string}
            autoComplete="locationUrl"
            onChange={handleChange}
            maxLength={250}
          />
          {errors?.locationUrl && (
            <p className="mt-1 text-xs text-red-500">{errors?.locationUrl}</p>
          )}
        </div>
      </Section>
    </div>
  );
};

export default EventSchedulerStep4;
