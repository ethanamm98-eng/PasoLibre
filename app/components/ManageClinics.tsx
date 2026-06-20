const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useState, useEffect } from "react";
// import { LuUsers, LuBuilding2 } from "react-icons/lu";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// // -------------------- Dummy Clinics Data --------------------
// export const dummyClinics = [
//   {
//     id: "clinic1",
//     name: { en: "Transalud Clinic", es: "Clínica Transalud" },
//     services: {
//       en: "Hormone therapy and affirming primary care",
//       es: "Terapia hormonal y atención primaria afirmativa",
//     },
//     municipality: "San Juan",
//     coordinates: [18.4655, -66.1057],
//   },
//   {
//     id: "clinic2",
//     name: { en: "Centro Ararat", es: "Centro Ararat" },
//     services: {
//       en: "LGBTQ+ health and psychosocial support",
//       es: "Salud LGBTQ+ y apoyo psicosocial",
//     },
//     municipality: "San Juan",
//     coordinates: [18.4683, -66.1167],
//   },
//   {
//     id: "clinic3",
//     name: { en: "True Self Foundation", es: "True Self Foundation" },
//     services: {
//       en: "Medical navigation and affirming resources",
//       es: "Navegación médica y recursos afirmativos",
//     },
//     municipality: "Ponce",
//     coordinates: [18.0111, -66.6141],
//   },
// ];

// // -------------------- Custom Leaflet Pin --------------------
// const customPin = L.divIcon({
//   className: "",
//   html: `
//     <div style="display:flex; justify-content:center; align-items:center;">
//       <svg width="34" height="48" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="#0d4db0"/>
//         <circle cx="12" cy="12" r="5" fill="white"/>
//       </svg>
//     </div>
//   `,
//   iconSize: [34, 48],
//   iconAnchor: [17, 48],
//   popupAnchor: [0, -40],
// });

// // -------------------- Clinics CMS Component --------------------
// export default function ManageClinics({ language = "en" }) {
//   const [clinics, setClinics] = useState(dummyClinics);

//   const [isClinicOpen, setIsClinicOpen] = useState(false);

//   // ---------------- Form State ----------------
//   const [nameEn, setNameEn] = useState("");
//   const [nameEs, setNameEs] = useState("");
//   const [servicesEn, setServicesEn] = useState("");
//   const [servicesEs, setServicesEs] = useState("");
//   const [municipality, setMunicipality] = useState("");
//   const [coordinates, setCoordinates] = useState<[number, number]>([
//     18.2208, -66.5901,
//   ]);

//   // ---------------- Edit State ----------------
//   const [editingClinicId, setEditingClinicId] = useState<string | null>(null);

//   // ---------------- ESC to Close ----------------
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsClinicOpen(false);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   // ---------------- Add / Edit Clinic ----------------
//   const handleAddClinic = () => {
//     if (!nameEn || !nameEs || !servicesEn || !servicesEs || !municipality)
//       return;

//     if (editingClinicId) {
//       // Edit existing clinic
//       setClinics((prev) =>
//         prev.map((c) =>
//           c.id === editingClinicId
//             ? {
//                 ...c,
//                 name: { en: nameEn, es: nameEs },
//                 services: { en: servicesEn, es: servicesEs },
//                 municipality,
//                 coordinates,
//               }
//             : c
//         )
//       );
//       setEditingClinicId(null);
//     } else {
//       // Add new clinic
//       setClinics((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           name: { en: nameEn, es: nameEs },
//           services: { en: servicesEn, es: servicesEs },
//           municipality,
//           coordinates,
//         },
//       ]);
//     }

//     // Reset form
//     setNameEn("");
//     setNameEs("");
//     setServicesEn("");
//     setServicesEs("");
//     setMunicipality("");
//     setCoordinates([18.2208, -66.5901]);
//     setIsClinicOpen(false);
//   };

//   // ---------------- Edit / Delete Handlers ----------------
//   const handleEditClinic = (clinic: any) => {
//     setNameEn(clinic.name.en);
//     setNameEs(clinic.name.es);
//     setServicesEn(clinic.services.en);
//     setServicesEs(clinic.services.es);
//     setMunicipality(clinic.municipality);
//     setCoordinates(clinic.coordinates);
//     setEditingClinicId(clinic.id);
//     setIsClinicOpen(true);
//   };

//   const handleDeleteClinic = (clinicId: string) => {
//     setClinics((prev) => prev.filter((c) => c.id !== clinicId));
//   };

//   // ---------------- Filtered Data ----------------
//   const filteredClinics = clinics.map((c) => ({
//     ...c,
//     name: c.name[language],
//     services: c.services[language],
//   }));

//   return (
//     <div
//       id="clinics"
//       className="relative max-w-6xl mx-auto py-0 space-y-16 px-6"
//     >
//       <div className="flex justify-between">
//         <h1 className="text-3xl font-semibold text-[#0d4db0]">
//           Clinics Management
//         </h1>

//         {/* Action Button */}
//         <button
//           onClick={() => {
//             setIsClinicOpen(true);
//             setEditingClinicId(null);
//             setNameEn("");
//             setNameEs("");
//             setServicesEn("");
//             setServicesEs("");
//             setMunicipality("");
//             setCoordinates([18.2208, -66.5901]);
//           }}
//           className="px-6 py-3 bg-[#0d4db0] text-white rounded-xl hover:opacity-90 transition"
//         >
//           + Add Clinic
//         </button>
//       </div>

//       {/* Existing Clinics */}
//       <section>
//         <h2 className="text-xl font-semibold mt-10 mb-6">Existing Clinics</h2>
//         {filteredClinics.map((clinic) => (
//           <div
//             key={clinic.id}
//             className="border border-[#0d4db0]/20 rounded-2xl p-6 mb-6"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="font-semibold text-[#0d4db0]">{clinic.name}</p>
//                 <p className="text-sm text-slate-600">{clinic.services}</p>
//                 <p className="text-sm text-slate-500">{clinic.municipality}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEditClinic(clinic)}
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteClinic(clinic.id)}
//                   className="text-sm text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Backdrop */}
//       {isClinicOpen && (
//         <div
//           onClick={() => setIsClinicOpen(false)}
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//         />
//       )}

//       {/* Clinic Drawer */}
//       <div
//         className={`mt-20 fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isClinicOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-8 space-y-6 overflow-y-auto h-full">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-[#0d4db0]">
//               {editingClinicId ? "Edit Clinic" : "Add Clinic"}
//             </h2>
//             <button onClick={() => setIsClinicOpen(false)}>✕</button>
//           </div>

//           <input
//             placeholder="Clinic Name (EN)"
//             value={nameEn}
//             onChange={(e) => setNameEn(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//           />
//           <input
//             placeholder="Clinic Name (ES)"
//             value={nameEs}
//             onChange={(e) => setNameEs(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//           />
//           <input
//             placeholder="Services (EN)"
//             value={servicesEn}
//             onChange={(e) => setServicesEn(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//           />
//           <input
//             placeholder="Services (ES)"
//             value={servicesEs}
//             onChange={(e) => setServicesEs(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//           />
//           <input
//             placeholder="Municipality"
//             value={municipality}
//             onChange={(e) => setMunicipality(e.target.value)}
//             className="w-full border p-3 rounded-xl"
//           />

//           <button
//             onClick={handleAddClinic}
//             disabled={
//               !nameEn || !nameEs || !servicesEn || !servicesEs || !municipality
//             }
//             className="w-full bg-[#0d4db0] text-white py-3 rounded-xl disabled:opacity-40"
//           >
//             {editingClinicId ? "Save Changes" : "Save Clinic"}
//           </button>
//         </div>
//       </div>

//       {/* Map */}
//       <div className="h-100 rounded-3xl overflow-hidden shadow-md mt-10">
//         <MapContainer
//           center={[18.2208, -66.5901]}
//           zoom={9}
//           scrollWheelZoom={false}
//           className="h-full w-full"
//         >
//           <TileLayer
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {filteredClinics.map((clinic) => (
//             <Marker
//               key={clinic.id}
//               position={clinic.coordinates}
//               icon={customPin}
//             >
//               <Popup>
//                 <strong>{clinic.name}</strong>
//                 <br />
//                 {clinic.services}
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }