import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";

// app/layout.tsx

const orbitron = Orbitron({
  subsets: ["latin"],
  // load the weights you actually use in Tailwind (e.g., font-semibold=600, font-bold=700, font-black=900)
  weight: ["400", "600", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lazau-tudor.ro"),
  title: {
    default: "Dezvoltator Web Freelance în Timișoara | Lazău Andrei-Tudor",
    template: "%s | Lazău Andrei-Tudor",
  },
  description:
    "Construiesc site-uri rapide și SEO-friendly (Next.js/React) pentru IMM-uri. Optimizare viteză, redesign și implementare SEO tehnic în Timișoara.",
  alternates: { canonical: "https://lazau-tudor.ro" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://lazau-tudor.ro",
    title: "Dezvoltator Web Freelance în Timișoara | Lazău Andrei-Tudor",
    description:
      "Site-uri rapide și optimizate pentru conversii. Next.js, React, SEO tehnic.",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} antialiased`}>{children}</body>
    </html>
  );
}
