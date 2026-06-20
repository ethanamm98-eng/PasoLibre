(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/elements/FloatingLabelInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const FloatingLabelInput = ({ id, name, type = "text", label, value, onChange, maxLength, disabled, autoComplete = "off", readOnly, min, max, step })=>{
    _s();
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? showPassword ? "text" : "password" : type;
    const hasValue = value !== undefined && value !== null && String(value).length > 0;
    const isDateLike = type === "date" || type === "time" || type === "datetime-local" || type === "month";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: inputType,
                id: id,
                name: name,
                value: value,
                onChange: onChange,
                onFocus: ()=>setIsFocused(true),
                onBlur: ()=>setIsFocused(false),
                placeholder: isDateLike ? "" : " ",
                maxLength: maxLength,
                disabled: disabled,
                readOnly: readOnly,
                autoComplete: autoComplete,
                min: min,
                max: max,
                step: step,
                className: `w-full rounded-md border border-gray-400 bg-white px-3 py-2 pr-10 text-gray-800 transition truncate row-span-1
          ${disabled ? "cursor-not-allowed bg-gray-200" : ""}
          ${readOnly ? "bg-opacity-90" : "focus:outline-none focus:ring-1 focus:ring-blue-500"}
          autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]`
            }, void 0, false, {
                fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: `absolute left-3 bg-white px-1 text-sm transition-all duration-300 truncate max-w-[90%] ${isFocused || hasValue ? "-top-2 text-xs text-blue-600" : "top-2.5 text-gray-500"}`,
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isPasswordType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setShowPassword((prev)=>!prev),
                className: "absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600 duration-300 hover:scale-105 hover:text-[#0d4db0]",
                tabIndex: -1,
                children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                    fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                    lineNumber: 100,
                    columnNumber: 27
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                    fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                    lineNumber: 100,
                    columnNumber: 44
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(FloatingLabelInput, "iWy49CrN7Ox6+MLZMYpwKBk5heo=");
_c = FloatingLabelInput;
const __TURBOPACK__default__export__ = FloatingLabelInput;
var _c;
__turbopack_context__.k.register(_c, "FloatingLabelInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/CheckInForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckInForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-check-2.js [app-client] (ecmascript) <export default as CalendarCheck2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-in.js [app-client] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode.react/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/elements/FloatingLabelInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function CheckInForm({ event, attendanceSheetId, attendanceSheet, existingEntry, invitedEmail = "", invitedMemberId = "", invitedName = "", loggedInUser, loggedInProfile }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const isSpanish = language === "es";
    const t = {
        unableLoadAttendance: isSpanish ? "No se pudo cargar la asistencia." : "Unable to load attendance.",
        confirmationEmailFailed: isSpanish ? "No se pudo enviar el correo de confirmación." : "Confirmation email failed.",
        nameRequiredTitle: isSpanish ? "Nombre requerido" : "Name required",
        nameRequiredText: isSpanish ? "Por favor escribe tu nombre antes de confirmar tu asistencia." : "Please enter your name before confirming attendance.",
        unableConfirmAttendance: isSpanish ? "No se pudo confirmar la asistencia." : "Unable to confirm attendance.",
        somethingWentWrong: isSpanish ? "Algo salió mal al guardar tu asistencia." : "Something went wrong while saving your attendance.",
        attendanceConfirmedTitle: isSpanish ? "Asistencia confirmada" : "Attendance confirmed",
        attendanceConfirmedText: isSpanish ? `Has sido marcado como asistiendo a ${event.name_es}.` : `You have been marked as attending ${event.name_en}.`,
        cardTitleConfirmed: isSpanish ? "Asistencia Confirmada" : "Attendance Confirmed",
        cardTitleDefault: isSpanish ? "Confirmar Asistencia" : "Confirm Attendance",
        cardTextConfirmed: isSpanish ? "Tu asistencia fue registrada correctamente." : "Your attendance has been recorded successfully.",
        cardTextDefault: isSpanish ? "Puedes confirmar asistencia como invitado o iniciar sesión para una experiencia más rápida." : "You can confirm attendance as a guest or sign in for a faster experience.",
        qrTitle: isSpanish ? "Código QR del Evento" : "Event QR Code",
        qrDescription: isSpanish ? "Escanea este código para abrir la página de check-in de este evento." : "Guests can scan this code to open the check-in page for this event.",
        qrClick: isSpanish ? "Haz clic para agrandar el código QR" : "Click to enlarge QR code",
        checkingAccount: isSpanish ? "Verificando estado de cuenta..." : "Checking account status...",
        signedIn: isSpanish ? "Sesión iniciada" : "Signed in",
        autoFilled: isSpanish ? "Tu información se completó automáticamente" : "Your information has been auto-filled",
        reviewConfirm: isSpanish ? "Revisa la información y confirma tu asistencia." : "Review it and confirm attendance.",
        continueGuestOrSignIn: isSpanish ? "Continuar como invitado o iniciar sesión" : "Continue as guest or sign in",
        guestText: isSpanish ? "Puedes unirte a este evento sin una cuenta, o iniciar sesión para completar tu información automáticamente." : "You can join this event without an account, or sign in to auto-fill your information.",
        signIn: isSpanish ? "Iniciar sesión" : "Sign In",
        orContinueGuest: isSpanish ? "O Continuar Como Invitado" : "Or Continue As Guest",
        fullName: isSpanish ? "Nombre completo" : "Full Name",
        email: isSpanish ? "Correo electrónico" : "Email",
        phone: isSpanish ? "Teléfono" : "Phone",
        saving: isSpanish ? "Guardando..." : "Saving...",
        checkingAttendance: isSpanish ? "Verificando asistencia..." : "Checking Attendance...",
        attendanceInactive: isSpanish ? "Asistencia inactiva" : "Attendance Inactive",
        confirmAttendance: isSpanish ? "Confirmar asistencia" : "Confirm Attendance",
        scanQr: isSpanish ? "Escanea este código para abrir la página de check-in." : "Scan this code to open the check-in page.",
        pointCamera: isSpanish ? "Apunta tu cámara al código QR para abrir la página de check-in del evento." : "Point your camera at the QR code to open the event check-in page.",
        viewCalendar: isSpanish ? "Ver en Calendario" : "View Calendar",
        shareEvent: isSpanish ? "Compartir evento" : "Share Event",
        shareCopiedTitle: isSpanish ? "Enlace copiado" : "Link copied",
        shareCopiedText: isSpanish ? "El enlace del evento fue copiado al portapapeles." : "The event link was copied to your clipboard.",
        shareFailedTitle: isSpanish ? "No se pudo compartir" : "Unable to share",
        shareFailedText: isSpanish ? "Intenta copiar el enlace manualmente." : "Try copying the link manually.",
        musicTitle: isSpanish ? "Añadir música" : "Add Music",
        musicDescription: isSpanish ? "Busca una canción para incluirla en el mensaje compartido." : "Search for a song to include in the shared message.",
        musicPlaceholder: isSpanish ? "Buscar canción o artista..." : "Search song or artist...",
        searchMusic: isSpanish ? "Buscar" : "Search",
        selectedSong: isSpanish ? "Canción seleccionada" : "Selected Song",
        removeSong: isSpanish ? "Quitar canción" : "Remove Song",
        noMusicResults: isSpanish ? "Busca una canción para ver resultados." : "Search for a song to see results."
    };
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profileLoading, setProfileLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sheetLoading, setSheetLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [qrOpen, setQrOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmed, setConfirmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(existingEntry?.status === "attended" || !!existingEntry?.checked_in);
    const [, setParticipantCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [, setConfirmedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(existingEntry?.status === "attended" || existingEntry?.checked_in ? 1 : 0);
    const [loggedInUserState, setLoggedInUserState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CheckInForm.useState": ()=>loggedInUser || null
    }["CheckInForm.useState"]);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(loggedInProfile || null);
    const [resolvedAttendanceSheet, setResolvedAttendanceSheet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(attendanceSheet || null);
    const [resolvedExistingEntry, setResolvedExistingEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(existingEntry || null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CheckInForm.useState": ()=>{
            const profileName = [
                loggedInProfile?.first_name,
                loggedInProfile?.last_name
            ].filter(Boolean).join(" ").trim();
            return {
                name: existingEntry?.participant_name || profileName || invitedName || "",
                email: existingEntry?.participant_email || loggedInProfile?.email || loggedInUser?.email || invitedEmail || "",
                phone: existingEntry?.participant_phone || loggedInProfile?.phone || ""
            };
        }
    }["CheckInForm.useState"]);
    const [selectedMusic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [checkInUrl, setCheckInUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(`/check-in/${event.id}?occurrenceDate=${event.date}`);
    const effectiveAttendanceSheetId = resolvedAttendanceSheet?.id || attendanceSheetId || null;
    const attendanceAvailable = !!effectiveAttendanceSheetId;
    const attendanceActive = attendanceAvailable && (resolvedAttendanceSheet?.is_active ?? true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckInForm.useEffect": ()=>{
            if (!qrOpen) return;
            const handleEscape = {
                "CheckInForm.useEffect.handleEscape": (event)=>{
                    if (event.key === "Escape") setQrOpen(false);
                }
            }["CheckInForm.useEffect.handleEscape"];
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
            return ({
                "CheckInForm.useEffect": ()=>{
                    document.body.style.overflow = "";
                    window.removeEventListener("keydown", handleEscape);
                }
            })["CheckInForm.useEffect"];
        }
    }["CheckInForm.useEffect"], [
        qrOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckInForm.useEffect": ()=>{
            setCheckInUrl(`${window.location.origin}/check-in/${event.id}?occurrenceDate=${event.date}`);
        }
    }["CheckInForm.useEffect"], [
        event.id,
        event.date
    ]);
    const getSelectedMusicText = ()=>{
        if (!selectedMusic) return "";
        return isSpanish ? `\n\nCanción sugerida: ${selectedMusic.trackName} — ${selectedMusic.artistName}${selectedMusic.trackViewUrl ? `\n${selectedMusic.trackViewUrl}` : ""}` : `\n\nSuggested song: ${selectedMusic.trackName} — ${selectedMusic.artistName}${selectedMusic.trackViewUrl ? `\n${selectedMusic.trackViewUrl}` : ""}`;
    };
    const handleShareEvent = async ()=>{
        try {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const title = isSpanish ? event.name_es : event.name_en;
            const shareText = `${isSpanish ? `Te invito a este evento: ${title}` : `You're invited to this event: ${title}`}${getSelectedMusicText()}`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${checkInUrl}`)}`;
            const instagramText = `${shareText}\n${checkInUrl}`;
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
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
                didOpen: ()=>{
                    const nativeBtn = document.getElementById("share-native");
                    const whatsappBtn = document.getElementById("share-whatsapp");
                    const instagramBtn = document.getElementById("share-instagram");
                    const copyBtn = document.getElementById("copy-link");
                    nativeBtn?.addEventListener("click", async ()=>{
                        if (navigator.share) {
                            await navigator.share({
                                title,
                                text: shareText,
                                url: checkInUrl
                            });
                        } else {
                            await navigator.clipboard.writeText(checkInUrl);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                                icon: "success",
                                title: t.shareCopiedTitle,
                                text: t.shareCopiedText
                            });
                        }
                    });
                    whatsappBtn?.addEventListener("click", ()=>{
                        window.open(whatsappUrl, "_blank");
                    });
                    instagramBtn?.addEventListener("click", async ()=>{
                        try {
                            await navigator.clipboard.writeText(instagramText);
                            window.open("https://www.instagram.com/direct/inbox/", "_blank");
                            setTimeout(()=>{
                                window.location.href = "instagram://direct";
                            }, 400);
                            setTimeout(()=>{
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                                    icon: "info",
                                    title: "Instagram",
                                    html: `
                    <div class="text-sm text-slate-600 leading-6">
                      ${isSpanish ? "El mensaje y enlace del evento fueron copiados automáticamente.<br/><br/>Instagram Chats se abrió. Solo pega el mensaje en el chat o historia." : "The event message and link were copied automatically.<br/><br/>Instagram Chats opened. Simply paste the message into the chat or story."}
                    </div>
                  `,
                                    confirmButtonColor: "#0d4db0"
                                });
                            }, 700);
                        } catch (error) {
                            console.error(error);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                                icon: "error",
                                title: t.shareFailedTitle,
                                text: t.shareFailedText
                            });
                        }
                    });
                    copyBtn?.addEventListener("click", async ()=>{
                        await navigator.clipboard.writeText(checkInUrl);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                            icon: "success",
                            title: t.shareCopiedTitle,
                            text: t.shareCopiedText
                        });
                    });
                }
            });
        } catch (error) {
            console.error("Share event error:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                icon: "error",
                title: t.shareFailedTitle,
                text: t.shareFailedText
            });
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckInForm.useEffect": ()=>{
            if (!qrOpen) return;
            const handleEscape = {
                "CheckInForm.useEffect.handleEscape": (event)=>{
                    if (event.key === "Escape") setQrOpen(false);
                }
            }["CheckInForm.useEffect.handleEscape"];
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
            return ({
                "CheckInForm.useEffect": ()=>{
                    document.body.style.overflow = "";
                    window.removeEventListener("keydown", handleEscape);
                }
            })["CheckInForm.useEffect"];
        }
    }["CheckInForm.useEffect"], [
        qrOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckInForm.useEffect": ()=>{
            setLoggedInUserState(loggedInUser || null);
            setProfile(loggedInProfile || null);
            const profileName = [
                loggedInProfile?.first_name,
                loggedInProfile?.last_name
            ].filter(Boolean).join(" ").trim();
            setFormData({
                "CheckInForm.useEffect": (prev)=>({
                        name: prev.name || profileName || invitedName || "",
                        email: prev.email || loggedInProfile?.email || loggedInUser?.email || invitedEmail || "",
                        phone: prev.phone || loggedInProfile?.phone || ""
                    })
            }["CheckInForm.useEffect"]);
            setProfileLoading(false);
        }
    }["CheckInForm.useEffect"], [
        loggedInUser,
        loggedInProfile,
        invitedEmail,
        invitedName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckInForm.useEffect": ()=>{
            let mounted = true;
            const loadAttendanceFromApi = {
                "CheckInForm.useEffect.loadAttendanceFromApi": async ()=>{
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
                            memberId: invitedMemberId || (typeof loggedInUserState === "object" && loggedInUserState !== null && "id" in loggedInUserState ? loggedInUserState.id : "") || "",
                            email: formData.email || invitedEmail || ""
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
                            setConfirmed(result.existingEntry.status === "attended" || !!result.existingEntry.checked_in);
                            setFormData({
                                "CheckInForm.useEffect.loadAttendanceFromApi": (prev)=>({
                                        name: prev.name || result.existingEntry.participant_name || "",
                                        email: prev.email || result.existingEntry.participant_email || "",
                                        phone: prev.phone || result.existingEntry.participant_phone || ""
                                    })
                            }["CheckInForm.useEffect.loadAttendanceFromApi"]);
                        }
                    } catch (error) {
                        console.error("Attendance API load failed:", error);
                    } finally{
                        if (mounted) setSheetLoading(false);
                    }
                }
            }["CheckInForm.useEffect.loadAttendanceFromApi"];
            loadAttendanceFromApi();
            return ({
                "CheckInForm.useEffect": ()=>{
                    mounted = false;
                }
            })["CheckInForm.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CheckInForm.useEffect"], [
        event.id,
        invitedMemberId,
        invitedEmail,
        loggedInUserState
    ]);
    const sendAttendanceConfirmationEmail = async ()=>{
        const recipientEmail = formData.email.trim();
        if (!recipientEmail) return;
        try {
            const response = await fetch("/api/send-attendance-confirmation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId: event?.id,
                    eventNameEn: event?.name_en,
                    eventNameEs: event?.name_es,
                    eventDate: event?.occurrenceDate || event?.date,
                    participantName: formData.name.trim(),
                    participantEmail: recipientEmail,
                    participantLanguagePreference: profile?.language_preference || language || "en",
                    checkInUrl
                })
            });
            const result = await response.json();
            if (!response.ok || !result?.success) {
                throw new Error(result?.message || result?.error || t.confirmationEmailFailed);
            }
        } catch (error) {
            console.error("Attendance confirmation email error:", error);
        }
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleConfirmAttendance = async ()=>{
        // Prevent attendance confirmation for past events
        const occurrenceDate = event?.occurrenceDate || event?.date;
        const eventTime = event?.time || "23:59";
        if (occurrenceDate) {
            const eventDateTime = new Date(`${occurrenceDate}T${eventTime}`);
            if (eventDateTime < new Date()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                    icon: "info",
                    title: language === "es" ? "Evento finalizado" : "Event has ended",
                    text: language === "es" ? "No puedes confirmar asistencia para eventos pasados." : "You cannot confirm attendance for past events."
                });
                return;
            }
        }
        if (!formData.name.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                icon: "warning",
                title: t.nameRequiredTitle,
                text: t.nameRequiredText
            });
            return;
        }
        try {
            setLoading(true);
            const resolvedMemberId = invitedMemberId || (typeof loggedInUserState === "object" && loggedInUserState !== null && "id" in loggedInUserState ? loggedInUserState.id : null) || resolvedExistingEntry?.member_id || null;
            const response = await fetch("/api/event-attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId: event?.id,
                    occurrenceDate: event?.date,
                    attendanceSheetId: effectiveAttendanceSheetId,
                    participantName: formData.name.trim(),
                    participantEmail: formData.email.trim() || null,
                    participantPhone: formData.phone.trim() || null,
                    memberId: resolvedMemberId,
                    status: "attended"
                })
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                icon: "success",
                title: t.attendanceConfirmedTitle,
                text: t.attendanceConfirmedText
            });
        } catch (error) {
            console.error("Attendance confirmation error:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                icon: "error",
                title: t.unableConfirmAttendance,
                text: error instanceof Error ? error.message : t.somethingWentWrong
            });
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckInForm.useEffect": ()=>{
            setResolvedExistingEntry(existingEntry || null);
            setConfirmed(existingEntry?.status === "attended" || !!existingEntry?.checked_in);
        }
    }["CheckInForm.useEffect"], [
        existingEntry
    ]);
    const autoFilledName = [
        profile?.first_name,
        profile?.last_name
    ].filter(Boolean).join(" ").trim();
    const handleOpenQrAlert = async ()=>{
        const qrContainerId = "event-qr-swal-container";
        let root = null;
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
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
                popup: "event-qr-popup"
            },
            didOpen: ()=>{
                const container = document.getElementById(qrContainerId);
                if (!container) return;
                root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRoot"])(container);
                root.render(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeCanvas"], {
                    value: checkInUrl,
                    size: 420,
                    bgColor: "#ffffff",
                    fgColor: "#0d4db0",
                    level: "H",
                    includeMargin: false
                }, void 0, false, {
                    fileName: "[project]/app/components/CheckInForm.tsx",
                    lineNumber: 888,
                    columnNumber: 11
                }, this));
            },
            willClose: ()=>{
                root?.unmount();
                root = null;
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative my-0 w-full overflow-hidden rounded-4xl border px-5 py-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500 md:px-6 md:py-7 ${confirmed ? "border-green-200 bg-linear-to-br from-green-50 via-white to-blue-50" : "border-white/80 bg-white/92"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_24%)]"
                }, void 0, false, {
                    fileName: "[project]/app/components/CheckInForm.tsx",
                    lineNumber: 914,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-1 flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex h-10 w-10 md:h-13 md:w-13 shrink-0 items-center justify-center rounded-2xl shadow-sm ${confirmed ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700"}`,
                                    children: confirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 23
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 926,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck2$3e$__["CalendarCheck2"], {
                                        className: "md:w-8 md:h-8 w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 928,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 918,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700",
                                            children: language === "en" ? "Invitation" : "Invitación"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CheckInForm.tsx",
                                            lineNumber: 933,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg md:text-2xl font-semibold tracking-tight text-slate-950",
                                            children: confirmed ? t.cardTitleConfirmed : t.cardTitleDefault
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CheckInForm.tsx",
                                            lineNumber: 937,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 932,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 917,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 mb-2 text-sm leading-6 text-slate-500 px-1",
                                children: confirmed ? t.cardTextConfirmed : t.cardTextDefault
                            }, void 0, false, {
                                fileName: "[project]/app/components/CheckInForm.tsx",
                                lineNumber: 944,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 943,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleOpenQrAlert,
                            className: "mb-5 w-full cursor-pointer overflow-hidden rounded-[1.35rem] border border-blue-100 bg-linear-to-br from-blue-50 via-white to-slate-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left lg:flex-col lg:text-center xl:flex-row xl:text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeCanvas"], {
                                                value: checkInUrl,
                                                size: 112,
                                                bgColor: "#ffffff",
                                                fgColor: "#0d4db0",
                                                level: "H",
                                                includeMargin: false
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 956,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-sm",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 965,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 955,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 max-w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: t.qrTitle
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 971,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm leading-5 text-slate-500",
                                                children: t.qrDescription
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 975,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500",
                                                children: checkInUrl
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 979,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xs font-semibold text-blue-600",
                                                children: t.qrClick
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 983,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 970,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CheckInForm.tsx",
                                lineNumber: 954,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 949,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleShareEvent,
                            className: `${confirmed ? "mb-3" : "mb-5"}  inline-flex w-full items-center justify-center gap-2 rounded-2xl 
              bg-linear-to-r from-[#0d4db0] via-blue-600 to-indigo-700 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(37,99,235,0.38)] cursor-pointer`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 998,
                                    columnNumber: 13
                                }, this),
                                t.shareEvent
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 990,
                            columnNumber: 11
                        }, this),
                        !confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-5 rounded-[1.35rem] border border-slate-200 bg-slate-50/90 px-4 py-4 shadow-sm",
                            children: profileLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: t.checkingAccount
                            }, void 0, false, {
                                fileName: "[project]/app/components/CheckInForm.tsx",
                                lineNumber: 1005,
                                columnNumber: 17
                            }, this) : loggedInUserState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                                        lineNumber: 1011,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                                    lineNumber: 1010,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-base font-semibold text-slate-800 my-auto",
                                                    children: t.signedIn
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                                    lineNumber: 1013,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CheckInForm.tsx",
                                            lineNumber: 1009,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm leading-6 text-slate-500 p-1",
                                            children: [
                                                t.autoFilled,
                                                autoFilledName ? ` ${isSpanish ? "para" : "for"} ${autoFilledName}` : "",
                                                ". ",
                                                t.reviewConfirm
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CheckInForm.tsx",
                                            lineNumber: 1018,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1008,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/CheckInForm.tsx",
                                lineNumber: 1007,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-slate-800",
                                                children: t.continueGuestOrSignIn
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 1030,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm leading-6 text-slate-500",
                                                children: t.guestText
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 1034,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 1029,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/login?redirect=/check-in/${event?.id}`,
                                        className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 1043,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.signIn
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CheckInForm.tsx",
                                                lineNumber: 1044,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 1039,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CheckInForm.tsx",
                                lineNumber: 1028,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 1003,
                            columnNumber: 13
                        }, this),
                        !confirmed && !profileLoading && !loggedInUserState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative my-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full border-t border-slate-200"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 1054,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1053,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-slate-200 bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 shadow-sm",
                                        children: t.orContinueGuest
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CheckInForm.tsx",
                                        lineNumber: 1058,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1057,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 1052,
                            columnNumber: 13
                        }, this),
                        !confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 rounded-[1.35rem] border border-slate-200 bg-white/80 p-4 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: "name",
                                    name: "name",
                                    label: t.fullName,
                                    value: formData.name,
                                    onChange: handleChange,
                                    type: "text"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1068,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: "email",
                                    name: "email",
                                    label: t.email,
                                    value: formData.email,
                                    onChange: handleChange,
                                    type: "email"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1077,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: "phone",
                                    name: "phone",
                                    label: t.phone,
                                    value: formData.phone,
                                    onChange: handleChange,
                                    type: "tel"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1086,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 1067,
                            columnNumber: 13
                        }, this),
                        !confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleConfirmAttendance,
                            disabled: loading || sheetLoading || !attendanceActive || confirmed,
                            className: `mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition ${confirmed ? "bg-linear-to-r from-green-600 to-emerald-700" : "bg-linear-to-r from-[#0d4db0] to-indigo-700 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"} disabled:cursor-not-allowed disabled:opacity-70`,
                            children: loading ? t.saving : sheetLoading ? t.checkingAttendance : confirmed ? t.cardTitleConfirmed : !attendanceActive ? t.attendanceInactive : t.confirmAttendance
                        }, void 0, false, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 1099,
                            columnNumber: 13
                        }, this),
                        confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/events",
                            className: `${confirmed ? "" : "mt-6"}  inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-green-600 to-emerald-700 
                px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                    size: 17
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CheckInForm.tsx",
                                    lineNumber: 1132,
                                    columnNumber: 15
                                }, this),
                                t.viewCalendar
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CheckInForm.tsx",
                            lineNumber: 1125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/CheckInForm.tsx",
                    lineNumber: 916,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/CheckInForm.tsx",
            lineNumber: 907,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(CheckInForm, "Oq6ueHPZlqPP3WJwsqGatahQGHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = CheckInForm;
var _c;
__turbopack_context__.k.register(_c, "CheckInForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/EventDetails.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa6/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/si/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/gi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-pause.js [app-client] (ecmascript) <export default as PauseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function EventDetails({ confirmed = false, event, attendanceSheet, participants = [] }) {
    _s();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const isSpanish = language == "es";
    const locale = isSpanish ? "es-PR" : "en-US";
    const [playingPreviewUrl, setPlayingPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [eventStatus, setEventStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(event?.status || "");
    const [publishingEvent, setPublishingEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resolvedAttendanceSheet, setResolvedAttendanceSheet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(attendanceSheet || null);
    const [resolvedParticipants, setResolvedParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(participants || []);
    const t = {
        event: isSpanish ? "Evento" : "Event",
        eventName: isSpanish ? event.name_es : event.name_en,
        locationTbd: isSpanish ? "Ubicación por confirmar" : "Location TBD",
        noDescription: isSpanish ? "<p>No hay descripción disponible todavía.</p>" : "<p>No description available yet.</p>",
        additionalDetails: isSpanish ? "Detalles adicionales" : "Additional Details",
        attending: isSpanish ? "Estás asistiendo" : "You’re attending",
        dressCode: isSpanish ? "Código de vestimenta" : "Dress code",
        suggestedDonation: isSpanish ? "Donativo sugerido" : "Suggested donation",
        hostedBy: isSpanish ? "Organizado por:" : "Hosted by:",
        instructedBy: isSpanish ? "Instruido por:" : "Instructed by:",
        includesForm: isSpanish ? "Este evento incluye un formulario" : "This event includes a form",
        participants: isSpanish ? "Participantes" : "Participants",
        participant: isSpanish ? "participante" : "participant",
        inscription: isSpanish ? "inscripción" : "registration",
        inscriptionsPlural: isSpanish ? "inscripciones" : "registrations",
        noParticipants: isSpanish ? "No hay participantes todavía" : "No participants yet",
        participantAlt: isSpanish ? "Participante" : "Participant",
        viewLocation: isSpanish ? "Ver ubicación en el mapa →" : "View location on map →",
        repeats: isSpanish ? "Recurrente" : "Recurring",
        weekly: isSpanish ? "Semanal" : "Weekly",
        monthly: isSpanish ? "Mensual" : "Monthly",
        yearly: isSpanish ? "Anual" : "Yearly",
        noDate: isSpanish ? "Fecha por confirmar" : "Date TBD",
        noTime: isSpanish ? "Hora por confirmar" : "Time TBD",
        draftEvent: isSpanish ? "Evento en borrador" : "Draft event",
        draftDescription: isSpanish ? "Este evento todavía no está publicado. Revísalo y publícalo cuando esté listo." : "This event is not published yet. Review it and publish it when it is ready.",
        publishEvent: isSpanish ? "Publicar evento" : "Publish event",
        publishingEvent: isSpanish ? "Publicando..." : "Publishing..."
    };
    const isDraftEvent = String(eventStatus || "").toLowerCase() === "draft";
    const handlePublishEvent = async ()=>{
        try {
            setPublishingEvent(true);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").update({
                status: "published"
            }).eq("id", event.id);
            if (error) {
                console.error("Publish event error:", error);
                return;
            }
            setEventStatus("published");
        } catch (error) {
            console.error("Publish event failed:", error);
        } finally{
            setPublishingEvent(false);
        }
    };
    const getLocalizedText = (en, es, fallback = "")=>{
        if (isSpanish) return es?.trim() || en?.trim() || fallback;
        return en?.trim() || es?.trim() || fallback;
    };
    // const eventName = isSpanish ? event?.name_en : event?.name_es;
    const eventDescription = getLocalizedText(event?.description_en, event?.description_es, t.noDescription);
    const eventDetails = getLocalizedText(event?.details_en, event?.details_es, "");
    const imageHeight = Math.max(Number(event?.image_height || 320), 320);
    const imagePositionY = Number(event?.image_position_y ?? 50);
    const normalizedHosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventDetails.useMemo[normalizedHosts]": ()=>{
            if (!Array.isArray(event?.hosts)) return [];
            return event.hosts.map({
                "EventDetails.useMemo[normalizedHosts]": (host)=>{
                    if (typeof host === "string") {
                        return {
                            id: host,
                            name: host
                        };
                    }
                    return {
                        id: host?.id || host?.name || "",
                        name: host?.name || host?.id || ""
                    };
                }
            }["EventDetails.useMemo[normalizedHosts]"]).filter({
                "EventDetails.useMemo[normalizedHosts]": (host)=>host.name
            }["EventDetails.useMemo[normalizedHosts]"]);
        }
    }["EventDetails.useMemo[normalizedHosts]"], [
        event?.hosts
    ]);
    const normalizedIntructors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventDetails.useMemo[normalizedIntructors]": ()=>{
            if (!Array.isArray(event?.instructors)) return [];
            return event.instructors.map({
                "EventDetails.useMemo[normalizedIntructors]": (instructor)=>{
                    if (typeof instructor === "string") {
                        return {
                            id: instructor,
                            name: instructor
                        };
                    }
                    return {
                        id: instructor?.id || instructor?.name || "",
                        name: instructor?.name || instructor?.id || ""
                    };
                }
            }["EventDetails.useMemo[normalizedIntructors]"]).filter({
                "EventDetails.useMemo[normalizedIntructors]": (instructor)=>instructor.name
            }["EventDetails.useMemo[normalizedIntructors]"]);
        }
    }["EventDetails.useMemo[normalizedIntructors]"], [
        event?.instructors
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventDetails.useEffect": ()=>{
            setEventStatus(event?.status || "");
        }
    }["EventDetails.useEffect"], [
        event?.status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventDetails.useEffect": ()=>{
            setResolvedAttendanceSheet(attendanceSheet || null);
        }
    }["EventDetails.useEffect"], [
        attendanceSheet
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventDetails.useEffect": ()=>{
            setResolvedParticipants(participants || []);
        }
    }["EventDetails.useEffect"], [
        participants
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EventDetails.useEffect": ()=>{
            if (!playingPreviewUrl) return;
            const audio = new Audio(playingPreviewUrl);
            audio.play().catch({
                "EventDetails.useEffect": (error)=>{
                    console.error("Music preview play error:", error);
                }
            }["EventDetails.useEffect"]);
            audio.addEventListener("ended", {
                "EventDetails.useEffect": ()=>{
                    setPlayingPreviewUrl(null);
                }
            }["EventDetails.useEffect"]);
            return ({
                "EventDetails.useEffect": ()=>{
                    audio.pause();
                    audio.currentTime = 0;
                }
            })["EventDetails.useEffect"];
        }
    }["EventDetails.useEffect"], [
        playingPreviewUrl
    ]);
    const formatLocalizedDate = (value)=>{
        if (!value) return t.noDate;
        const dateValue = new Date(`${value}T00:00:00`);
        if (Number.isNaN(dateValue.getTime())) return t.noDate;
        return new Intl.DateTimeFormat(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(dateValue);
    };
    const formatLocalizedTime = (value)=>{
        if (!value) return t.noTime;
        const [hours = "0", minutes = "0"] = String(value).split(":");
        const dateValue = new Date();
        dateValue.setHours(Number(hours), Number(minutes), 0, 0);
        if (Number.isNaN(dateValue.getTime())) return t.noTime;
        return new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(dateValue);
    };
    const formatLocalizedRecurrence = ()=>{
        const scheduleType = String(event?.schedule_type || "").toLowerCase();
        if (scheduleType !== "recurrent") return "";
        const recurrence = String(event?.recurrence || "").toLowerCase();
        const dayMap = {
            sunday: isSpanish ? "domingo" : "Sunday",
            monday: isSpanish ? "lunes" : "Monday",
            tuesday: isSpanish ? "martes" : "Tuesday",
            wednesday: isSpanish ? "miércoles" : "Wednesday",
            thursday: isSpanish ? "jueves" : "Thursday",
            friday: isSpanish ? "viernes" : "Friday",
            saturday: isSpanish ? "sábado" : "Saturday",
            sun: isSpanish ? "domingo" : "Sun",
            mon: isSpanish ? "lunes" : "Mon",
            tue: isSpanish ? "martes" : "Tue",
            wed: isSpanish ? "miércoles" : "Wed",
            thu: isSpanish ? "jueves" : "Thu",
            fri: isSpanish ? "viernes" : "Fri",
            sat: isSpanish ? "sábado" : "Sat"
        };
        const formatCsvDays = (value)=>{
            if (!value) return "";
            return value.split(",").map((day)=>{
                const cleanDay = day.trim();
                return dayMap[cleanDay.toLowerCase()] || cleanDay;
            }).filter(Boolean).join(", ");
        };
        const formatMonthName = (monthNumber)=>{
            const parsedMonth = Number(monthNumber);
            if (!parsedMonth || parsedMonth < 1 || parsedMonth > 12) return "";
            return new Intl.DateTimeFormat(locale, {
                month: "long"
            }).format(new Date(2026, parsedMonth - 1, 1));
        };
        const formatCsvMonths = (value)=>{
            if (!value) return "";
            return value.split(",").map((month)=>formatMonthName(month.trim()) || month.trim()).filter(Boolean).join(", ");
        };
        const recurrenceMap = {
            weekly: t.weekly,
            monthly: t.monthly,
            yearly: t.yearly,
            recurrent: t.repeats
        };
        const baseText = recurrenceMap[recurrence] || t.repeats;
        if (recurrence === "weekly") {
            const daysText = formatCsvDays(event.days_of_week_csv);
            return daysText ? `${baseText} • ${isSpanish ? "Días" : "Days"}: ${daysText}` : baseText;
        }
        if (recurrence === "monthly") {
            const dayText = event.day_of_month ? `${isSpanish ? "Día" : "Day"} ${event.day_of_month}` : "";
            const monthsText = formatCsvMonths(event.months_csv);
            return [
                baseText,
                dayText,
                monthsText
            ].filter(Boolean).join(" • ");
        }
        if (recurrence === "yearly") {
            const monthText = formatMonthName(event.month);
            const dayText = event.day_of_month ? `${isSpanish ? "Día" : "Day"} ${event.day_of_month}` : "";
            return [
                baseText,
                monthText,
                dayText
            ].filter(Boolean).join(" • ");
        }
        return baseText;
    };
    const formatType = (value)=>{
        if (!value) return t.event;
        const cleanValue = String(value).trim();
        if (cleanValue.toLowerCase() === "event") return t.event;
        return cleanValue;
    };
    const allParticipants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EventDetails.useMemo[allParticipants]": ()=>{
            const occurrenceDate = event?.occurrenceDate || event?.date || resolvedAttendanceSheet?.occurrence_date;
            return (resolvedParticipants || []).filter({
                "EventDetails.useMemo[allParticipants]": (participant)=>{
                    const isConfirmed = participant.status === "attended" || participant.checked_in === true;
                    if (!isConfirmed) return false;
                    if (!occurrenceDate) return true;
                    if (!participant.occurrence_date) return true;
                    return participant.occurrence_date === occurrenceDate;
                }
            }["EventDetails.useMemo[allParticipants]"]);
        }
    }["EventDetails.useMemo[allParticipants]"], [
        resolvedParticipants,
        event?.occurrenceDate,
        event?.date,
        resolvedAttendanceSheet?.occurrence_date
    ]);
    const participantsCount = allParticipants.length;
    const visibleParticipants = allParticipants.slice(0, 5);
    const remainingParticipants = participantsCount > 5 ? participantsCount - 5 : 0;
    const recurrenceText = formatLocalizedRecurrence();
    const hasLocation = [
        event.street_address,
        event.city,
        event.country,
        event.zip_code
    ].some(Boolean);
    const locationText = [
        event.street_address,
        event.city,
        event.country
    ].filter(Boolean).join(", ") || t.locationTbd;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex h-full flex-col overflow-hidden rounded-4xl border transition-all duration-700 ${confirmed ? "border-green-300 bg-linear-to-br from-green-50 via-white to-blue-50 shadow-[0_30px_90px_rgba(16,185,129,0.18)] scale-[1.01]" : "border-white/80 bg-linear-to-br from-white via-slate-50 to-blue-50 shadow-[0_24px_75px_rgba(15,23,42,0.10)]"}`,
        children: [
            isDraftEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 border-b border-amber-200 bg-linear-to-r from-amber-50 via-orange-50 to-yellow-50 px-5 py-4 md:px-7",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaExclamationTriangle"], {}, void 0, false, {
                                        fileName: "[project]/app/components/EventDetails.tsx",
                                        lineNumber: 437,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-black uppercase tracking-[0.16em] text-amber-800",
                                                    children: t.draftEvent
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/EventDetails.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full border border-amber-200 bg-white/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-amber-700 shadow-sm",
                                                    children: "Draft"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/EventDetails.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 441,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm leading-5 text-amber-800/80",
                                            children: t.draftDescription
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 451,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/EventDetails.tsx",
                            lineNumber: 435,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handlePublishEvent,
                            disabled: publishingEvent,
                            className: "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-green-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaCheckCircle"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this),
                                publishingEvent ? t.publishingEvent : t.publishEvent
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/EventDetails.tsx",
                            lineNumber: 457,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/EventDetails.tsx",
                    lineNumber: 434,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full overflow-hidden",
                style: {
                    height: `${imageHeight}px`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: event.image_url || "/carousel/bridge.webp",
                        alt: t.eventName,
                        fill: true,
                        sizes: "(max-width: 1024px) 100vw, 65vw",
                        className: "object-cover",
                        style: {
                            objectPosition: `center ${imagePositionY}%`
                        },
                        priority: true
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 476,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-5 right-5 top-5 flex items-start justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold  capitalize text-slate-700 shadow-sm backdrop-blur-sm max-w-[45vw] md:max-w-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTag"], {
                                        className: "text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/EventDetails.tsx",
                                        lineNumber: 495,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: formatType(event.type)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/EventDetails.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    " "
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 491,
                                columnNumber: 11
                            }, this),
                            event.audio_enabled && event.audio_preview_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-5 min-w-0 max-w-[52vw] md:max-w-none rounded-[1.35rem] border border-blue-100 bg-linear-to-br relative left-4 from-blue-50/90 via-white/80 to-indigo-50/85 px-2.5 py-2 md:px-4 md:py-3 shadow-sm scale-90 md:scale-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        event.audio_artwork_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: event.audio_artwork_url,
                                            alt: event.audio_track_name || "Event audio",
                                            className: "h-8 w-8 md:h-12 md:w-12 rounded-xl object-cover shadow-sm",
                                            width: 48,
                                            height: 48
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 505,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-[11px] md:text-sm font-semibold text-slate-900 mb-0",
                                                    children: event.audio_track_name || "Event audio"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/EventDetails.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-[10px] md:text-xs text-slate-500",
                                                    children: event.audio_artist_name || ""
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/EventDetails.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 514,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPlayingPreviewUrl((prev)=>prev === event.audio_preview_url ? null : event.audio_preview_url || null),
                                            className: "inline-flex h-8 w-8 md:h-11 md:w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg  shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700",
                                            children: playingPreviewUrl === event.audio_preview_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                                size: 22
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/EventDetails.tsx",
                                                lineNumber: 536,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                                size: 22
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/EventDetails.tsx",
                                                lineNumber: 538,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 523,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 503,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 499,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 490,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 bottom-0 p-5 md:p-7",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-100",
                                    children: t.event
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl",
                                    children: t.eventName
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 552,
                                    columnNumber: 13
                                }, this),
                                confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 inline-flex animate-fade-in items-center gap-2 rounded-full border border-white/20 bg-green-500/90 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaCheckCircle"], {}, void 0, false, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this),
                                        t.attending
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 557,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/EventDetails.tsx",
                            lineNumber: 547,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 546,
                        columnNumber: 9
                    }, this),
                    confirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center bg-green-600/20 backdrop-blur-[1px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaCheckCircle"], {
                            className: "animate-scaleIn text-5xl text-white drop-shadow-xl"
                        }, void 0, false, {
                            fileName: "[project]/app/components/EventDetails.tsx",
                            lineNumber: 567,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 470,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col p-5 md:p-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prose prose-sm max-w-none text-slate-600 md:prose-base",
                        dangerouslySetInnerHTML: {
                            __html: eventDescription || t.noDescription
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaCalendarAlt"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 582,
                                    columnNumber: 19
                                }, void 0),
                                label: formatLocalizedDate(event.date)
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 581,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaClock"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 587,
                                    columnNumber: 19
                                }, void 0),
                                label: formatLocalizedTime(event.time)
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 586,
                                columnNumber: 11
                            }, this),
                            (hasLocation || event?.location_url) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaMapMarkerAlt"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 593,
                                    columnNumber: 21
                                }, void 0),
                                label: `${locationText}${event.zip_code ? ` • ${event.zip_code}` : ""}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 592,
                                columnNumber: 13
                            }, this),
                            recurrenceText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiRepeat"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 601,
                                    columnNumber: 29
                                }, void 0),
                                label: recurrenceText
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 601,
                                columnNumber: 13
                            }, this),
                            !!event.dress_code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaShirt"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 606,
                                    columnNumber: 21
                                }, void 0),
                                label: `${t.dressCode}: ${event.dress_code}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 605,
                                columnNumber: 13
                            }, this),
                            !!event.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaGift"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 613,
                                    columnNumber: 21
                                }, void 0),
                                label: `${t.suggestedDonation}: $${Number(event.price).toFixed(2)}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 612,
                                columnNumber: 13
                            }, this),
                            event.include_form && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoTile, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiGoogleforms"], {}, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 621,
                                    columnNumber: 29
                                }, void 0),
                                label: t.includesForm,
                                blue: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 621,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this),
                    !!eventDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 rounded-[1.35rem] bg-white/85 px-4 py-4 backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.14em] text-slate-500",
                                children: t.additionalDetails
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 627,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "prose prose-sm mt-2 max-w-none text-slate-700",
                                dangerouslySetInnerHTML: {
                                    __html: eventDetails
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 630,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 626,
                        columnNumber: 11
                    }, this),
                    (!!normalizedHosts.length || !!normalizedIntructors.length) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-1 gap-3 rounded-3xl backdrop-blur-sm sm:grid-cols-2",
                        children: [
                            !!normalizedHosts.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PeopleCard, {
                                title: t.hostedBy,
                                count: normalizedHosts.length,
                                people: normalizedHosts,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUserTie"], {
                                    className: "text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 646,
                                    columnNumber: 23
                                }, void 0),
                                tone: "blue"
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 642,
                                columnNumber: 15
                            }, this),
                            !!normalizedIntructors.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PeopleCard, {
                                title: t.instructedBy,
                                count: normalizedIntructors.length,
                                people: normalizedIntructors,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GiTeacher"], {
                                    className: "text-base"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 656,
                                    columnNumber: 23
                                }, void 0),
                                tone: "violet"
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 652,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 640,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 rounded-[1.35rem] border-blue-100 bg-linear-to-br from-blue-50 via-white to-slate-50 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex items-center justify-between gap-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-sm font-semibold text-slate-900",
                                    children: t.participants
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 665,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 664,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: visibleParticipants.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        visibleParticipants.map((participant)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative -ml-2 first:ml-0 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-linear-to-br from-blue-50 to-indigo-100 text-blue-700 shadow-sm",
                                                title: participant.participant_name || t.participantAlt,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    className: "h-5 w-5",
                                                    "aria-hidden": "true",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M12 12.5c2.35 0 4.25-1.9 4.25-4.25S14.35 4 12 4 7.75 5.9 7.75 8.25 9.65 12.5 12 12.5Z",
                                                            stroke: "currentColor",
                                                            strokeWidth: "1.8",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/EventDetails.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M4.75 20c.75-3.35 3.55-5.5 7.25-5.5s6.5 2.15 7.25 5.5",
                                                            stroke: "currentColor",
                                                            strokeWidth: "1.8",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/EventDetails.tsx",
                                                            lineNumber: 692,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/EventDetails.tsx",
                                                    lineNumber: 679,
                                                    columnNumber: 21
                                                }, this)
                                            }, participant.id, false, {
                                                fileName: "[project]/app/components/EventDetails.tsx",
                                                lineNumber: 674,
                                                columnNumber: 19
                                            }, this)),
                                        remainingParticipants > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative -ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-semibold text-slate-700 shadow-sm",
                                            children: [
                                                "+",
                                                remainingParticipants
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 704,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-3 text-sm text-slate-500",
                                            children: [
                                                participantsCount,
                                                " ",
                                                participantsCount === 1 ? t.inscription : t.inscriptionsPlural
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/EventDetails.tsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-slate-500",
                                    children: t.noParticipants
                                }, void 0, false, {
                                    fileName: "[project]/app/components/EventDetails.tsx",
                                    lineNumber: 717,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 670,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col gap-2 text-sm",
                        children: event.location_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: event.location_url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "inline-flex w-fit rounded-full border border-blue-300 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100",
                            children: t.viewLocation
                        }, void 0, false, {
                            fileName: "[project]/app/components/EventDetails.tsx",
                            lineNumber: 724,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 722,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 572,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/EventDetails.tsx",
        lineNumber: 425,
        columnNumber: 5
    }, this);
}
_s(EventDetails, "YVBPZGU98Bev+ABjYfC6H4DzBzk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = EventDetails;
function InfoTile({ icon, label, blue = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `my-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${blue ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-blue-600"}`,
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 750,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `leading-6 ${blue ? "font-semibold text-blue-700" : "my-auto text-slate-700"}`,
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 757,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/EventDetails.tsx",
        lineNumber: 749,
        columnNumber: 5
    }, this);
}
_c1 = InfoTile;
function PeopleCard({ title, people, icon, tone }) {
    const toneClasses = tone === "blue" ? {
        card: "border-blue-100 bg-linear-to-br from-blue-50 via-white to-slate-50",
        icon: "bg-blue-600 text-white",
        title: "text-blue-700",
        chip: "border-blue-100 text-blue-700",
        avatar: "bg-blue-600"
    } : {
        card: "border-violet-100 bg-linear-to-br from-violet-50 via-white to-slate-50",
        icon: "bg-violet-600 text-white",
        title: "text-violet-700",
        chip: "border-violet-100 text-violet-700",
        avatar: "bg-violet-600"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-2xl border p-3 ${toneClasses.card}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex h-8 w-8 items-center justify-center rounded-xl shadow-sm ${toneClasses.icon}`,
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 800,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-[11px] font-bold uppercase tracking-[0.16em] ${toneClasses.title}`,
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/app/components/EventDetails.tsx",
                            lineNumber: 807,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 806,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 799,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5",
                children: people.map((person, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `inline-flex max-w-full items-center gap-1.5 rounded-full border bg-white/90 px-2.5 py-1 text-xs font-semibold shadow-sm ${toneClasses.chip}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${toneClasses.avatar}`,
                                children: String(person.name || "?").trim().slice(0, 1).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 821,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: person.name
                            }, void 0, false, {
                                fileName: "[project]/app/components/EventDetails.tsx",
                                lineNumber: 829,
                                columnNumber: 13
                            }, this)
                        ]
                    }, person.id || person.name || index, true, {
                        fileName: "[project]/app/components/EventDetails.tsx",
                        lineNumber: 817,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/EventDetails.tsx",
                lineNumber: 815,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/EventDetails.tsx",
        lineNumber: 798,
        columnNumber: 5
    }, this);
}
_c2 = PeopleCard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "EventDetails");
__turbopack_context__.k.register(_c1, "InfoTile");
__turbopack_context__.k.register(_c2, "PeopleCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_440e3091._.js.map