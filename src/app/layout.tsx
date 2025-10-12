import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// app/layout.tsx

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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
