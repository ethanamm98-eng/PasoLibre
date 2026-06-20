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
  const { language } = useLanguage(); // es or en
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
        .select("id, email, username, is_approved, account_status, role")
        .eq("id", data.user.id)
        .maybeSingle();

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
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <PageLoader />
            <p className="text-white text-sm font-light mt-4">
              {redirecting ? t.redirecting : t.loading}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl py-6 px-4 md:py-8 md:px-8 space-y-4 animate-fade-in relative z-10">
        <h2 className="text-3xl font-bold text-center tracking-wider mb-1 bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          {t.signIn}
        </h2>

        <p className="text-sm text-gray-500 text-center">{t.credentials}</p>

        <form onSubmit={handleLogin} className="space-y-4.5">
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
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {errors.email}
                </motion.p>
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
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* <div className="flex justify-center -mt-2">
            <button
              type="button"
              onClick={openResetModal}
              className="cursor-pointer text-xs font-medium text-blue-600 transition hover:text-blue-700 hover:underline mx-auto"
            >
              Forgot password?
            </button>
          </div> */}
          <div className="text-center pt-0">
            <p className="text-sm text-gray-500 inline">{t.forgot}</p>
            <button
              type="button"
              onClick={() => router.push("/reset-password")}
              className="inline mt-1 ml-1 text-sm font-semibold text-blue-600 hover:underline cursor-pointer transition"
            >
              {t.reset}
            </button>
          </div>

          <button
            type="submit"
            disabled={buttonLoading || pageLoading}
            className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white w-full py-3 font-semibold rounded shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {buttonLoading ? t.signingIn : t.signIn}
          </button>
        </form>

        <div className="text-center pt-3">
          <p className="text-sm text-gray-500">{t.noAccount}</p>
          <button
            type="button"
            onClick={() => router.push("/sign-up")}
            className="mt-1 text-sm font-semibold text-blue-600 hover:underline cursor-pointer transition"
          >
            {t.signUp}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {resetOpen && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
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
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-500 to-blue-700" />

              <button
                type="button"
                onClick={closeResetModal}
                disabled={resetLoading}
                className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
              >
                <X size={18} />
              </button>

              <div className="px-7 pb-7 pt-9">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  {resetSent ? <CheckCircle size={26} /> : <Mail size={26} />}
                </div>

                <h3 className="text-center text-2xl font-bold tracking-tight text-slate-900">
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
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-1 text-xs text-red-500"
                          >
                            {resetError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="w-full cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {resetLoading ? t.sendingReset : t.sendReset}
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={closeResetModal}
                    className="mt-6 w-full cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-blue-800"
                  >
                    {t.gotIt}
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
