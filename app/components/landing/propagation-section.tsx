const replayEvents = [
  { day: "00", title: "Release gate", state: "complete" },
  { day: "07", title: "Scope applied", state: "complete" },
  { day: "21", title: "Case mix shifts", state: "active" },
  { day: "35", title: "Specialist transfer" },
  { day: "63", title: "Queue stabilises" },
];

const simulatedPath = [
  { label: "Simple enquiries move to self-service", type: "System" },
  { label: "Employee case mix becomes more complex", type: "Cohort" },
  { label: "Specialist queue absorbs more work", type: "Team" },
  { label: "Wait-time risk emerges at peak hours", type: "Outcome" },
];

export function PropagationSection() {
  return (
    <section
      id="why-different"
      className="scroll-mt-20 bg-white px-5 py-24 text-[#11110f] sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <p className="metric pt-2 text-[0.68rem] uppercase tracking-[0.14em] text-black/40">
            Inside an AI rollout
          </p>
          <div data-reveal>
            <h2 className="max-w-[15ch] text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.96] tracking-[-0.04em]">
              AI changes propagate beyond the code.
            </h2>
            <p className="mt-7 max-w-[45rem] text-lg leading-8 text-black/54 sm:text-xl">
              Follow a rollout through the operation and see where an
              intervention changes the outcome.
            </p>
          </div>
        </div>

        <div data-reveal className="mt-16 lg:mt-24">
          <div
            data-nosnippet
            className="propagation-canvas overflow-hidden rounded-[1.1rem] border border-black/8 bg-[#070a12] text-white sm:rounded-[1.35rem]"
          >
            <header className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/18 text-white/56">
                      ↻
                    </span>
                    <span className="metric rounded-full bg-white/8 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.09em] text-white/58">
                      AF-014
                    </span>
                    <span className="text-xs text-white/38">
                      15 events · 15 roles · 90 days
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em]">
                    Run replay
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/48">
                    Follow one simulated Support AI rollout from release gate to
                    operational outcome.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="rounded-lg border border-white/12 bg-white/[0.035] px-3 py-2">
                    <p className="metric text-[0.48rem] uppercase tracking-[0.08em] text-white/28">
                      Scenario
                    </p>
                    <p className="mt-1 text-xs text-white/70">
                      Full release⌄
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-medium text-[#070a12]">
                    <span aria-hidden="true">↔</span> Compare intervention
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="w-14 text-xs text-white/34">Event 7</span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full w-[47%] rounded-full bg-[#8f82ff]" />
                </div>
                <span className="w-14 text-right text-xs text-white/34">
                  of 15
                </span>
              </div>
            </header>

            <div className="grid lg:grid-cols-[13.5rem_minmax(0,1fr)_21rem]">
              <aside className="border-b border-white/10 bg-white/[0.02] lg:border-r lg:border-b-0">
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="metric text-[0.58rem] uppercase tracking-[0.12em] text-white/32">
                    Run events
                  </p>
                </div>
                <ol className="grid grid-cols-2 px-3 py-3 sm:grid-cols-5 lg:block lg:px-0 lg:py-0">
                  {replayEvents.map((event) => (
                    <li
                      key={event.day}
                      className={`border border-transparent px-3 py-3 lg:border-x-0 lg:border-b lg:border-white/8 lg:px-5 lg:py-4 ${
                        event.state === "active"
                          ? "rounded-lg border-white bg-white text-[#070a12] lg:rounded-lg"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            event.state === "active"
                              ? "bg-[#6657dc]"
                              : event.state === "complete"
                                ? "bg-white/34"
                                : "border border-white/24"
                          }`}
                        />
                        <span
                          className={`metric text-[0.52rem] uppercase tracking-[0.09em] ${
                            event.state === "active" ? "text-black/40" : "text-white/30"
                          }`}
                        >
                          Day {event.day}
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-xs leading-4 ${
                          event.state === "active" ? "text-black/76" : "text-white/42"
                        }`}
                      >
                        {event.title}
                      </p>
                    </li>
                  ))}
                </ol>
              </aside>

              <div className="p-5 sm:p-8 lg:p-10 xl:p-12">
                <p className="text-sm text-white/42">
                  Event 7 of 15 · Day 21
                </p>
                <p className="mt-2 text-sm text-white/42">
                  Protected handoff flow
                </p>
                <h3 className="mt-2 max-w-[22ch] text-2xl font-medium leading-9 tracking-[-0.02em] sm:text-3xl">
                  Sensitive work moves to specialists.
                </h3>
                <p className="mt-5 max-w-[42rem] text-sm leading-6 text-white/46 sm:text-base sm:leading-7">
                  Automated triage clears simple enquiries. The remaining case
                  mix concentrates complex work in the assisted queues.
                </p>

                <div className="mt-10 border-t border-white/10 pt-7 sm:mt-12">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="metric text-[0.59rem] uppercase tracking-[0.13em] text-white/32">
                      Simulated rollout path
                    </p>
                    <p className="metric text-[0.54rem] uppercase tracking-[0.1em] text-white/24">
                      Run 04 sealed
                    </p>
                  </div>
                  <ol className="replay-path mt-6">
                    {simulatedPath.map((step, index) => (
                      <li key={step.label} className="replay-path-node">
                        <span className="replay-path-dot" />
                        <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-5">
                          <p className="text-sm leading-6 text-white/72 sm:text-base">
                            {step.label}
                          </p>
                          <span className="metric mt-1 inline-block text-[0.52rem] uppercase tracking-[0.1em] text-[#a99fff] sm:mt-0 sm:pt-1">
                            {step.type}
                          </span>
                        </div>
                        {index < simulatedPath.length - 1 ? (
                          <span className="replay-path-line" />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <aside className="border-t border-white/10 bg-white/[0.025] p-5 sm:p-6 lg:border-t-0 lg:border-l">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-white/38">
                    Agents in this moment
                  </p>
                  <p className="mt-2 text-lg font-medium">3 agents involved</p>
                  <div className="mt-4 flex -space-x-2">
                    {[
                      ["CC", "#e5eff1", "#315b62"],
                      ["SS", "#f0e9ee", "#60475a"],
                      ["RP", "#f1ece5", "#665139"],
                    ].map(([label, background, color]) => (
                      <span
                        key={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#090c14] text-[0.65rem] font-medium"
                        style={{ backgroundColor: background, color }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/38">
                      Evidence used
                    </p>
                    <span className="text-xs text-white/30">2 records</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-sm font-medium leading-5 text-white/72">
                        Support queue history
                      </p>
                      <p className="mt-1 text-xs text-white/36">
                        Operations data · approved
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-sm font-medium leading-5 text-white/72">
                        Protected handoff policy
                      </p>
                      <p className="mt-1 text-xs text-white/36">
                        Policy record · approved
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-white/38">
                    Entities affected
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Specialist queue", "Service target", "Routing policy"].map(
                      (entity) => (
                        <span
                          key={entity}
                          className="rounded-full bg-white/8 px-2.5 py-1.5 text-[0.62rem] text-white/56"
                        >
                          {entity}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-white/38">
                    Intervention tested
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#c0b8ff]">
                    Phase the release by enquiry type.
                  </p>
                  <p className="mt-3 text-xs leading-5 text-white/42">
                    Peak wait-time risk returns inside the service limit.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
