"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// --- Shared UI bits ---
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black border-2 border-black shadow-[4px_4px_0_0_#000]">
    {children}
  </span>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-black text-white border-2 border-black shadow-[3px_3px_0_0_#000]">
    {children}
  </span>
);

// --- Experience data ---
const experience = [
  {
    title: "3Pillar AC Labs",
    position: "Full-Stack Developer",
    time: "2024",
    location: "Programme",
    description:
      "Developed and deployed a full-stack web app using Flask (backend) and React (frontend). Containerized with Docker, deployed on AWS, and managed with Git.",
    tech: ["React", "TypeScript", "Python", "Flask", "MySQL", "Docker", "AWS"],
  },
  {
    title: "IBM Summer Practice",
    position: "Full-Stack Developer",
    time: "2024",
    location: "Practice",
    description:
      "Developed and deployed a finance-tracking full-stack application using the PERN stack.",
    tech: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Express",
      "Node.js",
      "Supabase",
    ],
  },
  {
    title: "Lazău Andrei-Tudor PFA (Freelance)",
    position: "Frontend / Full-Stack Developer",
    time: "2023 – Present",
    location: "Remote",
    description:
      "Professional freelance entity focusing on high-quality software development, frontend engineering, animations, and scalable web apps. Emphasis on best coding practices, performance, and maintainability.",
    tech: ["React", "TypeScript", "GSAP", "MERN", "Tailwind"],
  },
  {
    title: "Second Cycle",
    position: "Frontend Developer",
    time: "2024",
    location: "Innovation Labs (Romania)",
    description:
      "Part of a web dev team that qualified for the national semifinals of Innovation Labs. Built the frontend for an e-commerce platform for used bicycles: auth, shopping cart UI, and user profile.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "NGO Connect",
    position: "Full-Stack Developer",
    time: "2024",
    location: "Project",
    description:
      "Comprehensive platform for NGOs to manage events and volunteers: post events, track participation, and streamline communication. Volunteers can browse, register, and receive updates.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind",
      "Node",
      "Express",
      "MongoDB",
      "Socket.io",
    ],
  },
];

export default function ExperiencePage() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

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
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(c, { display: "none" });
      },
    });
    return () => tl.kill();
  }, []);

  // Stagger in the cards
  useEffect(() => {
    if (!cardsRef.current) return;
    const items = cardsRef.current.querySelectorAll("[data-card]");
    gsap.set(items, { y: 24, opacity: 0, rotate: 0.2 });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06,
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

      {/* Background: simple grid in black/white */}
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Hero */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-12 border-b-4 border-black">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge>Experience</Badge>
          <span className="text-xs font-semibold">Updated • v2</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.95]">
          Sharp, bold, minimal.
          <span className="block">Black & White web experiences.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg font-medium">
          Roles and projects — built with precision, speed, and no distractions.
        </p>
      </header>

      {/* Content */}
      <main
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24"
        ref={cardsRef}
      >
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {experience.map((item) => (
            <article
              key={item.title}
              data-card
              className="group bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-extrabold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold opacity-80">
                    {item.position}
                  </p>
                </div>
                <div className="text-right">
                  <Badge>{item.time}</Badge>
                  <div className="mt-1 text-[11px] font-bold">
                    {item.location}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-6">{item.description}</p>

              <div className="mt-auto pt-2 flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold px-2 py-1 border-2 border-black bg-white shadow-[3px_3px_0_0_#000]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-black" />
            <span className="text-sm font-bold">
              Andrei‑Tudor Lazău — Experience
            </span>
          </div>
          <div className="flex gap-2">
            <Pill>Contact Me</Pill>
          </div>
        </div>
      </footer>
    </div>
  );
}
