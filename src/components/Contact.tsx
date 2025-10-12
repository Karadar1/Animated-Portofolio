"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
  Github,
  Linkedin,
  Send,
  Copy,
} from "lucide-react";

// (opțional) poți încărca GSAP dinamic ca în alte pagini pentru bundle mai mic
// aici am păstrat animațiile minime, poți elimina complet JS pentru SEO maxim

export default function ContactNeoBrutalistRO() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    (async () => {
      if (!formRef.current) return;
      const { default: gsap } = await import("gsap");
      const els = formRef.current.querySelectorAll("[data-stagger]");
      gsap.set(els, { y: 12, opacity: 0 });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.04,
        delay: 0.12,
      });
    })();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("lazau.tudor@yahoo.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

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

      {/* Decor */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:64px_100%,100%_24px]" />
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] rotate-6" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] -rotate-3" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-5 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              Contact
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base">
              Spune-mi pe scurt despre obiective, public și termen. Îți răspund
              cu un plan clar.
            </p>
          </div>
          <div className="flex gap-2"></div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stânga: Formular */}
          <section id="form" className="lg:col-span-6">
            <form
              ref={formRef}
              className="bg-white border-4 border-black p-6 shadow-[10px_10px_0_0_#000]"
              onSubmit={(e) => e.preventDefault()}
              aria-labelledby="contact-title"
            >
              <h2 id="contact-title" className="sr-only">
                Trimite un mesaj
              </h2>

              {/* honeypot antispam */}
              <input
                type="text"
                name="company"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <fieldset className="grid md:grid-cols-2 gap-4">
                <div data-stagger>
                  <label
                    htmlFor="name"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Nume
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-2 w-full border-2 border-black p-3 font-medium placeholder-black/40 focus:outline-none focus:ring-0 focus:border-black"
                    placeholder="Numele tău"
                  />
                </div>
                <div data-stagger>
                  <label
                    htmlFor="email"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-2 w-full border-2 border-black p-3 font-medium placeholder-black/40 focus:outline-none focus:ring-0 focus:border-black"
                    placeholder="nume@domeniu.com"
                  />
                </div>

                <div className="md:col-span-2" data-stagger>
                  <label
                    htmlFor="service"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Serviciu
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="mt-2 w-full border-2 border-black p-3 bg-white font-medium focus:outline-none"
                  >
                    <option>Dezvoltare Frontend</option>
                    <option>Livrare Full-Stack</option>
                    <option>Animații & micro-interacțiuni</option>
                    <option>Audit & refactor</option>
                  </select>
                </div>

                <div className="md:col-span-2" data-stagger>
                  <label
                    htmlFor="message"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Detalii proiect
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="mt-2 w-full border-2 border-black p-3 font-medium placeholder-black/40 focus:outline-none"
                    placeholder="Câteva linii despre obiective, scope, deadline..."
                  />
                </div>

                <div
                  className="md:col-span-2 flex flex-wrap items-center gap-3 mt-2"
                  data-stagger
                >
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 border-2 border-black checked:bg-black"
                    />
                    <span>Trimite-mi o copie</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 border-2 border-black checked:bg-black"
                    />
                    <span>Urgent</span>
                  </label>
                </div>
              </fieldset>

              <div className="mt-6 flex items-center gap-3" data-stagger>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border-4 border-black bg-black text-white px-5 py-3 text-sm font-black shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  Trimite <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </section>

          {/* Dreapta: Modalități de contact */}
          <aside className="lg:col-span-6 space-y-6">
            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h2 className="text-xl font-extrabold">Direct</h2>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:lazau.tudor@yahoo.com"
                  className="border-2 border-black p-3 flex items-center gap-2 hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  lazau.tudor@yahoo.com
                </a>
                <a
                  href="tel:+40773712357"
                  className="border-2 border-black p-3 flex items-center gap-2 hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Phone className="w-4 h-4" /> +40 773 712 357
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="mt-3 inline-flex items-center gap-2 border-2 border-black px-3 py-2 text-xs font-bold hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                aria-live="polite"
              >
                <Copy className="w-3 h-3" />{" "}
                {copied ? "Copiat!" : "Copiază emailul"}
              </button>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h2 className="text-xl font-extrabold">Profiluri</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/Karadar1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black p-3 flex items-center justify-center gap-2 font-bold hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tudor-lazau-94065220b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black p-3 flex items-center justify-center gap-2 font-bold hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h2 className="text-xl font-extrabold">
                Locație & disponibilitate
              </h2>
              <div className="mt-3 grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Timișoara, România (EET/EEST)
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Remote-friendly •
                  Freelance/Contract
                </div>
              </div>
            </div>

            {/* FAQ (bun pentru SEO) */}
            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h2 className="text-xl font-extrabold">Întrebări frecvente</h2>
              <details className="mt-3 border-2 border-black p-3">
                <summary className="cursor-pointer font-bold">
                  Cât de repede putem începe?
                </summary>
                <p className="mt-2 text-sm">
                  De obicei în maximum o săptămână, în funcție de complexitate
                  și disponibilitate.
                </p>
              </details>
              <details className="mt-3 border-2 border-black p-3">
                <summary className="cursor-pointer font-bold">
                  Cum arată hand-off-ul?
                </summary>
                <p className="mt-2 text-sm">
                  Repository curat, documentație și walkthrough video. Pot oferi
                  și suport post-lansare.
                </p>
              </details>
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`
        :global(a:focus-visible),
        :global(button:focus-visible),
        :global(input:focus-visible),
        :global(textarea:focus-visible),
        :global(select:focus-visible) {
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
