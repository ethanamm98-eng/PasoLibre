module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/event-attendance/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://wusbcaffjonhexqrabzk.supabase.co") || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");
const normalizeStatus = (status)=>{
    if (status === "attended" || status === "accepted") return "attended";
    if (status === "cancelled" || status === "declined") return "cancelled";
    if (status === "no_show") return "no_show";
    return "registered";
};
const normalizeOccurrenceDate = (value)=>{
    if (!value) return null;
    const cleanValue = String(value).trim();
    if (!cleanValue) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleanValue)) return cleanValue;
    const parsed = new Date(cleanValue);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString().slice(0, 10);
};
const getExcludedDateKeys = (event)=>{
    if (!Array.isArray(event?.recurrence_excluded_dates)) return new Set();
    return new Set(event.recurrence_excluded_dates.map((date)=>normalizeOccurrenceDate(date)).filter(Boolean));
};
const getEventById = async (eventId)=>{
    const { data, error } = await supabase.from("events").select(`
      id,
      date,
      time,
      schedule_type,
      recurrence_excluded_dates,
      create_attendance_sheet,
      created_by,
      name_en,
      name_es
    `).eq("id", eventId).maybeSingle();
    if (error) throw error;
    return data;
};
const selectSheetColumns = `
  id,
  event_id,
  occurrence_date,
  title,
  notes,
  is_active,
  created_by,
  created_at,
  updated_at
`;
const getAttendanceSheetById = async (attendanceSheetId)=>{
    const { data, error } = await supabase.from("attendance_sheets").select(selectSheetColumns).eq("id", attendanceSheetId).maybeSingle();
    if (error) throw error;
    return data;
};
const getAttendanceSheetByOccurrence = async (eventId, occurrenceDate)=>{
    const { data, error } = await supabase.from("attendance_sheets").select(selectSheetColumns).eq("event_id", eventId).eq("occurrence_date", occurrenceDate).maybeSingle();
    if (error) throw error;
    return data;
};
const createAttendanceSheetForOccurrence = async ({ event, occurrenceDate })=>{
    const title = event?.name_en || event?.name_es || "Untitled Event";
    const { data, error } = await supabase.from("attendance_sheets").insert({
        event_id: event.id,
        occurrence_date: occurrenceDate,
        title,
        is_active: true,
        created_by: event.created_by || null
    }).select(selectSheetColumns).single();
    if (!error) return data;
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
        return getAttendanceSheetByOccurrence(event.id, occurrenceDate);
    }
    throw error;
};
const resolveAttendanceSheet = async ({ eventId, attendanceSheetId, occurrenceDate, createIfMissing = false })=>{
    const event = eventId ? await getEventById(eventId) : null;
    let resolvedOccurrenceDate = normalizeOccurrenceDate(occurrenceDate) || normalizeOccurrenceDate(event?.date);
    if (event && resolvedOccurrenceDate) {
        const excludedDates = getExcludedDateKeys(event);
        if (excludedDates.has(resolvedOccurrenceDate)) {
            return {
                sheet: null,
                event,
                occurrenceDate: resolvedOccurrenceDate,
                blocked: true,
                blockedMessage: "This occurrence has been cancelled."
            };
        }
    }
    if (eventId && resolvedOccurrenceDate) {
        const sheet = await getAttendanceSheetByOccurrence(eventId, resolvedOccurrenceDate);
        if (sheet?.id) {
            return {
                sheet,
                event,
                occurrenceDate: normalizeOccurrenceDate(sheet.occurrence_date),
                blocked: false
            };
        }
        if (createIfMissing && event?.id) {
            const createdSheet = await createAttendanceSheetForOccurrence({
                event,
                occurrenceDate: resolvedOccurrenceDate
            });
            return {
                sheet: createdSheet,
                event,
                occurrenceDate: normalizeOccurrenceDate(createdSheet?.occurrence_date),
                blocked: false
            };
        }
    }
    if (attendanceSheetId) {
        const sheet = await getAttendanceSheetById(attendanceSheetId);
        if (sheet?.id) {
            resolvedOccurrenceDate = normalizeOccurrenceDate(sheet.occurrence_date) || resolvedOccurrenceDate;
            return {
                sheet,
                event,
                occurrenceDate: resolvedOccurrenceDate,
                blocked: false
            };
        }
    }
    return {
        sheet: null,
        event,
        occurrenceDate: resolvedOccurrenceDate,
        blocked: false
    };
};
const getEntriesForSheet = async (sheetId)=>{
    const { data, error } = await supabase.from("attendance_sheet_entries").select(`
      id,
      participant_name,
      participant_email,
      participant_phone,
      status,
      checked_in,
      checked_in_at,
      member_id,
      occurrence_date,
      created_at,
      updated_at
    `).eq("attendance_sheet_id", sheetId).order("created_at", {
        ascending: false
    });
    if (error) throw error;
    return data || [];
};
const findExistingEntry = ({ entries, memberId, email })=>{
    const normalizedEmail = String(email || "").trim().toLowerCase();
    return entries.find((entry)=>{
        if (memberId && entry.member_id === memberId) return true;
        if (normalizedEmail && String(entry.participant_email || "").trim().toLowerCase() === normalizedEmail) {
            return true;
        }
        return false;
    }) || null;
};
const getCounts = (entries)=>{
    return {
        participantCount: entries.length,
        confirmedCount: entries.filter((entry)=>entry.status === "attended" || entry.checked_in === true).length
    };
};
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("eventId") || "";
        const attendanceSheetId = searchParams.get("attendanceSheetId") || "";
        const occurrenceDate = searchParams.get("occurrenceDate") || "";
        const email = searchParams.get("email") || "";
        const memberId = searchParams.get("memberId") || "";
        if (!eventId && !attendanceSheetId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Missing event or attendance sheet."
            }, {
                status: 400
            });
        }
        const resolved = await resolveAttendanceSheet({
            eventId,
            attendanceSheetId,
            occurrenceDate,
            createIfMissing: false
        });
        if (resolved.blocked) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: resolved.blockedMessage,
                occurrenceDate: resolved.occurrenceDate
            }, {
                status: 400
            });
        }
        if (!resolved.sheet?.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                attendanceSheet: null,
                existingEntry: null,
                participants: [],
                participantCount: 0,
                confirmedCount: 0,
                occurrenceDate: resolved.occurrenceDate
            });
        }
        const entries = await getEntriesForSheet(resolved.sheet.id);
        const existingEntry = findExistingEntry({
            entries,
            memberId,
            email
        });
        const counts = getCounts(entries);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            attendanceSheet: resolved.sheet,
            existingEntry,
            participants: entries,
            ...counts,
            occurrenceDate: resolved.occurrenceDate
        });
    } catch (error) {
        console.error("event-attendance GET error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to load attendance."
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { eventId, occurrenceDate, attendanceSheetId, participantName, participantEmail, participantPhone, memberId, status, notes } = body;
        if (!eventId && !attendanceSheetId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Missing event or attendance sheet."
            }, {
                status: 400
            });
        }
        const cleanName = String(participantName || "").trim();
        const cleanEmail = String(participantEmail || "").trim().toLowerCase();
        if (!cleanName) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Participant name is required."
            }, {
                status: 400
            });
        }
        const resolved = await resolveAttendanceSheet({
            eventId,
            attendanceSheetId,
            occurrenceDate,
            createIfMissing: true
        });
        if (resolved.blocked) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: resolved.blockedMessage,
                occurrenceDate: resolved.occurrenceDate
            }, {
                status: 400
            });
        }
        if (!resolved.sheet?.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Attendance sheet not found."
            }, {
                status: 404
            });
        }
        if (resolved.sheet.is_active === false) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Attendance sheet is inactive."
            }, {
                status: 400
            });
        }
        const sheetId = resolved.sheet.id;
        const resolvedDate = resolved.occurrenceDate || normalizeOccurrenceDate(resolved.sheet.occurrence_date);
        const existingEntries = await getEntriesForSheet(sheetId);
        const existingEntry = findExistingEntry({
            entries: existingEntries,
            memberId,
            email: cleanEmail
        });
        const resolvedStatus = normalizeStatus(status);
        const checkedIn = resolvedStatus === "attended";
        const payload = {
            attendance_sheet_id: sheetId,
            occurrence_date: resolvedDate,
            participant_name: cleanName,
            participant_email: cleanEmail || null,
            participant_phone: participantPhone || null,
            member_id: memberId || null,
            status: resolvedStatus,
            checked_in: checkedIn,
            checked_in_at: checkedIn ? new Date().toISOString() : null,
            notes: notes || null
        };
        const { data: entry, error } = existingEntry?.id ? await supabase.from("attendance_sheet_entries").update(payload).eq("id", existingEntry.id).select("*").single() : await supabase.from("attendance_sheet_entries").insert(payload).select("*").single();
        if (error) throw error;
        const updatedEntries = await getEntriesForSheet(sheetId);
        const counts = getCounts(updatedEntries);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            attendanceSheet: resolved.sheet,
            entry,
            participants: updatedEntries,
            ...counts,
            occurrenceDate: resolvedDate
        });
    } catch (error) {
        console.error("event-attendance POST error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to confirm attendance."
        }, {
            status: 500
        });
    }
}
async function DELETE(req) {
    try {
        const body = await req.json();
        const { eventId, occurrenceDate, attendanceSheetId, memberId, participantEmail } = body;
        if (!eventId && !attendanceSheetId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Missing event or attendance sheet."
            }, {
                status: 400
            });
        }
        const cleanEmail = String(participantEmail || "").trim().toLowerCase();
        if (!memberId && !cleanEmail) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Missing member or email to remove."
            }, {
                status: 400
            });
        }
        const resolved = await resolveAttendanceSheet({
            eventId,
            attendanceSheetId,
            occurrenceDate,
            createIfMissing: false
        });
        if (resolved.blocked) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: resolved.blockedMessage,
                occurrenceDate: resolved.occurrenceDate
            }, {
                status: 400
            });
        }
        if (!resolved.sheet?.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Attendance sheet not found."
            }, {
                status: 404
            });
        }
        let query = supabase.from("attendance_sheet_entries").delete().eq("attendance_sheet_id", resolved.sheet.id);
        if (memberId) {
            query = query.eq("member_id", memberId);
        } else {
            query = query.ilike("participant_email", cleanEmail);
        }
        const { error } = await query;
        if (error) throw error;
        const updatedEntries = await getEntriesForSheet(resolved.sheet.id);
        const counts = getCounts(updatedEntries);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            attendanceSheet: resolved.sheet,
            participants: updatedEntries,
            ...counts,
            occurrenceDate: resolved.occurrenceDate
        });
    } catch (error) {
        console.error("event-attendance DELETE error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to remove attendance."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__645f0509._.js.map