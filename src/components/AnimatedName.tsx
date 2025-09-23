"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation"; // for App Router (Next 13+ with /app)

const FirstIntro = () => {
  const navigation = useRouter();
  const introRef = useRef(null);
  const introRef2 = useRef(null);
  const roundRef = useRef(null);

  const linesRef = useRef([]);
  linesRef.current = [];

  const addToRefs = (el) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  useGSAP(() => {
    const lineHeight = 120;
    const handleSecondAnimation = () => {
      navigation.push("/home");
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

    tl.fromTo(introRef.current, { y: -100 }, { y: 0, duration: 1 }).to(
      introRef.current,
      { y: 100, duration: 1, ease: "power3.in" },
      "+=0.5"
    );

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

    secondTl
      .fromTo(
        introRef2.current,
        { opacity: 0, y: 0 },
        { opacity: 1, y: 50, duration: 1 }
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
          scale: 20, // large enough to cover full screen
          duration: 1.5,
          ease: "power2.inOut",
        }
      );
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
      <div
        ref={introRef}
        className="text-[64px] font-semibold text-center mb-12 text-black whitespace-nowrap"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Hi, I'm Lazau Andrei-Tudor
      </div>

      <div className="relative h-[800px]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={addToRefs}
            className="absolute left-1/2 -translate-x-1/2 text-[120px] font-bold text-black whitespace-nowrap tracking-wide"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Lazau Andrei-Tudor
          </div>
        ))}
      </div>
      <div
        ref={introRef2}
        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 text-[64px] font-semibold text-center mb-12 text-black whitespace-nowrap"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Welcome to my website
      </div>
      <div ref={roundRef} className="bg-black rounded-full w-[100px]"></div>
    </div>
  );
};

export default FirstIntro;
