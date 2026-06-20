(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/helpers/common.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDateLabel",
    ()=>formatDateLabel,
    "getInitials",
    ()=>getInitials,
    "normalizeEmail",
    ()=>normalizeEmail,
    "normalizePhone",
    ()=>normalizePhone
]);
const normalizeEmail = (value)=>String(value || "").trim().toLowerCase();
const normalizePhone = (value)=>String(value || "").replace(/[^\d+]/g, "");
const getInitials = (name)=>String(name || "U").trim().split(" ").map((n)=>n[0]).join("").slice(0, 2).toUpperCase();
function formatDateLabel(dateValue) {
    if (!dateValue) return "No date";
    const date = new Date(`${dateValue}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/helpers/attendance-report.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportToCSV",
    ()=>exportToCSV,
    "exportToPDF",
    ()=>exportToPDF,
    "formatDateLabel",
    ()=>formatDateLabel,
    "formatEventSchedule",
    ()=>formatEventSchedule,
    "getEventLocation",
    ()=>getEventLocation,
    "getLanguageKey",
    ()=>getLanguageKey,
    "getLocalizedEventName",
    ()=>getLocalizedEventName,
    "getOrCreateAttendanceSheet",
    ()=>getOrCreateAttendanceSheet,
    "handleDeleteAttendanceRecord",
    ()=>handleDeleteAttendanceRecord,
    "handleSaveAttendanceRecord",
    ()=>handleSaveAttendanceRecord,
    "handleUpdateDonations",
    ()=>handleUpdateDonations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
;
;
;
;
function formatDateLabel(dateValue) {
    if (!dateValue) return "No date";
    const date = new Date(`${dateValue}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
function formatEventSchedule(dateValue, timeValue) {
    const dateLabel = formatDateLabel(dateValue);
    if (!timeValue) return dateLabel;
    const [hours, minutes] = timeValue.split(":");
    const parsed = new Date();
    parsed.setHours(Number(hours || 0), Number(minutes || 0), 0, 0);
    const timeLabel = parsed.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
    return `${dateLabel} • ${timeLabel}`;
}
function getEventLocation(event) {
    if (!event) return "No location";
    return [
        event.street_address,
        event.city,
        event.country
    ].filter(Boolean).join(", ") || "No location";
}
const exportToCSV = ({ filteredRecords, eventMap })=>{
    const rows = filteredRecords.map((record)=>{
        const event = eventMap.get(record.eventId);
        return {
            Participant: record.name,
            Email: record.email,
            Phone: record.phone,
            Event: event?.name_en || record.eventId,
            Date: record.date,
            Time: record.time || "",
            Location: record.location
        };
    });
    const headers = [
        "Participant",
        "Email",
        "Phone",
        "Event",
        "Date",
        "Time",
        "Location"
    ];
    const csvContent = [
        headers.join(","),
        ...rows.map((row)=>headers.map((header)=>`"${String(row[header] ?? "").replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    const blob = new Blob([
        csvContent
    ], {
        type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance-records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
const exportToPDF = ({ filteredRecords, eventMap, selectedEventLabel })=>{
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
    const tableRows = filteredRecords.map((record)=>{
        const event = eventMap.get(record.eventId);
        return [
            record.name,
            record.email,
            event?.name_en || record.eventId,
            record.date,
            record.location
        ];
    });
    doc.setFontSize(18);
    doc.text("Attendance Records", 14, 18);
    doc.setFontSize(10);
    doc.text(`Event: ${selectedEventLabel}`, 14, 26);
    doc.text(`Participants: ${filteredRecords.length}`, 14, 32);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
        startY: 40,
        head: [
            [
                "Participant",
                "Email",
                "Event",
                "Date",
                "Location"
            ]
        ],
        body: tableRows,
        styles: {
            fontSize: 10,
            cellPadding: 3
        },
        headStyles: {
            fillColor: [
                13,
                77,
                176
            ]
        }
    });
    doc.save("attendance-records.pdf");
};
const getLanguageKey = (language)=>language === "es" ? "es" : "en";
const getLocalizedEventName = (event, lang)=>{
    if (!event) return "";
    return lang === "es" ? event.name_es || event.name_en || "" : event.name_en || event.name_es || "";
};
const getOrCreateAttendanceSheet = async ({ eventId, eventMap, attendanceSheets, setAttendanceSheets, lang, t })=>{
    const existing = attendanceSheets.find((sheet)=>sheet.event_id === eventId);
    if (existing) return existing.id;
    const event = eventMap.get(eventId);
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("attendance_sheets").insert({
        event_id: eventId,
        title: getLocalizedEventName(event, lang) ? `${getLocalizedEventName(event, lang)} ${t.attendanceSheetSuffix}` : t.attendanceSheetFallback,
        is_active: true
    }).select("id, event_id, title, notes, is_active").single();
    if (error) throw error;
    const created = data;
    setAttendanceSheets((prev)=>[
            created,
            ...prev
        ]);
    return created.id;
};
const handleSaveAttendanceRecord = async ({ attendanceForm, editingRecordId, getOrCreateAttendanceSheet, loadAttendanceData, closeModal, setSaving, t, eventMap, attendanceSheets, setAttendanceSheets, lang })=>{
    if (!attendanceForm.eventId.trim() || !attendanceForm.name.trim()) return;
    try {
        setSaving(true);
        const attendanceSheetId = await getOrCreateAttendanceSheet({
            eventId: attendanceForm.eventId,
            eventMap,
            attendanceSheets,
            setAttendanceSheets,
            lang,
            t
        });
        const payload = {
            attendance_sheet_id: attendanceSheetId,
            participant_name: attendanceForm.name.trim(),
            participant_email: attendanceForm.email.trim() || null,
            participant_phone: attendanceForm.phone.trim() || null,
            status: "attended",
            checked_in: attendanceForm.status === "attended",
            checked_in_at: attendanceForm.status === "attended" ? new Date().toISOString() : null,
            notes: attendanceForm.notes.trim() || null
        };
        if (editingRecordId) {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("attendance_sheet_entries").update(payload).eq("id", editingRecordId);
            if (error) throw error;
        } else {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("attendance_sheet_entries").insert(payload);
            if (error) throw error;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            icon: "success",
            title: t.saveSuccessTitle,
            text: t.saveSuccessText,
            timer: 2000
        });
        await loadAttendanceData();
        closeModal();
    } catch (error) {
        console.error("Failed to save attendance entry:", error);
    } finally{
        setSaving(false);
    }
};
const handleDeleteAttendanceRecord = async ({ id, loadAttendanceData, t })=>{
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
        title: t.deleteConfirmTitle,
        text: t.deleteConfirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: t.deleteConfirmButton
    });
    if (!result.isConfirmed) return;
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("attendance_sheet_entries").delete().eq("id", id);
        if (error) throw error;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            icon: "success",
            title: t.deleteSuccessTitle,
            text: t.deleteSuccessText,
            timer: 2000
        });
        await loadAttendanceData();
    } catch (error) {
        console.error("Failed to delete attendance entry:", error);
    }
};
const handleUpdateDonations = async ({ eventId, eventMap, setEvents })=>{
    const event = eventMap.get(eventId);
    if (!event) return;
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
        title: "Update Donation Statistics",
        html: `
        <div style="display:flex;flex-direction:column;gap:12px;text-align:left;">
          <div>
            <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px;">
              Total Donations (USD)
            </label>
            <input
              id="swal-total-donations"
              type="number"
              min="0"
              step="0.01"
              class="swal2-input"
              value="${event.total_donations_usd ?? 0}"
              style="margin:0;width:100%;"
            />
          </div>
  
          <div>
            <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px;">
              Total Members Donated
            </label>
            <input
              id="swal-total-members"
              type="number"
              min="0"
              step="1"
              class="swal2-input"
              value="${event.total_members_donated ?? 0}"
              style="margin:0;width:100%;"
            />
          </div>
        </div>
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        preConfirm: ()=>{
            const totalDonations = parseFloat(document.getElementById("swal-total-donations")?.value || "0");
            const totalMembers = parseInt(document.getElementById("swal-total-members")?.value || "0", 10);
            if (isNaN(totalDonations) || totalDonations < 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showValidationMessage("Please enter a valid donation amount.");
                return;
            }
            if (isNaN(totalMembers) || totalMembers < 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showValidationMessage("Please enter a valid member count.");
                return;
            }
            return {
                totalDonations,
                totalMembers
            };
        }
    });
    if (!result.isConfirmed) return;
    const { totalDonations, totalMembers } = result.value;
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").update({
            total_donations_usd: totalDonations,
            total_members_donated: totalMembers
        }).eq("id", eventId);
        if (error) throw error;
        setEvents((prev)=>prev.map((e)=>e.id === eventId ? {
                    ...e,
                    total_donations_usd: totalDonations,
                    total_members_donated: totalMembers
                } : e));
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            icon: "success",
            title: "Updated",
            text: "Donation statistics updated successfully.",
            timer: 1500,
            showConfirmButton: false
        });
    } catch (error) {
        console.error("Failed to update donation statistics:", error);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            icon: "error",
            title: "Update Failed",
            text: "Unable to update donation statistics."
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/LanguageSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function LanguageSelector() {
    _s();
    const { language, setLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const flags = {
        en: {
            src: "/flags/usa.png",
            label: "English",
            short: "EN"
        },
        es: {
            src: "/flags/puerto-rico.png",
            label: "Español",
            short: "ES"
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageSelector.useEffect": ()=>{
            const handleClickOutside = {
                "LanguageSelector.useEffect.handleClickOutside": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) {
                        setOpen(false);
                    }
                }
            }["LanguageSelector.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "LanguageSelector.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["LanguageSelector.useEffect"];
        }
    }["LanguageSelector.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                type: "button",
                onClick: ()=>setOpen((prev)=>!prev),
                whileHover: {
                    scale: 1.03
                },
                whileTap: {
                    scale: 0.98
                },
                className: "flex cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/15",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: flags[language].src,
                            alt: flags[language].label,
                            width: 24,
                            height: 24,
                            className: "rounded-sm object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/components/LanguageSelector.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/LanguageSelector.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden text-left sm:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-[10px] uppercase tracking-[0.16em] text-white/70",
                                children: language === "en" ? "Language" : "Idioma"
                            }, void 0, false, {
                                fileName: "[project]/app/components/LanguageSelector.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-sm font-semibold leading-tight",
                                children: flags[language].label
                            }, void 0, false, {
                                fileName: "[project]/app/components/LanguageSelector.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/LanguageSelector.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiChevronDown"], {
                        className: `text-sm transition-transform duration-300 ${open ? "rotate-180" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/LanguageSelector.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/LanguageSelector.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 10,
                        scale: 0.98
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: 10,
                        scale: 0.98
                    },
                    transition: {
                        duration: 0.18
                    },
                    className: "fixed left-1/2 md:left-28 top-21.5 z-9999 w-[calc(100vw-2rem)] max-w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md xl:absolute xl:left-auto xl:right-0 xl:top-full xl:mt-3 xl:w-52 xl:translate-x-0",
                    children: Object.entries(flags)?.map(([key, value])=>{
                        const isActive = language === key;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setLanguage(key);
                                setOpen(false);
                            },
                            className: `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer ${isActive ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md" : "text-slate-800 hover:bg-slate-100"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border shadow-sm ${isActive ? "border-white/20 bg-white/10" : "border-slate-200 bg-white"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: value.src,
                                        alt: value.label,
                                        width: 22,
                                        height: 22,
                                        className: "rounded-sm object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/LanguageSelector.tsx",
                                        lineNumber: 97,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/LanguageSelector.tsx",
                                    lineNumber: 90,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block font-medium",
                                            children: value.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/LanguageSelector.tsx",
                                            lineNumber: 107,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `block text-[10px] uppercase tracking-[0.14em] ${isActive ? "text-white/75" : "text-slate-400"}`,
                                            children: value.short
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/LanguageSelector.tsx",
                                            lineNumber: 108,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/LanguageSelector.tsx",
                                    lineNumber: 106,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/app/components/LanguageSelector.tsx",
                            lineNumber: 77,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/components/LanguageSelector.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/LanguageSelector.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/LanguageSelector.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(LanguageSelector, "oMmHE8LFxWH25g9RYQuGWJYO9Z8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = LanguageSelector;
var _c;
__turbopack_context__.k.register(_c, "LanguageSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/NavBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi2$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi2/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bs/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ri/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LanguageSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/LanguageSelector.tsx [app-client] (ecmascript)");
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
;
;
;
;
function Navbar() {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isSignedIn, setIsSignedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userType, setUserType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("member");
    const [displayName, setDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Guest");
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileNavOpen, setMobileNavOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [authenticatedProfile, setAuthenticatedProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const handleClickOutside = {
                "Navbar.useEffect.handleClickOutside": (e)=>{
                    const target = e.target;
                    if (menuRef.current && !menuRef.current.contains(target)) {
                        setMenuOpen(false);
                    }
                }
            }["Navbar.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "Navbar.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            let mounted = true;
            const loadUserState = {
                "Navbar.useEffect.loadUserState": async ()=>{
                    try {
                        setAuthLoading(true);
                        const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                        if (!mounted) return;
                        if (!session?.user) {
                            setIsSignedIn(false);
                            setDisplayName("Guest");
                            setUserType("member");
                            return;
                        }
                        setIsSignedIn(true);
                        const fallbackName = session.user.email?.split("@")[0] || "User";
                        const { data: profile, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("first_name, last_name, role, is_approved, account_status, language_preference").eq("id", session.user.id).maybeSingle();
                        if (error || !profile) {
                            setDisplayName(fallbackName);
                            setUserType("member");
                            setAuthenticatedProfile(null);
                            return;
                        }
                        const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || fallbackName;
                        const normalizedRole = (profile.role || "member").toLowerCase();
                        const resolvedType = normalizedRole === "admin" || normalizedRole === "super_admin" ? "admin" : "member";
                        setDisplayName(fullName);
                        setUserType(resolvedType);
                        setAuthenticatedProfile(profile);
                    } catch (error) {
                        console.error("Navbar auth load error:", error);
                        setIsSignedIn(false);
                        setDisplayName("Guest");
                        setUserType("member");
                    } finally{
                        if (mounted) setAuthLoading(false);
                    }
                }
            }["Navbar.useEffect.loadUserState"];
            loadUserState();
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "Navbar.useEffect": ()=>{
                    loadUserState();
                }
            }["Navbar.useEffect"]);
            return ({
                "Navbar.useEffect": ()=>{
                    mounted = false;
                    subscription.unsubscribe();
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            setMenuOpen(false);
            setMobileNavOpen(false);
        }
    }["Navbar.useEffect"], [
        pathname
    ]);
    const handleLogout = async ()=>{
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            title: "Log out?",
            text: "You’ll be signed out of your Paso Libre account.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Stay signed in",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            reverseButtons: true
        });
        if (!result.isConfirmed) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
            setIsSignedIn(false);
            setDisplayName("Guest");
            setUserType("member");
            setMenuOpen(false);
            setMobileNavOpen(false);
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                icon: "success",
                title: "Logged out",
                text: "You have been signed out successfully.",
                timer: 1400,
                showConfirmButton: false
            });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                icon: "error",
                title: "Logout failed",
                text: "Something went wrong while signing you out.",
                confirmButtonColor: "#0d4db0"
            });
        }
    };
    const navItems = [
        {
            label: t?.navigation?.about || "about",
            path: "about"
        },
        {
            label: t?.navigation?.initiatives || "initiatives",
            path: "initiatives"
        },
        {
            label: t?.navigation?.contact || "contact",
            path: "contact"
        }
    ];
    const currentPath = pathname.split("/")[1];
    const authLabel = authLoading ? "Loading..." : isSignedIn ? t?.navigation?.loggedIn || "Logged In" : t?.navigation?.signIn || "Log In";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].nav, {
        initial: {
            y: -80,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        transition: {
            duration: 0.8
        },
        className: "fixed inset-x-0 top-0 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto mt-3 w-[calc(100%-16px)] max-w-7xl rounded-3xl border border-white/10 bg-[#0d4db0]/85 px-2 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:w-[calc(100%-24px)] sm:rounded-[28px] sm:px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2 px-2 py-2.5 sm:gap-4 sm:px-3 md:px-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 items-center gap-3 xl:gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>router.push("/"),
                                    className: "flex h-12 shrink-0 items-center rounded-2xl border border-white/10 bg-white/10 px-2.5 shadow-sm backdrop-blur-sm transition hover:bg-white/15 sm:h-14.5 sm:px-3 xl:h-15.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo-title-2.png",
                                        alt: "Logo",
                                        width: 210,
                                        height: 60,
                                        priority: true,
                                        className: "h-auto w-30 cursor-pointer object-contain transition sm:w-38.75 md:w-42.5 xl:w-46.25"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "relative hidden items-center justify-start gap-8 text-center text-[15px] font-light tracking-wide text-white xl:flex",
                                    children: navItems?.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/${item.path}`,
                                                className: `group relative inline-flex items-center py-2 lowercase transition ${item.path === currentPath ? "font-semibold underline decoration-sky-300 underline-offset-4" : ""}`,
                                                children: [
                                                    item.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute left-0 -bottom-1 h-px w-0 bg-linear-to-r from-sky-400 to-indigo-400 transition-all duration-300 group-hover:w-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/NavBar.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/NavBar.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, this)
                                        }, item.label, false, {
                                            fileName: "[project]/app/components/NavBar.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/NavBar.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex shrink-0 items-center justify-end gap-1.5 sm:gap-2.5",
                            ref: menuRef,
                            children: [
                                !authenticatedProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden xl:block",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LanguageSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setMenuOpen((prev)=>!prev),
                                            disabled: authLoading,
                                            className: "flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-2 py-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-70 sm:gap-3 sm:px-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 sm:h-10 sm:w-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiUser"], {
                                                        className: "text-lg sm:text-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/NavBar.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden text-left xl:block",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-[10px] uppercase tracking-[0.16em] text-white/70",
                                                            children: language === "en" ? "Account" : "Cuenta"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-sm font-semibold leading-tight",
                                                            children: authLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/NavBar.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 10,
                                                    scale: 0.98
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: 10,
                                                    scale: 0.98
                                                },
                                                transition: {
                                                    duration: 0.18
                                                },
                                                className: "fixed right-3 top-21.5 w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl sm:absolute sm:right-0 sm:top-full sm:mt-3 sm:w-[min(20rem,calc(100vw-1.5rem))]",
                                                children: isSignedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-blue-50 px-4 py-3 text-xs text-gray-500",
                                                            children: [
                                                                t?.navigation?.signedInAs || "Signed in as",
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-700",
                                                                    children: displayName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 301,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${userType === "admin" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`,
                                                                        children: userType.toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/NavBar.tsx",
                                                                        lineNumber: 305,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-t border-gray-100"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/profile",
                                                            className: "flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100",
                                                            onClick: ()=>setMenuOpen(false),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiUser"], {
                                                                    className: "text-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 27
                                                                }, this),
                                                                t?.navigation?.profile || "Profile"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 25
                                                        }, this),
                                                        userType === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/admin-dashboard",
                                                            className: "flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100",
                                                            onClick: ()=>setMenuOpen(false),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiGrid"], {
                                                                    className: "text-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 334,
                                                                    columnNumber: 29
                                                                }, this),
                                                                t?.navigation?.dashboard || "Dashboard"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/events",
                                                            className: "flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100",
                                                            onClick: ()=>setMenuOpen(false),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BsCalendarWeek"], {
                                                                    className: "text-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 27
                                                                }, this),
                                                                t?.navigation?.calendar || "Calendar"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-t border-gray-100"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleLogout,
                                                            className: "flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-red-600 transition-all hover:bg-gray-100",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiLogOut"], {}, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 354,
                                                                    columnNumber: 27
                                                                }, this),
                                                                t?.navigation?.logout || "Logout"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 border-t border-gray-100"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-4 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mb-2 text-[11px] text-gray-500",
                                                                    children: t?.navigation?.followUs || "Follow us"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 361,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between text-gray-500",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaInstagram"], {
                                                                            onClick: ()=>window.open("https://www.instagram.com/pasolibre.pr", "_blank"),
                                                                            className: "transition-all hover:text-pink-500 cursor-pointer"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                                            lineNumber: 365,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTiktok"], {
                                                                            onClick: ()=>window.open("https://www.tiktok.com/@pasolibre.pr", "_blank"),
                                                                            className: "transition-all hover:text-black cursor-pointer"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                                            lineNumber: 374,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                                            onClick: ()=>window.open("https://chat.whatsapp.com/HfEsdAkCobTIihCCAss7mN", "_blank"),
                                                                            className: "transition-all hover:text-green-500 cursor-pointer"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                                            lineNumber: 383,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                                    lineNumber: 364,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/login",
                                                    className: "flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-100",
                                                    onClick: ()=>setMenuOpen(false),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiShieldUserLine"], {
                                                            className: "h-8 w-8 rounded-lg border border-slate-300 bg-slate-100 p-1 text-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/NavBar.tsx",
                                                            lineNumber: 401,
                                                            columnNumber: 25
                                                        }, this),
                                                        t?.navigation?.signIn || "Sign In"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/NavBar.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavBar.tsx",
                                                lineNumber: 290,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavBar.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "rounded-xl p-2 text-white transition hover:bg-white/10 xl:hidden",
                                    onClick: ()=>setMobileNavOpen((prev)=>!prev),
                                    children: mobileNavOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiX"], {
                                        className: "cursor-pointer",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiMenu"], {
                                        className: "cursor-pointer",
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 418,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 410,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/NavBar.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/NavBar.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/NavBar.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mobileNavOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -14
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -14
                    },
                    transition: {
                        duration: 0.22
                    },
                    className: "mx-auto mt-2 w-[calc(100%-16px)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d4db0]/95 px-4 pb-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:w-[calc(100%-24px)] sm:rounded-[28px] xl:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex gap-3 border-b border-white/10 pb-4",
                            children: !authenticatedProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LanguageSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/components/NavBar.tsx",
                                lineNumber: 435,
                                columnNumber: 41
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/NavBar.tsx",
                            lineNumber: 434,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-4 flex flex-col space-y-3 pt-2 lowercase text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        onClick: ()=>setMobileNavOpen(false),
                                        className: "flex items-center gap-3 border-b border-white/10 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiHome"], {
                                                className: "text-sky-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavBar.tsx",
                                                lineNumber: 447,
                                                columnNumber: 19
                                            }, this),
                                            "home"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 442,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/about",
                                        onClick: ()=>setMobileNavOpen(false),
                                        className: "flex items-center gap-3 border-b border-white/10 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiInfo"], {
                                                className: "text-sky-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavBar.tsx",
                                                lineNumber: 458,
                                                columnNumber: 19
                                            }, this),
                                            t?.navigation?.about || "about"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 453,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 452,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/initiatives",
                                        onClick: ()=>setMobileNavOpen(false),
                                        className: "flex items-center gap-3 border-b border-white/10 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi2$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HiOutlineSparkles"], {
                                                className: "text-sky-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavBar.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this),
                                            t?.navigation?.initiatives || "initiatives"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 464,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact",
                                        onClick: ()=>setMobileNavOpen(false),
                                        className: "flex items-center gap-3 border-b border-white/10 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiMail"], {
                                                className: "text-sky-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/NavBar.tsx",
                                                lineNumber: 480,
                                                columnNumber: 19
                                            }, this),
                                            t?.navigation?.contact || "contact"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/NavBar.tsx",
                                        lineNumber: 475,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 474,
                                    columnNumber: 15
                                }, this),
                                !isSignedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    onClick: ()=>setMobileNavOpen(false),
                                    className: "flex items-center gap-3 border-b border-white/10 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiShieldUserLine"], {
                                            className: "text-sky-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/NavBar.tsx",
                                            lineNumber: 523,
                                            columnNumber: 19
                                        }, this),
                                        t?.navigation?.signIn || "Sign In"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/NavBar.tsx",
                                    lineNumber: 518,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/NavBar.tsx",
                            lineNumber: 440,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/NavBar.tsx",
                    lineNumber: 427,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/NavBar.tsx",
                lineNumber: 425,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/NavBar.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_s(Navbar, "7l7rl/5VDy8Ma4ETldZWaIeX3nE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/elements/AttendanceReport.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldInput",
    ()=>FieldInput,
    "FieldSelect",
    ()=>FieldSelect,
    "FieldTextarea",
    ()=>FieldTextarea,
    "ParticipantAvatar",
    ()=>ParticipantAvatar,
    "StatCard",
    ()=>StatCard,
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
function ParticipantAvatar({ name, profilePicture, initials, size = "desktop" }) {
    const sizeClass = size === "mobile" ? "h-12 w-12" : "h-10 w-10";
    const radiusClass = size === "mobile" ? "rounded-2xl" : "rounded-2xl";
    if (profilePicture) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${sizeClass} ${radiusClass} relative shrink-0 overflow-hidden border border-white bg-slate-100 shadow-sm ring-2 ring-blue-50`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: profilePicture,
                alt: `${name} profile picture`,
                fill: true,
                sizes: size === "mobile" ? "48px" : "40px",
                className: "object-cover"
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/elements/AttendanceReport.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${sizeClass} ${radiusClass} flex shrink-0 items-center justify-center bg-linear-to-br from-blue-600 to-indigo-700 text-xs font-semibold text-white shadow-sm`,
        children: initials
    }, void 0, false, {
        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = ParticipantAvatar;
function StatusBadge({ status, language = "en", attendanceReportCopy, getLanguageKey }) {
    const styles = {
        registered: "border-blue-100 bg-blue-50 text-blue-700",
        attended: "border-emerald-100 bg-emerald-50 text-emerald-700",
        no_show: "border-amber-100 bg-amber-50 text-amber-700",
        cancelled: "border-rose-100 bg-rose-50 text-rose-700"
    };
    const labels = attendanceReportCopy[getLanguageKey(language)].statuses;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${styles[status]}`,
        children: labels[status]
    }, void 0, false, {
        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c1 = StatusBadge;
function StatCard({ icon, title, value, subtitle }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-slate-500",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 truncate text-2xl font-semibold text-slate-900",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-slate-400",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700",
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/elements/AttendanceReport.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_c2 = StatCard;
function FieldInput({ label, value, onChange, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                placeholder: placeholder,
                onChange: (e)=>onChange(e.target.value),
                className: "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c3 = FieldInput;
function FieldTextarea({ label, value, onChange, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                rows: 4,
                value: value,
                placeholder: placeholder,
                onChange: (e)=>onChange(e.target.value),
                className: "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_c4 = FieldTextarea;
function FieldSelect({ label, value, onChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: option.value,
                        children: option.label
                    }, `${label}-${option.value}`, false, {
                        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/elements/AttendanceReport.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/elements/AttendanceReport.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c5 = FieldSelect;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ParticipantAvatar");
__turbopack_context__.k.register(_c1, "StatusBadge");
__turbopack_context__.k.register(_c2, "StatCard");
__turbopack_context__.k.register(_c3, "FieldInput");
__turbopack_context__.k.register(_c4, "FieldTextarea");
__turbopack_context__.k.register(_c5, "FieldSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/AddAttendanceRecordModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/elements/AttendanceReport.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLineIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as PenLineIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/helpers/attendance-report.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const translations = {
    en: {
        editAttendanceRecord: "Edit Attendance Record",
        addAttendanceRecord: "Add Attendance Record",
        modalSubtitle: "Select an existing user or add a custom participant manually.",
        addFromUsers: "Add from users",
        addFromUsersDescription: "Choose an approved user to auto-fill their name, email, and phone.",
        searchUsers: "Search users by name, email, or phone",
        loadingUsers: "Loading users...",
        noUsersFound: "No users found",
        noUsersFoundDescription: "You can still add a custom participant manually.",
        unnamedUser: "Unnamed user",
        customParticipant: "Custom participant",
        customParticipantDescription: "You can edit the fields below even after selecting a user. This keeps custom attendee support fully available.",
        selected: "Selected",
        event: "Event",
        selectEvent: "Select an event",
        participantName: "Participant Name",
        enterParticipantName: "Enter participant name",
        email: "Email",
        phone: "Phone",
        eventDetails: "Event Details",
        noDate: "No date",
        noLocation: "No location",
        previewEventDetails: "Select an event to preview its date and location",
        cancel: "Cancel",
        saving: "Saving...",
        saveChanges: "Save Changes",
        addRecord: "Add Record"
    },
    es: {
        editAttendanceRecord: "Editar Registro de Asistencia",
        addAttendanceRecord: "Agregar Registro de Asistencia",
        modalSubtitle: "Selecciona un usuario existente o agrega un participante personalizado manualmente.",
        addFromUsers: "Agregar desde usuarios",
        addFromUsersDescription: "Elige un usuario aprobado para completar automáticamente su nombre, correo electrónico y teléfono.",
        searchUsers: "Buscar usuarios por nombre, correo electrónico o teléfono",
        loadingUsers: "Cargando usuarios...",
        noUsersFound: "No se encontraron usuarios",
        noUsersFoundDescription: "Aún puedes agregar un participante personalizado manualmente.",
        unnamedUser: "Usuario sin nombre",
        customParticipant: "Participante personalizado",
        customParticipantDescription: "Puedes editar los campos de abajo incluso después de seleccionar un usuario. Esto mantiene disponible el soporte para asistentes personalizados.",
        selected: "Seleccionado",
        event: "Evento",
        selectEvent: "Selecciona un evento",
        participantName: "Nombre del Participante",
        enterParticipantName: "Ingresa el nombre del participante",
        email: "Correo Electrónico",
        phone: "Teléfono",
        eventDetails: "Detalles del Evento",
        noDate: "Sin fecha",
        noLocation: "Sin ubicación",
        previewEventDetails: "Selecciona un evento para ver su fecha y ubicación",
        cancel: "Cancelar",
        saving: "Guardando...",
        saveChanges: "Guardar Cambios",
        addRecord: "Agregar Registro"
    }
};
const AddAttendanceRecordModal = ({ events, selectedEventDetails, attendanceForm, handleAttendanceFormChange, handleSaveAttendanceRecord, saving, editingRecordId, closeModal, eventMap, attendanceSheets, setAttendanceSheets, lang, loadAttendanceData, setSaving })=>{
    _s();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const t = translations[language === "es" ? "es" : "en"];
    const [profiles, setProfiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [profilesLoading, setProfilesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profileSearch, setProfileSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedProfileId, setSelectedProfileId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddAttendanceRecordModal.useEffect": ()=>{
            const loadProfiles = {
                "AddAttendanceRecordModal.useEffect.loadProfiles": async ()=>{
                    try {
                        setProfilesLoading(true);
                        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("id, first_name, last_name, email, phone, race, nationality, is_approved, account_status, language_preference").eq("is_approved", true).neq("account_status", "suspended").order("first_name", {
                            ascending: true
                        });
                        if (error) throw error;
                        setProfiles(data || []);
                    } catch (error) {
                        console.error("Failed to load profiles for attendance modal:", error);
                        setProfiles([]);
                    } finally{
                        setProfilesLoading(false);
                    }
                }
            }["AddAttendanceRecordModal.useEffect.loadProfiles"];
            loadProfiles();
        }
    }["AddAttendanceRecordModal.useEffect"], []);
    function formatDateLabel(dateValue) {
        if (!dateValue) return t.noDate;
        const date = new Date(`${dateValue}T00:00:00`);
        return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }
    function formatEventSchedule(dateValue, timeValue) {
        const dateLabel = formatDateLabel(dateValue);
        if (!timeValue) return dateLabel;
        const [hours, minutes] = timeValue.split(":");
        const parsed = new Date();
        parsed.setHours(Number(hours || 0), Number(minutes || 0), 0, 0);
        const timeLabel = parsed.toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
            hour: "numeric",
            minute: "2-digit"
        });
        return `${dateLabel} • ${timeLabel}`;
    }
    function getEventLocation(event) {
        if (!event) return t.noLocation;
        return [
            event.street_address,
            event.city,
            event.country
        ].filter(Boolean).join(", ") || t.noLocation;
    }
    const getProfileName = (profile)=>{
        return `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || profile.email || t.unnamedUser;
    };
    const filteredProfiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AddAttendanceRecordModal.useMemo[filteredProfiles]": ()=>{
            const query = profileSearch.trim().toLowerCase();
            return profiles.filter({
                "AddAttendanceRecordModal.useMemo[filteredProfiles]": (profile)=>{
                    const haystack = [
                        profile.first_name,
                        profile.last_name,
                        profile.email,
                        profile.phone
                    ].filter(Boolean).join(" ").toLowerCase();
                    return !query || haystack.includes(query);
                }
            }["AddAttendanceRecordModal.useMemo[filteredProfiles]"]);
        }
    }["AddAttendanceRecordModal.useMemo[filteredProfiles]"], [
        profiles,
        profileSearch
    ]);
    const handleSelectProfile = (profile)=>{
        const fullName = getProfileName(profile);
        setSelectedProfileId(profile.id);
        handleAttendanceFormChange("name", fullName);
        handleAttendanceFormChange("email", profile.email || "");
        handleAttendanceFormChange("phone", profile.phone || "");
    };
    const selectedProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AddAttendanceRecordModal.useMemo[selectedProfile]": ()=>profiles.find({
                "AddAttendanceRecordModal.useMemo[selectedProfile]": (profile)=>profile.id === selectedProfileId
            }["AddAttendanceRecordModal.useMemo[selectedProfile]"]) || null
    }["AddAttendanceRecordModal.useMemo[selectedProfile]"], [
        profiles,
        selectedProfileId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-80 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 px-2 text-blue-700",
                                    children: editingRecordId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLineIcon$3e$__["PenLineIcon"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                        lineNumber: 275,
                                        columnNumber: 34
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                        lineNumber: 275,
                                        columnNumber: 62
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-base font-semibold leading-5 text-slate-800 md:text-lg",
                                            children: editingRecordId ? t.editAttendanceRecord : t.addAttendanceRecord
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs leaing-4 text-slate-500 md:text-sm",
                                            children: t.modalSubtitle
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 283,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeModal,
                            className: "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-slate-600 transition hover:bg-slate-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                lineNumber: 293,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                    lineNumber: 272,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid min-h-0 grid-cols-1 overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `border-b border-slate-100 bg-slate-50/60 p-6 lg:border-b-0 lg:border-r ${editingRecordId ? "hidden lg:block" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 flex items-start justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-slate-800",
                                                    children: t.addFromUsers
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs leading-5 text-slate-500",
                                                    children: t.addFromUsersDescription
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 303,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 16,
                                            className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: profileSearch,
                                            onChange: (e)=>setProfileSearch(e.target.value),
                                            placeholder: t.searchUsers,
                                            className: "w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 323,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-h-107.5 space-y-2 overflow-y-auto pr-1",
                                    children: profilesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500",
                                        children: t.loadingUsers
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                        lineNumber: 333,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : filteredProfiles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-dashed border-slate-200 bg-white/70 p-5 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                className: "mx-auto mb-2 text-slate-300",
                                                size: 22
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                lineNumber: 338,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-slate-500",
                                                children: t.noUsersFound
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                lineNumber: 339,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-400",
                                                children: t.noUsersFoundDescription
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                        lineNumber: 337,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : filteredProfiles.map((profile)=>{
                                        const name = getProfileName(profile);
                                        const isSelected = selectedProfileId === profile.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleSelectProfile(profile),
                                            className: `group w-full cursor-pointer rounded-2xl border p-3 text-left transition hover:-translate-y-px hover:shadow-md ${isSelected ? "border-blue-200 bg-blue-50 shadow-sm" : "border-slate-200 bg-white hover:border-blue-100"}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700"}`,
                                                        children: name.charAt(0).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "truncate text-sm font-semibold text-slate-800",
                                                                        children: name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                        lineNumber: 375,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        size: 17,
                                                                        className: "shrink-0 text-blue-700"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                        lineNumber: 379,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                lineNumber: 374,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            profile.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                        lineNumber: 388,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    profile.email
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            profile.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                        lineNumber: 395,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    profile.phone
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                lineNumber: 362,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, profile.id, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 352,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-blue-100 bg-blue-50/70 p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "my-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-slate-800",
                                                            children: t.customParticipant
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-xs leading-5 text-slate-500 hidden md:block",
                                                            children: t.customParticipantDescription
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        selectedProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700",
                                                            children: [
                                                                t.selected,
                                                                ": ",
                                                                getProfileName(selectedProfile)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                        lineNumber: 410,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "my-6 flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldSelect"], {
                                                label: t.event,
                                                value: attendanceForm.eventId,
                                                onChange: (value)=>handleAttendanceFormChange("eventId", value),
                                                options: [
                                                    {
                                                        value: "",
                                                        label: t.selectEvent
                                                    },
                                                    ...events.map((event)=>({
                                                            value: event.id,
                                                            label: event.name_en
                                                        }))
                                                ]
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 433,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldInput"], {
                                            label: t.participantName,
                                            value: attendanceForm.name,
                                            onChange: (value)=>{
                                                setSelectedProfileId(null);
                                                handleAttendanceFormChange("name", value);
                                            },
                                            placeholder: t.enterParticipantName
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 450,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldInput"], {
                                            label: t.email,
                                            value: attendanceForm.email,
                                            onChange: (value)=>{
                                                setSelectedProfileId(null);
                                                handleAttendanceFormChange("email", value);
                                            },
                                            placeholder: "participant@email.com"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldInput"], {
                                            label: t.phone,
                                            value: attendanceForm.phone,
                                            onChange: (value)=>{
                                                setSelectedProfileId(null);
                                                handleAttendanceFormChange("phone", value);
                                            },
                                            placeholder: "(000) 000-0000"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 470,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                                            children: t.eventDetails
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 482,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        selectedEventDetails ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 space-y-2 text-sm text-slate-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                                            size: 15,
                                                            className: "text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        formatEventSchedule(selectedEventDetails.date, selectedEventDetails.time)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                    lineNumber: 488,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            size: 15,
                                                            className: "text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        getEventLocation(selectedEventDetails)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 487,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-sm text-slate-400",
                                            children: t.previewEventDetails
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                            lineNumber: 501,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                    lineNumber: 297,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeModal,
                            className: "rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50",
                            children: t.cancel
                        }, void 0, false, {
                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                            lineNumber: 510,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSaveAttendanceRecord({
                                    attendanceForm,
                                    editingRecordId,
                                    getOrCreateAttendanceSheet: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOrCreateAttendanceSheet"],
                                    loadAttendanceData,
                                    closeModal,
                                    setSaving,
                                    t,
                                    eventMap,
                                    attendanceSheets,
                                    setAttendanceSheets,
                                    lang
                                }),
                            disabled: saving,
                            className: "inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg    transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                                    lineNumber: 537,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                saving ? t.saving : editingRecordId ? t.saveChanges : t.addRecord
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                            lineNumber: 517,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
            lineNumber: 271,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/AddAttendanceRecordModal.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AddAttendanceRecordModal, "Yd3lsMT71SKvGVrTeRYNMwFglmg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = AddAttendanceRecordModal;
const __TURBOPACK__default__export__ = AddAttendanceRecordModal;
var _c;
__turbopack_context__.k.register(_c, "AddAttendanceRecordModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/AttendanceReportTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil-line.js [app-client] (ecmascript) <export default as PencilLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/elements/AttendanceReport.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const translations = {
    en: {
        loadingAttendanceData: "Loading attendance data...",
        noAttendanceRecordsFound: "No attendance records found",
        adjustFilters: "Adjust your filters or add a new attendance record.",
        event: "Event",
        unknownEvent: "Unknown Event",
        date: "Date",
        location: "Location",
        participant: "Participant",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        showing: "Showing",
        of: "of",
        records: "records",
        prev: "Prev",
        next: "Next",
        showAll: "Show all",
        hideAll: "Hide all"
    },
    es: {
        loadingAttendanceData: "Cargando datos de asistencia...",
        noAttendanceRecordsFound: "No se encontraron registros de asistencia",
        adjustFilters: "Ajusta tus filtros o añade un nuevo registro de asistencia.",
        event: "Evento",
        unknownEvent: "Evento desconocido",
        date: "Fecha",
        location: "Ubicación",
        participant: "Participante",
        actions: "Acciones",
        edit: "Editar",
        delete: "Eliminar",
        showing: "Mostrando",
        of: "de",
        records: "registros",
        prev: "Anterior",
        next: "Siguiente",
        showAll: "Mostrar todo",
        hideAll: "Ocultar todo"
    }
};
const AttendanceReportTable = ({ dataLoading, filteredRecords, paginatedRecords, eventMap, currentPage, setCurrentPage, totalPages, pageStart, pageEnd, openEditModal, formatEventSchedule, getInitials, handleDeleteAttendanceRecord, loadAttendanceData })=>{
    _s();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const t = translations[language === "es" ? "es" : "en"];
    const recordsScopeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AttendanceReportTable.useMemo[recordsScopeKey]": ()=>`${currentPage}:${paginatedRecords?.map({
                "AttendanceReportTable.useMemo[recordsScopeKey]": (record)=>String(record.id)
            }["AttendanceReportTable.useMemo[recordsScopeKey]"]).join("|")}`
    }["AttendanceReportTable.useMemo[recordsScopeKey]"], [
        currentPage,
        paginatedRecords
    ]);
    const [expandedState, setExpandedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        scopeKey: "",
        records: {}
    });
    const expandedRecords = expandedState.scopeKey === recordsScopeKey ? expandedState.records : {};
    const toggleRecordDetails = (recordId)=>{
        setExpandedState((prev)=>{
            const currentRecords = prev.scopeKey === recordsScopeKey ? prev.records : {};
            return {
                scopeKey: recordsScopeKey,
                records: {
                    ...currentRecords,
                    [recordId]: !currentRecords[recordId]
                }
            };
        });
    };
    const showAllMobileDetails = ()=>{
        const nextState = {};
        paginatedRecords?.forEach((record)=>{
            nextState[String(record.id)] = true;
        });
        setExpandedState({
            scopeKey: recordsScopeKey,
            records: nextState
        });
    };
    const hideAllMobileDetails = ()=>{
        setExpandedState({
            scopeKey: recordsScopeKey,
            records: {}
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/92 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        children: dataLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-16 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-medium text-slate-500",
                children: t.loadingAttendanceData
            }, void 0, false, {
                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                lineNumber: 155,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/components/AttendanceReportTable.tsx",
            lineNumber: 154,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : filteredRecords.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-16 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                        size: 22
                    }, void 0, false, {
                        fileName: "[project]/app/components/AttendanceReportTable.tsx",
                        lineNumber: 162,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-medium text-slate-500",
                    children: t.noAttendanceRecordsFound
                }, void 0, false, {
                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-slate-400",
                    children: t.adjustFilters
                }, void 0, false, {
                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/AttendanceReportTable.tsx",
            lineNumber: 160,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "block lg:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: showAllMobileDetails,
                                    className: "rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm transition active:scale-95",
                                    children: t.showAll
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: hideAllMobileDetails,
                                    className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition active:scale-95",
                                    children: t.hideAll
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "divide-y divide-slate-100",
                            children: paginatedRecords?.map((record)=>{
                                const event = eventMap.get(record.eventId);
                                const initials = getInitials(record.name);
                                const isExpanded = !!expandedRecords[String(record.id)];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 p-4 sm:p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParticipantAvatar"], {
                                                    name: record.name,
                                                    profilePicture: record.profilePicture,
                                                    initials: initials,
                                                    size: "mobile"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "truncate font-semibold text-slate-900",
                                                                    children: record.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 209,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>toggleRecordDetails(String(record.id)),
                                                                    className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                        size: 17,
                                                                        className: `transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                        lineNumber: 219,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 213,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 space-y-1 text-xs text-slate-400",
                                                            children: [
                                                                record.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "flex items-center gap-1 truncate",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                            lineNumber: 231,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        record.email
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 230,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                record.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "flex items-center gap-1 truncate",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                            lineNumber: 238,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        record.phone
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 237,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 199,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-2xl border border-slate-100 bg-slate-50/80 p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                                                                    children: t.event
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 250,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-sm font-semibold text-slate-800",
                                                                    children: language === "es" ? event?.name_es || event?.name_en || t.unknownEvent : event?.name_en || event?.name_es || t.unknownEvent
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 253,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-0.5 text-xs text-slate-400",
                                                                    children: formatEventSchedule(event?.date || null, event?.time || null)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 262,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-2xl border border-slate-100 bg-slate-50/80 p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                                                                    children: t.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 271,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-sm font-semibold text-slate-800",
                                                                    children: record.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 274,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                record.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-2xl border border-slate-100 bg-white p-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400",
                                                            children: t.location
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 289,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-sm text-slate-600",
                                                            children: record.location
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2 pt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>openEditModal(record),
                                                    className: "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border    border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 shadow-sm transition hover:bg-emerald-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__["PencilLine"], {
                                                            size: 15
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        t.edit
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDeleteAttendanceRecord({
                                                            id: record.id,
                                                            loadAttendanceData,
                                                            t
                                                        }),
                                                    className: "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 shadow-sm transition hover:bg-red-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            size: 15
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        t.delete
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 300,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, `${record.id}-mobile`, true, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 195,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                    lineNumber: 171,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden overflow-x-auto lg:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-225 w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "border-b border-slate-200 bg-slate-50/90",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",
                                            children: t.participant
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 335,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",
                                            children: t.event
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 338,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",
                                            children: t.date
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 341,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",
                                            children: t.actions
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 344,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 334,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                lineNumber: 333,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-slate-100",
                                children: paginatedRecords?.map((record)=>{
                                    const event = eventMap?.get(record.eventId);
                                    const initials = getInitials(record.name);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "transition-colors hover:bg-blue-50/40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex max-w-60 items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParticipantAvatar"], {
                                                            name: record.name,
                                                            profilePicture: record.profilePicture,
                                                            initials: initials
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-slate-900",
                                                                    children: record.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                (record.email || record.phone) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 flex flex-wrap gap-2 text-xs text-slate-400",
                                                                    children: [
                                                                        record.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "mb-0 flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                                    size: 12
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                                    lineNumber: 377,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                record.email
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                            lineNumber: 376,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        record.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "mb-0 flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                                    size: 12
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                                    lineNumber: 383,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                record.phone
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                            lineNumber: 382,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 374,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                lineNumber: 360,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-slate-900",
                                                        children: language === "es" ? event?.name_es || event?.name_en || t.unknownEvent : event?.name_en || event?.name_es || t.unknownEvent
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-xs text-slate-400",
                                                        children: formatEventSchedule(event?.date || null, event?.time || null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                lineNumber: 393,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-5 font-medium text-slate-700",
                                                children: record.date
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                lineNumber: 409,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-end gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>openEditModal(record),
                                                            className: "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2    text-emerald-700 shadow-sm transition hover:bg-emerald-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__["PencilLine"], {
                                                                    size: 15
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 420,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                t.edit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteAttendanceRecord({
                                                                    id: record.id,
                                                                    loadAttendanceData,
                                                                    t
                                                                }),
                                                            className: "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-600 shadow-sm transition hover:bg-red-100",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 15
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                                    lineNumber: 434,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                t.delete
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                            lineNumber: 424,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                                lineNumber: 413,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, record.id, true, {
                                        fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                        lineNumber: 356,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                lineNumber: 350,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AttendanceReportTable.tsx",
                        lineNumber: 332,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                    lineNumber: 331,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex mx-auto justify-center flex-col gap-4 border-t border-slate-200 bg-slate-50/80 px-4 py-5 sm:px-6    lg:flex-row lg:items-center lg:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-slate-500 text-center md:text-left",
                            children: [
                                t.showing,
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-slate-800",
                                    children: [
                                        pageStart,
                                        "-",
                                        pageEnd
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                t.of,
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-slate-800",
                                    children: filteredRecords.length
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 457,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                t.records
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                            lineNumber: 451,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center w-full flex-wrap items-center gap-2 lg:w-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentPage(Math.max(currentPage - 1, 1)),
                                    disabled: currentPage === 1,
                                    className: "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm    font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 470,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        t.prev
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 464,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex max-w-full items-center gap-2 overflow-x-auto",
                                    children: Array.from({
                                        length: totalPages
                                    }, (_, i)=>i + 1).slice(Math.max(0, currentPage - 3), Math.max(0, currentPage - 3) + 5).map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage(page),
                                            className: `h-10 min-w-10 rounded-xl px-3 text-xs sm:text-sm  font-semibold transition ${currentPage === page ? "bg-linear-to-r from-[#0d4db0] to-indigo-700 text-white shadow-md" : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"}`,
                                            children: page
                                        }, page, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 481,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 474,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentPage(Math.min(currentPage + 1, totalPages)),
                                    disabled: currentPage === totalPages,
                                    className: "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm    font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                                    children: [
                                        t.next,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                            lineNumber: 504,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AttendanceReportTable.tsx",
                            lineNumber: 463,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AttendanceReportTable.tsx",
                    lineNumber: 447,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/app/components/AttendanceReportTable.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AttendanceReportTable, "tKHyIVt4aCMQueXQri14EBj1uNQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = AttendanceReportTable;
const __TURBOPACK__default__export__ = AttendanceReportTable;
var _c;
__turbopack_context__.k.register(_c, "AttendanceReportTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/attendance-report/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAttendancePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sheet.js [app-client] (ecmascript) <export default as Sheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-bar.js [app-client] (ecmascript) <export default as ChartBar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/lu/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/supabase/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/helpers/common.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/helpers/attendance-report.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/NavBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddAttendanceRecordModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AddAttendanceRecordModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AttendanceReportTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AttendanceReportTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/elements/AttendanceReport.tsx [app-client] (ecmascript)");
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
;
;
;
const emptyForm = {
    eventId: "",
    name: "",
    email: "",
    phone: "",
    status: "attended",
    notes: ""
};
const attendanceReportCopy = {
    en: {
        loadingTitle: "Loading attendance records",
        loadingDescription: "Verifying administrator access...",
        accessRestrictedTitle: "Access restricted",
        accessRestrictedDescription: "This page is only available to approved administrators.",
        returnHome: "Return Home",
        consoleBadge: "Attendance Console",
        pageTitle: "Attendance Records",
        pageDescription: "Review participation by event using your real attendance sheets and entries.",
        participants: "Participants",
        participantsSubtitle: "Matching current filters",
        selectedEvent: "Selected Event",
        selectedEventSubtitle: "Current attendance scope",
        eventDates: "Event Dates",
        eventDatesSubtitle: "Available dated sessions",
        allEvents: "All Events",
        allDates: "All Dates",
        selectedEventFallback: "Selected Event",
        exportCsv: "Export CSV",
        exportPdf: "Export PDF",
        analytics: "Analytics",
        addRecord: "Add Record",
        searchPlaceholder: "Search by participant...",
        recordsHelper: "Manage how many records appear per page and export the current filtered results.",
        rowsPerPage: "Rows per page",
        donationSummary: "Donation Summary",
        totalDonations: "Total Donations",
        donationsDescription: "Update the total donations for an event to keep your records accurate.",
        totalCollected: "Total collected for this event",
        selectAnEvent: "Select an event to view and update its total donations.",
        updateAmountButton: "Update Amount",
        attendanceSheetSuffix: "Attendance Sheet",
        attendanceSheetFallback: "Attendance Sheet",
        saveSuccessTitle: "Successfully added",
        saveSuccessText: "The attendance record entry was successfully added to the event.",
        deleteConfirmTitle: "Delete attendance record?",
        deleteConfirmText: "This action cannot be undone.",
        deleteConfirmButton: "Yes, delete it!",
        deleteSuccessTitle: "Successfully deleted",
        deleteSuccessText: "The attendance record entry was successfully deleted from the selected event date.",
        profilePictureAlt: "profile picture",
        statuses: {
            registered: "Registered",
            attended: "Attended",
            no_show: "No Show",
            cancelled: "Cancelled"
        }
    },
    es: {
        loadingTitle: "Cargando registros de asistencia",
        loadingDescription: "Verificando acceso de administrador...",
        accessRestrictedTitle: "Acceso restringido",
        accessRestrictedDescription: "Esta página solo está disponible para administradores aprobados.",
        returnHome: "Volver al inicio",
        consoleBadge: "Consola de Asistencia",
        pageTitle: "Registros de Asistencia",
        pageDescription: "Revisa la participación por evento usando tus hojas y entradas reales de asistencia.",
        participants: "Participantes",
        participantsSubtitle: "Coinciden con los filtros actuales",
        selectedEvent: "Evento Seleccionado",
        selectedEventSubtitle: "Alcance actual de asistencia",
        eventDates: "Fechas del Evento",
        eventDatesSubtitle: "Sesiones disponibles con fecha",
        allEvents: "Todos los Eventos",
        allDates: "Todas las Fechas",
        selectedEventFallback: "Evento Seleccionado",
        exportCsv: "Exportar CSV",
        exportPdf: "Exportar PDF",
        analytics: "Estadíticas",
        addRecord: "Añadir Registro",
        searchPlaceholder: "Buscar por participante...",
        recordsHelper: "Administra cuántos registros aparecen por página y exporta los resultados filtrados actuales.",
        rowsPerPage: "Filas por página",
        donationSummary: "Resumen de Donaciones",
        totalDonations: "Total de Donaciones",
        donationsDescription: "Actualiza el total de donaciones para un evento y mantén tus registros precisos.",
        totalCollected: "Total recaudado para este evento",
        selectAnEvent: "Selecciona un evento para ver y actualizar su total de donaciones.",
        updateAmountButton: "Actualizar Cantidad",
        attendanceSheetSuffix: "Hoja de Asistencia",
        attendanceSheetFallback: "Hoja de Asistencia",
        saveSuccessTitle: "Añadido correctamente",
        saveSuccessText: "El registro de asistencia se añadió correctamente al evento.",
        deleteConfirmTitle: "¿Eliminar registro de asistencia?",
        deleteConfirmText: "Esta acción no se puede deshacer.",
        deleteConfirmButton: "Sí, eliminar",
        deleteSuccessTitle: "Eliminado correctamente",
        deleteSuccessText: "El registro de asistencia se eliminó correctamente de la fecha de evento seleccionada.",
        profilePictureAlt: "foto de perfil",
        statuses: {
            registered: "Registrado",
            attended: "Asistió",
            no_show: "No Asistió",
            cancelled: "Cancelado"
        }
    }
};
function AdminAttendancePageContent() {
    _s();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])(); // es or en
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLanguageKey"])(language);
    const t = attendanceReportCopy[lang];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [pageLoading, setPageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [accessDenied, setAccessDenied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [memberProfiles, setMemberProfiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attendanceSheets, setAttendanceSheets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attendanceEntries, setAttendanceEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedEvent, setSelectedEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedEventDate, setSelectedEventDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingRecordId, setEditingRecordId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attendanceForm, setAttendanceForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [recordsPerPage, setRecordsPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAttendancePageContent.useEffect": ()=>{
            const validateAdminAccess = {
                "AdminAttendancePageContent.useEffect.validateAdminAccess": async ()=>{
                    try {
                        setPageLoading(true);
                        const { data: { user }, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                        if (authError || !user) {
                            router.replace("/login");
                            return;
                        }
                        const { data: profile, error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("first_name, last_name, role, is_approved, account_status, profile_picture, language_preference").eq("id", user.id).maybeSingle();
                        if (profileError || !profile) {
                            setAccessDenied(true);
                            return;
                        }
                        setProfile(profile);
                        const normalizedRole = (profile.role || "").toLowerCase();
                        const isAdmin = normalizedRole === "admin" || normalizedRole === "super_admin";
                        const isApproved = !!profile.is_approved;
                        const isActive = profile.account_status !== "suspended";
                        if (!isAdmin || !isApproved || !isActive) {
                            setAccessDenied(true);
                            return;
                        }
                    } catch (error) {
                        console.error("Admin attendance access check error:", error);
                        setAccessDenied(true);
                    } finally{
                        setPageLoading(false);
                    }
                }
            }["AdminAttendancePageContent.useEffect.validateAdminAccess"];
            validateAdminAccess();
        }
    }["AdminAttendancePageContent.useEffect"], [
        router
    ]);
    const loadAttendanceData = async ()=>{
        try {
            setDataLoading(true);
            const [eventsRes, sheetsRes, entriesRes, profilesRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("events").select("id, name_en, name_es, date, time, city, country, street_address, price, total_donations_usd, total_members_donated").order("created_at", {
                    ascending: false
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("attendance_sheets").select("id, event_id, occurrence_date, title, notes, is_active").order("created_at", {
                    ascending: false
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("attendance_sheet_entries").select("id, attendance_sheet_id, participant_name, participant_email, participant_phone, checked_in, checked_in_at, status, notes, created_at").order("created_at", {
                    ascending: false
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$supabase$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("profiles").select("id, first_name, last_name, email, phone, profile_picture").order("first_name", {
                    ascending: true
                })
            ]);
            if (eventsRes.error) throw eventsRes.error;
            if (sheetsRes.error) throw sheetsRes.error;
            if (entriesRes.error) throw entriesRes.error;
            if (profilesRes.error) throw profilesRes.error;
            setEvents(eventsRes?.data || []);
            setAttendanceSheets(sheetsRes.data || []);
            setAttendanceEntries(entriesRes.data || []);
            setMemberProfiles(profilesRes.data || []);
        } catch (error) {
            console.error("Failed to load attendance data:", error);
            setEvents([]);
            setAttendanceSheets([]);
            setAttendanceEntries([]);
            setMemberProfiles([]);
        } finally{
            setDataLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAttendancePageContent.useEffect": ()=>{
            if (!pageLoading && !accessDenied) {
                loadAttendanceData();
            }
        }
    }["AdminAttendancePageContent.useEffect"], [
        pageLoading,
        accessDenied
    ]);
    const eventMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[eventMap]": ()=>new Map(events.map({
                "AdminAttendancePageContent.useMemo[eventMap]": (event)=>[
                        event.id,
                        event
                    ]
            }["AdminAttendancePageContent.useMemo[eventMap]"]))
    }["AdminAttendancePageContent.useMemo[eventMap]"], [
        events
    ]);
    const sheetMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[sheetMap]": ()=>new Map(attendanceSheets.map({
                "AdminAttendancePageContent.useMemo[sheetMap]": (sheet)=>[
                        sheet.id,
                        sheet
                    ]
            }["AdminAttendancePageContent.useMemo[sheetMap]"]))
    }["AdminAttendancePageContent.useMemo[sheetMap]"], [
        attendanceSheets
    ]);
    const profileByEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[profileByEmail]": ()=>{
            const map = new Map();
            memberProfiles.forEach({
                "AdminAttendancePageContent.useMemo[profileByEmail]": (member)=>{
                    const email = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeEmail"])(member.email);
                    if (email) map.set(email, member);
                }
            }["AdminAttendancePageContent.useMemo[profileByEmail]"]);
            return map;
        }
    }["AdminAttendancePageContent.useMemo[profileByEmail]"], [
        memberProfiles
    ]);
    const profileByPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[profileByPhone]": ()=>{
            const map = new Map();
            memberProfiles.forEach({
                "AdminAttendancePageContent.useMemo[profileByPhone]": (member)=>{
                    const phone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePhone"])(member.phone);
                    if (phone) map.set(phone, member);
                }
            }["AdminAttendancePageContent.useMemo[profileByPhone]"]);
            return map;
        }
    }["AdminAttendancePageContent.useMemo[profileByPhone]"], [
        memberProfiles
    ]);
    const profileByName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[profileByName]": ()=>{
            const map = new Map();
            memberProfiles.forEach({
                "AdminAttendancePageContent.useMemo[profileByName]": (member)=>{
                    const fullName = `${member.first_name || ""} ${member.last_name || ""}`.trim().toLowerCase();
                    if (fullName) map.set(fullName, member);
                }
            }["AdminAttendancePageContent.useMemo[profileByName]"]);
            return map;
        }
    }["AdminAttendancePageContent.useMemo[profileByName]"], [
        memberProfiles
    ]);
    const getMatchedProfile = (entry)=>{
        const byEmail = profileByEmail.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeEmail"])(entry.participant_email));
        if (byEmail) return byEmail;
        const byPhone = profileByPhone.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizePhone"])(entry.participant_phone));
        if (byPhone) return byPhone;
        const byName = profileByName.get(String(entry.participant_name || "").trim().toLowerCase());
        if (byName) return byName;
        return null;
    };
    const attendanceRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[attendanceRecords]": ()=>{
            return attendanceEntries.map({
                "AdminAttendancePageContent.useMemo[attendanceRecords]": (entry)=>{
                    const sheet = sheetMap.get(entry.attendance_sheet_id);
                    if (!sheet) return null;
                    const event = eventMap.get(sheet.event_id);
                    if (!event) return null;
                    const matchedProfile = getMatchedProfile(entry);
                    const recordDate = sheet.occurrence_date || event.date || "";
                    return {
                        id: entry.id,
                        attendanceSheetId: entry.attendance_sheet_id,
                        eventId: event.id,
                        name: entry.participant_name,
                        email: entry.participant_email || "",
                        phone: entry.participant_phone || "",
                        profilePicture: matchedProfile?.profile_picture || "",
                        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(recordDate),
                        rawDate: recordDate,
                        time: event.time || "",
                        location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEventLocation"])(event),
                        status: "attended",
                        checkedIn: entry.checked_in,
                        checkedInAt: entry.checked_in_at,
                        notes: entry.notes || ""
                    };
                }
            }["AdminAttendancePageContent.useMemo[attendanceRecords]"]).filter(Boolean);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AdminAttendancePageContent.useMemo[attendanceRecords]"], [
        attendanceEntries,
        sheetMap,
        eventMap,
        profileByEmail,
        profileByPhone,
        profileByName
    ]);
    const availableDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[availableDates]": ()=>{
            const dates = attendanceRecords.filter({
                "AdminAttendancePageContent.useMemo[availableDates].dates": (r)=>selectedEvent === "all" || r.eventId === selectedEvent
            }["AdminAttendancePageContent.useMemo[availableDates].dates"]).map({
                "AdminAttendancePageContent.useMemo[availableDates].dates": (r)=>r.rawDate
            }["AdminAttendancePageContent.useMemo[availableDates].dates"]).filter(Boolean);
            return Array.from(new Set(dates)).sort();
        }
    }["AdminAttendancePageContent.useMemo[availableDates]"], [
        attendanceRecords,
        selectedEvent
    ]);
    const filteredRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[filteredRecords]": ()=>{
            return attendanceRecords.filter({
                "AdminAttendancePageContent.useMemo[filteredRecords]": (record)=>{
                    const matchesEvent = selectedEvent === "all" || record.eventId === selectedEvent;
                    const matchesDate = selectedEventDate === "all" || record.rawDate === selectedEventDate;
                    const searchLower = search.toLowerCase();
                    const matchesSearch = record.name.toLowerCase().includes(searchLower) || record.email.toLowerCase().includes(searchLower) || record.phone.toLowerCase().includes(searchLower);
                    return matchesEvent && matchesDate && matchesSearch;
                }
            }["AdminAttendancePageContent.useMemo[filteredRecords]"]);
        }
    }["AdminAttendancePageContent.useMemo[filteredRecords]"], [
        attendanceRecords,
        selectedEvent,
        selectedEventDate,
        search
    ]);
    const totalParticipants = filteredRecords.length;
    const selectedEventLabel = selectedEvent === "all" ? t.allEvents : (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedEventName"])(eventMap.get(selectedEvent), lang) || t.selectedEventFallback;
    const totalPages = Math.max(1, Math.ceil(filteredRecords.length / recordsPerPage));
    const paginatedRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[paginatedRecords]": ()=>{
            const start = (currentPage - 1) * recordsPerPage;
            return filteredRecords.slice(start, start + recordsPerPage);
        }
    }["AdminAttendancePageContent.useMemo[paginatedRecords]"], [
        filteredRecords,
        currentPage,
        recordsPerPage
    ]);
    const pageStart = filteredRecords.length === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
    const pageEnd = Math.min(currentPage * recordsPerPage, filteredRecords.length);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAttendancePageContent.useEffect": ()=>{
            setCurrentPage(1);
        }
    }["AdminAttendancePageContent.useEffect"], [
        search,
        selectedEvent,
        selectedEventDate,
        recordsPerPage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAttendancePageContent.useEffect": ()=>{
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            }
        }
    }["AdminAttendancePageContent.useEffect"], [
        currentPage,
        totalPages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAttendancePageContent.useEffect": ()=>{
            if (dataLoading) return;
            const eventIdParam = searchParams.get("eventId") || searchParams.get("event") || searchParams.get("selectedEvent");
            const dateParam = searchParams.get("occurrenceDate") || searchParams.get("date") || searchParams.get("eventDate");
            if (eventIdParam && events.some({
                "AdminAttendancePageContent.useEffect": (event)=>event.id === eventIdParam
            }["AdminAttendancePageContent.useEffect"])) {
                setSelectedEvent(eventIdParam);
            }
            if (dateParam) {
                const normalizedDate = dateParam.includes("T") ? dateParam.split("T")[0] : dateParam;
                setSelectedEventDate(normalizedDate);
            }
        }
    }["AdminAttendancePageContent.useEffect"], [
        dataLoading,
        events,
        searchParams
    ]);
    const selectedEventDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminAttendancePageContent.useMemo[selectedEventDetails]": ()=>{
            if (!attendanceForm.eventId) return null;
            return eventMap.get(attendanceForm.eventId) || null;
        }
    }["AdminAttendancePageContent.useMemo[selectedEventDetails]"], [
        attendanceForm.eventId,
        eventMap
    ]);
    const resetAttendanceForm = ()=>{
        setAttendanceForm(emptyForm);
        setEditingRecordId(null);
    };
    const handleAttendanceFormChange = (key, value)=>{
        setAttendanceForm((prev)=>({
                ...prev,
                [key]: value
            }));
    };
    // ------------------   Modal Controls   ------------------------
    const openCreateModal = ()=>{
        resetAttendanceForm();
        setIsModalOpen(true);
    };
    const openEditModal = (record)=>{
        setAttendanceForm({
            eventId: record.eventId,
            name: record.name,
            email: record.email,
            phone: record.phone,
            status: record.status,
            notes: record.notes
        });
        setEditingRecordId(record.id);
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        resetAttendanceForm();
    };
    // ----------------------   Render   ------------------------
    if (pageLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] px-4 py-12 md:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 606,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl pt-24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-4xl border border-white/70 bg-white/85 p-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto mb-5 h-14 w-14 animate-pulse rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700"
                            }, void 0, false, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 609,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-slate-900",
                                children: t.loadingTitle
                            }, void 0, false, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 610,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-500",
                                children: t.loadingDescription
                            }, void 0, false, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 613,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/attendance-report/page.tsx",
                        lineNumber: 608,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 607,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/attendance-report/page.tsx",
            lineNumber: 605,
            columnNumber: 7
        }, this);
    }
    if (accessDenied) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 625,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] px-4 py-12 md:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-lg pt-24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-4xl border border-red-100 bg-white/90 p-10 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 629,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-semibold text-slate-900",
                                    children: t.accessRestrictedTitle
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 632,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 leading-relaxed text-slate-500",
                                    children: t.accessRestrictedDescription
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 635,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push("/"),
                                    className: "mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl",
                                    children: t.returnHome
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 638,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 628,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/attendance-report/page.tsx",
                        lineNumber: 627,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 626,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/attendance-report/page.tsx",
                lineNumber: 653,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)]    px-4 py-4 md:px-6 md:py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl space-y-4 md:space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative overflow-hidden rounded-4xl border border-slate-200 bg-white/85 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_20%)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 662,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-30 my-auto mx-4 hidden sm:hidden md:block lg:block",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "m-auto rounded-full border border-solid border-slate-200 bg-white p-1.5 shadow-xl",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "m-auto flex h-26 w-26 items-center justify-center rounded-full border bg-linear-to-br from-[#0d4db0]    to-blue-700 shadow-xl",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: "/logo-title-2.png",
                                                            alt: "Paso Libre Logo",
                                                            width: 140,
                                                            height: 80,
                                                            className: "m-auto rounded-xl object-cover scale-150"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 665,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "my-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl",
                                                        children: t.pageTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 max-w-2xl text-slate-500 md:text-sm text-xs",
                                                        children: t.pageDescription
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 664,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 663,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 661,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatCard"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 703,
                                        columnNumber: 21
                                    }, void 0),
                                    title: t.participants,
                                    value: String(totalParticipants),
                                    subtitle: t.participantsSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 702,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatCard"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 21
                                    }, void 0),
                                    title: t.selectedEvent,
                                    value: selectedEventLabel,
                                    subtitle: t.selectedEventSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 708,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$AttendanceReport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatCard"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 21
                                    }, void 0),
                                    title: t.eventDates,
                                    value: String(availableDates.length),
                                    subtitle: t.eventDatesSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 714,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 701,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "block md:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,77,176,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_24%)]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 725,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative space-y-4 ",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    size: 13
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                                    lineNumber: 731,
                                                                    columnNumber: 23
                                                                }, this),
                                                                t.recordsHelper
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 730,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "mt-2 text-lg font-semibold tracking-tight text-slate-900",
                                                            children: t.selectedEvent
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 735,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 728,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedEvent,
                                                        onChange: (e)=>{
                                                            setSelectedEvent(e.target.value);
                                                            setSelectedEventDate("all");
                                                        },
                                                        className: "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "all",
                                                                children: t.allEvents
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 758,
                                                                columnNumber: 21
                                                            }, this),
                                                            events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: event.id,
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedEventName"])(event, lang)
                                                                }, event.id, false, {
                                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                                    lineNumber: 760,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedEventDate,
                                                        onChange: (e)=>setSelectedEventDate(e.target.value),
                                                        className: "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "all",
                                                                children: t.allDates
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 771,
                                                                columnNumber: 21
                                                            }, this),
                                                            availableDates.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: date,
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(date)
                                                                }, date, false, {
                                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                                    lineNumber: 773,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 766,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-full",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                size: 16,
                                                                className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 780,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: t.searchPlaceholder,
                                                                value: search,
                                                                onChange: (e)=>setSearch(e.target.value),
                                                                className: "w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 784,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 749,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportToCSV"])({
                                                                filteredRecords,
                                                                eventMap
                                                            }),
                                                        className: "flex flex-col items-center justify-center gap-1 rounded-2xl border border-green-100 bg-green-50 px-3 py-3 text-xs font-semibold text-green-700 shadow-sm transition active:scale-95",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sheet$3e$__["Sheet"], {
                                                                size: 17
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 799,
                                                                columnNumber: 21
                                                            }, this),
                                                            t.exportCsv
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 795,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportToPDF"])({
                                                                filteredRecords,
                                                                eventMap,
                                                                selectedEventLabel
                                                            }),
                                                        className: "flex flex-col items-center justify-center gap-1 rounded-2xl border border-blue-100 bg-blue-50 px-3 py-3 text-xs font-semibold text-blue-700 shadow-sm transition active:scale-95",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                size: 17
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 813,
                                                                columnNumber: 21
                                                            }, this),
                                                            t.exportPdf
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 803,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>router.push("/analytics"),
                                                        className: "flex flex-col items-center justify-center gap-1 rounded-2xl border border-purple-100 bg-purple-50 px-3 py-3 text-xs font-semibold text-purple-700 shadow-sm transition active:scale-95",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBar$3e$__["ChartBar"], {
                                                                size: 17
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 21
                                                            }, this),
                                                            t.analytics
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 794,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-slate-600",
                                                        children: t.rowsPerPage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 827,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: recordsPerPage,
                                                        onChange: (e)=>setRecordsPerPage(Number(e.target.value)),
                                                        className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                                                        children: [
                                                            5,
                                                            10,
                                                            20,
                                                            50
                                                        ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: size,
                                                                children: size
                                                            }, size, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 837,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 831,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 826,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateModal,
                                                className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3.5 font-medium text-white shadow-lg shadow-blue-900/20 transition active:scale-[0.98]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 848,
                                                        columnNumber: 19
                                                    }, this),
                                                    t.addRecord
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 844,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 727,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 724,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 723,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden rounded-[1.75rem] border border-slate-200 bg-white/88 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]    backdrop-blur-xl md:block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex w-full flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportToCSV"])({
                                                                filteredRecords,
                                                                eventMap
                                                            }),
                                                        className: "inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-green-600 px-5 py-3 font-medium text-white shadow-sm    transition hover:bg-green-700/90 hover:shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sheet$3e$__["Sheet"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 869,
                                                                columnNumber: 21
                                                            }, this),
                                                            t.exportCsv
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 864,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportToPDF"])({
                                                                filteredRecords,
                                                                eventMap,
                                                                selectedEventLabel
                                                            }),
                                                        className: "inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-blue-600 px-5 py-3 font-medium text-white shadow-sm    transition hover:bg-blue-700/90 hover:shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 885,
                                                                columnNumber: 21
                                                            }, this),
                                                            t.exportPdf
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>router.push("/analytics"),
                                                        className: "inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-purple-600 px-5 py-3 font-medium text-white shadow-sm    transition hover:bg-purple-700/90 hover:shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBar$3e$__["ChartBar"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 895,
                                                                columnNumber: 21
                                                            }, this),
                                                            t.analytics
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 862,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: openCreateModal,
                                                className: "inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3 font-medium text-white shadow-lg transition hover:shadow-xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 19
                                                    }, this),
                                                    t.addRecord
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 900,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 861,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex w-full flex-col gap-4 md:flex-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-full md:max-w-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                                            size: 16,
                                                            className: "pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 913,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedEvent,
                                                            onChange: (e)=>{
                                                                setSelectedEvent(e.target.value);
                                                                setSelectedEventDate("all");
                                                            },
                                                            className: "w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "all",
                                                                    children: t.allEvents
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                                    lineNumber: 926,
                                                                    columnNumber: 23
                                                                }, this),
                                                                events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: event.id,
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedEventName"])(event, lang)
                                                                    }, event.id, false, {
                                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                                        lineNumber: 928,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 918,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 912,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-full md:max-w-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            size: 16,
                                                            className: "pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 936,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedEventDate,
                                                            onChange: (e)=>setSelectedEventDate(e.target.value),
                                                            className: "w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "all",
                                                                    children: t.allDates
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                                    lineNumber: 946,
                                                                    columnNumber: 23
                                                                }, this),
                                                                availableDates.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: date,
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateLabel"])(date)
                                                                    }, date, false, {
                                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                                        lineNumber: 948,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 941,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-full md:max-w-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                            size: 16,
                                                            className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 956,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: t.searchPlaceholder,
                                                            value: search,
                                                            onChange: (e)=>setSearch(e.target.value),
                                                            className: "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 960,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 955,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/attendance-report/page.tsx",
                                            lineNumber: 911,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 910,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: t.recordsHelper
                                            }, void 0, false, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 972,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-slate-600",
                                                        children: t.rowsPerPage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 975,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: recordsPerPage,
                                                        onChange: (e)=>setRecordsPerPage(Number(e.target.value)),
                                                        className: "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                                                        children: [
                                                            5,
                                                            10,
                                                            20,
                                                            50
                                                        ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: size,
                                                                children: size
                                                            }, size, false, {
                                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/attendance-report/page.tsx",
                                                lineNumber: 974,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/attendance-report/page.tsx",
                                        lineNumber: 971,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 860,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 856,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_24%)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 997,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LuHeartHandshake"], {
                                                        className: "text-base md:text-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/attendance-report/page.tsx",
                                                        lineNumber: 1002,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 1001,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl font-semibold tracking-tight text-slate-900",
                                                            children: t.totalDonations
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 1010,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 max-w-2xl text-sm leading-6 text-slate-500",
                                                            children: t.donationsDescription
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 1014,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 1005,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/attendance-report/page.tsx",
                                            lineNumber: 1000,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-3 sm:flex-row sm:items-center",
                                            children: [
                                                selectedEvent !== "all" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-3xl border border-emerald-300 bg-linear-to-br from-emerald-50 to-white px-6 py-4 text-right shadow-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700",
                                                            children: selectedEventLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 1023,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-3xl font-bold tracking-tight text-slate-950",
                                                            children: [
                                                                "$",
                                                                eventMap?.get(selectedEvent)?.total_donations_usd || "0.00"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 1027,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-xs text-slate-500",
                                                            children: t.totalCollected
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 1033,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 1022,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-3xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-700 shadow-sm",
                                                    children: t.selectAnEvent
                                                }, void 0, false, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 1038,
                                                    columnNumber: 19
                                                }, this),
                                                selectedEvent !== "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleUpdateDonations"])({
                                                            eventId: selectedEvent,
                                                            eventMap,
                                                            setEvents
                                                        });
                                                    },
                                                    className: "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#0d4db0] to-indigo-700 px-5 py-3    text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:shadow-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                            size: 15
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/attendance-report/page.tsx",
                                                            lineNumber: 1055,
                                                            columnNumber: 21
                                                        }, this),
                                                        t.updateAmountButton
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/attendance-report/page.tsx",
                                                    lineNumber: 1044,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/attendance-report/page.tsx",
                                            lineNumber: 1020,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/attendance-report/page.tsx",
                                    lineNumber: 999,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 996,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AttendanceReportTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            dataLoading: dataLoading,
                            filteredRecords: filteredRecords,
                            paginatedRecords: paginatedRecords,
                            eventMap: eventMap,
                            currentPage: currentPage,
                            setCurrentPage: setCurrentPage,
                            totalPages: totalPages,
                            pageStart: pageStart,
                            pageEnd: pageEnd,
                            openEditModal: openEditModal,
                            formatEventSchedule: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatEventSchedule"],
                            getInitials: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$common$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"],
                            handleDeleteAttendanceRecord: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleDeleteAttendanceRecord"],
                            loadAttendanceData: loadAttendanceData
                        }, void 0, false, {
                            fileName: "[project]/app/attendance-report/page.tsx",
                            lineNumber: 1064,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 659,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/attendance-report/page.tsx",
                lineNumber: 655,
                columnNumber: 7
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddAttendanceRecordModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                events: events,
                selectedEventDetails: {
                    ...selectedEventDetails,
                    date: selectedEventDetails?.date || "",
                    time: selectedEventDetails?.time || "",
                    location: selectedEventDetails?.location || ""
                },
                attendanceForm: attendanceForm,
                handleAttendanceFormChange: handleAttendanceFormChange,
                handleSaveAttendanceRecord: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$attendance$2d$report$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSaveAttendanceRecord"],
                saving: saving,
                editingRecordId: editingRecordId,
                closeModal: closeModal,
                eventMap: eventMap,
                attendanceSheets: attendanceSheets,
                setAttendanceSheets: setAttendanceSheets,
                lang: lang,
                loadAttendanceData: loadAttendanceData,
                setSaving: setSaving
            }, void 0, false, {
                fileName: "[project]/app/attendance-report/page.tsx",
                lineNumber: 1084,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(AdminAttendancePageContent, "yIwpHeHrhSU8N1k/B5nZknEpYPE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AdminAttendancePageContent;
function AdminAttendancePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_28%),linear-gradient(to_bottom,#f8fafc,#edf4ff)] px-4 py-12 md:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NavBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 1116,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl pt-24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-4xl border border-white/70 bg-white/85 p-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto mb-5 h-14 w-14 animate-pulse rounded-2xl bg-linear-to-br from-[#0d4db0] to-indigo-700"
                            }, void 0, false, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 1119,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-slate-900",
                                children: "Loading attendance records"
                            }, void 0, false, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 1120,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-500",
                                children: "Preparing attendance report..."
                            }, void 0, false, {
                                fileName: "[project]/app/attendance-report/page.tsx",
                                lineNumber: 1123,
                                columnNumber: 15
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/attendance-report/page.tsx",
                        lineNumber: 1118,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/attendance-report/page.tsx",
                    lineNumber: 1117,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/attendance-report/page.tsx",
            lineNumber: 1115,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminAttendancePageContent, {}, void 0, false, {
            fileName: "[project]/app/attendance-report/page.tsx",
            lineNumber: 1131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/attendance-report/page.tsx",
        lineNumber: 1113,
        columnNumber: 5
    }, this);
}
_c1 = AdminAttendancePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "AdminAttendancePageContent");
__turbopack_context__.k.register(_c1, "AdminAttendancePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_3532e665._.js.map