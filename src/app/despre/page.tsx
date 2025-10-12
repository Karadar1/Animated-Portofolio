// app/about/page.tsx
import AboutScrollCarousel from "@/components/About";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Despre Andrei-Tudor Lazău – Frontend & Full-Stack Developer",
  description:
    "Experiență, abilități și proiecte: React/Next.js, TypeScript, GSAP. Focus pe performanță, accesibilitate și motion design.",
  alternates: { canonical: "https://lazau-tudor.ro/about" },
  openGraph: {
    title: "Despre Andrei-Tudor Lazău",
    description:
      "Frontend & Full-Stack Developer. React/Next.js, TypeScript, GSAP. Claritate, performanță, animații.",
    url: "https://lazau-tudor.ro/about",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Despre Andrei-Tudor Lazău",
    description:
      "Developer axat pe claritate, performanță și motion. React/Next.js, TypeScript, GSAP.",
  },
};

export default function Page() {
  const jsonLdAbout = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Despre Andrei-Tudor Lazău",
    url: "https://lazau-tudor.ro/about",
    mainEntityOfPage: "https://lazau-tudor.ro/about",
  };

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrei-Tudor Lazău",
    jobTitle: "Frontend & Full-Stack Developer",
    url: "https://lazau-tudor.ro",
    email: "mailto:lazau.tudor@yahoo.com",
    telephone: "+40 773 712 357",
    sameAs: [
      "https://github.com/Karadar1",
      "https://www.linkedin.com/in/tudor-lazau-94065220b",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Timișoara",
      addressCountry: "RO",
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: "https://lazau-tudor.ro/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Despre",
        item: "https://lazau-tudor.ro/about",
      },
    ],
  };

  return (
    <>
      <AboutScrollCarousel />
      <Script
        id="ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      <Script
        id="ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <Script
        id="ld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
    </>
  );
}
