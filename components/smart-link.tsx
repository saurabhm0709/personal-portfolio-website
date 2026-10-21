import Link from "next/link";
import { cn } from "@/lib/utils";
import { isPlaceholder } from "@/data/site";

type SmartLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

/**
 * One link component for every kind of URL:
 *  - internal paths ("/projects")  → Next.js <Link> (client-side navigation)
 *  - external URLs ("https://...")  → <a target="_blank">
 *  - placeholders ("[ADD ...]")     → non-clickable span, visibly marked, so a
 *    missing URL never turns into a broken link.
 */
export function SmartLink({ href, className, children, ...rest }: SmartLinkProps) {
  if (isPlaceholder(href)) {
    return (
      <span
        className={cn(className, "cursor-not-allowed opacity-60")}
        title={`Placeholder: ${href}`}
        aria-disabled="true"
        aria-label={rest["aria-label"] ? `${rest["aria-label"]} (not added yet)` : undefined}
      >
        {children}
      </span>
    );
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
