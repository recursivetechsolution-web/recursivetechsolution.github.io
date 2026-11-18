// Single place for company details and service endpoints used across the site.

export const SITE = {
  name: "Recursive Tech Solution",
  shortName: "Recursive Tech",
  url: "https://recursivetechsolution.com",
  email: "recursivetechsolution@gmail.com",
  phone: "+14437412138",
  phoneDisplay: "+1 (443) 741-2138",
  linkedin: "https://linkedin.com/company/recursive-tech-solution",
} as const;

/**
 * CONTACT FORM EMAIL — Web3Forms (free, no server needed).
 *
 * 1. Go to https://web3forms.com, enter recursivetechsolution@gmail.com,
 *    and they email you an "Access Key".
 * 2. Paste it below between the quotes.
 *
 * This key is designed to be public (it can only send mail TO you), so it is
 * safe to keep in the website code. Until it is filled in, the forms fall back
 * to opening the visitor's email app with the message pre-written.
 */
export const WEB3FORMS_ACCESS_KEY = "";

/**
 * AI CHAT — Cloudflare Worker that answers free-text questions.
 * Source: cloudflare-worker/worker.js (uses Cloudflare Workers AI, free tier,
 * no API key), deployed on the recursivetech.workers.dev Cloudflare account.
 * If it is unreachable, the chat answers from app/lib/knowledge.ts.
 */
export const CHAT_ENDPOINT = "https://groq-proxy.recursivetech.workers.dev";
