"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FloatingLabelInput = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  maxLength,
  disabled,
  autoComplete = "off",
  readOnly,
  min,
  max,
  step,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  autoComplete?: string;
  readOnly?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const hasValue =
    value !== undefined && value !== null && String(value).length > 0;

  const isDateLike =
    type === "date" ||
    type === "time" ||
    type === "datetime-local" ||
    type === "month";

  return (
    <div className="relative mb-2">
      <input
        type={inputType}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isDateLike ? "" : " "}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        className={`w-full rounded-md border border-gray-400 bg-white px-3 py-2 pr-10 text-gray-800 transition truncate row-span-1
          ${disabled ? "cursor-not-allowed bg-gray-200" : ""}
          ${
            readOnly
              ? "bg-opacity-90"
              : "focus:outline-none focus:ring-1 focus:ring-blue-500"
          }
          autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]`}
      />

      <label
        htmlFor={id}
        className={`absolute left-3 bg-white px-1 text-sm transition-all duration-300 truncate max-w-[90%] ${
          isFocused || hasValue
            ? "-top-2 text-xs text-blue-600"
            : "top-2.5 text-gray-500"
        }`}
      >
        {label}
      </label>

      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600 duration-300 hover:scale-105 hover:text-[#0d4db0]"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default FloatingLabelInput;
