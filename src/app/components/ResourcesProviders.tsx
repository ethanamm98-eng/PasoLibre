const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LuStethoscope,
//   LuHeartPulse,
//   LuArrowUpRight,
//   LuChevronDown,
//   LuChevronUp,
//   LuSearch,
//   LuFilter,
// } from "react-icons/lu";
// import { resourcesTranslations } from "../lib/translations/resources";
// import { useLanguage } from "../context/language";

// const ResourcesProviders = () => {
//   const { language } = useLanguage();
//   const t = resourcesTranslations[language];

//   const [search, setSearch] = useState("");
//   const [cityFilter, setCityFilter] = useState(t.filters.all);

//   useEffect(() => {
//     // Only reset cityFilter if it doesn't match the new language's "all"
//     if (cityFilter !== t.filters.all) {
//       setCityFilter(t.filters.all);
//     }
//   }, [language, t.filters.all, cityFilter]);

//   /* -------------------- Categories -------------------- */
//   const categories = useMemo(() => {
//     return [
//       {
//         title: t.categories.generalMedicine,
//         providers: [
//           {
//             name: "Dra. María González, MD",
//             specialty:
//               language === "es" ? "Medicina Familiar" : "Family Medicine",
//             location: "San Juan, PR",
//           },
//           {
//             name: "Dr. Carlos Rivera, MD",
//             specialty:
//               language === "es" ? "Medicina Interna" : "Internal Medicine",
//             location: "Bayamón, PR",
//           },
//         ],
//       },
//       {
//         title: t.categories.dermatology,
//         providers: [
//           {
//             name: "Dra. Ana López, MD",
//             specialty:
//               language === "es"
//                 ? "Dermatología Clínica"
//                 : "Clinical Dermatology",
//             location: "Guaynabo, PR",
//           },
//         ],
//       },
//       {
//         title: t.categories.gynecology,
//         providers: [
//           {
//             name: "Dra. Laura Méndez, MD",
//             specialty:
//               language === "es"
//                 ? "Obstetricia y Ginecología"
//                 : "Obstetrics & Gynecology",
//             location: "San Juan, PR",
//           },
//         ],
//       },
//       {
//         title: t.categories.mentalHealth,
//         providers: [
//           {
//             name: "Dr. José Martínez, PsyD",
//             specialty:
//               language === "es" ? "Psicología Clínica" : "Clinical Psychology",
//             location: "Caguas, PR",
//           },
//         ],
//       },
//       {
//         title: t.providers.topSurgery,
//         providers: [
//           {
//             name: "Dr. Ricardo Morales, MD",
//             specialty: t.providers.topSurgerySpecialty,
//             location: "San Juan, PR",
//           },
//         ],
//       },
//     ];
//   }, [language, t.categories, t.providers, t.sections]);

//   /* -------------------- Providers Filtering -------------------- */
//   const allProviders = useMemo(
//     () => categories.flatMap((cat) => cat.providers),
//     [categories]
//   );

//   const cities = useMemo(
//     () => [t.filters.all, ...new Set(allProviders.map((p) => p.location))],
//     [allProviders, t.filters.all]
//   );

//   const filteredCategories = useMemo(() => {
//     return categories
//       .map((category) => ({
//         ...category,
//         providers: category.providers.filter((provider) => {
//           const searchLower = search.toLowerCase();

//           const matchesSearch =
//             provider.name.toLowerCase().includes(searchLower) ||
//             provider.specialty.toLowerCase().includes(searchLower) ||
//             provider.location.toLowerCase().includes(searchLower);

//           const matchesCity =
//             cityFilter === t.filters.all || provider.location === cityFilter;

//           return matchesSearch && matchesCity;
//         }),
//       }))
//       .filter((category) => category.providers.length > 0);
//   }, [categories, search, cityFilter, t.filters.all]);

//   /* -------------------- Section State -------------------- */

//   const [openSections, setOpenSections] = useState<Record<number, boolean>>(
//     () => {
//       const initialState: Record<number, boolean> = {};
//       filteredCategories.forEach((_, index) => {
//         initialState[index] = true;
//       });
//       return initialState;
//     }
//   );

//   useEffect(() => {
//     const initialState: Record<number, boolean> = {};
//     filteredCategories.forEach((_, index) => {
//       initialState[index] = true;
//     });
//     // setOpenSections(initialState);
//   }, [filteredCategories]);

//   const toggleSection = (index: number) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   return (
//     <>
//       {/* Search */}
//       <div className="flex flex-col md:flex-row gap-6 mt-16 mb-16">
//         <div className="flex items-center gap-3 flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
//           <LuSearch className="text-slate-400" />
//           <input
//             type="text"
//             placeholder={t.filters.searchPlaceholder}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full outline-none text-sm"
//           />
//         </div>

//         <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
//           <LuFilter className="text-slate-400" />
//           <select
//             value={cityFilter}
//             onChange={(e) => setCityFilter(e.target.value)}
//             className="outline-none text-sm bg-transparent"
//           >
//             {cities.map((city, i) => (
//               <option key={i} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="space-y-20 scroll-mt-48" id="providers">
//         {filteredCategories?.map((category, i) => {
//           const isOpen = openSections[i];

//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div
//                 className="flex items-center justify-between gap-3 mb-10 cursor-pointer select-none"
//                 onClick={() => toggleSection(i)}
//               >
//                 <div className="flex items-center gap-3">
//                   <LuStethoscope className="text-[#0d4db0]" />
//                   <h2 className="text-2xl font-semibold text-[#0d4db0]">
//                     {category.title}{" "}
//                     <span className="text-sm text-slate-500 my-auto py-0">
//                       ({category.providers.length})
//                     </span>
//                   </h2>
//                 </div>

//                 {isOpen ? (
//                   <LuChevronUp className="text-[#0d4db0] transition-transform duration-300" />
//                 ) : (
//                   <LuChevronDown className="text-[#0d4db0] transition-transform duration-300" />
//                 )}
//               </div>

//               <AnimatePresence initial={false}>
//                 {isOpen && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className="overflow-hidden"
//                   >
//                     <div className="grid md:grid-cols-2 gap-8">
//                       {category.providers.map((provider, index) => (
//                         <div
//                           key={index}
//                           className="rounded-3xl p-8 bg-linear-to-br from-white via-pink-50/40 to-sky-50/40 border border-[#0d4db0]/10 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
//                         >
//                           <div className="flex items-center gap-3 mb-4">
//                             <LuHeartPulse className="text-[#0d4db0]" />
//                             <h3 className="text-lg font-semibold text-[#0d4db0]">
//                               {provider.name}
//                             </h3>
//                           </div>

//                           <p className="text-slate-600 text-sm font-light text-left">
//                             {provider.specialty}
//                           </p>
//                           <p className="text-slate-500 text-sm mt-1 text-left">
//                             {provider.location}
//                           </p>

//                           <div className="mt-6 flex items-center text-[#0d4db0] font-medium text-sm">
//                             {t.providers.publicInfo}
//                             <LuArrowUpRight className="ml-2" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default ResourcesProviders;
