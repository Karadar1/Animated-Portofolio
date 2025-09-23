"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { HoverImageLinks } from "./HoverImageLinks";

const SecondIntro = () => {
  const titleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      titleRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4 }
    )
      .to(
        titleRef.current,
        { y: 100, opacity: 0, duration: 1.2, ease: "power4.in" },
        "+=0.8"
      )
      .fromTo(
        menuRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.6 },
        "-=0.4"
      );
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
      <div
        ref={titleRef}
        className="text-[48px] font-semibold text-center mb-12 text-black whitespace-nowrap"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Welcome to my site
      </div>

      <div ref={menuRef}>
        <HoverImageLinks />
      </div>
    </div>
  );
};

export default SecondIntro;
