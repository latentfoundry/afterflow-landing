"use client";

import { useEffect, useState } from "react";
import { bookingUrl } from "../../lib/site";
import { AfterflowMark } from "../site-logo";

const stages = [
  { label: "Brain", detail: "Map the operation" },
  { label: "Opportunities", detail: "Choose what to change" },
  { label: "Change", detail: "Define the rollout" },
  { label: "Prove", detail: "Simulate the change" },
  { label: "Monitor", detail: "Compare and learn" },
] as const;

const stageStatuses = [
  "Brain synced",
  "Refreshed 4m ago",
  "CR-014 drafted",
  "Forecast sealed",
  "Production day 28",
] as const;

const modelNodes = [
  { label: "Support", x: 105, y: 80, r: 27, fill: "#f0e9ee" },
  { label: "Customers", x: 82, y: 215, r: 30, fill: "#e5eff1" },
  { label: "Routing", x: 235, y: 255, r: 27, fill: "#f1ece5" },
  { label: "AI rollout", x: 275, y: 145, r: 35, fill: "#11110f", active: true },
  { label: "Platform", x: 430, y: 74, r: 29, fill: "#e7edf2" },
  { label: "Specialists", x: 468, y: 205, r: 32, fill: "#efebf4" },
  { label: "Service", x: 390, y: 286, r: 27, fill: "#edefe6" },
];

const modelLinks = [
  [0, 3],
  [1, 3],
  [2, 3],
  [4, 3],
  [3, 5],
  [3, 6],
  [5, 6],
] as const;

const opportunities = [
  {
    title: "Release Support AI beyond UAT",
    value: "$0.5m–$0.9m",
    effort: "Ready to review",
    evidence: "Strong evidence",
    source: "Afterflow",
  },
  {
    title: "Payment exception routing",
    value: "$760k",
    effort: "Low effort",
    evidence: "High evidence",
    source: "Your team",
  },
  {
    title: "Merchant onboarding review",
    value: "$420k",
    effort: "Medium effort",
    evidence: "Medium evidence",
    source: "Afterflow",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
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

function ModelScreen() {
  return (
    <div className="grid min-h-[25rem] md:grid-cols-[minmax(0,1fr)_14rem]">
      <div className="relative min-h-[21rem] overflow-hidden bg-[#fafafa] md:min-h-[25rem]">
        <svg
          role="img"
          aria-label="Operational model connecting an AI rollout to teams, customers, systems, and outcomes."
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 560 350"
        >
          <defs>
            <pattern id="model-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="rgba(17,17,15,0.045)" />
            </pattern>
          </defs>
          <rect width="560" height="350" fill="url(#model-grid)" />
          {modelLinks.map(([from, to], index) => (
            <line
              key={`${from}-${to}`}
              className="hero-model-link"
              x1={modelNodes[from].x}
              y1={modelNodes[from].y}
              x2={modelNodes[to].x}
              y2={modelNodes[to].y}
              stroke={index > 4 ? "#6657dc" : "#11110f"}
              strokeDasharray={index > 4 ? "5 6" : undefined}
              strokeOpacity={index > 4 ? 0.62 : 0.22}
              strokeWidth="1.25"
            />
          ))}
          {modelNodes.map((node) => (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 4}
                fill="#fff"
                stroke={node.active ? "#6657dc" : "rgba(17,17,15,0.08)"}
                strokeWidth={node.active ? 2 : 1}
              />
              <circle cx={node.x} cy={node.y} r={node.r} fill={node.fill} />
              <text
                x={node.x}
                y={node.y + 3}
                textAnchor="middle"
                fill={node.active ? "#fff" : "rgba(17,17,15,.62)"}
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="9"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
        <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-lg border border-black/8 bg-white/92 px-3 py-2 shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6657dc]" />
          <p className="truncate text-[0.68rem] text-black/58 sm:text-xs">
            What could block the Support AI rollout?
          </p>
        </div>
      </div>
      <aside className="border-t border-black/8 bg-white p-5 md:border-t-0 md:border-l">
        <p className="metric text-[0.52rem] uppercase tracking-[0.11em] text-black/34">
          Operational context
        </p>
        <h3 className="mt-3 text-base font-medium text-black/74">Asterline Payments</h3>
        <p className="mt-2 text-xs leading-5 text-black/42">
          A date-locked, read-only model assembled from approved sources.
        </p>
        <dl className="mt-6 space-y-4 border-t border-black/8 pt-5">
          {[
            ["218", "objects"],
            ["9", "connected sources"],
            ["226", "observed links"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-black/42">{label}</dt>
              <dd className="metric text-sm text-black/70">{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}

function OpportunityScreen() {
  return (
    <div className="grid min-h-[25rem] md:grid-cols-[minmax(0,1fr)_14rem]">
      <div className="bg-[#fafafa] p-4 sm:p-6">
        <div className="flex items-end justify-between gap-4 border-b border-black/8 pb-3">
          <div>
            <p className="metric text-[0.5rem] uppercase tracking-[0.1em] text-black/34">
              Opportunity queue
            </p>
            <h3 className="mt-2 text-lg font-medium text-black/76">Where to focus next</h3>
          </div>
          <p className="metric text-[0.5rem] uppercase tracking-[0.1em] text-black/30">
            12 ranked
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-black/8 bg-white px-3 py-2.5">
          <p className="truncate text-xs text-black/38">
            Initiative already on your roadmap?
          </p>
          <span className="metric shrink-0 rounded-md bg-[#11110f] px-2.5 py-1.5 text-[0.48rem] uppercase tracking-[0.07em] text-white/82">
            + Add initiative
          </span>
        </div>
        <ol className="divide-y divide-black/8">
          {opportunities.map((opportunity, index) => (
            <li
              key={opportunity.title}
              className={`hero-opportunity-row grid grid-cols-[1fr_auto] gap-3 px-2 py-3.5 sm:grid-cols-[2rem_1fr_auto] sm:px-3 ${
                index === 0 ? "is-selected" : ""
              }`}
            >
              <span className="metric hidden text-[0.56rem] text-black/28 sm:block">
                0{index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-black/72 sm:text-base">
                  {opportunity.title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`metric rounded-full px-2 py-1 text-[0.43rem] uppercase tracking-[0.07em] ${
                      opportunity.source === "Your team"
                        ? "bg-[#e8e4ff] text-[#5146b8]"
                        : "bg-black/[0.045] text-black/38"
                    }`}
                  >
                    {opportunity.source}
                  </span>
                  <span className="metric text-[0.44rem] uppercase tracking-[0.07em] text-black/30">
                    {opportunity.effort} · {opportunity.evidence}
                  </span>
                </div>
              </div>
              <p className="metric text-right text-sm text-black/68 sm:text-base">
                {opportunity.value}
                <span className="mt-1 block text-[0.46rem] uppercase tracking-[0.08em] text-black/28">
                  modelled value
                </span>
              </p>
            </li>
          ))}
        </ol>
      </div>
      <aside className="border-t border-black/8 bg-white p-5 md:border-t-0 md:border-l">
        <p className="metric text-[0.52rem] uppercase tracking-[0.11em] text-black/34">
          Selected
        </p>
        <h3 className="mt-3 text-base font-medium text-black/74">
          Release Support AI beyond UAT
        </h3>
        <p className="mt-2 text-xs leading-5 text-black/42">
          Strong evidence. The rollout can pause.
        </p>
        <div className="mt-6 border-t border-black/8 pt-5">
          <p className="metric text-[0.49rem] uppercase tracking-[0.1em] text-black/30">
            Review signal
          </p>
          <ul className="mt-3 space-y-3 text-xs text-black/52">
            <li>32-day payback</li>
            <li>Routing and policy change</li>
            <li>7-day staged release</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function ProveScreen() {
  return (
    <div className="grid min-h-[25rem] bg-[#090c14] text-white md:grid-cols-[minmax(0,1fr)_14rem]">
      <div>
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <p className="flex items-center gap-2 text-sm font-medium text-white/76">
            <span className="h-2 w-2 rounded-full bg-[#27a866]" />
            Prove run · 90-day staged release
          </p>
          <span className="metric rounded-full bg-white/8 px-2.5 py-1.5 text-[0.48rem] uppercase tracking-[0.08em] text-white/46">
            CR-014
          </span>
        </div>
        <div className="hero-prove-terminal p-5 font-mono text-[0.68rem] leading-6 text-white/72 sm:p-7 sm:text-xs">
          <p className="text-white/34">$ afterflow prove --change CR-014 --horizon 90d</p>
          <p>✓ Locked Brain snapshot · 25 Jul 2026</p>
          <p>✓ Loaded support-ai-release · tests and rollout policy</p>
          <p>→ Solving schedules, queues, capacity and value</p>
          <p>→ Replaying 2,400 customer journeys across 50 seeds</p>
          <p>✓ Protected transitions reached a specialist</p>
          <p className="mt-2 text-[#44bf7b]">PASS · safe to stage inside the tested boundary</p>
        </div>
      </div>
      <aside className="border-t border-white/10 bg-white/[0.035] p-5 md:border-t-0 md:border-l">
        <p className="metric text-[0.52rem] uppercase tracking-[0.11em] text-white/30">
          Results
        </p>
        <h3 className="mt-3 text-base font-medium text-white/78">Safe to stage</h3>
        <p className="mt-2 text-xs leading-5 text-white/38">
          The rollout stays inside capacity and service limits.
        </p>
        <dl className="mt-6 space-y-4 border-t border-white/10 pt-5">
          {[
            ["90-day net value", "$0.5m–$0.9m"],
            ["Resolved after 7d", "86–94%"],
            ["Protected routed", "95–100%"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-3">
              <dt className="text-xs text-white/36">{label}</dt>
              <dd className="metric text-sm text-white/68">{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}

function ChangeScreen() {
  return (
    <div className="grid min-h-[25rem] md:grid-cols-[11rem_minmax(0,1fr)]">
      <aside className="border-b border-black/8 bg-[#f7f7f6] p-3 md:border-r md:border-b-0">
        <ol className="grid grid-cols-4 gap-1 md:block">
          {[
            ["The change", "Active"],
            ["POC repo", "Linked"],
            ["Prove", "Ready"],
            ["Ship", "Waiting"],
          ].map(([label, state], index) => (
            <li
              key={label}
              className={`rounded-lg px-2 py-3 md:px-3 ${index === 0 ? "bg-white shadow-sm" : ""}`}
            >
              <div className="flex items-center gap-2">
                <span className="metric flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[0.46rem] text-black/42">
                  {index + 1}
                </span>
                <span className="truncate text-[0.62rem] font-medium text-black/58 sm:text-xs">
                  {label}
                </span>
              </div>
              <p className="metric mt-1 hidden pl-7 text-[0.43rem] uppercase tracking-[0.08em] text-black/26 md:block">
                {state}
              </p>
            </li>
          ))}
        </ol>
      </aside>

      <div className="bg-[#fafafa] p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-black/8 pb-4">
          <div>
            <p className="metric text-[0.5rem] uppercase tracking-[0.1em] text-black/34">
              CR-014 · Proposed by Afterflow
            </p>
            <h3 className="mt-2 text-lg font-medium text-black/76">
              Stage the Support AI production release
            </h3>
          </div>
          <span className="metric rounded-full bg-[#eef5ef] px-2.5 py-1.5 text-[0.46rem] uppercase tracking-[0.08em] text-[#456b51]">
            Ready to prove
          </span>
        </div>

        <p className="mt-4 text-xs leading-5 text-black/42">
          Move the approved build into a staged release with protected requests kept in human review.
        </p>

        <div className="mt-5 overflow-hidden rounded-lg border border-black/8 bg-white">
          <p className="border-b border-black/8 px-4 py-3 text-sm font-medium text-black/68">
            Operating diff
          </p>
          <div className="grid sm:grid-cols-2">
            <div className="p-4 sm:border-r sm:border-black/8">
              <p className="metric flex items-center gap-2 text-[0.48rem] uppercase tracking-[0.09em] text-black/42">
                <span aria-hidden="true" className="text-sm leading-none text-[#db4b4b]">
                  −
                </span>
                <span>Current operation</span>
              </p>
              <ul className="mt-3 space-y-3 text-xs leading-5 text-black/50">
                <li>Support AI remains limited to UAT</li>
                <li>Requests are classified once</li>
                <li>Production stays on the human path</li>
              </ul>
            </div>
            <div className="border-t border-black/8 bg-[#f8fbf8] p-4 sm:border-t-0">
              <p className="metric flex items-center gap-2 text-[0.48rem] uppercase tracking-[0.09em] text-black/42">
                <span aria-hidden="true" className="text-sm leading-none text-[#269653]">
                  +
                </span>
                <span>Proposed operation</span>
              </p>
              <ul className="mt-3 space-y-3 text-xs leading-5 text-black/56">
                <li>Release seven understood enquiry types</li>
                <li>Reclassify when new information arrives</li>
                <li>Route protected cases to specialists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonitorScreen() {
  return (
    <div className="grid min-h-[25rem] md:grid-cols-[minmax(0,1fr)_14rem]">
      <div className="bg-[#fafafa] p-4 sm:p-6">
        <div className="flex items-end justify-between gap-4 border-b border-black/8 pb-4">
          <div>
            <p className="metric text-[0.5rem] uppercase tracking-[0.1em] text-black/34">
              Production · Day 28 of 90
            </p>
            <h3 className="mt-2 text-lg font-medium text-black/76">
              Stage the Support AI production release
            </h3>
          </div>
          <span className="metric flex items-center gap-2 text-[0.48rem] uppercase tracking-[0.08em] text-[#456b51]">
            <span className="hero-monitor-pulse h-1.5 w-1.5 rounded-full bg-[#73b58a]" />
            Monitoring
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem_4.25rem] gap-2 border-b border-black/8 pb-2 metric text-[0.45rem] uppercase tracking-[0.07em] text-black/28 sm:grid-cols-[minmax(0,1fr)_5rem_5rem_4.5rem]">
          <span>Metric</span>
          <span className="text-right">Sealed</span>
          <span className="text-right">Production</span>
          <span className="text-right">Result</span>
        </div>
        <dl className="divide-y divide-black/8">
          {[
            ["Net value · day 28", "$0.17m", "$0.16m", "In band"],
            ["Resolved after 7 days", "91%", "88%", "In band"],
            ["Conversations change reason", "14.2%", "15.1%", "Variance"],
          ].map(([label, sealed, production, result]) => (
            <div
              key={label}
              className="grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem_4.25rem] items-center gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_5rem_5rem_4.5rem]"
            >
              <dt className="text-[0.65rem] leading-4 text-black/52 sm:text-xs">{label}</dt>
              <dd className="metric text-right text-[0.58rem] text-black/38 sm:text-xs">{sealed}</dd>
              <dd className="metric text-right text-[0.58rem] text-black/68 sm:text-xs">{production}</dd>
              <dd
                className={`metric text-right text-[0.46rem] uppercase tracking-[0.05em] ${
                  result === "Variance" ? "text-[#a46b10]" : "text-[#28734a]"
                }`}
              >
                {result}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className="border-t border-black/8 bg-white p-5 md:border-t-0 md:border-l">
        <p className="metric text-[0.52rem] uppercase tracking-[0.11em] text-black/34">
          Brain update
        </p>
        <h3 className="metric mt-3 text-xl font-medium text-black/74">
          14.2% → 15.1%
        </h3>
        <p className="mt-2 text-xs leading-5 text-black/42">
          Customer-journey transition baseline.
        </p>
        <p className="metric mt-5 inline-flex rounded-full bg-[#fff4dd] px-2.5 py-1.5 text-[0.46rem] uppercase tracking-[0.07em] text-[#98640f]">
          Ready to update
        </p>
        <p className="mt-6 border-t border-black/8 pt-5 text-xs leading-5 text-black/42">
          Production monitor → observed transitions → Brain relationship
        </p>
        <p className="metric mt-5 text-[0.48rem] uppercase tracking-[0.09em] text-[#5146b8]">
          v1.43 · surfaces the next opportunity
        </p>
      </aside>
    </div>
  );
}

const screens = [
  ModelScreen,
  OpportunityScreen,
  ChangeScreen,
  ProveScreen,
  MonitorScreen,
];

function HeroProduct() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(
      () => setActiveStage((activeStage + 1) % stages.length),
      3600,
    );
    return () => window.clearTimeout(timer);
  }, [activeStage]);

  const ActiveScreen = screens[activeStage];

  return (
    <div className="hero-product-wrap">
      <div className="hero-product-window" data-nosnippet>
        <div className="border-b border-black/8 bg-white px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#11110f] text-white">
                <AfterflowMark className="h-3.5 w-auto" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-black/76">Asterline Payments</p>
                <p className="metric mt-0.5 text-[0.46rem] uppercase tracking-[0.09em] text-black/30">
                  Support operation
                </p>
              </div>
            </div>
            <span className="metric rounded-full bg-[#eef5ef] px-2.5 py-1.5 text-[0.47rem] uppercase tracking-[0.08em] text-[#456b51]">
              {stageStatuses[activeStage]}
            </span>
          </div>
          <div role="tablist" aria-label="Asterline simulation workflow" className="grid grid-cols-5">
            {stages.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                role="tab"
                id={`hero-stage-tab-${index}`}
                aria-controls="hero-stage-panel"
                aria-selected={activeStage === index}
                onClick={() => setActiveStage(index)}
                className={`hero-stage-tab relative min-w-0 border-t px-1 py-3 text-left sm:px-2 ${
                  activeStage === index ? "is-active" : ""
                }`}
              >
                <span className="metric block text-[0.46rem] text-black/28">0{index + 1}</span>
                <span className="mt-1 block truncate text-[0.63rem] font-medium text-black/46 sm:text-xs">
                  {stage.label}
                </span>
                <span className="hidden text-[0.52rem] text-black/28 lg:block">{stage.detail}</span>
              </button>
            ))}
          </div>
        </div>
        <div
          key={activeStage}
          id="hero-stage-panel"
          role="tabpanel"
          aria-labelledby={`hero-stage-tab-${activeStage}`}
          className="hero-stage-panel"
        >
          <ActiveScreen />
        </div>
      </div>
      <p className="metric mt-3 text-right text-[0.58rem] uppercase tracking-[0.12em] text-black/34">
        Illustrative data
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-canvas relative flex min-h-svh items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-10 lg:pt-28">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative mx-auto grid w-full min-w-0 max-w-[100rem] grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-10 xl:gap-16">
        <div className="hero-copy w-full min-w-0 max-w-[42rem]">
          <h1 className="max-w-[42rem] text-[clamp(2.85rem,3.7vw,4.25rem)] font-light leading-[0.96] tracking-[-0.04em] text-[#11110f]">
            Simulate operational change before you commit.
          </h1>
          <p className="mt-6 max-w-[37rem] text-lg leading-7 text-black/58 sm:text-xl sm:leading-8">
            Find high-value AI opportunities or bring one already on your
            roadmap. See how each change affects teams, systems and customers,
            then learn from every outcome.
          </p>
          <div className="mt-8">
            <a href={bookingUrl} target="_blank" rel="noreferrer" className="primary-button group">
              Book a working session
              <ArrowIcon />
            </a>
          </div>
        </div>

        <HeroProduct />
      </div>
    </section>
  );
}
