"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface SelectOption {
  value: string;
  label: string;
}

const FloatingLabelSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  disabled?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-2 mt-3 relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`w-full text-gray-800 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
      >
        {/* Empty option keeps label floating logic consistent */}
        <option value="" disabled hidden />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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

      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <IoChevronDownSharp size={16} />
      </div>
    </div>
  );
};

export default FloatingLabelSelect;
