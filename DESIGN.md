# Recursive Tech design system — "Editorial Systems"

Approved direction (Nov 2026): a sophisticated B2B technology company.
Strong type, generous whitespace, warm paper, one accent. No purple
gradients, glow, glassmorphism or decorative motion.

Tokens live in `app/globals.css` (`@theme`). Use them; don't add parallel values.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#f6f5f1` | Page background |
| `surface` | `#ffffff` | Windows, cards |
| `ink` | `#111214` | Text, primary buttons (17.2:1 on paper) |
| `graphite` | `#2a2c31` | Body copy in long passages, button hover |
| `muted` | `#5b5e66` | Secondary text (6.0:1 on paper) |
| `line` / `line-strong` | `#e3e1da` / `#cfccc3` | Dividers, borders |
| `accent` | `#c63d1b` | The ONE accent: active/next step, markers, focus ring (4.7:1 on paper) |
| `accent-soft` | `#f7e3dc` | Background behind an accent marker |

Primary buttons are ink, not accent. The accent is rare on purpose.

## Type

Geist (sans) and Geist Mono, self-hosted via `next/font`.

| Token | Size | Leading | Tracking |
| --- | --- | --- | --- |
| `text-display` | clamp(2.75rem → 6.5rem) | 0.98 | -0.045em |
| `text-title` | clamp(2rem → 3.25rem) | 1.05 | -0.03em |
| `text-lead` | clamp(1.0625rem → 1.3125rem) | 1.55 | -0.005em |
| `text-label` (mono, uppercase) | 0.75rem | 1.2 | +0.08em |

Tracking tightens as size grows. Body text stays near 0.

## Layout

Max width 80rem, 20px gutter on phones / 32px from `sm`. 12-column grid on
large screens. Left-aligned, editorial. Hairline borders instead of shadows,
except the product window (`shadow-window`).

## Motion

Curves from the `animate` skill: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.

- One hero entrance per visit (timeline in `app/components/hero.tsx`).
- The product preview's steps play once, in order, because order is the meaning.
- Press feedback: `.press` scales to 0.97 on `:active`, 120ms.
- Hover effects only under `(hover: hover) and (pointer: fine)`.
- Reduced motion: `MotionConfig reducedMotion="user"` drops movement; delays go
  to 0 so everything fades in together. `initial` values must be the same on
  server and client (no branching on reduced motion) to avoid hydration errors.
- Nothing loops. Sections below the hero do not animate on scroll by default.

## Content rules

- Never invent clients, testimonials, statistics, awards, certifications or
  partnerships. Removed claims (owner-approved, Nov 2026): 99.9% accuracy,
  99.9% uptime SLA, SOC 2, HIPAA-compliant, 256-bit encryption, "proprietary"
  Command Center, "Trusted by enterprises / Fortune 500".
- Product visuals use sample data and are labelled "Illustrative example".

## Accessibility

Skip link, `<main>` landmark, 2px accent focus ring, 44px+ touch targets,
labelled menu button with `aria-expanded`, Escape closes the menu and returns focus.

## Contact & chat (added Nov 2026)

- Phone number is never shown as text; use the phone icon button
  (`tel:` link with an `aria-label` that includes the number).
- Contact form and the chat's lead form email the inbox through Web3Forms
  (`WEB3FORMS_ACCESS_KEY` in `app/lib/site.ts`). Without a key they fall back to
  a pre-filled `mailto:` link.
- Chat answers: quick actions and the FAQ come from `app/lib/knowledge.ts`;
  free text goes to `cloudflare-worker/worker.js` (Workers AI). Keep the
  worker's system prompt in step with `knowledge.ts`.
- Only the hero animates. The chat panel grows from its launcher (220ms in,
  160ms out, ease-out).
