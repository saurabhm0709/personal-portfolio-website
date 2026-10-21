import type { MDXComponents } from "mdx/types";
import { Callout, Figure, Metrics, Pipeline } from "@/components/content-blocks";
import { FigurePlaceholder, Placeholder } from "@/components/placeholder";

// Required by @next/mdx. Everything listed here can be used in any .mdx file
// without an import statement. Styling of plain Markdown (headings, lists,
// code, tables) lives in the `.prose-content` rules in app/globals.css.
const components: MDXComponents = {
  Callout,
  Figure,
  FigurePlaceholder,
  Metrics,
  Pipeline,
  Placeholder,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
