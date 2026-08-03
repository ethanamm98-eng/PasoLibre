"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ShieldCheck } from "lucide-react";

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

type FieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  maxLength?: number;
};

export default function SignUpForm() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const isSpanish = language === "es";

  const t = {
    eyebrow: isSpanish ? "Forma parte de la comunidad" : "Join the community",
    join: isSpanish ? "Crea tu cuenta" : "Create your account",
    description: isSpanish
      ? "Completa tu información para solicitar acceso a Paso Libre."
      : "Complete your information to request access to Paso Libre.",
    firstName: isSpanish ? "Nombre" : "First name",
    lastName: isSpanish ? "Apellido" : "Last name",
    username: isSpanish ? "Usuario" : "Username",
    email: isSpanish ? "Correo electrónico" : "Email",
    phone: isSpanish ? "Teléfono" : "Phone",
    password: isSpanish ? "Contraseña" : "Password",
    confirmPassword: isSpanish ? "Confirmar contraseña" : "Confirm password",
    languagePreference: isSpanish
      ? "Preferencia de idioma"
      : "Language preference",
    english: isSpanish ? "Inglés" : "English",
    spanish: isSpanish ? "Español" : "Spanish",
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
    languageRequired: isSpanish
      ? "Selecciona un idioma"
      : "Please select a language",
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
    createAccount: isSpanish ? "Crear cuenta" : "Create account",
    alreadyHaveAccount: isSpanish
      ? "¿Ya tienes una cuenta?"
      : "Already have an account?",
    signIn: isSpanish ? "Iniciar sesión" : "Sign in",
    accountSubmitted: isSpanish ? "Solicitud enviada" : "Request submitted",
    accountSubmittedText: isSpanish
      ? "Tu cuenta fue enviada correctamente y está pendiente de aprobación. Una vez aprobada, podrás iniciar sesión con la contraseña que creaste."
      : "Your account request was submitted successfully and is pending approval. Once approved, you can sign in with the password you created.",
    goToLogin: isSpanish ? "Ir al inicio de sesión" : "Go to login",
    veryWeak: isSpanish ? "Muy débil" : "Very weak",
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
    languagePreference: language || "en",
  });

  const [errors, setErrors] = useState<Errors>({});

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
  };

  const strengthLabels = [t.weak, t.fair, t.good, t.strong];

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    let nextValue = value;

    if (field === "phone" && typeof value === "string") {
      nextValue = formatPhone(value);
    }

    setForm((previous) => ({
      ...previous,
      [field]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setGlobalError("");
    setAccountExists(false);
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = t.firstNameRequired;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = t.lastNameRequired;
    }

    if (!form.username.trim()) {
      newErrors.username = t.usernameRequired;
    } else if (form.username.trim().length < 3) {
      newErrors.username = t.usernameMin;
    } else if (!/^[a-zA-Z0-9._-]+$/.test(form.username.trim())) {
      newErrors.username = t.usernameInvalid;
    }

    if (!form.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = t.invalidEmail;
    }

    if (!form.password) {
      newErrors.password = t.passwordRequired;
    } else if (form.password.length < 6) {
      newErrors.password = t.passwordMin;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = t.confirmRequired;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t.passwordsNoMatch;
    }

    if (!form.languagePreference) {
      newErrors.languagePreference = t.languageRequired;
    }

    if (!form.emailConsent) {
      newErrors.emailConsent = t.consentRequired;
    }

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          languagePreference: form.languagePreference,
        }),
      });

      const pendingResult = await readJsonSafely(pendingResponse);

      if (!pendingResponse.ok) {
        const message =
          pendingResult?.error ||
          pendingResult?.message ||
          `${t.signupFailedStatus} ${pendingResponse.status}.`;

        const normalizedMessage = String(message).toLowerCase();

        if (
          normalizedMessage.includes("already registered") ||
          normalizedMessage.includes("already been registered") ||
          normalizedMessage.includes("already exists") ||
          normalizedMessage.includes("already pending")
        ) {
          setAccountExists(true);
        }

        setGlobalError(String(message));
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
          languagePreference:
            pendingSignup.language_preference || form.languagePreference,
        }),
      });

      const notifyResult = await readJsonSafely(notifyResponse);

      if (!notifyResponse.ok) {
        const message =
          notifyResult?.message ||
          notifyResult?.error ||
          t.adminNotificationFailed;

        setGlobalError(String(message));
        return;
      }

      setLanguage(form.languagePreference as "en" | "es");
      setSignupSuccess(true);
    } catch (error: unknown) {
      console.error("Signup error:", error);

      setGlobalError(
        error instanceof Error ? error.message : t.genericSubmitError,
      );
    } finally {
      setButtonLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);

  if (signupSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[560px] flex-col items-center justify-center text-center"
      >
        <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-blue-100 bg-blue-50 text-[#0d4db0] shadow-[0_18px_40px_rgba(13,77,176,0.15)]">
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/75 via-transparent to-blue-100/50" />
          <CheckCircle className="relative" size={34} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0d4db0]">
            Paso Libre
          </p>
        </div>

        <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-slate-950">
          {t.accountSubmitted}
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          {t.accountSubmittedText}
        </p>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="group relative mt-7 inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(13,77,176,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(13,77,176,0.40)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">{t.goToLogin}</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* <div className="flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0d4db0]">
          {t.eyebrow}
        </p>
      </div> */}

      <div className="mb-6">
        <h1 className="mt-3 text-center text-3xl font-black tracking-wide text-slate-950 sm:text-4xl">
          {t.join}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-center text-sm leading-5 text-slate-500 px-2 sm:px-0">
          {t.description}
        </p>
      </div>

      {/* <div
        className="my-6 flex items-center justify-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px w-16 bg-linear-to-r from-transparent via-blue-200 to-blue-200" />
        <span className="h-2 w-2 rotate-45 rounded-[2px] border border-blue-200 bg-blue-50" />
        <span className="h-px w-16 bg-linear-to-l from-transparent via-blue-200 to-blue-200" />
      </div> */}

      <AnimatePresence initial={false}>
        {globalError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-5 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-center text-sm font-medium leading-6 text-red-600"
          >
            {globalError}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 relative top-3">
          <Field
            id="first-name"
            name="firstName"
            label={t.firstName}
            value={form.firstName}
            onChange={(value) => handleChange("firstName", value)}
            error={errors.firstName}
            autoComplete="given-name"
            disabled={buttonLoading}
            maxLength={60}
          />

          <Field
            id="last-name"
            name="lastName"
            label={t.lastName}
            value={form.lastName}
            onChange={(value) => handleChange("lastName", value)}
            error={errors.lastName}
            autoComplete="family-name"
            disabled={buttonLoading}
            maxLength={60}
          />
        </div>

        <Field
          id="username"
          name="username"
          label={t.username}
          value={form.username}
          onChange={(value) => handleChange("username", value)}
          error={errors.username}
          autoComplete="username"
          disabled={buttonLoading}
          maxLength={40}
        />

        <Field
          id="email"
          name="email"
          label={t.email}
          type="email"
          value={form.email}
          onChange={(value) => handleChange("email", value)}
          error={errors.email}
          autoComplete="email"
          disabled={buttonLoading}
          maxLength={120}
        />

        <Field
          id="phone"
          name="phone"
          label={t.phone}
          type="tel"
          value={form.phone}
          onChange={(value) => handleChange("phone", value)}
          error={errors.phone}
          autoComplete="tel"
          disabled={buttonLoading}
          maxLength={14}
        />

        <div>
          <Field
            id="password"
            name="password"
            label={t.password}
            type="password"
            value={form.password}
            onChange={(value) => handleChange("password", value)}
            error={errors.password}
            autoComplete="new-password"
            disabled={buttonLoading}
            maxLength={80}
          />

          <AnimatePresence initial={false}>
            {form.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 overflow-hidden"
              >
                <div className="flex gap-1.5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        index < passwordStrength
                          ? "bg-[#0d4db0]"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-1.5 text-xs font-medium text-slate-500">
                  {strengthLabels[passwordStrength - 1] || t.veryWeak}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Field
          id="confirm-password"
          name="confirmPassword"
          label={t.confirmPassword}
          type="password"
          value={form.confirmPassword}
          onChange={(value) => handleChange("confirmPassword", value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={buttonLoading}
          maxLength={80}
        />

        <div>
          <FloatingLabelSelect
            id="language-preference"
            name="languagePreference"
            label={t.languagePreference}
            value={form.languagePreference}
            onChange={(event) =>
              handleChange("languagePreference", event.target.value)
            }
            options={[
              { value: "en", label: t.english },
              { value: "es", label: t.spanish },
            ]}
            disabled={buttonLoading}
          />

          <FieldError message={errors.languagePreference} />
        </div>

        <div>
          <label
            htmlFor="email-consent"
            className={`group flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
              form.emailConsent
                ? "border-blue-200 bg-blue-50/80 shadow-[0_8px_20px_rgba(13,77,176,0.06)]"
                : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
            }`}
          >
            <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                id="email-consent"
                name="emailConsent"
                type="checkbox"
                checked={form.emailConsent}
                disabled={buttonLoading}
                onChange={(event) =>
                  handleChange("emailConsent", event.target.checked)
                }
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition checked:border-[#0d4db0] checked:bg-[#0d4db0] focus:outline-none focus:ring-4 focus:ring-[#0d4db0]/10 disabled:cursor-not-allowed disabled:opacity-70"
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

          <FieldError message={errors.emailConsent} />
        </div>

        <button
          type="submit"
          disabled={buttonLoading}
          className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(13,77,176,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(13,77,176,0.40)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative">
            {buttonLoading ? t.submitting : t.createAccount}
          </span>
        </button>

        <div className="rounded-[1.4rem] border border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-blue-50/50 p-4 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-slate-500">{t.alreadyHaveAccount}</p>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="group mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-[#0d4db0] transition hover:text-blue-700"
          >
            <span>{t.signIn}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1 text-xs font-medium text-slate-400">
          <ShieldCheck size={15} />
          <span>
            {isSpanish
              ? "Tu información se envía de forma segura."
              : "Your information is submitted securely."}
          </span>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  disabled,
  maxLength,
}: FieldProps) {
  return (
    <div>
      <FloatingLabelInput
        id={id}
        name={name}
        label={label}
        value={value}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />

      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/80 px-3 py-2 text-xs font-medium leading-5 text-red-600"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
