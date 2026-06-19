// "use client";
// import { useState } from "react";
// import { privacyPolicyTranslations } from "../lib/translations/privacy-policy";

// interface Props {
//   draft: typeof privacyPolicyTranslations;
//   setDraft: (data: typeof privacyPolicyTranslations) => void;
// }

// export default function PrivacyPolicyEditor({ draft, setDraft }: Props) {
//   const [activeLang, setActiveLang] = useState<"en" | "es">("en");

//   const updateField = (path: string[], value: any) => {
//     const updated = { ...draft };
//     let current: any = updated[activeLang];

//     for (let i = 0; i < path.length - 1; i++) {
//       current = current[path[i]];
//     }

//     current[path[path.length - 1]] = value;
//     setDraft(updated);
//   };

//   const content = draft[activeLang];

//   return (
//     <div className="space-y-10">
//       {/* Language Toggle */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setActiveLang("en")}
//           className={`px-4 py-2 rounded-lg ${
//             activeLang === "en" ? "bg-blue-600" : "bg-neutral-800"
//           }`}
//         >
//           English
//         </button>
//         <button
//           onClick={() => setActiveLang("es")}
//           className={`px-4 py-2 rounded-lg ${
//             activeLang === "es" ? "bg-blue-600" : "bg-neutral-800"
//           }`}
//         >
//           Español
//         </button>
//       </div>

//       {/* PRIVACY POLICY TITLE & INTRO */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
//           Privacy Policy
//         </h2>

//         <input
//           type="text"
//           value={content.privacyTitle}
//           onChange={(e) => updateField(["privacyTitle"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg"
//           placeholder="Privacy Policy Title"
//         />

//         <textarea
//           value={content.privacyIntro}
//           onChange={(e) => updateField(["privacyIntro"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-32"
//           placeholder="Privacy Policy Introduction"
//         />
//       </section>

//       {/* COLLECTED INFORMATION */}
//       <section className="space-y-4">
//         <h3 className="text-lg font-semibold">Collected Information</h3>

//         <input
//           type="text"
//           value={content.collectedInfoTitle}
//           onChange={(e) => updateField(["collectedInfoTitle"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg"
//           placeholder="Collected Info Title"
//         />

//         <textarea
//           value={content.collectedInfoIntro}
//           onChange={(e) => updateField(["collectedInfoIntro"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-24"
//           placeholder="Collected Info Intro"
//         />

//         <div className="space-y-2">
//           {content.collectedInfoList.map((item, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) =>
//                   updateField(["collectedInfoList", index], e.target.value)
//                 }
//                 className="w-full bg-neutral-800 p-2 rounded-lg"
//                 placeholder={`Collected Info #${index + 1}`}
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   updateField(
//                     ["collectedInfoList"],
//                     content.collectedInfoList.filter((_, i) => i !== index)
//                   )
//                 }
//                 className="bg-red-600 p-1 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() =>
//               updateField(
//                 ["collectedInfoList"],
//                 [...content.collectedInfoList, ""]
//               )
//             }
//             className="bg-blue-600 px-3 py-1 rounded-lg"
//           >
//             Add Item
//           </button>
//         </div>

//         <textarea
//           value={content.collectedInfoNote}
//           onChange={(e) => updateField(["collectedInfoNote"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-16"
//           placeholder="Collected Info Note"
//         />
//       </section>

//       {/* USAGE OF INFORMATION */}
//       <section className="space-y-4">
//         <h3 className="text-lg font-semibold">Use of Information</h3>

//         <input
//           type="text"
//           value={content.useInfoTitle}
//           onChange={(e) => updateField(["useInfoTitle"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg"
//           placeholder="Use Info Title"
//         />

//         <textarea
//           value={content.useInfoIntro}
//           onChange={(e) => updateField(["useInfoIntro"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-24"
//           placeholder="Use Info Intro"
//         />

//         <div className="space-y-2">
//           {content.useInfoList.map((item, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) =>
//                   updateField(["useInfoList", index], e.target.value)
//                 }
//                 className="w-full bg-neutral-800 p-2 rounded-lg"
//                 placeholder={`Use Info #${index + 1}`}
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   updateField(
//                     ["useInfoList"],
//                     content.useInfoList.filter((_, i) => i !== index)
//                   )
//                 }
//                 className="bg-red-600 p-1 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() =>
//               updateField(["useInfoList"], [...content.useInfoList, ""])
//             }
//             className="bg-blue-600 px-3 py-1 rounded-lg"
//           >
//             Add Item
//           </button>
//         </div>

//         <textarea
//           value={content.useInfoNote}
//           onChange={(e) => updateField(["useInfoNote"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-16"
//           placeholder="Use Info Note"
//         />
//       </section>

//       {/* MEDIA USAGE */}
//       <section className="space-y-4">
//         <h3 className="text-lg font-semibold">Media Usage</h3>
//         <input
//           type="text"
//           value={content.mediaUsageTitle}
//           onChange={(e) => updateField(["mediaUsageTitle"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg"
//           placeholder="Media Usage Title"
//         />
//         {content.mediaUsageParagraphs.map((p, index) => (
//           <textarea
//             key={index}
//             value={p}
//             onChange={(e) =>
//               updateField(["mediaUsageParagraphs", index], e.target.value)
//             }
//             className="w-full bg-neutral-900 p-3 rounded-lg h-24"
//             placeholder={`Paragraph #${index + 1}`}
//           />
//         ))}
//       </section>

//       {/* COOKIES, LINKS, PROTECTION, CHANGES, CONTACT */}
//       {["cookies", "externalLinks", "protection", "changes", "contact"].map(
//         (section) => (
//           <section key={section} className="space-y-4">
//             <h3 className="text-lg font-semibold">{section}</h3>
//             <input
//               type="text"
//               value={content[`${section}Title`]}
//               onChange={(e) => updateField([`${section}Title`], e.target.value)}
//               className="w-full bg-neutral-900 p-3 rounded-lg"
//               placeholder={`${section} Title`}
//             />
//             <textarea
//               value={
//                 content[`${section}Text`] || content[`${section}Intro`] || ""
//               }
//               onChange={(e) => updateField([`${section}Text`], e.target.value)}
//               className="w-full bg-neutral-900 p-3 rounded-lg h-24"
//               placeholder={`${section} Text`}
//             />
//           </section>
//         )
//       )}

//       {/* TERMS OF SERVICE */}
//       <section className="space-y-4">
//         <h3 className="text-lg font-semibold">{content.tosTitle}</h3>
//         <textarea
//           value={content.tosIntro}
//           onChange={(e) => updateField(["tosIntro"], e.target.value)}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-24"
//           placeholder="TOS Intro"
//         />
//         {content.tosSections.map((sec, index) => (
//           <div key={index} className="space-y-2">
//             <input
//               type="text"
//               value={sec.title}
//               onChange={(e) =>
//                 updateField(["tosSections", index, "title"], e.target.value)
//               }
//               className="w-full bg-neutral-800 p-2 rounded-lg"
//               placeholder={`TOS Section #${index + 1} Title`}
//             />
//             <textarea
//               value={sec.text}
//               onChange={(e) =>
//                 updateField(["tosSections", index, "text"], e.target.value)
//               }
//               className="w-full bg-neutral-800 p-2 rounded-lg h-20"
//               placeholder={`TOS Section #${index + 1} Text`}
//             />
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }
