const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import React, { useEffect } from "react";

// // 1. Define this *once* outside your switch, near the top of your component/file
// export default function LinearScaleEditor({
//   block,
//   onChange,
// }: {
//   block: any;
//   onChange: (id: string, updates: any) => void;
// }) {
//   const [min, setMin] = React.useState(block.min ?? 1);
//   const [max, setMax] = React.useState(block.max ?? 5);
//   const [minLabel, setMinLabel] = React.useState(block.minLabel ?? "Low");
//   const [maxLabel, setMaxLabel] = React.useState(block.maxLabel ?? "High");

//   const initialOptionLabels = block.optionLabels || [];
//   const [optionLabels, setOptionLabels] = React.useState<string[]>(
//     initialOptionLabels.length === max - min + 1
//       ? initialOptionLabels
//       : Array(max - min + 1).fill("")
//   );

//   useEffect(() => {
//     const length = max - min + 1;
//     setOptionLabels((old) => {
//       if (old.length === length) return old;
//       if (old.length > length) return old.slice(0, length);
//       return [...old, ...Array(length - old.length).fill("")];
//     });
//   }, [min, max]);

//   useEffect(() => {
//     // Avoid triggering on first render
//     if (
//       min !== block.min ||
//       max !== block.max ||
//       minLabel !== block.minLabel ||
//       maxLabel !== block.maxLabel ||
//       JSON.stringify(optionLabels) !== JSON.stringify(block.optionLabels)
//     ) {
//       onChange(block.id, {
//         min,
//         max,
//         minLabel,
//         maxLabel,
//         optionLabels,
//       });
//     }
//   }, [min, max, minLabel, maxLabel, optionLabels]);

//   const scaleLength = max - min + 1;

//   return (
//     <div className="space-y-4 select-none text-gray-700">
//       <div className="flex flex-wrap gap-4 items-center">
//         <label className="flex flex-col text-xs font-semibold">
//           Start Number
//           <input
//             type="number"
//             min={1}
//             value={min}
//             onChange={(e) => {
//               const val = Number(e.target.value);
//               if (val < max) setMin(val);
//             }}
//             className="mt-1 p-1 rounded border border-gray-300 w-20 text-sm"
//           />
//         </label>

//         <label className="flex flex-col text-xs font-semibold">
//           End Number
//           <input
//             type="number"
//             min={min + 1}
//             value={max}
//             onChange={(e) => {
//               const val = Number(e.target.value);
//               if (val > min) setMax(val);
//             }}
//             className="mt-1 p-1 rounded border border-gray-300 w-20 text-sm"
//           />
//         </label>

//         <label className="flex flex-col text-xs font-semibold">
//           Min Label
//           <input
//             type="text"
//             value={minLabel}
//             onChange={(e) => setMinLabel(e.target.value)}
//             className="mt-1 p-1 rounded border border-gray-300 w-28 text-sm"
//           />
//         </label>

//         <label className="flex flex-col text-xs font-semibold">
//           Max Label
//           <input
//             type="text"
//             value={maxLabel}
//             onChange={(e) => setMaxLabel(e.target.value)}
//             className="mt-1 p-1 rounded border border-gray-300 w-28 text-sm"
//           />
//         </label>
//       </div>

//       <div className="flex flex-wrap gap-4 px-2">
//         {[...Array(scaleLength)].map((_, i) => {
//           const optionValue = i + min;
//           return (
//             <label
//               key={optionValue}
//               className="flex flex-col items-center text-xs"
//             >
//               <span className="mb-1">{optionValue}</span>
//               <input
//                 type="text"
//                 placeholder="Label (optional)"
//                 value={optionLabels[i] ?? ""}
//                 onChange={(e) => {
//                   const nextLabels = [...optionLabels];
//                   nextLabels[i] = e.target.value;
//                   setOptionLabels(nextLabels);
//                 }}
//                 className="w-20 p-1 rounded border border-gray-300 text-center text-xs"
//               />
//             </label>
//           );
//         })}
//       </div>

//       <div className="flex justify-between px-4 mt-2">
//         <span className="text-xs font-medium">{minLabel}</span>
//         <span className="text-xs font-medium">{maxLabel}</span>
//       </div>

//       <div className="flex justify-between px-4 mt-1">
//         {[...Array(scaleLength)].map((_, i) => {
//           const val = i + min;
//           const labelText = optionLabels[i]?.trim() || val.toString();
//           return (
//             <label
//               key={val}
//               className="flex flex-col items-center cursor-pointer select-none"
//             >
//               <input
//                 type="radio"
//                 name={block.id}
//                 value={val}
//                 disabled
//                 className="peer hidden"
//               />
//               <div className="w-6 h-6 rounded-full border border-gray-400 peer-checked:bg-blue-600 peer-checked:border-blue-600" />
//               <span className="text-xs mt-1">{labelText}</span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
