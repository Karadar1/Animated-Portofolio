import type { Metadata } from "next";
import Script from "next/script";
import ExperiencePage from "@/components/ExperiencePage";

export const metadata: Metadata = {
  title: "Experiență – Andrei-Tudor Lazău",
  description:
    "Roluri și proiecte: frontend, full-stack, animații și optimizare performanță. Tehnologii: React, Next.js, TypeScript, Node, Python.",
  alternates: { canonical: "https://lazau-tudor.ro/experience" },
  openGraph: {
    title: "Experiență – Andrei-Tudor Lazău",
    description:
      "Selecție de proiecte și roluri: React/Next.js, animații, SEO tehnic și performanță.",
    url: "https://lazau-tudor.ro/experience",
    type: "website",
  },
};

export default function Page() {
  const breadcrumbs = {
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
        name: "Experiență",
        item: "https://lazau-tudor.ro/experience",
      },
    ],
  };

  return (
    <>
      <ExperiencePage />
      <Script
        id="ld-breadcrumbs-exp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
