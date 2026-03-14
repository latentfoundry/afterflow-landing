import Link from "next/link";
import { ProofPanelShell } from "./components/proof-panel-shell";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { howItWorksPath, requestAccessPath, siteRootPath } from "./lib/site";

const steps = [
  {
    number: "01",
    title: "Model the context",
    body: "Ground the simulation in the situation, the history, and the constraints that matter.",
  },
  {
    number: "02",
    title: "Run the decision",
    body: "Test a path and see likely reactions, tradeoffs, and second-order effects.",
  },
  {
    number: "03",
    title: "Compare the paths",
    body: "Adjust the inputs, compare outcomes, and rerun as the situation changes.",
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
              AI Decision Simulation Platform
            </p>
            <p
              aria-hidden="true"
              className="text-[clamp(4.5rem,17vw,11rem)] font-black leading-none tracking-[-0.09em]"
            >
              Afterflow
            </p>
            <h1 className="mx-auto max-w-4xl text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-5xl">
              Test critical decisions before you make them.
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-black/58 sm:text-xl">
              See how customers, teams, and regulators may respond to
              high-stakes decisions before you commit.
            </p>
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
            The Problem
          </p>
          <div className="space-y-6">
            <h2 className="max-w-4xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              The event is not the hard part.
              <span className="block text-black/56">
                The next decision is.
              </span>
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
              In launches, outages, and policy changes, the first-order impact
              is obvious. Afterflow helps teams see the second-order effects
              before they commit.
            </p>
          </div>
        </section>

        <section className="border-b border-black/10 bg-black px-6 py-16 text-[#f3efe8] sm:px-10 lg:px-12 lg:py-20">
          <div className="space-y-6 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              How It Works
            </p>
            <h2 className="mx-auto max-w-5xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Model the situation.
              <span className="block text-white/42">
                See what happens next.
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/52 sm:text-2xl sm:leading-10">
              Afterflow turns your context into a simulation you can test,
              compare, and rerun.
            </p>
            <div className="flex justify-center">
              <Link
                href={howItWorksPath}
                className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/68 transition-colors hover:text-white"
              >
                See how Afterflow works
              </Link>
            </div>
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
    </div>
  );
}
