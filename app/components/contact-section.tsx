"use client";

import { useState } from "react";
import { SITE } from "../lib/site";
import { mailtoFor, sendLead, type Lead } from "../lib/send-lead";
import { MailIcon, PhoneIcon } from "./icons";

const INTERESTS = ["AI agents & automation", "AI chatbot", "Client CRM", "Website", "Something else"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; mailto: string };

const field =
  "mt-2 w-full rounded-control border border-line-strong bg-surface px-3.5 py-3 text-[1rem] text-ink placeholder:text-[#8a8d94] focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

export function ContactSection() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const lead: Lead = {
      name: String(d.get("name") || "").trim(),
      email: String(d.get("email") || "").trim(),
      company: String(d.get("company") || "").trim(),
      interest: String(d.get("interest") || ""),
      message: String(d.get("message") || "").trim(),
      botcheck: String(d.get("botcheck") || ""),
      source: "Contact form",
    };
    if (lead.botcheck) return; // a bot filled the hidden field
    setStatus({ kind: "sending" });
    const res = await sendLead(lead);
    if (res.ok) {
      setStatus({ kind: "sent" });
      form.reset();
      window.gtag?.("event", "generate_lead", { method: "contact_form" });
    } else {
      setStatus({ kind: "error", mailto: mailtoFor(lead) });
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-[80rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-label uppercase text-muted">Contact</p>
          <h2 id="contact-title" className="mt-4 text-title font-semibold text-ink">
            Tell us what you want to automate.
          </h2>
          <p className="mt-5 text-lead text-graphite">
            Send a few lines about your business. We reply by email, usually with a time for a short call.
          </p>
          <div className="mt-8 flex gap-2">
            <a
              href={`tel:${SITE.phone}`}
              aria-label={`Call us at ${SITE.phoneDisplay}`}
              title="Call us"
              className="press btn-secondary inline-flex h-12 w-12 items-center justify-center rounded-control border border-line-strong text-ink"
            >
              <PhoneIcon />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label={`Email us at ${SITE.email}`}
              title="Email us"
              className="press btn-secondary inline-flex h-12 w-12 items-center justify-center rounded-control border border-line-strong text-ink"
            >
              <MailIcon />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status.kind === "sent" ? (
            <div role="status" className="rounded-card border border-line bg-paper p-8">
              <p className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">Thanks. Your message is on its way.</p>
              <p className="mt-2 text-graphite">We&apos;ll reply to the email address you gave us.</p>
              <button
                type="button"
                onClick={() => setStatus({ kind: "idle" })}
                className="press btn-secondary mt-6 inline-flex h-11 items-center rounded-control border border-line-strong px-5 font-medium text-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
              <label className="block text-[0.9375rem] font-medium text-ink">
                Name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block text-[0.9375rem] font-medium text-ink">
                Work email
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="block text-[0.9375rem] font-medium text-ink">
                Company <span className="font-normal text-muted">(optional)</span>
                <input name="company" autoComplete="organization" className={field} />
              </label>
              <label className="block text-[0.9375rem] font-medium text-ink">
                Interested in
                <select name="interest" className={field} defaultValue={INTERESTS[0]}>
                  {INTERESTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[0.9375rem] font-medium text-ink sm:col-span-2">
                Message
                <textarea name="message" required rows={5} minLength={10} className={`${field} resize-y`} />
              </label>
              {/* Honeypot for spam bots; hidden from people and screen readers. */}
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status.kind === "sending"}
                  className="press btn-primary inline-flex h-12 items-center justify-center rounded-control bg-ink px-7 font-medium text-paper disabled:opacity-60"
                >
                  {status.kind === "sending" ? "Sending…" : "Send message"}
                </button>
                <p aria-live="polite" className="text-[0.9375rem] text-muted">
                  {status.kind === "error" && (
                    <>
                      We couldn&apos;t send that automatically.{" "}
                      <a href={status.mailto} className="font-medium text-ink underline underline-offset-4">
                        Send it from your email app
                      </a>{" "}
                      instead.
                    </>
                  )}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
