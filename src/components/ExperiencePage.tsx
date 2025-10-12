"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- UI bits ---
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

// --- Date experiență (RO) ---
const experience = [
  {
    title: "3Pillar AC Labs",
    position: "Dezvoltator Full-Stack",
    time: "2025",
    location: "Program",
    description:
      "Am dezvoltat și lansat o aplicație full-stack cu Flask (backend) și React (frontend). Containerizare cu Docker, deploy pe AWS, versionare cu Git.",
    tech: ["React", "TypeScript", "Python", "Flask", "MySQL", "Docker", "AWS"],
  },
  {
    title: "IBM Summer Practice",
    position: "Dezvoltator Full-Stack",
    time: "2025",
    location: "Practica de vară",
    description:
      "Aplicație de urmărire a finanțelor pe stack PERN, cu autentificare și grafice.",
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
    position: "Frontend / Full-Stack",
    time: "2023 – Prezent",
    location: "Remote",
    description:
      "Entitate freelance orientată pe UI/UX performant, animații și aplicații scalabile. Practici solide de cod, performanță și mentenanță.",
    tech: ["React", "TypeScript", "GSAP", "MERN", "Tailwind"],
  },
  {
    title: "Second Cycle",
    position: "Frontend Developer",
    time: "2024",
    location: "Innovation Labs (RO)",
    description:
      "Parte din echipa web calificată în semifinalele naționale Innovation Labs. Frontend pentru e-commerce biciclete: autentificare, coș, profil utilizator.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "NGO Connect",
    position: "Dezvoltator Full-Stack",
    time: "2024",
    location: "Proiect",
    description:
      "Platformă pentru ONG-uri: gestionare evenimente și voluntari, înscrieri și notificări în timp real.",
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

  // respectă prefers-reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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

  // Stagger carduri (GSAP dinamic)
  useEffect(() => {
    if (prefersReduced || !cardsRef.current) return;
    let kill = () => {};
    (async () => {
      const { default: gsap } = await import("gsap");
      const items = cardsRef.current!.querySelectorAll("[data-card]");
      gsap.set(items, { y: 24, opacity: 0, rotate: 0.2 });
      const anim = gsap.to(items, {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
      });
      kill = () => anim.kill();
    })();
    return () => kill();
  }, [prefersReduced]);

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

      {/* Fundal discret tip grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* Hero */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-20 md:pt-5 pb-10 border-b-4 border-black">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge>Experiență</Badge>
          <span className="text-xs font-semibold">Actualizat • v2</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.95]">
          Roluri și proiecte cu impact.
          <span className="block">Precizie, ritm și claritate.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg font-medium">
          O selecție de colaborări și produse livrate—orientate pe performanță,
          accesibilitate și rezultate măsurabile.
        </p>
      </header>

      {/* Conținut */}
      <main
        ref={cardsRef}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24"
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
                  <h2 className="text-2xl font-extrabold leading-tight">
                    {item.title}
                  </h2>
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

      {/* A11y: focus & reduced motion */}
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
