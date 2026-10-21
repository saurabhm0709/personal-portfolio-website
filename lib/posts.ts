import fs from "node:fs";
import path from "node:path";
import { listSlugs } from "@/lib/content";

/**
 * Every blog post is one file: content/blog/<slug>.mdx, which must export a
 * `meta` object at the top, for example:
 *
 *   export const meta = {
 *     title: "Bias-Variance Tradeoff",
 *     description: "One-sentence summary for the post list and search engines.",
 *     date: "2026-11-02",           // YYYY-MM-DD
 *     tags: ["Machine Learning"],
 *     status: "published",          // or "example" / "draft" (drafts are hidden in production)
 *   }
 */
export type PostMeta = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: "published" | "example" | "draft";
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

function readingMinutes(slug: string): number {
  const text = fs.readFileSync(path.join(process.cwd(), "content", "blog", `${slug}.mdx`), "utf8");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    listSlugs("blog").map(async (slug) => {
      const { meta } = (await import(`@/content/blog/${slug}.mdx`)) as { meta: PostMeta };
      return { ...meta, slug, readingMinutes: readingMinutes(slug) };
    }),
  );
  return posts
    .filter((p) => p.status !== "draft" || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  // Fixed locale + UTC so server output is identical everywhere.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
