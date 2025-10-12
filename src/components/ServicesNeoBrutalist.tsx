"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Code2,
  Sparkles,
  Boxes,
  Accessibility,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// --- Config servicii (linkuri interne spre subpagini/portofoliu) ---
const services = [
  {
    icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Dezvoltare Frontend",
    desc: "Interfețe React/Next.js cu TypeScript, bugete de performanță și arhitectură testabilă.",
    bullets: [
      "Next.js + TypeScript",
      "Design systems",
      "SSR/SSG",
      "State & data fetching",
    ],
    href: "/services/dezvoltare-web",
  },
  {
    icon: <Boxes className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Livrare Full-Stack",
    desc: "Stack-uri MERN/PERN, autentificare sigură, API-uri și deploy. Predare clară și documentație.",
    bullets: ["Node/Express", "Mongo/Postgres", "CI/CD", "Docker"],
    href: "/services/dezvoltare-web",
  },
  {
    icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Animații & Micro-interacțiuni",
    desc: "Interacțiuni cu GSAP și tranziții între pagini care se simt precise și intenționate.",
    bullets: ["GSAP", "Efecte la scroll", "Micro-interacțiuni", "Animații SVG"],
    href: "/portfolio",
  },
  {
    icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    title: "Audituri & Refactor",
    desc: "Audit de accesibilitate, performanță și UX cu un plan de acțiuni prioritar.",
    bullets: [
      "Lighthouse perf",
      "Verificări A11y (WCAG)",
      "Plan de refactor",
      "Îmbunătățiri DX",
    ],
    href: "/services/optimizare-performanta",
  },
];

export default function ServicesNeoBrutalist() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Respectă preferința de mișcare redusă
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Overlay de tranziție (GSAP încărcat dinamic doar pe client)
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

  // Apariția cardurilor (tot cu GSAP, încărcat la nevoie)

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

      {/* Fundal decorativ */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:40px_100%,100%_20px] sm:[background-size:64px_100%,100%_24px]" />
        <div className="hidden sm:block absolute -top-16 -left-16 w-80 h-80 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] rotate-6" />
        <div className="hidden sm:block absolute -bottom-16 -right-16 w-64 h-64 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] -rotate-3" />
      </div>

      {/* Hero */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-6 sm:pt-5 sm:pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-[28px] sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.02]">
              Servicii
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl text-[13px] sm:text-sm md:text-base">
              Scop clar. Standarde înalte. Simplitate.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px] transition"
              href="/contact"
            >
              Programează un call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Strapline tech */}
      <div className="relative z-10 border-y-2 sm:border-y-4 border-black bg-white overflow-hidden">
        <div className="py-2 sm:py-3 font-extrabold text-[11px] sm:text-sm flex flex-wrap gap-x-3 gap-y-2 items-center justify-center">
          <span>TYPESCRIPT</span>•<span>REACT</span>•<span>NEXT.JS</span>•
          <span>NODE</span>•<span>GSAP</span>•<span>ACCESIBILITATE</span>•
          <span>PERFORMANȚĂ</span>
        </div>
      </div>

      {/* Conținut principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-8 sm:mt-10">
          {/* Pachete (rail) */}
          <aside
            id="pachete"
            className="lg:col-span-4 h-fit lg:sticky lg:top-24 space-y-4 sm:space-y-6"
          >
            <div className="bg-white border-2 sm:border-4 border-black shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-5">
              <h1 className="text-lg sm:text-xl font-extrabold">Pachete</h1>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-[13px] sm:text-sm">
                {[
                  { name: "Consultație 25 de minute", price: "Gratuit" },
                  { name: "Site WordPress de bază", price: "€ 500" },
                  { name: "Website WordPress complex", price: "€ 1.000" },
                  { name: "Website Next.js (frontend)", price: "€ 1.200" },
                  { name: "Website Next.js (full-stack)", price: "€ 1.800" },
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
                href="/contact"
                className="mt-3 sm:mt-4 inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px] transition"
              >
                Cere ofertă
              </Link>
            </div>

            <div className="bg-white border-2 sm:border-4 border-black shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-5">
              <h3 className="text-[12px] sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
                <Accessibility className="w-4 h-4" /> Accesibilitate pe primul
                loc
              </h3>
              <p className="mt-2 text-[13px] sm:text-sm">
                Accent pe contrast, navigare din tastatură și semantică pentru
                cititoare de ecran.
              </p>
            </div>
          </aside>

          {/* Lista de servicii */}
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
                        <h2 className="text-lg sm:text-2xl font-extrabold leading-tight">
                          {String(i + 1).padStart(2, "0")} — {s.title}
                        </h2>
                      </div>
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

                    {/* Acțiune mobil */}
                    <div className="mt-3 sm:hidden">
                      <Link
                        className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs font-black shadow-[4px_4px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
                        href={s.href}
                      >
                        Află mai mult <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* FAQ scurt – util pentru SEO; stil minimalist */}
        <section className="mt-10 sm:mt-12 border-2 sm:border-4 border-black bg-white shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-extrabold">
            Întrebări frecvente
          </h2>
          <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-[13px] sm:text-sm">
            <details>
              <summary className="font-bold">
                Cât durează realizarea unui site Next.js?
              </summary>
              <p className="mt-1">
                Pentru un site mic, între 1–3 săptămâni în funcție de conținut
                și funcționalități.
              </p>
            </details>
            <details>
              <summary className="font-bold">
                Puteți optimiza un site existent?
              </summary>
              <p className="mt-1">
                Da. Fac un audit (performanță, accesibilitate, SEO tehnic) și
                livrez un plan clar de implementare.
              </p>
            </details>
            <details>
              <summary className="font-bold">
                Cum lucrăm la conținut și SEO?
              </summary>
              <p className="mt-1">
                Mapăm paginile pe intenții de căutare, scriem titluri/meta
                corecte și adăugăm schema.org (FAQ, Breadcrumbs).
              </p>
            </details>
          </div>
        </section>

        {/* CTA contact */}
        <section
          id="contact"
          className="mt-10 sm:mt-12 border-2 sm:border-4 border-black bg-white shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold">
              Ai un proiect în minte?
            </h3>
            <p className="mt-1 text-[13px] sm:text-sm">
              Stabilim rapid scopul și livrăm cu claritate alb & negru.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="mailto:lazau.tudor@yahoo.com"
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-black shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
            >
              Email
            </Link>
          </div>
        </section>
      </main>

      {/* A11y: focus vizibil + reduce motion */}
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
