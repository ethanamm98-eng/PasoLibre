"use client";

import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface SelectOption {
  value: string;
  label: string;
}

interface FloatingLabelSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  disabled?: boolean;
}

const FloatingLabelSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  disabled,
}: FloatingLabelSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const floating = isFocused || value?.length > 0;

  return (
    <div className="relative mb-3">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`
          w-full
          appearance-none
          rounded-xl
          border
          px-4
          py-3
          pr-11
          text-[15px]
          font-medium
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
      >
        <option value="" disabled hidden />

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className={`
          pointer-events-none
          absolute
          left-3
          origin-left
          rounded-full
          bg-white
          px-2
          transition-all
          duration-200

          ${
            floating
              ? "-top-2 text-[11px] font-semibold text-[#0d4db0] shadow-sm"
              : "top-3.5 px-1 text-sm font-medium text-slate-500"
          }
        `}
      >
        {label}
      </label>

      <div
        className={`
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-400
          transition-all
          duration-200

          ${isFocused ? "rotate-180 text-[#0d4db0]" : ""}
        `}
      >
        <IoChevronDownSharp size={18} />
      </div>
    </div>
  );
};

export default FloatingLabelSelect;