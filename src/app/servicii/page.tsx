// app/services/page.tsx
import ServicesNeoBrutalist from "@/components/ServicesNeoBrutalist";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Servicii dezvoltare web, SEO tehnic & performanță | Timișoara",
  description:
    "Dezvoltare web (React/Next.js), SEO tehnic, audituri de performanță și accesibilitate. Pachete clare, rezultate măsurabile.",
  alternates: { canonical: "https://lazau-tudor.ro/services" },
  openGraph: {
    title: "Servicii dezvoltare web, SEO tehnic & performanță | Timișoara",
    description:
      "Site-uri rapide, SEO-ready. Audituri, optimizare Core Web Vitals și accesibilitate.",
    url: "https://lazau-tudor.ro/services",
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
        name: "Servicii",
        item: "https://lazau-tudor.ro/services",
      },
    ],
  };

  // (opțional) schema Service generic + Offer pentru consultanță
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dezvoltare web & SEO tehnic",
    provider: {
      "@type": "Person",
      name: "Andrei-Tudor Lazău",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Timișoara",
        addressCountry: "RO",
      },
    },
    areaServed: "Timișoara",
    offers: [
      {
        "@type": "Offer",
        name: "Consultație 25 minute",
        price: "0",
        priceCurrency: "EUR",
        url: "https://lazau-tudor.ro/services#contact",
      },
    ],
  };

  return (
    <>
      <ServicesNeoBrutalist />
      <Script
        id="ld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
