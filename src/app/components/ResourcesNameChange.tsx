const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useState } from "react";
// import {
//   LuFileText,
//   LuClipboardCheck,
//   LuScale,
//   LuGlobe,
//   LuCar,
//   LuHeartPulse,
//   LuFolderCheck,
//   LuSignature,
//   LuDownload,
// } from "react-icons/lu";
// import { useLanguage } from "../context/language";
// import { resourcesTranslations } from "../lib/translations/resources";

// const iconMap = {
//   LuFileText,
//   LuClipboardCheck,
//   LuScale,
//   LuGlobe,
//   LuCar,
//   LuHeartPulse,
//   LuFolderCheck,
//   LuSignature,
//   LuDownload,
// };

// const ResourcesNameChange = () => {
//   const { language } = useLanguage();
//   const t = resourcesTranslations[language].nameChangeGuide;

//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     ...t.steps,
//   ];

//   const totalSteps = steps.length;

//   return (
//     <div
//       id="name-guide"
//       className="bg-white border border-slate-200 rounded-3xl p-8 text-sm text-slate-600 print:bg-white print:border print:shadow-none scroll-mt-48 text-left"
//     >
//       <h2 className="text-xl font-semibold text-[#0d4db0] mb-10">{t.title}</h2>

//       {/* Timeline / Stepper */}
//       <div className="relative ml-6 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-[#0d4db0]/30">
//         {steps.map((step, index) => {
//           const StepIcon = iconMap?.[step.icon];
//           const isActive = index === currentStep;
//           const isCompleted = index < currentStep;

//           return (
//             <div
//               key={index}
//               className="flex items-start gap-4 mb-8 relative group"
//             >
//               {/* Icon Circle */}
//               <div className="relative">
//                 <StepIcon
//                   className={`text-white rounded-full w-8 h-8 p-1 flex-shrink-0 mt-0 ${
//                     isCompleted
//                       ? "bg-green-500"
//                       : isActive
//                       ? "bg-[#0d4db0]"
//                       : "bg-slate-300"
//                   } transition-all`}
//                 />
//                 {/* Connector */}
//                 {index < totalSteps - 1 && (
//                   <span className="absolute left-1/2 top-9 w-0.5 h-full bg-[#0d4db0]/30"></span>
//                 )}
//               </div>

//               {/* Step Content */}
//               <div className="flex-1">
//                 <p
//                   className={`${
//                     isActive ? "font-semibold text-[#0d4db0]" : ""
//                   }`}
//                   dangerouslySetInnerHTML={{ __html: step.text }}
//                 />

//                 {/* Navigation Buttons */}
//                 {isActive && (
//                   <div className="mt-2 flex gap-2">
//                     {currentStep > 0 && (
//                       <button
//                         onClick={() => setCurrentStep(currentStep - 1)}
//                         className="px-3 py-1 text-sm bg-slate-100 rounded hover:bg-slate-200"
//                       >
//                         Previous
//                       </button>
//                     )}
//                     {currentStep < totalSteps - 1 && (
//                       <button
//                         onClick={() => setCurrentStep(currentStep + 1)}
//                         className="px-3 py-1 text-sm bg-[#0d4db0] text-white rounded hover:bg-[#083b8a]"
//                       >
//                         Next
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Progress Bar */}
//       <div className="mt-6 h-2 bg-slate-200 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-[#0d4db0] transition-all"
//           style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
//         />
//       </div>

//       {/* Legal Info */}
//       {t.legalInfo && (
//         <div className="mt-8 p-4 bg-[#f5f5f5] rounded-lg text-xs text-slate-700">
//           <h3 className="font-semibold mb-2">Legal Information</h3>
//           <p>{t.legalInfo}</p>
//         </div>
//       )}

//       {/* Official Resources */}
//       {t.resources?.length > 0 && (
//         <div className="mt-6 text-sm">
//           <h3 className="font-semibold mb-2">Official Guides & Resources</h3>
//           <ul className="list-disc ml-6 space-y-1">
//             {t.resources.map((res, i) => (
//               <li key={i}>
//                 <a
//                   href={res.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[#0d4db0] underline"
//                 >
//                   {res.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Downloadable Checklist PDF */}
//       <div className="mt-8 text-sm text-slate-500">
//         <p className="mb-2">Descarga tu checklist:</p>
//         <ul className="list-disc ml-6 space-y-1">
//           <li>
//             <a
//               href="/checklists/name-change-checklist.pdf"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-[#0d4db0] underline"
//             >
//               <LuDownload /> Checklist de Cambio de Nombre
//             </a>
//           </li>
//         </ul>
//       </div>

//       <p className="mt-8 text-slate-500 text-xs print:text-black">
//         {t.disclaimer}
//       </p>
//     </div>
//   );
// };

// export default ResourcesNameChange;