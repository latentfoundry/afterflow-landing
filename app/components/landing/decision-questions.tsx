export function DecisionQuestions() {
  return (
    <section
      id="decision-questions"
      className="scroll-mt-24 bg-[#f7f6f2] px-5 py-20 text-black sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[94rem] gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-medium uppercase text-black/44">
            Built for real decisions
          </p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,4.9vw,5.2rem)] font-light leading-[1.05]">
            Ask the question before the rollout asks it for you.
          </h2>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden rounded-[1.8rem] bg-[#eef1f4] shadow-[0_24px_80px_rgba(0,0,0,0.05)] sm:min-h-[32rem] lg:min-h-[42rem]">
          <video
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/decision.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
