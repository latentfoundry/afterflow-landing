export function ProblemSection() {
  return (
    <section className="bg-[#11110f] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[94rem] gap-14 lg:grid-cols-[1.28fr_0.72fr] lg:items-end lg:gap-20">
        <div data-reveal>
          <p className="metric text-[0.68rem] uppercase tracking-[0.14em] text-white/38">
            The operational gap
          </p>
          <h2 className="mt-6 max-w-[18ch] text-[clamp(2.85rem,5.8vw,6.5rem)] font-light leading-[0.98] tracking-[-0.035em]">
            Most AI transformations stall. Not in the demo. In the operation.
          </h2>
          <p className="mt-8 max-w-[48rem] text-lg leading-8 text-white/58 sm:text-xl">
            A working model still meets queues, policies, and capacity in
            production. Afterflow lets you see that response before launch.
          </p>
        </div>

        <div
          data-reveal
          className="border-t border-white/18 pt-7 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0"
        >
          <p className="metric text-[clamp(5rem,10vw,9rem)] font-medium leading-none tracking-[-0.06em] text-[#8f82ff]">
            39%
          </p>
          <p className="mt-5 max-w-sm text-lg leading-7 text-white/72">
            of organisations report enterprise-level EBIT impact from AI.
          </p>
          <p className="metric mt-4 text-[0.64rem] uppercase tracking-[0.12em] text-white/36">
            McKinsey · State of AI 2025
          </p>
        </div>
      </div>
    </section>
  );
}
