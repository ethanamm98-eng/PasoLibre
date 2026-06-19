"use client";
import React, { useState } from "react";

const FloatingLabelTextarea = ({
  id,
  name,
  label,
  value,
  onChange,
  rows = 4,
  maxLength,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-2 relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`w-full text-gray-800 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
      />

      <label
        htmlFor={id}
        className={`absolute text-sm transition-all duration-500 left-3 px-1 bg-white pointer-events-none ${
          isFocused || value
            ? "-top-2 text-xs text-blue-600"
            : "top-2.75 text-gray-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelTextarea;
