type SourceIconKind = "cloud" | "folder" | "doc" | "shield" | "web" | "more";

const internalSources = [
  {
    label: "OneDrive",
    icon: "cloud" as const,
  },
  {
    label: "SharePoint",
    icon: "folder" as const,
  },
  {
    label: "Confluence",
    icon: "doc" as const,
  },
  {
    label: "Internal docs",
    icon: "shield" as const,
  },
  {
    label: "DBs, APIs, more",
    icon: "more" as const,
  },
];

const externalSources = [
  {
    label: "Regulatory web",
    icon: "shield" as const,
    tint: "border-[#6f5521] bg-[#2f2414] text-[#e7c477]",
  },
  {
    label: "Supplier updates",
    icon: "folder" as const,
    tint: "border-[#245342] bg-[#11251e] text-[#8fdbc1]",
  },
  {
    label: "Market signals",
    icon: "web" as const,
    tint: "border-[#275278] bg-[#102235] text-[#8fc7f0]",
  },
  {
    label: "Media context",
    icon: "doc" as const,
    tint: "border-[#653b58] bg-[#2a1724] text-[#e3a3d3]",
  },
];

const graphNodes = [
  {
    id: "root",
    label: "Environment",
    x: 50,
    y: 50,
    size: "large",
    tone: "bg-[#eaf0f2] text-[#17202a] border-[#d7e0e4]",
  },
  {
    id: "exec",
    label: "Executive owners",
    x: 50,
    y: 16,
    size: "cohort",
    tone: "bg-[#f6eef2] text-[#51313d] border-[#eadbe1]",
  },
  {
    id: "ops",
    label: "Operations",
    x: 25,
    y: 32,
    size: "cohort",
    tone: "bg-[#edf1f8] text-[#213655] border-[#d9e1ee]",
  },
  {
    id: "risk",
    label: "Risk and compliance",
    x: 75,
    y: 32,
    size: "cohort",
    tone: "bg-[#f6f0e6] text-[#4c3518] border-[#e8dcc8]",
  },
  {
    id: "customers",
    label: "Customer cohorts",
    x: 24,
    y: 70,
    size: "cohort",
    tone: "bg-[#f1edf8] text-[#3d3153] border-[#e4ddee]",
  },
  {
    id: "support",
    label: "Support channels",
    x: 52,
    y: 83,
    size: "cohort",
    tone: "bg-[#eff5ef] text-[#263e2c] border-[#dbe8dc]",
  },
  {
    id: "vendors",
    label: "Vendor operations",
    x: 78,
    y: 68,
    size: "cohort",
    tone: "bg-[#edf5f3] text-[#25433e] border-[#d7e7e3]",
  },
  { id: "pm", label: "PM", x: 13, y: 22, size: "actor" },
  { id: "qa", label: "QA", x: 18, y: 48, size: "actor" },
  { id: "ic", label: "IC", x: 16, y: 82, size: "actor" },
  { id: "td", label: "TD", x: 38, y: 36, size: "actor" },
  { id: "eo", label: "EO", x: 62, y: 18, size: "actor" },
  { id: "lg", label: "LG", x: 88, y: 24, size: "actor" },
  { id: "rc", label: "RC", x: 86, y: 46, size: "actor" },
  { id: "vo", label: "VO", x: 90, y: 75, size: "actor" },
  { id: "cs", label: "CS", x: 62, y: 70, size: "actor" },
  { id: "cc", label: "CC", x: 39, y: 76, size: "actor" },
  { id: "cx", label: "CX", x: 34, y: 58, size: "actor" },
];

const graphEdges = [
  ["root", "exec"],
  ["root", "ops"],
  ["root", "risk"],
  ["root", "customers"],
  ["root", "support"],
  ["root", "vendors"],
  ["exec", "eo"],
  ["exec", "pm"],
  ["ops", "pm"],
  ["ops", "qa"],
  ["ops", "td"],
  ["td", "risk"],
  ["risk", "lg"],
  ["risk", "rc"],
  ["customers", "cx"],
  ["customers", "ic"],
  ["customers", "support"],
  ["support", "cc"],
  ["support", "cs"],
  ["vendors", "vo"],
  ["vendors", "rc"],
  ["qa", "customers"],
  ["cc", "vendors"],
  ["cs", "risk"],
];

const graphNodeById = Object.fromEntries(
  graphNodes.map((node) => [node.id, node]),
);

const rankedPaths = [
  "Fallback channel overload",
  "Missing owner for escalation",
  "Unproven rollback path",
];

const agentPersonas = [
  "Ops lead",
  "Risk reviewer",
  "Support owner",
  "Customer cohort",
];

const predictedActions = [
  {
    label: "Support shifts to fallback channels",
    share: "74%",
    icon: "support" as const,
    tint: "border-[#245342] bg-[#11251e] text-[#8fdbc1]",
  },
  {
    label: "Risk requests rollback evidence",
    share: "68%",
    icon: "evidence" as const,
    tint: "border-[#6f5521] bg-[#2f2414] text-[#e7c477]",
  },
  {
    label: "Comms prepares cohort updates",
    share: "61%",
    icon: "comms" as const,
    tint: "border-[#653b58] bg-[#2a1724] text-[#e3a3d3]",
  },
];

function SourceIcon({ kind }: { kind: SourceIconKind }) {
  if (kind === "cloud") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M7.5 18h9.2a3.3 3.3 0 0 0 .4-6.6 5.3 5.3 0 0 0-10.2-1.5A4.1 4.1 0 0 0 7.5 18Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "folder") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M4.5 7.5h6l1.5 2h7.5v7a2 2 0 0 1-2 2h-13z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "shield") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M12 4.5 6 7v4.6c0 3.4 2.3 5.5 6 6.9 3.7-1.4 6-3.5 6-6.9V7z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M9.5 12.2 11.2 14l3.3-3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "web") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 12h14M12 5c2 2.1 3 4.5 3 7s-1 4.9-3 7c-2-2.1-3-4.5-3-7s1-4.9 3-7Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "more") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <circle cx="6.5" cy="12" r="1.4" fill="currentColor" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        <circle cx="17.5" cy="12" r="1.4" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M8 5.5h6l3 3v10H8z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M14 5.5v3h3M10.5 12h4M10.5 15h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function StageLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/36">
      {children}
    </p>
  );
}

function ActionIcon({
  kind,
}: {
  kind: (typeof predictedActions)[number]["icon"];
}) {
  if (kind === "support") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M6 8.5h7a3.5 3.5 0 0 1 0 7H9.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="m9 5.5-3 3 3 3M15 12.5l3 3-3 3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (kind === "evidence") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M7 5.5h8l2 2v11H7z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M14.5 5.5v2.5H17M9.5 12h5M9.5 15h3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M5.5 7.5h13v8h-7l-4 3v-3h-2z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 11h5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function InternalSourceRow({
  source,
}: {
  source: (typeof internalSources)[number];
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/50 px-3 py-2.5 text-sm font-medium text-black/68">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/50"
      >
        <SourceIcon kind={source.icon} />
      </span>
      {source.label}
    </div>
  );
}

function ExternalSourceChip({
  source,
}: {
  source: (typeof externalSources)[number];
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${source.tint}`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/8">
        <SourceIcon kind={source.icon} />
      </span>
      {source.label}
    </span>
  );
}

export function ProductFlowMock() {
  return (
    <div className="mt-12 overflow-hidden border border-white/10 bg-[#efeae2] text-black shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-[#f8f5ee] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-black" />
          <p className="text-sm font-medium tracking-[-0.03em]">Afterflow</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/42">
          <span>Context</span>
          <span>/</span>
          <span>World model</span>
          <span>/</span>
          <span>Simulation</span>
        </div>
      </div>

      <div className="grid gap-px bg-black/10 lg:grid-cols-[0.72fr_1.18fr_0.9fr]">
        <section className="bg-[#efeae2] p-5 sm:p-6">
          <StageLabel>01. Setup environment</StageLabel>
          <h3 className="mt-3 max-w-sm text-3xl font-medium leading-tight tracking-[-0.05em]">
            Connect context.
          </h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-[22px] border border-black/10 bg-[#f8f5ee] p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-black/36">
                Internal sources
              </p>

              <details className="mt-3 sm:hidden">
                <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between rounded-full border border-black/10 bg-white/50 px-3 text-xs font-medium text-black/54 [&::-webkit-details-marker]:hidden">
                  Show internal sources
                  <span className="text-black/34">+</span>
                </summary>
                <div className="mt-3 grid gap-2">
                  {internalSources.map((source) => (
                    <InternalSourceRow key={source.label} source={source} />
                  ))}
                </div>
              </details>

              <div className="mt-3 hidden gap-2 sm:grid">
                {internalSources.map((source) => (
                  <InternalSourceRow key={source.label} source={source} />
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-black/10 bg-black p-4 text-[#f3efe8]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/70">
                  <SourceIcon kind="web" />
                </span>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/38">
                    External context
                  </p>
                  <p className="mt-1 text-sm font-medium tracking-[-0.03em]">
                    Web scraper agent
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/46">
                Pulls external web context into the same environment.
              </p>

              <details className="mt-4 sm:hidden">
                <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between rounded-full border border-white/10 bg-white/6 px-3 text-xs font-medium text-white/62 [&::-webkit-details-marker]:hidden">
                  Show external sources
                  <span className="text-white/36">+</span>
                </summary>
                <div className="mt-3 flex flex-wrap gap-2">
                  {externalSources.map((source) => (
                    <ExternalSourceChip key={source.label} source={source} />
                  ))}
                </div>
              </details>

              <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
                {externalSources.map((source) => (
                  <ExternalSourceChip key={source.label} source={source} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f5ee] p-5 sm:p-6">
          <StageLabel>02. Build world model</StageLabel>
          <h3 className="mt-3 max-w-lg text-3xl font-medium leading-tight tracking-[-0.05em]">
            Turn context into a stakeholder graph.
          </h3>

          <div className="relative mt-6 min-h-[440px] overflow-hidden rounded-[26px] border border-black/10 bg-white/50">
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:32px_32px]" />
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <marker
                  id="graph-arrow"
                  markerHeight="4"
                  markerWidth="5"
                  orient="auto"
                  refX="5"
                  refY="2"
                >
                  <path d="M0 0 5 2 0 4z" fill="rgba(17,24,39,0.42)" />
                </marker>
              </defs>
              {graphEdges.map(([from, to]) => {
                const start = graphNodeById[from];
                const end = graphNodeById[to];

                return (
                  <line
                    key={`${from}-${to}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgba(17,24,39,0.24)"
                    strokeWidth={start.size === "actor" || end.size === "actor" ? 0.46 : 0.66}
                    markerEnd="url(#graph-arrow)"
                  />
                );
              })}
            </svg>

            {graphNodes.map((node) => {
              const isActor = node.size === "actor";
              const isLarge = node.size === "large";

              return (
                <div
                  key={node.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border text-center font-medium shadow-[0_10px_24px_rgba(0,0,0,0.08)] ${
                    isActor
                      ? "flex h-10 w-10 items-center justify-center bg-[#edf1f8] text-xs text-black/62"
                      : isLarge
                        ? `${node.tone} flex h-28 w-28 items-center justify-center px-4 text-sm leading-5 tracking-[-0.04em]`
                        : `${node.tone} flex h-20 w-20 items-center justify-center px-3 text-[11px] leading-4 tracking-[-0.03em]`
                  }`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.label}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#efeae2] p-5 sm:p-6">
          <StageLabel>03. Run simulation</StageLabel>
          <h3 className="mt-3 max-w-sm text-3xl font-medium leading-tight tracking-[-0.05em]">
            Run agents against the graph.
          </h3>

          <div className="mt-6 rounded-[26px] border border-black/10 bg-[#f8f5ee] p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-black/36">
              Decision
            </p>
            <p className="mt-3 text-xl font-medium leading-tight tracking-[-0.04em]">
              Should we proceed, phase, or pause?
            </p>
            <p className="mt-2 text-sm leading-6 text-black/56">
              Stakeholder agents inherit personas from the world model.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {agentPersonas.map((persona) => (
                <span
                  key={persona}
                  className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-xs font-medium text-black/56"
                >
                  {persona}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[26px] border border-black/10 bg-[#fbf8f2] p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-black/36">
              Ranked paths
            </p>
            <div className="mt-3 space-y-2">
              {rankedPaths.map((path, index) => (
                <div
                  key={path}
                  className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/54 px-3 py-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0ece5] text-xs font-medium">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-black/72">{path}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[26px] border border-black/10 bg-black p-4 text-[#f3efe8]">
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/38">
              Predicted actions
            </p>
            <div className="mt-3 space-y-2">
              {predictedActions.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-3 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
                    <ActionIcon kind={item.icon} />
                  </span>
                  <p className="min-w-0 flex-1 text-sm font-medium leading-5 text-white/72">
                    {item.label}
                  </p>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${item.tint}`}
                  >
                    {item.share}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
