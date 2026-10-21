import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SmartLink } from "@/components/smart-link";
import { site } from "@/data/site";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-heading text-lg">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.headline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-border/60 px-5 py-5 text-xs text-muted-foreground sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-3">
          <SmartLink href={site.links.github} aria-label="GitHub" className="hover:text-foreground">
            <GithubIcon className="size-4" />
          </SmartLink>
          <SmartLink href={site.links.linkedin} aria-label="LinkedIn" className="hover:text-foreground">
            <LinkedinIcon className="size-4" />
          </SmartLink>
        </div>
      </div>
    </footer>
  );
}
