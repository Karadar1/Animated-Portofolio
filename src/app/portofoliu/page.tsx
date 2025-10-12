import PortfolioNeoBrutalistRO from "@/components/Portofolio";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Portofoliu proiecte web – Andrei-Tudor Lazău",
  description:
    "Selecție de proiecte: React/Next.js, optimizare performanță și SEO. Studii de caz și linkuri către cod.",
  alternates: { canonical: "https://lazau-tudor.ro/portfolio" },
  openGraph: {
    title: "Portofoliu proiecte web – Andrei-Tudor Lazău",
    description:
      "Proiecte în alb & negru: Next.js/React, performanță, accesibilitate și SEO.",
    url: "https://lazau-tudor.ro/portfolio",
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
        name: "Portofoliu",
        item: "https://lazau-tudor.ro/portfolio",
      },
    ],
  };

  return (
    <>
      <PortfolioNeoBrutalistRO />
      <Script
        id="ld-breadcrumbs-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
