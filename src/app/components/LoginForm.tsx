"use client";

import { useState, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, CheckCircle } from "lucide-react";

import { useLanguage } from "../context/language";
import { supabase } from "../lib/supabase/supabaseClient";

import FloatingLabelInput from "./elements/FloatingLabelInput";
import PageLoader from "./elements/PageLoader";

export default function LoginForm() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage(); // es or en
  const isSpanish = language === "es";

  const t = {
    emailRequired: isSpanish
      ? "El correo o nombre de usuario es requerido"
      : "Email or username is required",
    validEmail: isSpanish
      ? "Ingresa un correo electrónico válido"
      : "Enter a valid email address",
    passwordRequired: isSpanish
      ? "La contraseña es requerida"
      : "Password is required",
    passwordMin: isSpanish
      ? "La contraseña debe tener al menos 6 caracteres"
      : "Password must be at least 6 characters",
    emailRequiredPeriod: isSpanish
      ? "El correo es requerido."
      : "Email is required.",
    validEmailPeriod: isSpanish
      ? "Ingresa un correo electrónico válido."
      : "Enter a valid email address.",
    resetEmailFailed: isSpanish
      ? "No se pudo enviar el correo para restablecer la contraseña."
      : "Unable to send reset password email.",
    invalidLogin: isSpanish
      ? "Correo, usuario o contraseña inválidos."
      : "Invalid email, username, or password.",
    usernameResolveFailed: isSpanish
      ? "No pudimos validar ese nombre de usuario."
      : "Unable to validate that username.",
    profileLookupFailed: isSpanish
      ? "Error buscando el perfil"
      : "Profile lookup failed",
    noProfileFound: isSpanish
      ? "No se encontró un perfil para este usuario."
      : "No profile found for auth user",
    pendingApproval: isSpanish
      ? "Tu cuenta está pendiente de aprobación del administrador. Podrás iniciar sesión cuando sea aprobada."
      : "Your account is pending admin approval. You can sign in once it is approved.",
    suspended: isSpanish
      ? "Tu cuenta ha sido suspendida. Por favor contacta a un administrador."
      : "Your account has been suspended. Please contact an administrator.",
    genericError: isSpanish
      ? "Algo salió mal. Inténtalo de nuevo."
      : "Something went wrong. Try again.",
    redirecting: isSpanish
      ? "Redirigiendo al panel..."
      : "Redirecting to dashboard...",
    loading: isSpanish
      ? "Cargando, por favor espera..."
      : "Loading, please wait...",
    signIn: isSpanish ? "Iniciar Sesión" : "Sign In",
    credentials: isSpanish
      ? "Ingresa tus credenciales para continuar"
      : "Enter your credentials to continue",
    email: isSpanish
      ? "Correo electrónico o nombre de usuario"
      : "Email or username",
    password: isSpanish ? "Contraseña" : "Password",
    forgot: isSpanish
      ? "¿Olvidaste tu contraseña?"
      : "Did you forget your password?",
    reset: isSpanish ? "Restablecer" : "Reset",
    signingIn: isSpanish ? "Iniciando sesión..." : "Signing in...",
    noAccount: isSpanish ? "¿No tienes una cuenta?" : "Don’t have an account?",
    signUp: isSpanish ? "Crear Cuenta" : "Sign Up",
    checkEmail: isSpanish ? "Revisa tu correo" : "Check your email",
    resetPassword: isSpanish ? "Restablecer contraseña" : "Reset your password",
    resetSentText: isSpanish
      ? "Enviamos un enlace para restablecer tu contraseña a tu correo. Abre el enlace para crear una nueva contraseña."
      : "We sent a password reset link to your email. Open the link to create a new password.",
    resetHelpText: isSpanish
      ? "Ingresa el correo conectado a tu cuenta y te enviaremos un enlace seguro para restablecerla."
      : "Enter the email connected to your account and we’ll send you a secure reset link.",
    accountEmail: isSpanish ? "Correo de la cuenta" : "Account Email",
    sendingReset: isSpanish ? "Enviando enlace..." : "Sending reset link...",
    sendReset: isSpanish ? "Enviar enlace" : "Send reset link",
    gotIt: isSpanish ? "Entendido" : "Got it",
  };

  const [pageLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const isEmailAddress = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const resolveUsernameToEmail = async (username: string) => {
    const response = await fetch("/api/resolve-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        username: username.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result?.email) {
      throw new Error(result?.error || t.usernameResolveFailed);
    }

    return String(result.email).trim().toLowerCase();
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = t.emailRequired;
    }

    if (!password) {
      newErrors.password = t.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = t.passwordMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRedirectPath = (role?: string) => {
    if (role === "admin" || role === "super_admin") {
      return "/admin-dashboard";
    }

    return "/profile";
  };

  // const openResetModal = () => {
  //   setResetEmail(email.trim());
  //   setResetError("");
  //   setResetSent(false);
  //   setResetOpen(true);
  // };

  const closeResetModal = () => {
    if (resetLoading) return;
    setResetOpen(false);
    setResetError("");
    setResetSent(false);
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanResetEmail = resetEmail.trim().toLowerCase();

    setResetError("");
    setResetSent(false);

    if (!cleanResetEmail) {
      setResetError(t.emailRequiredPeriod);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanResetEmail)) {
      setResetError(t.validEmailPeriod);
      return;
    }

    try {
      setResetLoading(true);

      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanResetEmail,
        {
          redirectTo: `${siteUrl}/reset-password`,
        }
      );

      if (error) throw error;

      setResetSent(true);
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      setResetError(
        (error as { message?: string })?.message || t.resetEmailFailed
      );
    } finally {
      setResetLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      setButtonLoading(true);

      const loginIdentifier = email.trim();
      const loginEmail = isEmailAddress(loginIdentifier)
        ? loginIdentifier.toLowerCase()
        : await resolveUsernameToEmail(loginIdentifier);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error || !data?.user) {
        setErrors({
          email: t.invalidLogin,
        });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email, username, is_approved, account_status, role, language_preference")
        .eq("id", data.user.id)
        .maybeSingle();

        setLanguage(profile?.language_preference || "en");

      if (profileError) {
        await supabase.auth.signOut();
        setErrors({
          email: `${t.profileLookupFailed}: ${profileError.message}`,
        });
        return;
      }

      if (!profile) {
        await supabase.auth.signOut();
        setErrors({
          email: `${t.noProfileFound} ${data.user.id}.`,
        });
        return;
      }

      if (!profile.is_approved) {
        await supabase.auth.signOut();
        setErrors({
          email: t.pendingApproval,
        });
        return;
      }

      if (profile.account_status === "suspended") {
        await supabase.auth.signOut();
        setErrors({
          email: t.suspended,
        });
        return;
      }

      setRedirecting(true);

      const redirectPath = getRedirectPath(profile.role);

      setTimeout(() => {
        router.push(redirectPath);
      }, 800);
    } catch (err: unknown) {
      console.error("Login error:", err);
      setErrors({
        email: t.invalidLogin,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div>
      {(redirecting || pageLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <PageLoader />
            <p className="mt-4 text-sm font-medium text-white">
              {redirecting ? t.redirecting : t.loading}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full" />
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px" />

        <div className="relative">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0d4db0]">
              {isSpanish ? "Bienvenido de nuevo" : "Welcome back"}
            </p>
          </div>

          <h2 className="mt-3 text-center text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl">
            {t.signIn}
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
            {t.credentials}
          </p>

          <div className="my-6 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-16 bg-linear-to-r from-transparent via-blue-200 to-blue-200" />
            <span className="h-2 w-2 rotate-45 rounded-[2px] border border-blue-200 bg-blue-50" />
            <span className="h-px w-16 bg-linear-to-l from-transparent via-blue-200 to-blue-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <FloatingLabelInput
                id="email"
                name="email"
                label={t.email}
                type="text"
                value={email}
                autoComplete="username"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmail(e.target.value)
                }
                maxLength={80}
                disabled={buttonLoading}
              />

              <AnimatePresence>
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1.5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/80 px-3 py-2 text-xs font-medium leading-5 text-red-600"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    <span>{errors.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <FloatingLabelInput
                id="password"
                name="password"
                label={t.password}
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
                maxLength={80}
                disabled={buttonLoading}
              />

              <AnimatePresence>
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1.5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/80 px-3 py-2 text-xs font-medium leading-5 text-red-600"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    <span>{errors.password}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 pt-1 text-center">
              <p className="text-sm text-slate-500">{t.forgot}</p>
              <button
                type="button"
                onClick={() => router.push("/reset-password")}
                className="group inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-[#0d4db0] transition hover:text-blue-700"
              >
                <span>{t.reset}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>

            <button
              type="submit"
              disabled={buttonLoading || pageLoading}
              className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(13,77,176,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(13,77,176,0.40)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">
                {buttonLoading ? t.signingIn : t.signIn}
              </span>
            </button>
          </form>

          <div className="mt-7 rounded-[1.4rem] border border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-blue-50/50 p-4 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <p className="text-sm text-slate-500">{t.noAccount}</p>
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="group mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-[#0d4db0] transition hover:text-blue-700"
            >
              <span>{t.signUp}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {resetOpen && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closeResetModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_28px_75px_rgba(15,23,42,0.22)]"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0d4db0,#2563eb,#17468f)]" />
              <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#5BCEFA]/18 blur-3xl" />

              <button
                type="button"
                onClick={closeResetModal}
                disabled={resetLoading}
                className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-2 text-slate-400 transition hover:bg-blue-50 hover:text-[#0d4db0] disabled:cursor-not-allowed"
              >
                <X size={18} />
              </button>

              <div className="relative px-7 pb-7 pt-10">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0d4db0] shadow-[0_12px_28px_rgba(13,77,176,0.12)]">
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/75 via-transparent to-blue-100/50" />
                  <span className="relative">
                    {resetSent ? <CheckCircle size={26} /> : <Mail size={26} />}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#0d4db0]">
                    {resetSent
                      ? isSpanish
                        ? "Correo enviado"
                        : "Email sent"
                      : isSpanish
                        ? "Seguridad de cuenta"
                        : "Account security"}
                  </p>
                </div>

                <h3 className="mt-3 text-center text-2xl font-black tracking-[-0.035em] text-slate-950">
                  {resetSent ? t.checkEmail : t.resetPassword}
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
                  {resetSent ? t.resetSentText : t.resetHelpText}
                </p>

                {!resetSent ? (
                  <form
                    onSubmit={handleSendResetEmail}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <FloatingLabelInput
                        id="reset-email"
                        name="reset-email"
                        label={t.accountEmail}
                        type="email"
                        value={resetEmail}
                        autoComplete="email"
                        maxLength={80}
                        disabled={resetLoading}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => setResetEmail(e.target.value)}
                      />

                      <AnimatePresence>
                        {resetError && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-1.5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/80 px-3 py-2 text-xs font-medium leading-5 text-red-600"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            <span>{resetError}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-4 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(13,77,176,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(13,77,176,0.34)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative">
                        {resetLoading ? t.sendingReset : t.sendReset}
                      </span>
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={closeResetModal}
                    className="group relative mt-6 inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-4 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(13,77,176,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(13,77,176,0.34)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">{t.gotIt}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
