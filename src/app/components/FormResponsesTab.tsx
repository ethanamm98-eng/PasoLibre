const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// import React, { useState, useMemo } from "react";
// // import { FAKE_RESPONSES } from "../lib/dummyData/forms";

// import SummaryTab from "./FormSummaryTab";
// import QuestionsTab from "./FormQuestionsTab";
// import IndividualResponseCard from "./IndividualResponseCard";
// import { formatDistanceToNow } from "date-fns";

// type FormResponsesTabProps = {
//   formId: string;
// };

// export default function FormResponsesTab({ formId }: FormResponsesTabProps) {

//   const FAKE_RESPONSES = []

//   // Filter the responses for the given formId
//   const filteredResponses = useMemo(
//     () => FAKE_RESPONSES.filter((r) => r.formId === formId),
//     [formId]
//   );

//   const [activeTab, setActiveTab] = useState<
//     "summary" | "questions" | "individual"
//   >("summary");
//   const [page, setPage] = useState(0);

//   const totalPages = filteredResponses.length;
//   const currentResponse = filteredResponses[page];

//   function exportResponsesToCSV(responses: any[]) {
//     if (!responses.length) return;

//     // Collect all unique question labels
//     const questions = Array.from(
//       new Set(responses.flatMap((r) => Object.keys(r.answers)))
//     );

//     const headers = ["Submitted At", ...questions];

//     const rows = responses.map((r) => {
//       return [
//         new Date(r.submittedAt).toLocaleString(),
//         ...questions.map((q) => {
//           const value = r.answers[q];
//           if (typeof value === "boolean") return value ? "Yes" : "No";
//           if (Array.isArray(value)) return value.join(", ");
//           return value ?? "";
//         }),
//       ];
//     });

//     const csv = [headers, ...rows]
//       .map((row) =>
//         row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
//       )
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "form-responses.csv";
//     link.click();

//     URL.revokeObjectURL(url);
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">Responses</h2>
//           <p className="text-sm text-gray-500">
//             {filteredResponses.length} total submissions
//           </p>
//         </div>
//         <button
//           type="button"
//           onClick={() => exportResponsesToCSV(filteredResponses)}
//           className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
//         >
//           Export CSV
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex bg-slate-200/80 rounded-lg p-1 w-full justify-center">
//         {["summary", "questions", "individual"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab as any)}
//             className={`flex-1 px-4 py-1.5 rounded-md text-sm font-medium transition mx-auto cursor-pointer
//               ${
//                 activeTab === tab
//                   ? "bg-white shadow text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* CONTENT */}
//       {activeTab === "summary" && (
//         <SummaryTab responses={filteredResponses} formId={formId} />
//       )}

//       {activeTab === "questions" && (
//         <QuestionsTab responses={filteredResponses} formId={formId} />
//       )}

//       {activeTab === "individual" && (
//         <>
//           {totalPages > 0 ? (
//             <>
//               <IndividualResponseCard response={currentResponse} index={page} />
//               <div className="flex justify-between items-center">
//                 <button
//                   type="button"
//                   disabled={page === 0}
//                   onClick={() => setPage((p) => p - 1)}
//                   className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-500">
//                   {page + 1} of {totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   disabled={page === totalPages - 1}
//                   onClick={() => setPage((p) => p + 1)}
//                   className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-center p-6">No responses yet.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
