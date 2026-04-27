import Link from "next/link";
import { InsightCarousel } from "./components/insight-carousel";
import { ProofPanelShell } from "./components/proof-panel-shell";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import {
  howItWorksPath,
  requestAccessPath,
  siteRootPath,
  useCasesPath,
} from "./lib/site";

const steps = [
  {
    number: "01",
    title: "Connect context",
    body: "Plans, systems, owners, and constraints.",
  },
  {
    number: "02",
    title: "Model the rollout",
    body: "A working map of dependencies and fallback paths.",
  },
  {
    number: "03",
    title: "Rank the paths",
    body: "See failure paths, evidence, and mitigations.",
  },
];

const exampleDecisions = [
  "Platform migration",
  "AI rollout",
  "Policy rollout",
  "Vendor migration",
  "Incident response",
];

const decisionScenarios = [
  {
    title: "Platform migrations",
    body: "Find access failures, rollback gaps, and overloaded fallback teams before cutover.",
  },
  {
    title: "AI rollout risk",
    body: "Pressure-test governance, controls, adoption paths, and operational ownership before deployment.",
  },
  {
    title: "Policy rollouts",
    body: "See where a new process creates second-order effects across teams, customers, and controls.",
  },
  {
    title: "Vendor migrations",
    body: "Map handoffs, ownership gaps, fallback paths, and service risk before switching systems.",
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <SiteHeader currentPath={siteRootPath} />

        <section className="flex min-h-[68vh] flex-col items-center justify-center border-b border-black/10 py-20 text-center lg:min-h-[76vh]">
          <div className="space-y-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Operational Decision Simulation
            </p>
            <p
              aria-hidden="true"
              className="text-[clamp(4.5rem,17vw,11rem)] font-black leading-none tracking-[-0.09em]"
            >
              Afterflow
            </p>
            <h1 className="mx-auto max-w-4xl text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-5xl">
              Dry-run critical rollouts before they go live.
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-black/58 sm:text-xl">
              Afterflow shows the second-order effects of critical rollouts
              before production does.
            </p>
            <div className="mx-auto w-full max-w-[30rem]">
              <div className="hero-decision-pill rounded-full border px-5 py-3 text-black/60 shadow-[0_16px_34px_rgba(0,0,0,0.06)]">
                <p className="sr-only">
                  Example rollouts include platform migrations, AI rollouts,
                  policy rollouts, vendor migrations, and incident response.
                </p>
                <div
                  aria-hidden="true"
                  className="hero-decision-rotator relative mx-auto flex h-[1.2em] max-w-[24rem] items-center justify-center overflow-hidden text-center text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px]"
                >
                  {exampleDecisions.map((decision, index) => (
                    <span
                      key={decision}
                      className="hero-decision-rotator-item absolute inset-x-0 flex items-center justify-center whitespace-nowrap"
                      style={{ animationDelay: `${index * 2.8}s` }}
                    >
                      {decision}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Link
                href={requestAccessPath}
                className="inline-flex min-w-60 items-center justify-center bg-black px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
              >
                Request Enterprise Access
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-black/10 py-16 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
            Use Cases
          </p>
          <div className="space-y-8">
            <div className="space-y-5">
              <h2 className="max-w-4xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
                Critical changes teams dry-run with Afterflow.
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
                Pressure-test major operational changes before they become
                production, customer, or regulatory reality.
              </p>
            </div>

            <div className="w-full max-w-[44rem]">
              <InsightCarousel label="Example Range" items={decisionScenarios} />
            </div>

            <div>
              <Link
                href={useCasesPath}
                className="inline-flex min-h-12 items-center justify-center bg-black px-5 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-colors hover:bg-black/88"
              >
                See all use cases
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-black/10 py-16 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
            Why It Matters
          </p>
          <div className="space-y-6">
            <h2 className="max-w-4xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              Plans look fine in review.
              <span className="block text-black/56">
                Production finds the hidden dependencies.
              </span>
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
              Afterflow moves that discovery earlier, before teams are forced
              into war rooms, escalations, and reactive fixes.
            </p>
          </div>
        </section>

        <section className="border-b border-black/10 bg-black px-6 py-16 text-[#f3efe8] sm:px-10 lg:px-12 lg:py-20">
          <div className="space-y-6 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              How It Works
            </p>
            <h2 className="mx-auto max-w-5xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Give us the context.
              <span className="block text-white/42">
                See what breaks next.
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/52 sm:text-2xl sm:leading-10">
              Afterflow turns operating context into ranked failure paths,
              evidence, and mitigations.
            </p>
            <div className="flex justify-center">
              <Link
                href={howItWorksPath}
                className="inline-flex min-h-12 items-center justify-center bg-white px-5 text-[11px] font-medium uppercase tracking-[0.24em] text-black transition-opacity hover:opacity-80"
              >
                See how Afterflow works
              </Link>
            </div>
            <p className="mx-auto max-w-3xl text-sm leading-7 text-white/40 sm:text-base">
              Outputs include dependency graphs, launch checkpoints, evidence
              strength, and path comparison.
            </p>
          </div>

          <div data-nosnippet>
            <ProofPanelShell />
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="bg-black p-8 lg:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/35">
                  Step {step.number}
                </p>
                <h3 className="mt-6 max-w-xs text-3xl font-medium leading-tight tracking-[-0.04em] text-white">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-sm text-base leading-7 text-white/50">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="request-access"
          className="grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-16 lg:py-20"
        >
          <div className="space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Enterprise Access
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              Start with one real decision.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/56 sm:text-2xl sm:leading-10">
              Founding partners get early access, secure deployment, and
              direct input on the product.
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
    </div>
  );
}
