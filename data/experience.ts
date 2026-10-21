/**
 * Education and experience, shown on /experience (and education on /about).
 * Only list things that are real. Placeholders in [BRACKETS] are visibly marked
 * on the site until you replace them.
 */

export type TimelineEntry = {
  title: string;
  organisation: string;
  period: string;
  location?: string;
  points: string[];
};

export const education: TimelineEntry[] = [
  {
    title: "M.Tech, Mathematics & Computing",
    organisation: "National Institute of Technology, Jalandhar",
    period: " August, 2025 – July, 2027",
    points: [
      "Thesis: Application-Aware Proactive Scheduling in the Edge-Cloud Continuum.",
      "Relevant coursework: Machine Learning,Linear Algebra, Probability and Statistics, Sampling Distribution and Estimation Theory, Convex Optimization",
    ],
  },
  // {
  //   title: "B.Tech, Computer Science and Engineering",
  //   organisation: "Babu Banarasi Das National Institute of Technology and Management",
  //   period: "August, 2018 – July, 2022",
  //   points: ["[ADD DEGREE NAME, e.g. B.Tech / B.E. / B.Sc.]", "[ADD NOTABLE COURSEWORK OR PROJECTS]"],
  // },
];

export const experience: TimelineEntry[] = [
  {
    title: "M.Tech Researcher",
    organisation: "[ADD INSTITUTION / LAB]",
    period: "[ADD START] – present",
    points: [
      "Researching proactive, SLA-aware scheduling in the edge-cloud continuum using the iContinuum emulator.",
      "Experimenting with time-series prediction (ARIMA, LSTM) of application behaviour.",
    ],
  },
  // Add internships / jobs / teaching assistantships here, e.g.
  // { title: "Data Science Intern", organisation: "Company", period: "May 2027 – Jul 2027", points: ["..."] },
];
