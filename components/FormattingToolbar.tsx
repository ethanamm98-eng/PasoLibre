import React from "react";
import { RxFontBold } from "react-icons/rx";
import { MdOutlineFormatItalic } from "react-icons/md";
import { TbUnderline } from "react-icons/tb";
import { IoLinkOutline } from "react-icons/io5";
import { LiaRemoveFormatSolid } from "react-icons/lia";
import { BsListOl, BsListUl } from "react-icons/bs";
import { Editor } from "@tiptap/react";

export default function FormattingToolbar({
  editor,
  editorId,
  fieldName,
}: {
  editor: Editor | null;
  editorId: string;
  fieldName?: string;
}) {
  if (!editor) return null;

  const btn = (action: () => void, active = false, icon: React.ReactNode) => (
    <button
      onMouseDown={(e) => {
        e.preventDefault(); // 🔥 THIS FIXES EVERYTHING
        action();
      }}
      className={`p-1 rounded hover:bg-gray-200 ${active ? "bg-gray-200" : ""}`}
    >
      {icon}
    </button>
  );

  return (
    <div
      data-editor={editorId}
      className="flex gap-2 mt-2 bg-white border border-slate-200 shadow rounded-lg p-2"
    >
      {btn(
        () => editor.chain().focus().toggleBold().run(),
        editor.isActive("bold"),
        <RxFontBold />
      )}

      {btn(
        () => editor.chain().focus().toggleItalic().run(),
        editor.isActive("italic"),
        <MdOutlineFormatItalic />
      )}

      {btn(
        () => editor.chain().focus().toggleUnderline().run(),
        editor.isActive("underline"),
        <TbUnderline />
      )}

      {btn(
        () => {
          const url = prompt("Enter link");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        },
        editor.isActive("link"),
        <IoLinkOutline />
      )}

      {fieldName !== "Title" &&
        btn(
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList"),
          <BsListUl />
        )}

      {fieldName !== "Title" &&
        btn(
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList"),
          <BsListOl />
        )}

      {btn(
        () => editor.chain().focus().unsetAllMarks().run(),
        false,
        <LiaRemoveFormatSolid />
      )}
    </div>
  );
}
