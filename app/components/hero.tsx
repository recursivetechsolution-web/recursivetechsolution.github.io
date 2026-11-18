"use client";

import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { WorkflowPreview } from "./workflow-preview";

/*
 * Hero entrance — one coordinated sequence, plays once per visit.
 *
 * | Element      | Role       | Start | Duration | Motion            |
 * | H1 (eyebrow) | Decoration | 0ms   | 400ms    | fade only         |
 * | Headline 1   | Lead       | 0ms   | 700ms    | fade + 18px rise  |
 * | Headline 2   | Lead       | 90ms  | 700ms    | fade + 18px rise  |
 * | Sub copy     | Support    | 200ms | 600ms    | fade + 10px rise  |
 * | CTAs (both)  | Support    | 290ms | 550ms    | fade + 8px rise   |
 * | Preview      | Support    | 360ms | 800ms    | fade + 24px rise  |
 * | Header, page | Static     | —     | —        | —                 |
 *
 * Everything is clickable as soon as it is visible.
 * Reduced motion: opacity only, no delays, all together.
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const CONTACT_HREF = "#contact";

// `initial` must be identical on server and client (the server can't know the
// reduced-motion setting), so only the transition changes. <MotionConfig
// reducedMotion="user"> below makes Motion drop the `y` movement and keep the
// fade; here we also drop the delays so everything appears together.
function useRise() {
  const reduce = useReducedMotion();
  return (delay: number, distance: number, duration: number) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0.3, ease: EASE_OUT }
      : { duration, delay, ease: EASE_OUT },
  });
}

export function Hero() {
  const rise = useRise();
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
    <section
      id="home"
      aria-labelledby="hero-title"
      className="mx-auto max-w-[80rem] px-5 pt-12 pb-20 sm:px-8 sm:pt-16 lg:pt-20 lg:pb-28"
    >
      {/* SEO: the H1 carries the company name and what it does; the large
          statement below is the visual headline. */}
      <motion.h1
        id="hero-title"
        className="reveal font-mono text-label uppercase text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0.3 : 0.4, ease: EASE_OUT }}
      >
        Recursive Tech Solution <span aria-hidden="true">·</span> AI agents, chatbots &amp; CRM
      </motion.h1>

      <p className="mt-6 max-w-[14ch] text-display font-semibold text-ink sm:mt-8">
        <motion.span className="reveal block" {...rise(0, 18, 0.7)}>
          AI that handles
        </motion.span>
        <motion.span className="reveal block text-muted" {...rise(0.09, 18, 0.7)}>
          the follow-up.
        </motion.span>
      </p>

      <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-2">
          <motion.p
            className="reveal max-w-[34rem] text-lead text-graphite"
            {...rise(0.2, 10, 0.6)}
          >
            Recursive Tech Solution builds AI agents, knowledge-base chatbots and a client CRM
            for growing businesses and healthcare practices. The agent does the busywork.
            Your team approves what goes out.
          </motion.p>

          <motion.div
            className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            {...rise(0.29, 8, 0.55)}
          >
            <a
              href={CONTACT_HREF}
              className="press btn-primary inline-flex h-12 items-center justify-center rounded-control bg-ink px-6 text-[1rem] font-medium text-paper"
            >
              Book a consultation
            </a>
            <a
              href="/chat.html"
              onClick={(e) => {
                // Open the on-page assistant; the link still works without JS.
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-chat"));
              }}
              className="press btn-secondary inline-flex h-12 items-center justify-center gap-2 rounded-control border border-line-strong px-6 text-[1rem] font-medium text-ink"
            >
              Try our AI chat
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>

        </div>

        <div className="lg:col-span-7">
          <WorkflowPreview />
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
