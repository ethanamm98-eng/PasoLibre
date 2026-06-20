"use client";
import { createContext, useContext, useState } from "react";
import { Category, Provider } from "../../lib/store/providersStore";
import { buildInitialData } from "../../lib/dummyData/buildInitialProviders";
import { useLanguage } from "../language";

type ProvidersContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  providers: Provider[];
  setProviders: React.Dispatch<React.SetStateAction<Provider[]>>;
  addCategory: (cat: Category) => void;
  addProvider: (prov: Provider) => void;
  approveProvider: (id: string) => void;
  deleteProvider: (id: string) => void;
};

const ProvidersContext = createContext<ProvidersContextType | null>(null);

export const ProvidersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { language } = useLanguage();

  const initialData = buildInitialData(language);

  const [categories, setCategories] = useState(initialData.categories);
  const [providers, setProviders] = useState(initialData.providers);

  //   const [categories, setCategories] =
  //     useState<Category[]>(initialCategories);
  //   const [providers, setProviders] =
  //     useState<Provider[]>(initialProviders);

  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
  };

  const addProvider = (prov: Provider) => {
    setProviders((prev) => [...prev, prov]);
  };

  const approveProvider = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p))
    );
  };

  const deleteProvider = (id: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProvidersContext.Provider
      value={{
        categories,
        setCategories,
        providers,
        setProviders,
        addCategory,
        addProvider,
        approveProvider,
        deleteProvider,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};

export const useProviders = () => {
  const ctx = useContext(ProvidersContext);
  if (!ctx) throw new Error("useProviders must be inside ProvidersProvider");
  return ctx;
};
