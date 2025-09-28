"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const LINKS = [
  { title: "Home", href: "/home" },
  { title: "Portfolio", href: "/portofolio" },
  { title: "Experience", href: "/experience" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function MobileNavNeoBrutalist() {
  const [open, setOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const menuId = useId();
  const scope = useRef<HTMLDivElement | null>(null);

  // Circle wipe
  const roundRef = useRef<HTMLDivElement | null>(null);
  const expandTl = useRef<gsap.core.Timeline | null>(null);
  const pendingHref = useRef<string | null>(null);

  // Build expand timeline once
  useGSAP(
    () => {
      expandTl.current = gsap
        .timeline({ paused: true })
        .set(roundRef.current, {
          display: "block",
          opacity: 1,
          scale: 0,
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
        })
        .to(roundRef.current, {
          scale: 20,
          duration: 0.85,
          ease: "power2.inOut",
        });
    },
    { scope, dependencies: [] }
  );

  // Shrink after route change
  useGSAP(
    () => {
      if (!roundRef.current || !isTransitioning) return;

      gsap.set(roundRef.current, { display: "block", opacity: 1, scale: 20 });
      gsap.to(roundRef.current, {
        scale: 0,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(roundRef.current, { display: "none" });
          setIsTransitioning(false);
          pendingHref.current = null;
        },
      });
    },
    { scope, dependencies: [pathname] }
  );

  const navigateWithTransition = (href: string) => {
    if (href === pathname || isTransitioning) {
      setOpen(false);
      return;
    }
    setOpen(false);
    setIsTransitioning(true);
    pendingHref.current = href;

    expandTl.current?.eventCallback("onComplete", null);
    expandTl.current?.eventCallback("onComplete", () => {
      if (pendingHref.current) router.push(pendingHref.current);
      // shrink happens on pathname change
    });

    expandTl.current?.restart();
  };

  // A11y + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav ref={scope} className="md:hidden relative">
      {/* Top bar */}
      <div className="fixed left-0 right-0 top-0 z-[60] border-b-8 border-black bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Brand block (Link instead of <a>) */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <span className="block h-7 w-7 border-4 border-black bg-black rotate-45" />
              <span className="absolute top-1 left-1 block h-2 w-2 bg-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                Andrei
              </span>
              <span className="mt-[2px] text-[8px] font-black uppercase tracking-[0.24em]">
                Tudor
              </span>
            </div>
          </Link>

          {/* Hamburger */}
          {/* Hamburger */}
          <button
            type="button"
            aria-controls={menuId}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`relative h-12 w-12 border-4 border-black transition-all duration-200 ${
              open
                ? "bg-black translate-x-[2px] translate-y-[2px]"
                : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px]"
            } focus:outline-none focus:ring-0`}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Top bar */}
              <span
                className={`block h-[3px] w-6 transition-all duration-300 ${
                  open
                    ? "bg-white rotate-45 translate-y-[2px]"
                    : "bg-black translate-y-[-8px] rotate-0"
                }`}
              />
              {/* Middle bar */}
              <span
                className={`block h-[3px] w-6 transition-all duration-300 ${
                  open ? "opacity-0" : "bg-black opacity-100"
                }`}
              />
              {/* Bottom bar */}
              <span
                className={`block h-[3px] w-6 transition-all duration-300 ${
                  open
                    ? "bg-white -rotate-45 -translate-y-[2px]"
                    : "bg-black translate-y-[8px] rotate-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] bg-black/20"
          >
            <motion.div
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              animate={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              exit={{
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                transition: { duration: 0.35, ease: "easeInOut" },
              }}
              className="fixed left-0 top-20 h-[calc(100vh-80px)] w-full border-l-8 border-r-8 border-b-8 border-black bg-white overflow-hidden"
            >
              {/* Grid texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:22px_22px]" />

              {/* Links */}
              <div id={menuId} className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-3">
                  {LINKS.map((l, idx) => {
                    const active = pathname === l.href;
                    return (
                      <motion.li
                        key={l.title}
                        initial={{ x: -60, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            delay: 0.12 + idx * 0.08,
                            duration: 0.35,
                          },
                        }}
                        exit={{
                          x: -30,
                          opacity: 0,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => navigateWithTransition(l.href)}
                          disabled={isTransitioning}
                          className={`group w-full text-left border-4 border-black transition-all duration-150 ${
                            active
                              ? "bg-black text-white shadow-none translate-x-[1px] translate-y-[1px]"
                              : "bg-white text-black shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-[1px] hover:-translate-y-[1px]"
                          } focus:outline-none`}
                        >
                          <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-xl font-extrabold uppercase leading-none tracking-wider">
                              {l.title}
                            </span>
                            <span
                              className={`text-lg font-black transition-transform ${
                                active
                                  ? "text-white"
                                  : "text-black group-hover:translate-x-1"
                              }`}
                            >
                              →
                            </span>
                          </div>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Meta chips */}
                <motion.div
                  className="mt-5 grid grid-cols-2 gap-2"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.55 } }}
                >
                  <div className="border-4 border-black bg-white px-3 py-2 text-[10px] font-black uppercase shadow-[5px_5px_0_0_#000]">
                    Timisoara, RO
                  </div>
                  <div className="border-4 border-black bg-white px-3 py-2 text-[10px] font-black uppercase shadow-[5px_5px_0_0_#000]">
                    Available • 2025
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circle-wipe */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
        <div
          ref={roundRef}
          className="w-[100px] h-[100px] rounded-full bg-black"
          style={{ display: "none" }}
        />
      </div>
    </nav>
  );
}
