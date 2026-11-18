import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = "G-S4Z33RTYZY";

// SEO metadata. Title kept under ~60 characters and description under ~160 so
// search results don't truncate them. Social image: public/og-image.png
// (source in scripts/og-image.tsx).
const TITLE = "Recursive Tech Solution | AI Agents, Chatbots & CRM";
const DESCRIPTION =
  "Recursive Tech Solution builds AI agents, knowledge-base chatbots, a client CRM and SEO-ready websites for growing businesses and healthcare practices.";

export const metadata: Metadata = {
  metadataBase: new URL("https://recursivetechsolution.com"),
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Recursive Tech Solution, AI automation, AI agents, AI chatbot, knowledge-base chatbot, RAG, CRM, client portal, business automation, healthcare AI, medical practice automation, website development, SEO",
  authors: [{ name: "Recursive Tech Solution" }],
  applicationName: "Recursive Tech Solution",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    type: "website",
    url: "https://recursivetechsolution.com/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Recursive Tech Solution",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Recursive Tech Solution — AI agents, chatbots and CRM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Recursive Tech Solution",
  url: "https://recursivetechsolution.com",
  logo: "https://recursivetechsolution.com/favicon.svg",
  description: "Enterprise AI automation and website builder",
  sameAs: ["https://linkedin.com/company/recursive-tech-solution"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-443-741-2138",
    contactType: "Sales",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        {/* Without JavaScript the entrance animation never runs, so show
            everything that would otherwise start hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
