import Link from "next/link";
import { requestAccessPath } from "../../lib/site";

export function FinalCta() {
  return (
    <section className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[94rem]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[clamp(3.2rem,7vw,7.4rem)] font-light leading-[1.02]">
            Start with one scenario.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-black/58">
            Choose the decision, outcome, owner, and time window. Afterflow
            structures the context and runs the simulation.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href={requestAccessPath}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/82"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
