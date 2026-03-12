import Link from "next/link";
import { RequestAccessFormInner } from "../components/request-access-form";

export default function RequestAccessPage() {
  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-black/10 pb-4">
          <Link
            href="/"
            className="text-sm font-medium uppercase tracking-[0.28em] text-black"
          >
            Afterflow
          </Link>
          <Link
            href="/"
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/55 transition-colors hover:text-black"
          >
            Back
          </Link>
        </header>

        <section className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:py-20">
          <div className="space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Enterprise Access
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
              Request access without filling out a wall of text.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/56 sm:text-2xl sm:leading-10">
              We only ask for enough information to know how to contact you back.
              The rest is optional.
            </p>
            <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:max-w-3xl sm:grid-cols-3">
              <div className="bg-[#e7e3dd] p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35">
                  One required field
                </p>
                <p className="mt-3 text-lg font-medium leading-6 tracking-[-0.03em] text-black">
                  Work email
                </p>
              </div>
              <div className="bg-[#e7e3dd] p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35">
                  Optional context
                </p>
                <p className="mt-3 text-lg font-medium leading-6 tracking-[-0.03em] text-black">
                  Name, company, team, note
                </p>
              </div>
              <div className="bg-[#e7e3dd] p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35">
                  No sensitive detail
                </p>
                <p className="mt-3 text-lg font-medium leading-6 tracking-[-0.03em] text-black">
                  Keep it high-level
                </p>
              </div>
            </div>
          </div>

          <RequestAccessFormInner source="request-access-page" />
        </section>
      </main>
    </div>
  );
}
