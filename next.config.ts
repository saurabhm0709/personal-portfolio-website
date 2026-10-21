import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let Next.js treat .mdx files as importable modules (used for blog posts
  // and project write-ups in the /content folder).
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

// Turbopack (the default bundler in Next 16) can't receive JS functions from
// this config, so plugins are referenced by package name as strings.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-math"],
    rehypePlugins: [
      "rehype-slug",
      "rehype-katex",
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
