const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { LuMessageCircle, LuStar } from "react-icons/lu";
// import { useLanguage } from "../context/language";
// import { resourcesTranslations } from "../lib/translations/resources";

// const ResourcesCommentSection = ({
//   pendingComments,
//   approveComment,
//   handleCommentSubmit,
//   paginatedComments,
//   totalPages,
//   setCurrentPage,
//   currentPage,
// }) => {
//   const { language } = useLanguage();
//   const t = resourcesTranslations[language].communityComments;

//   const formatDate = (date: Date) => {
//     return new Date(date).toLocaleString(
//       language === "es" ? "es-PR" : "en-US",
//       {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       }
//     );
//   };

//   return (
//     <div
//       className="mt-32 max-w-3xl mx-auto scroll-mt-48 text-left"
//       id="community"
//     >
//       <div className="flex items-center gap-3 mb-6">
//         <LuMessageCircle className="text-[#0d4db0]" />
//         <h2 className="text-2xl font-semibold text-[#0d4db0]">
//           {t.sectionTitle}
//         </h2>
//       </div>

//       <p className="text-slate-600 font-light mb-8">{t.description}</p>

//       {/* Comment Form */}
//       <form onSubmit={handleCommentSubmit} className="space-y-6 mb-12">
//         <input
//           name="name"
//           type="text"
//           placeholder={t.placeholders.name}
//           className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm"
//         />

//         {/* Rating Selector */}
//         <div className="flex items-center gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <label key={star} className="cursor-pointer">
//               <input
//                 type="radio"
//                 name="rating"
//                 value={star}
//                 className="hidden"
//               />
//               <LuStar className="w-5 h-5 text-slate-300 hover:text-yellow-400 transition-colors" />
//             </label>
//           ))}
//           <span className="text-xs text-slate-500 ml-2">{t.ratingLabel}</span>
//         </div>

//         <textarea
//           name="message"
//           rows={4}
//           required
//           placeholder={t.placeholders.message}
//           className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm"
//         />

//         <button
//           type="submit"
//           className="px-8 py-3 rounded-full bg-[#0d4db0] text-white text-sm shadow-md hover:shadow-lg transition-all"
//         >
//           {t.submitButton}
//         </button>
//       </form>

//       {/* Approved Comments */}
//       {paginatedComments.map((comment, i) => {
//         const initials = comment.name
//           .split(" ")
//           .map((n: string) => n[0])
//           .join("")
//           .toUpperCase();

//         return (
//           <div
//             key={i}
//             className="p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 bg-white"
//           >
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-sky-200 flex items-center justify-center font-semibold text-[#0d4db0]">
//                 {initials}
//               </div>

//               <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <strong className="text-[#0d4db0]">{comment.name}</strong>
//                     <p className="text-xs text-slate-400">
//                       {formatDate(comment.timestamp)}
//                     </p>
//                   </div>

//                   <div className="flex gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <LuStar
//                         key={star}
//                         className={`w-4 h-4 ${
//                           star <= comment.rating
//                             ? "text-yellow-400 fill-yellow-400"
//                             : "text-slate-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <p className="text-sm text-slate-600 mt-3 leading-relaxed">
//                   {comment.message}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-3 mt-8">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40"
//           >
//             {t.pagination.prev}
//           </button>

//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`px-3 py-2 text-sm rounded-lg ${
//                 currentPage === index + 1 ? "bg-[#0d4db0] text-white" : "border"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40"
//           >
//             {t.pagination.next}
//           </button>
//         </div>
//       )}

//       {/* Moderation Panel */}
//       {pendingComments.length > 0 && (
//         <div className="mt-10">
//           <h3 className="font-semibold text-[#0d4db0] mb-4">
//             {t.moderationPanel.title}
//           </h3>

//           {pendingComments.map((comment, i) => (
//             <div
//               key={i}
//               className="p-6 rounded-2xl border border-yellow-200 mb-6 bg-yellow-50"
//             >
//               <strong>{comment.name}</strong>
//               <p className="text-xs text-slate-500 mb-2">
//                 {formatDate(comment.timestamp)}
//               </p>
//               <p className="text-sm">{comment.message}</p>

//               <button
//                 onClick={() => approveComment(i)}
//                 className="mt-3 text-sm text-[#0d4db0] underline"
//               >
//                 {t.moderationPanel.approveButton}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResourcesCommentSection;
