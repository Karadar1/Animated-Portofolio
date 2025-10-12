// app/page.tsx
"use client";
import Navbar from "@/components/Navbar";
import ComicIntroWithNav from "@/components/ComicIntro";
import Script from "next/script";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function Page() {
  const circleRef = useRef<HTMLDivElement | null>(null);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrei-Tudor Lazău",
    url: "https://lazau-tudor.ro",
    jobTitle: "Dezvoltator web",
    sameAs: [],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://lazau-tudor.ro",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://lazau-tudor.ro/search?q={query}",
      "query-input": "required name=query",
    },
  };

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

  return (
    <>
      <Navbar />
      {/* Transition overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div
          ref={circleRef}
          className="w-[120px] h-[120px] rounded-full bg-black"
        />
      </div>
      {/* Add top padding to clear sticky navbar (match Navbar height) */}
      <main className="min-h-screen bg-white text-black  ">
        {/* Visible H1 for SEO (screen-reader only) */}
        <h1 className="sr-only">
          Dezvoltator Web Freelance – site-uri rapide, optimizate SEO
        </h1>

        {/* Hero / Intro */}
        <section className="px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <ComicIntroWithNav />
          </div>
        </section>

        {/* Intent-rich section */}
        <section className="px-4 sm:px-6 md:px-8 py-8 sm:py-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">
              Site-uri Next.js/React rapide &amp; SEO-ready
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Te ajut cu <strong>dezvoltare web</strong>,{" "}
              <strong>redesign</strong>, <strong>optimizare performanță</strong>{" "}
              și <strong>SEO tehnic</strong>. Focus pe Core Web Vitals, indexare
              corectă și conversii.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/portofoliu"
                className="w-full sm:w-auto text-center px-4 py-3 border-4 border-black bg-white text-sm font-black uppercase shadow-[6px_6px_0_0_#000] active:translate-x-0.5 active:-translate-y-0.5"
              >
                Vezi portofoliu
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-4 py-3 border-4 border-black bg-black text-white text-sm font-black uppercase shadow-[6px_6px_0_0_#000] active:translate-x-0.5 active:-translate-y-0.5"
              >
                Cere ofertă
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* JSON-LD */}
      <Script
        id="ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
    </>
  );
}
