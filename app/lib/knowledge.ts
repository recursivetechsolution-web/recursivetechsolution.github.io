// What the site (and the chat assistant) says about Recursive Tech.
// Keep every statement true. No invented clients, numbers, certifications
// or prices. The FAQ list is also rendered on the homepage and published as
// FAQPage structured data, so the visible text and the data always match.

export type Faq = { q: string; a: string; keywords: string[] };

export const SERVICES = [
  {
    id: "agents",
    title: "AI agents & automation",
    body: "Agents that read incoming messages, look things up, draft replies and update your records. Your team approves anything that goes out to a client.",
  },
  {
    id: "chatbots",
    title: "Knowledge-base chatbots",
    body: "A chat assistant for your website trained on your own services, policies and FAQs, with a clear hand-off to a person when it should not answer.",
  },
  {
    id: "crm",
    title: "Client CRM & portal",
    body: "One place for clients, services, renewals, invoices and online payments, with a portal where your clients see their own account.",
  },
  {
    id: "websites",
    title: "Websites built to be found",
    body: "Fast, accessible websites with clean structure, search-ready metadata and contact flows that send enquiries straight to your inbox.",
  },
] as const;

export const CRM_FEATURES = [
  { title: "Client records", body: "Contacts, notes and history for every client in one view." },
  { title: "Services & renewals", body: "Track what each client has and when it renews." },
  { title: "Invoices & online payments", body: "Send invoices with a pay link so clients can pay by card." },
  { title: "Client portal", body: "Clients sign in to see their services, invoices and requests." },
  { title: "Team permissions", body: "Decide who on your team can see and change what, including money." },
  { title: "English & Spanish", body: "The whole interface works in both languages." },
] as const;

export const PROCESS = [
  { title: "Talk", body: "A short call about how your team works today and where time is lost." },
  { title: "Design", body: "We map the workflow and agree what the AI does and what a person approves." },
  { title: "Build", body: "We build, connect it to your tools and test it with real examples." },
  { title: "Improve", body: "After launch we review conversations and tune the system with you." },
] as const;

export const FAQS: Faq[] = [
  {
    q: "What does Recursive Tech Solution do?",
    a: "We build AI agents, knowledge-base chatbots, a client CRM with a client portal, and websites for growing businesses and healthcare practices.",
    // Only distinctive words: generic ones ("what", "build") made unrelated
    // questions match this answer.
    keywords: ["company", "services", "what do you do", "who are you", "what you offer", "recursive tech"],
  },
  {
    q: "Does the AI send messages without anyone checking?",
    a: "Not unless you want it to. By default the agent drafts replies and a person on your team approves them before they are sent.",
    keywords: ["approve", "approval", "automatic", "human", "check", "safe", "control"],
  },
  {
    q: "Can the chatbot answer questions about my own business?",
    a: "Yes. It is set up with your own services, policies and FAQs, and it hands the conversation to a person when a question is outside what it should answer.",
    keywords: ["chatbot", "chat", "bot", "knowledge", "faq", "answer", "train", "rag"],
  },
  {
    q: "What is in the Recursive CRM?",
    a: "Client records, services and renewals, invoices with online card payments, a client portal, team permissions, and an interface in English and Spanish.",
    keywords: ["crm", "client", "portal", "invoice", "payment", "renewal", "customer"],
  },
  {
    q: "Do you work with healthcare practices?",
    a: "Yes. We help practices with appointment questions, intake and follow-up. We review your privacy and compliance requirements with you before anything is built.",
    keywords: ["healthcare", "medical", "doctor", "clinic", "practice", "patient", "therapist", "hipaa"],
  },
  {
    q: "How much does a project cost?",
    a: "It depends on what you need. We scope every project after a short consultation and give you a clear quote before any work starts.",
    keywords: ["cost", "price", "pricing", "how much", "quote", "budget", "fee", "charge"],
  },
];

export const QUICK_ACTIONS = [
  { id: "services", label: "What do you build?" },
  { id: "crm", label: "Tell me about the CRM" },
  { id: "pricing", label: "Pricing" },
  { id: "book", label: "Book a consultation" },
  { id: "human", label: "Talk to a person" },
] as const;

export type QuickActionId = (typeof QUICK_ACTIONS)[number]["id"];

/** Best FAQ match by keyword overlap, or null. Used when the AI is unavailable. */
export function findAnswer(question: string): string | null {
  const text = question.toLowerCase();
  let best: { score: number; a: string } | null = null;
  for (const f of FAQS) {
    const score = f.keywords.reduce((n, k) => (text.includes(k) ? n + (k.includes(" ") ? 2 : 1) : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, a: f.a };
  }
  return best?.a ?? null;
}
