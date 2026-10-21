/**
 * Facts shown on the /research page. The prose lives in app/research/page.tsx;
 * the things most likely to change (status, supervisor, publications) live here.
 */

export const research = {
  title: "Application-Aware Proactive Scheduling in the Edge-Cloud Continuum",
  status: "Ongoing · M.Tech thesis",
  institution: "[ADD INSTITUTION]",
  supervisor: "[ADD SUPERVISOR NAME]",
  period: "[ADD START] – present",
  platform: "iContinuum emulator",
  // Link to code / thesis / slides once public.
  links: {
    code: "[ADD GITHUB URL]",
    thesis: "[ADD THESIS / REPORT URL]",
  },
};

/**
 * Publications. Leave empty until something is actually submitted/accepted.
 * Example entry:
 * { title: "...", venue: "Conference / Journal, 2027", status: "Under review", url: "https://..." }
 */
export const publications: { title: string; venue: string; status: string; url?: string }[] = [];
