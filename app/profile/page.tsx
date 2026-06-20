"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import {
  Mail,
  ShieldCheck,
  PencilLine,
  Lock,
  UserRound,
  Phone,
  BadgeCheck,
  MapPin,
  CalendarDays,
  Medal,
  ChevronDown,
} from "lucide-react";
import { BsGenderTrans } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { LuContactRound } from "react-icons/lu";
import { RiUserHeartLine } from "react-icons/ri";
import { LiaMedalSolid } from "react-icons/lia";
import { TbRainbow } from "react-icons/tb";

import { supabase } from "../lib/supabase/supabaseClient";
import { useLanguage } from "../context/language";

import Navbar from "../components/NavBar";
import EditProfileOffCanvas from "../components/EditProfileOffCanvas";

type ProfileState = {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  pronouns: string;
  dob: string;
  city: string;
  country: string;
  sexualOrientation: string;
  race: string;
  nationality: string;
  languagePreference: string;
  occupation: string;
  profilePicture: string;
  createdAt: string;
};

type WalkingClubAttendanceRecord = {
  id: string;
  checked_in_at: string | null;
  status: string;
  event: {
    id: string;
    name_en?: string | null;
    name_es?: string | null;
    name?: string | null;
    description_en?: string | null;
    description_es?: string | null;
    description?: string | null;
    date: string | null;
    time: string | null;
    type?: string | null;
    street_address?: string | null;
    city?: string | null;
    color: string | null;
  };
};

function formatReadableDate(value?: string, locale = "en-US") {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    const fallbackDate = new Date(value);
    if (Number.isNaN(fallbackDate.getTime())) return value;

    return fallbackDate.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatJoinedDate(value?: string, locale = "en-US") {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
}

function formatEventDate(
  date?: string | null,
  time?: string | null,
  locale = "en-US"
) {
  if (!date)
    return locale === "es-PR" ? "Fecha no disponible" : "Date unavailable";

  const eventDate = new Date(`${date}T${time || "00:00"}`);

  if (Number.isNaN(eventDate.getTime())) {
    return formatReadableDate(date, locale);
  }

  return eventDate.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeEventColor(color?: string | null) {
  const fallback = "#f59e0b";
  const cleanColor = String(color || "").trim();

  if (/^#[0-9A-F]{6}$/i.test(cleanColor)) return cleanColor;

  if (/^#[0-9A-F]{3}$/i.test(cleanColor)) {
    return `#${cleanColor
      .slice(1)
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }

  return fallback;
}

const normalizeProfileValue = (value?: string | null) =>
  String(value || "").trim();

const normalizeProfileForCompare = (profile: ProfileState | null) => {
  if (!profile) return null;

  return {
    id: normalizeProfileValue(profile.id),
    firstName: normalizeProfileValue(profile.firstName),
    lastName: normalizeProfileValue(profile.lastName),
    username: normalizeProfileValue(profile.username),
    email: normalizeProfileValue(profile.email).toLowerCase(),
    phone: normalizeProfileValue(profile.phone),
    role: normalizeProfileValue(profile.role),
    gender: normalizeProfileValue(profile.gender),
    pronouns: normalizeProfileValue(profile.pronouns),
    dob: normalizeProfileValue(profile.dob),
    city: normalizeProfileValue(profile.city),
    country: normalizeProfileValue(profile.country),
    sexualOrientation: normalizeProfileValue(profile.sexualOrientation),
    race: normalizeProfileValue(profile.race),
    nationality: normalizeProfileValue(profile.nationality),
    languagePreference: normalizeProfileValue(profile.languagePreference),
    occupation: normalizeProfileValue(profile.occupation),
    profilePicture: normalizeProfileValue(profile.profilePicture),
    createdAt: normalizeProfileValue(profile.createdAt),
  };
};

const areProfilesEqual = (
  left: ProfileState | null,
  right: ProfileState | null
) => {
  return (
    JSON.stringify(normalizeProfileForCompare(left)) ===
    JSON.stringify(normalizeProfileForCompare(right))
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const isSpanish = language === "es";
  const locale = isSpanish ? "es-PR" : "en-US";

  const t = {
    loadingProfile: isSpanish ? "Cargando perfil" : "Loading profile",
    loadingProfileText: isSpanish
      ? "Verificando tu sesión y cargando tu información..."
      : "Verifying your session and loading your information...",
    accessRestricted: isSpanish ? "Acceso restringido" : "Access restricted",
    accessRestrictedText: isSpanish
      ? "Solo puedes ver tu propio perfil autenticado."
      : "You can only view your own authenticated profile.",
    goHome: isSpanish ? "Ir al Inicio" : "Go Home",
    uploading: isSpanish ? "Subiendo..." : "Uploading...",
    changePhoto: isSpanish ? "Cambiar Foto" : "Change Photo",
    noEmail: isSpanish ? "Sin correo" : "No email",
    saving: isSpanish ? "Guardando..." : "Saving...",
    saveChanges: isSpanish ? "Guardar Cambios" : "Save Changes",
    editProfile: isSpanish ? "Editar Perfil" : "Edit Profile",
    attendance: isSpanish ? "Asistencia" : "Attendance",
    eventAttended: isSpanish ? "Evento asistido" : "Event attended",
    eventsAttended: isSpanish ? "Eventos asistidos" : "Events attended",
    memberSince: isSpanish ? "Miembro desde" : "Member since",
    profileCompletion: isSpanish ? "Perfil Completado" : "Profile Completion",
    profileCompletionText: isSpanish
      ? "Completa tu perfil para desbloquear una mejor experiencia como miembro"
      : "Complete your profile to unlock a better member experience",
    profileDetails: isSpanish ? "Detalles del Perfil" : "Profile Details",
    firstName: isSpanish ? "Nombre" : "First Name",
    lastName: isSpanish ? "Apellido" : "Last Name",
    phone: isSpanish ? "Teléfono" : "Phone",
    gender: isSpanish ? "Género" : "Gender",
    pronouns: isSpanish ? "Pronombres" : "Pronouns",
    dob: isSpanish ? "Fecha de Nacimiento" : "Date of Birth",
    sexualOrientation: isSpanish ? "Orientación Sexual" : "Sexual Orientation",
    occupation: isSpanish ? "Ocupación" : "Occupation",
    race: isSpanish ? "Raza" : "Race",
    nationality: isSpanish ? "Nacionalidad" : "Nationality",
    languagePreference: isSpanish
      ? "Preferencia de Idioma"
      : "Language Preference",
    city: isSpanish ? "Ciudad" : "City",
    country: isSpanish ? "País" : "Country",
    about: isSpanish ? "Acerca de" : "About",
    contact: isSpanish ? "Contacto" : "Contact",
    location: isSpanish ? "Ubicación" : "Location",
    walkingClubAttendance: isSpanish
      ? "Historial de Asistencia"
      : "Attendance History",
    participationHistory: isSpanish
      ? "Tus eventos asistidos"
      : "Events you’ve attended",
    loadingAttendance: isSpanish
      ? "Cargando asistencia..."
      : "Loading attendance...",
    noAttendanceRecords: isSpanish
      ? "Aún no hay registros de asistencia"
      : "No attendance records yet",
    seeMore: isSpanish ? "Ver más" : "See more",
    showing: isSpanish ? "Mostrando" : "Showing",
    of: isSpanish ? "de" : "of",
    select: isSpanish ? "Seleccionar" : "Select",
    profileNotFound: isSpanish
      ? "No se pudo encontrar tu perfil."
      : "Your profile could not be found.",
    failedLoadProfile: isSpanish
      ? "No se pudo cargar el perfil."
      : "Failed to load profile.",
    profileIdNotFound: isSpanish
      ? "No se encontró el ID del perfil."
      : "Profile id not found.",
    firstNameRequired: isSpanish
      ? "El nombre es requerido."
      : "First name is required.",
    lastNameRequired: isSpanish
      ? "El apellido es requerido."
      : "Last name is required.",
    profileUpdated: isSpanish
      ? "Perfil actualizado correctamente."
      : "Profile updated successfully.",
    failedSaveProfile: isSpanish
      ? "No se pudo guardar el perfil."
      : "Failed to save profile.",
    failedPictureUrl: isSpanish
      ? "No se pudo generar la URL de la foto de perfil."
      : "Failed to generate profile picture URL.",
    photoUpdated: isSpanish
      ? "Foto de perfil actualizada correctamente."
      : "Profile photo updated successfully.",
    failedUploadPhoto: isSpanish
      ? "No se pudo subir la foto de perfil. Asegúrate de que el bucket profile-pictures exista."
      : "Failed to upload profile photo. Make sure the profile-pictures bucket exists.",
    noChangesToSave: isSpanish
      ? "No hay cambios para guardar."
      : "There are no changes to save.",
    photoReadyToSave: isSpanish
      ? "Foto lista para guardar. Presiona Guardar Cambios para confirmar."
      : "Photo ready to save. Press Save Changes to confirm.",
  };

  const [authLoading, setAuthLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [attendanceVisibleCount, setAttendanceVisibleCount] = useState(5);

  const [profileId, setProfileId] = useState<string | null>(null);

  const [initialProfile, setInitialProfile] = useState<ProfileState | null>(
    null
  );
  const [profile, setProfile] = useState<ProfileState>({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    pronouns: "",
    dob: "",
    city: "",
    country: "",
    sexualOrientation: "",
    occupation: "",
    race: "",
    nationality: "",
    languagePreference: "",
    profilePicture: "",
    createdAt: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [walkingClubAttendance, setWalkingClubAttendance] = useState<
    WalkingClubAttendanceRecord[]
  >([]);
  const [walkingClubAttendanceLoading, setWalkingClubAttendanceLoading] =
    useState(false);

  const getLocalizedEventName = (
    event?: WalkingClubAttendanceRecord["event"]
  ) => {
    if (!event) return "—";
    return isSpanish
      ? event.name_es || event.name_en || event.name || "—"
      : event.name_en || event.name_es || event.name || "—";
  };

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setAuthLoading(true);
        setPageLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        setAccessDenied(false);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          router.replace("/login");
          return;
        }

        if (!mounted) return;

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select(
            `
            id,
            first_name,
            last_name,
            username,
            email,
            phone,
            role,
            gender,
            pronouns,
            dob,
            city,
            country,
            sexual_orientation,
            race,
            nationality,
            language_preference,
            occupation,
            profile_picture,
            created_at
          `
          )
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profileData) {
          setAccessDenied(true);
          throw new Error(t.profileNotFound);
        }

        if (!mounted) return;

        setProfileId(profileData.id);

        const loadedProfile: ProfileState = {
          id: profileData.id,
          firstName: profileData.first_name || "",
          lastName: profileData.last_name || "",
          username: profileData.username || "",
          email: profileData.email || user.email || "",
          phone: profileData.phone || "",
          role: profileData.role || "member",
          gender: profileData.gender || "",
          pronouns: profileData.pronouns || "",
          dob: profileData.dob || "",
          city: profileData.city || "",
          country: profileData.country || "",
          sexualOrientation: profileData.sexual_orientation || "",
          race: profileData.race || "",
          nationality: profileData.nationality || "",
          languagePreference: profileData.language_preference || "",
          occupation: profileData.occupation || "",
          profilePicture: profileData.profile_picture || "",
          createdAt: profileData.created_at || "",
        };

        setInitialProfile(loadedProfile);
        setProfile(loadedProfile);
      } catch (error) {
        console.error("Profile load error:", error);
        setErrorMessage(
          (error as { message?: string })?.message || t.failedLoadProfile
        );
      } finally {
        if (mounted) {
          setAuthLoading(false);
          setPageLoading(false);
        }
      }
    };

    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/login");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, language]);

  const loadWalkingClubAttendance = async (
    memberId: string,
    memberEmail?: string
  ) => {
    try {
      setWalkingClubAttendanceLoading(true);

      const cleanEmail = String(memberEmail || "")
        .trim()
        .toLowerCase();

      const memberFilters = [
        `member_id.eq.${memberId}`,
        cleanEmail ? `participant_email.ilike.${cleanEmail}` : "",
      ]
        .filter(Boolean)
        .join(",");

      const { data, error } = await supabase
        .from("attendance_sheet_entries")
        .select(
          `
          id,
          checked_in,
          checked_in_at,
          status,
          member_id,
          participant_email,
          occurrence_date,
          attendance_sheet:attendance_sheets(
            id,
            occurrence_date,
            event:events(
              id,
              name_en,
              name_es,
              description_en,
              description_es,
              date,
              time,
              type,
              street_address,
              city,
              color
            )
          )
        `
        )
        .or(memberFilters)
        .order("checked_in_at", { ascending: false, nullsFirst: false });

      if (error) throw error;

      const attendanceRecords = (data || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((entry: any) => {
          const event = entry?.attendance_sheet?.event;
          const occurrenceDate =
            entry?.occurrence_date ||
            entry?.attendance_sheet?.occurrence_date ||
            event?.date ||
            null;

          return {
            id: entry.id,
            checked_in_at: entry.checked_in_at,
            status: entry.status || "",
            event: {
              ...event,
              date: occurrenceDate,
              color: event?.color || "#f59e0b",
            },
          };
        })
        .filter((record: WalkingClubAttendanceRecord) => !!record.event?.id);

      setWalkingClubAttendance(attendanceRecords);
    } catch (error) {
      console.error("Error loading attendance:", error);
      setWalkingClubAttendance([]);
    } finally {
      setWalkingClubAttendanceLoading(false);
    }
  };

  useEffect(() => {
    if (!profileId) return;
    loadWalkingClubAttendance(profileId, profile.email);
  }, [profileId, profile.email]);

  const profileCompletion = useMemo(() => {
    const fieldsToCheck = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.gender,
      profile.pronouns,
      profile.dob,
      profile.city,
      profile.country,
      profile.sexualOrientation,
      profile.race,
      profile.nationality,
      profile.languagePreference,
      profile.occupation,
      profile.profilePicture,
    ];

    const completedFields = fieldsToCheck.filter(
      (field) => typeof field === "string" && field.trim() !== ""
    ).length;

    return Math.round((completedFields / fieldsToCheck.length) * 100);
  }, [profile]);

  // const visibleAttendance = useMemo(
  //   () => walkingClubAttendance.slice(0, attendanceVisibleCount),
  //   [walkingClubAttendance, attendanceVisibleCount]
  // );

  const sortedAttendance = useMemo(() => {
    return [...walkingClubAttendance].sort((a, b) => {
      const dateA = new Date(
        `${a.event?.date || ""}T${a.event?.time || "00:00"}`
      ).getTime();

      const dateB = new Date(
        `${b.event?.date || ""}T${b.event?.time || "00:00"}`
      ).getTime();

      return dateB - dateA;
    });
  }, [walkingClubAttendance]);

  const upcomingAttendance = useMemo(() => {
    const now = new Date();

    return sortedAttendance.filter((record) => {
      const eventDateTime = new Date(
        `${record.event?.date || ""}T${record.event?.time || "23:59"}`
      );

      return eventDateTime >= now;
    });
  }, [sortedAttendance]);

  const pastAttendance = useMemo(() => {
    const now = new Date();

    return sortedAttendance.filter((record) => {
      const eventDateTime = new Date(
        `${record.event?.date || ""}T${record.event?.time || "23:59"}`
      );

      return eventDateTime < now;
    });
  }, [sortedAttendance]);

  const visiblePastAttendance = useMemo(
    () => pastAttendance.slice(0, attendanceVisibleCount),
    [pastAttendance, attendanceVisibleCount]
  );

  const hasMoreAttendance = attendanceVisibleCount < pastAttendance.length;

  // const hasMoreAttendance =
  //   attendanceVisibleCount < walkingClubAttendance.length;

  const hasUnsavedChanges = useMemo(() => {
    return !areProfilesEqual(profile, initialProfile);
  }, [profile, initialProfile]);

  const handleStartEditing = () => {
    if (initialProfile) {
      setProfile(initialProfile);
    }

    setIsEditing(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCancelEditing = () => {
    if (initialProfile) {
      setProfile(initialProfile);
    }

    setIsEditing(false);
    setErrorMessage("");
    setSuccessMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFieldChange = (key: keyof ProfileState, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!profileId) throw new Error(t.profileIdNotFound);
      if (!profile.firstName.trim()) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t.firstNameRequired,
        });
        return;

        // throw new Error(t.firstNameRequired);
      }
      if (!profile.lastName.trim()) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t.lastNameRequired,
        });
        return;
      }

      if (!hasUnsavedChanges) {
        setIsEditing(false);
        setSuccessMessage(t.noChangesToSave);
        return;
      }

      setSaveLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const updatedProfile: ProfileState = {
        ...profile,
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        phone: profile.phone.trim(),
        gender: profile.gender.trim(),
        pronouns: profile.pronouns.trim(),
        city: profile.city.trim(),
        country: profile.country.trim(),
        sexualOrientation: profile.sexualOrientation.trim(),
        race: profile.race.trim(),
        nationality: profile.nationality.trim(),
        languagePreference: profile.languagePreference || "",
        occupation: profile.occupation.trim(),
        profilePicture: profile.profilePicture || "",
      };

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: updatedProfile.firstName,
          last_name: updatedProfile.lastName,
          phone: updatedProfile.phone || null,
          gender: updatedProfile.gender || null,
          pronouns: updatedProfile.pronouns || null,
          dob: updatedProfile.dob || null,
          city: updatedProfile.city || null,
          country: updatedProfile.country || null,
          sexual_orientation: updatedProfile.sexualOrientation || null,
          race: updatedProfile.race || null,
          nationality: updatedProfile.nationality || null,
          language_preference: updatedProfile.languagePreference || null,
          occupation: updatedProfile.occupation || null,
          profile_picture: updatedProfile.profilePicture || null,
        })
        .eq("id", profileId);

      if (error) throw error;

      if (
        updatedProfile.languagePreference === "en" ||
        updatedProfile.languagePreference === "es"
      ) {
        setLanguage(updatedProfile.languagePreference);
      } else {
        setLanguage(language);
      }

      setInitialProfile(updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setSuccessMessage(t.profileUpdated);
    } catch (error) {
      console.error("Profile save error:", error);
      setErrorMessage(
        (error as { message?: string })?.message || t.failedSaveProfile
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!profileId) throw new Error(t.profileIdNotFound);

      setUploadingAvatar(true);
      setErrorMessage("");
      setSuccessMessage("");

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filePath = `${profileId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl || "";

      if (!publicUrl) throw new Error(t.failedPictureUrl);

      setProfile((prev) => ({
        ...prev,
        profilePicture: publicUrl,
      }));

      setSuccessMessage(t.photoReadyToSave);
    } catch (error) {
      console.error("Avatar upload error:", error);
      setErrorMessage(
        (error as { message?: string })?.message || t.failedUploadPhoto
      );
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const avatarLabel =
    profile.firstName?.[0] && profile.lastName?.[0]
      ? `${profile.firstName[0]}${profile.lastName[0]}`
      : "U";

  if (authLoading || pageLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] pb-16 pt-16">
        <Navbar />
        <div className="mx-auto mt-28 max-w-4xl px-4 md:px-6">
          <div className="rounded-4xl border border-white/70 bg-white/85 px-8 py-14 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="mx-auto mb-5 h-14 w-14 animate-pulse rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700" />
            <h2 className="text-xl font-semibold text-slate-900">
              {t.loadingProfile}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {t.loadingProfileText}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] pb-16 pt-16">
        <Navbar />
        <div className="mx-auto mt-28 max-w-4xl px-4 md:px-6">
          <div className="rounded-4xl border border-red-100 bg-white/90 px-8 py-14 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {t.accessRestricted}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {t.accessRestrictedText}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl"
            >
              {t.goHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#eef4ff)] pb-16 pt-2">
      <Navbar />

      <main className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <section className="overflow-hidden rounded-4xl border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div className="bg-white px-6 pb-16 pt-8" />

            <div className="-mt-14 px-6 pb-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-4xl border-4 border-white bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
                  {profile.profilePicture ? (
                    <Image
                      src={profile.profilePicture}
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-4xl font-semibold">
                        {avatarLabel}
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  {`${profile.firstName} ${profile.lastName}`.trim() || "—"}
                </h1>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {profile.username ? `@${profile.username}` : ""}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2 capitalize">
                  <HeaderBadge
                    icon={<ShieldCheck size={14} />}
                    label={profile.role || "member"}
                  />
                </div>

                <button
                  onClick={handleStartEditing}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-blue-600 px-5 
                  py-3.5 font-medium shadow-sm transition duration-500 hover:bg-blue-700/90 hover:shadow-sm text-white"
                >
                  <PencilLine size={16} />
                  {t.editProfile}
                </button>
              </div>

              {(errorMessage || successMessage) && (
                <div className="mt-5 space-y-3">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  {successMessage ? (
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {successMessage}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </section>

          {/* Mobile Profile Completion */}
          <div className="block xl:hidden">
            <ProfilePanel
              title={t.profileCompletion}
              icon={<BadgeCheck size={16} />}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  {t.profileCompletionText}
                </p>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {profileCompletion}%
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#0d4db0] to-indigo-600 transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </ProfilePanel>
          </div>

          <ProfilePanel title={t.about} icon={<UserRound size={16} />}>
            <InfoRow
              icon={<HiOutlineCalendarDateRange size={15} />}
              label={t.memberSince}
              value={formatJoinedDate(profile.createdAt, locale)}
            />
            <InfoRow
              icon={<MapPin size={15} />}
              label={t.location}
              value={[profile.city, profile.country].filter(Boolean).join(", ")}
            />
            <InfoRow
              icon={<BsGenderTrans size={15} />}
              label={t.gender}
              value={profile.gender || "—"}
            />
            <InfoRow
              icon={<TbRainbow size={15} />}
              label={t.pronouns}
              value={profile.pronouns || "—"}
            />
            <InfoRow
              icon={<RiUserHeartLine size={15} />}
              label={t.sexualOrientation}
              value={profile.sexualOrientation || "—"}
            />
          </ProfilePanel>

          <ProfilePanel title={t.contact} icon={<LuContactRound size={16} />}>
            <InfoRow
              icon={<Mail size={15} />}
              label="Email"
              value={profile.email || t.noEmail}
            />
            <InfoRow
              icon={<Phone size={15} />}
              label={t.phone}
              value={profile.phone || "—"}
            />
          </ProfilePanel>
        </aside>

        <section className="min-w-0 flex-col gap-3 flex">
          <div className="hidden md:flex md:min-w-full">
            <ProfilePanel
              title={t.profileCompletion}
              icon={<BadgeCheck size={16} />}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  {t.profileCompletionText}
                </p>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {profileCompletion}%
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#0d4db0] to-indigo-600 transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </ProfilePanel>
          </div>

          <div className="rounded-4xl border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <LiaMedalSolid className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    {t.walkingClubAttendance}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {t.participationHistory}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {walkingClubAttendanceLoading
                  ? "..."
                  : `${walkingClubAttendance.length} ${
                      walkingClubAttendance.length === 1
                        ? t.eventAttended
                        : t.eventsAttended
                    }`}
              </div>
            </div>

            {walkingClubAttendanceLoading ? (
              <p className="text-sm text-slate-500">{t.loadingAttendance}</p>
            ) : walkingClubAttendance.length === 0 ? (
              <EmptyState text={t.noAttendanceRecords} />
            ) : (
              <>
                {/* Upcoming */}
                {upcomingAttendance.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
                        {isSpanish ? "Próximos eventos" : "Upcoming Events"}
                      </h3>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {upcomingAttendance.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {upcomingAttendance.map((record) => (
                        <AttendanceEventCard
                          key={record.id}
                          record={record}
                          locale={locale}
                          getLocalizedEventName={getLocalizedEventName}
                          badgeText={isSpanish ? "Próximo" : "Upcoming"}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                      {isSpanish ? "Eventos pasados" : "Past Events"}
                    </h3>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {pastAttendance.length}
                    </span>
                  </div>

                  {pastAttendance.length === 0 ? (
                    <EmptyState
                      text={
                        isSpanish
                          ? "Aún no tienes eventos pasados."
                          : "You don’t have past events yet."
                      }
                    />
                  ) : (
                    <div className="space-y-3">
                      {visiblePastAttendance.map((record) => (
                        <AttendanceEventCard
                          key={record.id}
                          record={record}
                          locale={locale}
                          getLocalizedEventName={getLocalizedEventName}
                          badgeText={isSpanish ? "Asistido" : "Attended"}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {pastAttendance.length > 0 && (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">
                      {t.showing} {visiblePastAttendance.length} {t.of}{" "}
                      {pastAttendance.length}
                    </p>

                    {hasMoreAttendance && (
                      <button
                        type="button"
                        onClick={() =>
                          setAttendanceVisibleCount((prev) => prev + 5)
                        }
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                      >
                        {t.seeMore}
                        <ChevronDown size={16} />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <EditProfileOffCanvas
        open={isEditing}
        profile={profile}
        setProfile={setProfile}
        handleFieldChange={handleFieldChange}
        handleSave={handleSave}
        saveLoading={saveLoading}
        uploadingAvatar={uploadingAvatar}
        handleAvatarChange={handleAvatarChange}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        avatarLabel={avatarLabel}
        onClose={handleCancelEditing}
        language={language}
        t={t}
      />
    </div>
  );
}

function HeaderBadge({
  icon,
  label,
  subtle = false,
}: {
  icon: React.ReactNode;
  label: string;
  subtle?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
        subtle
          ? "border-slate-200 bg-white/70 text-slate-600"
          : "border-blue-100 bg-blue-50 text-blue-700"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}

function ProfilePanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-4xl border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl w-full">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3 ${
        label?.toLowerCase() === "email" ? "lowercase" : "capitalize"
      }`}
    >
      <span className="mt-0.5 text-blue-700">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 wrap-break-word text-sm font-medium text-slate-700">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
      <p className="text-sm italic text-slate-400">{text}</p>
    </div>
  );
}

function AttendanceEventCard({
  record,
  locale,
  getLocalizedEventName,
  badgeText,
}: {
  record: WalkingClubAttendanceRecord;
  locale: string;
  getLocalizedEventName: (
    event?: WalkingClubAttendanceRecord["event"]
  ) => string;
  badgeText: string;
}) {
  const event = record.event;
  const eventColor = normalizeEventColor(event?.color);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${eventColor}14, transparent 55%, ${eventColor}08)`,
        }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-white"
          style={{
            background: `linear-gradient(135deg, ${eventColor}, ${eventColor}cc)`,
            borderColor: `${eventColor}55`,
            boxShadow: `0 12px 28px ${eventColor}35`,
          }}
        >
          <Medal className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate text-base font-semibold tracking-tight text-slate-900">
              {getLocalizedEventName(event)}
            </h4>

            <span className="shrink-0 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {badgeText}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" style={{ color: eventColor }} />
              {formatEventDate(event.date, event.time, locale)}
            </span>

            {event.city && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" style={{ color: eventColor }} />
                {event.city}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
