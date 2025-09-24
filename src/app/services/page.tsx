"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Wrench,
  Code2,
  Sparkles,
  Boxes,
  Accessibility,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const services = [
  {
    icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Frontend Engineering",
    desc: "React/Next.js interfaces engineered with TypeScript, performance budgets, and testable architecture.",
    bullets: [
      "Next.js + TypeScript",
      "Design systems",
      "SSR/SSG",
      "State & data fetching",
    ],
  },
  {
    icon: <Boxes className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Full-Stack Delivery",
    desc: "MERN/PERN stacks, secure auth, APIs and deployments. Clear hand-offs and docs included.",
    bullets: ["Node/Express", "Mongo/Postgres", "CI/CD", "Docker"],
  },
  {
    icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Motion & Polish",
    desc: "GSAP-powered interactions and page transitions that feel crisp and intentional.",
    bullets: ["GSAP", "Scroll effects", "Micro-interactions", "SVG motion"],
  },
  {
    icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Audits & Refactors",
    desc: "Accessibility, performance and UX audits with a prioritized, actionable roadmap.",
    bullets: [
      "Lighthouse perf",
      "A11y checks (WCAG)",
      "Refactor plans",
      "DX improvements",
    ],
  },
];

export default function ServicesNeoBrutalistBW() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Page transition overlay (covers navbar)
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
      duration: 1.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(c, { display: "none" });
      },
    });
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-card]");
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    gsap.set(items, { y: isMobile ? 10 : 18, opacity: 0 });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: isMobile ? 0.04 : 0.06,
      delay: 0.1,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <Navbar />

      {/* Transition overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-black"
        />
      </div>

      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:40px_100%,100%_20px] sm:[background-size:64px_100%,100%_24px]" />
        <div className="hidden sm:block absolute -top-16 -left-16 w-80 h-80 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] rotate-6" />
        <div className="hidden sm:block absolute -bottom-16 -right-16 w-64 h-64 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] -rotate-3" />
      </div>

      {/* Hero */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-[calc(env(safe-area-inset-top,0)+88px)] pb-6 sm:pt-28 sm:pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-[28px] sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.02]">
              Services
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl text-[13px] sm:text-sm md:text-base">
              Clear scope. High standards. Brutal simplicity. Everything in{" "}
              <span className="font-bold">black & white</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px] transition"
              href="#contact"
            >
              Book a call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px] transition"
              href="#packages"
            >
              View packages
            </Link>
          </div>
        </div>
      </header>

      {/* Strapline */}
      <div className="relative z-10 border-y-2 sm:border-y-4 border-black bg-white overflow-hidden">
        <div className="py-2 sm:py-3 font-extrabold text-[11px] sm:text-sm flex flex-wrap gap-x-3 gap-y-2 items-center justify-center">
          <span>TYPESCRIPT</span>•<span>REACT</span>•<span>NEXT.JS</span>•
          <span>NODE</span>•<span>GSAP</span>•<span>ACCESSIBILITY</span>•
          <span>PERFORMANCE</span>
        </div>
      </div>

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-8 sm:mt-10">
          {/* Packages rail with PRICES MATCHED */}
          <aside
            id="packages"
            className="lg:col-span-4 h-fit lg:sticky lg:top-24 space-y-4 sm:space-y-6"
          >
            <div className="bg-white border-2 sm:border-4 border-black shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-extrabold">Packages</h3>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-[13px] sm:text-sm">
                {[
                  { name: "25 minutes consultation", price: "Free" },
                  { name: "Basic WordPress site", price: "€ 500" },
                  { name: "Complex Worpress webiste", price: "€ 1.000" },
                  { name: "Next.js website (frontend)", price: "€ 1.200" },
                  { name: "Next.js website (full-stack)", price: "€ 1.800" },
                ].map((p) => (
                  <li
                    key={p.name}
                    className="border-2 border-black p-2 sm:p-3 flex items-center justify-between"
                  >
                    <span>{p.name}</span>
                    <span className="font-black">{p.price}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className="mt-3 sm:mt-4 inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px] transition"
              >
                Get a quote
              </Link>
            </div>

            <div className="bg-white border-2 sm:border-4 border-black shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-5">
              <h4 className="text-[12px] sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
                <Accessibility className="w-4 h-4" /> Accessibility First
              </h4>
              <p className="mt-2 text-[13px] sm:text-sm">
                Strong focus on color contrast, keyboard flows and screen-reader
                semantics.
              </p>
            </div>
          </aside>

          {/* Cards list */}
          <section className="lg:col-span-8" ref={listRef}>
            <ol className="space-y-4 sm:space-y-6">
              {services.map((s, i) => (
                <li key={s.title} data-card>
                  <article className="relative bg-white border-2 sm:border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] group active:translate-x-[1px] active:-translate-y-[1px] transition">
                    <div className="hidden sm:block absolute -left-3 top-8 w-6 h-6 bg-white border-4 border-black rounded-full" />
                    <div className="hidden sm:block absolute -right-3 top-8 w-6 h-6 bg-white border-4 border-black rounded-full" />

                    <div className="flex items-start justify-between gap-4 sm:gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 grid place-items-center border-2 sm:border-4 border-black bg-white shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]">
                          {s.icon}
                        </div>
                        <h3 className="text-lg sm:text-2xl font-extrabold leading-tight">
                          {String(i + 1).padStart(2, "0")} — {s.title}
                        </h3>
                      </div>
                      <Link
                        className="hidden sm:inline-flex items-center gap-2 border-4 border-black bg-white px-3 py-1 text-xs font-black shadow-[4px_4px_0_0_#000] transition active:translate-x-[1px] active:-translate-y-[1px]"
                        href="#contact"
                      >
                        Start <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm leading-6">
                      {s.desc}
                    </p>

                    <ul className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-[11px] sm:text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Mobile action */}
                    <div className="mt-3 sm:hidden">
                      <Link
                        className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-black shadow-[4px_4px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
                        href="#contact"
                      >
                        Start <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* CTA banner */}
        <section
          id="contact"
          className="mt-10 sm:mt-12 border-2 sm:border-4 border-black bg-white shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4"
        >
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold">
              Have a project in mind?
            </h4>
            <p className="mt-1 text-[13px] sm:text-sm">
              Let’s scope it quickly and ship in black & white clarity.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="mailto:andrei@example.com"
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
            >
              Email
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
            >
              WhatsApp
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t-2 sm:border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 text-[11px] sm:text-xs flex items-center justify-between">
          <span>© {new Date().getFullYear()} Andrei-Tudor Lazău</span>
          <span>Neo-Brutalist Services</span>
        </div>
      </footer>

      <style jsx>{`
        :global(a:focus-visible),
        :global(button:focus-visible) {
          outline: 3px solid #000;
          outline-offset: 3px;
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
