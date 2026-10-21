import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Callout } from "@/components/content-blocks";
import { Container } from "@/components/page-shell";
import { Tag } from "@/components/project-card";
import { TableOfContents } from "@/components/toc";
import { site } from "@/data/site";
import { getHeadings } from "@/lib/content";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [site.name],
      images: ["/opengraph-image"], // re-added: page-level openGraph replaces the inherited one
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  const headings = getHeadings("blog", slug);

  return (
    <Container>
      <div className="pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> All notes
        </Link>
      </div>

      <header className="max-w-3xl pt-10 pb-10">
        <p className="font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </header>

      <div className="grid gap-12 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
        <article className="prose-content max-w-[44rem] min-w-0">
          {post.status === "example" && (
            <Callout title="Example post">
              This post demonstrates the blog&apos;s formatting (maths, code, tables). Edit or replace it
              before publishing the site.
            </Callout>
          )}
          <Content />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </Container>
  );
}
