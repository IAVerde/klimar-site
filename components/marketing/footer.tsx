import Link from "next/link";

import { KlimarLogo } from "@/components/icons/klimar-logo";
import { SITE } from "@/lib/site";

const PRODUCT_LINKS = [
  { href: "/#features", label: "Recursos" },
  { href: "/precos", label: "Preços" },
  { href: "https://status.useklimar.com.br", label: "Status", external: true },
  { href: "/sobre#roadmap", label: "Roadmap" },
];

const COMPANY_LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: `mailto:${SITE.email}`, label: "Contato", external: true },
];

const LEGAL_LINKS = [
  { href: "/termos", label: "Termos de uso" },
  { href: "/privacidade", label: "Política de privacidade" },
  { href: "/privacidade#cookies", label: "Cookies" },
  { href: "/privacidade#lgpd", label: "LGPD" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <KlimarLogo />
            </div>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-3">
              A planilha do Excel tem rival.
            </p>
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-600">
              um produto da {SITE.legalName}
            </p>
          </div>
          <FooterColumn title="Produto" links={PRODUCT_LINKS} />
          <FooterColumn title="Empresa" links={COMPANY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-mono text-[11px] text-slate-600 tracking-wide">
            © {new Date().getFullYear()} {SITE.legalName} · Rio de Janeiro, BR ·{" "}
            <a
              href="https://iaverde.ia.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              iaverde.ia.br
            </a>
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <SocialLink href="#" label="Instagram">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="LinkedIn">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="X / Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string; external?: boolean }>;
}) {
  return (
    <div>
      <h5 className="font-mono text-[10px] tracking-[0.16em] uppercase font-semibold text-slate-400 mb-4">
        {title}
      </h5>
      <ul className="space-y-2.5 text-[14px] text-slate-500">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                className="hover:text-slate-200 transition-colors"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="hover:text-slate-200 transition-colors">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-slate-800 grid place-items-center hover:text-slate-200 hover:border-slate-700 transition-colors"
    >
      {children}
    </a>
  );
}
