"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CRM_FEATURES, FAQS, QUICK_ACTIONS, SERVICES, findAnswer, type QuickActionId } from "../lib/knowledge";
import { mailtoFor, sendLead } from "../lib/send-lead";
import { CHAT_ENDPOINT, SITE } from "../lib/site";
import { ChatIcon, CloseIcon, PhoneIcon, SendIcon } from "./icons";

/*
 * On-page AI assistant.
 * - Quick actions answer instantly from the built-in knowledge base.
 * - Free-text questions go to the Cloudflare Worker (CHAT_ENDPOINT). If it
 *   is unavailable, the assistant answers from the FAQ or offers the lead form.
 * - "Book a consultation" / "Talk to a person" open a short form inside the
 *   chat that emails the enquiry (with the conversation) to the company inbox.
 *
 * Motion: the panel grows from the launcher (its trigger) and leaves the same
 * way, 220ms in / 160ms out, ease-out, no bounce. It opens occasionally, so a
 * standard animation is right; messages get a short 180ms fade so new text
 * doesn't teleport in. Reduced motion: fades only (MotionConfig "user").
 */

type Msg = { role: "user" | "assistant"; content: string; form?: boolean };

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const STORE_KEY = "rts-chat-v1";
const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, I'm the Recursive Tech assistant. Ask me anything about our AI agents, chatbots, CRM or websites, or pick a topic below.",
};

function quickReply(id: QuickActionId): Msg {
  switch (id) {
    case "services":
      return {
        role: "assistant",
        content:
          "We build four things:\n" +
          SERVICES.map((s) => `• ${s.title}: ${s.body}`).join("\n") +
          "\n\nWhich one are you thinking about?",
      };
    case "crm":
      return {
        role: "assistant",
        content:
          "Recursive CRM keeps clients, services and payments in one place:\n" +
          CRM_FEATURES.map((f) => `• ${f.title}`).join("\n") +
          "\n\nWant a walkthrough? Tap “Book a consultation”.",
      };
    case "pricing":
      return { role: "assistant", content: FAQS.find((f) => f.keywords.includes("pricing"))!.a };
    case "book":
      return {
        role: "assistant",
        content: "Great. Leave your details and we'll email you to set up a time.",
        form: true,
      };
    case "human":
      return {
        role: "assistant",
        content: "Sure. Send a message below and a person from our team will reply by email. You can also call us.",
        form: true,
      };
  }
}

async function askAI(history: Msg[]): Promise<string | null> {
  const messages = history
    .filter((m) => !m.form)
    .slice(-10)
    .map(({ role, content }) => ({ role, content }));
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // `model` is ignored by the updated worker; the old one requires it.
      body: JSON.stringify({ messages, model: "llama3-8b-8192", max_tokens: 400 }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const text: unknown = data?.reply ?? data?.choices?.[0]?.message?.content;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch {
    return null;
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  // Restore this visit's conversation. Safe for hydration: the messages are
  // only rendered once the panel is opened, which never happens on the server.
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [GREETING];
    try {
      const saved = sessionStorage.getItem(STORE_KEY);
      return saved ? (JSON.parse(saved) as Msg[]) : [GREETING];
    } catch {
      return [GREETING];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState<"idle" | "sending" | "sent" | { mailto: string }>("idle");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs));
    } catch {}
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, busy]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-chat", onOpen);
    return () => window.removeEventListener("open-chat", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  function track(name: string, params: Record<string, string> = {}) {
    window.gtag?.("event", name, params);
  }

  function onQuick(id: QuickActionId, label: string) {
    track("chat_quick_action", { action: id });
    if (id === "book" || id === "human") setLead("idle");
    setMsgs((m) => [...m, { role: "user", content: label }, quickReply(id)]);
  }

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setBusy(true);
    track("chat_message");
    const ai = await askAI(next);
    const fallback = findAnswer(text);
    setMsgs((m) => [
      ...m,
      ai
        ? { role: "assistant", content: ai }
        : fallback
          ? { role: "assistant", content: fallback }
          : {
              role: "assistant",
              content: "I don't have a good answer for that yet. Leave your details and a person will reply by email.",
              form: true,
            },
    ]);
    setBusy(false);
  }

  async function onLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (d.get("botcheck")) return;
    const transcript = msgs
      .filter((m) => !m.form)
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n");
    const leadData = {
      name: String(d.get("name") || "").trim(),
      email: String(d.get("email") || "").trim(),
      message: `${String(d.get("message") || "").trim()}\n\n--- Chat transcript ---\n${transcript}`,
      source: "AI chat" as const,
    };
    setLead("sending");
    const res = await sendLead(leadData);
    if (res.ok) {
      setLead("sent");
      track("generate_lead", { method: "ai_chat" });
      setMsgs((m) => [...m, { role: "assistant", content: `Thanks, ${leadData.name}. We've got your message and will reply to ${leadData.email}.` }]);
    } else {
      setLead({ mailto: mailtoFor(leadData) });
    }
  }

  const lastFormIndex = msgs.map((m) => !!m.form).lastIndexOf(true);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="chat-title"
            className="fixed inset-x-2 bottom-2 z-50 flex h-[min(85dvh,40rem)] flex-col overflow-hidden rounded-window border border-line bg-surface shadow-[0_32px_64px_-24px_rgb(17_18_20/0.35)] sm:inset-x-auto sm:right-5 sm:bottom-24 sm:w-[24rem]"
            style={{ transformOrigin: "bottom right" }}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } }}
            exit={{ opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.16, ease: EASE_OUT } }}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <p id="chat-title" className="text-[0.9375rem] font-semibold text-ink">
                  Recursive AI assistant
                </p>
                <p className="text-[0.8125rem] text-muted">Answers instantly · a person follows up</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="press inline-flex h-11 w-11 items-center justify-center rounded-control text-ink"
              >
                <CloseIcon />
                <span className="sr-only">Close chat</span>
              </button>
            </div>

            <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  className={m.role === "user" ? "flex justify-end" : ""}
                >
                  <p
                    className={`max-w-[85%] rounded-card px-3.5 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-wrap ${
                      m.role === "user" ? "bg-ink text-paper" : "bg-paper text-ink"
                    }`}
                  >
                    <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                    {m.content}
                  </p>

                  {m.form && i === lastFormIndex && lead !== "sent" && (
                    <form onSubmit={onLead} className="mt-3 space-y-2.5 rounded-card border border-line p-3.5">
                      <label className="block text-[0.8125rem] font-medium text-ink">
                        Name
                        <input name="name" required autoComplete="name" className="mt-1 w-full rounded-[0.5rem] border border-line-strong px-3 py-2.5 text-[1rem]" />
                      </label>
                      <label className="block text-[0.8125rem] font-medium text-ink">
                        Email
                        <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-[0.5rem] border border-line-strong px-3 py-2.5 text-[1rem]" />
                      </label>
                      <label className="block text-[0.8125rem] font-medium text-ink">
                        How can we help?
                        <textarea name="message" required rows={3} className="mt-1 w-full resize-none rounded-[0.5rem] border border-line-strong px-3 py-2.5 text-[1rem]" />
                      </label>
                      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={lead === "sending"}
                          className="press btn-primary inline-flex h-11 flex-1 items-center justify-center rounded-control bg-ink font-medium text-paper disabled:opacity-60"
                        >
                          {lead === "sending" ? "Sending…" : "Send to the team"}
                        </button>
                        <a
                          href={`tel:${SITE.phone}`}
                          aria-label={`Call us at ${SITE.phoneDisplay}`}
                          title="Call us"
                          className="press btn-secondary inline-flex h-11 w-11 items-center justify-center rounded-control border border-line-strong text-ink"
                        >
                          <PhoneIcon size={17} />
                        </a>
                      </div>
                      {typeof lead === "object" && (
                        <p className="text-[0.8125rem] text-muted">
                          Couldn&apos;t send automatically.{" "}
                          <a href={lead.mailto} className="font-medium text-ink underline underline-offset-4">
                            Send from your email app
                          </a>
                          .
                        </p>
                      )}
                    </form>
                  )}
                </motion.div>
              ))}
              {busy && <p className="text-[0.875rem] text-muted">Thinking…</p>}
            </div>

            <div className="border-t border-line px-3 pt-3 pb-3">
              <div className="mb-2.5 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_ACTIONS.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onQuick(q.id, q.label)}
                    className="press btn-secondary shrink-0 rounded-full border border-line-strong px-3 py-2 text-[0.8125rem] text-ink"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
              <form onSubmit={onSend} className="flex items-center gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Your question
                </label>
                <input
                  id="chat-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="Ask a question…"
                  autoComplete="off"
                  className="h-11 flex-1 rounded-control border border-line-strong bg-surface px-3.5 text-[1rem] text-ink placeholder:text-[#8a8d94]"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="press btn-primary inline-flex h-11 w-11 items-center justify-center rounded-control bg-ink text-paper disabled:opacity-40"
                >
                  <SendIcon />
                  <span className="sr-only">Send</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => (open ? close() : setOpen(true))}
        className={`press btn-primary fixed right-5 bottom-5 z-50 h-12 items-center gap-2 rounded-full bg-ink px-5 font-medium text-paper shadow-[0_12px_24px_-12px_rgb(17_18_20/0.5)] ${
          open ? "hidden sm:inline-flex" : "inline-flex"
        }`}
      >
        {open ? <CloseIcon size={17} /> : <ChatIcon size={17} />}
        {open ? "Close" : "Ask AI"}
      </button>
    </MotionConfig>
  );
}
