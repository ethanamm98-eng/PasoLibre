// "use client";
// import { useState, useEffect, useRef } from "react";

// import { homeTranslations } from "../lib/translations/home";
// import { aboutTranslations } from "../lib/translations/about";
// import { privacyPolicyTranslations } from "../lib/translations/privacy-policy";
// import { contactTranslations } from "../lib/translations/contact";

// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
// import HomePageEditor from "../components/HomePageEditor";
// import AboutPageEditor from "../components/AboutPageEditor";
// import PrivacyPolicyEditor from "../components/PrivacyPolicyPageEditor";
// import ContactPageEditor from "../components/ContactPageEditor";
// import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

// const PAGES = [
//   { slug: "home", title: "Home Page", url: "" },
//   { slug: "about", title: "About Page", url: "about" },
//   { slug: "privacy", title: "Privacy Policy", url: "privacy-policy" },
//   { slug: "contact", title: "Contact Page", url: "contact" },
//   { slug: "settings", title: "Site Settings", url: "" },
// ];

// const DEVICE_VIEWPORTS = {
//   Desktop: { width: 1024, height: 768 },
//   Tablet: { width: 768, height: 1024 },
//   Mobile: { width: 375, height: 667 },
// };

// export default function ContentManager() {
//   const [activePage, setActivePage] = useState("home");
//   const [draft, setDraft] = useState<any>({
//     home: homeTranslations,
//     about: aboutTranslations,
//     privacy: privacyPolicyTranslations,
//     contact: contactTranslations,
//   });
//   const [status, setStatus] = useState("DRAFT");
//   const [loading, setLoading] = useState(false);

//   const dockedRef = useRef<HTMLIFrameElement>(null);
//   const floatRef = useRef<HTMLIFrameElement>(null);

//   /** Docked preview */
//   const [previewWidth, setPreviewWidth] = useState("40%");
//   const [isDragging, setIsDragging] = useState(false);
//   const [fullScreen, setFullScreen] = useState(false);
//   const [zoomDocked, setZoomDocked] = useState(1);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [showDocked, setShowDocked] = useState(true);

//   /** Floating preview independent */
//   const [floating, setFloating] = useState(false);
//   const [floatPos, setFloatPos] = useState({ x: 100, y: 100 });
//   const [floatSize, setFloatSize] = useState({ width: 500, height: 400 });
//   const [draggingFloat, setDraggingFloat] = useState(false);
//   const [resizingFloat, setResizingFloat] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
//   const [zoomFloat, setZoomFloat] = useState(1);
//   const [device, setDevice] = useState<keyof typeof DEVICE_VIEWPORTS>("Desktop");

//   /** Load page draft */
//   useEffect(() => {
//     async function loadPage() {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/admin/page?slug=${activePage}`);
//         const data = await res.json();
//         setDraft((prev: any) => ({
//           ...prev,
//           [activePage]: { ...prev[activePage], ...(data.draft || {}) },
//         }));
//         setStatus(data.status || "DRAFT");
//       } catch (err) {
//         console.error("Failed to load page draft", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadPage();
//   }, [activePage]);

//   /** Reset draft when switching pages */
//   useEffect(() => {
//     setDraft((prev: any) => ({
//       ...prev,
//       [activePage]:
//         activePage === "home"
//           ? homeTranslations
//           : activePage === "about"
//           ? aboutTranslations
//           : activePage === "privacy"
//           ? privacyPolicyTranslations
//           : activePage === "contact"
//           ? contactTranslations
//           : prev[activePage] || {},
//     }));
//   }, [activePage]);

//   /** Save & Publish */
//   const saveDraft = async () => {
//     try {
//       await fetch("/api/admin/page", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slug: activePage, draft: draft[activePage] }),
//       });
//       alert("Draft saved");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save draft");
//     }
//   };

//   const publish = async () => {
//     try {
//       await fetch("/api/admin/publish", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slug: activePage }),
//       });
//       setStatus("PUBLISHED");
//       alert("Page published");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to publish page");
//     }
//   };

//   /** Focus a field in the previews */
//   const focusField = (key: string) => {
//     setFocusedField(key);

//     // Docked
//     if (dockedRef.current) {
//       try {
//         const doc = dockedRef.current.contentDocument || dockedRef.current.contentWindow?.document;
//         if (doc) {
//           doc.querySelectorAll(".__cms-focus").forEach((el) => el.classList.remove("__cms-focus"));
//           const el = doc.querySelector(`[data-key="${key}"]`) as HTMLElement;
//           if (el) {
//             el.classList.add("__cms-focus");
//             el.scrollIntoView({ behavior: "smooth", block: "center" });
//           }
//         }
//       } catch {}
//     }

//     // Floating
//     if (floatRef.current) {
//       try {
//         const doc = floatRef.current.contentDocument || floatRef.current.contentWindow?.document;
//         if (doc) {
//           doc.querySelectorAll(".__cms-focus").forEach((el) => el.classList.remove("__cms-focus"));
//           const el = doc.querySelector(`[data-key="${key}"]`) as HTMLElement;
//           if (el) {
//             el.classList.add("__cms-focus");
//             el.scrollIntoView({ behavior: "smooth", block: "center" });
//           }
//         }
//       } catch {}
//     }
//   };

//   /** Editor render */
//   const renderEditor = () => {
//     const pageDraft = draft[activePage] || {};
//     switch (activePage) {
//       case "home":
//         return (
//           <HomePageEditor
//             draft={pageDraft}
//             setDraft={(newDraft: any) =>
//               setDraft((prev: any) => ({ ...prev, home: newDraft }))
//             }
//             onFocusField={focusField}
//           />
//         );
//       case "about":
//         return (
//           <AboutPageEditor
//             draft={pageDraft}
//             setDraft={(d: any) => setDraft((prev: any) => ({ ...prev, about: d }))}
//             onFocusField={focusField}
//           />
//         );
//       case "privacy":
//         return (
//           <PrivacyPolicyEditor
//             draft={pageDraft}
//             setDraft={(d: any) => setDraft((prev: any) => ({ ...prev, privacy: d }))}
//             onFocusField={focusField}
//           />
//         );
//       case "contact":
//         return (
//           <ContactPageEditor
//             draft={pageDraft}
//             setDraft={(d: any) => setDraft((prev: any) => ({ ...prev, contact: d }))}
//             onFocusField={focusField}
//           />
//         );
//       default:
//         return <div className="text-white/50">No editor configured for this page yet.</div>;
//     }
//   };

//   /** Docked preview drag */
//   const startDrag = () => setIsDragging(true);
//   const stopDrag = () => setIsDragging(false);
//   const onDrag = (e: MouseEvent) => {
//     if (!isDragging) return;
//     const newWidth = window.innerWidth - e.clientX;
//     if (newWidth > 200 && newWidth < window.innerWidth - 200) setPreviewWidth(`${newWidth}px`);
//   };
//   useEffect(() => {
//     window.addEventListener("mousemove", onDrag);
//     window.addEventListener("mouseup", stopDrag);
//     return () => {
//       window.removeEventListener("mousemove", onDrag);
//       window.removeEventListener("mouseup", stopDrag);
//     };
//   }, [isDragging]);

//   /** Floating preview drag & resize */
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (draggingFloat) {
//         setFloatPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
//       }
//       if (resizingFloat) {
//         setFloatSize({
//           width: Math.max(200, Math.min(800, resizeStart.width + e.clientX - resizeStart.x)),
//           height: Math.max(200, Math.min(600, resizeStart.height + e.clientY - resizeStart.y)),
//         });
//       }
//     };
//     const handleMouseUp = () => {
//       setDraggingFloat(false);
//       setResizingFloat(false);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [draggingFloat, resizingFloat, dragOffset, resizeStart]);

//   return (
//     <UnderConstructionOverlay
//       title="Content Management"
//       description="This page is currently under development."
//     />
//   );

//   return (
//     <div className="pt-20 bg-[#0d4db0] min-h-screen">
//       <NavBar />

//       <div className="flex bg-neutral-950 text-white h-[calc(100vh-5rem)] relative">
//         {/* Sidebar */}
//         <aside className="w-64 border-r border-white/10 p-6">
//           {PAGES.map((page) => (
//             <button
//               key={page.slug}
//               onClick={() => setActivePage(page.slug)}
//               className={`block mb-4 text-left transition ${
//                 activePage === page.slug ? "text-blue-400" : "hover:text-blue-400"
//               }`}
//             >
//               {page.title.toUpperCase()}
//             </button>
//           ))}
//         </aside>

//         {/* Editor */}
//         <main className={`flex-1 p-10 overflow-y-auto ${showDocked ? "" : "w-full"}`}>
//           <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 space-x-2">
//             <div>
//               <h1 className="text-2xl font-bold capitalize">{activePage}</h1>
//               <p className="text-sm text-white/50">Status: {status}</p>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={saveDraft}
//                 className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//               >
//                 Save Draft
//               </button>
//               <button
//                 onClick={publish}
//                 className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
//               >
//                 Publish
//               </button>
//               <button
//                 onClick={() => setFloating(!floating)}
//                 className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
//               >
//                 {floating ? "Hide Floating Preview" : "Show Floating Preview"}
//               </button>
//               <button
//                 onClick={() => setShowDocked(!showDocked)}
//                 className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500"
//               >
//                 {showDocked ? "Hide Docked Preview" : "Show Docked Preview"}
//               </button>
//             </div>
//           </div>

//           {renderEditor()}
//         </main>

//         {/* Docked Preview */}
//         {showDocked && (
//           <aside
//             className={`relative border-l border-white/10 bg-neutral-900 ${
//               fullScreen ? "fixed inset-0 z-50 " : ""
//             }`}
//             style={{ width: fullScreen ? "100%" : previewWidth }}
//           >
//             <div
//               className="absolute left-0 top-0 w-2 h-full cursor-ew-resize z-50"
//               onMouseDown={startDrag}
//             />
//             <div className="flex justify-between items-center p-2 border-b border-white/20">
//               <div>
//                 <button
//                   className="px-2 py-1 bg-gray-700 rounded mr-2"
//                   onClick={() => setZoomDocked((z) => Math.min(z + 0.1, 2))}
//                 >
//                   🔍+
//                 </button>
//                 <button
//                   className="px-2 py-1 bg-gray-700 rounded mr-2"
//                   onClick={() => setZoomDocked((z) => Math.max(z - 0.1, 0.5))}
//                 >
//                   🔍-
//                 </button>
//               </div>
//               <div>
//                 <button
//                   className="px-2 py-1 bg-gray-700 rounded mr-2"
//                   onClick={() => setFullScreen(!fullScreen)}
//                 >
//                   {fullScreen ? "Exit Fullscreen" : "Fullscreen"}
//                 </button>
//               </div>
//             </div>
//             <iframe
//               ref={dockedRef}
//               src={`/${PAGES.find((p) => p.slug === activePage)?.url}?preview=true`}
//               className="w-full h-full rounded-lg"
//               style={{ transform: `scale(${zoomDocked})`, transformOrigin: "top left" }}
//             />
//           </aside>
//         )}

//         {/* Floating Preview */}
//         {floating && (
//           <div
//             className="absolute bg-neutral-900 border border-white/20 rounded-lg shadow-lg z-50"
//             style={{
//               top: floatPos.y,
//               left: floatPos.x,
//               width: floatSize.width,
//               height: floatSize.height,
//             }}
//           >
//             <div
//               className="cursor-move bg-gray-700 p-1 rounded-t flex justify-between items-center"
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 setDraggingFloat(true);
//                 setDragOffset({ x: e.clientX - floatPos.x, y: e.clientY - floatPos.y });
//               }}
//             >
//               <span>Live Preview</span>
//               <div className="flex items-center gap-1">
//                 <select
//                   className="bg-gray-600 text-white px-2 py-0.5 rounded"
//                   value={device}
//                   onChange={(e) => setDevice(e.target.value as keyof typeof DEVICE_VIEWPORTS)}
//                 >
//                   {Object.keys(DEVICE_VIEWPORTS).map((d) => (
//                     <option key={d} value={d}>
//                       {d}
//                     </option>
//                   ))}
//                 </select>
//                 <button className="px-2 bg-gray-600 rounded" onClick={() => setFloating(false)}>
//                   ✕
//                 </button>
//               </div>
//             </div>

//             <div
//               className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500"
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 setResizingFloat(true);
//                 setResizeStart({
//                   x: e.clientX,
//                   y: e.clientY,
//                   width: floatSize.width,
//                   height: floatSize.height,
//                 });
//               }}
//             />

//             <iframe
//               ref={floatRef}
//               src={`/${PAGES.find((p) => p.slug === activePage)?.url}?preview=true`}
//               className="rounded-b-lg border-none"
//               style={{
//                 width: DEVICE_VIEWPORTS[device].width,
//                 height: DEVICE_VIEWPORTS[device].height,
//                 transform: `scale(${zoomFloat})`,
//                 transformOrigin: "top left",
//               }}
//             />
//             <div className="flex gap-1 p-1 bg-gray-800 text-white">
//               <button onClick={() => setZoomFloat((z) => Math.min(z + 0.1, 2))}>🔍+</button>
//               <button onClick={() => setZoomFloat((z) => Math.max(z - 0.1, 0.5))}>🔍-</button>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />

//       <style>{`
//         .__cms-focus {
//           outline: 2px solid #00f0ff;
//           outline-offset: 2px;
//           transition: outline 0.2s ease-in-out;
//         }
//         .highlighted {
//           outline: 2px solid #0ff;
//           outline-offset: 2px;
//         }
//       `}</style>
//     </div>
//   );
// }
