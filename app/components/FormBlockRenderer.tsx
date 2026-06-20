const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// // BlockRenderer.tsx
// "use client";
// import React, { useRef } from "react";
// import Image from "next/image";
// import { GoTable } from "react-icons/go";
// import {
//   IoImageOutline,
//   IoVideocamOutline,
//   IoMusicalNotesOutline,
// } from "react-icons/io5";
// import { RxSection } from "react-icons/rx";

// import TiptapEditorWithToolbar from "./FormTiptapEditorWithToolbar";
// import { QuestionCard } from "./FormPage";
// import { TableBlock } from "./FormTableBlock";

// interface BlockRendererProps {
//   block: any;
//   onChange: (id: string, updates: any) => void;
//   onDelete: (id: string) => void;
//   theme: any;
// }

// export default function BlockRenderer({
//   block,
//   onChange,
//   onDelete,
//   theme,
// }: BlockRendererProps) {
//   switch (block.type) {
//     case "question":
//       return (
//         <QuestionCard
//           block={block}
//           onChange={onChange}
//           onDelete={onDelete}
//           theme={theme}
//         />
//       );

//     case "title":
//       return (
//         <div className="p-6 rounded-2xl shadow-md border border-slate-200 bg-white">
//           <TiptapEditorWithToolbar
//             id={"section-title-" + block.id}
//             value={block.title || ""}
//             placeholder="Section title"
//             onChange={(val) => onChange(block.id, { title: val })}
//             className="text-xl font-semibold outline-none"
//           />
//           <TiptapEditorWithToolbar
//             id={"section-description-" + block.id}
//             value={block.description || ""}
//             placeholder="Section description"
//             onChange={(val) => onChange(block.id, { description: val })}
//             className="text-base font-semibold outline-none"
//           />
//         </div>
//       );

//     case "image": {
//       const fileInputRef = useRef<HTMLInputElement | null>(null);

//       const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//           const file = e.target.files[0];
//           const previewUrl = URL.createObjectURL(file);
//           onChange(block.id, { url: previewUrl, file }); // Store file if needed for upload later
//         }
//       };

//       return (
//         <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
//           {block.url ? (
//             <Image
//               src={block.url}
//               alt={block.alt || "Image"}
//               width={600}
//               height={400}
//               className="rounded-lg object-cover mx-auto"
//             />
//           ) : (
//             <EmptyPlaceholder
//               icon={<IoImageOutline className="w-10 h-10 text-gray-400" />}
//               label="Image block"
//             />
//           )}

//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={onFileChange}
//           />

//           <div className="mt-4 flex gap-2">
//             <button
//               type="button"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               Upload Image
//             </button>
//             <EditableUrlInput block={block} onChange={onChange} />
//           </div>
//         </div>
//       );
//     }

//     case "video": {
//       const fileInputRef = useRef<HTMLInputElement | null>(null);

//       const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//           const file = e.target.files[0];
//           const previewUrl = URL.createObjectURL(file);
//           onChange(block.id, { url: previewUrl, file });
//         }
//       };

//       return (
//         <div className="bg-white rounded-2xl p-6 shadow border border-slate-200 text-center">
//           {block.url ? (
//             <video
//               controls
//               className="rounded-lg mx-auto max-w-full max-h-[400px]"
//             >
//               <source src={block.url} />
//               Your browser does not support the video tag.
//             </video>
//           ) : (
//             <EmptyPlaceholder
//               icon={
//                 <IoVideocamOutline className="w-10 h-10 text-gray-400 mx-auto" />
//               }
//               label="Video block"
//             />
//           )}

//           <input
//             type="file"
//             accept="video/*"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={onFileChange}
//           />

//           <div className="mt-4 flex gap-2 justify-center">
//             <button
//               type="button"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               Upload Video
//             </button>
//             <EditableUrlInput block={block} onChange={onChange} />
//           </div>
//         </div>
//       );
//     }
//     case "audio":
//       return (
//         <div className="bg-white rounded-2xl p-6 shadow border border-slate-200 text-center">
//           {block.url ? (
//             <audio controls className="mx-auto w-full max-w-lg">
//               <source src={block.url} />
//               Your browser does not support the audio element.
//             </audio>
//           ) : (
//             <EmptyPlaceholder
//               icon={
//                 <IoMusicalNotesOutline className="w-10 h-10 text-gray-400 mx-auto" />
//               }
//               label="Audio block"
//             />
//           )}
//           <EditableUrlInput block={block} onChange={onChange} />
//         </div>
//       );

//     case "table":
//       return <TableBlock block={block} onChange={onChange} />;

//     case "section":
//       return (
//         <div
//           className="border-t-4 border-blue-500 pt-4"
//           style={{ borderColor: theme.dividerColor }}
//         >
//           <TiptapEditorWithToolbar
//             id={"section-title-" + block.id}
//             value={block.title || ""}
//             placeholder="Section title"
//             onChange={(val) => onChange(block.id, { title: val })}
//             className="text-xl font-semibold outline-none"
//           />
//         </div>
//       );

//     default:
//       return null;
//   }
// }

// /* ------------- Helpers ------------- */

// function EmptyPlaceholder({
//   icon,
//   label,
// }: {
//   icon: React.ReactNode;
//   label: string;
// }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-12 text-gray-400 select-none">
//       {icon}
//       <p className="mt-3 text-sm">{label}</p>
//     </div>
//   );
// }

// function EditableUrlInput({
//   block,
//   onChange,
// }: {
//   block: any;
//   onChange: (id: string, updates: any) => void;
// }) {
//   const [url, setUrl] = React.useState(block.url || "");

//   React.useEffect(() => {
//     setUrl(block.url || "");
//   }, [block.url]);

//   const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUrl(e.target.value);
//   };

//   const onUrlBlur = () => {
//     onChange(block.id, { url });
//   };

//   return (
//     <input
//       type="url"
//       value={url}
//       placeholder="Enter URL here"
//       onChange={onUrlChange}
//       onBlur={onUrlBlur}
//       className="mt-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   );
// }

// function AddTableRowButton({
//   block,
//   onChange,
// }: {
//   block: any;
//   onChange: (id: string, updates: any) => void;
// }) {
//   const addRow = () => {
//     const newRows = [...(block.rows || [])];
//     const colCount = block.headers?.length || newRows[0]?.length || 3;
//     newRows.push(Array(colCount).fill(""));

//     onChange(block.id, { rows: newRows });
//   };

//   return (
//     <button
//       type="button"
//       onClick={addRow}
//       className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//     >
//       Add Row
//     </button>
//   );
// }
