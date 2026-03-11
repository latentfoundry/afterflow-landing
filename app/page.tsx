import { ProofPanel } from "./components/proof-panel";

const steps = [
  {
    number: "01",
    title: "Add context sources",
    body: "Ground the simulation in public context, prior incidents, and internal documents.",
  },
  {
    number: "02",
    title: "Preview the decision",
    body: "See live stakeholder reactions, health scores, and likely ripple effects.",
  },
  {
    number: "03",
    title: "Debrief and rerun",
    body: "Get mitigations, compare paths, and rerun as the situation changes.",
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-black/10 pb-4">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-black">
            Afterflow
          </p>
          <a
            href="#request-access"
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/55 transition-colors hover:text-black"
          >
            Request Access
          </a>
        </header>

        <section className="flex min-h-[68vh] flex-col items-center justify-center border-b border-black/10 py-20 text-center lg:min-h-[76vh]">
          <div className="space-y-8">
            <h1 className="text-[clamp(4.5rem,17vw,11rem)] font-black leading-none tracking-[-0.09em]">
              Afterflow
            </h1>
            <p className="mx-auto max-w-4xl text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-5xl">
              Test a critical decision before you make it.
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-black/58 sm:text-xl">
              Simulate how customers, employees, regulators, media, and
              investors may react before you commit to a response.
            </p>
            <div className="flex flex-col items-center">
              <a
                href="#request-access"
                className="inline-flex min-w-60 items-center justify-center bg-black px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
              >
                Request Early Access
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-black/10 py-16 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
            The Problem
          </p>
          <div className="space-y-6">
            <h2 className="max-w-4xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              Companies do not fail from the crisis.
              <span className="block text-black/56">
                They fail from the second decision.
              </span>
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
              In a breach, failed launch, or investigation, every response
              triggers customers, employees, regulators, media, and investors.
              You only get one chance to respond.
            </p>
          </div>
        </section>

        <section className="border-b border-black/10 bg-black px-6 py-16 text-[#f3efe8] sm:px-10 lg:px-12 lg:py-20">
          <div className="space-y-6 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              How It Works
            </p>
            <h2 className="mx-auto max-w-5xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Build the world.
              <span className="block text-white/42">
                Afterflow simulates what follows.
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-white/52 sm:text-2xl sm:leading-10">
              Add context, preview decision paths, and rerun as reality changes.
            </p>
          </div>

          <ProofPanel />

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
              Early Access
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              For crisis, legal, risk, and communications teams.
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-black/56 sm:text-2xl sm:leading-10">
              Founding partners get early access and direct input on the
              product.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="#top"
              className="flex min-h-16 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
            >
              Request Access
            </a>
            <p className="text-center text-sm leading-6 text-black/42">
              Limited early partner slots.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
