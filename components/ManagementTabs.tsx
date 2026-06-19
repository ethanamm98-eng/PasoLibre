"use client";
import { useState, useEffect } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
}

export default function ManagementTabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Scroll to section on click
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(id);
    }
  };

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 + 600; // offset for sticky tabs + navbar height
      for (let i = tabs.length - 1; i >= 0; i--) {
        const el = document.getElementById(tabs[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  return (
    <div className="flex flex-wrap justify-center gap-3 bg-white border border-slate-200 rounded-2xl p-2 mb-10 sticky top-24 z-50 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            activeTab === tab.id
              ? "bg-[#0d4db0] text-white shadow"
              : "bg-white text-slate-600 hover:bg-[#0d4db0]/10"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
