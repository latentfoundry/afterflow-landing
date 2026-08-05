import { bookingUrl } from "../../lib/site";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function FinalCta() {
  return (
    <section className="bg-[#11110f] px-5 pb-28 pt-24 text-white sm:px-8 lg:px-12 lg:pb-40 lg:pt-36">
      <div data-reveal className="mx-auto max-w-[94rem] text-center">
        <p className="metric text-[0.65rem] uppercase tracking-[0.14em] text-white/38">
          One initiative
        </p>
        <h2 className="mx-auto mt-7 max-w-[13ch] text-[clamp(3.5rem,7.8vw,8.4rem)] font-light leading-[0.92] tracking-[-0.045em]">
          See what happens before launch.
        </h2>
        <p className="mx-auto mt-7 max-w-[46rem] text-lg leading-8 text-white/56 sm:text-xl">
          Bring one initiative. We build the model and run it with you.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="primary-button primary-button--light group"
          >
            Book a working session
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
