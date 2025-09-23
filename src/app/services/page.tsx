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

gsap.registerPlugin(useGSAP);

const services = [
  {
    icon: <Code2 className="w-5 h-5" aria-hidden />,
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
    icon: <Boxes className="w-5 h-5" aria-hidden />,
    title: "Full‑Stack Delivery",
    desc: "MERN/PERN stacks, secure auth, APIs and deployments. Clear hand‑offs and docs included.",
    bullets: ["Node/Express", "Mongo/Postgres", "CI/CD", "Docker"],
  },
  {
    icon: <Sparkles className="w-5 h-5" aria-hidden />,
    title: "Motion & Polish",
    desc: "GSAP-powered interactions and page transitions that feel crisp and intentional.",
    bullets: ["GSAP", "Scroll effects", "Micro‑interactions", "SVG motion"],
  },
  {
    icon: <Wrench className="w-5 h-5" aria-hidden />,
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
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => gsap.set(c, { display: "none" }),
    });
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-card]");
    gsap.set(items, { y: 18, opacity: 0 });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.06,
      delay: 0.15,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <Navbar />

      {/* Transition overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[120px] h-[120px] rounded-full bg-black"
        />
      </div>

      {/* Background: bold B&W texture grid + stamp border */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:64px_100%,100%_24px]" />
        {/* Big corner blocks for framing */}
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] rotate-6" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] -rotate-3" />
      </div>

      {/* Hero */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              Services
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base">
              Clear scope. High standards. Brutal simplicity. Everything in
              **black & white**.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              className="inline-flex items-center gap-2 border-4 border-black bg-white px-4 py-2 text-sm font-bold shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
              href="#contact"
            >
              Book a call <ArrowRight className="w-4 h-4" />
            </a>
            <a
              className="inline-flex items-center gap-2 border-4 border-black bg-black text-white px-4 py-2 text-sm font-bold shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
              href="#packages"
            >
              View packages
            </a>
          </div>
        </div>
      </header>

      {/* Marquee / strapline */}
      <div className="relative z-10 border-y-4 border-black bg-white overflow-hidden">
        <div className="whitespace-nowrap py-3 font-extrabold text-sm flex justify-center">
          <span className="mx-6">TYPESCRIPT</span>•
          <span className="mx-6">REACT</span>•
          <span className="mx-6">NEXT.JS</span>•
          <span className="mx-6">NODE</span>•<span className="mx-6">GSAP</span>•
          <span className="mx-6">ACCESSIBILITY</span>•
          <span className="mx-6">PERFORMANCE</span>
        </div>
      </div>

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Left rail: packages (different from Experience layout) */}
          <aside id="packages" className="lg:col-span-4 h-fit sticky top-24">
            <div className="bg-white border-4 border-black shadow-[10px_10px_0_0_#000] p-5">
              <h3 className="text-xl font-extrabold">Packages</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="border-2 border-black p-3 flex items-center justify-between">
                  <span>Landing in a Week</span>
                  <span className="font-black">€ —</span>
                </li>
                <li className="border-2 border-black p-3 flex items-center justify-between">
                  <span>UI Polish & Motion Pass</span>
                  <span className="font-black">€ —</span>
                </li>
                <li className="border-2 border-black p-3 flex items-center justify-between">
                  <span>Feature Sprint (Weekly)</span>
                  <span className="font-black">€ —</span>
                </li>
                <li className="border-2 border-black p-3 flex items-center justify-between">
                  <span>Audit & Refactor</span>
                  <span className="font-black">€ —</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 border-4 border-black bg-black text-white px-4 py-2 text-sm font-bold shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
              >
                Get a quote
              </a>
            </div>
            <div className="mt-6 bg-white border-4 border-black shadow-[10px_10px_0_0_#000] p-5">
              <h4 className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
                <Accessibility className="w-4 h-4" /> Accessibility First
              </h4>
              <p className="mt-2 text-sm">
                Strong focus on color contrast, keyboard flows and screen‑reader
                semantics.
              </p>
            </div>
          </aside>

          {/* Cards list */}
          <section className="lg:col-span-8" ref={listRef}>
            <ol className="space-y-6">
              {services.map((s, i) => (
                <li key={s.title} data-card>
                  <article className="relative bg-white border-4 border-black p-6 shadow-[10px_10px_0_0_#000] group hover:-translate-y-1 hover:translate-x-1 transition">
                    {/* Ticket notch accents */}
                    <div className="absolute -left-3 top-8 w-6 h-6 bg-white border-4 border-black rounded-full" />
                    <div className="absolute -right-3 top-8 w-6 h-6 bg-white border-4 border-black rounded-full" />

                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 grid place-items-center border-4 border-black bg-white shadow-[4px_4px_0_0_#000]">
                          {s.icon}
                        </div>
                        <h3 className="text-2xl font-extrabold leading-tight">
                          {String(i + 1).padStart(2, "0")} — {s.title}
                        </h3>
                      </div>
                      <a
                        className="hidden sm:inline-flex items-center gap-2 border-4 border-black bg-white px-3 py-1 text-xs font-black shadow-[4px_4px_0_0_#000] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                        href="#contact"
                      >
                        Start <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>

                    <p className="mt-4 text-sm leading-6">{s.desc}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* CTA banner */}
        <section
          id="contact"
          className="mt-12 border-4 border-black bg-white shadow-[10px_10px_0_0_#000] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h4 className="text-xl font-extrabold">Have a project in mind?</h4>
            <p className="mt-1 text-sm">
              Let’s scope it quickly and ship in black & white clarity.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:andrei@example.com"
              className="inline-flex items-center gap-2 border-4 border-black bg-white px-4 py-2 text-sm font-black shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
            >
              Email
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border-4 border-black bg-black text-white px-4 py-2 text-sm font-black shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
            >
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 text-xs flex items-center justify-between">
          <span>© {new Date().getFullYear()} Andrei‑Tudor Lazău</span>
          <span>Neo‑Brutalist Services</span>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
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
