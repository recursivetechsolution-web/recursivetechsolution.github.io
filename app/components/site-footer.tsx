import { SITE } from "../lib/site";

const groups = [
  {
    title: "Company",
    links: [
      { href: "/about.html", label: "About" },
      { href: "/careers.html", label: "Careers" },
      { href: "#contact", label: "Contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "#services", label: "Services" },
      { href: "#crm", label: "Recursive CRM" },
      { href: "/healthcare-solutions.html", label: "Healthcare" },
      { href: "/chat.html", label: "AI Chat" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy.html", label: "Privacy" },
      { href: "/security.html", label: "Security" },
      { href: "/terms.html", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[80rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
            {SITE.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-muted">
            AI agents, knowledge-base chatbots, a client CRM and websites for growing businesses and
            healthcare practices.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="font-mono text-label uppercase text-muted">{g.title}</p>
              <ul className="mt-4 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="nav-link inline-flex min-h-9 items-center text-[0.9375rem] text-graphite">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[80rem] px-5 py-6 text-[0.8125rem] text-muted sm:px-8">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
