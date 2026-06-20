const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import React, { useState } from "react";
// import { GoTable } from "react-icons/go";

// export function TableBlock({ block, onChange }: any) {
//   const headers = block.headers || ["Header 1", "Header 2", "Header 3"];
//   const rows = block.rows || [
//     ["", "", ""],
//     ["", "", ""],
//   ];

//   // Style states
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

//   // Update header label
//   const updateHeader = (index: number, value: string) => {
//     const newHeaders = [...headers];
//     newHeaders[index] = value;
//     onChange(block.id, { headers: newHeaders });
//   };

//   // Add header (column)
//   const addHeader = () => {
//     const newHeaders = [...headers, `Header ${headers.length + 1}`];
//     // Add empty cell for new column in each row
//     const newRows = rows.map((row: string[]) => [...row, ""]);
//     onChange(block.id, { headers: newHeaders, rows: newRows });
//   };

//   // Remove header (column)
//   const removeHeader = (index: number) => {
//     if (headers.length <= 1) return; // Keep at least one column
//     const newHeaders = headers.filter((_, i) => i !== index);
//     const newRows = rows.map((row: string[]) =>
//       row.filter((_, i) => i !== index)
//     );
//     onChange(block.id, { headers: newHeaders, rows: newRows });
//   };

//   // Update cell content
//   const updateCell = (rowIdx: number, colIdx: number, value: string) => {
//     const newRows = [...rows];
//     newRows[rowIdx] = [...newRows[rowIdx]];
//     newRows[rowIdx][colIdx] = value;
//     onChange(block.id, { rows: newRows });
//   };

//   // Add row
//   const addRow = () => {
//     const newRow = headers.map(() => "");
//     const newRows = [...rows, newRow];
//     onChange(block.id, { rows: newRows });
//   };

//   // Remove row
//   const removeRow = (index: number) => {
//     if (rows.length <= 1) return; // Keep at least one row
//     const newRows = rows.filter((_, i) => i !== index);
//     onChange(block.id, { rows: newRows });
//   };

//   return (
//     <div className="space-y-6 bg-white rounded-2xl p-6 shadow border border-slate-200">
//       <h3 className="mb-3 text-lg font-semibold text-gray-700 flex items-center gap-2">
//         <GoTable className="w-6 h-6 text-gray-500" /> Table block
//       </h3>

//       {/* Editable Headers */}
//       <div className="flex gap-2 mb-3 overflow-x-auto">
//         {headers.map((header: string, idx: number) => (
//           <div key={idx} className="relative">
//             <input
//               type="text"
//               value={header}
//               onChange={(e) => updateHeader(idx, e.target.value)}
//               className="border border-gray-300 rounded px-3 py-1 w-32 text-sm"
//             />
//             {headers.length > 1 && (
//               <button
//                 onClick={() => removeHeader(idx)}
//                 className="absolute -top-2 -right-2 text-xs text-red-500 hover:text-red-700"
//                 title="Remove column"
//                 type="button"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           onClick={addHeader}
//           className="px-3 py-1 text-sm rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
//           title="Add column"
//           type="button"
//         >
//           + Column
//         </button>
//       </div>

//       {/* Editable Rows */}
//       <div className="space-y-2 max-h-64 overflow-auto">
//         {rows.map((row: string[], rIdx: number) => (
//           <div key={rIdx} className="flex gap-2 items-center">
//             {rows.length > 1 && (
//               <button
//                 onClick={() => removeRow(rIdx)}
//                 className="text-red-500 hover:text-red-700 px-1"
//                 title="Remove row"
//                 type="button"
//               >
//                 ✕
//               </button>
//             )}
//             {row.map((cell: string, cIdx: number) => (
//               <input
//                 key={cIdx}
//                 type="text"
//                 value={cell}
//                 onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1 w-32 text-sm"
//               />
//             ))}
//           </div>
//         ))}
//         <button
//           onClick={addRow}
//           className="px-4 py-2 text-sm rounded border border-blue-600 text-blue-600 hover:bg-blue-50 mt-2"
//           type="button"
//         >
//           + Add Row
//         </button>
//       </div>

//       {/* Style Controls */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-lg p-4">
//         {/* Table Outline */}
//         <div className="space-y-2">
//           <p className="text-xs font-semibold">Table Outline</p>
//           <label className="text-xs flex items-center gap-2">
//             Border
//             <input
//               type="color"
//               value={outlineColor}
//               onChange={(e) => setOutlineColor(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Thickness
//             <input
//               type="range"
//               min={0}
//               max={4}
//               value={outlineSize}
//               onChange={(e) => setOutlineSize(+e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Radius
//             <input
//               type="range"
//               min={0}
//               max={24}
//               value={radius}
//               onChange={(e) => setRadius(+e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Shadow
//             <input
//               type="range"
//               min={0}
//               max={5}
//               value={shadow}
//               onChange={(e) => setShadow(+e.target.value)}
//               className="ml-2"
//             />
//           </label>
//         </div>

//         {/* Header Style */}
//         <div className="space-y-2">
//           <p className="text-xs font-semibold">Header</p>
//           <label className="text-xs flex items-center gap-2">
//             BG
//             <input
//               type="color"
//               value={headerBg}
//               onChange={(e) => setHeaderBg(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Text
//             <input
//               type="color"
//               value={headerText}
//               onChange={(e) => setHeaderText(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Border
//             <input
//               type="color"
//               value={headerBorder}
//               onChange={(e) => setHeaderBorder(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//         </div>

//         {/* Body Style */}
//         <div className="space-y-2">
//           <p className="text-xs font-semibold">Body</p>
//           <label className="text-xs flex items-center gap-2">
//             BG
//             <input
//               type="color"
//               value={bodyBg}
//               onChange={(e) => setBodyBg(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Text
//             <input
//               type="color"
//               value={bodyText}
//               onChange={(e) => setBodyText(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Border
//             <input
//               type="color"
//               value={bodyBorder}
//               onChange={(e) => setBodyBorder(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//           <label className="text-xs flex items-center gap-2">
//             Hover
//             <input
//               type="color"
//               value={rowHover}
//               onChange={(e) => setRowHover(e.target.value)}
//               className="ml-2"
//             />
//           </label>
//         </div>
//       </div>

//       {/* Preview Table */}
//       <div
//         className="overflow-auto mt-6"
//         style={{
//           border: `${outlineSize}px solid ${outlineColor}`,
//           borderRadius: radius,
//           boxShadow: shadow
//             ? `0 ${shadow * 2}px ${shadow * 6}px rgba(0,0,0,0.12)`
//             : "none",
//         }}
//       >
//         <table className="w-full text-sm border-collapse">
//           <thead
//             style={{ backgroundColor: headerBg, color: headerText }}
//             className="select-none"
//           >
//             <tr>
//               {headers.map((header: string, idx: number) => (
//                 <th
//                   key={idx}
//                   className="p-3 border font-semibold"
//                   style={{ borderColor: headerBorder }}
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody style={{ backgroundColor: bodyBg, color: bodyText }}>
//             {rows.map((row: string[], rIdx: number) => (
//               <tr
//                 key={rIdx}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = rowHover)
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = bodyBg)
//                 }
//                 style={{ transition: "background 0.15s ease" }}
//               >
//                 {row.map((cell: string, cIdx: number) => (
//                   <td
//                     key={cIdx}
//                     className="p-3 border text-center"
//                     style={{ borderColor: bodyBorder }}
//                   >
//                     {cell || "\u00A0" /* preserve cell height if empty */}
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
