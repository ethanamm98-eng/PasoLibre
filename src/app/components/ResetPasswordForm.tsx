"use client";
import { useState, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "../context/language";
import { supabase } from "../lib/supabase/supabaseClient";

import FloatingLabelInput from "./elements/FloatingLabelInput";
import PageLoader from "./elements/PageLoader";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { language } = useLanguage(); // en or es

  const t = {
    en: {
      redirecting: "Redirecting to login...",
      title: "Reset Password",
      subtitle: "Enter your new password below",
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 6 characters",
      confirmRequired: "Confirm your password",
      passwordsNoMatch: "Passwords do not match",
      updateError:
        "Unable to update your password. Please request a new reset link.",
      success: "Password updated successfully.",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
      updating: "Updating password...",
      updatePassword: "Update Password",
      rememberPassword: "Remember your password?",
      signIn: "Sign In",
    },
    es: {
      redirecting: "Redirigiendo al inicio de sesión...",
      title: "Restablecer contraseña",
      subtitle: "Ingresa tu nueva contraseña abajo",
      passwordRequired: "La contraseña es requerida",
      passwordMin: "La contraseña debe tener al menos 6 caracteres",
      confirmRequired: "Confirma tu contraseña",
      passwordsNoMatch: "Las contraseñas no coinciden",
      updateError:
        "No pudimos actualizar tu contraseña. Solicita un nuevo enlace de restablecimiento.",
      success: "Contraseña actualizada exitosamente.",
      newPassword: "Nueva contraseña",
      confirmNewPassword: "Confirmar nueva contraseña",
      updating: "Actualizando contraseña...",
      updatePassword: "Actualizar contraseña",
      rememberPassword: "¿Recuerdas tu contraseña?",
      signIn: "Iniciar sesión",
    },
  };

  const copy = t[language === "es" ? "es" : "en"];

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pageLoading, setPageLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    global?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
      global?: string;
    } = {};

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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      setButtonLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setSuccess(true);
      setPageLoading(true);

      setTimeout(() => {
        router.push("/login");
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

  return (
    <div>
      {pageLoading && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <PageLoader />
            <p className="text-white text-sm font-light mt-4">
              {copy.redirecting}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl p-8 space-y-4 animate-fade-in relative z-10">
        <h2 className="text-3xl font-bold text-center tracking-tighter mb-1 bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          {copy.title}
        </h2>

        <p className="text-sm text-gray-500 text-center">{copy.subtitle}</p>

        <AnimatePresence>
          {errors.global && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-600"
            >
              {errors.global}
            </motion.p>
          )}

          {success && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs text-emerald-700"
            >
              {copy.success}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleUpdatePassword} className="space-y-4.5">
          <div>
            <FloatingLabelInput
              id="new-password"
              name="new-password"
              label={copy.newPassword}
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
              maxLength={80}
              disabled={buttonLoading || success}
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

          <div>
            <FloatingLabelInput
              id="confirm-password"
              name="confirm-password"
              label={copy.confirmNewPassword}
              type="password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setConfirmPassword(e.target.value)
              }
              maxLength={80}
              disabled={buttonLoading || success}
            />
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={buttonLoading || success}
            className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white w-full py-3 font-semibold rounded shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {buttonLoading ? copy.updating : copy.updatePassword}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          {copy.rememberPassword}{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            {copy.signIn}
          </a>
        </p>
      </div>
    </div>
  );
}