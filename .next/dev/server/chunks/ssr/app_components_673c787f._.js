module.exports = [
"[project]/app/components/elements/FloatingLabelInput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const FloatingLabelInput = ({ id, name, type = "text", label, value, onChange, maxLength, disabled, autoComplete = "off", readOnly, min, max, step })=>{
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? showPassword ? "text" : "password" : type;
    const hasValue = value !== undefined && value !== null && String(value).length > 0;
    const isDateLike = type === "date" || type === "time" || type === "datetime-local" || type === "month";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: `absolute left-3 bg-white px-1 text-sm transition-all duration-300 truncate max-w-[90%] ${isFocused || hasValue ? "-top-2 text-xs text-blue-600" : "top-2.5 text-gray-500"}`,
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isPasswordType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setShowPassword((prev)=>!prev),
                className: "absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600 duration-300 hover:scale-105 hover:text-[#0d4db0]",
                tabIndex: -1,
                children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaEyeSlash"], {}, void 0, false, {
                    fileName: "[project]/app/components/elements/FloatingLabelInput.tsx",
                    lineNumber: 100,
                    columnNumber: 27
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
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
const __TURBOPACK__default__export__ = FloatingLabelInput;
}),
"[project]/app/components/elements/FloatingLabelSelect.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io5/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const FloatingLabelSelect = ({ id, name, label, value, onChange, options, disabled })=>{
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2 mt-3 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                id: id,
                name: name,
                value: value,
                onChange: onChange,
                onFocus: ()=>setIsFocused(true),
                onBlur: ()=>setIsFocused(false),
                disabled: disabled,
                className: `w-full text-gray-800 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        disabled: true,
                        hidden: true
                    }, void 0, false, {
                        fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: option.value,
                            children: option.label
                        }, option.value, false, {
                            fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: `absolute text-sm transition-all duration-500 left-3 px-1 bg-white pointer-events-none ${isFocused || value ? "-top-2 text-xs text-blue-600" : "top-2.75 text-gray-500"}`,
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IoChevronDownSharp"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/elements/FloatingLabelSelect.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = FloatingLabelSelect;
}),
"[project]/app/components/SignUpForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignUpForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/language/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/elements/FloatingLabelInput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/elements/FloatingLabelSelect.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function SignUpForm() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { language, setLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$language$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const isSpanish = language === "es";
    // Translations
    const t = {
        join: isSpanish ? "Únete a Paso Libre" : "Join Paso Libre",
        firstName: isSpanish ? "Nombre" : "First Name",
        lastName: isSpanish ? "Apellido" : "Last Name",
        username: isSpanish ? "Usuario" : "Username",
        email: isSpanish ? "Correo electrónico" : "Email",
        phone: isSpanish ? "Teléfono" : "Phone",
        password: isSpanish ? "Contraseña" : "Password",
        confirmPassword: isSpanish ? "Confirmar Contraseña" : "Confirm Password",
        consentLabel: isSpanish ? "Acepto recibir actualizaciones por correo electrónico de Paso Libre." : "I consent to receive email updates from Paso Libre.",
        consentRequired: isSpanish ? "Debes aceptar recibir actualizaciones por correo electrónico." : "You must consent to receive email updates.",
        firstNameRequired: isSpanish ? "El nombre es requerido" : "First name is required",
        lastNameRequired: isSpanish ? "El apellido es requerido" : "Last name is required",
        usernameRequired: isSpanish ? "El usuario es requerido" : "Username is required",
        usernameMin: isSpanish ? "El usuario debe tener al menos 3 caracteres" : "Username must be at least 3 characters",
        usernameInvalid: isSpanish ? "El usuario solo puede contener letras, números, puntos, guiones bajos y guiones" : "Username can only contain letters, numbers, dots, underscores, and hyphens",
        emailRequired: isSpanish ? "El correo es requerido" : "Email is required",
        invalidEmail: isSpanish ? "Correo inválido" : "Invalid email",
        passwordRequired: isSpanish ? "La contraseña es requerida" : "Password is required",
        passwordMin: isSpanish ? "Mínimo 6 caracteres" : "Minimum 6 characters",
        confirmRequired: isSpanish ? "Confirma tu contraseña" : "Confirm your password",
        passwordsNoMatch: isSpanish ? "Las contraseñas no coinciden" : "Passwords do not match",
        signupFailedStatus: isSpanish ? "La solicitud de registro falló con estado" : "Signup request failed with status",
        missingPendingId: isSpanish ? "La solicitud fue guardada, pero falta el ID de registro pendiente." : "Signup request was saved, but the pending signup ID was missing.",
        adminNotificationFailed: isSpanish ? "Tu solicitud fue guardada, pero falló la notificación al administrador." : "Your request was saved, but the admin notification failed.",
        genericSubmitError: isSpanish ? "Algo salió mal al enviar tu solicitud de cuenta." : "Something went wrong while submitting your account request.",
        submitting: isSpanish ? "Enviando solicitud..." : "Submitting request...",
        createAccount: isSpanish ? "Crear Cuenta" : "Create Account",
        alreadyHaveAccount: isSpanish ? "¿Ya tienes una cuenta?" : "Already have an account?",
        signInInstead: isSpanish ? "Inicia sesión →" : "Sign in instead →",
        signIn: isSpanish ? "Iniciar sesión" : "Sign in",
        accountSubmitted: isSpanish ? "Cuenta Enviada" : "Account Submitted",
        accountSubmittedText: isSpanish ? "Tu cuenta fue enviada correctamente y ahora está pendiente de aprobación del administrador. Una vez aprobada, podrás iniciar sesión con la misma contraseña que creaste." : "Your account was submitted successfully and is now pending admin approval. Once approved, you can sign in using the same password you created.",
        goToLogin: isSpanish ? "Ir al Login" : "Go to Login",
        veryWeak: isSpanish ? "Muy débil" : "Very Weak",
        weak: isSpanish ? "Débil" : "Weak",
        fair: isSpanish ? "Aceptable" : "Fair",
        good: isSpanish ? "Buena" : "Good",
        strong: isSpanish ? "Fuerte" : "Strong"
    };
    const [buttonLoading, setButtonLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signupSuccess, setSignupSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accountExists, setAccountExists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [globalError, setGlobalError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        emailConsent: false,
        languagePreference: language || ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const formatPhone = (value)=>{
        const digits = value.replace(/\D/g, "").slice(0, 10);
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    };
    const getPasswordStrength = (password)=>{
        let score = 0;
        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };
    const strengthLabels = [
        t.weak,
        t.fair,
        t.good,
        t.strong
    ];
    const handleChange = (field, value)=>{
        if (field === "phone" && typeof value === "string") value = formatPhone(value);
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
        setErrors((prev)=>({
                ...prev,
                [field]: ""
            }));
        setGlobalError("");
        setAccountExists(false);
    };
    const validate = ()=>{
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = t.firstNameRequired;
        if (!form.lastName.trim()) newErrors.lastName = t.lastNameRequired;
        if (!form.username.trim()) newErrors.username = t.usernameRequired;
        else if (form.username.trim().length < 3) newErrors.username = t.usernameMin;
        else if (!/^[a-zA-Z0-9._-]+$/.test(form.username.trim())) newErrors.username = t.usernameInvalid;
        if (!form.email.trim()) newErrors.email = t.emailRequired;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = t.invalidEmail;
        if (!form.password) newErrors.password = t.passwordRequired;
        else if (form.password.length < 6) newErrors.password = t.passwordMin;
        if (!form.confirmPassword) newErrors.confirmPassword = t.confirmRequired;
        else if (form.password !== form.confirmPassword) newErrors.confirmPassword = t.passwordsNoMatch;
        if (!form.emailConsent) newErrors.emailConsent = t.consentRequired;
        if (!form?.languagePreference) newErrors.languagePreference = isSpanish ? "Selecciona un idioma" : "Please select a language";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const readJsonSafely = async (response)=>{
        const text = await response.text();
        try {
            return text ? JSON.parse(text) : {};
        } catch  {
            return {};
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validate()) return;
        setButtonLoading(true);
        setGlobalError("");
        setAccountExists(false);
        try {
            const cleanEmail = form.email.trim().toLowerCase();
            const cleanUsername = form.username.trim();
            const pendingResponse = await fetch("/api/pending-signups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    username: cleanUsername,
                    email: cleanEmail,
                    phone: form.phone.trim() || null,
                    password: form.password,
                    role: "member",
                    // emailConsent: form.emailConsent,
                    languagePreference: form.languagePreference
                })
            });
            const pendingResult = await readJsonSafely(pendingResponse);
            if (!pendingResponse.ok) {
                const message = pendingResult?.error || pendingResult?.message || `${t.signupFailedStatus} ${pendingResponse.status}.`;
                if (message.toLowerCase().includes("already registered") || message.toLowerCase().includes("already been registered") || message.toLowerCase().includes("already exists") || message.toLowerCase().includes("already pending")) {
                    setAccountExists(true);
                }
                setGlobalError(message);
                return;
            }
            const pendingSignup = pendingResult?.pendingSignup;
            if (!pendingSignup?.id) {
                setGlobalError(t.missingPendingId);
                return;
            }
            const notifyResponse = await fetch("/api/notify-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    pendingSignupId: pendingSignup.id,
                    email: pendingSignup.email || cleanEmail,
                    firstName: pendingSignup.first_name || form.firstName.trim(),
                    lastName: pendingSignup.last_name || form.lastName.trim(),
                    username: pendingSignup.username || cleanUsername,
                    phone: pendingSignup.phone || form.phone.trim() || null,
                    languagePreference: pendingSignup.language_preference || form.languagePreference
                })
            });
            const notifyResult = await readJsonSafely(notifyResponse);
            if (!notifyResponse.ok) {
                const message = notifyResult?.message || notifyResult?.error || t.adminNotificationFailed;
                setGlobalError(message);
                return;
            }
            setLanguage(form?.languagePreference);
            setSignupSuccess(true);
            setForm({
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                emailConsent: false,
                languagePreference: ""
            });
        } catch (err) {
            console.error("Signup error:", err);
            setGlobalError(err instanceof Error ? err.message : t.genericSubmitError);
        } finally{
            setButtonLoading(false);
        }
    };
    const passwordStrength = getPasswordStrength(form.password);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full max-w-md bg-white rounded-2xl py-6 px-4 md:py-8 md:px-8 space-y-5 border-slate-100 transition-all duration-500 ${signupSuccess ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-center bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent",
                        children: t.join
                    }, void 0, false, {
                        fileName: "[project]/app/components/SignUpForm.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: globalError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -6
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "text-sm text-red-500 text-center",
                            children: globalError
                        }, void 0, false, {
                            fileName: "[project]/app/components/SignUpForm.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/SignUpForm.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: t.firstName,
                                value: form.firstName,
                                onChange: (v)=>handleChange("firstName", v),
                                error: errors.firstName
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: t.lastName,
                                value: form.lastName,
                                onChange: (v)=>handleChange("lastName", v),
                                error: errors.lastName
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: t.username,
                                value: form.username,
                                onChange: (v)=>handleChange("username", v),
                                error: errors.username
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: t.email,
                                type: "email",
                                value: form.email,
                                onChange: (v)=>handleChange("email", v),
                                error: errors.email
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: t.phone,
                                value: form.phone,
                                onChange: (v)=>handleChange("phone", v),
                                error: errors.phone
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: t.password,
                                        type: "password",
                                        value: form.password,
                                        onChange: (v)=>handleChange("password", v),
                                        error: errors.password
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    form.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: [
                                                    ...Array(4)
                                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h-1 flex-1 rounded-full transition ${i < passwordStrength ? "bg-blue-500" : "bg-gray-200"}`
                                                    }, i, false, {
                                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/SignUpForm.tsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-1",
                                                children: strengthLabels[passwordStrength - 1] || t.veryWeak
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/SignUpForm.tsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: t.confirmPassword,
                                type: "password",
                                value: form.confirmPassword,
                                onChange: (v)=>handleChange("confirmPassword", v),
                                error: errors.confirmPassword
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelSelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    id: "languagePreference",
                                    name: "languagePreference",
                                    label: language === "en" ? "Language Preference" : "Preferencia de Idioma",
                                    value: form?.languagePreference,
                                    onChange: (e)=>handleChange("languagePreference", e.target.value),
                                    options: [
                                        {
                                            value: "en",
                                            label: isSpanish ? "Inglés" : "English"
                                        },
                                        {
                                            value: "es",
                                            label: isSpanish ? "Español" : "Spanish"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/components/SignUpForm.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "email-consent",
                                        className: `group flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-300 px-4 py-3 text-left transition ${form.emailConsent ? "border-blue-200 bg-blue-50/80 shadow-sm" : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "email-consent",
                                                        name: "email-consent",
                                                        type: "checkbox",
                                                        checked: form.emailConsent,
                                                        disabled: buttonLoading,
                                                        onChange: (e)=>handleChange("emailConsent", e.target.checked),
                                                        className: "peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        size: 14,
                                                        className: "pointer-events-none absolute text-white opacity-0 transition peer-checked:opacity-100"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/SignUpForm.tsx",
                                                lineNumber: 440,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs leading-5 text-slate-600",
                                                children: t.consentLabel
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/SignUpForm.tsx",
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: errors.emailConsent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                            initial: {
                                                opacity: 0,
                                                y: -4
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            className: "text-xs text-red-500 mt-1",
                                            children: errors.emailConsent
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/SignUpForm.tsx",
                                            lineNumber: 465,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: buttonLoading,
                                className: "cursor-pointer w-full py-3 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold shadow hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed",
                                children: buttonLoading ? t.submitting : t.createAccount
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 477,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: accountExists && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 6
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    className: "text-center mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500",
                                            children: t.alreadyHaveAccount
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/SignUpForm.tsx",
                                            lineNumber: 493,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>router.push("/login"),
                                            className: "mt-1 text-sm font-semibold bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition",
                                            children: t.signInInstead
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/SignUpForm.tsx",
                                            lineNumber: 494,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/SignUpForm.tsx",
                                    lineNumber: 487,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this),
                            !accountExists && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: t.alreadyHaveAccount
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push("/login"),
                                        className: "mt-1 text-sm font-semibold text-blue-600 hover:underline cursor-pointer transition",
                                        children: t.signIn
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/SignUpForm.tsx",
                                        lineNumber: 508,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SignUpForm.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SignUpForm.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: signupSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    className: "absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "w-full max-w-md rounded-2xl bg-white px-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-5 h-16 w-16 mx-auto rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 528,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold mb-2 text-blue-600",
                                children: t.accountSubmitted
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 532,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: t.accountSubmittedText
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 536,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push("/login"),
                                className: "mt-6 w-full py-3 rounded-lg bg-blue-600 text-white cursor-pointer hover:scale-105 transition-all duration-700",
                                children: t.goToLogin
                            }, void 0, false, {
                                fileName: "[project]/app/components/SignUpForm.tsx",
                                lineNumber: 538,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SignUpForm.tsx",
                        lineNumber: 527,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/SignUpForm.tsx",
                    lineNumber: 522,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/SignUpForm.tsx",
                lineNumber: 520,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SignUpForm.tsx",
        lineNumber: 313,
        columnNumber: 5
    }, this);
}
function Field({ label, value, onChange, error, type = "text" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$elements$2f$FloatingLabelInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                label: label,
                value: value,
                type: type,
                onChange: (e)=>onChange(e.target.value),
                id: label,
                name: label.toLowerCase().replace(/\s/g, "-")
            }, void 0, false, {
                fileName: "[project]/app/components/SignUpForm.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: {
                        opacity: 0,
                        y: -4
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "text-xs text-red-500 mt-1",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/components/SignUpForm.tsx",
                    lineNumber: 578,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/SignUpForm.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SignUpForm.tsx",
        lineNumber: 566,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_components_673c787f._.js.map