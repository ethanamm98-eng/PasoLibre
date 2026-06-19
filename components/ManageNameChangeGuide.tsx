// "use client";
// import { useState, useEffect } from "react";
// import {
//   LuFileText,
//   LuClipboardCheck,
//   LuScale,
//   LuGlobe,
//   LuCar,
// } from "react-icons/lu";

// const iconMap = {
//   LuFileText,
//   LuClipboardCheck,
//   LuScale,
//   LuGlobe,
//   LuCar,
// };

// // -------------------- Dummy Steps --------------------
// const dummySteps = [
//   {
//     id: "step1",
//     icon: "LuFileText",
//     text: "Gather all necessary documents, including birth certificate and ID.",
//   },
//   {
//     id: "step2",
//     icon: "LuClipboardCheck",
//     text: "Fill out the official name change petition forms.",
//   },
//   {
//     id: "step3",
//     icon: "LuScale",
//     text: "Submit the forms to the appropriate court for review.",
//   },
// ];

// export default function ManageNameChangeGuide() {
//   const [steps, setSteps] = useState(dummySteps);

//   const [isStepDrawerOpen, setIsStepDrawerOpen] = useState(false);

//   // ---------------- Form State ----------------
//   const [stepIcon, setStepIcon] = useState("LuFileText");
//   const [stepText, setStepText] = useState("");

//   // ---------------- Edit State ----------------
//   const [editingStepId, setEditingStepId] = useState<string | null>(null);

//   // ---------------- ESC to Close ----------------
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsStepDrawerOpen(false);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   // ---------------- Add / Edit Step ----------------
//   const handleAddStep = () => {
//     if (!stepText || !stepIcon) return;

//     if (editingStepId) {
//       // Edit existing step
//       setSteps((prev) =>
//         prev.map((s) =>
//           s.id === editingStepId ? { ...s, icon: stepIcon, text: stepText } : s
//         )
//       );
//       setEditingStepId(null);
//     } else {
//       // Add new step
//       setSteps((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           icon: stepIcon,
//           text: stepText,
//         },
//       ]);
//     }

//     // Reset form
//     setStepIcon("LuFileText");
//     setStepText("");
//     setIsStepDrawerOpen(false);
//   };

//   // ---------------- Remove Step ----------------
//   const handleRemoveStep = (id: string) => {
//     setSteps((prev) => prev.filter((s) => s.id !== id));
//   };

//   // ---------------- Edit Step ----------------
//   const handleEditStep = (step: { id: string; icon: string; text: string }) => {
//     setStepIcon(step.icon);
//     setStepText(step.text);
//     setEditingStepId(step.id);
//     setIsStepDrawerOpen(true);
//   };

//   return (
//     <div
//       id="name-guide"
//       className="relative max-w-6xl mx-auto py-20 space-y-16 px-6"
//     >
//       <div className="flex justify-between">
//         <h1 className="text-3xl font-semibold text-[#0d4db0]">
//           Name Change Guide Management
//         </h1>

//         {/* Action Button */}
//         <button
//           onClick={() => {
//             setIsStepDrawerOpen(true);
//             setEditingStepId(null);
//             setStepIcon("LuFileText");
//             setStepText("");
//           }}
//           className="px-6 py-3 bg-[#0d4db0] text-white rounded-xl hover:opacity-90 transition"
//         >
//           + Add Step
//         </button>
//       </div>

//       {/* Existing Steps */}
//       <section className="mt-10 space-y-6">
//         {steps.map((step) => {
//           const StepIcon = iconMap[step.icon];
//           return (
//             <div
//               key={step.id}
//               className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl relative"
//             >
//               <StepIcon className="text-white bg-[#0d4db0] rounded-full w-8 h-8 p-1 shrink-0 mt-1" />
//               <div className="flex-1">
//                 <p>{step.text}</p>
//               </div>
//               <div className="flex flex-col gap-1 ml-4">
//                 <button
//                   onClick={() => handleEditStep(step)}
//                   className="text-blue-600 text-sm hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleRemoveStep(step.id)}
//                   className="text-red-600 text-sm hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </section>

//       {/* Backdrop */}
//       {isStepDrawerOpen && (
//         <div
//           onClick={() => setIsStepDrawerOpen(false)}
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//         />
//       )}

//       {/* Step Drawer */}
//       <div
//         className={`mt-20 fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isStepDrawerOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-8 space-y-6 overflow-y-auto h-full">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-[#0d4db0]">
//               {editingStepId ? "Edit Step" : "Add Step"}
//             </h2>
//             <button onClick={() => setIsStepDrawerOpen(false)}>✕</button>
//           </div>

//           <select
//             value={stepIcon}
//             onChange={(e) => setStepIcon(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//           >
//             {Object.keys(iconMap).map((key) => (
//               <option key={key} value={key}>
//                 {key.replace("Lu", "")}
//               </option>
//             ))}
//           </select>

//           <textarea
//             placeholder="Step text"
//             value={stepText}
//             onChange={(e) => setStepText(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//             rows={4}
//           />

//           <button
//             onClick={handleAddStep}
//             disabled={!stepText}
//             className="w-full bg-[#0d4db0] text-white py-3 rounded-xl disabled:opacity-40"
//           >
//             {editingStepId ? "Save Changes" : "Save Step"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }