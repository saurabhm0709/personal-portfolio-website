/**
 * Project list. This drives the project cards (home page, /projects) and the
 * header of each project page.
 *
 * TO ADD A PROJECT:
 *   1. Add an entry to the `projects` array below.
 *   2. Create content/projects/<slug>.mdx with the long write-up.
 * That's it. The page at /projects/<slug> is generated automatically.
 */

export type ProjectStatus = "complete" | "in-progress" | "research" | "planned";

export type Project = {
  slug: string; // URL: /projects/<slug>; must match the .mdx filename
  title: string;
  summary: string; // 1–2 sentences, shown on cards
  category: string;
  status: ProjectStatus;
  period: string; // e.g. "Jan 2026 – Apr 2026"
  tags: string[];
  links: { github?: string; demo?: string };
  featured: boolean; // show on the home page
};

export const statusLabel: Record<ProjectStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  research: "Ongoing research",
  planned: "Planned",
};

export const projects: Project[] = [
  {
    slug: "sla-aware-scheduling-edge-cloud",
    title: "Proactive SLA-Aware Scheduling in the Edge-Cloud Continuum",
    summary:
      "M.Tech research: predicting application behaviour with time-series models so that workloads can be rescheduled before SLA violations happen, evaluated on the iContinuum emulator.",
    category: "Research · Time series · Systems",
    status: "research",
    period: "[ADD DATES]",
    tags: ["Time series", "ARIMA", "LSTM", "Scheduling", "Edge computing", "iContinuum"],
    links: { github: "[ADD GITHUB URL]" },
    featured: true,
  },
  {
    slug: "hyderabad-house-price-prediction",
    title: "Hyderabad House Price Prediction",
    summary:
      "End-to-end regression on web-scraped Hyderabad housing listings: cleaning, missing-value and outlier analysis, locality-aware feature engineering, leakage-safe splitting and deployment.",
    category: "Data Science · Regression",
    status: "in-progress", // [REVIEW STATUS]
    period: "[ADD DATES]",
    tags: ["Python", "Pandas", "Scikit-learn", "Web scraping", "EDA", "Regression"],
    links: { github: "[ADD GITHUB URL]", demo: "[ADD DEMO URL]" },
    featured: true,
  },
  {
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    summary:
      "A recommender system for movies. Dataset, approach and evaluation to be documented as the project is built.",
    category: "Machine Learning · Recommender systems",
    status: "planned",
    period: "[ADD DATES]",
    tags: ["Recommender systems", "Python"],
    links: { github: "[ADD GITHUB URL]", demo: "[ADD DEMO URL]" },
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
