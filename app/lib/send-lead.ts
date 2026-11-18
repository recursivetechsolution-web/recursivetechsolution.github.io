import { SITE, WEB3FORMS_ACCESS_KEY } from "./site";

export type Lead = {
  name: string;
  email: string;
  message: string;
  company?: string;
  interest?: string;
  source: "Contact form" | "AI chat";
  /** Honeypot. Real people leave it empty. */
  botcheck?: string;
};

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

/** Sends the enquiry to the company inbox through Web3Forms. */
export async function sendLead(lead: Lead): Promise<SendResult> {
  if (!WEB3FORMS_ACCESS_KEY) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New enquiry from ${lead.name} (${lead.source})`,
        from_name: "recursivetechsolution.com",
        name: lead.name,
        email: lead.email,
        company: lead.company || "",
        interest: lead.interest || "",
        message: lead.message,
        source: lead.source,
        botcheck: lead.botcheck || "",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && data.success ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

/** Fallback when the form service is not set up or fails: open the visitor's mail app. */
export function mailtoFor(lead: Lead): string {
  const body = [
    lead.message,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : "",
    lead.interest ? `Interested in: ${lead.interest}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry from ${lead.name}`)}&body=${encodeURIComponent(body)}`;
}
