"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {
  name?: string;
  role?: string;
  skills?: string[];
  passions?: string[];
  portraitSrc?: string;
};

export default function ComicIntroWithNav({
  name = "Andrei-Tudor Lazău",
  role = "Frontend & Full-Stack Developer",
  skills = ["React", "Next.js", "TypeScript", "Node.js", "GSAP", "Tailwind"],
  passions = ["Basketball", "Gaming", "Movies", "Tech"],
  portraitSrc = "/portrait.png",
}: Props) {
  const [index, setIndex] = useState(0); // 0 = Intro, 1 = Passions

  const bubbles = useMemo(
    () => [
      {
        key: "intro",
        title: "Hello there—",
        heading: `I’m ${name}.`,
        body: `${role}. I build crisp, fast interfaces with a touch of motion.`,
        listLabel: "My skills:",
        list: skills,
        ctas: true,
        caption: "Introducing…",
      },
      {
        key: "passions",
        title: "When I’m not coding…",
        heading: "I’m into:",
        body: "They keep my design eye sharp, reaction time quick, and my teamwork instinct strong.",
        listLabel: "",
        list: passions,
        ctas: false,
        caption: "Passions",
      },
    ],
    [name, role, skills, passions]
  );

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + bubbles.length) % bubbles.length),
    [bubbles.length]
  );
  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % bubbles.length),
    [bubbles.length]
  );

  return (
    <section className="w-full mt-14 md:mt-0 px-4 sm:px-6 py-10">
      {/* Desktop = clean 2-col grid; Mobile = stacked */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* LEFT: Portrait panel */}
        <div className="md:col-span-5">
          <div className="relative bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-2 w-fit mx-auto md:mx-0">
            <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
            <Image
              src={portraitSrc}
              alt={`${name} portrait`}
              width={360}
              height={420}
              className="relative z-10 w-[min(80vw,360px)] md:w-[360px] h-auto object-cover select-none"
              priority
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase font-black bg-white border-2 border-black px-2 py-1 shadow-[4px_4px_0_0_#000]">
              It’s me!
            </div>

            {/* corner ticks */}
            <div className="pointer-events-none absolute -top-2 -left-2 w-4 h-4 bg-black" />
            <div className="pointer-events-none absolute -bottom-2 -right-2 w-4 h-4 bg-black" />
          </div>
        </div>

        {/* RIGHT: Bubble (flows normally on desktop) */}
        <div className="md:col-span-7">
          <div className="relative w-full max-w-[720px] md:mx-0 mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={bubbles[index].key}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-5 sm:p-6 md:p-8"
              >
                <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
                <div className="relative">
                  {bubbles[index].title && (
                    <p className="text-[10px] sm:text-[11px] uppercase font-black tracking-widest mb-2">
                      {bubbles[index].title}
                    </p>
                  )}
                  <h2 className="font-black leading-tight text-[clamp(24px,3.2vw,34px)]">
                    {bubbles[index].heading}
                  </h2>
                  {bubbles[index].body && (
                    <p className="mt-2 text-sm md:text-base">
                      {bubbles[index].body}
                    </p>
                  )}

                  {bubbles[index].list?.length ? (
                    <div className="mt-4">
                      {bubbles[index].listLabel && (
                        <p className="text-[10px] sm:text-[11px] uppercase font-black">
                          {bubbles[index].listLabel}
                        </p>
                      )}
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {bubbles[index].list.map((item) => (
                          <li
                            key={item}
                            className="text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {bubbles[index].ctas && (
                    <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                      <Link
                        href="/portofolio"
                        className="w-full sm:w-auto text-center px-4 py-3 border-4 border-black bg-white text-sm font-black uppercase shadow-[6px_6px_0_0_#000] active:translate-x-0.5 active:-translate-y-0.5"
                      >
                        View Work
                      </Link>
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto text-center px-4 py-3 border-4 border-black bg-white text-black text-sm font-black uppercase shadow-[6px_6px_0_0_#000] active:translate-x-0.5 active:-translate-y-0.5"
                      >
                        Contact Me
                      </Link>
                    </div>
                  )}
                </div>

                {/* Tails:
                    - mobile: tail up (points to portrait above)
                    - desktop: tail left (points to portrait column) */}
                <div className="md:hidden">
                  <BubbleTail
                    direction="up"
                    className="-top-4 left-1/2 -translate-x-1/2"
                  />
                </div>
                <div className="hidden md:block">
                  <BubbleTail
                    direction="left"
                    className="top-1/2 -translate-y-1/2"
                  />
                </div>

                {/* Caption tag */}
                <div className="absolute -top-4 left-4 text-[10px] uppercase bg-white border-2 border-black px-2 py-1 font-black shadow-[4px_4px_0_0_#000]">
                  {bubbles[index].caption}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row mt-6 items-stretch sm:items-center gap-2">
              <button
                onClick={goPrev}
                className="px-4 py-3 border-4 border-black bg-white text-black text-xs font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:-translate-y-0.5"
                aria-label="Previous bubble"
              >
                Prev
              </button>
              <button
                onClick={goNext}
                className="px-4 py-3 border-4 border-black bg-black text-white text-xs font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:-translate-y-0.5"
                aria-label="Next bubble"
              >
                Next
              </button>
              <div className="sm:ml-2 text-[10px] font-black uppercase self-center">
                {index + 1} / {bubbles.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Comic speech tail */
function BubbleTail({
  direction = "left",
  className = "",
}: {
  direction?: "left" | "right" | "up";
  className?: string;
}) {
  if (direction === "up") {
    return (
      <div aria-hidden className={`absolute ${className} w-0 h-0 rotate-180`}>
        {/* outline */}
        <div className="absolute -left-1 -top-1 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[26px] border-t-black" />
        {/* fill */}
        <div className="relative border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[26px] border-t-white translate-y-1" />
      </div>
    );
  }

  const side = direction === "left" ? "left-[-10px]" : "right-[-10px]";
  const rot = direction === "left" ? "-rotate-90" : "rotate-90";
  return (
    <div aria-hidden className={`absolute ${side} ${className} w-0 h-0 ${rot}`}>
      {/* outline */}
      <div className="absolute -left-1 -top-1 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[26px] border-t-black" />
      {/* fill */}
      <div className="relative border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[26px] border-t-white translate-y-1" />
    </div>
  );
}
