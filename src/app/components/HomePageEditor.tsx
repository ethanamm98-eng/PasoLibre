const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useState, useRef } from "react";

// interface Props {
//   draft: any;
//   setDraft: (data: any) => void;
//   onFocusField?: (fieldKey: string) => void; // Live preview focus
// }

// export default function HomePageEditor({
//   draft,
//   setDraft,
//   onFocusField,
// }: Props) {
//   const [activeLang, setActiveLang] = useState<"en" | "es">("en");

//   const updateField = (path: string[], value: any) => {
//     const updated = { ...draft };
//     let current = updated[activeLang];
//     for (let i = 0; i < path.length - 1; i++) current = current[path[i]];
//     current[path[path.length - 1]] = value;
//     setDraft(updated);
//   };

//   const addArrayItem = (path: string[], defaultValue: any) => {
//     const updated = { ...draft };
//     let current = updated[activeLang];
//     for (let i = 0; i < path.length; i++) current = current[path[i]];
//     current.push(defaultValue);
//     setDraft(updated);
//   };

//   const removeArrayItem = (path: string[], index: number) => {
//     const updated = { ...draft };
//     let current = updated[activeLang];
//     for (let i = 0; i < path.length; i++) current = current[path[i]];
//     current.splice(index, 1);
//     setDraft(updated);
//   };

//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   const handleFocusField = (fieldKey: string, mediaUrl?: string) => {
//     setFocusedField(fieldKey);

//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
//     if (!iframeDoc) return;

//     // Remove previous highlights
//     iframeDoc.querySelectorAll(".highlighted").forEach((el) => {
//       el.classList.remove("highlighted");
//     });

//     const el = iframeDoc.querySelector(`[data-key='${fieldKey}']`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//       el.classList.add("highlighted");

//       // If it's a media element, update its src immediately
//       if (mediaUrl && (el.tagName === "IMG" || el.tagName === "VIDEO")) {
//         (el as HTMLImageElement | HTMLVideoElement).src = mediaUrl;
//       }
//     }
//   };

//   const handleFileUpload = (path: string[], file: File) => {
//     const url = URL.createObjectURL(file); // preview URL
//     updateField(path, url);
//   };

//   const handleFocus = (path: string[]) => {
//     if (onFocusField) onFocusField(path.join("."));
//   };

//   const renderInput = (path: string[], value: any, placeholder?: string) => (
//     <input
//       type="text"
//       value={value}
//       data-key={path.join(".")}
//       onChange={(e) => updateField(path, e.target.value)}
//       onFocus={() => handleFocus(path)}
//       className="w-full bg-neutral-900 p-3 rounded-lg"
//       placeholder={placeholder || path[path.length - 1]}
//     />
//   );

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

//       {/* HERO SECTION */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
//           Hero Section
//         </h2>

//         <div>
//           <label className="block mb-1">Hero Video</label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) =>
//               e.target.files?.[0] &&
//               handleFileUpload(
//                 ["hero", "backgroundMedia", "src"],
//                 e.target.files[0]
//               )
//             }
//           />
//           {content.hero.backgroundMedia?.src && (
//             <video
//               src={content.hero.backgroundMedia.src}
//               controls
//               className="mt-2 w-full max-h-60"
//             />
//           )}
//         </div>

//         {renderInput(["hero", "headline"], content.hero.headline, "Headline")}
//         {renderInput(
//           ["hero", "boldHeadline"],
//           content.hero.boldHeadline,
//           "Bold Word"
//         )}

//         {content.hero.cta &&
//           Object.keys(content.hero.cta).map((key) =>
//             renderInput(
//               ["hero", "cta", key],
//               content.hero.cta[key],
//               `CTA ${key}`
//             )
//           )}
//       </section>

//       {/* ABOUT SECTION */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
//           About Section
//         </h2>

//         <div>
//           <label className="block mb-1">About Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               e.target.files?.[0] &&
//               handleFileUpload(["about", "imageUrl"], e.target.files[0])
//             }
//           />
//           {content.about.imageUrl && (
//             <img
//               src={content.about.imageUrl}
//               alt="About"
//               className="mt-2 w-full max-h-60 object-cover rounded-lg"
//             />
//           )}
//         </div>

//         {[
//           "ghostTitle",
//           "title",
//           "intro",
//           "description",
//           "descriptionBoldBlue",
//           "trajectoryTitle",
//         ].map((key) => renderInput(["about", key], content.about[key]))}

//         {/* About Stats */}
//         <div>
//           <h3 className="font-semibold">Stats</h3>
//           {Object.entries(content.about.stats).map(
//             ([statKey, statValue]: any) => (
//               <div key={statKey} className="flex gap-2 items-center mb-2">
//                 {renderInput(
//                   ["about", "stats", statKey, "title"],
//                   statValue.title,
//                   "Stat Title"
//                 )}
//                 <input
//                   type="number"
//                   value={statValue.number}
//                   data-key={["about", "stats", statKey, "number"].join(".")}
//                   onChange={(e) =>
//                     updateField(
//                       ["about", "stats", statKey, "number"],
//                       Number(e.target.value)
//                     )
//                   }
//                   onFocus={() =>
//                     handleFocus(["about", "stats", statKey, "number"])
//                   }
//                   className="bg-neutral-800 p-2 rounded-lg w-24"
//                   placeholder="Number"
//                 />
//               </div>
//             )
//           )}
//         </div>
//       </section>

//       {/* WHAT WE DO */}
//       <section className="space-y-6">
//         <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
//           What We Do
//         </h2>

//         {renderInput(
//           ["whatWeDo", "title"],
//           content.whatWeDo.title,
//           "Section Title"
//         )}
//         <textarea
//           value={content.whatWeDo.intro}
//           data-key="whatWeDo.intro"
//           onChange={(e) => updateField(["whatWeDo", "intro"], e.target.value)}
//           onFocus={() => handleFocus(["whatWeDo", "intro"])}
//           className="w-full bg-neutral-900 p-3 rounded-lg h-24"
//           placeholder="Intro Text"
//         />

//         {content.whatWeDo.activities.map((activity: any, index: number) => (
//           <div
//             key={index}
//             className="bg-neutral-900 p-5 rounded-xl space-y-3 relative"
//           >
//             <button
//               type="button"
//               onClick={() => removeArrayItem(["whatWeDo", "activities"], index)}
//               className="absolute top-2 right-2 text-red-500 font-bold"
//             >
//               &times;
//             </button>

//             {["title", "description"].map((key) =>
//               renderInput(["whatWeDo", "activities", index, key], activity[key])
//             )}

//             <div>
//               <label className="block mb-1">Activity Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   e.target.files?.[0] &&
//                   handleFileUpload(
//                     ["whatWeDo", "activities", index, "image", "src"],
//                     e.target.files[0]
//                   )
//                 }
//               />
//               {activity.image?.src && (
//                 <img
//                   src={activity.image.src}
//                   alt={activity.image.alt || "Activity"}
//                   className="mt-2 w-full max-h-60 object-cover rounded-lg"
//                 />
//               )}
//               {renderInput(
//                 ["whatWeDo", "activities", index, "image", "alt"],
//                 activity.image?.alt || "",
//                 "Image Alt Text"
//               )}
//             </div>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={() =>
//             addArrayItem(["whatWeDo", "activities"], {
//               title: "",
//               description: "",
//               image: { src: "", alt: "" },
//             })
//           }
//           className="px-4 py-2 bg-green-600 text-white rounded-lg"
//         >
//           Add Activity
//         </button>
//       </section>

//       {/* COMMUNITY SUPPORT */}
//       {content.aboutCommunitySupport && (
//         <section className="space-y-6">
//           <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
//             Community Support
//           </h2>

//           {Object.entries(content.aboutCommunitySupport).map(
//             ([key, value]: any) => {
//               if (typeof value === "string") {
//                 return renderInput(["aboutCommunitySupport", key], value);
//               }

//               if (Array.isArray(value)) {
//                 return (
//                   <div key={key} className="space-y-2">
//                     {value.map((item: any, idx: number) => (
//                       <div
//                         key={idx}
//                         className="ml-4 space-y-2 relative bg-neutral-800 p-4 rounded-lg"
//                       >
//                         <button
//                           type="button"
//                           onClick={() =>
//                             removeArrayItem(["aboutCommunitySupport", key], idx)
//                           }
//                           className="absolute top-2 right-2 text-red-500 font-bold"
//                         >
//                           &times;
//                         </button>

//                         {Object.entries(item).map(([subKey, subValue]: any) =>
//                           renderInput(
//                             ["aboutCommunitySupport", key, idx, subKey],
//                             subValue,
//                             `${key}.${subKey}`
//                           )
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         addArrayItem(["aboutCommunitySupport", key], {
//                           title: "",
//                           description: "",
//                           cta: "",
//                           picture: "",
//                         })
//                       }
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg"
//                     >
//                       Add {key.slice(0, -1)}
//                     </button>
//                   </div>
//                 );
//               }
//               return null;
//             }
//           )}
//         </section>
//       )}

//       {/* FINAL CTA */}
//       {content.cta && (
//         <section className="space-y-4">
//           <h2 className="text-xl font-semibold border-b border-white/10 pb-2">
//             Final CTA
//           </h2>

//           {Object.entries(content.cta).map(([key, value]: any) => {
//             if (typeof value === "string") {
//               return renderInput(["cta", key], value);
//             }
//             if (typeof value === "object") {
//               return Object.entries(value).map(([subKey, subValue]: any) =>
//                 renderInput(["cta", key, subKey], subValue, `${key}.${subKey}`)
//               );
//             }
//             return null;
//           })}
//         </section>
//       )}
//     </div>
//   );
// }
