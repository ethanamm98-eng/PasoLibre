"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, KeyRound, Mail, ShieldCheck } from "lucide-react";

import { useLanguage } from "../context/language";
import { supabase } from "../lib/supabase/supabaseClient";
import FloatingLabelInput from "./elements/FloatingLabelInput";
import PageLoader from "./elements/PageLoader";

type ResetStep = "checking" | "request" | "update";

type ResetErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  global?: string;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const copy = useMemo(
    () =>
      isSpanish
        ? {
            checking: "Verificando el enlace de recuperación...",
            redirecting: "Redirigiendo al inicio de sesión...",
            requestEyebrow: "Recuperación de cuenta",
            requestTitle: "Restablece tu contraseña",
            requestSubtitle:
              "Ingresa el correo de tu cuenta y te enviaremos un enlace seguro para continuar.",
            updateEyebrow: "Seguridad de la cuenta",
            updateTitle: "Crea una nueva contraseña",
            updateSubtitle:
              "Tu enlace fue verificado. Ahora puedes crear una nueva contraseña.",
            email: "Correo electrónico",
            emailRequired: "El correo electrónico es requerido",
            emailInvalid: "Ingresa un correo electrónico válido",
            sendingLink: "Enviando enlace...",
            sendLink: "Enviar enlace de recuperación",
            linkSentTitle: "Revisa tu correo",
            linkSentText:
              "Si existe una cuenta asociada con ese correo, recibirás un enlace para restablecer tu contraseña.",
            resendLink: "Enviar otro enlace",
            passwordRequired: "La contraseña es requerida",
            passwordMin: "La contraseña debe tener al menos 6 caracteres",
            confirmRequired: "Confirma tu contraseña",
            passwordsNoMatch: "Las contraseñas no coinciden",
            requestError:
              "No pudimos enviar el enlace de recuperación. Inténtalo nuevamente.",
            updateError:
              "No pudimos actualizar tu contraseña. Solicita un nuevo enlace de recuperación.",
            invalidRecovery:
              "Este enlace de recuperación no es válido o ha expirado. Solicita uno nuevo.",
            success: "Contraseña actualizada exitosamente.",
            newPassword: "Nueva contraseña",
            confirmNewPassword: "Confirmar nueva contraseña",
            updating: "Actualizando contraseña...",
            updatePassword: "Actualizar contraseña",
            rememberPassword: "¿Recuerdas tu contraseña?",
            signIn: "Iniciar sesión",
            secureRequest:
              "Nunca cambiaremos una contraseña sin verificar el correo.",
            secureUpdate:
              "La contraseña se actualizará únicamente para la cuenta verificada.",
            weak: "Débil",
            fair: "Aceptable",
            good: "Buena",
            strong: "Fuerte",
          }
        : {
            checking: "Verifying your recovery link...",
            redirecting: "Redirecting to login...",
            requestEyebrow: "Account recovery",
            requestTitle: "Reset your password",
            requestSubtitle:
              "Enter your account email and we’ll send you a secure link to continue.",
            updateEyebrow: "Account security",
            updateTitle: "Create a new password",
            updateSubtitle:
              "Your recovery link was verified. You can now create a new password.",
            email: "Email address",
            emailRequired: "Email address is required",
            emailInvalid: "Enter a valid email address",
            sendingLink: "Sending recovery link...",
            sendLink: "Send recovery link",
            linkSentTitle: "Check your email",
            linkSentText:
              "If an account is associated with that email, you’ll receive a password recovery link.",
            resendLink: "Send another link",
            passwordRequired: "Password is required",
            passwordMin: "Password must be at least 6 characters",
            confirmRequired: "Confirm your password",
            passwordsNoMatch: "Passwords do not match",
            requestError: "Unable to send the recovery link. Please try again.",
            updateError:
              "Unable to update your password. Please request a new recovery link.",
            invalidRecovery:
              "This recovery link is invalid or has expired. Please request a new one.",
            success: "Password updated successfully.",
            newPassword: "New password",
            confirmNewPassword: "Confirm new password",
            updating: "Updating password...",
            updatePassword: "Update password",
            rememberPassword: "Remember your password?",
            signIn: "Sign in",
            secureRequest:
              "We never change a password without verifying the email account.",
            secureUpdate:
              "The password will be updated only for the verified account.",
            weak: "Weak",
            fair: "Fair",
            good: "Good",
            strong: "Strong",
          },
    [isSpanish],
  );

  const [step, setStep] = useState<ResetStep>("checking");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<ResetErrors>({});

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;
      setStep(session?.user ? "update" : "request");
    };

    void checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" && session?.user) {
        setErrors({});
        setStep("update");
        return;
      }

      if (event === "SIGNED_IN" && session?.user) {
        setStep("update");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isEmailAddress = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const getPasswordStrength = (value: string) => {
    let score = 0;
    if (value.length >= 6) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = [copy.weak, copy.fair, copy.good, copy.strong];

  const validateEmail = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrors({ email: copy.emailRequired });
      return null;
    }

    if (!isEmailAddress(cleanEmail)) {
      setErrors({ email: copy.emailInvalid });
      return null;
    }

    return cleanEmail;
  };

  const validatePassword = () => {
    const newErrors: ResetErrors = {};

    if (!password) {
      newErrors.password = copy.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = copy.passwordMin;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = copy.confirmRequired;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = copy.passwordsNoMatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestReset = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setErrors({});

    const cleanEmail = validateEmail();
    if (!cleanEmail) return;

    try {
      setButtonLoading(true);

      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${siteUrl}/reset-password`,
      });

      if (error) throw error;
      setEmailSent(true);
    } catch (error: unknown) {
      console.error("Password reset request error:", error);
      setErrors({
        global: error instanceof Error ? error.message : copy.requestError,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const handleUpdatePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setErrors({});

    if (!validatePassword()) return;

    try {
      setButtonLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setStep("request");
        setErrors({ global: copy.invalidRecovery });
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setSuccess(true);
      setPageLoading(true);

      window.setTimeout(async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
      }, 1800);
    } catch (error: unknown) {
      console.error("Update password error:", error);
      setErrors({
        global: error instanceof Error ? error.message : copy.updateError,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const returnToRequestStep = async () => {
    await supabase.auth.signOut();
    setPassword("");
    setConfirmPassword("");
    setEmailSent(false);
    setSuccess(false);
    setErrors({});
    setStep("request");
  };

  if (step === "checking") {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center">
        <PageLoader />
        <p className="mt-4 text-center text-sm font-medium text-slate-500">
          {copy.checking}
        </p>
      </div>
    );
  }

  return (
    <>
      {pageLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <PageLoader />
            <p className="mt-4 text-sm font-medium text-white">
              {copy.redirecting}
            </p>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0d4db0]">
            {step === "request" ? copy.requestEyebrow : copy.updateEyebrow}
          </p>
        </div>

        <div className="relative mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0d4db0] shadow-[0_12px_28px_rgba(13,77,176,0.12)]">
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/75 via-transparent to-blue-100/50" />
          {step === "request" ? (
            <Mail className="relative" size={26} />
          ) : (
            <KeyRound className="relative" size={26} />
          )}
        </div>

        <h1 className="mt-4 text-center text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl">
          {step === "request"
            ? emailSent
              ? copy.linkSentTitle
              : copy.requestTitle
            : copy.updateTitle}
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
          {step === "request"
            ? emailSent
              ? copy.linkSentText
              : copy.requestSubtitle
            : copy.updateSubtitle}
        </p>

        <div className="my-6 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-linear-to-r from-transparent via-blue-200 to-blue-200" />
          <span className="h-2 w-2 rotate-45 rounded-[2px] border border-blue-200 bg-blue-50" />
          <span className="h-px w-16 bg-linear-to-l from-transparent via-blue-200 to-blue-200" />
        </div>

        <AnimatePresence initial={false}>
          {errors.global && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-5 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-center text-sm font-medium leading-6 text-red-600"
            >
              {errors.global}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-5 flex items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-center text-sm font-semibold text-emerald-700"
            >
              <CheckCircle size={17} />
              <span>{copy.success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {step === "request" ? (
          emailSent ? (
            <div className="space-y-4">
              <div className="rounded-[1.4rem] border border-blue-100 bg-blue-50/70 p-4 text-center">
                <p className="break-all text-sm font-semibold text-[#0d4db0]">
                  {email.trim().toLowerCase()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEmailSent(false);
                  setErrors({});
                }}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(13,77,176,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(13,77,176,0.40)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{copy.resendLink}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequestReset} className="space-y-5">
              <div>
                <FloatingLabelInput
                  id="reset-email"
                  name="reset-email"
                  label={copy.email}
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors((previous) => ({
                      ...previous,
                      email: undefined,
                      global: undefined,
                    }));
                  }}
                  maxLength={120}
                  disabled={buttonLoading}
                />
                <FieldError message={errors.email} />
              </div>

              <button
                type="submit"
                disabled={buttonLoading}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(13,77,176,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(13,77,176,0.40)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">
                  {buttonLoading ? copy.sendingLink : copy.sendLink}
                </span>
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <FloatingLabelInput
                id="new-password"
                name="new-password"
                label={copy.newPassword}
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    password: undefined,
                    global: undefined,
                  }));
                }}
                maxLength={80}
                disabled={buttonLoading || success}
              />
              <FieldError message={errors.password} />

              <AnimatePresence initial={false}>
                {password && (
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
                      {strengthLabels[passwordStrength - 1] || copy.weak}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <FloatingLabelInput
                id="confirm-password"
                name="confirm-password"
                label={copy.confirmNewPassword}
                type="password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    confirmPassword: undefined,
                    global: undefined,
                  }));
                }}
                maxLength={80}
                disabled={buttonLoading || success}
              />
              <FieldError message={errors.confirmPassword} />
            </div>

            <button
              type="submit"
              disabled={buttonLoading || success}
              className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(110deg,#0d4db0_0%,#2563eb_48%,#17468f_100%)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(13,77,176,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(13,77,176,0.40)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">
                {buttonLoading ? copy.updating : copy.updatePassword}
              </span>
            </button>

            <button
              type="button"
              onClick={() => void returnToRequestStep()}
              disabled={buttonLoading || success}
              className="w-full cursor-pointer text-center text-xs font-semibold text-slate-400 transition hover:text-[#0d4db0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copy.resendLink}
            </button>
          </form>
        )}

        <div className="mt-7 rounded-[1.4rem] border border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-blue-50/50 p-4 text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          <p className="text-sm text-slate-500">{copy.rememberPassword}</p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="group mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-bold text-[#0d4db0] transition hover:text-blue-700"
          >
            <span>{copy.signIn}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-400">
          <ShieldCheck size={15} className="shrink-0" />
          <span>
            {step === "request" ? copy.secureRequest : copy.secureUpdate}
          </span>
        </div>
      </div>
    </>
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
