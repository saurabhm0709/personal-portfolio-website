import Link from "next/link";
import { Container } from "@/components/page-shell";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-32">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-block text-sm font-medium text-brand hover:underline hover:underline-offset-4">
        ← Back to home
      </Link>
    </Container>
  );
}
