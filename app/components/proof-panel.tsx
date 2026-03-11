"use client";

import { useMemo, useState, type CSSProperties } from "react";

const proofEvents = [
  {
    type: "Forum",
    text: "Customers ask what was exposed and what support is available.",
    colorClass: "text-emerald-400",
  },
  {
    type: "Breaking",
    text: "Coverage shifts from the breach itself to leadership response.",
    colorClass: "text-red-400",
  },
  {
    type: "Official",
    text: "A disclosure decision changes regulatory and public pressure.",
    colorClass: "text-sky-400",
  },
];

const proofMetrics = [
  {
    label: "Overall health",
    value: "56",
    delta: "-2",
    width: "56%",
    bar: "#facc15",
    deltaClass: "text-red-400",
  },
  {
    label: "Public awareness",
    value: "68",
    delta: "+4",
    width: "68%",
    bar: "#fb923c",
    deltaClass: "text-emerald-400",
  },
  {
    label: "Regulatory pressure",
    value: "63",
    delta: "+6",
    width: "63%",
    bar: "#8b5cf6",
    deltaClass: "text-emerald-400",
  },
  {
    label: "Internal stability",
    value: "60",
    delta: "-3",
    width: "60%",
    bar: "#14b8a6",
    deltaClass: "text-red-400",
  },
];

const proofNodes = [
  {
    id: "gov",
    code: "GOV",
    group: "Government",
    label: "Federal Government",
    className: "left-[49%] top-[22%]",
    size: 132,
    color: "#7c3aed",
    ring: "rgba(124, 58, 237, 0.55)",
    glow: "rgba(124, 58, 237, 0.22)",
    dot: "rgba(139, 92, 246, 0.82)",
    delay: "0s",
    narrative:
      "Pressure rises when the company cannot explain customer impact clearly, but a concrete remediation plan slows escalation.",
    behaviors: [
      "requesting specifics",
      "testing disclosure quality",
      "weighing intervention",
    ],
    stats: [
      {
        label: "Sentiment",
        value: "-0.18",
        width: "38%",
        bar: "#3b82f6",
      },
      {
        label: "Activation",
        value: "0.76",
        width: "76%",
        bar: "#f59e0b",
      },
      {
        label: "Trust in company",
        value: "0.27",
        width: "27%",
        bar: "#14b8a6",
      },
    ],
  },
  {
    id: "pub",
    code: "PUB",
    group: "Public",
    label: "Affected Customers",
    className: "left-[43%] top-[60%]",
    size: 168,
    color: "#dc2626",
    ring: "rgba(239, 68, 68, 0.5)",
    glow: "rgba(220, 38, 38, 0.24)",
    dot: "rgba(248, 113, 113, 0.82)",
    delay: "-1.8s",
    narrative:
      "Customers end the day angry, but the stronger response path starts rebuilding trust if support and facts improve quickly.",
    behaviors: [
      "watching remediation",
      "sharing cautious approval",
      "demanding faster support",
    ],
    stats: [
      {
        label: "Sentiment",
        value: "-0.06",
        width: "44%",
        bar: "#3b82f6",
      },
      {
        label: "Activation",
        value: "0.84",
        width: "84%",
        bar: "#f59e0b",
      },
      {
        label: "Trust in company",
        value: "0.31",
        width: "31%",
        bar: "#14b8a6",
      },
    ],
  },
  {
    id: "co",
    code: "CO",
    group: "Company",
    label: "Leadership",
    className: "left-[74%] top-[46%]",
    size: 88,
    color: "#4f46e5",
    ring: "rgba(99, 102, 241, 0.45)",
    glow: "rgba(79, 70, 229, 0.18)",
    dot: "rgba(129, 140, 248, 0.72)",
    delay: "-0.8s",
    narrative:
      "Leadership performs best when the external statement and customer action plan move together, not in separate waves.",
    behaviors: [
      "sequencing disclosure",
      "coordinating legal review",
      "balancing credibility",
    ],
    stats: [
      {
        label: "Sentiment",
        value: "0.12",
        width: "58%",
        bar: "#3b82f6",
      },
      {
        label: "Activation",
        value: "0.63",
        width: "63%",
        bar: "#f59e0b",
      },
      {
        label: "Trust in company",
        value: "0.52",
        width: "52%",
        bar: "#14b8a6",
      },
    ],
  },
  {
    id: "emp",
    code: "EMP",
    group: "Employees",
    label: "Employees",
    className: "left-[70%] top-[80%]",
    size: 102,
    color: "#0f766e",
    ring: "rgba(20, 184, 166, 0.42)",
    glow: "rgba(13, 148, 136, 0.18)",
    dot: "rgba(45, 212, 191, 0.72)",
    delay: "-2.6s",
    narrative:
      "Employees stay steadier when internal guidance arrives early and matches what the public hears later in the cycle.",
    behaviors: [
      "testing leadership confidence",
      "sharing internal signals",
      "watching customer fallout",
    ],
    stats: [
      {
        label: "Sentiment",
        value: "0.08",
        width: "54%",
        bar: "#3b82f6",
      },
      {
        label: "Activation",
        value: "0.58",
        width: "58%",
        bar: "#f59e0b",
      },
      {
        label: "Trust in company",
        value: "0.49",
        width: "49%",
        bar: "#14b8a6",
      },
    ],
  },
] as const;

type ProofNodeData = (typeof proofNodes)[number];

type ProofNodeProps = ProofNodeData & {
  active: boolean;
  onSelect: (id: ProofNodeData["id"]) => void;
};

function ProofNode({
  id,
  code,
  label,
  className,
  size,
  color,
  ring,
  glow,
  dot,
  delay,
  active,
  onSelect,
}: ProofNodeProps) {
  const outerDots = Array.from({ length: 14 }, (_, index) => ({
    angle: index * (360 / 14),
    size: index % 4 === 0 ? 18 : 10,
    radius: size * 0.66,
  }));

  const innerDots = Array.from({ length: 10 }, (_, index) => ({
    angle: index * (360 / 10) + 18,
    size: index % 3 === 0 ? 14 : 8,
    radius: size * 0.5,
  }));

  const style = {
    "--node-color": color,
    "--node-ring": ring,
    "--node-glow": glow,
    "--node-dot": dot,
    "--node-size": `${size}px`,
    "--node-delay": delay,
  } as CSSProperties;

  return (
    <div
      className={`proof-node ${className} ${active ? "proof-node--active" : ""}`}
      style={style}
    >
      <button
        type="button"
        className="proof-node-trigger"
        onClick={() => onSelect(id)}
        aria-pressed={active}
        aria-label={`Inspect ${label}`}
      >
        <div className="proof-node-shell">
          <div className="proof-node-glow" />
          <div className="proof-node-ring proof-node-ring--outer" />
          <div className="proof-node-ring proof-node-ring--mid" />
          <div className="proof-node-ring proof-node-ring--inner" />

          <div className="proof-node-orbit proof-node-orbit--outer">
            {outerDots.map((orbitDot) => (
              <span
                key={`${code}-outer-${orbitDot.angle}`}
                className="proof-orbit-dot"
                style={
                  {
                    width: orbitDot.size,
                    height: orbitDot.size,
                    "--dot-transform": `translate(-50%, -50%) rotate(${orbitDot.angle}deg) translateY(-${orbitDot.radius}px)`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="proof-node-orbit proof-node-orbit--inner">
            {innerDots.map((orbitDot) => (
              <span
                key={`${code}-inner-${orbitDot.angle}`}
                className="proof-orbit-dot"
                style={
                  {
                    width: orbitDot.size,
                    height: orbitDot.size,
                    "--dot-transform": `translate(-50%, -50%) rotate(${orbitDot.angle}deg) translateY(-${orbitDot.radius}px)`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="proof-node-core">
            <span>{code}</span>
          </div>
        </div>
        <p className="mt-4 text-center text-[13px] font-medium tracking-[-0.03em] text-white/82 sm:text-[15px]">
          {label}
        </p>
      </button>
    </div>
  );
}

type ProofEdgeProps = {
  className: string;
  color: string;
};

function ProofEdge({ className, color }: ProofEdgeProps) {
  return (
    <div
      className={`proof-edge ${className}`}
      style={
        {
          "--edge-color": color,
        } as CSSProperties
      }
    >
      <span className="proof-edge-line" />
      <span className="proof-edge-pulse" />
    </div>
  );
}

type CohortDetailCardProps = {
  node: ProofNodeData;
  onClose: () => void;
};

function CohortDetailCard({ node, onClose }: CohortDetailCardProps) {
  return (
    <div className="max-h-full overflow-y-auto rounded-[20px] border border-white/10 bg-[#061022]/95 p-3.5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: node.color }}
            />
            <p className="text-[17px] font-medium leading-[1.15] tracking-[-0.03em] text-white">
              {node.label}
            </p>
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
            {node.group}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white"
          aria-label={`Close ${node.label} details`}
        >
          Close
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {node.stats.map((stat) => (
          <div key={stat.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white/74">
                {stat.label}
              </p>
              <p className="text-sm font-medium text-white/58">
                {stat.value}
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className="proof-bar-fill h-full rounded-full"
                style={{
                  width: stat.width,
                  backgroundColor: stat.bar,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-white/8 pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
          Narrative
        </p>
        <p className="mt-3 text-sm leading-6 text-white/74">
          {node.narrative}
        </p>
      </div>
    </div>
  );
}

export function ProofPanel() {
  const [selectedNodeId, setSelectedNodeId] =
    useState<ProofNodeData["id"] | null>(null);

  const activeNode = useMemo(
    () => proofNodes.find((node) => node.id === selectedNodeId) ?? null,
    [selectedNodeId],
  );

  const handleSelect = (id: ProofNodeData["id"]) => {
    setSelectedNodeId((current) => (current === id ? null : id));
  };

  return (
    <div className="mt-12 overflow-hidden border border-white/10 bg-[#020202]">
      <div className="grid xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <div className="hidden border-r border-white/10 bg-[#020202] xl:block">
          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
              Live Events
            </p>
          </div>
          <div className="space-y-px bg-white/10">
            {proofEvents.map((event) => (
              <div key={event.text} className="bg-[#020202] px-6 py-5">
                <p
                  className={`text-[11px] font-medium uppercase tracking-[0.32em] ${event.colorClass}`}
                >
                  {event.type}
                </p>
                <p className="mt-3 text-base leading-8 text-white/70">
                  {event.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="proof-panel relative min-h-[420px] overflow-hidden border-b border-white/10 sm:min-h-[520px] xl:border-b-0 xl:border-r xl:border-white/10">
          <div className="proof-panel-grid" />
          <div className="proof-panel-glow" />
          <p className="pointer-events-none absolute left-5 top-5 z-10 text-[11px] font-medium uppercase tracking-[0.32em] text-white/32">
            Click a cohort to inspect sentiment
          </p>

          <ProofEdge
            className="left-[42%] top-[20%] w-[28%] rotate-[104deg]"
            color="rgba(147, 51, 234, 0.55)"
          />
          <ProofEdge
            className="left-[44%] top-[52%] w-[25%] rotate-[22deg]"
            color="rgba(99, 102, 241, 0.5)"
          />
          <ProofEdge
            className="left-[46%] top-[53%] w-[30%] rotate-[68deg]"
            color="rgba(239, 68, 68, 0.45)"
          />

          {proofNodes.map((node) => (
            <ProofNode
              key={node.id}
              {...node}
              active={node.id === selectedNodeId}
              onSelect={handleSelect}
            />
          ))}

          {activeNode ? (
            <div className="absolute inset-y-4 right-4 z-30 hidden w-[272px] max-w-[calc(100%-32px)] items-start lg:flex">
              <CohortDetailCard
                node={activeNode}
                onClose={() => setSelectedNodeId(null)}
              />
            </div>
          ) : null}
        </div>

        {activeNode ? (
          <div className="border-b border-white/10 bg-[#020202] p-4 lg:hidden">
            <CohortDetailCard
              node={activeNode}
              onClose={() => setSelectedNodeId(null)}
            />
          </div>
        ) : null}

        <div className="bg-[#020202]">
          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
              System State
            </p>
          </div>

          <div className="space-y-6 px-6 py-6">
            <div className="space-y-6">
              {proofMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
                      {metric.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black tracking-[-0.05em] text-white">
                        {metric.value}
                      </span>
                      <span className={`text-sm font-medium ${metric.deltaClass}`}>
                        {metric.delta}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="proof-bar-fill h-full rounded-full"
                      style={{
                        width: metric.width,
                        backgroundColor: metric.bar,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
                Decision Preview
              </p>
              <p className="mt-3 text-base leading-8 text-white/70">
                Preview a response, inspect its ripple effects, then commit to
                the stronger path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
