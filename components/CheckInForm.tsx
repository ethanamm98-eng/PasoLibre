"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  CalendarCheck2,
  CheckCircle2,
  LogIn,
  UserCheck,
  Maximize2,
  CalendarDays,
  Share2,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { createRoot } from "react-dom/client";

import FloatingLabelInput from "./elements/FloatingLabelInput";
import { useLanguage } from "../context/language";
import { SchedulerForm } from "../lib/interfaces/events";

type AttendanceSheetRecord = {
  id: string;
  title?: string | null;
  notes?: string | null;
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type AttendanceEntry = {
  id: string;
  participant_name?: string | null;
  participant_email?: string | null;
  participant_phone?: string | null;
  status?: string | null;
  checked_in?: boolean | null;
  member_id?: string | null;
};

type ProfileRecord = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
  gender?: string | null;
  pronouns?: string | null;
  dob?: string | null;
  city?: string | null;
  country?: string | null;
  sexual_orientation?: string | null;
  occupation?: string | null;
  profile_picture?: string | null;
  language_preference: string | null;
};

type CheckInFormProps = {
  event: SchedulerForm;
  attendanceSheetId: string | null;
  attendanceSheet?: AttendanceSheetRecord | null;
  existingEntry: AttendanceEntry | null;
  invitedEmail?: string;
  invitedMemberId?: string;
  invitedName?: string;
  loggedInUser?: unknown | null;
  loggedInProfile?: ProfileRecord | null;
};

export default function CheckInForm({
  event,
  attendanceSheetId,
  attendanceSheet,
  existingEntry,
  invitedEmail = "",
  invitedMemberId = "",
  invitedName = "",
  loggedInUser,
  loggedInProfile,
}: CheckInFormProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const t = {
    unableLoadAttendance: isSpanish
      ? "No se pudo cargar la asistencia."
      : "Unable to load attendance.",
    confirmationEmailFailed: isSpanish
      ? "No se pudo enviar el correo de confirmación."
      : "Confirmation email failed.",
    nameRequiredTitle: isSpanish ? "Nombre requerido" : "Name required",
    nameRequiredText: isSpanish
      ? "Por favor escribe tu nombre antes de confirmar tu asistencia."
      : "Please enter your name before confirming attendance.",
    unableConfirmAttendance: isSpanish
      ? "No se pudo confirmar la asistencia."
      : "Unable to confirm attendance.",
    somethingWentWrong: isSpanish
      ? "Algo salió mal al guardar tu asistencia."
      : "Something went wrong while saving your attendance.",
    attendanceConfirmedTitle: isSpanish
      ? "Asistencia confirmada"
      : "Attendance confirmed",
    attendanceConfirmedText: isSpanish
      ? `Has sido marcado como asistiendo a ${event.name_es}.`
      : `You have been marked as attending ${event.name_en}.`,
    cardTitleConfirmed: isSpanish
      ? "Asistencia Confirmada"
      : "Attendance Confirmed",
    cardTitleDefault: isSpanish ? "Confirmar Asistencia" : "Confirm Attendance",
    cardTextConfirmed: isSpanish
      ? "Tu asistencia fue registrada correctamente."
      : "Your attendance has been recorded successfully.",
    cardTextDefault: isSpanish
      ? "Puedes confirmar asistencia como invitado o iniciar sesión para una experiencia más rápida."
      : "You can confirm attendance as a guest or sign in for a faster experience.",
    qrTitle: isSpanish ? "Código QR del Evento" : "Event QR Code",
    qrDescription: isSpanish
      ? "Escanea este código para abrir la página de check-in de este evento."
      : "Guests can scan this code to open the check-in page for this event.",
    qrClick: isSpanish
      ? "Haz clic para agrandar el código QR"
      : "Click to enlarge QR code",
    checkingAccount: isSpanish
      ? "Verificando estado de cuenta..."
      : "Checking account status...",
    signedIn: isSpanish ? "Sesión iniciada" : "Signed in",
    autoFilled: isSpanish
      ? "Tu información se completó automáticamente"
      : "Your information has been auto-filled",
    reviewConfirm: isSpanish
      ? "Revisa la información y confirma tu asistencia."
      : "Review it and confirm attendance.",
    continueGuestOrSignIn: isSpanish
      ? "Continuar como invitado o iniciar sesión"
      : "Continue as guest or sign in",
    guestText: isSpanish
      ? "Puedes unirte a este evento sin una cuenta, o iniciar sesión para completar tu información automáticamente."
      : "You can join this event without an account, or sign in to auto-fill your information.",
    signIn: isSpanish ? "Iniciar sesión" : "Sign In",
    orContinueGuest: isSpanish
      ? "O Continuar Como Invitado"
      : "Or Continue As Guest",
    fullName: isSpanish ? "Nombre completo" : "Full Name",
    email: isSpanish ? "Correo electrónico" : "Email",
    phone: isSpanish ? "Teléfono" : "Phone",
    saving: isSpanish ? "Guardando..." : "Saving...",
    checkingAttendance: isSpanish
      ? "Verificando asistencia..."
      : "Checking Attendance...",
    attendanceInactive: isSpanish
      ? "Asistencia inactiva"
      : "Attendance Inactive",
    confirmAttendance: isSpanish
      ? "Confirmar asistencia"
      : "Confirm Attendance",
    scanQr: isSpanish
      ? "Escanea este código para abrir la página de check-in."
      : "Scan this code to open the check-in page.",
    pointCamera: isSpanish
      ? "Apunta tu cámara al código QR para abrir la página de check-in del evento."
      : "Point your camera at the QR code to open the event check-in page.",
    viewCalendar: isSpanish ? "Ver en Calendario" : "View Calendar",
    shareEvent: isSpanish ? "Compartir evento" : "Share Event",
    shareCopiedTitle: isSpanish ? "Enlace copiado" : "Link copied",
    shareCopiedText: isSpanish
      ? "El enlace del evento fue copiado al portapapeles."
      : "The event link was copied to your clipboard.",
    shareFailedTitle: isSpanish ? "No se pudo compartir" : "Unable to share",
    shareFailedText: isSpanish
      ? "Intenta copiar el enlace manualmente."
      : "Try copying the link manually.",
    musicTitle: isSpanish ? "Añadir música" : "Add Music",
    musicDescription: isSpanish
      ? "Busca una canción para incluirla en el mensaje compartido."
      : "Search for a song to include in the shared message.",
    musicPlaceholder: isSpanish
      ? "Buscar canción o artista..."
      : "Search song or artist...",
    searchMusic: isSpanish ? "Buscar" : "Search",
    selectedSong: isSpanish ? "Canción seleccionada" : "Selected Song",
    removeSong: isSpanish ? "Quitar canción" : "Remove Song",
    noMusicResults: isSpanish
      ? "Busca una canción para ver resultados."
      : "Search for a song to see results.",
  };

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [sheetLoading, setSheetLoading] = useState(true);
  const [qrOpen, setQrOpen] = useState(false);

  const [confirmed, setConfirmed] = useState(
    existingEntry?.status === "attended" || !!existingEntry?.checked_in
  );

  const [, setParticipantCount] = useState(0);
  const [, setConfirmedCount] = useState(
    existingEntry?.status === "attended" || existingEntry?.checked_in ? 1 : 0
  );

  const [loggedInUserState, setLoggedInUserState] = useState<unknown | null>(
    () => loggedInUser || null
  );

  const [profile, setProfile] = useState<ProfileRecord | null>(
    loggedInProfile || null
  );

  const [resolvedAttendanceSheet, setResolvedAttendanceSheet] =
    useState<AttendanceSheetRecord | null>(attendanceSheet || null);

  const [resolvedExistingEntry, setResolvedExistingEntry] =
    useState<AttendanceEntry | null>(existingEntry || null);

  const [formData, setFormData] = useState(() => {
    const profileName = [
      loggedInProfile?.first_name,
      loggedInProfile?.last_name,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return {
      name: existingEntry?.participant_name || profileName || invitedName || "",
      email:
        existingEntry?.participant_email ||
        loggedInProfile?.email ||
        (loggedInUser as { email?: string })?.email ||
        invitedEmail ||
        "",
      phone: existingEntry?.participant_phone || loggedInProfile?.phone || "",
    };
  });

  const [selectedMusic] = useState<{
    trackName: string;
    artistName: string;
    trackViewUrl?: string;
  } | null>(null);

  const [checkInUrl, setCheckInUrl] = useState(
    `/check-in/${event.id}?occurrenceDate=${event.date}`
  );

  const effectiveAttendanceSheetId =
    resolvedAttendanceSheet?.id || attendanceSheetId || null;

  const attendanceAvailable = !!effectiveAttendanceSheetId;

  const attendanceActive =
    attendanceAvailable && (resolvedAttendanceSheet?.is_active ?? true);

  useEffect(() => {
    if (!qrOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [qrOpen]);

  useEffect(() => {
    setCheckInUrl(
      `${window.location.origin}/check-in/${event.id}?occurrenceDate=${event.date}`
    );
  }, [event.id, event.date]);

  const getSelectedMusicText = () => {
    if (!selectedMusic) return "";

    return isSpanish
      ? `\n\nCanción sugerida: ${selectedMusic.trackName} — ${
          selectedMusic.artistName
        }${selectedMusic.trackViewUrl ? `\n${selectedMusic.trackViewUrl}` : ""}`
      : `\n\nSuggested song: ${selectedMusic.trackName} — ${
          selectedMusic.artistName
        }${
          selectedMusic.trackViewUrl ? `\n${selectedMusic.trackViewUrl}` : ""
        }`;
  };

  const handleShareEvent = async () => {
    try {
      if (typeof window === "undefined") return;

      const title = isSpanish ? event.name_es : event.name_en;
      const shareText = `${
        isSpanish
          ? `Te invito a este evento: ${title}`
          : `You're invited to this event: ${title}`
      }${getSelectedMusicText()}`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `${shareText}\n${checkInUrl}`
      )}`;

      const instagramText = `${shareText}\n${checkInUrl}`;

      await Swal.fire({
        title: isSpanish ? "Compartir Evento" : "Share Event",
        html: `
              <div class="flex flex-col gap-3 mt-3">
                <button id="share-native" class="swal-share-btn">
                  <span class="swal-share-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  ${isSpanish ? "Compartir" : "Share"}
                </button>
      
                <button id="share-whatsapp" class="swal-share-btn whatsapp">
                  <span class="swal-share-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5A8.38 8.38 0 0 1 12.5 20A8.5 8.5 0 0 1 8.6 19L3 21L5 15.6A8.5 8.5 0 1 1 21 11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  WhatsApp
                </button>
      
                <button id="share-instagram" class="swal-share-btn instagram">
                  <span class="swal-share-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                    </svg>
                  </span>
                  Instagram
                </button>
      
                <button id="copy-link" class="swal-share-btn copy">
                  <span class="swal-share-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                      <rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </span>
                  ${isSpanish ? "Copiar enlace" : "Copy Link"}
                </button>
              </div>
      
              <style>
                .swal-share-btn{
                  width:100%;
                  border:none;
                  cursor:pointer;
                  border-radius:16px;
                  padding:14px 16px;
                  font-weight:700;
                  transition:.2s;
                  background:#2563eb;
                  color:white;
                  box-shadow:0 10px 24px rgba(37,99,235,.18);
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  gap:10px;
                }
                .swal-share-btn:hover{
                  transform:translateY(-2px);
                }
                .swal-share-icon{
                  display:inline-flex;
                  align-items:center;
                  justify-content:center;
                }
                .swal-share-btn.whatsapp{
                  background:#25D366;
                }
                .swal-share-btn.instagram{
                  background:linear-gradient(
                    135deg,
                    #f58529,
                    #dd2a7b,
                    #8134af,
                    #515bd4
                  );
                }
                .swal-share-btn.copy{
                  background:#0f172a;
                }
              </style>
            `,
        showConfirmButton: false,
        didOpen: () => {
          const nativeBtn = document.getElementById("share-native");
          const whatsappBtn = document.getElementById("share-whatsapp");
          const instagramBtn = document.getElementById("share-instagram");
          const copyBtn = document.getElementById("copy-link");

          nativeBtn?.addEventListener("click", async () => {
            if (navigator.share) {
              await navigator.share({
                title,
                text: shareText,
                url: checkInUrl,
              });
            } else {
              await navigator.clipboard.writeText(checkInUrl);

              Swal.fire({
                icon: "success",
                title: t.shareCopiedTitle,
                text: t.shareCopiedText,
              });
            }
          });

          whatsappBtn?.addEventListener("click", () => {
            window.open(whatsappUrl, "_blank");
          });

          instagramBtn?.addEventListener("click", async () => {
            try {
              await navigator.clipboard.writeText(instagramText);

              window.open("https://www.instagram.com/direct/inbox/", "_blank");

              setTimeout(() => {
                window.location.href = "instagram://direct";
              }, 400);

              setTimeout(() => {
                Swal.fire({
                  icon: "info",
                  title: "Instagram",
                  html: `
                    <div class="text-sm text-slate-600 leading-6">
                      ${
                        isSpanish
                          ? "El mensaje y enlace del evento fueron copiados automáticamente.<br/><br/>Instagram Chats se abrió. Solo pega el mensaje en el chat o historia."
                          : "The event message and link were copied automatically.<br/><br/>Instagram Chats opened. Simply paste the message into the chat or story."
                      }
                    </div>
                  `,
                  confirmButtonColor: "#0d4db0",
                });
              }, 700);
            } catch (error) {
              console.error(error);

              Swal.fire({
                icon: "error",
                title: t.shareFailedTitle,
                text: t.shareFailedText,
              });
            }
          });

          copyBtn?.addEventListener("click", async () => {
            await navigator.clipboard.writeText(checkInUrl);

            Swal.fire({
              icon: "success",
              title: t.shareCopiedTitle,
              text: t.shareCopiedText,
            });
          });
        },
      });
    } catch (error) {
      console.error("Share event error:", error);

      Swal.fire({
        icon: "error",
        title: t.shareFailedTitle,
        text: t.shareFailedText,
      });
    }
  };

  useEffect(() => {
    if (!qrOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [qrOpen]);

  useEffect(() => {
    setLoggedInUserState(loggedInUser || null);
    setProfile(loggedInProfile || null);

    const profileName = [
      loggedInProfile?.first_name,
      loggedInProfile?.last_name,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    setFormData((prev) => ({
      name: prev.name || profileName || invitedName || "",
      email:
        prev.email ||
        loggedInProfile?.email ||
        (loggedInUser as { email?: string })?.email ||
        invitedEmail ||
        "",
      phone: prev.phone || loggedInProfile?.phone || "",
    }));

    setProfileLoading(false);
  }, [loggedInUser, loggedInProfile, invitedEmail, invitedName]);

  useEffect(() => {
    let mounted = true;

    const loadAttendanceFromApi = async () => {
      try {
        setSheetLoading(true);

        // const params = new URLSearchParams({
        //   eventId: event?.id,
        //   memberId: invitedMemberId || loggedInUserState?.id || "",
        //   email: formData.email || invitedEmail || "",
        // });

        const occurrenceDate = event?.occurrenceDate || event?.date || "";

        const params = new URLSearchParams({
          eventId: event?.id,
          occurrenceDate,
          memberId:
            invitedMemberId ||
            (typeof loggedInUserState === "object" &&
            loggedInUserState !== null &&
            "id" in loggedInUserState
              ? (loggedInUserState as { id: string }).id
              : "") ||
            "",
          email: formData.email || invitedEmail || "",
        });

        const response = await fetch(`/api/event-attendance?${params}`);
        const result = await response.json();

        if (!mounted) return;

        if (!response.ok || !result?.success) {
          throw new Error(result?.message || t.unableLoadAttendance);
        }

        setResolvedAttendanceSheet(result.attendanceSheet || null);
        setResolvedExistingEntry(result.existingEntry || null);
        setParticipantCount(result.participantCount || 0);
        setConfirmedCount(result.confirmedCount || 0);

        if (result.existingEntry) {
          setConfirmed(
            result.existingEntry.status === "attended" ||
              !!result.existingEntry.checked_in
          );

          setFormData((prev) => ({
            name: prev.name || result.existingEntry.participant_name || "",
            email: prev.email || result.existingEntry.participant_email || "",
            phone: prev.phone || result.existingEntry.participant_phone || "",
          }));
        }
      } catch (error) {
        console.error("Attendance API load failed:", error);
      } finally {
        if (mounted) setSheetLoading(false);
      }
    };

    loadAttendanceFromApi();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id, invitedMemberId, invitedEmail, loggedInUserState]);

  const sendAttendanceConfirmationEmail = async () => {
    const recipientEmail = formData.email.trim();

    if (!recipientEmail) return;

    try {
      const response = await fetch("/api/send-attendance-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event?.id,
          eventNameEn: event?.name_en,
          eventNameEs: event?.name_es,
          eventDate: event?.occurrenceDate || event?.date,
          participantName: formData.name.trim(),
          participantEmail: recipientEmail,
          participantLanguagePreference:
            profile?.language_preference || language || "en",
          checkInUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || result?.error || t.confirmationEmailFailed
        );
      }
    } catch (error) {
      console.error("Attendance confirmation email error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmAttendance = async () => {
    // Prevent attendance confirmation for past events
    const occurrenceDate = event?.occurrenceDate || event?.date;

    const eventTime = event?.time || "23:59";

    if (occurrenceDate) {
      const eventDateTime = new Date(`${occurrenceDate}T${eventTime}`);

      if (eventDateTime < new Date()) {
        Swal.fire({
          icon: "info",
          title: language === "es" ? "Evento finalizado" : "Event has ended",
          text:
            language === "es"
              ? "No puedes confirmar asistencia para eventos pasados."
              : "You cannot confirm attendance for past events.",
        });

        return;
      }
    }

    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: t.nameRequiredTitle,
        text: t.nameRequiredText,
      });

      return;
    }

    try {
      setLoading(true);

      const resolvedMemberId =
        invitedMemberId ||
        (typeof loggedInUserState === "object" &&
        loggedInUserState !== null &&
        "id" in loggedInUserState
          ? (loggedInUserState as { id: string }).id
          : null) ||
        resolvedExistingEntry?.member_id ||
        null;

      const response = await fetch("/api/event-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event?.id,
          occurrenceDate: event?.date,
          attendanceSheetId: effectiveAttendanceSheetId,
          participantName: formData.name.trim(),
          participantEmail: formData.email.trim() || null,
          participantPhone: formData.phone.trim() || null,
          memberId: resolvedMemberId,
          status: "attended",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || t.unableConfirmAttendance);
      }

      router.refresh();

      setResolvedExistingEntry(result.entry);
      setParticipantCount(result.participantCount || 0);
      setConfirmedCount(result.confirmedCount || 0);
      setConfirmed(true);

      await sendAttendanceConfirmationEmail();

      Swal.fire({
        icon: "success",
        title: t.attendanceConfirmedTitle,
        text: t.attendanceConfirmedText,
      });
    } catch (error) {
      console.error("Attendance confirmation error:", error);

      Swal.fire({
        icon: "error",
        title: t.unableConfirmAttendance,
        text: error instanceof Error ? error.message : t.somethingWentWrong,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResolvedExistingEntry(existingEntry || null);
    setConfirmed(
      existingEntry?.status === "attended" || !!existingEntry?.checked_in
    );
  }, [existingEntry]);

  const autoFilledName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  const handleOpenQrAlert = async () => {
    const qrContainerId = "event-qr-swal-container";
    let root: ReturnType<typeof createRoot> | null = null;

    await Swal.fire({
      title: "",
      html: `
          <div class="event-qr-swal">
            <div class="event-qr-header">
              <p class="event-qr-eyebrow">${t.qrTitle}</p>
              <h3 class="event-qr-title">
                ${language === "es" ? event.name_es : event.name_en}
              </h3>
              <p class="event-qr-subtitle">${t.scanQr}</p>
            </div>
    
            <div id="${qrContainerId}" class="event-qr-code"></div>
    
            <p class="event-qr-help">${t.pointCamera}</p>
    
            <p class="event-qr-url">${checkInUrl}</p>
          </div>
    
          <style>
            .swal2-popup {
              border-radius: 32px !important;
              padding: 0 !important;
              overflow: hidden !important;
              width: min(92vw, 520px) !important;
              background: white !important;
            }
    
            .swal2-html-container {
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
            }
    
            .swal2-close {
              color: white !important;
              font-size: 32px !important;
              top: 14px !important;
              right: 16px !important;
            }
    
            .event-qr-swal {
              background:
                radial-gradient(circle at top right, rgba(59,130,246,.18), transparent 34%),
                linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            }
    
            .event-qr-header {
              background: linear-gradient(135deg, #0d4db0, #2563eb, #4f46e5);
              color: white;
              padding: 28px 24px 24px;
              text-align: left;
            }
    
            .event-qr-eyebrow {
              margin: 0;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: .2em;
              text-transform: uppercase;
              color: rgba(219,234,254,.95);
            }
    
            .event-qr-title {
              margin: 6px 0 0;
              font-size: 22px;
              line-height: 1.2;
              font-weight: 800;
            }
    
            .event-qr-subtitle {
              margin: 8px 0 0;
              font-size: 14px;
              color: rgba(219,234,254,.95);
            }
    
            .event-qr-code {
              width: fit-content;
              max-width: 86vw;
              margin: 28px auto 0;
              border: 1px solid #e2e8f0;
              border-radius: 28px;
              background: white;
              padding: 18px;
              box-shadow: 0 24px 60px rgba(15,23,42,.16);
            }
    
            .event-qr-code canvas {
              width: min(68vw, 340px) !important;
              height: min(68vw, 340px) !important;
              display: block;
            }
    
            .event-qr-help {
              max-width: 360px;
              margin: 22px auto 0;
              padding: 0 24px;
              font-size: 14px;
              line-height: 1.6;
              font-weight: 600;
              color: #64748b;
            }
    
            .event-qr-url {
              max-width: calc(100% - 48px);
              margin: 18px auto 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              border: 1px solid #e2e8f0;
              border-radius: 999px;
              background: #f8fafc;
              padding: 10px 14px;
              font-size: 12px;
              color: #64748b;
            }
          </style>
        `,
      showConfirmButton: false,
      showCloseButton: true,
      background: "#ffffff",
      customClass: {
        popup: "event-qr-popup",
      },
      didOpen: () => {
        const container = document.getElementById(qrContainerId);

        if (!container) return;

        root = createRoot(container);

        root.render(
          <QRCodeCanvas
            value={checkInUrl}
            size={420}
            bgColor="#ffffff"
            fgColor="#0d4db0"
            level="H"
            includeMargin={false}
          />
        );
      },
      willClose: () => {
        root?.unmount();
        root = null;
      },
    });
  };

  return (
    <>
      <div
        className={`relative my-0 w-full overflow-hidden rounded-4xl border px-5 py-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500 md:px-6 md:py-7 ${
          confirmed
            ? "border-green-200 bg-linear-to-br from-green-50 via-white to-blue-50"
            : "border-white/80 bg-white/92"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_24%)]" />

        <div className="relative">
          <div className="mb-1 flex items-start gap-3">
            <div
              className={`flex h-10 w-10 md:h-13 md:w-13 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                confirmed
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {confirmed ? (
                <CheckCircle2 size={23} />
              ) : (
                <CalendarCheck2 className="md:w-8 md:h-8 w-6 h-6" />
              )}
            </div>

            <div>
              <p className="mb-1 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
                {language === "en" ? "Invitation" : "Invitación"}
              </p>

              <h2 className="text-lg md:text-2xl font-semibold tracking-tight text-slate-950">
                {confirmed ? t.cardTitleConfirmed : t.cardTitleDefault}
              </h2>
            </div>
          </div>

          <div>
            <p className="mt-1 mb-2 text-sm leading-6 text-slate-500 px-1">
              {confirmed ? t.cardTextConfirmed : t.cardTextDefault}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenQrAlert}
            className="mb-5 w-full cursor-pointer overflow-hidden rounded-[1.35rem] border border-blue-100 bg-linear-to-br from-blue-50 via-white to-slate-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left lg:flex-col lg:text-center xl:flex-row xl:text-left">
              <div className="relative shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <QRCodeCanvas
                  value={checkInUrl}
                  size={112}
                  bgColor="#ffffff"
                  fgColor="#0d4db0"
                  level="H"
                  includeMargin={false}
                />

                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-sm">
                  <Maximize2 size={15} />
                </div>
              </div>

              <div className="min-w-0 max-w-full">
                <p className="text-sm font-semibold text-slate-900">
                  {t.qrTitle}
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {t.qrDescription}
                </p>

                <p className="mt-2 max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                  {checkInUrl}
                </p>

                <p className="mt-2 text-xs font-semibold text-blue-600">
                  {t.qrClick}
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleShareEvent}
            className={`${
              confirmed ? "mb-3" : "mb-5"
            }  inline-flex w-full items-center justify-center gap-2 rounded-2xl 
              bg-linear-to-r from-[#0d4db0] via-blue-600 to-indigo-700 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(37,99,235,0.38)] cursor-pointer`}
          >
            <Share2 size={16} />
            {t.shareEvent}
          </button>

          {!confirmed && (
            <div className="mb-5 rounded-[1.35rem] border border-slate-200 bg-slate-50/90 px-4 py-4 shadow-sm">
              {profileLoading ? (
                <p className="text-sm text-slate-500">{t.checkingAccount}</p>
              ) : loggedInUserState ? (
                <div className="flex items-start gap-3">
                  <div>
                    <div className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                        <UserCheck size={18} />
                      </div>
                      <p className="text-base font-semibold text-slate-800 my-auto">
                        {t.signedIn}
                      </p>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500 p-1">
                      {t.autoFilled}
                      {autoFilledName
                        ? ` ${isSpanish ? "para" : "for"} ${autoFilledName}`
                        : ""}
                      . {t.reviewConfirm}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {t.continueGuestOrSignIn}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {t.guestText}
                    </p>
                  </div>

                  <Link
                    href={`/login?redirect=/check-in/${event?.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md"
                  >
                    <LogIn size={16} />
                    <span>{t.signIn}</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {!confirmed && !profileLoading && !loggedInUserState && (
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 shadow-sm">
                  {t.orContinueGuest}
                </span>
              </div>
            </div>
          )}

          {/* Form to fill out and check in */}
          {!confirmed && (
            <div className="space-y-3 rounded-[1.35rem] border border-slate-200 bg-white/80 p-4 shadow-sm">
              <FloatingLabelInput
                id="name"
                name="name"
                label={t.fullName}
                value={formData.name}
                onChange={handleChange}
                type="text"
              />

              <FloatingLabelInput
                id="email"
                name="email"
                label={t.email}
                value={formData.email}
                onChange={handleChange}
                type="email"
              />

              <FloatingLabelInput
                id="phone"
                name="phone"
                label={t.phone}
                value={formData.phone}
                onChange={handleChange}
                type="tel"
              />
            </div>
          )}

          {/* Confirm attendance button */}
          {!confirmed && (
            <button
              type="button"
              onClick={handleConfirmAttendance}
              disabled={
                loading || sheetLoading || !attendanceActive || confirmed
              }
              className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition ${
                confirmed
                  ? "bg-linear-to-r from-green-600 to-emerald-700"
                  : "bg-linear-to-r from-[#0d4db0] to-indigo-700 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {loading
                ? t.saving
                : sheetLoading
                ? t.checkingAttendance
                : confirmed
                ? t.cardTitleConfirmed
                : !attendanceActive
                ? t.attendanceInactive
                : t.confirmAttendance}
            </button>
          )}

          {/* View Calendar button */}
          {confirmed && (
            <Link
              href="/events"
              className={`${
                confirmed ? "" : "mt-6"
              }  inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-green-600 to-emerald-700 
                px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl`}
            >
              <CalendarDays size={17} />
              {t.viewCalendar}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
