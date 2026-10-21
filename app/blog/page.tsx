import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/page-shell";
import { Tag } from "@/components/project-card";
import { blogTopics, plannedNotes } from "@/data/notes";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical notes by Saurabh on probability, statistics, machine learning, time series and edge-cloud computing, written to explain ideas from first principles.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container>
      <PageHeader
        eyebrow="Blog · Technical notes"
        title="Notes"
        description="Notes on probability, statistics and machine learning: working through ideas from first principles, usually with a simulation or derivation."
      >
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
          {blogTopics.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="sr-only">
            Posts
          </h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="group relative grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                    <p className="font-mono text-xs text-muted-foreground sm:pt-1.5">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                    <div>
                      <h3 className="font-heading text-xl font-medium tracking-tight group-hover:text-brand">
                        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-muted-foreground">{post.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {post.status === "example" && (
                          <span className="rounded border border-dashed border-placeholder/50 px-2 py-0.5 font-mono text-[11px] text-placeholder">
                            Example post
                          </span>
                        )}
                        {post.status === "draft" && (
                          <span className="rounded border border-dashed border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                            Draft (dev only)
                          </span>
                        )}
                        {post.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {post.readingMinutes} min read
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside aria-labelledby="planned-heading">
          <h2
            id="planned-heading"
            className="mb-4 font-mono text-xs tracking-wider text-muted-foreground uppercase"
          >
            Planned
          </h2>
          <ul className="space-y-3">
            {plannedNotes.map((n) => (
              <li key={n.title} className="rounded-lg border border-dashed border-border p-3">
                <p className="text-sm">{n.title}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{n.topic}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  );
}
