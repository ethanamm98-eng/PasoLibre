const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";

// import FormattingToolbar from "./FormattingToolbar";

// export default function TitleBlockEditor({ block, onChange }: any) {
//       // Handlers for focus and blur events
//   // Use refs to avoid focus flicker when clicking toolbar buttons
//   const titleRef = useRef<HTMLDivElement>(null);
//   const descRef = useRef<HTMLDivElement>(null);

//   const [titleFocused, setTitleFocused] = useState(false);
//   const [descFocused, setDescFocused] = useState(false);

//   const titleEditor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link.configure({ openOnClick: false }),
//       Placeholder.configure({ placeholder: "Title" }),
//     ],
//     content: block.title,
//     onUpdate: ({ editor }) => {
//       onChange(block.id, { title: editor.getHTML() });
//     },
//   });

//   const descEditor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link.configure({ openOnClick: false }),
//       Placeholder.configure({ placeholder: "Description (optional)" }),
//     ],
//     content: block.description,
//     onUpdate: ({ editor }) => {
//       onChange(block.id, { description: editor.getHTML() });
//     },
//   });

//   // Sync content if block changes externally
//   useEffect(() => {
//     if (!titleEditor) return;
//     if (block.title !== titleEditor.getHTML()) {
//       titleEditor.commands.setContent(block.title || "", false);
//     }
//   }, [block.title, titleEditor]);

//   useEffect(() => {
//     if (!descEditor) return;
//     if (block.description !== descEditor.getHTML()) {
//       descEditor.commands.setContent(block.description || "", false);
//     }
//   }, [block.description, descEditor]);

//   if (!titleEditor || !descEditor) return null;

//   const handleTitleFocus = () => setTitleFocused(true);
//   const handleTitleBlur = (event: React.FocusEvent) => {
//     // Check if focus moved to toolbar or inside editor, else hide
//     if (
//       titleRef.current &&
//       !titleRef.current.contains(event.relatedTarget as Node)
//     ) {
//       setTitleFocused(false);
//     }
//   };

//   const handleDescFocus = () => setDescFocused(true);
//   const handleDescBlur = (event: React.FocusEvent) => {
//     if (
//       descRef.current &&
//       !descRef.current.contains(event.relatedTarget as Node)
//     ) {
//       setDescFocused(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-6">
//       <div
//         onFocus={handleTitleFocus}
//         onBlur={handleTitleBlur}
//         tabIndex={-1} // to enable div focus events on editor container
//         ref={titleRef}
//         className="relative"
//       >
//         <EditorContent
//           editor={titleEditor}
//           className="text-2xl font-semibold mb-2 focus:outline-none"
//         />
//         <div
//           className={`transition-all duration-300 ease-in-out overflow-hidden ${
//             titleFocused ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
//           }`}
//         >
//           <FormattingToolbar
//             editor={titleEditor}
//             editorId={"title-" + block.id}
//           />
//         </div>
//       </div>

//       <div
//         onFocus={handleDescFocus}
//         onBlur={handleDescBlur}
//         tabIndex={-1}
//         ref={descRef}
//         className="relative"
//       >
//         <EditorContent
//           editor={descEditor}
//           className="text-gray-600 focus:outline-none min-h-[3rem]"
//         />
//         <div
//           className={`transition-all duration-300 ease-in-out overflow-hidden ${
//             descFocused ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
//           }`}
//         >
//           <FormattingToolbar
//             editor={descEditor}
//             editorId={"desc-" + block.id}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
