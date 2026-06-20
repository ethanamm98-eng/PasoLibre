const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter, usePathname } from "next/navigation";
// import Image from "next/image";

// import { FORM_TEMPLATES } from "@/app/lib/dummyData/forms";
// import renderQuestionInput from "@/app/components/FormQuestionInput";

// type AnswerMap = Record<string, any>;

// export default function RespondToForm() {
//   //   const { formId } = useParams();
//   const pathname = usePathname();
//   const formId = pathname.split("/")[2];
//   const router = useRouter();

//   const [form, setForm] = useState<any>(null);
//   const [answers, setAnswers] = useState<AnswerMap>({});
//   const [submitting, setSubmitting] = useState(false);

//   /* ============================
//      Load form definition
//   ============================ */
//   useEffect(() => {
//     const template = FORM_TEMPLATES.find((f) => f.id === formId);
//     if (!template) return;

//     setForm(template);
//   }, [formId]);

//   if (!form) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading form…
//       </div>
//     );
//   }

//   /* ============================
//      Update answer
//   ============================ */
//   const updateAnswer = (label: string, value: any) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [label]: value,
//     }));
//   };

//   /* ============================
//      Submit
//   ============================ */
//   const handleSubmit = async () => {
//     // Validate required fields
//     const missing = form.blocks
//       .filter((b: any) => b.type === "question" && b.required)
//       .filter((b: any) => !answers[b.label]);

//     if (missing.length > 0) {
//       alert("Please answer all required questions.");
//       return;
//     }

//     setSubmitting(true);

//     const payload = {
//       id: crypto.randomUUID(),
//       formId,
//       submittedAt: new Date().toISOString(),
//       answers,
//     };

//     console.log("FORM SUBMISSION:", payload);

//     // 🔜 Replace with POST /api/forms/respond
//     // await fetch("/api/forms/respond", { method: "POST", body: JSON.stringify(payload) })

//     setSubmitting(false);
//     router.push("/thank-you");
//   };

//   /* ============================
//      Render blocks
//   ============================ */
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-3xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 space-y-4">
//           <h1
//             className="text-3xl font-semibold"
//             dangerouslySetInnerHTML={{ __html: form.title }}
//           />
//           {form.description && (
//             <div
//               className="text-gray-600"
//               dangerouslySetInnerHTML={{ __html: form.description }}
//             />
//           )}
//         </div>

//         {/* Blocks */}
//         {form.blocks.map((block: any) => {
//           /* ---------- TITLE ---------- */
//           if (block.type === "title") {
//             return (
//               <div
//                 key={block.id}
//                 className="bg-white rounded-2xl border border-slate-200 shadow p-6"
//               >
//                 <h2
//                   className="text-xl font-semibold"
//                   dangerouslySetInnerHTML={{ __html: block.title }}
//                 />
//                 {block.description && (
//                   <div
//                     className="text-gray-600 mt-2"
//                     dangerouslySetInnerHTML={{ __html: block.description }}
//                   />
//                 )}
//               </div>
//             );
//           }

//           /* ---------- IMAGE ---------- */
//           if (block.type === "image") {
//             return (
//               <div key={block.id} className="rounded-xl overflow-hidden">
//                 {block.src && (
//                   <Image
//                     src={block.src}
//                     alt=""
//                     width={800}
//                     height={400}
//                     className="w-full object-cover"
//                   />
//                 )}
//               </div>
//             );
//           }

//           /* ---------- VIDEO ---------- */
//           if (block.type === "video") {
//             return (
//               <div key={block.id} className="rounded-xl overflow-hidden">
//                 {block.src && (
//                   <video controls className="w-full rounded-xl">
//                     <source src={block.src} />
//                   </video>
//                 )}
//               </div>
//             );
//           }

//           /* ---------- QUESTION ---------- */
//           if (block.type === "question") {
//             return (
//               <div
//                 key={block.id}
//                 className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-4"
//               >
//                 <div className="font-medium text-gray-800">
//                   <span dangerouslySetInnerHTML={{ __html: block.label }} />
//                   {block.required && (
//                     <span className="text-red-500 ml-1">*</span>
//                   )}
//                 </div>

//                 {renderQuestionInput(
//                   "w-full px-4 py-2 rounded-lg border border-slate-200 bg-gray-50",
//                   block,
//                   null,
//                   null,
//                   null,
//                   (_: string, value: any) => updateAnswer(block.label, value),
//                   answers[block.label]
//                 )}
//               </div>
//             );
//           }

//           return null;
//         })}

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             disabled={submitting}
//             className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {submitting ? "Submitting…" : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
