const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import React, { useState, useEffect } from "react";
// import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
// import { MultipleChoiceGrid } from "./FormMultipleChoiceGrid";
// import LinearScaleEditor from "./FormLinearScaleEditor";
// import { InteractiveRating, RatingWithControls } from "./FormRatingSection";

// export default function renderQuestionInput(
//   baseInput: string,
//   block: any,
//   addOption: () => void,
//   updateOption: (index: number, value: string) => void,
//   removeOption: (index: number) => void,
//   onChange: (id: string, updates: any) => void
// ) {
//   switch (block.questionType) {
//     // === Existing types ===
//     case "short_text":
//       return (
//         <input
//           type="text"
//           placeholder="Short answer text"
//           className={baseInput}
//           disabled
//         />
//       );

//     case "long_text":
//       return (
//         <textarea
//           placeholder="Long answer text"
//           className={`${baseInput} h-24 resize-none`}
//           disabled
//         />
//       );

//     case "number":
//       return (
//         <input
//           type="number"
//           placeholder="Enter a number"
//           className={baseInput}
//           disabled
//         />
//       );

//     case "multiple_choice":
//       return (
//         <div className="flex flex-col space-y-2">
//           {(block.options || []).map((opt: string, i: number) => (
//             <label
//               key={i}
//               className="flex items-center gap-2 cursor-pointer select-none text-gray-700 text-sm"
//             >
//               <input type="radio" name={block.id} disabled />
//               <input
//                 type="text"
//                 value={opt}
//                 onChange={(e) => updateOption(i, e.target.value)}
//                 className="border border-slate-300 rounded px-2 py-1 text-sm flex-grow"
//               />
//               <button
//                 onClick={() => removeOption(i)}
//                 type="button"
//                 className="text-red-500 hover:text-red-700 font-bold"
//               >
//                 ×
//               </button>
//             </label>
//           ))}
//           <button
//             type="button"
//             onClick={addOption}
//             className="text-blue-600 text-sm hover:underline mt-1"
//           >
//             + Add option
//           </button>
//         </div>
//       );

//     case "checkbox":
//       return (
//         <div className="flex flex-col space-y-2">
//           {(block.options || []).map((opt: string, i: number) => (
//             <label
//               key={i}
//               className="flex items-center gap-2 cursor-pointer select-none text-gray-700 text-sm"
//             >
//               <input type="checkbox" disabled />
//               <input
//                 type="text"
//                 value={opt}
//                 onChange={(e) => updateOption(i, e.target.value)}
//                 className="border border-slate-300 rounded px-2 py-1 text-sm flex-grow"
//               />
//               <button
//                 onClick={() => removeOption(i)}
//                 type="button"
//                 className="text-red-500 hover:text-red-700 font-bold"
//               >
//                 ×
//               </button>
//             </label>
//           ))}
//           <button
//             type="button"
//             onClick={addOption}
//             className="text-blue-600 text-sm hover:underline mt-1"
//           >
//             + Add option
//           </button>
//         </div>
//       );

//     case "dropdown":
//       return (
//         <>
//           <select disabled className={baseInput}>
//             <option>Select an option</option>
//             {(block.options || []).map((opt: string, i: number) => (
//               <option key={i} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//           <div className="flex flex-col space-y-2 mt-2">
//             {(block.options || []).map((opt: string, i: number) => (
//               <div key={i} className="flex gap-2 items-center">
//                 <input
//                   type="text"
//                   value={opt}
//                   onChange={(e) => updateOption(i, e.target.value)}
//                   className="border border-slate-300 rounded px-2 py-1 text-sm flex-grow"
//                 />
//                 <button
//                   onClick={() => removeOption(i)}
//                   type="button"
//                   className="text-red-500 hover:text-red-700 font-bold"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addOption}
//               className="text-blue-600 text-sm hover:underline"
//             >
//               + Add option
//             </button>
//           </div>
//         </>
//       );

//     case "boolean":
//       return (
//         <div className="flex flex-col gap-3 m-2">
//           <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 text-sm">
//             <input type="radio" disabled />
//             <span>Yes</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 text-sm">
//             <input type="radio" disabled />
//             <span>No</span>
//           </label>
//         </div>
//       );

//       case "rating":
//         return <RatingWithControls />;
      

//     case "date":
//       return (
//         <input
//           type="date"
//           placeholder="Select a date"
//           className={baseInput}
//           disabled
//         />
//       );

//     case "table":
//       return (
//         <div className="overflow-auto border border-slate-300 rounded-lg bg-white shadow-sm">
//           <table className="w-full text-sm text-left text-gray-600">
//             <thead className="bg-gray-100">
//               <tr>
//                 {(block.columns || ["Column 1", "Column 2"]).map(
//                   (col: string, i: number) => (
//                     <th
//                       key={i}
//                       className="px-4 py-2 border border-gray-300 font-medium"
//                     >
//                       {col}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {(
//                 block.rows || [
//                   ["", ""],
//                   ["", ""],
//                 ]
//               ).map((row: string[], rowIndex: number) => (
//                 <tr key={rowIndex}>
//                   {row.map((cell: string, cellIndex: number) => (
//                     <td
//                       key={cellIndex}
//                       className="border border-gray-300 px-4 py-2"
//                     >
//                       <input
//                         type="text"
//                         disabled
//                         className="w-full bg-gray-50 border-none p-1 text-sm text-gray-500"
//                         placeholder="..."
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );

//     // === NEW QUESTION TYPES ===

//     case "file_upload":
//       return (
//         <div className="flex flex-col items-start gap-3">
//           <label className="text-sm text-gray-700 select-none">
//             Upload File
//           </label>
//           <input
//             type="file"
//             disabled
//             className="border border-slate-300 rounded-md p-2 cursor-not-allowed bg-gray-50"
//           />
//           <p className="text-xs text-gray-400 italic">
//             File upload preview (disabled in builder)
//           </p>
//         </div>
//       );

//     case "linear_scale":
//       return <LinearScaleEditor block={block} onChange={onChange} />;

//     case "multiple_choice_grid": {
//       const mcRows = block.rows || ["Row 1", "Row 2"];
//       const mcCols = block.columns || ["Option 1", "Option 2", "Option 3"];

//       return (
//         <MultipleChoiceGrid
//           onChange={onChange}
//           block={block}
//           mcCols={mcCols}
//           mcRows={mcRows}
//         />
//       );
//     }

//     case "checkbox_grid": {
//       const cbRows = block.rows || ["Row 1", "Row 2"];
//       const cbCols = block.columns || ["Option 1", "Option 2", "Option 3"];

//       const CheckboxGrid = () => {
//         // ===== TABLE STYLE STATE =====
//         const [outlineColor, setOutlineColor] = useState("#CBD5E1");
//         const [outlineSize, setOutlineSize] = useState(1);
//         const [radius, setRadius] = useState(12);
//         const [shadow, setShadow] = useState(2);

//         const [headerBg, setHeaderBg] = useState("#F8FAFC");
//         const [headerText, setHeaderText] = useState("#0F172A");
//         const [headerBorder, setHeaderBorder] = useState("#CBD5E1");

//         const [bodyBg, setBodyBg] = useState("#FFFFFF");
//         const [bodyText, setBodyText] = useState("#334155");
//         const [bodyBorder, setBodyBorder] = useState("#E2E8F0");
//         const [rowHover, setRowHover] = useState("#F1F5F9");

//         return (
//           <div className="space-y-6">
//             {/* ================= ROW / COLUMN EDITOR ================= */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
//               {/* Rows */}
//               <div>
//                 <div className="flex justify-between mb-2">
//                   <p className="text-sm font-medium">Rows</p>
//                   <button
//                     onClick={() =>
//                       onChange(block.id, {
//                         rows: [...cbRows, `Row ${cbRows.length + 1}`],
//                       })
//                     }
//                     className="text-xs text-blue-600 hover:underline"
//                   >
//                     + Add row
//                   </button>
//                 </div>

//                 {cbRows.map((row: string, i: number) => (
//                   <div key={i} className="flex gap-2 mb-2">
//                     <input
//                       value={row}
//                       onChange={(e) => {
//                         const next = [...cbRows];
//                         next[i] = e.target.value;
//                         onChange(block.id, { rows: next });
//                       }}
//                       className="flex-1 h-9 px-3 text-sm border border-slate-200 rounded-md"
//                     />
//                     <button
//                       onClick={() =>
//                         onChange(block.id, {
//                           rows: cbRows.filter((_, idx) => idx !== i),
//                         })
//                       }
//                       className="text-slate-400 hover:text-red-500"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Columns */}
//               <div>
//                 <div className="flex justify-between mb-2">
//                   <p className="text-sm font-medium">Columns</p>
//                   <button
//                     onClick={() =>
//                       onChange(block.id, {
//                         columns: [...cbCols, `Option ${cbCols.length + 1}`],
//                       })
//                     }
//                     className="text-xs text-blue-600 hover:underline"
//                   >
//                     + Add column
//                   </button>
//                 </div>

//                 {cbCols.map((col: string, i: number) => (
//                   <div key={i} className="flex gap-2 mb-2">
//                     <input
//                       value={col}
//                       onChange={(e) => {
//                         const next = [...cbCols];
//                         next[i] = e.target.value;
//                         onChange(block.id, { columns: next });
//                       }}
//                       className="flex-1 h-9 px-3 text-sm border border-slate-200 rounded-md"
//                     />
//                     <button
//                       onClick={() =>
//                         onChange(block.id, {
//                           columns: cbCols.filter((_, idx) => idx !== i),
//                         })
//                       }
//                       className="text-slate-400 hover:text-red-500"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ================= STYLE CONTROLS ================= */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-lg p-4">
//               <div className="space-y-2">
//                 <p className="text-xs font-semibold">Table Outline</p>
//                 <label className="text-xs flex items-center gap-2">
//                   Border{" "}
//                   <input
//                     type="color"
//                     value={outlineColor}
//                     onChange={(e) => setOutlineColor(e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Thickness{" "}
//                   <input
//                     type="range"
//                     min={0}
//                     max={4}
//                     value={outlineSize}
//                     onChange={(e) => setOutlineSize(+e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Radius{" "}
//                   <input
//                     type="range"
//                     min={0}
//                     max={24}
//                     value={radius}
//                     onChange={(e) => setRadius(+e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Shadow{" "}
//                   <input
//                     type="range"
//                     min={0}
//                     max={5}
//                     value={shadow}
//                     onChange={(e) => setShadow(+e.target.value)}
//                   />
//                 </label>
//               </div>

//               <div className="space-y-2">
//                 <p className="text-xs font-semibold">Header</p>
//                 <label className="text-xs flex items-center gap-2">
//                   BG{" "}
//                   <input
//                     type="color"
//                     value={headerBg}
//                     onChange={(e) => setHeaderBg(e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Text{" "}
//                   <input
//                     type="color"
//                     value={headerText}
//                     onChange={(e) => setHeaderText(e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Border{" "}
//                   <input
//                     type="color"
//                     value={headerBorder}
//                     onChange={(e) => setHeaderBorder(e.target.value)}
//                   />
//                 </label>
//               </div>

//               <div className="space-y-2">
//                 <p className="text-xs font-semibold">Body</p>
//                 <label className="text-xs flex items-center gap-2">
//                   BG{" "}
//                   <input
//                     type="color"
//                     value={bodyBg}
//                     onChange={(e) => setBodyBg(e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Text{" "}
//                   <input
//                     type="color"
//                     value={bodyText}
//                     onChange={(e) => setBodyText(e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Border{" "}
//                   <input
//                     type="color"
//                     value={bodyBorder}
//                     onChange={(e) => setBodyBorder(e.target.value)}
//                   />
//                 </label>
//                 <label className="text-xs flex items-center gap-2">
//                   Hover{" "}
//                   <input
//                     type="color"
//                     value={rowHover}
//                     onChange={(e) => setRowHover(e.target.value)}
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* ================= PREVIEW TABLE ================= */}
//             <div
//               className="overflow-auto"
//               style={{
//                 border: `${outlineSize}px solid ${outlineColor}`,
//                 borderRadius: radius,
//                 boxShadow: shadow
//                   ? `0 ${shadow * 2}px ${shadow * 6}px rgba(0,0,0,0.12)`
//                   : "none",
//               }}
//             >
//               <table className="w-full text-sm border-collapse">
//                 <thead style={{ backgroundColor: headerBg, color: headerText }}>
//                   <tr>
//                     <th
//                       className="p-3 border"
//                       style={{ borderColor: headerBorder }}
//                     />
//                     {cbCols.map((c: string, i: number) => (
//                       <th
//                         key={i}
//                         className="p-3 border font-semibold"
//                         style={{ borderColor: headerBorder }}
//                       >
//                         {c}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody style={{ backgroundColor: bodyBg, color: bodyText }}>
//                   {cbRows.map((r: string, ri: number) => (
//                     <tr
//                       key={ri}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.backgroundColor = rowHover)
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.backgroundColor = bodyBg)
//                       }
//                       style={{ transition: "background 0.15s ease" }}
//                     >
//                       <td
//                         className="p-3 border font-medium"
//                         style={{ borderColor: bodyBorder }}
//                       >
//                         {r}
//                       </td>
//                       {cbCols.map((_, ci: number) => (
//                         <td
//                           key={ci}
//                           className="p-3 border text-center"
//                           style={{ borderColor: bodyBorder }}
//                         >
//                           <input type="checkbox" disabled />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       };

//       return <CheckboxGrid />;
//     }

//     case "time":
//       return (
//         <input
//           type="time"
//           placeholder="Select time"
//           className={baseInput}
//           disabled
//         />
//       );

//     default:
//       return <p>Unsupported question type: {block.questionType}</p>;
//   }
// }
