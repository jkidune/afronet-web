import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// Make sure you have a dummy Footer.tsx created in components/layout/ or comment this out for now
// import Footer from "@/components/layout/Footer"; 
import {
  Manrope,
  Instrument_Sans,
  Instrument_Serif,
  Archivo,
} from "next/font/google";
import "@/styles/globals.css";

/* ============================================================
   FONT LOADING
   ============================================================ */

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ============================================================
   DEFAULT METADATA
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronet.bio"
  ),
  title: {
    default: "AfrONet — African Organic Network",
    template: "%s | AfrONet",
  },
  description:
    "AfrONet unites and represents organic agriculture stakeholders across Africa through policy dialogue, capacity building, and trade facilitation.",
  keywords: [
    "organic agriculture",
    "Africa",
    "AfrONet",
    "organic farming",
    "sustainable agriculture",
    "food systems",
  ],
  authors: [{ name: "African Organic Network" }],
  creator: "AfrONet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afronet.bio",
    siteName: "AfrONet — African Organic Network",
    title: "AfrONet — African Organic Network",
    description:
      "Uniting organic agriculture stakeholders across Africa through policy, knowledge, and partnerships.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "AfrONet — African Organic Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfrONet — African Organic Network",
    description:
      "Uniting organic agriculture stakeholders across Africa through policy, knowledge, and partnerships.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${manrope.variable}
        ${instrumentSans.variable}
        ${instrumentSerif.variable}
        ${archivo.variable}
      `}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn btn-accent"
        >
          Skip to content
        </a>

        {/* Phase 4: Header Activated */}
        <Header />

        <main id="main-content" className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}