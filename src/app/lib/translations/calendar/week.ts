export function getWeekTranslations(language: string) {
  const isSpanish = language === "es";

  const t = {
    calendarTheme: isSpanish ? "Tema del Calendario" : "Calendar Theme",
    weekView: isSpanish ? "Vista Semanal" : "Week View",
    weekOf: isSpanish ? "Semana de" : "Week of",
    today: isSpanish ? "Hoy" : "Today",
    recurring: isSpanish ? "Recurrente" : "Recurring",
    scheduled: isSpanish ? "Programado" : "Scheduled",
    canceled: isSpanish ? "Cancelado" : "Canceled",
    excluded: isSpanish ? "Fecha excluida" : "Excluded date",
    subscribed: isSpanish ? "inscritos" : "subscribed",
    confirmed: isSpanish ? "Confirmado" : "Confirmed",
    noVisibleEvents: isSpanish
      ? "No hay eventos visibles esta semana"
      : "No visible events this week",
    emptyHint: isSpanish
      ? "Intenta activar eventos programados o recurrentes desde la barra de herramientas."
      : "Try enabling scheduled or recurring events from the toolbar.",
    signInRequiredTitle: isSpanish
      ? "Inicio de sesión requerido"
      : "Sign in required",
    signInRequiredText: isSpanish
      ? "Por favor inicia sesión para confirmar tu asistencia."
      : "Please sign in to confirm attendance.",
    attendee: isSpanish ? "Asistente" : "Attendee",
    missingOccurrenceTitle: isSpanish
      ? "Falta la fecha de ocurrencia"
      : "Missing occurrence date",
    missingOccurrenceText: isSpanish
      ? "Este evento necesita una fecha válida antes de poder confirmar asistencia."
      : "This event needs a valid date before attendance can be confirmed.",
    unableConfirm: isSpanish
      ? "No se pudo confirmar la asistencia."
      : "Unable to confirm attendance.",
    attendanceUpdated: isSpanish
      ? "Asistencia actualizada"
      : "Attendance updated",
    markedAttending: isSpanish
      ? "Has sido marcado como asistiendo a"
      : "You have been marked as attending",
    declined: isSpanish ? "Has rechazado" : "You have declined",
    responseSaved: isSpanish
      ? "Tu respuesta fue guardada para"
      : "Your response for",
    wasSaved: isSpanish ? "." : "was saved.",
    unableConfirmTitle: isSpanish
      ? "No se pudo confirmar la asistencia"
      : "Unable to confirm attendance",
    confirmErrorFallback: isSpanish
      ? "Algo salió mal al confirmar tu asistencia."
      : "Something went wrong while confirming your attendance.",
    attendanceOpensTitle: isSpanish
      ? "La asistencia abre para la próxima ocurrencia"
      : "Attendance opens for the upcoming occurrence",
    attendanceOpensText: isSpanish
      ? "Solo puedes confirmar asistencia para la próxima fecha de este evento recurrente."
      : "You can only confirm attendance for the next upcoming date of this recurring event.",
    canceledOccurrenceTitle: isSpanish
      ? "Fecha cancelada"
      : "Canceled occurrence",
    canceledOccurrenceText: isSpanish
      ? "Esta fecha fue excluida de la secuencia recurrente."
      : "This date was excluded from the recurring sequence.",
    restoreOccurrenceConfirm: isSpanish
      ? "Restaurar esta fecha"
      : "Restore this date",
    keepCanceled: isSpanish ? "Mantener cancelada" : "Keep canceled",
    occurrenceRestoredTitle: isSpanish
      ? "Fecha restaurada"
      : "Occurrence restored",
    occurrenceRestoredText: isSpanish
      ? "La fecha seleccionada fue restaurada en la secuencia recurrente."
      : "The selected date was restored in the recurring sequence.",
    unableRestoreOccurrenceTitle: isSpanish
      ? "No se pudo restaurar la fecha"
      : "Unable to restore occurrence",
    unableRestoreOccurrenceText: isSpanish
      ? "Algo salió mal al restaurar esta fecha."
      : "Something went wrong while restoring this occurrence.",
    weekdaysShort: isSpanish
      ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekdaysTiny: isSpanish
      ? ["D", "L", "M", "M", "J", "V", "S"]
      : ["S", "M", "T", "W", "T", "F", "S"],
  };

  return t;
}
