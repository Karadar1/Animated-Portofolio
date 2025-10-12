import ContactNeoBrutalistRO from "@/components/Contact";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact – Andrei-Tudor Lazău",
  description:
    "Hai să discutăm despre proiectul tău: dezvoltare web, optimizare performanță și animații. Disponibil pentru colaborări remote.",
  alternates: { canonical: "https://lazau-tudor.ro/contact" },
  openGraph: {
    title: "Contact – Andrei-Tudor Lazău",
    description:
      "Trimite un mesaj sau programează un call. React/Next.js, TypeScript, GSAP.",
    url: "https://lazau-tudor.ro/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact – Andrei-Tudor Lazău",
    description:
      "Dezvoltare web, performanță și animații. Spune-mi despre proiectul tău.",
  },
};

export default function Page() {
  const jsonLdContactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact – Andrei-Tudor Lazău",
    url: "https://lazau-tudor.ro/contact",
    mainEntityOfPage: "https://lazau-tudor.ro/contact",
  };

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrei-Tudor Lazău",
    url: "https://lazau-tudor.ro",
    email: "mailto:lazau.tudor@yahoo.com",
    telephone: "+40 773 712 357",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Timișoara",
      addressCountry: "RO",
    },
    sameAs: [
      "https://github.com/Karadar1",
      "https://www.linkedin.com/in/tudor-lazau-94065220b",
    ],
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
        name: "Contact",
        item: "https://lazau-tudor.ro/contact",
      },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cât de repede putem începe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "De obicei în maximum o săptămână, în funcție de complexitate și disponibilitate.",
        },
      },
      {
        "@type": "Question",
        name: "Cum arată hand-off-ul?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repository curat, documentație și walkthrough video. Pot oferi și suport post-lansare.",
        },
      },
    ],
  };

  return (
    <>
      <ContactNeoBrutalistRO />
      <Script
        id="ld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContactPage) }}
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
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
    </>
  );
}
