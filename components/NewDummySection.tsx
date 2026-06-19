"use client";
import { FiPlus } from "react-icons/fi";

export default function AddSectionPlaceholder({
  onClick,
  label = "Add new section",
}: {
  onClick?: () => void;
  label?: string;
}) {
  return (
    <section className="w-full py-20 px-6 mb-14">
      <div
        onClick={onClick}
        className="group relative max-w-5xl mx-auto cursor-pointer rounded-3xl border-2 border-dashed border-blue-200 bg-white/70 hover:bg-blue-50/40 transition-all duration-300 ease-out"
      >
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-blue-100/40 via-transparent to-indigo-100/40 pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center py-24 text-center">
          {/* Plus Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-blue-300 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
            <FiPlus className="text-3xl text-blue-600" />
          </div>

          {/* Label */}
          <p className="mt-6 text-sm md:text-base font-medium tracking-wide text-blue-700 group-hover:text-blue-800 transition">
            {label}
          </p>

          {/* Helper text */}
          <p className="mt-1 text-xs text-gray-500">
            Click to add a new section
          </p>
        </div>
      </div>
    </section>
  );
}
