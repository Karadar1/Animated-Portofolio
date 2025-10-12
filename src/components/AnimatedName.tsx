"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

const FirstIntro: React.FC = () => {
  const navigation = useRouter();

  const introRef = useRef<HTMLDivElement | null>(null);
  const introRef2 = useRef<HTMLDivElement | null>(null);
  const roundRef = useRef<HTMLDivElement | null>(null);

  // Keep the array stable; don't reset it during render
  const linesRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Responsive line height based on screen size
    const getLineHeight = () => {
      if (window.innerWidth < 640) return 80; // sm breakpoint
      if (window.innerWidth < 768) return 100; // md breakpoint
      if (window.innerWidth < 1024) return 120; // lg breakpoint
      if (window.innerWidth < 1280) return 140; // xl breakpoint
      return 160; // 2xl and above
    };

    const lineHeight = getLineHeight();

    const handleSecondAnimation = () => {
      navigation.push("/acasa");
    };

    const secondTl = gsap.timeline({
      paused: true,
      onComplete: handleSecondAnimation,
    });

    const handleFirstAnimation = () => {
      secondTl.restart();
    };

    const tl = gsap.timeline({
      repeat: 1,
      yoyo: true,
      defaults: { ease: "power2.out" },
      onComplete: handleFirstAnimation,
    });

    // First headline in/out with responsive movement
    const introMovement =
      window.innerWidth < 640 ? 60 : window.innerWidth < 1024 ? 80 : 80;
    tl.fromTo(
      introRef.current,
      { y: -introMovement - 200 },
      { y: 0, duration: 1 }
    ).to(
      introRef.current,
      { y: introMovement, duration: 1, ease: "power3.in" },
      "+=0.5"
    );

    // Waterfall lines
    const waterfallTL = gsap.timeline();
    linesRef.current.forEach((el, i) => {
      const targetY = i * lineHeight;
      const startY = i === 0 ? 0 : (i - 1) * lineHeight;

      waterfallTL.fromTo(
        el,
        { y: startY, opacity: 0 },
        { y: targetY, opacity: 1, duration: 0.7 },
        i * 0.2
      );
    });

    tl.add(waterfallTL, "-=0.05");

    // Second screen + circle wipe with responsive positioning
    const welcomeYMovement =
      window.innerWidth < 640 ? 30 : window.innerWidth < 1024 ? 40 : 50;
    secondTl
      .fromTo(
        introRef2.current,
        { opacity: 0, y: 0 },
        { opacity: 1, y: welcomeYMovement, duration: 1 }
      )
      .fromTo(
        roundRef.current,
        {
          opacity: 1,
          scale: 0,
          width: 100,
          height: 100,
          borderRadius: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
        },
        {
          scale:
            window.innerWidth < 640 ? 15 : window.innerWidth < 1024 ? 18 : 22,
          duration: 1.5,
          ease: "power2.inOut",
        }
      );

    return () => {
      tl.kill();
      secondTl.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Main intro text - responsive sizing */}
      <div
        ref={introRef}
        className="text-3xl sm:text-2xl md:text-7xl lg:text-8xl xl:text-7xl font-semibold text-center pb-14 sm:mb-8 text-black px-2 w-full max-w-none"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Hi, I am
      </div>

      {/* Waterfall container - responsive height */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] w-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={addToRefs}
            className="absolute left-1/2 -translate-x-1/2 text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[100px] font-bold text-black tracking-wide px-1 w-full text-center"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Lazău Andrei-Tudor
          </div>
        ))}
      </div>

      {/* Welcome message - responsive sizing */}
      <div
        ref={introRef2}
        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-semibold text-center mb-6 sm:mb-8 text-black px-2 w-full max-w-none"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Welcome to my website
      </div>

      {/* Circle wipe element */}
      <div ref={roundRef} className="bg-black rounded-full w-[100px]" />
    </div>
  );
};

export default FirstIntro;
