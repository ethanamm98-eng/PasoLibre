"use client";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiTwotoneStar,
  AiFillHeart,
  AiOutlineHeart,
  AiTwotoneHeart,
} from "react-icons/ai";

export function InteractiveRating({
  value = 0,
  onChange,
  maxStars = 5,
  iconType = "star",
}: {
  value?: number;
  onChange?: (val: number) => void;
  maxStars?: number;
  iconType?: "star" | "heart";
}) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starsCount = Math.min(Math.max(maxStars, 3), 10);

  const icons = {
    star: {
      full: AiFillStar,
      half: AiTwotoneStar,
      empty: AiOutlineStar,
      fullClass: "text-blue-600 scale-110 drop-shadow-sm",
      halfClass: "text-blue-500 scale-105",
      emptyClass: "text-blue-300 hover:text-blue-400",
    },
    heart: {
      full: AiFillHeart,
      half: AiTwotoneHeart,
      empty: AiOutlineHeart,
      fullClass: "text-red-600 scale-110 drop-shadow-sm",
      halfClass: "text-red-500 scale-105",
      emptyClass: "text-red-300 hover:text-red-400",
    },
  };

  const { full, half, empty, fullClass, halfClass, emptyClass } =
    icons[iconType];

  const renderIcon = (index: number) => {
    const ratingToUse = hoverValue !== null ? hoverValue : value;

    if (ratingToUse >= index) {
      return React.createElement(full, {
        className: `transition-all duration-200 ease-out ${fullClass}`,
      });
    }

    if (ratingToUse + 0.5 >= index) {
      return React.createElement(half, {
        className: `transition-all duration-200 ease-out ${halfClass}`,
        style: { clipPath: "inset(0 50% 0 0)" },
      });
    }

    return React.createElement(empty, {
      className: `transition-all duration-200 ease-out ${emptyClass}`,
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLSpanElement>,
    starNumber: number
  ) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX;
    const isHalf = mouseX - left < width / 2;
    const newValue = isHalf ? starNumber - 0.5 : starNumber;

    setHoverValue((prev) => (prev === newValue ? prev : newValue));
  };

  const handleClick = (starValue: number) => {
    if (onChange) onChange(starValue);
  };

  return (
    <div
      className="flex space-x-1 text-3xl cursor-pointer select-none m-4"
      onMouseLeave={() => setHoverValue(null)}
      aria-label="Rating"
    >
      {[...Array(starsCount)].map((_, i) => {
        const starNumber = i + 1;
        return (
          <span
            key={starNumber}
            onMouseMove={(e) => handleMouseMove(e, starNumber)}
            onClick={() =>
              handleClick(hoverValue !== null ? hoverValue : starNumber)
            }
            className="transition-transform duration-150 hover:scale-125"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(hoverValue !== null ? hoverValue : starNumber);
              }
            }}
            aria-label={`${starNumber} ${iconType}`}
          >
            {renderIcon(starNumber)}
          </span>
        );
      })}
    </div>
  );
}

// Wrapper component to control maxStars and iconType dynamically
export function RatingWithControls() {
  const [maxStars, setMaxStars] = useState(5);
  const [iconType, setIconType] = useState<"star" | "heart">("star");
  const [value, setValue] = useState(0);

  return (
    <div className="p-4 max-w-md mx-auto border border-slate-200 rounded shadow space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <label className="flex flex-col text-sm font-semibold">
          Number of Icons (3 to 10)
          <input
            type="number"
            min={3}
            max={10}
            value={maxStars}
            onChange={(e) => {
              const val = Math.min(10, Math.max(3, Number(e.target.value)));
              setMaxStars(val);
              if (value > val) setValue(val); // clamp value to maxStars
            }}
            className="mt-1 p-1 rounded border border-gray-300 w-20"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold">
          Icon Type
          <select
            value={iconType}
            onChange={(e) => setIconType(e.target.value as "star" | "heart")}
            className="mt-1 p-1 rounded border border-gray-300 w-36"
          >
            <option value="star">Star</option>
            <option value="heart">Heart</option>
          </select>
        </label>
      </div>

      {/* Interactive Rating */}
      <InteractiveRating
        value={value}
        onChange={setValue}
        maxStars={maxStars}
        iconType={iconType}
      />

      {/* Display current value */}
      <div className="text-center text-sm text-gray-700">
        Selected rating: {value}
      </div>
    </div>
  );
}
