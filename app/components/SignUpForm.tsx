"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { useLanguage } from "../context/language";

import FloatingLabelInput from "./elements/FloatingLabelInput";
import FloatingLabelSelect from "./elements/FloatingLabelSelect";

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  emailConsent: boolean;
  languagePreference: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function SignUpForm() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const isSpanish = language === "es";

  // Translations
  const t = {
    join: isSpanish ? "Únete a Paso Libre" : "Join Paso Libre",
    firstName: isSpanish ? "Nombre" : "First Name",
    lastName: isSpanish ? "Apellido" : "Last Name",
    username: isSpanish ? "Usuario" : "Username",
    email: isSpanish ? "Correo electrónico" : "Email",
    phone: isSpanish ? "Teléfono" : "Phone",
    password: isSpanish ? "Contraseña" : "Password",
    confirmPassword: isSpanish ? "Confirmar Contraseña" : "Confirm Password",
    consentLabel: isSpanish
      ? "Acepto recibir actualizaciones por correo electrónico de Paso Libre."
      : "I consent to receive email updates from Paso Libre.",
    consentRequired: isSpanish
      ? "Debes aceptar recibir actualizaciones por correo electrónico."
      : "You must consent to receive email updates.",
    firstNameRequired: isSpanish
      ? "El nombre es requerido"
      : "First name is required",
    lastNameRequired: isSpanish
      ? "El apellido es requerido"
      : "Last name is required",
    usernameRequired: isSpanish
      ? "El usuario es requerido"
      : "Username is required",
    usernameMin: isSpanish
      ? "El usuario debe tener al menos 3 caracteres"
      : "Username must be at least 3 characters",
    usernameInvalid: isSpanish
      ? "El usuario solo puede contener letras, números, puntos, guiones bajos y guiones"
      : "Username can only contain letters, numbers, dots, underscores, and hyphens",
    emailRequired: isSpanish ? "El correo es requerido" : "Email is required",
    invalidEmail: isSpanish ? "Correo inválido" : "Invalid email",
    passwordRequired: isSpanish
      ? "La contraseña es requerida"
      : "Password is required",
    passwordMin: isSpanish ? "Mínimo 6 caracteres" : "Minimum 6 characters",
    confirmRequired: isSpanish
      ? "Confirma tu contraseña"
      : "Confirm your password",
    passwordsNoMatch: isSpanish
      ? "Las contraseñas no coinciden"
      : "Passwords do not match",
    signupFailedStatus: isSpanish
      ? "La solicitud de registro falló con estado"
      : "Signup request failed with status",
    missingPendingId: isSpanish
      ? "La solicitud fue guardada, pero falta el ID de registro pendiente."
      : "Signup request was saved, but the pending signup ID was missing.",
    adminNotificationFailed: isSpanish
      ? "Tu solicitud fue guardada, pero falló la notificación al administrador."
      : "Your request was saved, but the admin notification failed.",
    genericSubmitError: isSpanish
      ? "Algo salió mal al enviar tu solicitud de cuenta."
      : "Something went wrong while submitting your account request.",
    submitting: isSpanish ? "Enviando solicitud..." : "Submitting request...",
    createAccount: isSpanish ? "Crear Cuenta" : "Create Account",
    alreadyHaveAccount: isSpanish
      ? "¿Ya tienes una cuenta?"
      : "Already have an account?",
    signInInstead: isSpanish ? "Inicia sesión →" : "Sign in instead →",
    signIn: isSpanish ? "Iniciar sesión" : "Sign in",
    accountSubmitted: isSpanish ? "Cuenta Enviada" : "Account Submitted",
    accountSubmittedText: isSpanish
      ? "Tu cuenta fue enviada correctamente y ahora está pendiente de aprobación del administrador. Una vez aprobada, podrás iniciar sesión con la misma contraseña que creaste."
      : "Your account was submitted successfully and is now pending admin approval. Once approved, you can sign in using the same password you created.",
    goToLogin: isSpanish ? "Ir al Login" : "Go to Login",
    veryWeak: isSpanish ? "Muy débil" : "Very Weak",
    weak: isSpanish ? "Débil" : "Weak",
    fair: isSpanish ? "Aceptable" : "Fair",
    good: isSpanish ? "Buena" : "Good",
    strong: isSpanish ? "Fuerte" : "Strong",
  };

  const [buttonLoading, setButtonLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emailConsent: false,
    languagePreference: language || "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabels = [t.weak, t.fair, t.good, t.strong];

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    if (field === "phone" && typeof value === "string")
      value = formatPhone(value);

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setGlobalError("");
    setAccountExists(false);
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.firstName.trim()) newErrors.firstName = t.firstNameRequired;
    if (!form.lastName.trim()) newErrors.lastName = t.lastNameRequired;

    if (!form.username.trim()) newErrors.username = t.usernameRequired;
    else if (form.username.trim().length < 3)
      newErrors.username = t.usernameMin;
    else if (!/^[a-zA-Z0-9._-]+$/.test(form.username.trim()))
      newErrors.username = t.usernameInvalid;

    if (!form.email.trim()) newErrors.email = t.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = t.invalidEmail;

    if (!form.password) newErrors.password = t.passwordRequired;
    else if (form.password.length < 6) newErrors.password = t.passwordMin;

    if (!form.confirmPassword) newErrors.confirmPassword = t.confirmRequired;
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = t.passwordsNoMatch;

    if (!form.emailConsent) newErrors.emailConsent = t.consentRequired;

    if (!form?.languagePreference)
      newErrors.languagePreference = isSpanish
        ? "Selecciona un idioma"
        : "Please select a language";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const readJsonSafely = async (response: Response) => {
    const text = await response.text();

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setButtonLoading(true);
    setGlobalError("");
    setAccountExists(false);

    try {
      const cleanEmail = form.email.trim().toLowerCase();
      const cleanUsername = form.username.trim();

      const pendingResponse = await fetch("/api/pending-signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          username: cleanUsername,
          email: cleanEmail,
          phone: form.phone.trim() || null,
          password: form.password,
          role: "member",
          // emailConsent: form.emailConsent,
          languagePreference: form.languagePreference,
        }),
      });

      const pendingResult = await readJsonSafely(pendingResponse);

      if (!pendingResponse.ok) {
        const message =
          pendingResult?.error ||
          pendingResult?.message ||
          `${t.signupFailedStatus} ${pendingResponse.status}.`;

        if (
          message.toLowerCase().includes("already registered") ||
          message.toLowerCase().includes("already been registered") ||
          message.toLowerCase().includes("already exists") ||
          message.toLowerCase().includes("already pending")
        ) {
          setAccountExists(true);
        }

        setGlobalError(message);
        return;
      }

      const pendingSignup = pendingResult?.pendingSignup;

      if (!pendingSignup?.id) {
        setGlobalError(t.missingPendingId);
        return;
      }

      const notifyResponse = await fetch("/api/notify-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          pendingSignupId: pendingSignup.id,
          email: pendingSignup.email || cleanEmail,
          firstName: pendingSignup.first_name || form.firstName.trim(),
          lastName: pendingSignup.last_name || form.lastName.trim(),
          username: pendingSignup.username || cleanUsername,
          phone: pendingSignup.phone || form.phone.trim() || null,
          languagePreference: pendingSignup.language_preference || form.languagePreference,
          // emailConsent: form.emailConsent,
        }),
      });

      const notifyResult = await readJsonSafely(notifyResponse);

      if (!notifyResponse.ok) {
        const message =
          notifyResult?.message ||
          notifyResult?.error ||
          t.adminNotificationFailed;

        setGlobalError(message);
        return;
      }

      setLanguage(form?.languagePreference as "en" | "es");
      setSignupSuccess(true);

      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        emailConsent: false,
        languagePreference: "",
      });
    } catch (err) {
      console.error("Signup error:", err);

      setGlobalError(err instanceof Error ? err.message : t.genericSubmitError);
    } finally {
      setButtonLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <div className="relative">
      <div
        className={`w-full max-w-md bg-white rounded-2xl py-6 px-4 md:py-8 md:px-8 space-y-5 border-slate-100 transition-all duration-500 ${
          signupSuccess
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <h2 className="text-3xl font-bold text-center bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          {t.join}
        </h2>

        <AnimatePresence>
          {globalError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-500 text-center"
            >
              {globalError}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label={t.firstName}
            value={form.firstName}
            onChange={(v: string) => handleChange("firstName", v)}
            error={errors.firstName}
          />

          <Field
            label={t.lastName}
            value={form.lastName}
            onChange={(v: string) => handleChange("lastName", v)}
            error={errors.lastName}
          />

          <Field
            label={t.username}
            value={form.username}
            onChange={(v: string) => handleChange("username", v)}
            error={errors.username}
          />

          <Field
            label={t.email}
            type="email"
            value={form.email}
            onChange={(v: string) => handleChange("email", v)}
            error={errors.email}
          />

          <Field
            label={t.phone}
            value={form.phone}
            onChange={(v: string) => handleChange("phone", v)}
            error={errors.phone}
          />

          <div>
            <Field
              label={t.password}
              type="password"
              value={form.password}
              onChange={(v: string) => handleChange("password", v)}
              error={errors.password}
            />

            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition ${
                        i < passwordStrength ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {strengthLabels[passwordStrength - 1] || t.veryWeak}
                </p>
              </div>
            )}
          </div>

          <Field
            label={t.confirmPassword}
            type="password"
            value={form.confirmPassword}
            onChange={(v: string) => handleChange("confirmPassword", v)}
            error={errors.confirmPassword}
          />

          <div>
            <FloatingLabelSelect
              id="languagePreference"
              name="languagePreference"
              label={
                language === "en"
                  ? "Language Preference"
                  : "Preferencia de Idioma"
              }
              value={form?.languagePreference}
              onChange={(e) =>
                handleChange("languagePreference", e.target.value)
              }
              options={[
                { value: "en", label: isSpanish ? "Inglés" : "English" },
                { value: "es", label: isSpanish ? "Español" : "Spanish" },
              ]}
            />
          </div>

          <div>
            <label
              htmlFor="email-consent"
              className={`group flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-300 px-4 py-3 text-left transition ${
                form.emailConsent
                  ? "border-blue-200 bg-blue-50/80 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
              }`}
            >
              <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  id="email-consent"
                  name="email-consent"
                  type="checkbox"
                  checked={form.emailConsent}
                  disabled={buttonLoading}
                  onChange={(e) =>
                    handleChange("emailConsent", e.target.checked)
                  }
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                />
                <CheckCircle
                  size={14}
                  className="pointer-events-none absolute text-white opacity-0 transition peer-checked:opacity-100"
                />
              </span>

              <span className="text-xs leading-5 text-slate-600">
                {t.consentLabel}
              </span>
            </label>

            <AnimatePresence>
              {errors.emailConsent && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {errors.emailConsent}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={buttonLoading}
            className="cursor-pointer w-full py-3 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold shadow hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {buttonLoading ? t.submitting : t.createAccount}
          </button>

          <AnimatePresence>
            {accountExists && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-3"
              >
                <p className="text-sm text-gray-500">{t.alreadyHaveAccount}</p>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="mt-1 text-sm font-semibold bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition"
                >
                  {t.signInInstead}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!accountExists && (
            <div className="text-center pt-3">
              <p className="text-sm text-gray-500">{t.alreadyHaveAccount}</p>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="mt-1 text-sm font-semibold text-blue-600 hover:underline cursor-pointer transition"
              >
                {t.signIn}
              </button>
            </div>
          )}
        </form>
      </div>

      <AnimatePresence>
        {signupSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md"
          >
            <motion.div className="w-full max-w-md rounded-2xl bg-white px-4 text-center">
              <div className="mb-5 h-16 w-16 mx-auto rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl">
                ✓
              </div>

              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                {t.accountSubmitted}
              </h3>

              <p className="text-sm text-gray-500">{t.accountSubmittedText}</p>

              <button
                onClick={() => router.push("/login")}
                className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white cursor-pointer hover:scale-105 transition-all duration-700"
              >
                {t.goToLogin}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <FloatingLabelInput
        label={label}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        id={label}
        name={label.toLowerCase().replace(/\s/g, "-")}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
