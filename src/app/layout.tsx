import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  other: {
    "google-site-verification": "eE35_pFEE7nfzYLenoEuuB-V3uPl_hrgu3VW0s",
  },
  metadataBase: new URL("https://lazau-tudor.ro"),
  title: "Dezvoltator Web Freelance în Timișoara | Lazău Andrei-Tudor",
  description:
    "Construiesc site-uri rapide și SEO-friendly (Next.js/React) pentru IMM-uri. Optimizare viteză, redesign și implementare SEO tehnic în Timișoara.",
  keywords: [
    "dezvoltator web Timișoara",
    "Next.js freelancer",
    "React developer România",
    "optimizare SEO",
    "website performance",
  ],
  authors: [{ name: "Lazău Andrei-Tudor" }],
  creator: "Lazău Andrei-Tudor",
  publisher: "Lazău Andrei-Tudor",
  alternates: {
    canonical: "https://lazau-tudor.ro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://lazau-tudor.ro",
    siteName: "Lazău Andrei-Tudor - Dezvoltator Web",
    title: "Dezvoltator Web Freelance în Timișoara",
    description:
      "Site-uri rapide și optimizate pentru conversii. Next.js, React, SEO tehnic.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lazău Andrei-Tudor - Dezvoltator Web Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dezvoltator Web Freelance în Timișoara",
    description:
      "Site-uri rapide și optimizate pentru conversii. Next.js, React, SEO tehnic.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Add when you set up Google Search Console
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={`${orbitron.variable} antialiased`}>{children}</body>
    </html>
  );
}
