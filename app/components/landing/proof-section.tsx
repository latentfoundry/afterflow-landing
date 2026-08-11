const proofSteps = [
  {
    number: "01",
    title: "Snapshot",
    body: "Fix the evidence and operational state at the rollout cutoff.",
  },
  {
    number: "02",
    title: "Hold",
    body: "Keep the later outcome out of the simulation.",
  },
  {
    number: "03",
    title: "Simulate",
    body: "Run the rollout and seal its path before action.",
  },
  {
    number: "04",
    title: "Compare",
    body: "Compare the run with the observed outcome using the same rubric.",
  },
];

const securityItems = [
  "Read-only connectors",
  "Existing permissions respected",
  "Runs in your VPC",
  "Evidence lineage on every claim",
  "Your team makes the final call",
];

function LockSeal() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 22 22"
      className="h-4 w-4"
      fill="none"
    >
      <rect x="4.5" y="9.5" width="13" height="9" rx="2" stroke="currentColor" />
      <path d="M7.5 9.5V7a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" />
    </svg>
  );
}

export function ProofSection() {
  return (
    <section
      id="proof"
      className="scroll-mt-20 bg-[#f4f0e8] px-5 py-24 text-[#11110f] sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <p className="metric pt-2 text-[0.68rem] uppercase tracking-[0.14em] text-black/40">
            Proof
          </p>
          <div data-reveal>
            <h2 className="max-w-[14ch] text-[clamp(3rem,6.2vw,6.8rem)] font-light leading-[0.96] tracking-[-0.04em]">
              Simulations you can check.
            </h2>
            <p className="mt-7 max-w-[44rem] text-lg leading-8 text-black/54 sm:text-xl">
              Every simulation is grounded in approved company evidence, sealed
              before launch, and compared with what happens.
            </p>
          </div>
        </div>

        <ol data-reveal className="proof-track mt-16 grid border-y border-black/14 md:grid-cols-4 lg:mt-24">
          {proofSteps.map((step, index) => (
            <li
              key={step.title}
              className={`proof-step relative min-h-[15rem] py-7 md:border-r md:px-6 lg:min-h-[18rem] lg:px-8 ${
                index === 0 ? "md:border-l" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="metric text-[0.65rem] text-black/34">
                  {step.number}
                </span>
                {step.title === "Simulate" ? (
                  <span className="proof-lock flex h-8 w-8 items-center justify-center rounded-full bg-[#e8e4ff] text-[#5146b8]">
                    <LockSeal />
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-black/18" />
                )}
              </div>
              <h3 className="mt-12 text-3xl font-medium tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-base leading-7 text-black/50">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div
          data-reveal
          className="mt-16 grid gap-7 border-b border-black/14 pb-16 lg:mt-20 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16 lg:pb-20"
        >
          <p className="metric text-[0.68rem] uppercase tracking-[0.14em] text-black/40">
            Backtested
          </p>
          <div className="max-w-[57rem]">
            <p className="text-xl font-light leading-8 tracking-[-0.01em] text-black/70 sm:text-2xl sm:leading-9">
              Afterflow reconstructed a real, documented enterprise failure
              blind against a sealed answer key. It returned the same ranked
              causal path on every run, with each step tied to source evidence,
              and scored{" "}
              <strong className="font-medium text-black/86">
                almost 50% higher than the best-performing alternative.
              </strong>
            </p>
          </div>
        </div>

        <div data-reveal className="mt-12 lg:mt-14">
          <p className="metric text-[0.67rem] uppercase tracking-[0.14em] text-black/40">
            Security by design
          </p>
          <ul className="security-strip mt-6 flex flex-wrap border-y border-black/14">
            {securityItems.map((item) => (
              <li
                key={item}
                className="metric flex min-h-14 items-center border-b border-black/10 pr-5 text-[0.62rem] uppercase tracking-[0.09em] text-black/52 last:border-b-0 sm:border-b-0 sm:after:ml-5 sm:after:h-1 sm:after:w-1 sm:after:rounded-full sm:after:bg-[#6657dc] sm:last:after:hidden"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
