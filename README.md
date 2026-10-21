# Saurabh: personal portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · MDX · Motion. No database: all content lives in files.

## Run it

```bash
npm install        # once
npm run dev        # http://localhost:3000, reloads on save
npm run lint       # code-style checks
npm run build      # production build (also type-checks); run before deploying
npm run start      # serve the production build locally
```

## Where things live

```
app/                    Pages. Folder name = URL.
  page.tsx              /            (home)
  about/page.tsx        /about
  projects/page.tsx     /projects
  projects/[slug]/      /projects/<slug>   one template for every project
  research/page.tsx     /research
  experience/page.tsx   /experience
  blog/page.tsx         /blog
  blog/[slug]/          /blog/<slug>       one template for every post
  contact/, resume/     /contact, /resume
  layout.tsx            Wraps every page: fonts, header, footer, theme, default SEO
  globals.css           Colours (light + dark), long-form text styles
  sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx   SEO files

data/                   ← Edit these to change site content
  site.ts               Name, links, email, nav, "Currently" list
  projects.ts           Project cards + metadata
  skills.ts             Skills and honest levels
  experience.ts         Education & experience timeline
  research.ts           Research facts and publications
  notes.ts              Planned blog topics

content/                ← Long-form writing (MDX = Markdown + components)
  projects/<slug>.mdx   Project write-ups
  blog/<slug>.mdx       Blog posts

components/             Reusable UI pieces (header, cards, diagrams, ...)
lib/                    Helpers that read the content folder
public/                 Static files served as-is (put resume.pdf and images here)
```

## Common tasks

**Replace placeholders.** Search the project for `[ADD` (and `[REVIEW`). Every missing fact is marked that way and shows up amber/dashed on the site.

**Add your resume.** Save it as `public/resume.pdf`, then in `data/site.ts` set `resumePdf: "/resume.pdf"`.

**Add a project.**
1. Add an entry to `data/projects.ts`.
2. Create `content/projects/<same-slug>.mdx` (copy an existing one as a template).

**Add a blog post.** Create `content/blog/<slug>.mdx` starting with:

```js
export const meta = {
  title: "Bias-Variance Tradeoff",
  description: "One-sentence summary.",
  date: "2026-11-02",
  tags: ["Machine Learning"],
  status: "published", // "draft" = only visible in `npm run dev`
};
```

Math works with `$inline$` and `$$block$$` (KaTeX). Code blocks get syntax highlighting.

**Add a figure.** Save the image to `public/images/...`, then in an MDX file:

```mdx
<Figure src="/images/house/residuals.png" alt="Residuals vs predicted price" width={1200} height={700} caption="..." />
```

Components usable in any MDX file without importing: `Figure`, `FigurePlaceholder`, `Placeholder`, `Metrics`, `Pipeline`, `Callout` (see `components/content-blocks.tsx`).

**Update "Currently".** Edit `now` and `nowUpdated` in `data/site.ts`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. On vercel.com → *Add New Project* → import the repo → Deploy (no settings needed).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to your final URL (e.g. `https://saurabh.vercel.app`) and redeploy, so the sitemap and social previews use the right domain.
