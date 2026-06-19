"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { TfiWrite } from "react-icons/tfi";
import { FaUser, FaEnvelope, FaPhoneAlt, FaComment } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

import { useLanguage } from "../context/language";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  customSubject: string;
  message: string;
}

const SUBJECT_OPTIONS = [
  "collaborations",
  "suggestions",
  "questions",
  "feedback",
  "request",
  "other",
];

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  subject: "",
  customSubject: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { t: translations } = useLanguage();
  const t = translations?.contact || {};

  useEffect(() => setIsMounted(true), []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "subject" && value !== "other" ? { customSubject: "" } : {}),
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");

      const finalSubject =
        formData.subject === "other"
          ? formData.customSubject.trim()
          : t?.subjects?.[formData.subject as keyof typeof t.subjects] ||
            formData.subject;

      if (!finalSubject) {
        throw new Error("Please enter a subject.");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: finalSubject,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Unable to send message.");
      }

      setSuccessMessage(
        t?.successMessage ||
          "Message sent successfully. We’ll be in touch soon."
      );
      setFormData(initialFormData);
    } catch (error: unknown) {
      setErrorMessage(
        (error as Error)?.message ||
          t?.errorMessage ||
          "Unable to send message."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <section className="relative text-white overflow-hidden min-h-[95vh] flex items-center justify-center my-auto py-20 sm:py-24 md:py-0">
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="absolute bottom-0 left-0 w-full h-40 z-20 pointer-events-none">
        <div className="h-full w-full bg-linear-to-t from-black/90 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative mx-2 pt-12 z-10 bg-black/50 backdrop-blur-md px-6 py-8 sm:px-8 sm:py-10 md:p-10 rounded-xl w-full max-w-2xl text-center my-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg px-6"
        >
          {t.getInTouch || "Get in touch"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {[
            { name: "firstName", placeholder: t.firstName, icon: FaUser },
            { name: "lastName", placeholder: t.lastName, icon: FaUser },
            { name: "phone", placeholder: t.phone, icon: FaPhoneAlt },
            { name: "email", placeholder: t.email, icon: FaEnvelope },
          ].map((field, idx) => {
            const Icon = field.icon;

            return (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                className="relative"
              >
                <Icon
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition duration-700 ${
                    focusedField === field.name
                      ? "text-[#0d4db0]"
                      : "text-gray-200"
                  }`}
                />

                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof FormData] || ""}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  required={field.name !== "phone"}
                  disabled={submitting}
                  className="border-0 border-b border-gray-400 bg-transparent p-3 pl-10 w-full focus:outline-none focus:border-[#0d4db0] transition duration-700 disabled:opacity-60"
                />
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <MdSubject className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />

            <select
              name="subject"
              value={formData.subject || ""}
              onChange={handleChange}
              required
              disabled={submitting}
              className="border-0 border-b border-gray-400 bg-transparent p-3 pl-10 w-full focus:outline-none focus:border-[#0d4db0] transition duration-700 text-white disabled:opacity-60"
            >
              <option value="" disabled>
                {t.subjectPlaceholder || "Select Subject"}
              </option>

              {SUBJECT_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-black">
                  {t?.subjects?.[option as keyof typeof t.subjects] ||
                    option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </motion.div>

          {formData.subject === "other" && (
            <motion.div className="relative">
              <MdSubject className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" />

              <input
                type="text"
                name="customSubject"
                placeholder={t.customSubject || "Custom Subject"}
                value={formData.customSubject || ""}
                onChange={handleChange}
                required
                disabled={submitting}
                className="border-0 border-b border-gray-400 bg-transparent p-3 pl-10 w-full focus:outline-none focus:border-[#0d4db0] disabled:opacity-60"
              />
            </motion.div>
          )}

          <motion.div className="relative">
            <FaComment className="absolute left-3 top-1 mt-5 transform -translate-y-1/2 text-gray-200" />

            <textarea
              name="message"
              placeholder={t.message}
              value={formData.message || ""}
              onChange={handleChange}
              required
              disabled={submitting}
              rows={6}
              className="border-0 border-b border-gray-400 bg-transparent p-3 pl-10 w-full focus:outline-none focus:border-[#0d4db0] transition duration-700 disabled:opacity-60"
            />
          </motion.div>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100"
            >
              {successMessage}
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-100"
            >
              {errorMessage}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={submitting}
            className="relative px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 cursor-pointer
            bg-linear-to-r from-[#0d4db0] to-[#3b82f6] text-white shadow-lg
            hover:from-[#0d4db0] hover:to-[#0d4db0] transition-all duration-500 mx-auto mt-6 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <TfiWrite className="w-8 h-8 p-2 rounded-xl bg-sky-200/30" />
            {submitting ? t.sending || "Sending..." : t.send || "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
