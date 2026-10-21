/**
 * Skills, grouped by category, each with an honest self-assessed level.
 *
 *   comfortable → used repeatedly in projects/coursework; can work independently
 *   familiar    → have used it; would need references for anything non-trivial
 *   learning    → actively studying it right now
 *
 * [REVIEW LEVELS] These levels are initial guesses. Adjust them so they match
 * what you would be comfortable defending in an interview.
 */

export type SkillLevel = "comfortable" | "familiar" | "learning";

export type SkillGroup = {
  category: string;
  skills: { name: string; level: SkillLevel }[];
};

export const levelLabel: Record<SkillLevel, string> = {
  comfortable: "Comfortable",
  familiar: "Familiar",
  learning: "Learning",
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    skills: [
      { name: "Python", level: "comfortable" },
      { name: "C++", level: "comfortable" },
      { name: "SQL", level: "familiar" },
    ],
  },
  {
    category: "Data Science",
    skills: [
      { name: "NumPy", level: "comfortable" },
      { name: "Pandas", level: "comfortable" },
      { name: "Matplotlib", level: "comfortable" },
      { name: "Seaborn", level: "comfortable" },
      { name: "Scikit-learn", level: "comfortable" },
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "Regression", level: "comfortable" },
      { name: "Classification", level: "comfortable" },
      { name: "Model evaluation", level: "comfortable" },
      { name: "Feature engineering", level: "comfortable" },
      { name: "Time-series forecasting", level: "learning" },
    ],
  },
  {
    category: "Deep Learning",
    skills: [
      { name: "Neural networks", level: "familiar" },
      { name: "Deep learning fundamentals", level: "learning" },
      { name: "PyTorch", level: "learning" },
    ],
  },
  {
    category: "Mathematics",
    skills: [
      { name: "Linear algebra", level: "comfortable" },
      { name: "Probability", level: "comfortable" },
      { name: "Statistics", level: "comfortable" },
      { name: "Calculus", level: "comfortable" },
      { name: "Optimization", level: "learning" },
    ],
  },
  {
    category: "Systems / Cloud",
    skills: [
      { name: "Linux", level: "comfortable" },
      { name: "Docker", level: "familiar" },
      { name: "Kubernetes", level: "familiar" },
      { name: "Ansible", level: "familiar" },
      { name: "ONOS", level: "familiar" },
      { name: "Edge computing", level: "familiar" },
      { name: "Cloud computing", level: "familiar" },
    ],
  },
];
