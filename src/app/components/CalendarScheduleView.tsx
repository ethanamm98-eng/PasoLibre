const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import React, { useState } from "react";
// import { format } from "date-fns";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   SnowflakeIcon,
//   SunIcon,
//   Flower2Icon,
//   LeafIcon,
// } from "lucide-react";
// import CalendarToolbar from "./CalendarToolbar";

// type Event = {
//   id: string;
//   name: string;
//   date: string;
//   scheduleType: "one-time" | "recurrent";
//   status?: "Active" | "Paused" | "Deleted";
// };

// type ScheduleViewProps = {
//   events: Event[];
//   onEventClick: (ev: Event) => void;
//   onOpenScheduleForm: () => void;
//   onOpenRecurringForm: (mode: "create" | "edit") => void;
//   clearSchedulerForm: () => void;
// };

// const monthStyles = (monthKey: string) => {
//   const month = Number(monthKey.split("-")[1]);

//   if ([12, 1, 2].includes(month)) {
//     return {
//       gradient: "from-blue-200/95 to-blue-50/95",
//       Icon: SnowflakeIcon,
//       ring: "ring-blue-100",
//     };
//   }
//   if ([3, 4, 5].includes(month)) {
//     return {
//       gradient: "from-green-200/95 to-emerald-50/95",
//       Icon: Flower2Icon,
//       ring: "ring-emerald-100",
//     };
//   }
//   if ([6, 7, 8].includes(month)) {
//     return {
//       gradient: "from-yellow-200/95 to-orange-100/95",
//       Icon: SunIcon,
//       ring: "ring-yellow-100",
//     };
//   }
//   return {
//     gradient: "from-orange-200/95 to-amber-100/95",
//     Icon: LeafIcon,
//     ring: "ring-orange-100",
//   };
// };

// const ScheduleView: React.FC<ScheduleViewProps> = ({
//   events,
//   onEventClick,
//   onOpenScheduleForm,
//   onOpenRecurringForm,
//   clearSchedulerForm,
// }) => {
//   const [, setShowRecurringPanel] = useState(false);
//   const [showScheduled, setShowScheduled] = useState(true);
//   const [showRecurrent, setShowRecurrent] = useState(true);
//   const [collapsedMonths, setCollapsedMonths] = useState<Set<string>>(
//     new Set()
//   );

//   const handleToday = () => {};

//   const toggleMonth = (monthKey: string) => {
//     setCollapsedMonths((prev) => {
//       const newSet = new Set(prev);
//       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//       newSet.has(monthKey) ? newSet.delete(monthKey) : newSet.add(monthKey);
//       return newSet;
//     });
//   };

//   const filteredEvents = events.filter((ev) => {
//     if (ev?.scheduleType === "one-time" && !showScheduled) return false;
//     if (ev?.scheduleType === "recurrent" && !showRecurrent) return false;
//     return true;
//   });

//   const groupedEvents = filteredEvents.reduce((acc, ev) => {
//     const dateKey = format(new Date(ev?.date), "yyyy-MM-dd");
//     if (!acc[dateKey]) acc[dateKey] = [];
//     acc[dateKey].push(ev);
//     return acc;
//   }, {} as Record<string, Event[]>);

//   const sortedDates = Object.keys(groupedEvents).sort(
//     (a, b) => new Date(a).getTime() - new Date(b).getTime()
//   );

//   const groupedByMonth = sortedDates.reduce((acc, dateKey) => {
//     const monthKey = format(new Date(dateKey), "yyyy-MM");
//     if (!acc[monthKey]) acc[monthKey] = [];
//     acc[monthKey].push(dateKey);
//     return acc;
//   }, {} as Record<string, string[]>);

//   return (
//     <div className="max-h-full space-y-4 overflow-y-auto rounded-b-3xl bg-white/30 p-2 backdrop-blur-[2px] sm:p-4">
//       <CalendarToolbar
//         handleToday={handleToday}
//         showScheduled={showScheduled}
//         setShowScheduled={setShowScheduled}
//         showRecurring={showRecurrent}
//         setShowRecurring={setShowRecurrent}
//         clearSchedulerForm={clearSchedulerForm}
//         onOpenScheduleForm={onOpenScheduleForm}
//         onOpenRecurringForm={onOpenRecurringForm}
//         setShowRecurringPanel={setShowRecurringPanel}
//       />

//       {Object.entries(groupedByMonth).map(([monthKey, dateKeys]) => {
//         const { gradient, Icon, ring } = monthStyles(monthKey);
//         const monthLabel = format(new Date(monthKey + "-01"), "MMMM yyyy");
//         const isCollapsed = collapsedMonths.has(monthKey);

//         const totalScheduled = dateKeys.reduce(
//           (count, dk) =>
//             count +
//             groupedEvents[dk].filter((ev) => ev?.scheduleType === "one-time")
//               .length,
//           0
//         );

//         const totalRecurring = dateKeys.reduce(
//           (count, dk) =>
//             count +
//             groupedEvents[dk].filter((ev) => ev?.scheduleType === "recurrent")
//               .length,
//           0
//         );

//         return (
//           <div key={monthKey} className="relative">
//             <h3
//               onClick={() => toggleMonth(monthKey)}
//               className={`sticky top-0 z-10 mb-3 cursor-pointer rounded-2xl border-none bg-linear-to-r ${gradient} ${ring} p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 backdrop-blur-sm transition hover:opacity-95 sm:px-4 sm:py-5`}
//             >
//               <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <span className="flex min-w-0 items-center gap-2.5 text-slate-800">
//                   <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/60 shadow-sm sm:h-9 sm:w-9">
//                     <Icon className="h-5 w-5 text-gray-700" />
//                   </span>

//                   <span className="min-w-0">
//                     <span className="block truncate text-lg font-black leading-tight sm:font-semibold">
//                       {monthLabel}
//                     </span>
//                     <span className="mt-0.5 block text-xs font-semibold text-slate-600/80 sm:hidden">
//                       {totalScheduled + totalRecurring} total events
//                     </span>
//                   </span>
//                 </span>

//                 <div className="flex items-center justify-between gap-2 text-sm text-gray-700 sm:justify-end sm:gap-3">
//                   <div className="flex min-w-0 flex-wrap items-center gap-2">
//                     <span className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-bold shadow-sm sm:px-3 sm:text-xs sm:font-medium">
//                       {totalScheduled} Scheduled
//                     </span>

//                     <span className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-bold shadow-sm sm:px-3 sm:text-xs sm:font-medium">
//                       {totalRecurring} Recurring
//                     </span>
//                   </div>

//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/50 shadow-sm">
//                     {isCollapsed ? (
//                       <ChevronDownIcon className="h-5 w-5" />
//                     ) : (
//                       <ChevronUpIcon className="h-5 w-5" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </h3>

//             <div
//               className={`overflow-hidden pl-0 transition-all duration-300 ease-in-out sm:pl-2 ${
//                 isCollapsed ? "max-h-0 opacity-0" : "max-h-312.5 opacity-100"
//               } space-y-5 sm:space-y-6`}
//             >
//               {dateKeys.map((dateKey) => {
//                 const dayEvents = groupedEvents[dateKey];
//                 const readableDate = format(new Date(dateKey), "EEEE, MMM d");
//                 const mobileDay = format(new Date(dateKey), "d");
//                 const mobileWeekday = format(new Date(dateKey), "EEE");

//                 return (
//                   <div
//                     key={dateKey}
//                     className="relative ml-0 rounded-[1.35rem] border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl sm:ml-1 sm:border-l sm:border-slate-200/80 sm:bg-transparent sm:p-0 sm:pl-4 sm:shadow-none sm:backdrop-blur-0"
//                   >
//                     <div className="mb-3 flex items-center gap-3 sm:hidden">
//                       <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
//                         <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
//                           {mobileWeekday}
//                         </span>
//                         <span className="text-lg font-black leading-none">
//                           {mobileDay}
//                         </span>
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-sm font-black text-slate-900">
//                           {readableDate}
//                         </p>
//                         <p className="text-xs font-semibold text-slate-500">
//                           {dayEvents.length} event
//                           {dayEvents.length === 1 ? "" : "s"}
//                         </p>
//                       </div>
//                     </div>

//                     <h5 className="mb-3 hidden items-center gap-2 text-sm font-semibold text-gray-700 sm:flex">
//                       <span className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-sm" />
//                       <span className="tracking-wide">{readableDate}</span>
//                     </h5>

//                     <ul className="space-y-2.5">
//                       {dayEvents.map((ev) => {
//                         const eventStart = new Date(ev?.date);
//                         const isDeleted = ev.status === "Deleted";
//                         const isRecurring = ev.scheduleType === "recurrent";
//                         const isPaused = ev.status === "Paused";

//                         return (
//                           <li
//                             key={ev.id}
//                             onClick={() => {
//                               if (isDeleted) return;
//                               onEventClick(ev);
//                             }}
//                             className={`cursor-pointer rounded-2xl border px-3.5 py-3 text-sm shadow-[0_8px_20px_rgba(15,23,42,0.10)] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(15,23,42,0.14)] sm:rounded-xl sm:py-2.5 ${
//                               ev.scheduleType === "one-time"
//                                 ? "border-sky-200/80 bg-sky-600 text-white hover:brightness-110"
//                                 : isRecurring
//                                 ? ev?.status === "Active"
//                                   ? "border-teal-200/80 bg-teal-600 text-white hover:brightness-110"
//                                   : isPaused
//                                   ? "border-red-200/80 bg-red-600 text-white hover:brightness-110"
//                                   : "cursor-not-allowed border-gray-300/70 bg-gray-400/70 text-white"
//                                 : "border-gray-300/70 bg-gray-600 text-white hover:brightness-110"
//                             }`}
//                           >
//                             <div className="flex items-start justify-between gap-3">
//                               <div className="min-w-0">
//                                 <div
//                                   className={`line-clamp-2 font-black leading-snug sm:font-medium ${
//                                     isDeleted ? "line-through" : ""
//                                   }`}
//                                 >
//                                   {ev?.name}
//                                 </div>

//                                 <div
//                                   className={`mt-1 text-xs font-semibold text-white/80 ${
//                                     isDeleted ? "line-through" : ""
//                                   }`}
//                                 >
//                                   {format(eventStart, "h:mm a")}
//                                 </div>
//                               </div>

//                               <div className="flex shrink-0 flex-col items-end gap-1">
//                                 <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
//                                   {ev.scheduleType === "one-time"
//                                     ? "Scheduled"
//                                     : "Recurring"}
//                                 </span>

//                                 {isDeleted && (
//                                   <span className="text-[11px] italic text-red-100">
//                                     Deleted
//                                   </span>
//                                 )}

//                                 {isPaused && !isDeleted && (
//                                   <span className="text-[11px] italic text-red-100">
//                                     Paused
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ScheduleView;
