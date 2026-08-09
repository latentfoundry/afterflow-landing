const loopSteps = [
  {
    number: "01",
    title: "Map",
    body: "Approved sources become an evidence-linked model of the operation.",
  },
  {
    number: "02",
    title: "Rank",
    body: "Prioritise changes by expected value, evidence and downstream risk.",
  },
  {
    number: "03",
    title: "Simulate",
    body: "Compare rollout paths and interventions before committing.",
  },
  {
    number: "04",
    title: "Compare",
    body: "Seal the expected result, then measure it against production.",
  },
  {
    number: "05",
    title: "Learn",
    body: "Use observed outcomes to improve the next recommendation.",
  },
];

export function ProductLoop() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-[#f4f0e8] px-5 py-24 text-[#11110f] sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <p className="metric pt-2 text-[0.68rem] uppercase tracking-[0.14em] text-black/40">
            How it works
          </p>
          <div data-reveal>
            <h2 className="max-w-[17ch] text-[clamp(3rem,6.2vw,6.8rem)] font-light leading-[0.96] tracking-[-0.04em]">
              A code reviewer for your company.
            </h2>
            <p className="mt-7 max-w-[48rem] text-lg leading-8 text-black/56 sm:text-xl">
              It ranks what to improve next, simulates the downstream effects,
              and learns from what happens.
            </p>
          </div>
        </div>

        <div data-reveal className="product-loop relative mt-20 lg:mt-28">
          <ol className="grid border-t border-black/14 md:grid-cols-5">
            {loopSteps.map((step, index) => (
              <li
                key={step.title}
                className={`loop-step relative border-b border-black/14 py-7 md:min-h-[20rem] md:border-b-0 md:border-r md:px-5 md:py-7 lg:min-h-[22rem] lg:px-7 ${
                  index === 0 ? "md:border-l" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="metric text-[0.65rem] text-black/34">
                    {step.number}
                  </span>
                  <span className="loop-step-signal h-2 w-2 rounded-full border border-black/18" />
                </div>
                <h3 className="mt-10 text-[1.75rem] font-medium tracking-[-0.02em] lg:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-7 text-black/50">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <svg
            aria-hidden="true"
            className="learn-return-path pointer-events-none absolute inset-x-0 -bottom-16 hidden h-24 w-full overflow-visible md:block"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              d="M900 4 C900 88 590 88 300 24 L318 20 M300 24 L313 37"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="mt-6 flex w-full max-w-[32rem] items-start gap-3 text-lg leading-7 text-[#5146b8] sm:text-xl sm:leading-8 md:absolute md:top-full md:right-[64%] md:mt-14 md:translate-x-1/2">
            <span className="mt-0.5 md:hidden">↳</span>
            <span>
              Every rollout sharpens the company brain and surfaces the next
              improvement.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
