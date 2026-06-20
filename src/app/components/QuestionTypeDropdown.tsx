import { useState } from "react";
import { MdOutlineShortText, MdLinearScale } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegDotCircle } from "react-icons/fa";
import { RxCheckbox } from "react-icons/rx";
import { IoIosArrowDropdown, IoIosStarOutline } from "react-icons/io";
import { BsCalendarDate } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const QUESTION_TYPE_OPTIONS = [
  {
    type: "short_text",
    label: "Short answer",
    icon: MdOutlineShortText,
    section: "text",
  },
  {
    type: "long_text",
    label: "Paragraph",
    icon: GrTextAlignFull,
    section: "text",
  },
  {
    type: "number",
    label: "Number",
    icon: TbNumbers,
    section: "text",
  },
  {
    type: "multiple_choice",
    label: "Multiple choice",
    icon: FaRegDotCircle,
    section: "choices",
  },
  {
    type: "boolean",
    label: "Yes / No",
    icon: RxCheckbox,
    section: "choices",
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    icon: RxCheckbox,
    section: "choices",
  },
  {
    type: "dropdown",
    label: "Dropdown",
    icon: IoIosArrowDropdown,
    section: "choices",
  },
  {
    type: "file_upload",
    label: "File upload",
    icon: IoCloudUploadOutline,
    section: "upload",
  },
  {
    type: "linear_scale",
    label: "Linear Scale",
    icon: MdLinearScale,
    section: "grid",
  },
  {
    type: "rating",
    label: "Rating",
    icon: IoIosStarOutline,
    section: "grid",
  },
  {
    type: "multiple_choice_grid",
    label: "Multiple Choice Grid",
    icon: CgMenuGridO,
    section: "grid",
  },
  {
    type: "checkbox_grid",
    label: "Checkbox Grid",
    icon: BsGrid3X3GapFill,
    section: "grid",
  },
  {
    type: "date",
    label: "Date",
    icon: BsCalendarDate,
    section: "date",
  },
  {
    type: "time",
    label: "Time",
    icon: GoClock,
    section: "date",
  },
];

const SECTION_TITLES: Record<string, string> = {
  text: "Text",
  choices: "Choices",
  upload: "File Upload",
  grid: "Grid",
  date: "Date & Time",
};

export function QuestionTypeDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (type: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const active = QUESTION_TYPE_OPTIONS.find((o) => o.type === value);
  const ActiveIcon = active?.icon;

  // Group options by section
  const optionsBySection = QUESTION_TYPE_OPTIONS.reduce<
    Record<string, typeof QUESTION_TYPE_OPTIONS>
  >((acc, option) => {
    if (!acc[option.section]) acc[option.section] = [];
    acc[option.section].push(option);
    return acc;
  }, {});

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(() => {
    // Default all sections open on menu open for better UX
    const allSections: Record<string, boolean> = {};
    for (const sec of Object.keys(optionsBySection)) {
      allSections[sec] = true;
    }
    return allSections;
  });

  // Toggle a section open/closed
  function toggleSection(section: string) {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="relative min-w-60 w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center w-full gap-2 h-12 border border-slate-300 rounded-lg px-4 text-sm bg-white hover:bg-gray-50 transition-colors duration-150"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {ActiveIcon && <ActiveIcon className="text-gray-600" />}
        <span className="capitalize grow text-gray-800">
          {active?.label ?? value.replace("_", " ")}
        </span>
        <IoIosArrowDropdown className="ml-1 text-blue-600" />
      </button>

      {/* Menu */}
      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-full max-h-80 overflow-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50"
          role="listbox"
        >
          {Object.entries(optionsBySection).map(
            ([section, options], i, arr) => {
              const isExpanded = expandedSections[section];

              return (
                <div key={section} className="px-3 py-2">
                  {/* Section header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase mb-2 select-none hover:text-gray-700 transition-colors duration-150"
                    aria-expanded={isExpanded}
                    aria-controls={`section-${section}`}
                  >
                    <span>{SECTION_TITLES[section] ?? section}</span>
                    {isExpanded ? (
                      <IoChevronUp className="text-lg" />
                    ) : (
                      <IoChevronDown className="text-lg" />
                    )}
                  </button>

                  {/* Options in this section */}
                  {isExpanded && (
                    <div id={`section-${section}`}>
                      {options.map((opt) => {
                        const Icon = opt.icon;
                        const isActive = opt.type === value;

                        return (
                          <button
                            key={opt.type}
                            onClick={() => {
                              onChange(opt.type);
                              setOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm
                            transition-colors duration-150
                            ${
                              isActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            role="option"
                            aria-selected={isActive}
                          >
                            <Icon className="text-lg" />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Divider except after last section */}
                  {i !== arr.length - 1 && (
                    <hr className="my-2 border-t border-gray-200" />
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
