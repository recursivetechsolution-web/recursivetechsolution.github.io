"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "../lib/site";
import { PhoneIcon } from "./icons";

// Section anchors (#services, #crm, #contact) are kept from the old homepage
// and will exist once the rest of the page is built.
const links = [
  { href: "#services", label: "Services" },
  { href: "#crm", label: "CRM" },
  { href: "/healthcare-solutions.html", label: "Healthcare" },
  { href: "/about.html", label: "About" },
  { href: "/careers.html", label: "Careers" },
  { href: "/chat.html", label: "AI Chat" },
];

const CONTACT_HREF = "#contact";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-40 border-b border-line/70 bg-paper">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[80rem] items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="press py-2.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink"
        >
          Recursive Tech Solution<span className="text-accent">.</span>
          <span className="sr-only">, home</span>
        </Link>

        <ul className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-[0.9375rem] text-muted transition-colors duration-150"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={`tel:${SITE.phone}`}
            aria-label={`Call us at ${SITE.phoneDisplay}`}
            title="Call us"
            className="press btn-secondary inline-flex h-11 w-11 items-center justify-center rounded-control border border-line-strong text-ink sm:h-10 sm:w-10"
          >
            <PhoneIcon size={17} />
          </a>
          <a
            href={CONTACT_HREF}
            className="press btn-primary hidden h-10 items-center rounded-control bg-ink px-4 text-[0.9375rem] font-medium text-paper sm:inline-flex"
          >
            Book a consultation
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="press inline-flex h-11 w-11 items-center justify-center rounded-control text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu: opens from the header it belongs to, exits the same way. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_24px_32px_-24px_rgb(17_18_20/0.25)] xl:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <ul className="mx-auto flex max-w-[80rem] flex-col px-5 py-3 sm:px-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-line/70 text-[1.0625rem] text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <a
                  href={CONTACT_HREF}
                  className="press btn-primary flex h-12 items-center justify-center rounded-control bg-ink text-paper font-medium"
                >
                  Book a consultation
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
