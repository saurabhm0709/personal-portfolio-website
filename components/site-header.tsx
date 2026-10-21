"use client";

// Client Component: it needs the current URL (to highlight the active link)
// and local state (to open/close the mobile menu).

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SmartLink } from "@/components/smart-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { mainNav, site } from "@/data/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const iconLink =
  "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5" aria-label={`${site.name}, home`}>
          <span className="font-heading text-xl font-medium tracking-tight">{site.name}</span>
          <span className="hidden font-mono text-[11px] tracking-wide text-muted-foreground uppercase sm:inline">
            ML · Data · Math
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {active && <span className="sr-only"> (current page)</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <SmartLink href={site.links.github} aria-label="GitHub" className={iconLink}>
            <GithubIcon className="size-4" />
          </SmartLink>
          <SmartLink href={site.links.linkedin} aria-label="LinkedIn" className={iconLink}>
            <LinkedinIcon className="size-4" />
          </SmartLink>
          <ThemeToggle />
          <Link
            href="/resume"
            className="ml-2 inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <FileText className="size-3.5" aria-hidden="true" />
            Resume
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={iconLink} aria-label="Open menu">
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] max-w-xs gap-0 p-0">
              <SheetTitle className="border-b border-border px-6 py-5 font-heading text-lg">
                {site.name}
              </SheetTitle>
              <nav aria-label="Mobile" className="px-3 py-4">
                <ul className="flex flex-col">
                  {[...mainNav, { href: "/experience", label: "Experience" }, { href: "/resume", label: "Resume" }].map(
                    (item) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center justify-between rounded-md px-3 py-2.5 text-base transition-colors",
                              active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    },
                  )}
                </ul>
              </nav>
              <div className="mt-auto flex gap-2 border-t border-border px-6 py-5">
                <SmartLink href={site.links.github} aria-label="GitHub" className={iconLink}>
                  <GithubIcon className="size-4" />
                </SmartLink>
                <SmartLink href={site.links.linkedin} aria-label="LinkedIn" className={iconLink}>
                  <LinkedinIcon className="size-4" />
                </SmartLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
