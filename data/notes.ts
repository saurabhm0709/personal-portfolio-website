/**
 * Article ideas shown on /blog under "Planned". They are just titles; there are
 * no pages behind them. When you write one, create content/blog/<slug>.mdx
 * and delete it from this list.
 */
export const plannedNotes: { title: string; topic: string }[] = [
  { title: "Monte Carlo Simulation for Understanding Probability", topic: "Probability" },
  { title: "Bias-Variance Tradeoff", topic: "Machine Learning" },
  { title: "Understanding Logistic Regression", topic: "Machine Learning" },
  { title: "Why Train/Test Leakage Happens", topic: "Data Science" },
];

/** Topics the blog covers; shown as a short list on /blog. */
export const blogTopics = [
  "Probability",
  "Statistics",
  "Linear Algebra",
  "Machine Learning",
  "Deep Learning",
  "Python",
  "Data Science",
  "Time Series",
  "Cloud / Edge Computing",
];
