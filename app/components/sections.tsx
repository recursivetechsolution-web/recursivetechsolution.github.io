import { CRM_FEATURES, FAQS, PROCESS, SERVICES } from "../lib/knowledge";

// Sections below the hero. Deliberately static: only the hero has an entrance.

function SectionHead({ label, title, intro, id }: { label: string; title: string; intro?: string; id: string }) {
  return (
    <div className="max-w-[44rem]">
      <p className="font-mono text-label uppercase text-muted">{label}</p>
      <h2 id={id} className="mt-4 text-title font-semibold text-ink">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lead text-graphite">{intro}</p>}
    </div>
  );
}

const shell = "mx-auto max-w-[80rem] px-5 sm:px-8";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line py-20 sm:py-28">
      <div className={shell}>
        <SectionHead
          id="services-title"
          label="Services"
          title="What we build"
          intro="Four things, done carefully. Each one works on its own and they work better together."
        />
        <ol className="mt-14 border-t border-line">
          {SERVICES.map((s, i) => (
            <li key={s.id} className="grid gap-3 border-b border-line py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
              <span className="font-mono text-label text-muted sm:col-span-2 sm:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] text-ink sm:col-span-4 sm:text-[1.75rem]">
                {s.title}
              </h3>
              <p className="text-[1.0625rem] leading-relaxed text-graphite sm:col-span-6 sm:pt-1">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Crm() {
  return (
    <section id="crm" aria-labelledby="crm-title" className="bg-ink py-20 text-paper sm:py-28">
      {/* Old homepage anchor kept so existing links still land here. */}
      <span id="technology" className="sr-only" aria-hidden="true" />
      <div className={`${shell} grid gap-14 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <p className="font-mono text-label uppercase text-[#a6a8ad]">Recursive CRM</p>
          <h2 id="crm-title" className="mt-4 text-title font-semibold">
            Your clients, services and payments in one place.
          </h2>
          <p className="mt-5 text-lead text-[#c9cacd]">
            We built our own CRM for service businesses. Your AI agents work inside it, so
            every conversation, renewal and invoice stays connected to the right client.
          </p>
          <a
            href="#contact"
            className="press mt-9 inline-flex h-12 items-center justify-center rounded-control bg-paper px-6 font-medium text-ink"
          >
            Ask for a walkthrough
          </a>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-card bg-[#2f3136] sm:grid-cols-2 lg:col-span-7">
          {CRM_FEATURES.map((f) => (
            <li key={f.title} className="bg-ink p-6 sm:p-7">
              <h3 className="flex items-center gap-2.5 text-[1.0625rem] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {f.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#b9bbbf]">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Healthcare() {
  return (
    <section id="healthcare" aria-labelledby="healthcare-title" className="py-20 sm:py-28">
      <div className={`${shell} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <SectionHead
            id="healthcare-title"
            label="Healthcare"
            title="Less time on the phone. More time with patients."
          />
        </div>
        <div className="lg:col-span-6 lg:pt-10">
          <p className="text-lead text-graphite">
            Practices use our agents for appointment questions, intake and follow-up messages.
            A staff member stays in control of what is sent, and we go through your privacy and
            compliance requirements with you before anything is built.
          </p>
          <a
            href="/healthcare-solutions.html"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-ink underline decoration-line-strong underline-offset-[6px]"
          >
            Healthcare solutions <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line py-20 sm:py-28">
      <div className={shell}>
        <SectionHead id="process-title" label="How we work" title="From first call to a system your team trusts" />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="border-t border-ink pt-6">
              <span className="font-mono text-label text-muted">Step {i + 1}</span>
              <h3 className="mt-3 text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{p.title}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-graphite">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-20 sm:py-28">
      <div className={`${shell} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <SectionHead id="faq-title" label="FAQ" title="Questions we hear often" />
        </div>
        <div className="lg:col-span-8">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-line py-5 first:border-t">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[1.125rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-[1.25rem] text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[40rem] text-[1.0625rem] leading-relaxed text-graphite">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
