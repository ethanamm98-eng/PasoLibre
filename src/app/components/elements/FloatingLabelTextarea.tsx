"use client";

import React, { useState } from "react";

interface FloatingLabelTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
}

export default function FloatingLabelTextarea({
  id,
  name,
  label,
  value,
  onChange,
  rows = 5,
  maxLength,
  disabled,
}: FloatingLabelTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const floating = isFocused || value.length > 0;

  return (
    <div className="relative mb-3">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full
          resize-none
          rounded-xl
          border
          px-4
          pt-5
          pb-3
          text-[15px]
          font-medium
          leading-6
          text-slate-800
          shadow-sm
          transition-all
          duration-200

          ${
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-slate-300 bg-white hover:border-slate-400"
          }

          ${
            !disabled &&
            "focus:border-[#0d4db0] focus:ring-4 focus:ring-[#0d4db0]/10 focus:outline-none"
          }
        `}
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none
          absolute
          left-3
          origin-left
          rounded-full
          bg-white
          transition-all
          duration-200

          ${
            floating
              ? "-top-2 px-2 text-[11px] font-semibold text-[#0d4db0] shadow-sm"
              : "top-4 px-1 text-sm font-medium text-slate-500"
          }
        `}
      >
        {label}
      </label>

      {maxLength && (
        <div className="mt-1 flex justify-end">
          <span className="text-[11px] font-medium text-slate-400">
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}