"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import MobileNavNeoBrutalist from "./MobileNavbar";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route
  const roundRef = useRef(null);
  const targetRoute = useRef<string | null>(null);

  const transitionTl = useRef(
    gsap.timeline({
      paused: true,
      onComplete: () => {
        if (targetRoute.current === pathname) {
          // ✅ Just reverse if we're on the same page
          transitionTl.reverse();
        } else if (targetRoute.current) {
          router.push(targetRoute.current);
        }
      },
    })
  ).current;

  const handleTabPress = (route: string) => {
    const routePath = `/${route.toLowerCase()}`;
    targetRoute.current = routePath;

    if (routePath === pathname) {
      // ✅ Same page: animate and reverse only
      transitionTl.restart();
    } else {
      // ✅ Different page: animate then navigate
      transitionTl.restart();
    }
  };

  useGSAP(() => {
    transitionTl.fromTo(
      roundRef.current,
      {
        opacity: 1,
        scale: 0,
        width: 100,
        height: 100,
        borderRadius: "100%",
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      },
      {
        scale: 20,
        duration: 1.5,
        ease: "power2.inOut",
      }
    );
  }, []);

  const [position, setPosition] = useState({
    left: 0,
    opacity: 0,
  });

  const tabs = [
    "Home",
    "Portofolio",
    "Experience",
    "Services",
    "About",
    "Contact",
  ];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <MobileNavNeoBrutalist />

      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="absolute top-[40px] left-[50%] z-50 hidden w-[500px] -translate-x-[75%] -translate-y-1/2 justify-around md:flex"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            setPosition={setPosition}
            onPress={() => handleTabPress(tab)}
          />
        ))}
        <Cursor position={position} />
      </ul>
      <div
        ref={roundRef}
        className="bg-black rounded-full z-[9999] w-[100px] pointer-events-none"
      ></div>
    </>
  );
};

const Tab = ({
  selected,
  text,
  setSelected,
  setPosition,
  onPress,
}: {
  setSelected: (value: string) => void;
  selected: boolean;
  text: string;
  setPosition: (position: { left: number; opacity: number }) => void;
  onPress: () => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const parentRect = ref.current.parentElement?.getBoundingClientRect();
        if (!parentRect) return;

        const relativeLeft = rect.left - parentRect.left + rect.width / 2 - 5;

        setPosition({
          left: relativeLeft,
          opacity: 1,
        });
      }}
      onClick={() => {
        setSelected(text);
        onPress(); // Trigger animation and navigate after
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-3 md:text-base transition-all duration-200 ${
        selected ? "font-bold text-2xl" : ""
      }`}
    >
      {text}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute z-0 top-10 h-[13px] w-[13px] rounded-full bg-black"
    />
  );
};

export default Navbar;
