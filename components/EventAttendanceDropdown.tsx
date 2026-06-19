"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

import { supabase } from "../lib/supabase/supabaseClient";
import { SchedulerForm } from "../lib/interfaces/events";
import { useLanguage } from "../context/language";
import Swal from "sweetalert2";

interface EventAttendanceDropdownProps {
  anchorRect: DOMRect | null;
  event: SchedulerForm;
  onConfirm: (
    event: SchedulerForm,
    status: "accepted" | "maybe" | "declined"
  ) => void;
  onClose: () => void;
}

type ProfileData = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
};

export default function EventAttendanceDropdown({
  anchorRect,
  event,
  onConfirm,
  onClose,
}: EventAttendanceDropdownProps) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    guest: isSpanish ? "Invitado" : "Guest",
    user: isSpanish ? "Usuario" : "User",
    thisEvent: isSpanish ? "este evento" : "this event",
    confirmAttendanceText: isSpanish
      ? "Confirma tu asistencia al evento"
      : "Confirm your attendance to the event",
    occurrence: isSpanish ? "Ocurrencia" : "Occurrence",
    signedInAs: isSpanish ? "Sesión iniciada como" : "Signed in as",
    loading: isSpanish ? "Cargando..." : "Loading...",
    confirmAttend: isSpanish ? "Confirmar asistencia" : "Confirm Attend",
    cancelling: isSpanish ? "Cancelando..." : "Cancelling...",
    cancelAttendance: isSpanish ? "Cancelar asistencia" : "Cancel Attendance",
    removeAttendanceError: isSpanish
      ? "No se pudo eliminar la asistencia."
      : "Unable to remove attendance.",
  };

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [displayName, setDisplayName] = useState(t.guest);
  const [displayEmail, setDisplayEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [removingAttendance, setRemovingAttendance] = useState(false);

  const eventName =
    language === "es"
      ? event?.name_es || event?.name_en || t.thisEvent
      : event?.name_en || event?.name_es || t.thisEvent;

  const occurrenceDate = event?.occurrenceDate || null;

  const checkInHref = `/check-in/${event?.id || ""}${
    occurrenceDate
      ? `?occurrenceDate=${encodeURIComponent(occurrenceDate)}`
      : ""
  }`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    let mounted = true;

    const loadSignedInUser = async () => {
      try {
        setLoadingUser(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (!session?.user) {
          setDisplayName(t.guest);
          setDisplayEmail("");
          return;
        }

        const fallbackName = session.user.email?.split("@")[0] || t.user;
        const fallbackEmail = session.user.email || "";

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, email, language_preference")
          .eq("id", session.user.id)
          .maybeSingle<ProfileData>();

        if (!mounted) return;

        if (error || !profile) {
          setDisplayName(fallbackName);
          setDisplayEmail(fallbackEmail);
          return;
        }

        const fullName =
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
          fallbackName;

        setDisplayName(fullName);
        setDisplayEmail(profile.email || fallbackEmail);
      } catch (error) {
        console.error("Dropdown auth load error:", error);
        if (mounted) {
          setDisplayName(t.guest);
          setDisplayEmail("");
        }
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    };

    loadSignedInUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadSignedInUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [t.guest, t.user]);

  const handleRemoveAttendance = async () => {
    try {
      setRemovingAttendance(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/event-attendance", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event?.id,
          occurrenceDate,
          memberId: session?.user?.id || null,
          participantEmail: displayEmail || session?.user?.email || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || t.removeAttendanceError);
      }

      onClose();

      Swal.fire({
        title: isSpanish ? "Asistencia cancelada" : "Attendance Cancelled",
        text: isSpanish
          ? "Tu asistencia ha sido cancelada."
          : "Your attendance has been cancelled.",
        icon: "success",
        confirmButtonText: isSpanish ? "Cerrar" : "Close",
      });
    } catch (error) {
      console.error("Remove attendance error:", error);
    } finally {
      setRemovingAttendance(false);
    }
  };

  if (!anchorRect) return null;

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const dropdownWidth = 320;
  const gap = 12;

  let top = anchorRect.top;
  let left = anchorRect.right + gap;

  if (left + dropdownWidth > window.innerWidth - 12) {
    left = anchorRect.left - dropdownWidth - gap;
  }

  if (left < 12) left = 12;
  if (top < 12) top = 12;

  return (
    <div
      ref={ref}
      className="fixed z-9999 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in hidden md:block"
      style={{ top, left }}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {eventName}
          </p>

          <p className="mr-3 text-xs text-slate-500">
            {t.confirmAttendanceText}{" "}
            <span
              onClick={() => router.push(checkInHref)}
              className="cursor-pointer text-blue-600 transition duration-300 hover:underline"
            >
              {eventName}
            </span>
          </p>

          {occurrenceDate && (
            <p className="mt-1 text-[11px] font-medium text-slate-400">
              {t.occurrence}: {occurrenceDate}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="cursor-pointer text-slate-400 transition duration-300 hover:text-red-600"
        >
          <FiX />
        </button>
      </div>

      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
          {avatarLetter}
        </div>

        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[11px] uppercase tracking-wide text-slate-400">
            {t.signedInAs}
          </span>
          <span className="truncate text-sm font-medium text-slate-800">
            {loadingUser ? t.loading : displayName}
          </span>
          {!!displayEmail && !loadingUser && (
            <span className="truncate text-xs text-slate-500">
              {displayEmail}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-2">
        {!event?.userHasConfirmed ? (
          <button
            onClick={() => onConfirm(event, "accepted")}
            disabled={loadingUser}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-emerald-700 transition bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            <FiCheckCircle className="text-lg" />
            {t.confirmAttend}
          </button>
        ) : (
          <button
            onClick={handleRemoveAttendance}
            disabled={removingAttendance}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-rose-700 transition bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            <FiXCircle className="text-lg" />
            {removingAttendance ? t.cancelling : t.cancelAttendance}
          </button>
        )}
      </div>
    </div>
  );
}
