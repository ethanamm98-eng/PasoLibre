import { Editor, EditorContent } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Redo2,
  Undo2,
} from "lucide-react";

export function RichTextField({ editor }: { editor: Editor | null }) {
  const editorClasses =
    "min-h-40 max-w-none focus:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:min-h-40 [&_.ProseMirror]:outline-none [&_.ProseMirror]:text-sm [&_.ProseMirror]:leading-7 [&_.ProseMirror]:text-slate-700 [&_.ProseMirror_p]:mb-3 [&_.ProseMirror_ul]:my-3 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:my-3 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_li]:pl-1 [&_.ProseMirror_li_p]:m-0";

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
        <div className="flex flex-wrap gap-1 bg-slate-50 p-2">
          <EditorButton
            onClick={() => editor?.chain().focus().toggleBold().run()}
            active={editor?.isActive("bold")}
          >
            <Bold className="h-4 w-4" />
          </EditorButton>

          <EditorButton
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            active={editor?.isActive("italic")}
          >
            <Italic className="h-4 w-4" />
          </EditorButton>

          <EditorButton
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            active={editor?.isActive("bulletList")}
          >
            <List className="h-4 w-4" />
          </EditorButton>

          <EditorButton
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            active={editor?.isActive("orderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </EditorButton>

          <EditorButton
            onClick={() => editor?.chain().focus().setParagraph().run()}
            active={editor?.isActive("paragraph")}
          >
            <Pilcrow className="h-4 w-4" />
          </EditorButton>

          <EditorButton onClick={() => editor?.chain().focus().undo().run()}>
            <Undo2 className="h-4 w-4" />
          </EditorButton>

          <EditorButton onClick={() => editor?.chain().focus().redo().run()}>
            <Redo2 className="h-4 w-4" />
          </EditorButton>
        </div>

        <div className="p-4">
          <EditorContent editor={editor} className={editorClasses} />
        </div>
      </div>
    </div>
  );
}

export function RichToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const items = [
    {
      icon: <Pilcrow className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      active: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <Italic className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <List className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      icon: <Undo2 className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().undo().run(),
      active: false,
    },
    {
      icon: <Redo2 className="h-4 w-4 cursor-pointer" />,
      onClick: () => editor.chain().focus().redo().run(),
      active: false,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-3">
      {items?.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={item.onClick}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition cursor-pointer ${
            item.active
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

export function EditorButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border text-slate-600 transition ${
        active
          ? "border-blue-200 bg-blue-50 text-[#0d4db0]"
          : "border-slate-200 bg-white hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
