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
"[project]/app/api/admin/users/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://wusbcaffjonhexqrabzk.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
async function GET() {
    try {
        const { data: profiles, error: profilesError } = await supabaseAdmin.from("profiles").select(`
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
        occupation,
        race,
        nationality,
        profile_picture,
        is_approved,
        account_status,
        created_at,
        updated_at,
        language_preference
      `).order("created_at", {
            ascending: false
        });
        if (profilesError) throw profilesError;
        const { data: pendingSignups, error: pendingError } = await supabaseAdmin.from("pending_signups").select(`
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
        sexual_orientation,
        occupation,
        profile_picture,
        status,
        denial_reason,
        reviewed_at,
        created_at,
        updated_at,
        language_preference
      `).eq("status", "pending").order("created_at", {
            ascending: false
        });
        if (pendingError) throw pendingError;
        const profileUsers = profiles?.map((profile)=>({
                id: profile.id,
                profileId: profile.id,
                source: "profile",
                firstName: profile.first_name,
                lastName: profile.last_name,
                username: profile.username,
                email: profile.email,
                phone: profile.phone || "",
                status: profile.account_status === "suspended" ? "suspended" : "active",
                role: profile.role || "member",
                gender: profile.gender || "",
                pronouns: profile.pronouns || "",
                dob: profile.dob || "",
                city: profile.city || "",
                country: profile.country || "",
                sexualOrientation: profile.sexual_orientation || "",
                occupation: profile.occupation || "",
                race: profile?.race || "",
                nationality: profile?.nationality,
                profilePicture: profile.profile_picture || "",
                isApproved: !!profile.is_approved,
                language_preference: profile.language_preference || "en",
                createdAt: profile.created_at,
                reviewedAt: null,
                denialReason: null,
                eventsCount: 0,
                formsCount: 0,
                events: [],
                formResponses: []
            })) || [];
        const pendingUsers = pendingSignups?.map((pending)=>({
                id: pending.id,
                pendingSignupId: pending.id,
                source: "pending_signup",
                firstName: pending.first_name,
                lastName: pending.last_name,
                username: pending.username,
                email: pending.email,
                phone: pending.phone || "",
                status: "pending",
                role: pending.role || "member",
                gender: pending.gender || "",
                pronouns: pending.pronouns || "",
                dob: pending.dob || "",
                sexualOrientation: pending.sexual_orientation || "",
                occupation: pending.occupation || "",
                profilePicture: pending.profile_picture || "",
                isApproved: false,
                createdAt: pending.created_at,
                reviewedAt: pending.reviewed_at,
                denialReason: pending.denial_reason,
                eventsCount: 0,
                formsCount: 0,
                events: [],
                formResponses: []
            })) || [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            users: [
                ...pendingUsers,
                ...profileUsers
            ]
        });
    } catch (error) {
        console.error("admin/users error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error?.message || "Failed to load users."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0dbcb3c8._.js.map