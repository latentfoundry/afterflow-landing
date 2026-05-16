// Drop looped MP4 files under public/video and set these paths, for example:
// heroVideo.src = "/video/afterflow-hero.mp4"
export const heroVideo = {
  src: "/video/afterflow.mp4",
  poster: "",
};

export const workflowSteps = [
  {
    eyebrow: "01",
    title: "Connect approved context",
    body: "Bring together approved documents, systems, owners, and external signals around one decision.",
    animation: "context",
  },
  {
    eyebrow: "02",
    title: "Build the world model",
    body: "Structure the operating environment into stakeholders, dependencies, assumptions, and evidence.",
    animation: "model",
  },
  {
    eyebrow: "03",
    title: "Compare simulated paths",
    body: "Run agent simulations over the world model to compare likely decision paths. Review evidence-backed second-order effects, risks, indicators, and mitigations.",
    animation: "simulation",
  },
];

export const useCaseStudies = [
  {
    title: "Change events",
    description:
      "Planned changes where hidden dependencies can surface after launch.",
    examples: [
      "Platform migrations",
      "AI rollout risk",
      "Policy rollouts",
      "Customer-impacting changes",
    ],
  },
  {
    title: "Operational posture",
    description:
      "Recurring operating choices where capacity, supply, and dependency exposure matter.",
    examples: [
      "Vendor and system migrations",
      "Supply exposure",
      "Capacity allocation",
    ],
  },
  {
    title: "Reactive decisions",
    description:
      "Time-sensitive choices made when an issue is already creating pressure.",
    examples: [
      "Incident response decisions",
      "Rollback decisions",
      "Customer communication",
    ],
  },
];
