"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// Neo-brutalist variant: high contrast, chunky borders, visible grids, accent stamps

const projects = [
  {
    title: "Second Cycle",
    summary: "E‑commerce for used bicycles. Innovation Labs semifinalist.",
    role: "Frontend Engineer",
    stack: ["React", "TypeScript", "Node", "Express", "MongoDB"],
    cta: { label: "Case Study", href: "#" },
  },
  {
    title: "NGO Connect",
    summary: "Platform to manage events and volunteers across NGOs.",
    role: "Full‑Stack Developer",
    stack: ["React", "TypeScript", "Tailwind", "Socket.io", "MongoDB"],
    cta: { label: "View Project", href: "#" },
  },
  {
    title: "3Pillar AC Labs",
    summary: "Prototype backed by Flask API, containerized and deployed.",
    role: "Full‑Stack Developer",
    stack: ["React", "TypeScript", "Python", "Flask", "MySQL", "Docker"],
    cta: { label: "Notes", href: "#" },
  },
  {
    title: "IBM Summer Practice",
    summary: "Finance tracking app on PERN stack with auth and charts.",
    role: "Engineer",
    stack: ["React", "TypeScript", "Postgres", "Express", "Node"],
    cta: { label: "Demo", href: "#" },
  },
  {
    title: "Client Work",
    summary: "Production UIs with motion polish and clean hand‑offs.",
    role: "Frontend / Motion",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    cta: { label: "Inquire", href: "#contact" },
  },
];

gsap.registerPlugin(useGSAP);

export default function PortfolioNeoBrutalistAlt() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Entry transition — still bold
  useGSAP(() => {
    const c = circleRef.current;
    if (!c) return;
    gsap.set(c, { scale: 20, opacity: 1, transformOrigin: "50% 50%" });
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

  // Stagger cards in
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    gsap.set(cards, { y: 20, opacity: 0 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.07,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden">
      <div className="sticky top-0 z-[1000] bg-white border-b-4 border-black">
        <Navbar />
      </div>

      {/* Transition circle */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[120px] h-[120px] rounded-full bg-black"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <h1
          className="text-6xl md:text-7xl font-black uppercase border-b-8 border-black inline-block pb-2 line tracking-wide
"
        >
          Portfolio
        </h1>
        <p className="mt-6 max-w-2xl text-base font-medium">
          Projects in bold black and white. Unapologetically structured.
        </p>
      </header>

      {/* Projects Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </main>

      <footer className="border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 text-xs flex items-center justify-between">
          <span>© {new Date().getFullYear()} Andrei‑Tudor Lazău</span>
          <span>Neo‑Brutalist v2 Portfolio</span>
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
    cta: {
      label: string;
      href: string;
    };
  };
  index: number;
}) {
  return (
    <motion.article
      data-card
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { x: 0, rotate: 0 },
        hover: {
          x: index % 2 === 0 ? -4 : 4,
          rotate: index % 2 === 0 ? -1 : 1,
        },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative border-4 border-black bg-white p-0 shadow-[12px_12px_0_0_#000] group"
    >
      {/* Header blocky label */}
      <div className="p-4 border-b-4 border-black flex items-center justify-between">
        <span className="text-xs font-black uppercase">{project.role}</span>
        <span className="text-[10px] font-bold opacity-70">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-2xl font-extrabold leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-medium">{project.summary}</p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((t: string) => (
            <li
              key={t}
              className="text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[3px_3px_0_0_#000]"
            >
              {t}
            </li>
          ))}
        </ul>

        <Link
          href={project.cta.href}
          className="mt-5 inline-flex items-center gap-2 border-4 border-black bg-black text-white px-4 py-2 text-sm font-black shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
        >
          {project.cta.label}
        </Link>
      </div>

      {/* Brutalist stamp */}
      <div className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-extrabold px-2 py-1 rotate-2">
        WORK
      </div>
    </motion.article>
  );
}
