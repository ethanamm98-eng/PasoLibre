// "use client";
// import { useState } from "react";

// export function MultipleChoiceGrid({
//   onChange,
//   block,
//   mcCols,
//   mcRows,
// }: {
//   onChange: any;
//   block: any;
//   mcCols: any;
//   mcRows: any;
// }) {
//   // ===== TABLE STYLE STATE =====
//   const [outlineColor, setOutlineColor] = useState("#CBD5E1");
//   const [outlineSize, setOutlineSize] = useState(1);
//   const [radius, setRadius] = useState(12);
//   const [shadow, setShadow] = useState(2);

//   const [headerBg, setHeaderBg] = useState("#F8FAFC");
//   const [headerText, setHeaderText] = useState("#0F172A");
//   const [headerBorder, setHeaderBorder] = useState("#CBD5E1");

//   const [bodyBg, setBodyBg] = useState("#FFFFFF");
//   const [bodyText, setBodyText] = useState("#334155");
//   const [bodyBorder, setBodyBorder] = useState("#E2E8F0");
//   const [rowHover, setRowHover] = useState("#F1F5F9");

//   return (
//     <div className="space-y-6">
//       {/* ================= ROW / COLUMN EDITOR ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
//         {/* Rows */}
//         <div>
//           <div className="flex justify-between mb-2">
//             <p className="text-sm font-medium">Rows</p>
//             <button
//               onClick={() =>
//                 onChange(block.id, {
//                   rows: [...mcRows, `Row ${mcRows.length + 1}`],
//                 })
//               }
//               className="text-xs text-blue-600 hover:underline"
//             >
//               + Add row
//             </button>
//           </div>

//           {mcRows.map((row: string, i: number) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input
//                 value={row}
//                 onChange={(e) => {
//                   const next = [...mcRows];
//                   next[i] = e.target.value;
//                   onChange(block.id, { rows: next });
//                 }}
//                 className="flex-1 h-9 px-3 text-sm border border-slate-200 rounded-md"
//               />
//               <button
//                 onClick={() =>
//                   onChange(block.id, {
//                     rows: mcRows.filter((_, idx) => idx !== i),
//                   })
//                 }
//                 className="text-slate-400 hover:text-red-500"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Columns */}
//         <div>
//           <div className="flex justify-between mb-2">
//             <p className="text-sm font-medium">Columns</p>
//             <button
//               onClick={() =>
//                 onChange(block.id, {
//                   columns: [...mcCols, `Option ${mcCols.length + 1}`],
//                 })
//               }
//               className="text-xs text-blue-600 hover:underline"
//             >
//               + Add column
//             </button>
//           </div>

//           {mcCols.map((col: string, i: number) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input
//                 value={col}
//                 onChange={(e) => {
//                   const next = [...mcCols];
//                   next[i] = e.target.value;
//                   onChange(block.id, { columns: next });
//                 }}
//                 className="flex-1 h-9 px-3 text-sm border border-slate-200 rounded-md"
//               />
//               <button
//                 onClick={() =>
//                   onChange(block.id, {
//                     columns: mcCols.filter((_, idx) => idx !== i),
//                   })
//                 }
//                 className="text-slate-400 hover:text-red-500"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= STYLE CONTROLS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-lg p-4">
//         <div className="space-y-2">
//           <p className="text-xs font-semibold">Table Outline</p>
//           <label className="text-xs flex items-center gap-2">
//             Border{" "}
//             <input
//               type="color"
//               value={outlineColor}
//               onChange={(e) => setOutlineColor(e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Thickness{" "}
//             <input
//               type="range"
//               min={0}
//               max={4}
//               value={outlineSize}
//               onChange={(e) => setOutlineSize(+e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Radius{" "}
//             <input
//               type="range"
//               min={0}
//               max={24}
//               value={radius}
//               onChange={(e) => setRadius(+e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Shadow{" "}
//             <input
//               type="range"
//               min={0}
//               max={5}
//               value={shadow}
//               onChange={(e) => setShadow(+e.target.value)}
//             />
//           </label>
//         </div>

//         <div className="space-y-2">
//           <p className="text-xs font-semibold">Header</p>
//           <label className="text-xs flex items-center gap-2">
//             BG{" "}
//             <input
//               type="color"
//               value={headerBg}
//               onChange={(e) => setHeaderBg(e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Text{" "}
//             <input
//               type="color"
//               value={headerText}
//               onChange={(e) => setHeaderText(e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Border{" "}
//             <input
//               type="color"
//               value={headerBorder}
//               onChange={(e) => setHeaderBorder(e.target.value)}
//             />
//           </label>
//         </div>

//         <div className="space-y-2">
//           <p className="text-xs font-semibold">Body</p>
//           <label className="text-xs flex items-center gap-2">
//             BG{" "}
//             <input
//               type="color"
//               value={bodyBg}
//               onChange={(e) => setBodyBg(e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Text{" "}
//             <input
//               type="color"
//               value={bodyText}
//               onChange={(e) => setBodyText(e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Border{" "}
//             <input
//               type="color"
//               value={bodyBorder}
//               onChange={(e) => setBodyBorder(e.target.value)}
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Hover{" "}
//             <input
//               type="color"
//               value={rowHover}
//               onChange={(e) => setRowHover(e.target.value)}
//             />
//           </label>
//         </div>
//       </div>

//       {/* ================= PREVIEW TABLE ================= */}
//       <div
//         className="overflow-auto"
//         style={{
//           border: `${outlineSize}px solid ${outlineColor}`,
//           borderRadius: radius,
//           boxShadow: shadow
//             ? `0 ${shadow * 2}px ${shadow * 6}px rgba(0,0,0,0.12)`
//             : "none",
//         }}
//       >
//         <table className="w-full text-sm border-collapse">
//           <thead style={{ backgroundColor: headerBg, color: headerText }}>
//             <tr>
//               <th
//                 className="p-3 border"
//                 style={{ borderColor: headerBorder }}
//               />
//               {mcCols.map((c: string, i: number) => (
//                 <th
//                   key={i}
//                   className="p-3 border font-semibold"
//                   style={{ borderColor: headerBorder }}
//                 >
//                   {c}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody style={{ backgroundColor: bodyBg, color: bodyText }}>
//             {mcRows.map((r: string, ri: number) => (
//               <tr
//                 key={ri}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = rowHover)
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = bodyBg)
//                 }
//                 style={{ transition: "background 0.15s ease" }}
//               >
//                 <td
//                   className="p-3 border font-medium"
//                   style={{ borderColor: bodyBorder }}
//                 >
//                   {r}
//                 </td>
//                 {mcCols.map((_, ci: number) => (
//                   <td
//                     key={ci}
//                     className="p-3 border text-center"
//                     style={{ borderColor: bodyBorder }}
//                   >
//                     <input type="radio" disabled />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
