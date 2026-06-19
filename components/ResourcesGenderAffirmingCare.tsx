// "use client";
// import { useMemo, useState, useEffect } from "react";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { LuUsers, LuBuilding2 } from "react-icons/lu";
// import { useLanguage } from "../context/language";
// import { resourcesTranslations } from "../lib/translations/resources";

// // Municipality translations
// const municipalityTranslations = {
//   en: {
//     "San Juan": "San Juan",
//     Ponce: "Ponce",
//     Bayamón: "Bayamón",
//     Mayagüez: "Mayagüez",
//   },
//   es: {
//     "San Juan": "San Juan",
//     Ponce: "Ponce",
//     Bayamón: "Bayamón",
//     Mayagüez: "Mayagüez",
//   },
// };

// // Raw clinics
// const genderAffirmingClinicsRaw = [
//   {
//     name: { en: "Transalud Clinic", es: "Clínica Transalud" },
//     services: {
//       en: "Hormone therapy and affirming primary care",
//       es: "Terapia hormonal y atención primaria afirmativa",
//     },
//     municipality: "San Juan",
//     coordinates: [18.4655, -66.1057],
//   },
//   {
//     name: { en: "Centro Ararat", es: "Centro Ararat" },
//     services: {
//       en: "LGBTQ+ health and psychosocial support",
//       es: "Salud LGBTQ+ y apoyo psicosocial",
//     },
//     municipality: "San Juan",
//     coordinates: [18.4683, -66.1167],
//   },
//   {
//     name: { en: "Centro Ararat", es: "Centro Ararat" },
//     services: {
//       en: "Community services and affirming support",
//       es: "Servicios comunitarios y apoyo afirmativo",
//     },
//     municipality: "Ponce",
//     coordinates: [18.0111, -66.6141],
//   },
//   {
//     name: { en: "True Self Foundation", es: "True Self Foundation" },
//     services: {
//       en: "Medical navigation and affirming resources",
//       es: "Navegación médica y recursos afirmativos",
//     },
//     municipality: "San Juan",
//     coordinates: [18.44, -66.06],
//   },
//   {
//     name: {
//       en: "Public Health Clinics PR",
//       es: "Clínicas de Salud Pública PR",
//     },
//     services: {
//       en: "Primary services and referrals",
//       es: "Servicios primarios y referencias",
//     },
//     municipality: "Bayamón",
//     coordinates: [18.3794, -66.1653],
//   },
//   {
//     name: { en: "CARIB", es: "CARIB" },
//     services: {
//       en: "Community support and affirming services",
//       es: "Apoyo comunitario y servicios afirmativos",
//     },
//     municipality: "Mayagüez",
//     coordinates: [18.2011, -67.1396],
//   },
// ];

// const ResourcesGenderAffirmingCare = () => {
//   const { language } = useLanguage();
//   const t = resourcesTranslations[language].genderAffirmingClinics;

//   const [leafletLoaded, setLeafletLoaded] = useState(false);
//   const [customPin, setCustomPin] = useState<any>(null);

//   // ✅ Load Leaflet ONLY on client
//   useEffect(() => {
//     const loadLeaflet = async () => {
//       const L = await import("leaflet");

//       const icon = L.divIcon({
//         className: "",
//         html: `
//           <div style="display:flex; justify-content:center; align-items:center;">
//             <svg width="34" height="48" viewBox="0 0 24 36" fill="none">
//               <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="#0d4db0"/>
//               <circle cx="12" cy="12" r="5" fill="white"/>
//             </svg>
//           </div>
//         `,
//         iconSize: [34, 48],
//         iconAnchor: [17, 48],
//         popupAnchor: [0, -40],
//       });

//       setCustomPin(icon);
//       setLeafletLoaded(true);
//     };

//     loadLeaflet();
//   }, []);

//   // Map clinics to language
//   const genderAffirmingClinics = useMemo(() => {
//     return genderAffirmingClinicsRaw.map((c) => ({
//       name: c.name[language],
//       services: c.services[language],
//       municipality: municipalityTranslations[language][c.municipality],
//       coordinates: c.coordinates,
//       website: c.website,
//     }));
//   }, [language]);

//   const [clinicSearch, setClinicSearch] = useState("");
//   const [municipalityFilter, setMunicipalityFilter] = useState(
//     t.allMunicipalities
//   );

//   useEffect(() => {
//     setMunicipalityFilter(t.allMunicipalities);
//   }, [language, t.allMunicipalities]);

//   const municipalities = [
//     t.allMunicipalities,
//     ...Array.from(new Set(genderAffirmingClinics.map((c) => c.municipality))),
//   ];

//   const filteredClinics = useMemo(() => {
//     return genderAffirmingClinics.filter((clinic) => {
//       const matchesSearch =
//         clinic.name.toLowerCase().includes(clinicSearch.toLowerCase()) ||
//         clinic.services.toLowerCase().includes(clinicSearch.toLowerCase());

//       const matchesMunicipality =
//         municipalityFilter === t.allMunicipalities ||
//         clinic.municipality === municipalityFilter;

//       return matchesSearch && matchesMunicipality;
//     });
//   }, [
//     clinicSearch,
//     municipalityFilter,
//     t.allMunicipalities,
//     genderAffirmingClinics,
//   ]);

//   const handleWebsiteClick = (clinic) => {
//     const url = clinic.website
//       ? clinic.website
//       : `https://www.google.com/search?q=${encodeURIComponent(clinic.name)}`;
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <div className="mt-32 scroll-mt-48" id="gender-clinics">
//       <div className="flex items-center gap-3 mb-6">
//         <LuUsers className="text-[#0d4db0]" />
//         <h2 className="text-2xl font-semibold text-[#0d4db0]">
//           {t.sectionTitle}
//         </h2>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-6 mb-10">
//         <input
//           type="text"
//           placeholder={t.searchPlaceholder}
//           value={clinicSearch}
//           onChange={(e) => setClinicSearch(e.target.value)}
//           className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm"
//         />
//         <select
//           value={municipalityFilter}
//           onChange={(e) => setMunicipalityFilter(e.target.value)}
//           className="border border-slate-200 rounded-xl px-4 py-3 text-sm"
//         >
//           {municipalities.map((m, i) => (
//             <option key={i} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Cards */}
//       <div className="grid md:grid-cols-2 gap-8 mb-16">
//         {filteredClinics.map((clinic, index) => (
//           <div
//             key={index}
//             className="rounded-3xl p-8 border border-slate-200 shadow-sm"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <LuBuilding2 className="text-[#0d4db0]" />
//               <h3 className="font-semibold text-[#0d4db0]">
//                 {clinic.name}
//               </h3>
//             </div>
//             <p className="text-sm text-slate-600 text-left">
//               {clinic.services}
//             </p>
//             <p className="text-sm text-slate-500 text-left">
//               {clinic.municipality}
//             </p>
//             <div
//               onClick={() => handleWebsiteClick(clinic)}
//               className="mt-4 text-sm text-[#0d4db0] font-medium cursor-pointer hover:underline text-left"
//             >
//               {clinic?.website ? t.visitWebsite : t.searchGoogle}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Map */}
//       <div className="relative z-0 h-100 rounded-3xl overflow-hidden shadow-md mb-20">
//         {leafletLoaded && customPin && (
//           <MapContainer
//             center={[18.2208, -66.5901]}
//             zoom={9}
//             scrollWheelZoom={false}
//             className="h-full w-full"
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap contributors"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {filteredClinics.map((clinic, i) => (
//               <Marker key={i} position={clinic.coordinates} icon={customPin}>
//                 <Popup>
//                   <strong>{clinic.name}</strong>
//                   <br />
//                   {clinic.services}
//                   <br />
//                   <span
//                     style={{ color: "#0d4db0", cursor: "pointer" }}
//                     onClick={() => handleWebsiteClick(clinic)}
//                   >
//                     {clinic?.website ? t.visitWebsite : t.searchGoogle}
//                   </span>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResourcesGenderAffirmingCare;