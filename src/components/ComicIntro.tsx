"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
  const bubbles = [
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
  ];

  const goPrev = () =>
    setIndex((i) => (i - 1 + bubbles.length) % bubbles.length);
  const goNext = () => setIndex((i) => (i + 1) % bubbles.length);

  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-6xl relative flex flex-col md:flex-row md:items-start gap-10">
        {/* LEFT: Portrait panel */}
        <div className="relative">
          <div className="relative bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-2">
            <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
            <Image
              src={portraitSrc}
              alt={`${name} portrait`}
              width={340}
              height={420}
              className="relative z-10 w-[280px] md:w-[340px] h-auto object-cover select-none"
              priority
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase font-black bg-white border-2 border-black px-2 py-1 shadow-[4px_4px_0_0_#000]">
              It’s me!
            </div>
          </div>

          {/* corner ticks */}
          <div className="pointer-events-none absolute -top-2 -left-2 w-4 h-4 bg-black" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 w-4 h-4 bg-black" />
        </div>

        {/* RIGHT: Bubble container FIXED to the right of the image */}
        <div className="relative md:ml-6">
          {/* This wrapper anchors the bubble right beside the portrait.
              On small screens it stacks; on md+ it’s visually attached. */}
          <div className="relative md:absolute md:left-[calc(100%+24px)] md:top-0">
            {/* Nav buttons */}

            {/* Bubble with animated swap */}
            <div className="relative w-[min(80vw,560px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bubbles[index].key}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-6 md:p-8"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
                  <div className="relative">
                    {bubbles[index].title && (
                      <p className="text-[11px] uppercase font-black tracking-widest mb-2">
                        {bubbles[index].title}
                      </p>
                    )}
                    <h2 className="text-2xl md:text-3xl font-black leading-tight">
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
                          <p className="text-[11px] uppercase font-black">
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
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href="#portfolio"
                          className="px-4 py-2 border-4 border-black bg-black text-white text-sm font-black uppercase shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                        >
                          View Work
                        </a>
                        <a
                          href="#contact"
                          className="px-4 py-2 border-4 border-black bg-white text-black text-sm font-black uppercase shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                        >
                          Contact Me
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Tail pointing LEFT to the portrait */}
                  <BubbleTail direction="left" className="bottom-6" />

                  {/* Caption tag */}
                  <div className="absolute -top-4 left-4 text-[10px] uppercase bg-white border-2 border-black px-2 py-1 font-black shadow-[4px_4px_0_0_#000]">
                    {bubbles[index].caption}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex mt-10 items-center gap-2 mb-3">
                <button
                  onClick={goPrev}
                  className="px-3 py-2 border-4 border-black bg-white text-black text-xs font-black uppercase shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                  aria-label="Previous bubble"
                >
                  Prev
                </button>
                <button
                  onClick={goNext}
                  className="px-3 py-2 border-4 border-black bg-white text-black text-xs font-black uppercase shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                  aria-label="Next bubble"
                >
                  Next
                </button>
                <div className="ml-2 text-[10px] font-black uppercase">
                  {index + 1} / {bubbles.length}
                </div>
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
  direction?: "left" | "right";
  className?: string;
}) {
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
