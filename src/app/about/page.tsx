"use client";

import Navbar from "@/components/Navbar";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutScrollCarousel() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const setSlideRef =
    (i: number) =>
    (el: HTMLDivElement | null): void => {
      slidesRef.current[i] = el;
    };

  // Entry circle overlay
  useGSAP(() => {
    const c = circleRef.current;
    if (!c) return;

    gsap.set(c, {
      scale: 20,
      opacity: 1,
      transformOrigin: "50% 50%",
      willChange: "transform,opacity",
    });

    const tl = gsap.to(c, {
      scale: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(c, { display: "none" });
      },
    });

    return () => tl.kill();
  }, []);

  // Scroll logic: desktop alt L/R; mobile bottom-up cover
  useGSAP(() => {
    const stage = stageRef.current!;
    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (!stage || !slides.length) return;

    // Clean previous
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf(slides);

    const mm = gsap.matchMedia();

    // DESKTOP/TABLET
    mm.add("(min-width: 768px)", () => {
      gsap.set(slides, { xPercent: 0, yPercent: 0, willChange: "transform" });

      const transitions = slides.length - 1;

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: `+=${transitions * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          ...(transitions > 0
            ? {
                snap: {
                  snapTo: 1 / transitions,
                  duration: 0.2,
                  ease: "power1.inOut",
                },
              }
            : {}),
        },
      });

      for (let i = 0; i < transitions; i++) {
        const dir = i % 2 === 0 ? -100 : 100; // alternate left/right
        tl.to(slides[i], { xPercent: dir });
      }

      return () => tl.kill();
    });

    // MOBILE: each next slide rises from bottom and covers previous
    mm.add("(max-width: 767px)", () => {
      slides.forEach((el, i) => {
        gsap.set(el, {
          position: "absolute",
          inset: 0,
          yPercent: i === 0 ? 0 : 100, // first is visible; others below
          xPercent: 0,
          willChange: "transform",
          zIndex: 100 + i, // later slides cover earlier ones
        });
      });

      const transitions = slides.length - 1;

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: `+=${transitions * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          ...(transitions > 0
            ? {
                snap: {
                  snapTo: 1 / transitions,
                  duration: 0.2,
                  ease: "power1.inOut",
                },
              }
            : {}),
        },
      });

      for (let i = 0; i < transitions; i++) {
        // bring next slide up from bottom
        tl.to(slides[i + 1], { yPercent: 0 });
      }

      return () => tl.kill();
    });

    // ensure measurements are correct
    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(slides);
    };
  }, []);

  const SlideBG = ({ index }: { index: number }) => (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-white" />
      {index === 0 && (
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      )}
      {index === 1 && (
        <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(135deg,#000_0,#000_2px,transparent_2px,transparent_14px)]" />
      )}
      {index === 2 && (
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-[28vw] leading-none font-black text-black/5 select-none">
            02
          </div>
        </div>
      )}
      {index === 3 && (
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,rgba(0,0,0,0.06)_50%,transparent_50%),linear-gradient(0deg,rgba(0,0,0,0.06)_50%,transparent_50%)] [background-size:40px_40px]" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black relative">
      <Navbar />

      {/* Transition overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[120px] h-[120px] rounded-full bg-black"
        />
      </div>

      {/* Stage */}
      <section ref={stageRef} className="relative h-[100vh]">
        {/* Slides: absolute stack for both breakpoints (mobile needs cover) */}
        <div className="absolute inset-0">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              ref={setSlideRef(idx)}
              className="absolute inset-0 flex items-center"
              style={{ zIndex: 50 - idx }}
            >
              {/* Background per slide */}
              <SlideBG index={idx} />

              {/* Content */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                <div
                  className={`${
                    idx % 2 === 0
                      ? "md:col-start-2 md:col-span-5"
                      : "md:col-start-7 md:col-span-5"
                  }`}
                >
                  <h2 className="text-4xl mt-30 md:text-6xl font-black leading-[0.98]">
                    {idx === 0 && "About Me"}
                    {idx === 1 && "Skills & Tools"}
                    {idx === 2 && "Achievements"}
                    {idx === 3 && "Now / Next"}
                  </h2>
                </div>

                <div
                  className={`${
                    idx % 2 === 0
                      ? "md:col-start-7 md:col-span-5"
                      : "md:col-start-2 md:col-span-5"
                  }`}
                >
                  {idx === 0 && (
                    <div className="border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[6px_6px_0_0_#000] md:shadow-[10px_10px_0_0_#000]">
                      <p className="text-sm md:text-base leading-7">
                        I’m Andrei-Tudor Lazău — a frontend/full-stack developer
                        focused on clean interfaces, performance, and motion. I
                        build with React/Next.js, TypeScript, and GSAP, and I
                        love turning complex flows into simple, crisp
                        experiences.
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {[
                          "React",
                          "TypeScript",
                          "Next.js",
                          "GSAP",
                          "Node",
                          "Postgres",
                        ].map((t) => (
                          <li
                            key={t}
                            className="text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                      {[
                        {
                          h: "Frontend",
                          items: [
                            "React / Next.js",
                            "TypeScript",
                            "Tailwind",
                            "GSAP",
                          ],
                        },
                        {
                          h: "Backend",
                          items: [
                            "Node / Express",
                            "PostgreSQL",
                            "MongoDB",
                            "Flask",
                          ],
                        },
                        {
                          h: "DevOps",
                          items: ["Docker", "CI/CD", "AWS", "Vercel"],
                        },
                        {
                          h: "UX",
                          items: [
                            "Design systems",
                            "Accessibility",
                            "Prototyping",
                            "Testing",
                          ],
                        },
                      ].map((card) => (
                        <div
                          key={card.h}
                          className="border-2 md:border-4 border-black bg-white p-4 md:p-5 shadow-[6px_6px_0_0_#000] md:shadow-[8px_8px_0_0_#000]"
                        >
                          <h3 className="text-base md:text-lg font-extrabold">
                            {card.h}
                          </h3>
                          <ul className="mt-2 space-y-1 text-sm">
                            {card.items.map((it) => (
                              <li key={it}>• {it}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="border-2  md:border-4 border-black bg-white p-4 md:p-6 shadow-[6px_6px_0_0_#000] md:shadow-[10px_10px_0_0_#000]">
                      <ul className="space-y-2 text-sm">
                        <li>
                          • Innovation Labs 2024 — national semifinals (Second
                          Cycle)
                        </li>
                        <li>
                          • Nerd-Pitch — 1st place; Digital Nerd — 3rd; Ness
                          Tech — finalist
                        </li>
                        <li>
                          • IBM Summer Practice — full-stack finance app (PERN)
                        </li>
                        <li>• 3Pillar AC Labs — React + Flask product build</li>
                      </ul>
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="grid gap-3 md:gap-4">
                      <div className="border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[6px_6px_0_0_#000] md:shadow-[10px_10px_0_0_#000]">
                        <h3 className="text-base md:text-lg font-extrabold">
                          Currently
                        </h3>
                        <p className="mt-2 text-sm">
                          Freelance/contract work focused on frontend polish,
                          animations, and feature delivery.
                        </p>
                      </div>
                      <div className="border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[6px_6px_0_0_#000] md:shadow-[10px_10px_0_0_#000]">
                        <h3 className="text-base md:text-lg font-extrabold">
                          Next
                        </h3>
                        <p className="mt-2 text-sm">
                          Open to collaborations on product teams that value
                          clarity, performance, and motion.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer to ease scroll exit from pin */}
      <div className="h-[10svh] md:h-[20vh]" />

      <style jsx>{`
        html,
        body {
          overflow-x: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
