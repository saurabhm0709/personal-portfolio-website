import katex from "katex";

/**
 * Renders a LaTeX formula to HTML on the server (zero client JavaScript).
 * Use in .tsx pages:  <Tex tex="\hat{y}_{t+h}" />  or  <Tex block tex="..." />
 * (In .mdx files, just write $...$ or $$...$$ instead.)
 */
export function Tex({ tex, block = false }: { tex: string; block?: boolean }) {
  const html = katex.renderToString(tex, { displayMode: block, throwOnError: false });
  return block ? (
    <div className="overflow-x-auto py-2" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}
