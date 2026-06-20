// app/components/ImageUpload.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  fileUrl: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ fileUrl, onChange }: Props) {
  const [localPreview, setLocalPreview] = useState<string>("");

  const preview = localPreview || fileUrl || "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      setLocalPreview(result);
      onChange(result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-full max-h-60 object-cover rounded-lg border border-white/10"
          width={400}
          height={240}
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-sm w-full"
      />
    </div>
  );
}