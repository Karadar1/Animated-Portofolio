"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

// Content
const projects = [
  {
    title: "Second Cycle",
    summary: "E-commerce for used bicycles. Innovation Labs semifinalist.",
    role: "Frontend Developer",
    stack: ["React", "TypeScript", "Node", "Express", "MongoDB"],
    cta: {
      label: "View Project",
      href: "https://github.com/SecondCycleRO/frontend",
    },
  },
  {
    title: "IBM Summer Practice",
    summary: "Finance tracking app on PERN stack with auth and charts.",
    role: "Engineer",
    stack: ["React", "TypeScript", "Postgres", "Express", "Node"],
    cta: {
      label: "View Project",
      href: "https://github.com/raulariton/pennywise",
    },
  },

  {
    title: "3Pillar AC Labs",
    summary: "Prototype backed by Flask API, containerized and deployed.",
    role: "Full-Stack Developer",
    stack: ["React", "TypeScript", "Python", "Flask", "MySQL", "Docker"],
    cta: { label: "View Project", href: "#" },
  },
  {
    title: "Client Work",
    summary: "Production UIs with motion polish and clean hand-offs.",
    role: "Frontend / Motion",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    cta: { label: "View Project", href: "" },
  },
];

export default function PortfolioNeoBrutalistAlt() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Entry transition
  useGSAP(() => {
    const c = circleRef.current;
    if (!c) return;
    gsap.set(c, { scale: 20, opacity: 1, transformOrigin: "50% 50%" });
    const tl = gsap.to(c, {
      scale: 0,
      duration: 1.0,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(c, { display: "none" });
      },
    });
    return () => tl.kill();
  }, []);

  // Stagger cards in
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    gsap.set(cards, { y: isMobile ? 12 : 20, opacity: 0 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: isMobile ? 0.05 : 0.07,
      ease: "power2.out",
      delay: 0.15,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      {/* Sticky top with safe-area padding for notches */}
      <div className="sticky top-0 z-[1000] bg-white border-b-2 sm:border-b-4 border-black pt-[env(safe-area-inset-top,0)]">
        <Navbar />
      </div>

      {/* Transition circle */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-full bg-black"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 pb-6 sm:pb-10">
        <h1 className="inline-block border-b-4 sm:border-b-8 mt-20 border-black pb-1 sm:pb-2 uppercase font-black tracking-wide text-[28px] sm:text-6xl md:text-7xl">
          Portfolio
        </h1>
        <p className="mt-3 sm:mt-6 max-w-2xl text-[13px] sm:text-base font-medium">
          Projects in bold black and white. Unapologetically structured.
        </p>
      </header>

      {/* Projects Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-16 sm:pb-24">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Contact CTA (mobile-friendly) */}
        <section
          id="contact"
          className="mt-8 sm:mt-12 border-2 sm:border-4 border-black bg-white shadow-[6px_6px_0_0_#000] sm:shadow-[10px_10px_0_0_#000] p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4"
        >
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold">
              Have a project in mind?
            </h4>
            <p className="mt-1 text-[13px] sm:text-sm">
              Let’s scope it quickly and ship with brutal clarity.
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

      <footer className="border-t-2 sm:border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-6 text-[11px] sm:text-xs flex items-center justify-between">
          <span>© {new Date().getFullYear()} Andrei-Tudor Lazău</span>
          <span>Neo-Brutalist v2 Portfolio</span>
        </div>
      </footer>
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
    cta: { label: string; href: string };
  };
  index: number;
}) {
  // Only add drift/rotation on md+ (avoids odd touch behavior on mobile)
  const drift = index % 2 === 0 ? -4 : 4;
  const rotate = index % 2 === 0 ? -1 : 1;

  return (
    <motion.article
      data-card
      initial={false}
      whileHover={{ x: drift, rotate }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="
        relative bg-white border-2 sm:border-4 border-black
        p-0 shadow-[6px_6px_0_0_#000] sm:shadow-[12px_12px_0_0_#000]
        group md:hover:-translate-y-0.5 md:hover:translate-x-0.5
      "
    >
      {/* Header */}
      <div
        className="
          p-3 sm:p-4 border-b-2 sm:border-b-4 border-black
          flex items-center justify-between
        "
      >
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
              className="
                text-[11px] sm:text-xs font-bold px-2 py-1
                border-2 border-black bg-white
                shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]
              "
            >
              {t}
            </li>
          ))}
        </ul>

        <Link
          href={project.cta.href}
          className="
            mt-4 sm:mt-5 inline-flex items-center gap-2
            border-2 sm:border-4 border-black bg-black text-white
            px-3 sm:px-4 py-2 text-xs sm:text-sm font-black
            shadow-[5px_5px_0_0_#000] sm:shadow-[6px_6px_0_0_#000]
            active:translate-x-[1px] active:-translate-y-[1px]
          "
        >
          {project.cta.label}
        </Link>
      </div>

      {/* Stamp (scaled down on mobile) */}
      <div
        className="
          absolute -top-2 -right-2 sm:-top-3 sm:-right-3
          bg-black text-white text-[9px] sm:text-[10px]
          font-extrabold px-1.5 sm:px-2 py-0.5 rotate-1 sm:rotate-2
        "
      >
        WORK
      </div>
    </motion.article>
  );
}
