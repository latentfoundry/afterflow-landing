import type { Metadata } from "next";
import Link from "next/link";
import {
  howItWorksPath,
  howItWorksUrl,
  ogImagePath,
  requestAccessPath,
  siteRootUrl,
} from "../lib/site";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const pageTitle = "How Afterflow Works | AI Decision Simulation Platform";
const pageDescription =
  "How Afterflow works: company context, world models, cohort swarms, stochastic simulations, and decision-path comparison for organizations.";

type IconKind =
  | "ingest"
  | "world"
  | "swarm"
  | "orchestrate"
  | "private"
  | "region"
  | "boundary";

type ContextIconKind = "upload" | "database" | "api" | "people" | "web";
type ReportIconKind = "timeline" | "narrative" | "mitigation" | "comparison";
type RuntimeIconKind = "cohort" | "memory" | "stochastic" | "paths";

function FeatureIcon({ kind }: { kind: IconKind }) {
  if (kind === "ingest") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M4 7h10M4 12h16M4 17h12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "world") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 4v16M6 9.5h12M6 14.5h12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "swarm") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <circle cx="12" cy="7" r="2.25" fill="currentColor" />
        <circle cx="7" cy="15.5" r="2.25" fill="currentColor" />
        <circle cx="17" cy="15.5" r="2.25" fill="currentColor" />
        <path
          d="M10.4 8.7 8.4 13M13.6 8.7 15.6 13M9.4 15.5h5.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "orchestrate") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M6 6h4v4H6zM14 6h4v4h-4zM10 14h4v4h-4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 8h4M16 10v2M12 12v2M8 10v2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "private") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M8.5 10V7.8A3.5 3.5 0 0 1 12 4.3a3.5 3.5 0 0 1 3.5 3.5V10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <rect
          x="6"
          y="10"
          width="12"
          height="9"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "region") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M12 20s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="2.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M12 4 5 7.5v4.8c0 4.1 2.7 6.3 7 7.7 4.3-1.4 7-3.6 7-7.7V7.5L12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.5 12.5 11.2 14 14.8 10.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ContextIcon({ kind }: { kind: ContextIconKind }) {
  if (kind === "upload") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M12 15V6M8.5 9.5 12 6l3.5 3.5M5 18h14"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "database") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <ellipse
          cx="12"
          cy="6.5"
          rx="6.5"
          ry="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.5 6.5v7c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-7M5.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "api") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="m9 8-4 4 4 4M15 8l4 4-4 4M13 6l-2 12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "people") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <circle cx="9" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.5" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M4.5 17c.7-2 2.4-3 4.5-3s3.8 1 4.5 3M13.5 16.2c.5-1.4 1.7-2.2 3.2-2.2 1.3 0 2.4.6 3 1.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <circle
        cx="12"
        cy="12"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 12h14M12 5c2 2.1 3 4.5 3 7s-1 4.9-3 7c-2-2.1-3-4.5-3-7s1-4.9 3-7Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ReportIcon({ kind }: { kind: ReportIconKind }) {
  if (kind === "timeline") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <circle
          cx="12"
          cy="12"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 8v4l2.8 1.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "narrative") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M6 7.5h12M6 12h8M6 16.5h6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M5.5 5.5h13a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H11l-4.5 3v-3H5.5A1.5 1.5 0 0 1 4 15V7a1.5 1.5 0 0 1 1.5-1.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "mitigation") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M12 4 6 6.8v4.8c0 3.5 2.3 5.6 6 6.8 3.7-1.2 6-3.3 6-6.8V6.8L12 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9.5 12.1 11.3 14l3.2-3.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M8 8h8M8 16h8M6 6h8v4H6zM10 14h8v4h-8z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function RuntimeIcon({ kind }: { kind: RuntimeIconKind }) {
  if (kind === "cohort") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <circle cx="8" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 10.5 11.2 13M14 10.5 12.8 13"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "memory") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <rect
          x="6"
          y="6"
          width="12"
          height="12"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 9.5h6M9 12h6M9 14.5h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "stochastic") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <circle cx="7" cy="16" r="1.6" fill="currentColor" />
        <circle cx="12" cy="11" r="1.6" fill="currentColor" />
        <circle cx="17" cy="8" r="1.6" fill="currentColor" />
        <path
          d="M7 16 12 11 17 8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M6 8h6M6 16h6M12 8l2.5 2.5L12 13M12 16l2.5-2.5L12 11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M18 8h-1M18 16h-1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const contextSources = [
  {
    label: "Uploaded docs",
    kind: "upload" as const,
    tint: "border-[#5b4217] bg-[#231a10] text-[#f0d8b4]",
  },
  {
    label: "Databases",
    kind: "database" as const,
    tint: "border-[#27415c] bg-[#111b28] text-[#a7c8f3]",
  },
  {
    label: "APIs",
    kind: "api" as const,
    tint: "border-[#3c3051] bg-[#17111f] text-[#d6baf0]",
  },
  {
    label: "Employee systems",
    kind: "people" as const,
    tint: "border-[#284232] bg-[#101711] text-[#b9deb9]",
  },
  {
    label: "External links",
    kind: "web" as const,
    tint: "border-[#5c332a] bg-[#221411] text-[#efc0b6]",
  },
];

const reportOutputs = [
  {
    label: "Timelines",
    kind: "timeline" as const,
    tint: "border-[#5b4217] bg-[#231a10] text-[#f0d8b4]",
  },
  {
    label: "Narratives",
    kind: "narrative" as const,
    tint: "border-[#27415c] bg-[#111b28] text-[#a7c8f3]",
  },
  {
    label: "Mitigations",
    kind: "mitigation" as const,
    tint: "border-[#284232] bg-[#101711] text-[#b9deb9]",
  },
  {
    label: "Comparisons",
    kind: "comparison" as const,
    tint: "border-[#3c3051] bg-[#17111f] text-[#d6baf0]",
  },
];

const runtimeCapabilities = [
  {
    label: "Cohort swarms",
    icon: "cohort" as const,
    tint: "border-[#5b4217] bg-[#231a10] text-[#f0d8b4]",
  },
  {
    label: "Persistent memory",
    icon: "memory" as const,
    tint: "border-[#27415c] bg-[#111b28] text-[#a7c8f3]",
  },
  {
    label: "Stochastic runs",
    icon: "stochastic" as const,
    tint: "border-[#3c3051] bg-[#17111f] text-[#d6baf0]",
  },
  {
    label: "Path comparison",
    icon: "paths" as const,
    tint: "border-[#284232] bg-[#101711] text-[#b9deb9]",
  },
];

const pipeline = [
  {
    icon: "ingest" as const,
    title: "Context ingest",
    body: "Connect whatever defines the operating environment: internal systems, databases, APIs, uploaded documents, or live web sources. Afterflow normalizes it, embeds it, and uses it to ground the simulation in company context.",
  },
  {
    icon: "world" as const,
    title: "World builder",
    body: "The world builder maps grounded context into actors, incentives, constraints, and timelines. It is also the layer that can be tuned against historical decisions and incidents over time.",
  },
  {
    icon: "swarm" as const,
    title: "Cohort swarms",
    body: "The planner extrapolates editable cohorts from the world model and instantiates each cohort as a swarm. Every agent carries its own persona, persistent memory, state, and available actions.",
  },
  {
    icon: "orchestrate" as const,
    title: "Decision propagation",
    body: "The orchestrator advances time and routes signals across cohorts. Each decision is tested with multiple stochastic simulations run in parallel, then the outcomes are averaged into a more stable estimate. Cohorts can run on dedicated models when needed.",
  },
];

const deployment = [
  {
    icon: "private" as const,
    tint: "border-[#2a3c33] bg-[#121916] text-[#9ed3ae]",
    title: "Private instance",
    body: "For teams that need stronger isolation, the system can be scoped into a customer-controlled environment instead of a shared deployment.",
  },
  {
    icon: "region" as const,
    tint: "border-[#253545] bg-[#101821] text-[#8fb9ea]",
    title: "In-region processing",
    body: "Model processing and storage can be constrained to the regions an enterprise requires for residency or regulatory reasons.",
  },
  {
    icon: "boundary" as const,
    tint: "border-[#3a2d1e] bg-[#18120d] text-[#e5c483]",
    title: "Customer-owned context",
    body: "Connected systems, embeddings, and simulation state can remain inside the enterprise boundary when the environment calls for it.",
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: howItWorksPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: howItWorksPath,
    images: [ogImagePath],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    images: [ogImagePath],
  },
};

export default function HowItWorksPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteRootUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How Afterflow Works",
        item: howItWorksUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <SiteHeader currentPath={howItWorksPath} />

        <section className="border-b border-black/10 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_410px] lg:items-start">
            <div className="space-y-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
                How Afterflow Works
              </p>
              <h1 className="max-w-5xl text-[clamp(3rem,6.6vw,6.35rem)] font-black leading-[0.92] tracking-[-0.08em] text-black">
                Build the world.
                <span className="block text-black/52">
                  Rehearse the decision.
                </span>
              </h1>
              <p className="max-w-[36.5rem] text-lg leading-8 text-black/60 sm:text-2xl sm:leading-10">
                Most teams can test a response. Afterflow tests how the
                environment around a decision reacts before teams commit.
              </p>
              <div>
                <Link
                  href={requestAccessPath}
                  className="inline-flex min-h-14 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
                >
                  Request Enterprise Access
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-black text-[#f3efe8] shadow-[0_20px_70px_rgba(0,0,0,0.14)] lg:ml-auto lg:w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(241,202,123,0.22),transparent_28%),radial-gradient(circle_at_78%_26%,rgba(115,176,255,0.18),transparent_30%),radial-gradient(circle_at_56%_76%,rgba(172,106,214,0.18),transparent_26%)]" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
              <div className="relative p-4 sm:p-5">
                <div className="space-y-3">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/48">
                        Connected Context
                      </p>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {contextSources.map((item) => (
                        <div
                          key={item.label}
                          className="group relative flex justify-center"
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition duration-200 group-hover:opacity-100 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] ${item.tint}`}
                          >
                            <ContextIcon kind={item.kind} />
                          </div>
                          <div className="pointer-events-none absolute bottom-full mb-2 rounded-full border border-white/10 bg-black/88 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/75 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto h-3 w-px bg-white/10" />

                  <div className="rounded-[28px] border border-white/12 bg-white/6 px-5 py-4 text-center shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:px-6 sm:py-5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/42">
                      Simulation Core
                    </p>
                    <h3 className="mt-3 text-[2.1rem] font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-[2.45rem]">
                      World model
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/56">
                      Actors, constraints, state, and timelines grounded in
                      company context.
                    </p>

                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {runtimeCapabilities.map((item) => (
                        <div
                          key={item.label}
                          className={`flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-center backdrop-blur-sm ${item.tint}`}
                        >
                          <div className="flex shrink-0 items-center justify-center">
                            <RuntimeIcon kind={item.icon} />
                          </div>
                          <p className="whitespace-nowrap text-[12px] font-semibold leading-none tracking-[-0.01em]">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto h-3 w-px bg-white/10" />

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/42">
                        Decision Report
                      </p>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {reportOutputs.map((item) => (
                        <div
                          key={item.label}
                          className="group relative flex justify-center"
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition duration-200 group-hover:opacity-100 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] ${item.tint}`}
                          >
                            <ReportIcon kind={item.kind} />
                          </div>
                          <div className="pointer-events-none absolute bottom-full mb-2 rounded-full border border-white/10 bg-black/88 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/75 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-black/10 py-16 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
            Architecture
          </p>
          <div className="space-y-6">
            <h2 className="max-w-5xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              More than a single agent.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
              Afterflow builds the world model, instantiates stakeholder
              swarms, and simulates how signals propagate before a team
              commits.
            </p>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-20">
          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 lg:grid-cols-2">
            {pipeline.map((item) => (
              <div key={item.title} className="bg-[#ece8e1] p-8 lg:p-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black text-[#f3efe8] shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                  <FeatureIcon kind={item.icon} />
                </div>
                <h3 className="mt-5 max-w-sm text-3xl font-medium leading-tight tracking-[-0.04em] text-black">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-black/56">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-black/10 bg-black px-6 py-16 text-[#f3efe8] sm:px-10 lg:px-12 lg:py-20">
          <div className="space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              Deployment Options
            </p>
            <h2 className="max-w-5xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
              Private deployments
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-white/56 sm:text-2xl sm:leading-10">
              For teams with tighter security or residency requirements,
              Afterflow can be structured around a customer-controlled setup
              rather than a shared environment.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
            {deployment.map((item) => (
              <div key={item.title} className="bg-black p-8 lg:p-10">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border ${item.tint}`}
                >
                  <FeatureIcon kind={item.icon} />
                </div>
                <h3 className="mt-5 max-w-sm text-3xl font-medium leading-tight tracking-[-0.04em] text-white">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/54">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-16 lg:py-20">
          <div className="space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Enterprise Access
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              Start with one real decision.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/56 sm:text-2xl sm:leading-10">
              Founding partners get early access, secure deployment, and direct
              input on the product.
            </p>
          </div>

          <div>
            <Link
              href={requestAccessPath}
              className="flex min-h-16 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
            >
              Request Enterprise Access
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
