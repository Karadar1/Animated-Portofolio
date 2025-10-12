"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// --- Conținut ---
// --- Conținut (actualizat RO) ---
const projects = [
  {
    title: "Second Cycle",
    summary:
      "Platformă e-commerce pentru biciclete recondiționate. Semifinalist Innovation Labs.",
    role: "Dezvoltator Frontend",
    stack: ["React", "TypeScript", "Node", "Express", "MongoDB"],
    cta: {
      label: "Vezi proiectul",
      href: "https://github.com/SecondCycleRO/frontend",
      external: true,
    },
  },
  {
    title: "IBM Summer Practice",
    summary:
      "Aplicație de management al finanțelor (PERN), cu autentificare și grafice interactive.",
    role: "Inginer software",
    stack: ["React", "TypeScript", "Postgres", "Express", "Node"],
    cta: {
      label: "Vezi proiectul",
      href: "https://github.com/raulariton/pennywise",
      external: true,
    },
  },
  {
    title: "3Pillar AC Labs",
    summary:
      "Prototip cu API Flask, containerizat în Docker și livrat pe infrastructură cloud.",
    role: "Dezvoltator Full-Stack",
    stack: ["React", "TypeScript", "Python", "Flask", "MySQL", "Docker"],
    cta: { label: "Vezi proiectul", href: "#", external: false },
  },
  {
    title: "Lucru pentru clienți",
    summary:
      "Interfețe de producție cu micro-animații și hand-off clar către echipele interne.",
    role: "Frontend / Motion",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    cta: { label: "Vezi proiectul", href: "/contact", external: false },
  },
];

export default function PortfolioNeoBrutalistRO() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Tranziție de intrare (GSAP dinamic, doar pe client)
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

  // Stagger pentru carduri (tot cu GSAP, încărcat la nevoie)
  useEffect(() => {
    let kill = () => {};
    (async () => {
      if (!gridRef.current) return;
      const { default: gsap } = await import("gsap");
      const cards =
        gridRef.current.querySelectorAll<HTMLElement>("[data-card]");
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      gsap.set(cards, { y: isMobile ? 12 : 20, opacity: 0 });
      const anim = gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: isMobile ? 0.05 : 0.07,
        ease: "power2.out",
        delay: 0.15,
      });
      kill = () => anim.kill();
    })();
    return () => kill();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      <Navbar />

      {/* Transition overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[120px] h-[120px] rounded-full bg-black"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-16 md:pt-0 pb-6 sm:pb-10">
        <h1 className="inline-block border-b-4 sm:border-b-8 mt-4 border-black pb-1 sm:pb-2 uppercase font-black tracking-wide text-[28px] sm:text-6xl md:text-7xl">
          Portofoliu
        </h1>
        <p className="mt-3 sm:mt-6 max-w-2xl text-[13px] sm:text-base font-medium">
          Simplitate la suprafață, rigoare în profunzime. Rezultate reale.
        </p>
      </header>

      {/* Grid proiecte */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-16 sm:pb-24">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* CTA Contact */}
        <section
          id="contact"
          className="mt-8 sm:mt-12 border-2 sm:border-4 border-black bg-white shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold">
              Ai un proiect în minte?
            </h2>
            <p className="mt-1 text-[13px] sm:text-sm">
              Îl cadrăm rapid și livrăm cu claritate alb & negru.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="mailto:lazau.tudor@yahoo.com"
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
            >
              Email
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
            >
              Contact
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string;
    summary: string;
    role: string;
    stack: string[];
    cta: { label: string; href: string; external?: boolean };
  };
  index: number;
}) {
  // rotire diferită la hover pe desktop
  const hoverRotate = index % 2 === 0 ? "-rotate-1" : "rotate-1";
  const hoverTranslate = "md:hover:-translate-y-0.5 md:hover:translate-x-0.5";

  return (
    <article
      data-card
      className={`relative bg-white border-2 sm:border-4 border-black p-0 shadow-[6px_6px_0_0_#000] sm:shadow-[12px_12px_0_0_#000] group ${hoverTranslate} md:hover:${hoverRotate}`}
    >
      {/* Header */}
      <div className="p-3 sm:p-4 border-b-2 sm:border-b-4 border-black flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-black uppercase">
          {project.role}
        </span>
        <span className="text-[10px] font-bold opacity-70">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 text-[13px] sm:text-sm font-medium">
          {project.summary}
        </p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li
              key={t}
              className="text-[11px] sm:text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.cta.external ? (
          <a
            href={project.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-5 inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-black shadow-[5px_5px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
          >
            {project.cta.label}
          </a>
        ) : (
          <Link
            href={project.cta.href}
            className="mt-4 sm:mt-5 inline-flex items-center gap-2 border-2 sm:border-4 border-black bg-black text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-black shadow-[5px_5px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] active:translate-x-[1px] active:-translate-y-[1px]"
          >
            {project.cta.label}
          </Link>
        )}
      </div>

      {/* Stamp */}
      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-black text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rotate-1 sm:rotate-2">
        WORK
      </div>
    </article>
  );
}
