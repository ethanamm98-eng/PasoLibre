"use client";
import { useState, useEffect } from "react";
import { useProviders } from "../context/providers/providersContext";
import { dummyCategories, dummyProviders } from "../lib/dummyData/providers";

export default function ManageProviders() {
  const {
    categories,
    setCategories,
    providers,
    setProviders,
    addCategory,
    addProvider,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    approveProvider,
    deleteProvider,
  } = useProviders();

  // Initialize with dummy data for testing
  useEffect(() => {
    setCategories(dummyCategories);
    setProviders(dummyProviders as unknown as never[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Drawer State ---------------- */

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProviderOpen, setIsProviderOpen] = useState(false);

  /* ---------------- Form State ---------------- */

  const [titleEn, setTitleEn] = useState("");
  const [titleEs, setTitleEs] = useState("");

  const [name, setName] = useState("");
  const [specialtyEn, setSpecialtyEn] = useState("");
  const [specialtyEs, setSpecialtyEs] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState("");

  /* ---------------- Edit State ---------------- */

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingProviderId, setEditingProviderId] = useState<string | null>(
    null
  );

  /* ---------------- ESC to Close ---------------- */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCategoryOpen(false);
        setIsProviderOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ---------------- Handlers ---------------- */

  const handleAddCategory = () => {
    if (!titleEn || !titleEs) return;

    if (editingCategoryId) {
      // Edit existing category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategoryId
            ? { ...cat, title: { en: titleEn, es: titleEs } }
            : cat
        )
      );
      setEditingCategoryId(null);
    } else {
      addCategory({
        id: crypto.randomUUID(),
        title: { en: titleEn, es: titleEs },
      });
    }

    setTitleEn("");
    setTitleEs("");
    setIsCategoryOpen(false);
  };

  const handleAddProvider = () => {
    if (!name || !specialtyEn || !specialtyEs || !location || !categoryId)
      return;

    if (editingProviderId) {
      // Edit existing provider
      setProviders((prev) =>
        prev.map((prov) =>
          prov.id === editingProviderId
            ? {
                ...prov,
                name,
                specialty: { en: specialtyEn, es: specialtyEs },
                location,
                categoryId,
              }
            : prov
        )
      );
      setEditingProviderId(null);
    } else {
      addProvider({
        id: crypto.randomUUID(),
        name,
        specialty: { en: specialtyEn, es: specialtyEs },
        location,
        categoryId,
        status: "pending",
      });
    }

    setName("");
    setSpecialtyEn("");
    setSpecialtyEs("");
    setLocation("");
    setCategoryId("");
    setIsProviderOpen(false);
  };

  const handleEditCategory = (cat: {
    id: string;
    title: { en: string; es: string };
  }) => {
    setTitleEn(cat.title.en);
    setTitleEs(cat.title.es);
    setEditingCategoryId(cat.id);
    setIsCategoryOpen(true);
  };

  const handleDeleteCategory = (catId: string) => {
    // Remove category and all its providers
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setProviders((prev) => prev.filter((p) => p.categoryId !== catId));
  };

  const handleEditProvider = (prov: {
    id: string;
    name: string;
    specialty: { en: string; es: string };
    location: string;
    categoryId: string;
  }) => {
    setName(prov.name);
    setSpecialtyEn(prov.specialty.en);
    setSpecialtyEs(prov.specialty.es);
    setLocation(prov.location);
    setCategoryId(prov.categoryId);
    setEditingProviderId(prov.id);
    setIsProviderOpen(true);
  };

  const handleDeleteProvider = (provId: string) => {
    deleteProvider(provId);
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      id="providers"
      className="relative max-w-6xl mx-auto py-20 space-y-16 px-6"
    >
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-[#0d4db0]">
          Providers Management
        </h1>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsCategoryOpen(true);
              setEditingCategoryId(null);
              setTitleEn("");
              setTitleEs("");
            }}
            className="px-6 py-3 bg-[#0d4db0] text-white rounded-xl hover:opacity-90 transition"
          >
            + Add Category
          </button>

          <button
            onClick={() => {
              setIsProviderOpen(true);
              setEditingProviderId(null);
              setName("");
              setSpecialtyEn("");
              setSpecialtyEs("");
              setLocation("");
              setCategoryId("");
            }}
            className="px-6 py-3 bg-[#0d4db0] text-white rounded-xl hover:opacity-90 transition"
          >
            + Add Professional
          </button>
        </div>
      </div>
      {/* ---------------- Existing Categories ---------------- */}

      <section>
        <h2 className="text-xl font-semibold mb-6">Existing Categories</h2>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-[#0d4db0]/20 rounded-2xl p-6 mb-6"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#0d4db0]">
                {cat.title.en} / {cat.title.es}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCategory(cat)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {providers
                .filter((p) => p.categoryId === cat.id)
                .map((prov) => (
                  <div
                    key={prov.id}
                    className="text-sm text-slate-600 flex justify-between items-center"
                  >
                    <span>
                      {prov.name} — {prov.location}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProvider(prov)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProvider(prov.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* ---------------- Backdrop ---------------- */}

      {(isCategoryOpen || isProviderOpen) && (
        <div
          onClick={() => {
            setIsCategoryOpen(false);
            setIsProviderOpen(false);
          }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* ---------------- Category Drawer ---------------- */}

      <div
        className={`mt-22 fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCategoryOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0d4db0]">
              {editingCategoryId ? "Edit Category" : "Add Category"}
            </h2>
            <button onClick={() => setIsCategoryOpen(false)}>✕</button>
          </div>

          <input
            placeholder="Title (EN)"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            placeholder="Title (ES)"
            value={titleEs}
            onChange={(e) => setTitleEs(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <button
            onClick={handleAddCategory}
            disabled={!titleEn || !titleEs}
            className="w-full bg-[#0d4db0] text-white py-3 rounded-xl disabled:opacity-40"
          >
            {editingCategoryId ? "Save Changes" : "Save Category"}
          </button>
        </div>
      </div>

      {/* ---------------- Provider Drawer ---------------- */}

      <div
        className={`mt-20 fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isProviderOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 space-y-6 overflow-y-auto h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0d4db0]">
              {editingProviderId ? "Edit Professional" : "Add Professional"}
            </h2>
            <button onClick={() => setIsProviderOpen(false)}>✕</button>
          </div>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            placeholder="Specialty (EN)"
            value={specialtyEn}
            onChange={(e) => setSpecialtyEn(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            placeholder="Specialty (ES)"
            value={specialtyEs}
            onChange={(e) => setSpecialtyEs(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title.en}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddProvider}
            disabled={
              !name || !specialtyEn || !specialtyEs || !location || !categoryId
            }
            className="w-full bg-[#0d4db0] text-white py-3 rounded-xl disabled:opacity-40"
          >
            {editingProviderId ? "Save Changes" : "Submit for Approval"}
          </button>
        </div>
      </div>
    </div>
  );
}
