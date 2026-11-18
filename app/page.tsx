import { ChatWidget } from "./components/chat-widget";
import { ContactSection } from "./components/contact-section";
import { Hero } from "./components/hero";
import { Crm, FaqSection, Healthcare, Process, Services } from "./components/sections";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { FAQS, SERVICES } from "./lib/knowledge";
import { SITE } from "./lib/site";

// Structured data for search engines. Every value matches visible page text.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: SITE.name,
      url: `${SITE.url}/`,
      email: SITE.email,
      telephone: "+1-443-741-2138",
      description:
        "AI agents, knowledge-base chatbots, a client CRM and websites for growing businesses and healthcare practices.",
      parentOrganization: { "@id": `${SITE.url}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.body },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <Crm />
        <Healthcare />
        <Process />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
