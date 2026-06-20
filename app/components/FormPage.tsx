 const FormPage = () => {
  return <div className="min-h-screen flex items-center justify-center"></div>;
};

export default FormPage;

// "use client";
// import { use, useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter, useParams, usePathname } from "next/navigation";

// import { GoChecklist, GoPlusCircle } from "react-icons/go";
// import { MdTitle } from "react-icons/md";
// import {
//   IoImageOutline,
//   IoVideocamOutline,
//   IoEyeOutline,
//   IoLinkOutline,
//   IoColorPaletteOutline,
// } from "react-icons/io5";
// import { MdOutlineAudiotrack } from "react-icons/md";
// import { RxSection, RxFontBold } from "react-icons/rx";
// import { BiImport } from "react-icons/bi";
// import { FiLink2 } from "react-icons/fi";
// import { CiMenuKebab } from "react-icons/ci";
// import { GoCopy, GoTrash } from "react-icons/go"; // Make a copy, Move to trash
// import {
//   HiOutlineClipboardDocumentList,
//   HiOutlinePrinter,
// } from "react-icons/hi2"; // Print
// import { LiaEdit } from "react-icons/lia"; // Pre-fill form
// import {
//   AiOutlineUndo,
//   AiOutlineRedo,
//   AiFillStar,
//   AiTwotoneStar,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { BsFloppy, BsThreeDotsVertical } from "react-icons/bs";
// import { TbUserShare, TbUnderline } from "react-icons/tb";
// import { MdOutlineFormatItalic } from "react-icons/md";
// import { LiaRemoveFormatSolid } from "react-icons/lia";
// import { GoTable } from "react-icons/go";

// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";

// import { ThemePanel } from "./ThemePanel";

// import { QuestionTypeDropdown } from "./QuestionTypeDropdown";
// import FormResponsesTab from "./FormResponsesTab";
// import { FormSettingsTab } from "./FormSettingsTab";

// import { FORM_TEMPLATES, FAKE_RESPONSES } from "../lib/dummyData/forms";

// import FormattingToolbar from "./FormattingToolbar"; // Reusable formatting toolbar
// import TitleBlockEditor from "./FormTitleBlockEditor";
// import TiptapEditorWithToolbar from "./FormTiptapEditorWithToolbar";
// import renderQuestionInput from "./FormQuestionInput";
// import BlockRenderer from "./FormBlockRenderer";

// /* -----------------------------
//    FIELD DEFINITIONS
// ----------------------------- */

// export const FIELD_TYPES = [
//   "short_text",
//   "long_text",
//   "multiple_choice",
//   "checkbox",
//   "dropdown",
//   "rating",
//   "boolean",
//   "date",
//   "number",
//   "table",
// ];

// /* -----------------------------
//    FORM BUILDER (ROOT)
// ----------------------------- */

// export default function FormBuilder() {
//   const router = useRouter();
//   const pathname = usePathname();
//   // const searchParams = useParams();
//   // const formId = searchParams?.formId || null;

//   const formId = pathname?.split("/")[2] || "";
//   const [activeTab, setActiveTab] = useState<
//     "questions" | "responses" | "settings"
//   >("questions");
//   const [form, setForm] = useState({
//     title: "Untitled Form",
//     description: "",
//     blocks: [] as any[],
//   });

//   const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

//   const [themeOpen, setThemeOpen] = useState(false);

//   const [theme, setTheme] = useState({
//     headerFont: "Inter",
//     headerSize: "32px",

//     questionFont: "Inter",
//     questionSize: "16px",

//     textFont: "Inter",
//     textSize: "14px",

//     headerImage: null as File | null,

//     backgroundColor: "#f9fafb",
//     dividerColor: "#2563eb",
//   });

//   const responses = FAKE_RESPONSES.filter((r) => r.formId === formId);

//   const loadTemplate = (templateId: string) => {
//     const template = FORM_TEMPLATES.find((t) => t.id === formId);
//     if (!template) return;

//     setForm({
//       title: template.title,
//       description: template.description,
//       blocks: template.blocks.map((block) => ({
//         ...block,
//         id: crypto.randomUUID(), // ensure clean IDs
//       })),
//     });

//     setActiveBlockId(null);
//   };

//   // useEffect(() => {
//   //   if (formId) {
//   //     const template = FORM_TEMPLATES.find((t) => t.id === formId);
//   //     if (template) {
//   //       setForm({
//   //         title: template.title,
//   //         description: template.description,
//   //         blocks: template.blocks.map((block) => ({
//   //           ...block,
//   //           id: crypto.randomUUID(), // ensure clean IDs
//   //         })),
//   //       });
//   //       setActiveBlockId(null);
//   //     }
//   //   }
//   // }, [formId]);

//   useEffect(() => {
//     if (formId) {
//       const handleTemplateLoad = async () => {
//         loadTemplate(formId);
//       };
//       handleTemplateLoad();
//     }
//   }, [formId, pathname]);

//   /* ---------- ADD BLOCK ---------- */

//   const addBlock = (type: string) => {
//     const block: any = {
//       id: crypto.randomUUID(),
//       type,
//     };

//     if (type === "question") {
//       block.label = "Untitled Question";
//       block.questionType = "short_text";
//       block.required = false;
//       block.options = ["Option 1"];
//     }

//     if (type === "title") {
//       block.title = "Untitled title";
//       block.description = "";
//     }

//     setForm((prev) => ({
//       ...prev,
//       blocks: [...prev.blocks, block],
//     }));

//     setActiveBlockId(block.id);
//   };

//   const updateBlock = (id: string, updates: any) => {
//     setForm((prev) => ({
//       ...prev,
//       blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
//     }));
//   };

//   const deleteBlock = (id: string) => {
//     setForm((prev) => ({
//       ...prev,
//       blocks: prev.blocks.filter((b) => b.id !== id),
//     }));
//     setActiveBlockId(null);
//   };

//   const totalResponses = responses?.length ?? 0;

//   return (
//     <div
//       className="min-h-screen pb-12 pt-0 px-0 transition-colors"
//       style={{ backgroundColor: theme.backgroundColor }}
//     >
//       <div className="mx-0">
//         {/* Top Tool-Bar */}
//         <div className="grid grid-cols-3 justify-between items-center w-full max-w-full mx-auto mb-6 px-6 bg-white shadow-sm rounded-sm pt-3 pb-2 border-b border-slate-200">
//           <div className="flex gap-3 items-center">
//             <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-blue-300 flex items-center justify-center text-blue-700 text-3xl drop-shadow-md">
//               <GoChecklist className="w-6 h-6" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
//               Forms
//             </h1>
//             <div className="mx-2 flex gap-3">
//               {form?.title && (
//                 <span className="text-gray-600 text-sm">
//                   {"— " + form?.title}
//                 </span>
//               )}
//             </div>
//             <button
//               type="button"
//               title="Save"
//               className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <BsFloppy className="text-xl" />
//             </button>
//           </div>

//           {/* CENTER TABS */}
//           <div className="flex bg-slate-200/80 rounded-lg p-1 justify-center mx-auto">
//             {["questions", "responses", "settings"].map((tab) => {
//               const isActive = activeTab === tab;

//               return (
//                 <button
//                   type="button"
//                   key={tab}
//                   onClick={() => setActiveTab(tab as any)}
//                   className={`relative px-6 py-1.5 rounded-md text-sm font-medium transition cursor-pointer
//                 ${
//                   isActive
//                     ? "bg-white shadow text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//                 >
//                   <span className="flex items-center gap-2">
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}

//                     {/* 🔔 Responses count */}
//                     {tab === "responses" && totalResponses > 0 && (
//                       <span
//                         className={`ml-1 px-2 py-0.5 text-xs rounded-full font-semibold
//                 ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "bg-gray-300 text-gray-700"
//                 }`}
//                       >
//                         {totalResponses}
//                       </span>
//                     )}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* RIGHT ACTIONS */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               title="Theme"
//               onClick={() => setThemeOpen(true)}
//               className="mr-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500"
//             >
//               <IoColorPaletteOutline title="Theme" className="text-xl" />
//             </button>

//             <button
//               type="button"
//               title="Preview"
//               onClick={() => {
//                 router.push("/forms/" + form?.id + "/preview");
//               }}
//               className="mr-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <IoEyeOutline title="Preview" className="text-xl" />
//             </button>
//             <button
//               type="button"
//               title="Undo"
//               className="mr-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <AiOutlineUndo className="text-xl" />
//             </button>
//             <button
//               type="button"
//               title="Redo"
//               className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <AiOutlineRedo className="text-xl" />
//             </button>
//             <button
//               type="button"
//               title="Copy Response Link"
//               className="ml-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <FiLink2 className="text-xl" />
//             </button>
//             <button
//               type="button"
//               title="Share"
//               className="ml-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <TbUserShare className="text-xl" />
//             </button>

//             {/* <button
//               type="button"
//               title="Save"
//               className="ml-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <BsFloppy className="text-xl" />
//             </button> */}

//             <button
//               type="button"
//               title="Publish"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition relative bottom-1 ml-6 cursor-pointer"
//             >
//               Publish
//             </button>
//             <button
//               type="button"
//               title="More"
//               className="ml-2 p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition cursor-pointer hover:text-blue-500 duration-300"
//             >
//               <BsThreeDotsVertical className="text-xl" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* LOGO */}
//       <div className="bg-[#0d4db0] w-[45%] mx-auto rounded-lg mb-10">
//         <Image
//           src="/logo-title-2.png"
//           alt="Logo"
//           width={200}
//           height={100}
//           className="mx-auto rounded-full"
//         />
//       </div>

//       {activeTab === "questions" && (
//         <div className="max-w-3xl mx-auto space-y-8">
//           {/* FORM HEADER  */}
//           <FormHeader form={form} setForm={setForm} theme={theme} />

//           {/* BLOCKS */}
//           {form?.blocks?.map((block, index) => (
//             <div
//               key={block?.id}
//               className="relative text-gray-800"
//               onClick={() => setActiveBlockId(block?.id)}
//             >
//               {(activeBlockId === block?.id || index === 0) && (
//                 <FloatingToolbar onAdd={addBlock} />
//               )}

//               <BlockRenderer
//                 block={block}
//                 onChange={updateBlock}
//                 onDelete={deleteBlock}
//                 theme={theme}
//               />
//             </div>
//           ))}

//           {form.blocks.length < 1 && (
//             <div className="flex justify-center gap-3 bg-white border border-slate-200 shadow-lg rounded-lg p-2.5 mr-auto mt-2 w-auto max-w-[400px]">
//               <ToolbarIcon
//                 icon={
//                   <GoPlusCircle
//                     className={`cursor-pointer w-9 h-9 p-2 hover:border border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500`}
//                     title="Add question"
//                   />
//                 }
//                 onClick={() => addBlock("question")}
//               />

//               <ToolbarIcon
//                 icon={
//                   <BiImport
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Import questions"
//                   />
//                 }
//                 // onClick={() => addBlock("import")}
//               />

//               <ToolbarIcon
//                 icon={
//                   <MdTitle
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Add title and description"
//                   />
//                 }
//                 onClick={() => addBlock("title")}
//               />
//               <ToolbarIcon
//                 icon={
//                   <MdOutlineAudiotrack
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Add audio"
//                     onClick={() => addBlock("audio")}
//                   />
//                 }
//               />
//               <ToolbarIcon
//                 icon={
//                   <IoImageOutline
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Add image"
//                     onClick={() => addBlock("image")}
//                   />
//                 }
//               />
//               <ToolbarIcon
//                 icon={
//                   <IoVideocamOutline
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Add video"
//                   />
//                 }
//                 onClick={() => addBlock("video")}
//               />
//               <ToolbarIcon
//                 icon={
//                   <RxSection
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Add section"
//                     onClick={() => addBlock("section")}
//                   />
//                 }
//               />
//               <ToolbarIcon
//                 icon={
//                   <GoTable
//                     className="cursor-pointer w-9 h-9 p-2 hover:border hover:shadow-sm border-slate-200 hover:bg-slate-50 rounded-full transition-all duration-500"
//                     title="Add table"
//                     onClick={() => addBlock("table")}
//                   />
//                 }
//               />
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "responses" && (
//         <div className="max-w-3xl mx-auto text-gray-600">
//           <FormResponsesTab formId={pathname.split("/")[2]} />
//         </div>
//       )}

//       {activeTab === "settings" && (
//         <div className="max-w-3xl mx-auto text-gray-600">
//           <FormSettingsTab />
//         </div>
//       )}
//       <ThemePanel
//         open={themeOpen}
//         onClose={() => setThemeOpen(false)}
//         theme={theme}
//         setTheme={setTheme}
//       />
//     </div>
//   );
// }

// /* -----------------------------
//    FLOATING TOOLBAR
// ----------------------------- */

// function FloatingToolbar({ onAdd }: any) {
//   // Enhanced floating toolbar with more options
//   return (
//     <div className="absolute -right-18 top-4 bg-white border border-slate-200 rounded-xl shadow-lg p-2.5 flex flex-col gap-3 z-20">
//       <ToolbarIcon
//         icon={
//           <GoPlusCircle
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add question"
//           />
//         }
//         onClick={() => onAdd("question")}
//       />
//       <ToolbarIcon
//         icon={
//           <BiImport
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Import questions"
//           />
//         }
//       />
//       <ToolbarIcon
//         icon={
//           <MdTitle
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add title and description"
//           />
//         }
//         onClick={() => onAdd("title")}
//       />
//       <ToolbarIcon
//         icon={
//           <IoImageOutline
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add image"
//           />
//         }
//         onClick={() => onAdd("image")}
//       />
//       <ToolbarIcon
//         icon={
//           <MdOutlineAudiotrack
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add audio"
//             onClick={() => onAdd("audio")}
//           />
//         }
//       />
//       <ToolbarIcon
//         icon={
//           <IoVideocamOutline
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add video"
//           />
//         }
//         onClick={() => onAdd("video")}
//       />
//       <ToolbarIcon
//         icon={
//           <RxSection
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add section"
//           />
//         }
//         onClick={() => onAdd("section")}
//       />
//       <ToolbarIcon
//         icon={
//           <GoTable
//             className="cursor-pointer w-9 h-9 p-2 hover:bg-slate-50 rounded-full"
//             title="Add table"
//             onClick={() => onAdd("table")}
//           />
//         }
//       />
//     </div>
//   );
// }

// function ToolbarIcon({ icon, onClick }: any) {
//   return (
//     <button
//       onClick={onClick}
//       className="text-gray-600 hover:text-blue-600 transition text-xl"
//     >
//       {icon}
//     </button>
//   );
// }

// /* -----------------------------
//    QUESTION CARD (ENHANCED)
// ----------------------------- */

// export function QuestionCard({ block, onChange, onDelete, theme }: any) {
//   // Base input styling for inputs/selects
//   const baseInput =
//     "w-full px-4 py-2 rounded-lg border border-slate-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400";

//   // Update label handler
//   const handleLabelChange = (val: string) => {
//     onChange(block.id, { label: val });
//   };

//   // Update options handler for choices/dropdowns
//   const updateOption = (index: number, value: string) => {
//     const newOptions = [...(block.options || [])];
//     newOptions[index] = value;
//     onChange(block.id, { options: newOptions });
//   };

//   // Add new option
//   const addOption = () => {
//     const newOptions = [
//       ...(block.options || []),
//       `Option ${block.options.length + 1}`,
//     ];
//     onChange(block.id, { options: newOptions });
//   };

//   // Remove option
//   const removeOption = (index: number) => {
//     const newOptions = [...(block.options || [])];
//     newOptions.splice(index, 1);
//     onChange(block.id, { options: newOptions });
//   };

//   // Render input UI by questionType

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-4">
//       <div className="grid grid-cols-[60%_5%_30%] gap-3 items-center w-full">
//         <div className="flex-1">
//           <TiptapEditorWithToolbar
//             id={"question-label-" + block.id}
//             value={block.label}
//             placeholder="Question label"
//             onChange={handleLabelChange}
//             className="border-b border-slate-200 pb-2 grow focus:outline-none w-full flex-1"
//           />
//         </div>

//         <div>
//           <IoImageOutline
//             className="cursor-pointer w-10 h-10 p-2 hover:bg-slate-50 rounded-full text-gray-600"
//             title="Add inline image"
//           />
//         </div>

//         <div className="w-full">
//           <QuestionTypeDropdown
//             value={block.questionType}
//             onChange={(type) => onChange(block.id, { questionType: type })}
//           />
//         </div>
//       </div>

//       <div>
//         {renderQuestionInput(
//           baseInput,
//           block,
//           addOption,
//           updateOption,
//           removeOption,
//           onChange
//         )}
//       </div>

//       <div className="flex justify-between text-sm text-gray-500 mt-3 relative border border-slate-200 bg-white w-full rounded-2xl">
//         <div className="flex space-x-4 border-r mx-4 border-slate-200">
//           <button
//             onClick={() => onDelete(block.id)}
//             className="text-fray-500 hover:underline"
//           >
//             <GoCopy className="inline mb-0.5 mr-1 w-9 h-9 p-2 hover:bg-slate-50 hover:text-blue-500 rounded-full cursor-pointer" />
//           </button>

//           <button
//             onClick={() => onDelete(block.id)}
//             className="text-gray-500 hover:underline"
//           >
//             <GoTrash className="inline mb-0.5 w-9 h-9 p-2 hover:bg-slate-50 hover:text-blue-500 rounded-full cursor-pointer mr-4" />
//           </button>
//         </div>
//         <div className="flex gap-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={block.required}
//               onChange={(e) =>
//                 onChange(block.id, { required: e.target.checked })
//               }
//             />
//             Required
//           </label>
//           <button
//             onClick={() => onDelete(block.id)}
//             className="text-gray-500 hover:underline"
//           >
//             <BsThreeDotsVertical className="inline mb-0.5 mr-1 w-9 h-9 p-2 hover:bg-slate-50 hover:text-blue-500 rounded-full cursor-pointer" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FormHeader({ form, setForm, editor }: any) {
//   // local focus states to show/hide toolbar
//   const [titleFocused, setTitleFocused] = useState(false);
//   const [descFocused, setDescFocused] = useState(false);
//   const [activeEditor, setActiveEditor] = useState<any>(null);

//   return (
//     <div className="flex flex-col space-y-6">
//       <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-8 space-y-4">
//         {/* Title editor */}
//         <TiptapEditorWithToolbar
//           id="title"
//           value={form.title || ""}
//           placeholder="Untitled Form"
//           onChange={(content) => setForm({ ...form, title: content })}
//           className="text-3xl font-semibold border-b border-slate-200 pb-1"
//         />

//         {titleFocused && <FormattingToolbar editor={editor} editorId="title" />}

//         {/* Description editor */}
//         <TiptapEditorWithToolbar
//           id="description"
//           value={form.description || ""}
//           placeholder="Form description (optional)"
//           onChange={(content) => setForm({ ...form, description: content })}
//           className="text-gray-600 border-b border-slate-200 pb-1 min-h-[3rem]"
//         />
//       </div>
//     </div>
//   );
// }
