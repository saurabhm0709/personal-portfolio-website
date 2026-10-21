import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/posts";

// Served at /sitemap.xml. New projects and posts are included automatically.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/projects", "/research", "/experience", "/blog", "/contact", "/resume"];
  const posts = await getAllPosts();

  return [
    ...staticRoutes.map((route) => ({ url: `${site.url}${route}` })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
