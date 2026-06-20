const Page = () => {
  return (
    <div></div>
  );
}
export default Page;

// "use client";
// import { useState } from "react";
// import Carousel from "./Carousel";
// import ImageClip from "./elements/ImageClip";
// import PageLoader from "./elements/PageLoader";

// const Hero = (props: {
//   source: string | string[];
//   backRoute: string;
//   propertyId: string;
//   propertyName: string;
//   propertyLogo: string;
//   propertySlogan: string;
// }) => {
//   const [isPageLoading] = useState(true);
//   let heroMedia = null;

//   if (props != null && props?.source != null) {
//     if (typeof props.source === "string") {
//       const fileExtension = props?.source?.split(".")?.pop()?.toLowerCase();

//       if (fileExtension === "mp4")
//         heroMedia = <ImageClip source={(props as any)?.source?.[0]?.image} />;
//       else {
//         const temp: Array<string> = [props?.source];
//         heroMedia = (
//           <Carousel
//             sources={temp as any}
//             propertyId={props?.propertyId}
//             propertyName={props?.propertyName}
//             propertyLogo={props?.propertyLogo}
//             propertySlogan={props?.propertySlogan}
//           />
//         );
//       }
//     } else if (typeof props?.source === "object") {
//       heroMedia = (
//         <Carousel
//           sources={props?.source}
//           propertyId={props?.propertyId}
//           propertyName={props?.propertyName}
//           propertyLogo={props?.propertyLogo}
//           propertySlogan={props?.propertySlogan}
//         />
//       );
//     } else {
//       throw new Error(
//         "Expected string or array<string>, got " + typeof props?.source + "."
//       );
//     }
//   } else {
//     console.error("Image source is missing!");
//     heroMedia = <div className="w-full aspect-video bg-gray-300"></div>;
//   }

//   if (isPageLoading) {
//     <PageLoader />;
//   }

//   return (
//     <>
//       <div className="relative">{heroMedia}</div>
//     </>
//   );
// };

// export default Hero;
