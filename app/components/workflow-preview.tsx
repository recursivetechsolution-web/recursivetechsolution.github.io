"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Illustrative product preview: one AI-agent run inside the CRM, from an
 * incoming message to a reply waiting for a person to approve.
 * It is a sample, not a real customer conversation, and is labelled as such.
 *
 * Choreography (see DESIGN.md → Motion):
 * the window arrives as part of the hero entrance; the steps then appear
 * in order because order IS the meaning (cause → effect). Gaps shrink as the
 * run goes on so it reads as one gesture, not a metronome. Plays once.
 * Reduced motion: no movement, no sequence — the finished state, faded in
 * (MotionConfig reducedMotion="user" in hero.tsx drops the y movement).
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Step = {
  title: string;
  detail: string;
  at: number; // seconds after the hero starts
  pending?: boolean;
};

const steps: Step[] = [
  { title: "Message received", detail: "Website chat · “Can I move Thursday’s appointment to next week?”", at: 1.05 },
  { title: "Checked knowledge base", detail: "Rescheduling policy · 24-hour notice", at: 1.4 },
  { title: "Found open times", detail: "Tue 10:30 AM · Wed 2:00 PM", at: 1.68 },
  { title: "Drafted reply", detail: "Waiting for your approval", at: 1.9, pending: true },
];

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 7.2l2.6 2.6L11 4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkflowPreview() {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      className="reveal relative m-0"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 0.8, delay: reduce ? 0 : 0.36, ease: EASE_OUT }}
    >
      <div className="overflow-hidden rounded-window border border-line bg-surface shadow-window">
        {/* Window bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-[0.8125rem] font-medium text-ink">Client CRM · Inbox</span>
          </div>
          <span className="font-mono text-label uppercase text-muted">Agent run</span>
        </div>

        <div className="grid md:grid-cols-[11.5rem_1fr]">
          {/* Conversation list (desktop) */}
          <div className="hidden border-r border-line bg-paper/60 md:block" aria-hidden="true">
            {["Sample client", "New lead", "Invoice question"].map((name, i) => (
              <div
                key={name}
                className={`border-b border-line/80 px-4 py-3.5 ${i === 0 ? "bg-surface" : ""}`}
              >
                <div className="flex items-center gap-2">
                  {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  <span className={`text-[0.8125rem] ${i === 0 ? "font-medium text-ink" : "text-muted"}`}>{name}</span>
                </div>
                <div className="mt-1 h-1.5 w-24 rounded-full bg-line" />
              </div>
            ))}
          </div>

          {/* Agent timeline */}
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <ol className="relative space-y-4" aria-hidden="true">
              <span className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line" />
              {steps.map((s) => (
                <motion.li
                  key={s.title}
                  className="reveal relative flex gap-3.5"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0.3 : 0.4, delay: reduce ? 0 : s.at, ease: EASE_OUT }}
                >
                  <span
                    className={`relative z-10 mt-0.5 flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full border ${
                      s.pending
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line-strong bg-surface text-ink"
                    }`}
                  >
                    {s.pending ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : <Check />}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-[0.9375rem] font-medium ${s.pending ? "text-accent" : "text-ink"}`}>{s.title}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{s.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* Draft + approval, lands with the last step */}
            <motion.div
              aria-hidden="true"
              className="reveal mt-5 rounded-card border border-line bg-paper/70 p-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.3 : 0.45, delay: reduce ? 0 : 2.0, ease: EASE_OUT }}
            >
              <p className="text-[0.875rem] leading-relaxed text-graphite">
                Of course. I can move you to Tuesday at 10:30 AM or Wednesday at 2:00 PM. Which works better?
              </p>
              <div className="mt-3.5 flex items-center justify-end gap-2">
                <span className="rounded-[0.5rem] border border-line-strong px-3 py-1.5 text-[0.8125rem] text-ink">Edit</span>
                <span className="rounded-[0.5rem] bg-ink px-3 py-1.5 text-[0.8125rem] font-medium text-paper">Approve &amp; send</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-label uppercase text-muted">
        Illustrative example · sample data
        <span className="sr-only">
          : an AI agent receives a website chat message asking to reschedule, checks the rescheduling policy,
          finds two open times and drafts a reply that waits for a staff member to approve before it is sent.
        </span>
      </figcaption>
    </motion.figure>
  );
}
