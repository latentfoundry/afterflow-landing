import type { Metadata } from "next";
import Link from "next/link";
import {
  howItWorksPath,
  ogImagePath,
  requestAccessPath,
  siteRootUrl,
  useCasesPath,
  useCasesUrl,
} from "../lib/site";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const pageTitle = "Use Cases | Dry-run Operational Decisions";
const pageDescription =
  "Use cases for dry-running bounded operational decisions, from platform transitions and policy rollouts to supply posture and incident response.";

type UseCaseIconKind =
  | "incident"
  | "launch"
  | "policy"
  | "market"
  | "operations";

function UseCaseIcon({ kind }: { kind: UseCaseIconKind }) {
  if (kind === "incident") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M12 4.5 19 18H5L12 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M12 9v4.2M12 16.1h.01"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "launch") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M13.5 5.5c3 1.2 4.8 4 5 7.5-3.5.2-6.3 2-7.5 5-1.8-2.6-2.1-6-.7-9.1.7-1.5 1.8-2.6 3.2-3.4Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M7 17c.2-1.6.9-2.9 2-4M6 19h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "policy") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M8 5.5h6l3 3V18.5H8z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M14 5.5v3h3M10.5 12h4.5M10.5 15h4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "market") {
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

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M6 7h12M6 12h12M6 17h8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M17 15.5 19.5 18 22 13.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const useCases = [
  {
    icon: "launch" as const,
    tint: "border-[#5b4217] bg-[#231a10] text-[#f0d8b4]",
    title: "Change events",
    body: "Planned changes where hidden dependencies can surface after launch.",
    examples: [
      "Platform migrations",
      "AI rollout risk",
      "Policy rollouts",
      "Customer-impacting changes",
    ],
  },
  {
    icon: "market" as const,
    tint: "border-[#27415c] bg-[#111b28] text-[#a7c8f3]",
    title: "Operational posture",
    body: "Recurring operating choices where capacity, supply, and dependency exposure matter.",
    examples: [
      "Vendor and system migrations",
      "Supply exposure",
      "Capacity allocation",
    ],
  },
  {
    icon: "incident" as const,
    tint: "border-[#4b2630] bg-[#1d1015] text-[#f1b6c5]",
    title: "Reactive decisions",
    body: "Time-sensitive choices made when an issue is already creating pressure.",
    examples: [
      "Incident response decisions",
      "Rollback decisions",
      "Customer communication",
    ],
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: useCasesPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: useCasesPath,
    images: [ogImagePath],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    images: [ogImagePath],
  },
};

export default function UseCasesPage() {
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
        name: "Use Cases",
        item: useCasesUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <SiteHeader currentPath={useCasesPath} />

        <section className="border-b border-black/10 py-16 lg:py-20">
          <div className="max-w-5xl space-y-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Use Cases
            </p>
            <h1 className="text-[clamp(3rem,7vw,6.2rem)] font-black leading-[0.92] tracking-[-0.08em]">
              Scenarios teams dry-run with Afterflow.
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
              Start with a real decision, a clear owner, and a time window.
              Afterflow helps teams compare plausible paths before they commit.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={requestAccessPath}
                className="inline-flex min-h-14 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
              >
                Request Access
              </Link>
              <Link
                href={howItWorksPath}
                className="inline-flex min-h-14 items-center justify-center border border-black/10 px-6 text-sm font-medium uppercase tracking-[0.18em] text-black/66 transition-colors hover:border-black/20 hover:text-black"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-20">
          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden bg-black p-8 text-[#f3efe8] lg:p-10"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(241,202,123,0.12),transparent_22%),radial-gradient(circle_at_78%_24%,rgba(115,176,255,0.1),transparent_24%),radial-gradient(circle_at_56%_84%,rgba(172,106,214,0.12),transparent_20%)]" />
                <div className="absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${item.tint}`}>
                    <UseCaseIcon kind={item.icon} />
                  </div>
                  <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.04em] text-white">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/56">
                    {item.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/58"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-black/10 py-16 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
            Outputs
          </p>
          <div className="space-y-6">
            <h2 className="max-w-4xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              Teams see more than a risk list.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
              They get ranked failure paths, stakeholder maps, evidence,
              missing context, leading indicators, branch comparisons, and
              actions to consider.
            </p>
          </div>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-16 lg:py-20">
          <div className="space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Request Access
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              Start with one real decision.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/56 sm:text-2xl sm:leading-10">
              Choose one decision where context is scattered and the downside
              of being wrong is material.
            </p>
          </div>

          <div>
            <Link
              href={requestAccessPath}
              className="flex min-h-16 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
            >
              Request Access
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
