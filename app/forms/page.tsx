"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { GoChecklist, GoPlus } from "react-icons/go";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { BsSortAlphaUp, BsSortAlphaDown } from "react-icons/bs";

import { FORM_TEMPLATES, RECENT_FORMS } from "../lib/dummyData/forms";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

type ViewMode = "grid" | "list";
type SortMode = "az" | "za";

/* -----------------------------
   DATE FORMATTER
----------------------------- */
const formatDate = (date: string) =>
  new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function FormsPage() {
  const router = useRouter();

  const [templateView, setTemplateView] = useState<ViewMode>("grid");
  const [existingView, setExistingView] = useState<ViewMode>("grid");
  const [templateSortMode, setTemplateSortMode] = useState<SortMode>("az");
  const [sortMode, setSortMode] = useState<SortMode>("az");

  const [templateSearch, setTemplateSearch] = useState("");
  const [recentSearch, setRecentSearch] = useState("");

  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [showAllRecent] = useState(false);

  const sortedTemplates = useMemo(() => {
    const forms = [...FORM_TEMPLATES].filter((f) =>
      f.title.toLowerCase().includes(templateSearch.toLowerCase())
    );

    forms.sort((a, b) =>
      templateSortMode === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return forms;
  }, [templateSearch, templateSortMode]);

  const filteredRecent = useMemo(() => {
    const forms = RECENT_FORMS.filter((f) =>
      f.title.toLowerCase().includes(recentSearch.toLowerCase())
    );

    forms.sort((a, b) =>
      sortMode === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return forms;
  }, [recentSearch, sortMode]);

  return (
    <UnderConstructionOverlay
      title="Forms Management"
      description="This page is currently under development."
    />
  );

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen py-14 px-6"
        style={{
          background:
            "radial-gradient(circle at top, rgba(13,77,176,0.08) 0%, #ffffff 60%)",
        }}
      >
        {/* HEADER */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-200 p-8">
            <div className="grid grid-cols-3 items-center">
              <div className="flex">
                <button
                  type="button"
                  onClick={() => router.push("/admin-dashboard")}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition group cursor-pointer"
                >
                  <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                  Dashboard
                </button>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-800">
                  Your forms
                </h1>
                <p className="text-gray-500 mt-1">
                  Create and manage your forms
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => router.push("/forms/new")}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl cursor-pointer
                    bg-linear-to-r from-blue-600 to-blue-800
                    hover:from-blue-700 hover:to-blue-900
                    text-white shadow-md hover:shadow-lg
                    transition-all hover:scale-[1.03]"
                >
                  <GoPlus />
                  New form
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =======================
            TEMPLATES
        ======================= */}
        <div className="max-w-6xl mx-auto mb-16">
          <div
            className="flex justify-between items-center flex-wrap gap-4 mb-6
            bg-linear-to-br from-blue-50 to-white
            rounded-2xl p-5 border border-blue-100
            shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          >
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-blue-600" />
                Templates
              </h2>
              <p className="text-gray-500 mt-1">
                Create or choose from your existing templates
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="Search templates..."
                  className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200
                    bg-white shadow-sm focus:outline-none
                    focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setTemplateSortMode(templateSortMode === "az" ? "za" : "az")
                  }
                  className="p-2 hover:bg-blue-50 transition cursor-pointer"
                >
                  {templateSortMode === "za" ? (
                    <BsSortAlphaUp />
                  ) : (
                    <BsSortAlphaDown />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setTemplateView(templateView === "list" ? "grid" : "list")
                  }
                  className="p-2 border-l border-slate-200 hover:bg-blue-50 transition cursor-pointer"
                >
                  {templateView === "list" ? (
                    <HiOutlineViewGrid />
                  ) : (
                    <HiOutlineViewList />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${
              templateView === "grid" ? "sm:grid-cols-2 md:grid-cols-3" : ""
            } relative grid grid-cols-1  gap-6 transition-all duration-500 w-full 
                ${showAllTemplates ? "max-h-500" : "max-h-105"}`}
          >
            <div className="absolute inset-0 pointer-events-none rounded-3xl" />
            {templateView === "grid" ? (
              <>
                <CreateFormCard
                  label="New template"
                  onClick={() => router.push("/forms/new")}
                />

                {(showAllTemplates
                  ? sortedTemplates
                  : sortedTemplates.slice(0, 2)
                ).map((form) => (
                  <FormCard
                    key={form.id}
                    form={form}
                    date={formatDate(form.updatedAt)}
                    onClick={() => router.push(`/forms/${form.id}`)}
                  />
                ))}
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow w-full">
                {(showAllTemplates
                  ? sortedTemplates
                  : sortedTemplates.slice(0, 2)
                ).map((form) => (
                  <ListRow
                    key={form.id}
                    title={form.title}
                    description={form.description}
                    date={formatDate(form.updatedAt)}
                    onClick={() => router.push(`/forms/${form.id}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {sortedTemplates.length > 2 && (
            <button
              onClick={() => setShowAllTemplates(!showAllTemplates)}
              className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition"
            >
              <FiChevronDown
                className={`transition-transform ${
                  showAllTemplates ? "rotate-180" : ""
                }`}
              />
              {showAllTemplates ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Elegant divider between sections */}
        <hr className="max-w-6xl mx-auto my-12 border-0 h-[1.5px] bg-linear-to-r from-blue-300 via-transparent to-emerald-300 rounded" />

        {/* =======================
            EXISTING FORMS
        ======================= */}
        <div
          className="max-w-6xl mx-auto mb-6 flex justify-between items-center
          bg-linear-to-br from-emerald-50 to-white
          rounded-2xl p-5 border border-emerald-100
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        >
          <div>
            <h2 className="text-2xl font-semibold text-emerald-800 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-emerald-600" />
              Your forms
            </h2>
            <p className="text-gray-500 mt-1">Previously created forms</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                value={recentSearch}
                onChange={(e) => setRecentSearch(e.target.value)}
                placeholder="Search forms..."
                className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200
                  bg-white shadow-sm focus:outline-none
                  focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setSortMode(sortMode === "az" ? "za" : "az")}
                className="p-2 hover:bg-blue-50 transition cursor-pointer"
              >
                {sortMode === "za" ? <BsSortAlphaUp /> : <BsSortAlphaDown />}
              </button>

              <button
                type="button"
                onClick={() =>
                  setExistingView(existingView === "list" ? "grid" : "list")
                }
                className="p-2 border-l border-slate-200 hover:bg-blue-50 transition cursor-pointer"
              >
                {existingView === "list" ? (
                  <HiOutlineViewGrid />
                ) : (
                  <HiOutlineViewList />
                )}
              </button>
            </div>
          </div>
        </div>

        {existingView === "grid" ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <CreateFormCard onClick={() => router.push("/forms/new")} />
            {(showAllRecent ? filteredRecent : filteredRecent.slice(0, 2)).map(
              (form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  date={formatDate(form.updatedAt)}
                  onClick={() => router.push(`/forms/${form.id}`)}
                />
              )
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow">
            {(showAllRecent ? filteredRecent : filteredRecent.slice(0, 2)).map(
              (form) => (
                <ListRow
                  key={form.id}
                  title={form.title}
                  description={form.description}
                  date={formatDate(form.updatedAt)}
                  onClick={() => router.push(`/forms/${form.id}`)}
                />
              )
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

/* -----------------------------
   SHARED COMPONENTS
----------------------------- */

function CreateFormCard({
  onClick,
  label = "Blank form",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="h-56 rounded-2xl border-2 border-dashed border-slate-200 cursor-pointer
        bg-white flex flex-col items-center justify-center gap-3
        hover:border-blue-500 hover:shadow-lg hover:scale-[1.03]
        transition-all"
    >
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
        <GoPlus className="text-2xl text-blue-600" />
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function FormCard({
  form,
  onClick,
  date,
}: {
  form: {
    id: string;
    title: string;
    description: string;
  };
  onClick: () => void;
  date: string;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200 cursor-pointer
        shadow-[0_10px_25px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
        hover:ring-2 hover:ring-emerald-500/20
        hover:scale-[1.03] transition-all text-left overflow-hidden"
    >
      <div className="h-28 bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <Image
          src="/logo-title-2.jpg"
          alt="Preview"
          width={80}
          height={40}
          className="rounded-full bg-white p-1"
        />
      </div>

      <div className="p-5">
        <h3 className="font-semibold truncate">{form.title}</h3>
        <p className="text-sm text-gray-500 truncate">{form.description}</p>
        <p className="text-xs text-gray-400 pt-2">{date}</p>
      </div>
    </button>
  );
}

function ListRow({
  title,
  description,
  date,
  onClick,
}: {
  title: string;
  description: string;
  date: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 px-6 py-4
        border-b last:border-b-0 border-slate-200
        hover:bg-emerald-50/50 transition cursor-pointer"
    >
      <div
        className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-emerald-200
        flex items-center justify-center text-emerald-700 text-xl"
      >
        <GoChecklist />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>

      <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
    </div>
  );
}
