"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  Github,
  Linkedin,
  Send,
  Copy,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function ContactNeoBrutalistBW() {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [copied, setCopied] = useState(false);

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
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => gsap.set(c, { display: "none" }),
    });
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!formRef.current) return;
    const els = formRef.current.querySelectorAll("[data-stagger]");
    gsap.set(els, { y: 14, opacity: 0 });
    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.15,
    });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("andrei@example.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
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

      {/* Background: B&W grid + corner blocks */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:64px_100%,100%_24px]" />
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] rotate-6" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white border-4 border-black shadow-[12px_12px_0_0_#000] -rotate-3" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              Contact
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base">
              Let’s scope your project in black & white. I’ll reply within 24
              hours.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              className="inline-flex items-center gap-2 border-4 border-black bg-white px-4 py-2 text-sm font-bold shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 hover:translate-x-0.5 transition"
              href="#form"
            >
              Start a brief <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form */}
          <section id="form" className="lg:col-span-6">
            <form
              ref={formRef}
              className="bg-white border-4 border-black p-6 shadow-[10px_10px_0_0_#000]"
              onSubmit={(e) => e.preventDefault()}
            >
              <fieldset className="grid md:grid-cols-2 gap-4">
                <div data-stagger>
                  <label
                    htmlFor="name"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full border-2 border-black p-3 font-medium placeholder-black/40 focus:outline-none focus:ring-0 focus:border-black"
                    placeholder="Your name"
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
                    className="mt-2 w-full border-2 border-black p-3 font-medium placeholder-black/40 focus:outline-none focus:ring-0 focus:border-black"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="md:col-span-2" data-stagger>
                  <label
                    htmlFor="service"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="mt-2 w-full border-2 border-black p-3 bg-white font-medium focus:outline-none"
                  >
                    <option>Frontend Engineering</option>
                    <option>Full‑Stack Delivery</option>
                    <option>Motion & Polish</option>
                    <option>Audit & Refactor</option>
                  </select>
                </div>
                <div className="md:col-span-2" data-stagger>
                  <label
                    htmlFor="message"
                    className="block text-xs font-extrabold uppercase tracking-wider"
                  >
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="mt-2 w-full border-2 border-black p-3 font-medium placeholder-black/40 focus:outline-none"
                    placeholder="A few lines about your goals, scope, timeline…"
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
                    <span>Send me a copy</span>
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
                  Send <Send className="w-4 h-4" />
                </button>
                <div className="text-xs text-black/70 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> I’ll respond within 24h.
                </div>
              </div>
            </form>
          </section>

          {/* Right: Contact blocks */}
          <aside className="lg:col-span-6 space-y-6">
            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-extrabold">Direct</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:andrei@example.com"
                  className="border-2 border-black p-3 flex items-center gap-2 hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Mail className="w-4 h-4" /> andrei@example.com
                </a>
                <a
                  href="tel:+40123456789"
                  className="border-2 border-black p-3 flex items-center gap-2 hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Phone className="w-4 h-4" /> +40 123 456 789
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="mt-3 inline-flex items-center gap-2 border-2 border-black px-3 py-2 text-xs font-bold hover:-translate-y-0.5 hover:translate-x-0.5 transition"
              >
                <Copy className="w-3 h-3" /> {copied ? "Copied!" : "Copy email"}
              </button>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-extrabold">Elsewhere</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="border-2 border-black p-3 flex items-center justify-center gap-2 font-bold hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="#"
                  className="border-2 border-black p-3 flex items-center justify-center gap-2 font-bold hover:-translate-y-0.5 hover:translate-x-0.5 transition"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-extrabold">
                Location & Availability
              </h3>
              <div className="mt-3 grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Timișoara, Romania (UTC+2/+3)
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Remote‑friendly •
                  Freelance/Contract
                </div>
              </div>
            </div>

            {/* FAQ (simple disclosure style) */}
            <div className="bg-white border-4 border-black p-5 shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-extrabold">FAQ</h3>
              <details className="mt-3 border-2 border-black p-3">
                <summary className="cursor-pointer font-bold">
                  How fast can we start?
                </summary>
                <p className="mt-2 text-sm">
                  Usually within a week, depending on scope and current
                  pipeline.
                </p>
              </details>
              <details className="mt-3 border-2 border-black p-3">
                <summary className="cursor-pointer font-bold">
                  What’s your hand‑off like?
                </summary>
                <p className="mt-2 text-sm">
                  Clean repos, docs, and Loom walkthroughs. I can also support
                  post‑launch.
                </p>
              </details>
            </div>
          </aside>
        </div>
      </main>

      <footer className="relative z-10 border-t-4 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 text-xs flex items-center justify-between">
          <span>© {new Date().getFullYear()} Andrei‑Tudor Lazău</span>
          <span>Neo‑Brutalist Contact</span>
        </div>
      </footer>

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
