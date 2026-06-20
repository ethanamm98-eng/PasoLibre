// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";

// interface TeamItem {
//   title: string;
//   role: string;
//   slug: { current: string };
//   coverImage: {
//     asset: {
//       url: string;
//       metadata: {
//         lqip: string;
//       };
//     };
//     alt?: string;
//   };
//   content: any[];
// }

// const Gallery = () => {
//   const [data, setData] = useState<TeamItem[]>([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (data.length === 0) return;

//     const interval = setInterval(() => {
//       setSelectedIndex((prevIndex) => (prevIndex + 1) % data.length);
//     }, 5000);

//     return () => clearInterval(interval); // Clean up on unmount
//   }, [data]);

//   const selectedImage = data[selectedIndex];

//   return (
//     <section className="relative w-full max-w-8xl mb-[0px] mt-[0px] md:mt-[0px] lg:mt-0 md:mb-[0px] lg:mb-0 bottom-12 mx-auto py-10 px-4 text-white border-curved border-[0.5px] border-accent overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/gallery.jpg"
//           alt="Background"
//           fill
//           className="object-cover"
//           priority
//         />
//         {/* White overlay */}
//         <div className="absolute inset-0 bg-lightAccent/90" />
//       </div>

//       <div className="relative w-full max-w-7xl mx-auto p-[0.5px] text-white bg-white/40 border-solid border-[1px] border-accent rounded-sm overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
//         {/* Content (z-10 to appear above background and overlay) */}
//         <div className="relative z-10">
//           <h3 className="leading-[50px] py-10 sm:py-10 lg:py-[50px] text-center mb-0 mx-auto lg:text-[5em] md:text-[5.5em] text-[3.5em] font-bold tracking-tighter text-accent drop-shadow-[1px_.5px_.5px_#000]">
//             Our Members
//           </h3>

//           <div className="flex flex-col gap-2">
//             {/* Large preview image */}
//             <div className="relative flex-1 flex items-center justify-center overflow-hidden m-2 bottom-2">
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff,_#004E89)] z-0" />
//               <div className="relative z-10">
//                 {selectedImage ? (
//                   <div>
//                     <Image
//                       src={selectedImage?.coverImage?.asset?.url}
//                       alt={
//                         selectedImage?.coverImage?.alt || selectedImage?.title
//                       }
//                       width={800}
//                       height={600}
//                       placeholder="blur"
//                       blurDataURL={
//                         selectedImage?.coverImage?.asset?.metadata?.lqip
//                       }
//                       className="object-contain max-h-[500px] w-auto h-auto"
//                     />
//                     <div className="text-center py-3 tracking-tight bg-[radial-gradient(circle_at_center,_#ffffff80,_#C9CCD590)]">
//                       <div className="text-accent text-2xl leading-5 text-shadow-sm merriweather font-bold">
//                         {selectedImage?.title}
//                       </div>
//                       <div className="text-shadow-sm text-gray-800 text-lg manrope font-light montserrat">
//                         {selectedImage?.role}
//                       </div>
//                       {/* drop-shadow-[1px_.5px_.5px_#004E89] */}
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-gray-400">Loading...</p>
//                 )}
//               </div>
//             </div>

//             {/* Thumbnail list */}
//             <div className="flex flex-row gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] pr-2 custom-scrollbar scroll-smooth snap-x mb-2">
//               {data?.map((item, index) => (
//                 <div
//                   key={index}
//                   onMouseEnter={() => setSelectedIndex(index)}
//                   className={`relative cursor-pointer overflow-hidden border ${
//                     selectedIndex === index
//                       ? "border-accent"
//                       : "border-transparent"
//                   } transition duration-300 hover:scale-105 w-[150px] h-[100px] flex items-center justify-center min-h-fit md:min-h-[50px] min-w-[50px]`}
//                 >
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff80,_#C9CCD590)] z-0" />
//                   <div className="relative z-10 w-full h-full flex items-center justify-center">
//                     <Image
//                       src={item?.coverImage?.asset?.url}
//                       alt={item?.coverImage?.alt || item?.title}
//                       fill
//                       className="object-contain"
//                       placeholder="blur"
//                       blurDataURL={item?.coverImage?.asset?.metadata?.lqip}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Gallery;
