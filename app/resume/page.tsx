import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { Container, PageHeader } from "@/components/page-shell";
import { Placeholder } from "@/components/placeholder";
import { isPlaceholder, site } from "@/data/site";
import { publicFileExists } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Saurabh, M.Tech student in Mathematics and Computing focused on data science and machine learning.",
  alternates: { canonical: "/resume" },
};

const button =
  "inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-muted";

/*
 * To publish your resume:
 *   1. Save it as public/resume.pdf
 *   2. In data/site.ts set links.resumePdf to "/resume.pdf"
 * The page then shows an embedded preview plus open/download buttons.
 */
export default function ResumePage() {
  const pdf = site.links.resumePdf;
  const available = !isPlaceholder(pdf) && publicFileExists(pdf.replace(/^\//, ""));

  return (
    <Container>
      <PageHeader
        eyebrow="Resume"
        title="Resume"
        description="A one-page summary of my education, research, projects and skills."
      >
        {available && (
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={pdf} download className={button}>
              <Download className="size-4" aria-hidden="true" /> Download PDF
            </a>
            <a href={pdf} target="_blank" rel="noopener noreferrer" className={button}>
              <ExternalLink className="size-4" aria-hidden="true" /> Open in new tab
            </a>
          </div>
        )}
      </PageHeader>

      {available ? (
        <object
          data={pdf}
          type="application/pdf"
          className="h-[80vh] min-h-[600px] w-full rounded-xl border border-border bg-card"
          aria-label="Resume (PDF)"
        >
          <p className="p-6 text-sm text-muted-foreground">
            Your browser can&apos;t display PDFs inline.{" "}
            <a href={pdf} className="text-brand underline">
              Download the resume
            </a>{" "}
            instead.
          </p>
        </object>
      ) : (
        <div className="rounded-xl border border-dashed border-placeholder/40 bg-placeholder-soft p-8 sm:p-12">
          <p className="font-medium">
            <Placeholder>ADD RESUME</Placeholder>
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Save your resume as <code className="font-mono">public/resume.pdf</code> and set{" "}
            <code className="font-mono">links.resumePdf</code> to <code className="font-mono">&quot;/resume.pdf&quot;</code>{" "}
            in <code className="font-mono">data/site.ts</code>. In the meantime, the{" "}
            <Link href="/experience" className="text-brand underline underline-offset-4">
              experience
            </Link>{" "}
            and{" "}
            <Link href="/projects" className="text-brand underline underline-offset-4">
              projects
            </Link>{" "}
            pages cover the same ground.
          </p>
        </div>
      )}
    </Container>
  );
}
