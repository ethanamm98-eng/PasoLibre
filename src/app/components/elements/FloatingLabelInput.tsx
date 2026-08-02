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

  const floating = isFocused || hasValue;

  return (
    <div className={`relative mb-3  ${floating ? "" : "overflow-x-hidden"}`}>
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
        className={`truncate overflow-x-hidden
          w-full
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
              : readOnly
                ? "border-slate-200 bg-slate-50"
                : "border-slate-300 bg-white hover:border-slate-400"
          }

          ${
            !disabled &&
            !readOnly &&
            "focus:border-[#0d4db0] focus:ring-4 focus:ring-[#0d4db0]/10 focus:outline-none"
          }

          autofill:bg-white
          autofill:shadow-[inset_0_0_0px_1000px_white]
        `}
      />

      <label
        htmlFor={id}
        className={`truncate
          pointer-events-none
          absolute
          left-3
          origin-left
          rounded-full
          bg-white
          px-2
          font-semibold
          transition-all
          duration-200

          ${
            floating
              ? "-top-2 text-[11px] text-[#0d4db0] shadow-sm"
              : "top-3.5 px-1 text-sm font-medium text-slate-500 overflow-x-hidden"
          }
        `}
      >
        {label}
      </label>

      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition-all
            duration-200
            hover:scale-110
            hover:text-[#0d4db0]
            active:scale-95
          "
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default FloatingLabelInput;