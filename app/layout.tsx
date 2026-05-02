import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";

import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Klimar™ — Gestão para serviços técnicos",
    template: "%s · Klimar",
  },
  description:
    "OS digital, fotos antes/depois, assinatura no app, PDF de orçamento direto pro WhatsApp. Para autônomos, MEIs e empresas de ar-condicionado, elétrica e manutenção predial.",
  keywords: [
    "gestão de serviços técnicos",
    "ar-condicionado",
    "PMOC",
    "ordem de serviço digital",
    "field service brasil",
    "SaaS HVAC",
    "manutenção predial",
    "Klimar",
  ],
  authors: [{ name: "IAVerde", url: SITE.url }],
  creator: "IAVerde",
  publisher: "IAVerde",
  applicationName: "Klimar",
  category: "business",
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: "Klimar",
    title: "Klimar™ — Gestão para serviços técnicos",
    description:
      "OS digital, fotos antes/depois, PDF de orçamento direto pro WhatsApp. Free de verdade. LGPD compliant.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Klimar — A agenda do seu técnico, resolvida.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klimar™ — Gestão para serviços técnicos",
    description:
      "OS digital, fotos antes/depois, PDF de orçamento direto pro WhatsApp.",
    images: ["/opengraph-image"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IAVerde",
  legalName: SITE.legalFullName,
  taxID: SITE.cnpj,
  foundingDate: "2026-03-06",
  url: SITE.parentUrl,
  logo: `${SITE.url}/icon.svg`,
  description:
    "Startup brasileira de base tecnológica que desenvolve software, IA aplicada e infraestrutura digital para resolver problemas concretos com impacto mensurável.",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.parentAddress.street}, ${SITE.parentAddress.suite}`,
    addressLocality: SITE.parentAddress.city,
    addressRegion: SITE.parentAddress.region,
    postalCode: SITE.parentAddress.postalCode,
    addressCountry: SITE.parentAddress.country,
  },
  sameAs: [SITE.parentUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: SITE.parentEmail,
      contactType: "customer support",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
    {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
  ],
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Klimar",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "Gestão para serviços técnicos: OS, fotos antes/depois, assinatura digital e orçamento via WhatsApp.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  provider: {
    "@type": "Organization",
    name: "IAVerde",
    url: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
      </head>
      <body className="min-h-screen bg-[#0F172A] font-sans text-slate-100 antialiased">
        <Suspense fallback={null}>
          <PostHogProvider>{children}</PostHogProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
