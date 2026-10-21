/**
 * Helpers for reading the MDX files in /content.
 *
 * These run only on the server, at build time. Every project and blog page is
 * pre-rendered to static HTML, so nothing here executes when a visitor loads a page.
 */
import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Heading = { id: string; text: string };

/**
 * Pulls the "## Heading" lines out of an MDX file to build a table of contents.
 * IDs are generated with the same algorithm as rehype-slug (which adds the
 * matching id="" attributes to the rendered headings), so links line up.
 */
export function getHeadings(folder: "projects" | "blog", slug: string): Heading[] {
  const file = path.join(CONTENT_DIR, folder, `${slug}.mdx`);
  if (!fs.existsSync(file)) return [];

  const slugger = new GithubSlugger();
  const source = fs.readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, ""); // ignore code blocks
  const headings: Heading[] = [];

  for (const line of source.split(/\r?\n/)) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "");
    const id = slugger.slug(text); // called for h3 too, so duplicate-numbering matches rehype-slug
    if (match[1] === "##") headings.push({ id, text });
  }
  return headings;
}

/** Lists the slugs (filenames without .mdx) in a content folder. */
export function listSlugs(folder: "projects" | "blog"): string[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** True if a file exists in /public, e.g. publicFileExists("resume.pdf"). */
export function publicFileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relativePath));
}
