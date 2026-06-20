/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiExternalLink,
  FiImage,
  FiMusic,
  FiSearch,
  FiPlayCircle,
  FiPauseCircle,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useLanguage } from "../context/language";
import { Section } from "./EventSchedulerForm";
import { SchedulerForm } from "../lib/interfaces/events";
import FloatingLabelSelect from "./elements/FloatingLabelSelect";

type MusicTrack = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackViewUrl?: string;
};

const EventSchedulerStep1 = ({
  schedulerForm,
  setSchedulerForm,
  isEdit,
  toggleAttendanceSheet,
  attendanceReportHref,
  checkInHref,
  handleImageChange,
  imagePreview,
  handleCancelSelectedOccurrence,
}: {
  schedulerForm: SchedulerForm;
  setSchedulerForm: React.Dispatch<React.SetStateAction<SchedulerForm>>;
  isEdit: boolean;
  toggleAttendanceSheet: () => void;
  attendanceReportHref?: string;
  checkInHref?: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string;
  handleCancelSelectedOccurrence: () => void;
}) => {
  const { language } = useLanguage();
  const isSpanish = language === "es";
  const router = useRouter();

  const t = {
    eventOptions: isSpanish ? "Opciones del Evento" : "Event Options",
    createAttendanceSheet: isSpanish
      ? "Crear Hoja de Asistencia"
      : "Create Attendance Sheet",
    createAttendanceSheetDescription: isSpanish
      ? "Crea automáticamente un reporte de asistencia vinculado para este evento después de programarlo"
      : "Automatically create a linked attendance report for this event after scheduling",
    attendanceEnabled: isSpanish
      ? "Hoja de Asistencia Activada"
      : "Attendance Sheet Enabled",
    attendanceAutoCreated: isSpanish
      ? "La hoja de asistencia se creará automáticamente"
      : "Attendance sheet will be created automatically",
    attendanceAutoCreatedDescription: isSpanish
      ? "Una vez que este evento se guarde, se creará una hoja de asistencia vinculada."
      : "Once this event is saved, a linked attendance sheet will be created for it.",
    attendaceAutoEdit: isSpanish
      ? "La hoja de asistencia fue creada automáticamente"
      : "The attendance sheet was auto-created",
    attendaceAutoEditDescription: isSpanish
      ? "Cualquier cambio en la fecha o hora del evento actualizará automáticamente la hoja de asistencia vinculada."
      : "Any changes to the event date or time will automatically update the linked attendance sheet.",
    viewAttendanceReport: isSpanish
      ? "Ver Reporte de Asistencia"
      : "View Attendance Report",
    viewAttendanceReportDescription: isSpanish
      ? "Abre el reporte de asistencia vinculado a este evento"
      : "Open the linked attendance report for this event",
    eventCheckIn: isSpanish ? "Check-In del Evento" : "Event Check-In",
    openInvitationPage: isSpanish
      ? "Abrir la página de invitación para este evento"
      : "Open the invitation page for this event",
    saveFirst: isSpanish
      ? "Guarda el evento primero para acceder al check-in"
      : "Save the event first to access check-in",
    eventColor: isSpanish ? "Color del Evento" : "Event Color",
    eventColorDescription: isSpanish
      ? "Elige el color usado para identificar este evento en calendarios y tarjetas."
      : "Choose the color used to identify this event in calendars and cards.",
    eventMusic: isSpanish ? "Música del Evento" : "Event Music",
    eventMusicDescription: isSpanish
      ? "Busca una canción y guarda una vista previa para reproducirla en la página de check-in."
      : "Search for a song and save a preview to play on the check-in page.",
    enableMusic: isSpanish ? "Activar música" : "Enable Music",
    enableMusicDescription: isSpanish
      ? "Muestra un botón para reproducir esta canción en la invitación del evento."
      : "Show a play button for this song on the event invitation.",
    musicPlaceholder: isSpanish
      ? "Buscar canción o artista..."
      : "Search song or artist...",
    searchMusic: isSpanish ? "Buscar" : "Search",
    selectedSong: isSpanish ? "Canción seleccionada" : "Selected Song",
    removeSong: isSpanish ? "Quitar" : "Remove",
    noMusicResults: isSpanish
      ? "Busca una canción para ver resultados."
      : "Search for a song to see results.",
    eventImage: isSpanish ? "Imagen del Evento" : "Event Image",
    uploadImage: isSpanish ? "Subir Imagen" : "Upload Image",
    currentImagePreview: isSpanish
      ? "Vista Previa de la Imagen Actual"
      : "Current Image Preview",
    preview: isSpanish ? "Vista Previa" : "Preview",
    eventPreviewAlt: isSpanish ? "Vista previa del evento" : "Event Preview",
    imageDisplaySettings: isSpanish
      ? "Ajustes de Imagen"
      : "Image Display Settings",
    imageDisplaySettingsDescription: isSpanish
      ? "Controla la altura y el centrado vertical de la imagen en las tarjetas y vistas del evento."
      : "Control the height and vertical centering of the image across event cards and views.",
    imageHeight: isSpanish ? "Altura de Imagen" : "Image Height",
    imageCentering: isSpanish ? "Centrado Vertical" : "Vertical Centering",
    short: isSpanish ? "Baja" : "Short",
    tall: isSpanish ? "Alta" : "Tall",
    top: isSpanish ? "Arriba" : "Top",
    center: isSpanish ? "Centro" : "Center",
    bottom: isSpanish ? "Abajo" : "Bottom",
  };

  const imageHeight = Number(schedulerForm?.imageHeight || 192);
  const imagePositionY = Number(schedulerForm?.imagePositionY ?? 50);

  const [musicSearch, setMusicSearch] = useState("");
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicResults, setMusicResults] = useState<MusicTrack[]>([]);
  const [playingPreviewUrl, setPlayingPreviewUrl] = useState<string | null>(
    null
  );

  const selectedAudioPreviewUrl = schedulerForm?.audioPreviewUrl || "";
  const selectedAudioTrackName = schedulerForm?.audioTrackName || "";
  const selectedAudioArtistName = schedulerForm?.audioArtistName || "";
  const selectedAudioArtworkUrl = schedulerForm?.audioArtworkUrl || "";
  const audioEnabled = !!schedulerForm?.audioEnabled;

  const handleSearchMusic = async () => {
    const query = musicSearch.trim();

    if (!query) return;

    try {
      setMusicLoading(true);

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&media=music&entity=song&limit=8`
      );

      const result = await response.json();

      setMusicResults(result?.results || []);
    } catch (error) {
      console.error("Music search error:", error);
      setMusicResults([]);
    } finally {
      setMusicLoading(false);
    }
  };

  const handleSelectMusic = (track: MusicTrack) => {
    setSchedulerForm(
      (prev) =>
        ({
          ...prev,
          audioEnabled: true,
          audioTrackId: track.trackId.toString(),
          audioTrackName: track.trackName,
          audioArtistName: track.artistName,
          audioArtworkUrl: track.artworkUrl100 || "",
          audioPreviewUrl: track.previewUrl || "",
          audioTrackViewUrl: track.trackViewUrl || "",
        } as SchedulerForm)
    );
  };

  const handleRemoveMusic = () => {
    setPlayingPreviewUrl(null);

    setSchedulerForm(
      (prev) =>
        ({
          ...prev,
          audioEnabled: false,
          audioTrackId: undefined,
          audioTrackName: "",
          audioArtistName: "",
          audioArtworkUrl: "",
          audioPreviewUrl: "",
          audioTrackViewUrl: "",
        } as SchedulerForm)
    );
  };

  const handleTogglePreview = (previewUrl?: string | null) => {
    if (!previewUrl) return;

    if (playingPreviewUrl === previewUrl) {
      setPlayingPreviewUrl(null);
      return;
    }

    setPlayingPreviewUrl(previewUrl);
  };

  useEffect(() => {
    if (!playingPreviewUrl) return;

    const audio = new Audio(playingPreviewUrl);

    audio.play().catch((error) => {
      console.error("Music preview play error:", error);
    });

    audio.addEventListener("ended", () => {
      setPlayingPreviewUrl(null);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [playingPreviewUrl]);

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      {/* TODO: Add event name and cancel ocurrence date (for recurrent events) button */}
      {/* Mobile-only edit summary + cancel occurrence */}
      {isEdit && (
        <div className="md:hidden rounded-[1.75rem] border border-slate-200 bg-white/95 p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                {isSpanish ? "Editando evento" : "Editing event"}
              </p>

              <h2 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-slate-950">
                {language === "en"
                  ? schedulerForm?.name_en || schedulerForm?.name_es
                  : schedulerForm?.name_es || schedulerForm?.name_en}
              </h2>

              {schedulerForm?.date && (
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {(() => {
                    const [year, month, day] = String(schedulerForm.date)
                      .slice(0, 10)
                      .split("-")
                      .map(Number);

                    return new Date(year, month - 1, day).toLocaleDateString(
                      language,
                      {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    );
                  })()}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleCancelSelectedOccurrence}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 shadow-sm transition active:scale-[0.98]"
            >
              <FiX className="text-base" />
              {isSpanish
                ? "Cancelar esta ocurrencia"
                : "Cancel this occurrence"}
            </button>
          </div>
        </div>
      )}
      <Section title={t.eventOptions}>
        <div className="space-y-4 p-1">
          <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-white via-blue-50/40 to-slate-50 p-4 shadow-sm">
            <div className="flex flex-col gap-4">
              {!isEdit && (
                <div className="flex flex-col gap-4 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  {isEdit && schedulerForm?.createAttendanceSheet ? null : (
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        <FiCheckCircle className="text-sm md:text-lg" />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {t.createAttendanceSheet}
                        </h4>
                        <p className="mt-1 max-w-sm text-xs leading-4 font-light text-gray-500">
                          {t.createAttendanceSheetDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="md:ml-auto mx-auto">
                    <button
                      type="button"
                      onClick={toggleAttendanceSheet}
                      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${
                        schedulerForm?.createAttendanceSheet
                          ? "bg-blue-600 shadow-lg shadow-blue-200"
                          : "bg-gray-300"
                      }`}
                      aria-pressed={!!schedulerForm?.createAttendanceSheet}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                          schedulerForm?.createAttendanceSheet
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {schedulerForm?.createAttendanceSheet && (
                <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                      {t.attendanceEnabled}
                    </p>

                    <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700 shadow-sm">
                      Active
                    </span>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-white/90 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                        <FiCheckCircle />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {isEdit
                            ? t.attendaceAutoEdit
                            : t.attendanceAutoCreated}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {isEdit
                            ? t.attendaceAutoEditDescription
                            : t.attendanceAutoCreatedDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {attendanceReportHref && (
                    <button
                      type="button"
                      onClick={() => router.push(attendanceReportHref)}
                      className="mt-3 flex w-full items-center justify-between rounded-2xl border border-blue-200 bg-white px-4 py-3 text-left shadow-sm 
                      transition hover:-translate-y-px hover:shadow-md cursor-pointer"
                    >
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">
                          {t.viewAttendanceReport}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {t.viewAttendanceReportDescription}
                        </span>
                      </div>
                      <FiExternalLink className="text-blue-600" />
                    </button>
                  )}
                </div>
              )}

              {isEdit && (
                <button
                  type="button"
                  onClick={() => {
                    if (!checkInHref) return;
                    router.push(checkInHref);
                  }}
                  disabled={!schedulerForm?.id}
                  className={`w-full rounded-3xl border px-4 py-4 text-left shadow-sm transition cursor-pointer ${
                    schedulerForm?.id
                      ? "border-emerald-200 bg-linear-to-r from-white via-emerald-50/60 to-green-50 hover:-translate-y-px hover:shadow-md"
                      : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {t.eventCheckIn}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {schedulerForm?.id ? t.openInvitationPage : t.saveFirst}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <FiExternalLink />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <FloatingLabelSelect
              id="status"
              name="status"
              label={isSpanish ? "Estado del Evento" : "Event Status"}
              value={schedulerForm?.status || "draft"}
              options={[
                { value: "draft", label: isSpanish ? "Borrador" : "Draft" },
                {
                  value: "published",
                  label: isSpanish ? "Publicado" : "Published",
                },
              ]}
              onChange={(e) =>
                setSchedulerForm((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            />

            <div
              className={`mt-3 rounded-2xl border px-4 py-3 ${
                schedulerForm?.status === "published"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                  : "border-amber-100 bg-amber-50 text-amber-800"
              }`}
            >
              <p className="text-xs font-semibold">
                {schedulerForm?.status === "draft" &&
                  (isSpanish
                    ? "El evento está en modo borrador y no es visible para los invitados."
                    : "The event is in draft mode and not visible to invitees.")}
                {schedulerForm?.status === "published" &&
                  (isSpanish
                    ? "El evento está publicado y visible para los invitados."
                    : "The event is published and visible to invitees.")}
                {schedulerForm?.status === "canceled" &&
                  (isSpanish
                    ? "El evento está cancelado y no es visible para los invitados."
                    : "The event is canceled and not visible to invitees.")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t.eventColor}>
        <div className="p-1">
          <label className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {t.eventColorDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={schedulerForm?.color || "#2563eb"}
                onChange={(e) =>
                  setSchedulerForm((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }))
                }
                className="h-12 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
              />

              <input
                type="text"
                value={schedulerForm?.color || "#2563eb"}
                onChange={(e) =>
                  setSchedulerForm((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }))
                }
                placeholder="#2563eb"
                className="h-12 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </label>
        </div>
      </Section>

      <Section title={t.eventMusic}>
        <div className="space-y-4 p-1">
          <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <FiMusic />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {t.eventMusic}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.eventMusicDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSchedulerForm(
                    (prev) =>
                      ({
                        ...prev,
                        audioEnabled: !audioEnabled,
                      } as SchedulerForm)
                  )
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 ${
                  audioEnabled
                    ? "bg-blue-600 shadow-lg shadow-blue-200"
                    : "bg-gray-300"
                }`}
                aria-pressed={audioEnabled}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
                    audioEnabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {t.enableMusicDescription}
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={musicSearch}
                onChange={(event) => setMusicSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearchMusic();
                }}
                placeholder={t.musicPlaceholder}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              type="button"
              onClick={handleSearchMusic}
              disabled={musicLoading}
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {musicLoading ? "..." : t.searchMusic}
            </button>
          </div>

          {selectedAudioPreviewUrl && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
              <div className="flex items-center gap-3">
                {selectedAudioArtworkUrl && (
                  <img
                    src={selectedAudioArtworkUrl}
                    alt={selectedAudioTrackName}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                    {t.selectedSong}
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {selectedAudioTrackName}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {selectedAudioArtistName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleTogglePreview(selectedAudioPreviewUrl)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm transition hover:bg-emerald-100"
                >
                  {playingPreviewUrl === selectedAudioPreviewUrl ? (
                    <FiPauseCircle size={22} />
                  ) : (
                    <FiPlayCircle size={22} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRemoveMusic}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>
          )}

          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {!musicResults.length && (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
                {t.noMusicResults}
              </p>
            )}

            {musicResults.map((track) => {
              const isSelected =
                Number(schedulerForm?.audioTrackId || 0) === track.trackId;
              const isPlaying = playingPreviewUrl === track.previewUrl;

              return (
                <button
                  key={track.trackId}
                  type="button"
                  onClick={() => handleSelectMusic(track)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                    isSelected
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {track.artworkUrl100 && (
                    <img
                      src={track.artworkUrl100}
                      alt={track.trackName}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {track.trackName}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {track.artistName}
                    </p>
                  </div>

                  {track.previewUrl && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleTogglePreview(track.previewUrl);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.stopPropagation();
                          handleTogglePreview(track.previewUrl);
                        }
                      }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-blue-700 transition hover:bg-blue-100"
                    >
                      {isPlaying ? (
                        <FiPauseCircle size={22} />
                      ) : (
                        <FiPlayCircle size={22} />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title={t.eventImage}>
        <label className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
            <FiImage /> {t.uploadImage}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 
            file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </label>

        {imagePreview && (
          <div className="mt-3">
            <p className="mb-2 text-xs text-gray-500">
              {isEdit ? t.currentImagePreview : t.preview}
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src={imagePreview}
                alt={t.eventPreviewAlt}
                className="w-full object-cover"
                style={{
                  height: `${imageHeight}px`,
                  objectPosition: `center ${imagePositionY}%`,
                }}
                width={100}
                height={100}
              />
            </div>
          </div>
        )}
      </Section>

      <Section title={t.imageDisplaySettings}>
        <div className="space-y-5 p-1">
          <p className="text-xs text-slate-500">
            {t.imageDisplaySettingsDescription}
          </p>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-xs font-semibold text-slate-700">
                {t.imageHeight}
              </label>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {imageHeight}px
              </span>
            </div>

            <input
              type="range"
              min={140}
              max={520}
              step={10}
              value={imageHeight}
              onChange={(e) =>
                setSchedulerForm(
                  (prev) =>
                    ({
                      ...prev,
                      imageHeight: Number(e.target.value),
                    } as SchedulerForm)
                )
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-linear-to-r from-blue-500 to-blue-700"
            />

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>{t.short}</span>
              <span>{t.tall}</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-xs font-semibold text-slate-700">
                {t.imageCentering}
              </label>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {imagePositionY}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={imagePositionY}
              onChange={(e) =>
                setSchedulerForm(
                  (prev) =>
                    ({
                      ...prev,
                      imagePositionY: Number(e.target.value),
                    } as SchedulerForm)
                )
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-linear-to-r from-blue-500 to-blue-700"
            />

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>{t.top}</span>
              <span>{t.center}</span>
              <span>{t.bottom}</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default EventSchedulerStep1;
