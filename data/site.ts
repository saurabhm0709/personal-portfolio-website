/**
 * Site-wide information: your name, links, navigation and the "Currently" list.
 *
 * Anything in [SQUARE BRACKETS] is a placeholder. Search the project for "[ADD"
 * to find every one of them.
 */

/** Returns true for values that are still placeholders like "[ADD GITHUB URL]". */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.startsWith("[");
}

export const site = {
  name: "Saurabh Mishra",
  // Shown in the hero and used in page titles / SEO.
  headline: "M.Tech Mathematics & Computing · Data Science & Machine Learning",
  shortTitle: "Data Science & ML",
  description:
    "Saurabh is an M.Tech student in Mathematics and Computing working on machine learning, statistics and time-series prediction, with research on proactive scheduling in the edge-cloud continuum.",

  // Public URL of the deployed site, used for sitemap and social previews.
  // NEXT_PUBLIC_SITE_URL in Vercel overrides this (e.g. after adding a custom domain).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saurabhm.vercel.app",

  location: "Dehradun, India",
  email: "saurabhmishra0619@gmail.com",

  links: {
    github: "https://github.com/saurabhm0709",
    linkedin: "https://www.linkedin.com/in/saurabhmishra0709/",
    // Put your resume at public/resume.pdf and set this to "/resume.pdf".
    resumePdf: "[ADD RESUME]",
  },

  education: {
    current: "M.Tech, Mathematics & Computing",
    currentInstitution: "National Institute of Technology, Jalandhar, Punjab, India",
    previous: "B.Tech, Computer Science and Engineering",
    previousInstitution: "BBDNITM, Lucknow, India",
  },
};

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * The "Currently" section on the home page. Edit freely; keep it short.
 * Update `nowUpdated` whenever you change the list.
 */
export const nowUpdated = "October 2026";
export const now = [
  { label: "Completing my M.Tech", detail: "Final year, Mathematics & Computing." },
  {
    label: "Edge-cloud research",
    detail: "Application-aware proactive scheduling using the iContinuum emulator.",
  },
  {
    label: "Probability & statistics",
    detail: "Strengthening the foundations that machine learning is built on.",
  },
  { label: "ML / deep learning", detail: "Studying deep learning fundamentals and implementing models in PyTorch." },
  { label: "Data science projects", detail: "End-to-end projects, from raw data to deployed models." },
  { label: "Preparing for industry", detail: "Looking for Data Scientist / ML Engineer roles." },
];
