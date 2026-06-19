"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Navbar from "./NavBar";

interface CarouselProps {
  sources: { sequence: number; image: string }[];
  propertyName: string;
}

function Carousel(props: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const autoRotationActiveRef = useRef(true);
  const router = useRouter();

  const sortedSources = useMemo(
    () => [...(props.sources || [])].sort((a, b) => a.sequence - b.sequence),
    [props.sources]
  );

  const noOfSlides = sortedSources.length;

  useEffect(() => {
    if (!autoRotationActiveRef.current || noOfSlides <= 1) return;

    const id = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % noOfSlides);
    }, 8000);

    return () => clearTimeout(id);
  }, [currentSlide, noOfSlides]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stopAutoRotation = () => {
    autoRotationActiveRef.current = false;
  };

  const handleNextSlide = () => {
    stopAutoRotation();
    setCurrentSlide((prev) => (prev + 1) % noOfSlides);
  };

  const handlePrevSlide = () => {
    stopAutoRotation();
    setCurrentSlide((prev) => (prev + noOfSlides - 1) % noOfSlides);
  };

  const handleDotClick = (idx: number) => {
    stopAutoRotation();
    setCurrentSlide(idx);
  };

  return (
    <>
      <Navbar />

      <div className="relative w-full min-h-[88vh] overflow-hidden">
        {sortedSources.map((image, idx) => (
          <div
            key={`${image.image}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide !== idx ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-black/35 to-black/50" />

            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${scrollY * 0.25}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              <Image
                width={1600}
                height={900}
                src={image.image}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
                priority={idx === 0}
              />
            </div>

            {currentSlide === idx && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center space-y-6 max-w-4xl mx-auto animate-fadeIn">
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-100 drop-shadow-lg">
                  {props.propertyName}
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light tracking-wide leading-relaxed">
                  Walk with us, as we celebrate queerness, connection, and
                  freedom in every movement.
                </p>

                <button
                  onClick={() => router.push("sign-up")}
                  className="mt-4 px-8 py-3 bg-[#0d4db0] hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-500 cursor-pointer"
                >
                  Sign Up Now
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 z-30 bg-linear-to-b from-transparent via-white/40 to-white" />

        {noOfSlides > 1 && (
          <>
            <AiOutlineLeft
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl cursor-pointer bg-white/10 text-white hover:bg-white/20 transition-all z-30 rounded-full p-2 backdrop-blur"
            />

            <AiOutlineRight
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl cursor-pointer bg-white/10 text-white hover:bg-white/20 transition-all z-30 rounded-full p-2 backdrop-blur"
            />
          </>
        )}

        {noOfSlides > 1 && (
          <div className="absolute bottom-8 w-full flex justify-center gap-3 z-30">
            {sortedSources.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDotClick(idx)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  currentSlide === idx
                    ? "w-8 bg-white shadow-lg"
                    : "w-3 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Carousel;