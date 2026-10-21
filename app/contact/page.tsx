import type { Metadata } from "next";
import { FileText, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Container, PageHeader } from "@/components/page-shell";
import { TextWithPlaceholders } from "@/components/placeholder";
import { SmartLink } from "@/components/smart-link";
import { isPlaceholder, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Saurabh about Data Scientist, Machine Learning Engineer or AI Engineer roles.",
  alternates: { canonical: "/contact" },
};

// No contact form: a form needs a backend or third-party service, and a plain
// email link works everywhere without one.
export default function ContactPage() {
  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: isPlaceholder(site.email) ? site.email : `mailto:${site.email}`,
      note: "Best for role opportunities and research questions.",
    },
    { icon: LinkedinIcon, label: "LinkedIn", value: site.links.linkedin, href: site.links.linkedin },
    { icon: GithubIcon, label: "GitHub", value: site.links.github, href: site.links.github },
    { icon: FileText, label: "Resume", value: "View or download", href: "/resume" },
  ];

  return (
    <Container size="narrow">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="I'm preparing for Data Scientist, Machine Learning Engineer and AI Engineer roles. If you're hiring, or want to talk about my research or projects, I'd be glad to hear from you."
      />

      <ul className="divide-y divide-border border-y border-border">
        {channels.map(({ icon: Icon, label, value, href, note }) => (
          <li key={label}>
            <SmartLink
              href={href}
              className="group flex items-center gap-5 py-5 transition-colors hover:bg-muted/40 sm:px-3"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-muted-foreground">{label}</span>
                <span className="block truncate font-medium group-hover:text-brand">
                  <TextWithPlaceholders text={value} />
                </span>
                {note && <span className="mt-0.5 block text-sm text-muted-foreground">{note}</span>}
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>

      <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-4" aria-hidden="true" />
        <TextWithPlaceholders text={site.location} />
      </p>
    </Container>
  );
}
