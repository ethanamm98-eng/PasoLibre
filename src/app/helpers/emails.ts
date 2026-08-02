const sendAttendanceConfirmationEmail = async (payload: any) => {
    console.log("Sending attendance confirmation email with payload:", payload);

  const recipientEmail = payload?.participantEmail?.trim();

  if (!recipientEmail) return;

  try {
    // const payload = {
    //   eventId: event?.id,
    //   eventNameEn: event?.name_en,
    //   eventNameEs: event?.name_es,
    //   eventDate: event?.occurrenceDate || event?.date,
    //   participantName: formData.name.trim(),
    //   participantEmail: recipientEmail,
    //   participantLanguagePreference:
    //     profile?.language_preference || language || "en",
    //   checkInUrl,
    // };

    const response = await fetch("/api/send-attendance-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || result?.error);
    }
  } catch (error) {
    console.error("Attendance confirmation email error:", error);
  }
};

export { sendAttendanceConfirmationEmail };
