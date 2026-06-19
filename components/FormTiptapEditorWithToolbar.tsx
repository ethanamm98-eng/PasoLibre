import React, { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import FormattingToolbar from "./FormattingToolbar";

export default function TiptapEditorWithToolbar({
  id,
  value,
  placeholder,
  onChange,
  className,
}: {
  id: string;
  value: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      if (typeof onChange === "function") {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: `focus:outline-none ${className || ""} p-2 font-light`,
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value === undefined || value === null) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  // Focus and blur handlers to manage toolbar visibility, avoid flicker when clicking toolbar buttons
  const handleFocus = () => setFocused(true);
  const handleBlur = (event: React.FocusEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget as Node)
    ) {
      setFocused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1} // enables div focus events to capture editor focus
      className={`relative`}
    >
      <div
        className={`${
          focused
            ? "bg-slate-50 border-b-2 border-[#0d4db0] text-gray-800"
            : "text-gray-500"
        }`}
      >
        <EditorContent editor={editor} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          focused ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <FormattingToolbar editor={editor} editorId={id} />
      </div>
    </div>
  );
}
