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
    status: "accepted" | "maybe" | "declined",
  ) => void;
  onClose: () => void;
  loadEvents: () => void;
}

type ProfileData = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
};

type DropdownPosition = {
  top: number;
  left: number;
};

type DragState = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startLeft: number;
  startTop: number;
};

export default function EventAttendanceDropdown({
  anchorRect,
  event,
  onConfirm,
  onClose,
  loadEvents,
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
  const dragStateRef = useRef<DragState | null>(null);
  const router = useRouter();

  const [displayName, setDisplayName] = useState(t.guest);
  const [displayEmail, setDisplayEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [removingAttendance, setRemovingAttendance] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<DropdownPosition>({
    top: 12,
    left: 12,
  });

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
    if (!anchorRect) return;

    const dropdownWidth = 320;
    const gap = 12;
    const viewportPadding = 12;

    let top = anchorRect.top;
    let left = anchorRect.right + gap;

    if (left + dropdownWidth > window.innerWidth - viewportPadding) {
      left = anchorRect.left - dropdownWidth - gap;
    }

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    if (top < viewportPadding) {
      top = viewportPadding;
    }

    setPosition({
      top,
      left,
    });
  }, [anchorRect]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDragging) return;

      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDragging, onClose]);

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

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest('[role="button"]')
    ) {
      return;
    }

    dragStateRef.current = {
      pointerId: e.pointerId,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      startLeft: position.left,
      startTop: position.top,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== e.pointerId) {
      return;
    }

    const dropdownWidth = ref.current?.offsetWidth || 320;
    const dropdownHeight = ref.current?.offsetHeight || 0;
    const viewportPadding = 12;

    const deltaX = e.clientX - dragState.startPointerX;
    const deltaY = e.clientY - dragState.startPointerY;

    const nextLeft = dragState.startLeft + deltaX;
    const nextTop = dragState.startTop + deltaY;

    const maxLeft = Math.max(
      viewportPadding,
      window.innerWidth - dropdownWidth - viewportPadding,
    );

    const maxTop = Math.max(
      viewportPadding,
      window.innerHeight - dropdownHeight - viewportPadding,
    );

    setPosition({
      left: Math.min(Math.max(nextLeft, viewportPadding), maxLeft),
      top: Math.min(Math.max(nextTop, viewportPadding), maxTop),
    });
  };

  const handleDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== e.pointerId) {
      return;
    }

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
  };

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

      setTimeout(() => {
        loadEvents();
      }, 500);

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

  return (
    <div
      ref={ref}
      className="fixed z-9999 hidden w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in md:block"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        className={`flex touch-none select-none items-center justify-between border-b border-slate-100 px-4 py-3 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
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
          type="button"
          onClick={onClose}
          className="cursor-pointer text-slate-400 transition duration-300 hover:text-red-600"
          aria-label={isSpanish ? "Cerrar" : "Close"}
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
            type="button"
            onClick={() => onConfirm(event, "accepted")}
            disabled={loadingUser}
            className="flex cursor-pointer items-center gap-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiCheckCircle className="text-lg" />
            {t.confirmAttend}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemoveAttendance}
            disabled={removingAttendance}
            className="flex cursor-pointer items-center gap-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiXCircle className="text-lg" />
            {removingAttendance ? t.cancelling : t.cancelAttendance}
          </button>
        )}
      </div>
    </div>
  );
}
