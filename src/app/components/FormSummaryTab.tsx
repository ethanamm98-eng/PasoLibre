const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useMemo, useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { GoCopy } from "react-icons/go";

// type SummaryTabProps = {
//   responses: { formId: string; answers: Record<string, string | string[]> }[];
//   formId: string;
// };

// type ChartType = "bar" | "pie";

// /* =======================
//    Chart toggle
// ======================= */
// function ChartToggle({
//   value,
//   onChange,
// }: {
//   value: ChartType;
//   onChange: (v: ChartType) => void;
// }) {
//   return (
//     <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
//       {(["bar", "pie"] as ChartType[]).map((type) => (
//         <button
//           key={type}
//           type="button"
//           onClick={() => onChange(type)}
//           className={`px-3 py-1 text-xs rounded-md transition
//             ${
//               value === type
//                 ? "bg-white shadow text-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//         >
//           {type === "bar" ? "Columns" : "Pie"}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* =======================
//    Main component
// ======================= */
// export default function SummaryTab({ responses, formId }: SummaryTabProps) {
//   if (!responses || responses.length === 0) {
//     return <p className="p-6 text-center text-gray-500">No responses yet.</p>;
//   }

//   const chartRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const [chartTypes, setChartTypes] = useState<Record<string, ChartType>>({});

//   /* =======================
//      Collect questions dynamically
//   ======================= */
//   const questions = useMemo(() => {
//     const set = new Set<string>();
//     responses
//       .filter((r) => r.formId === formId)
//       .forEach((r) => {
//         Object.keys(r.answers || {}).forEach((key) => set.add(key));
//       });
//     return Array.from(set);
//   }, [responses, formId]);

//   const colors = [
//     "#2563eb",
//     "#10b981",
//     "#f59e0b",
//     "#ef4444",
//     "#8b5cf6",
//     "#22d3ee",
//     "#ec4899",
//     "#94a3b8",
//   ];

//   /* =======================
//      Copy chart as image
//   ======================= */
//   const copyChart = async (key: string) => {
//     const node = chartRefs.current[key];
//     if (!node) return;

//     const canvas = await html2canvas(node, {
//       backgroundColor: "#ffffff",
//       scale: 2,
//     });

//     canvas.toBlob(async (blob) => {
//       if (!blob) return;
//       await navigator.clipboard.write([
//         new ClipboardItem({ "image/png": blob }),
//       ]);
//     });
//   };

//   /* =======================
//      Render chart
//   ======================= */
//   const renderChart = (
//     data: { name: string; value: number }[],
//     type: ChartType
//   ) => {
//     if (type === "pie") {
//       return (
//         <ResponsiveContainer width="100%" height={320}>
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={110}
//               label
//             >
//               {data.map((_, idx) => (
//                 <Cell key={idx} fill={colors[idx % colors.length]} />
//               ))}
//             </Pie>
//             <Legend
//               verticalAlign="bottom"
//               iconType="circle"
//               wrapperStyle={{ fontSize: 12 }}
//             />
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       );
//     }

//     return (
//       <ResponsiveContainer width="100%" height={260}>
//         <BarChart data={data}>
//           <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     );
//   };

//   /* =======================
//      Render summaries
//   ======================= */
//   return (
//     <div className="grid grid-cols-1 gap-6">
//       {questions.map((question) => {
//         const counts: Record<string, number> = {};

//         responses
//           .filter((r) => r.formId === formId)
//           .forEach((r) => {
//             const value = r.answers?.[question];

//             if (Array.isArray(value)) {
//               value.forEach((v) => {
//                 counts[v] = (counts[v] || 0) + 1;
//               });
//             } else if (value) {
//               counts[value] = (counts[value] || 0) + 1;
//             }
//           });

//         const data = Object.entries(counts).map(([name, value]) => ({
//           name,
//           value,
//         }));

//         if (!data.length) return null;

//         const chartType = chartTypes[question] || "bar";

//         return (
//           <div
//             key={question}
//             className="bg-white rounded-2xl border border-slate-200 shadow-md p-6"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <div>
//                 <h3 className="font-semibold text-sm">{question}</h3>
//                 <p className="text-xs text-gray-500">
//                   {data.reduce((sum, d) => sum + d.value, 0)} responses
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <ChartToggle
//                   value={chartType}
//                   onChange={(t) =>
//                     setChartTypes((p) => ({ ...p, [question]: t }))
//                   }
//                 />
//                 <button
//                   type="button"
//                   onClick={() => copyChart(question)}
//                   className="px-3 py-1 text-xs rounded-md border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
//                 >
//                   <span>
//                     <GoCopy className="inline mr-2" />
//                   </span>
//                   Copy chart
//                 </button>
//               </div>
//             </div>

//             <div
//               className="text-sm font-light"
//               ref={(el) => (chartRefs.current[question] = el)}
//             >
//               {renderChart(data, chartType)}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
