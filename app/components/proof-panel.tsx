"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type NodeId = "gov" | "pub" | "co" | "emp";
type DecisionId = "disclose" | "internal";

type ProofEvent = {
  type: string;
  text: string;
  colorClass: string;
};

type ProofMetric = {
  label: string;
  value: string;
  delta: string;
  width: string;
  bar: string;
  deltaClass: string;
};

type ProofStat = {
  label: string;
  value: string;
  width: string;
  bar: string;
};

type ProofNodeData = {
  id: NodeId;
  code: string;
  group: string;
  label: string;
  className: string;
  size: number;
  color: string;
  ring: string;
  glow: string;
  dot: string;
  delay: string;
  narrative: string;
  stats: ProofStat[];
};

type ProofState = {
  decisionNote: string;
  events: ProofEvent[];
  metrics: ProofMetric[];
  nodes: ProofNodeData[];
};

type PreviewNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  muted?: boolean;
};

type DecisionOption = {
  id: DecisionId;
  title: string;
  previewTitle: string;
  projectedHealth: string;
  projectedDelta: string;
  projectedDeltaClass: string;
  projectedOutcome: string;
  rippleEffects: string[];
  previewNodes: PreviewNode[];
  previewEdges: Array<[string, string]>;
  state: ProofState;
};

const baseNodes: ProofNodeData[] = [
  {
    id: "gov",
    code: "GOV",
    group: "Government",
    label: "Federal Government",
    className: "left-[48%] top-[20%]",
    size: 126,
    color: "#7c3aed",
    ring: "rgba(124, 58, 237, 0.55)",
    glow: "rgba(124, 58, 237, 0.22)",
    dot: "rgba(139, 92, 246, 0.82)",
    delay: "0s",
    narrative:
      "Pressure rises when the company cannot explain customer impact clearly, but a concrete remediation plan slows escalation.",
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
    className: "left-[40%] top-[62%]",
    size: 160,
    color: "#dc2626",
    ring: "rgba(239, 68, 68, 0.5)",
    glow: "rgba(220, 38, 38, 0.24)",
    dot: "rgba(248, 113, 113, 0.82)",
    delay: "-1.8s",
    narrative:
      "Customers end the day angry, but the stronger response path starts rebuilding trust if support and facts improve quickly.",
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
    className: "left-[77%] top-[44%]",
    size: 84,
    color: "#4f46e5",
    ring: "rgba(99, 102, 241, 0.45)",
    glow: "rgba(79, 70, 229, 0.18)",
    dot: "rgba(129, 140, 248, 0.72)",
    delay: "-0.8s",
    narrative:
      "Leadership performs best when the external statement and customer action plan move together, not in separate waves.",
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
    className: "left-[73%] top-[84%]",
    size: 96,
    color: "#0f766e",
    ring: "rgba(20, 184, 166, 0.42)",
    glow: "rgba(13, 148, 136, 0.18)",
    dot: "rgba(45, 212, 191, 0.72)",
    delay: "-2.6s",
    narrative:
      "Employees stay steadier when internal guidance arrives early and matches what the public hears later in the cycle.",
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
];

function buildNodes(
  overrides: Partial<Record<NodeId, Partial<ProofNodeData>>> = {},
) {
  return baseNodes.map((node) => ({
    ...node,
    ...(overrides[node.id] ?? {}),
  }));
}

const baselineState: ProofState = {
  decisionNote: "Decision required.",
  events: [
    {
      type: "Forum",
      text: "If passport or licence numbers are in this, people are going to panic. Tell us what was exposed and what support is available.",
      colorClass: "text-emerald-400",
    },
    {
      type: "Breaking",
      text: "Coverage shifts from the breach itself to whether leadership waited too long to explain the likely scope.",
      colorClass: "text-red-400",
    },
    {
      type: "Official",
      text: "Regulators ask when the company will disclose likely impact and customer protections.",
      colorClass: "text-sky-400",
    },
    {
      type: "Forum",
      text: "People are trying to work out whether they need to replace IDs tonight or wait for another update.",
      colorClass: "text-emerald-400",
    },
  ],
  metrics: [
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
  ],
  nodes: buildNodes(),
};

const decisionOptions: Record<DecisionId, DecisionOption> = {
  disclose: {
    id: "disclose",
    title: "Disclose the likely scope publicly tonight",
    previewTitle: "Preview: disclose publicly tonight",
    projectedHealth: "64",
    projectedDelta: "+8",
    projectedDeltaClass: "text-emerald-400",
    projectedOutcome:
      "Early disclosure raises scrutiny immediately but keeps the story focused on remediation instead of concealment.",
    rippleEffects: [
      "Customers get a concrete action path earlier.",
      "Regulators push for follow-up detail, not a cover-up inquiry.",
    ],
    previewNodes: [
      {
        id: "left",
        label: "Scope disclosed",
        x: 14,
        y: 55,
        color: "#f59e0b",
      },
      {
        id: "center",
        label: "Remediation narrative forms",
        x: 38,
        y: 50,
        color: "#f59e0b",
      },
      {
        id: "top",
        label: "Regulators request follow-up",
        x: 58,
        y: 28,
        color: "#475569",
        muted: true,
      },
      {
        id: "bottom",
        label: "Support demand spikes",
        x: 58,
        y: 72,
        color: "#475569",
        muted: true,
      },
      {
        id: "right",
        label: "Trust stabilizes",
        x: 80,
        y: 50,
        color: "#10b981",
      },
    ],
    previewEdges: [
      ["left", "center"],
      ["center", "top"],
      ["center", "bottom"],
      ["top", "right"],
      ["bottom", "right"],
    ],
    state: {
      decisionNote: "Current path: disclose the likely scope publicly tonight.",
      events: [
        {
          type: "Forum",
          text: "They finally said something. Now tell us whether document numbers are involved and what we need to replace.",
          colorClass: "text-emerald-400",
        },
        {
          type: "Forum",
          text: "If support is coming, say when and how. People need concrete instructions tonight.",
          colorClass: "text-emerald-400",
        },
        {
          type: "Breaking",
          text: "Disclosure pushes the incident into national coverage, but the narrative stays on remediation speed.",
          colorClass: "text-red-400",
        },
        {
          type: "Official",
          text: "Government services request customer-level detail and timelines for the next update.",
          colorClass: "text-sky-400",
        },
        {
          type: "Forum",
          text: "At least we know what they are doing. The silence path would have been worse.",
          colorClass: "text-emerald-400",
        },
      ],
      metrics: [
        {
          label: "Overall health",
          value: "64",
          delta: "+8",
          width: "64%",
          bar: "#facc15",
          deltaClass: "text-emerald-400",
        },
        {
          label: "Public awareness",
          value: "72",
          delta: "+8",
          width: "72%",
          bar: "#fb923c",
          deltaClass: "text-emerald-400",
        },
        {
          label: "Regulatory pressure",
          value: "57",
          delta: "-6",
          width: "57%",
          bar: "#8b5cf6",
          deltaClass: "text-emerald-400",
        },
        {
          label: "Internal stability",
          value: "66",
          delta: "+6",
          width: "66%",
          bar: "#14b8a6",
          deltaClass: "text-emerald-400",
        },
      ],
      nodes: buildNodes({
        gov: {
          size: 118,
          narrative:
            "Government pressure remains high, but earlier disclosure shifts the focus toward remediation and follow-up detail.",
          stats: [
            {
              label: "Sentiment",
              value: "-0.04",
              width: "46%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.62",
              width: "62%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.39",
              width: "39%",
              bar: "#14b8a6",
            },
          ],
        },
        pub: {
          size: 148,
          narrative:
            "Customers remain affected, but earlier disclosure and clear support steps slow the worst narrative spiral.",
          stats: [
            {
              label: "Sentiment",
              value: "-0.02",
              width: "48%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.72",
              width: "72%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.44",
              width: "44%",
              bar: "#14b8a6",
            },
          ],
        },
        co: {
          size: 92,
          narrative:
            "Leadership keeps more room to maneuver when disclosure and customer action arrive in the same wave.",
          stats: [
            {
              label: "Sentiment",
              value: "0.18",
              width: "61%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.60",
              width: "60%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.61",
              width: "61%",
              bar: "#14b8a6",
            },
          ],
        },
        emp: {
          size: 106,
          narrative:
            "Employees stabilize faster once internal guidance matches the public notice and the customer remediation plan.",
          stats: [
            {
              label: "Sentiment",
              value: "0.12",
              width: "58%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.52",
              width: "52%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.58",
              width: "58%",
              bar: "#14b8a6",
            },
          ],
        },
      }),
    },
  },
  internal: {
    id: "internal",
    title: "Keep it internal until the investigation is complete",
    previewTitle: "Preview: keep scope internal",
    projectedHealth: "55",
    projectedDelta: "-17",
    projectedDeltaClass: "text-red-400",
    projectedOutcome:
      "Silence buys a few hours but quickly converts uncertainty into a credibility crisis once the likely scope leaks elsewhere.",
    rippleEffects: [
      "Government pressure rises faster than in the disclosure path.",
      "Customers assume leadership knows more than it is admitting.",
    ],
    previewNodes: [
      {
        id: "left",
        label: "Scope held back",
        x: 14,
        y: 55,
        color: "#f59e0b",
      },
      {
        id: "center",
        label: "Leak narrative forms",
        x: 38,
        y: 50,
        color: "#f59e0b",
      },
      {
        id: "top",
        label: "Minister criticises response",
        x: 58,
        y: 28,
        color: "#475569",
        muted: true,
      },
      {
        id: "bottom",
        label: "Customer anger compounds",
        x: 58,
        y: 72,
        color: "#475569",
        muted: true,
      },
      {
        id: "right",
        label: "Cover-up narrative hardens",
        x: 80,
        y: 50,
        color: "#ec4899",
      },
    ],
    previewEdges: [
      ["left", "center"],
      ["center", "top"],
      ["center", "bottom"],
      ["top", "right"],
      ["bottom", "right"],
    ],
    state: {
      decisionNote:
        "Current path: keep scope internal until more facts are confirmed.",
      events: [
        {
          type: "Forum",
          text: "Why are we hearing about this from leaks? If documents are exposed, say it now.",
          colorClass: "text-emerald-400",
        },
        {
          type: "Forum",
          text: "'Be vigilant' is not a plan. What are customers supposed to do tonight if their IDs are exposed?",
          colorClass: "text-emerald-400",
        },
        {
          type: "Breaking",
          text: "Leaks push the story from breach response to a leadership credibility failure.",
          colorClass: "text-red-400",
        },
        {
          type: "Official",
          text: "Government services say the company still has not provided enough detail to protect the most exposed accounts.",
          colorClass: "text-sky-400",
        },
        {
          type: "Forum",
          text: "If leadership knew the likely scope and stayed quiet, that becomes the real scandal.",
          colorClass: "text-emerald-400",
        },
      ],
      metrics: [
        {
          label: "Overall health",
          value: "55",
          delta: "-17",
          width: "55%",
          bar: "#facc15",
          deltaClass: "text-red-400",
        },
        {
          label: "Public awareness",
          value: "74",
          delta: "+10",
          width: "74%",
          bar: "#fb923c",
          deltaClass: "text-red-400",
        },
        {
          label: "Regulatory pressure",
          value: "71",
          delta: "+14",
          width: "71%",
          bar: "#8b5cf6",
          deltaClass: "text-red-400",
        },
        {
          label: "Internal stability",
          value: "49",
          delta: "-11",
          width: "49%",
          bar: "#14b8a6",
          deltaClass: "text-red-400",
        },
      ],
      nodes: buildNodes({
        gov: {
          size: 136,
          narrative:
            "Regulators move faster when silence starts to look deliberate and customer-level detail is still missing.",
          stats: [
            {
              label: "Sentiment",
              value: "-0.26",
              width: "30%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.82",
              width: "82%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.18",
              width: "18%",
              bar: "#14b8a6",
            },
          ],
        },
        pub: {
          size: 180,
          narrative:
            "Customers interpret the delay as concealment and demand immediate answers, support, and replacement guidance.",
          stats: [
            {
              label: "Sentiment",
              value: "-0.22",
              width: "32%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.92",
              width: "92%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.20",
              width: "20%",
              bar: "#14b8a6",
            },
          ],
        },
        co: {
          size: 78,
          narrative:
            "Leadership loses credibility as the gap between known facts and public statements becomes the story.",
          stats: [
            {
              label: "Sentiment",
              value: "-0.08",
              width: "42%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.71",
              width: "71%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.29",
              width: "29%",
              bar: "#14b8a6",
            },
          ],
        },
        emp: {
          size: 90,
          narrative:
            "Employees become less confident when internal guidance lags the external story and the situation keeps widening.",
          stats: [
            {
              label: "Sentiment",
              value: "-0.05",
              width: "45%",
              bar: "#3b82f6",
            },
            {
              label: "Activation",
              value: "0.66",
              width: "66%",
              bar: "#f59e0b",
            },
            {
              label: "Trust in company",
              value: "0.37",
              width: "37%",
              bar: "#14b8a6",
            },
          ],
        },
      }),
    },
  },
};

const decisionOptionList = [
  decisionOptions.disclose,
  decisionOptions.internal,
];

const decisionPrompt =
  "Do we disclose the likely scope publicly tonight or keep this internal until more facts are confirmed?";

type ProofNodeProps = ProofNodeData & {
  active: boolean;
  onSelect: (id: NodeId) => void;
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
              <p className="text-sm font-medium text-white/74">{stat.label}</p>
              <p className="text-sm font-medium text-white/58">{stat.value}</p>
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

function DecisionBriefModal({
  currentDecisionId,
  onClose,
  onPreview,
  onChoose,
}: {
  currentDecisionId: DecisionId | null;
  onClose: () => void;
  onPreview: (id: DecisionId) => void;
  onChoose: (id: DecisionId) => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-y-auto bg-black/72 p-3 backdrop-blur-sm sm:p-4 lg:block">
      <div className="mx-auto w-full max-w-[980px] overflow-hidden rounded-[24px] border border-[#26345f] bg-[#071229] shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[linear-gradient(180deg,rgba(127,29,29,0.22),rgba(2,6,23,0))] px-5 py-4 sm:px-8">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.26em] text-rose-300">
                End of Day 1 Brief
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="hidden text-[11px] font-medium uppercase tracking-[0.32em] text-white/35 sm:block">
                Decision Required
              </p>
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white"
              >
                Close
              </button>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-8 sm:py-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/32">
              Situation Report
            </p>
            <p className="mt-3 max-w-4xl text-lg font-medium leading-tight tracking-[-0.04em] text-white sm:text-[26px] sm:leading-[1.2]">
              {decisionPrompt}
            </p>

            <div className="mt-5 space-y-3">
              {decisionOptionList.map((option) => {
                const isSelected = currentDecisionId === option.id;

                return (
                  <div
                    key={option.id}
                    className={`rounded-[20px] border p-4 sm:p-5 ${
                      isSelected
                        ? "border-white/18 bg-[#08172f]"
                        : "border-white/10 bg-[#051024]"
                    }`}
                  >
                    <p className="text-base font-medium tracking-[-0.03em] text-white sm:text-[20px] sm:leading-[1.22]">
                      {option.title}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => onPreview(option.id)}
                        className="inline-flex min-w-24 items-center justify-center rounded-[12px] border border-sky-500/40 bg-sky-500/8 px-3.5 py-2.5 text-sm font-medium text-sky-200 transition-colors hover:border-sky-400/55 hover:bg-sky-500/12"
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => onChoose(option.id)}
                        className={`inline-flex min-w-24 items-center justify-center rounded-[12px] border px-3.5 py-2.5 text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-emerald-500/45 bg-emerald-500/10 text-emerald-200"
                            : "border-rose-500/35 bg-rose-500/8 text-rose-200 hover:border-rose-400/55 hover:bg-rose-500/12"
                        }`}
                      >
                        {isSelected ? "Selected" : "Choose"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
}

function PreviewNetwork({ option }: { option: DecisionOption }) {
  const previewLabelFontSize = 18;
  const previewLabelLineHeight = 24;
  const previewLabelGap = 34;
  const previewHorizontalPadding = 72;
  const previewVerticalPadding = 64;

  const wrapLabel = (label: string) => {
    const words = label.split(" ");
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;

      if (next.length > 18 && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }

    if (current) {
      lines.push(current);
    }

    return lines;
  };

  const renderedNodes = option.previewNodes.map((node) => {
    const lines = wrapLabel(node.label);
    const cx = node.x * 10;
    const cy = node.y * 6.2;
    const r = node.muted ? 50 : 64;
    const longestLine = lines.reduce(
      (maxWidth, line) => Math.max(maxWidth, line.length),
      0,
    );
    const labelHalfWidth = Math.max(
      r,
      (longestLine * previewLabelFontSize * 0.56) / 2,
    );

    return {
      ...node,
      lines,
      cx,
      cy,
      r,
      labelY: cy + r + previewLabelGap,
      labelHalfWidth,
      labelHeight:
        previewLabelFontSize + (Math.max(lines.length, 1) - 1) * previewLabelLineHeight,
    };
  });

  const graphBounds = renderedNodes.reduce(
    (bounds, node) => ({
      minX: Math.min(bounds.minX, node.cx - Math.max(node.r, node.labelHalfWidth)),
      maxX: Math.max(bounds.maxX, node.cx + Math.max(node.r, node.labelHalfWidth)),
      minY: Math.min(bounds.minY, node.cy - node.r),
      maxY: Math.max(bounds.maxY, node.labelY + node.labelHeight),
    }),
    {
      minX: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
    },
  );

  const nodesById = Object.fromEntries(
    renderedNodes.map((node) => [node.id, node]),
  );

  const viewBox = [
    graphBounds.minX - previewHorizontalPadding,
    graphBounds.minY - previewVerticalPadding,
    graphBounds.maxX - graphBounds.minX + previewHorizontalPadding * 2,
    graphBounds.maxY - graphBounds.minY + previewVerticalPadding * 2,
  ].join(" ");

  return (
    <div className="relative h-full min-h-[280px] w-full lg:min-h-[410px] xl:min-h-[385px]">
      <svg
        className="h-full min-h-[280px] w-full lg:min-h-[410px] xl:min-h-[385px]"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {option.previewEdges.map(([fromId, toId]) => {
          const from = nodesById[fromId];
          const to = nodesById[toId];

          if (!from || !to) {
            return null;
          }

          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="5"
              strokeDasharray="18 18"
            />
          );
        })}
        {renderedNodes.map((node) => {
          return (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={node.muted ? "rgba(15,23,42,0.32)" : `${node.color}22`}
                stroke={node.muted ? "rgba(255,255,255,0.16)" : node.color}
                strokeWidth="3.5"
              />
              <text
                x={node.cx}
                y={node.labelY}
                textAnchor="middle"
                fill={node.muted ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.86)"}
                fontSize={previewLabelFontSize}
                fontWeight="500"
              >
                {node.lines.map((line, index) => (
                  <tspan
                    key={`${node.id}-${line}`}
                    x={node.cx}
                    dy={index === 0 ? 0 : previewLabelLineHeight}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DecisionPreviewModal({
  currentDecisionId,
  option,
  onBack,
  onChoose,
  onClose,
}: {
  currentDecisionId: DecisionId | null;
  option: DecisionOption;
  onBack: () => void;
  onChoose: (id: DecisionId) => void;
  onClose: () => void;
}) {
  const isSelected = currentDecisionId === option.id;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-y-auto bg-black/72 p-2 backdrop-blur-sm sm:p-3 xl:block xl:overflow-hidden xl:p-2">
      <div className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[24px] border border-[#26345f] bg-[#050c18] shadow-[0_32px_90px_rgba(0,0,0,0.45)] xl:flex xl:h-full xl:flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(127,29,29,0.28),rgba(2,6,23,0.04)_55%)] px-4 py-3 sm:px-6 xl:px-5 xl:py-2.5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-rose-300/90">
                Decision Preview
              </p>
              <p className="mt-1.5 text-lg font-medium tracking-[-0.04em] text-white sm:text-[24px] sm:leading-[1.08] xl:text-[22px]">
                {option.previewTitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="p-3 sm:p-4 xl:flex-1 xl:min-h-0 xl:p-3">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_208px] xl:h-full xl:grid-cols-[minmax(0,1fr)_224px]">
              <div className="flex rounded-[22px] border border-white/8 bg-black/22 p-3 sm:p-4 xl:min-h-0 xl:p-3">
                <PreviewNetwork option={option} />
              </div>

              <div className="space-y-2 xl:flex xl:min-h-0 xl:flex-col">
                <div className="rounded-[18px] border border-white/10 bg-[#071229] p-3 xl:p-2.5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
                    Projected Overall Health
                  </p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-[32px] font-black tracking-[-0.06em] text-yellow-300 xl:text-[30px]">
                      {option.projectedHealth}
                    </span>
                    <span className={`pb-0.5 text-sm font-medium ${option.projectedDeltaClass}`}>
                      {option.projectedDelta}
                    </span>
                  </div>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-[#071229] p-3 xl:flex-1 xl:p-2.5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
                    Projected Outcome
                  </p>
                  <p className="mt-2 text-[12px] leading-5 text-white/72 xl:text-[11px] xl:leading-[1.55]">
                    {option.projectedOutcome}
                  </p>
                  <div className="mt-3 space-y-1.5 border-t border-white/8 pt-3 xl:mt-2.5 xl:space-y-1 xl:pt-2.5">
                    {option.rippleEffects.map((effect) => (
                      <p
                        key={effect}
                        className="text-[12px] leading-5 text-white/66 xl:text-[11px] xl:leading-[1.55]"
                      >
                        {effect}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 xl:mt-auto xl:gap-1.5">
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex min-w-20 items-center justify-center rounded-[12px] border border-white/12 px-3 py-2 text-sm font-medium text-white/68 transition-colors hover:border-white/20 hover:text-white xl:px-3 xl:py-1.5 xl:text-[13px]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => onChoose(option.id)}
                    className={`inline-flex min-w-24 items-center justify-center rounded-[12px] border px-3 py-2 text-sm font-medium transition-colors xl:px-3 xl:py-1.5 xl:text-[13px] ${
                      isSelected
                        ? "border-emerald-500/45 bg-emerald-500/10 text-emerald-200"
                        : "border-rose-500/35 bg-rose-500/8 text-rose-200 hover:border-rose-400/55 hover:bg-rose-500/12"
                    }`}
                  >
                    {isSelected ? "Selected Path" : "Choose Path"}
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export function ProofPanel() {
  const [selectedNodeId, setSelectedNodeId] = useState<NodeId | null>(null);
  const [selectedDecisionId, setSelectedDecisionId] =
    useState<DecisionId | null>(null);
  const [decisionModal, setDecisionModal] = useState<"brief" | "preview" | null>(
    null,
  );
  const [previewDecisionId, setPreviewDecisionId] = useState<DecisionId | null>(
    null,
  );
  const [animatedMetricValues, setAnimatedMetricValues] = useState<number[]>(
    () => baselineState.metrics.map((metric) => Number(metric.value)),
  );
  const animatedMetricValuesRef = useRef(animatedMetricValues);
  const [visibleEvents, setVisibleEvents] = useState<ProofEvent[]>([]);

  const activeState = useMemo(
    () =>
      selectedDecisionId ? decisionOptions[selectedDecisionId].state : baselineState,
    [selectedDecisionId],
  );

  const activeNode = useMemo(
    () => activeState.nodes.find((node) => node.id === selectedNodeId) ?? null,
    [activeState.nodes, selectedNodeId],
  );

  const previewOption = previewDecisionId
    ? decisionOptions[previewDecisionId]
    : null;

  useEffect(() => {
    animatedMetricValuesRef.current = animatedMetricValues;
  }, [animatedMetricValues]);

  useEffect(() => {
    const startValues = animatedMetricValuesRef.current;
    const targetValues = activeState.metrics.map((metric) => Number(metric.value));
    let frameId = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / 650, 1);
      const eased = 1 - (1 - progress) * (1 - progress);

      setAnimatedMetricValues(
        targetValues.map((target, index) => {
          const start = startValues[index] ?? target;
          return Math.round(start + (target - start) * eased);
        }),
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frameId);
  }, [activeState.metrics]);

  useEffect(() => {
    const nextEvents = activeState.events.slice(0, 4);

    const timeouts = nextEvents.map((event, index) =>
      window.setTimeout(() => {
        setVisibleEvents((current) =>
          index === 0 ? [event] : [...current, event].slice(-4),
        );
      }, index * 260),
    );

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [activeState.events]);

  const handleSelect = (id: NodeId) => {
    setSelectedNodeId((current) => (current === id ? null : id));
  };

  const openDecisionBrief = () => {
    setDecisionModal("brief");
    setPreviewDecisionId(null);
  };

  const openDecisionPreview = (id: DecisionId) => {
    setPreviewDecisionId(id);
    setDecisionModal("preview");
  };

  const closeDecisionFlow = () => {
    setDecisionModal(null);
    setPreviewDecisionId(null);
  };

  const chooseDecision = (id: DecisionId) => {
    setSelectedDecisionId(id);
    setSelectedNodeId(null);
    closeDecisionFlow();
  };

  return (
    <>
      <div
        data-nosnippet
        className="relative mt-12 overflow-hidden border border-white/10 bg-[#020202] xl:h-[520px]"
      >
        <div className="grid xl:h-full xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <div className="hidden min-h-0 border-r border-white/10 bg-[#020202] xl:flex xl:flex-col">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
                Live Events
              </p>
            </div>
            <div className="flex-1 overflow-y-auto bg-white/10">
              {visibleEvents.map((event) => (
                <div
                  key={event.text}
                  className="proof-event-card bg-[#020202] px-6 py-5"
                >
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.32em] ${event.colorClass}`}
                  >
                    {event.type}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {event.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="proof-panel relative min-h-[420px] overflow-hidden border-b border-white/10 sm:min-h-[520px] xl:h-full xl:min-h-0 xl:border-b-0 xl:border-r xl:border-white/10">
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

            {activeState.nodes.map((node) => (
              <ProofNode
                key={node.id}
                {...node}
                active={node.id === selectedNodeId}
                onSelect={handleSelect}
              />
            ))}

            {activeNode ? (
              <>
                <button
                  type="button"
                  aria-label="Close cohort details"
                  onClick={() => setSelectedNodeId(null)}
                  className="absolute inset-0 z-20 bg-[#020202]/72 backdrop-blur-[2px] lg:hidden"
                />
                <div className="absolute inset-x-3 bottom-14 top-4 z-30 flex items-start justify-center sm:bottom-6 sm:top-6 lg:hidden">
                  <div className="h-full w-full max-w-[420px]">
                    <CohortDetailCard
                      node={activeNode}
                      onClose={() => setSelectedNodeId(null)}
                    />
                  </div>
                </div>
                <div className="absolute inset-y-4 right-4 z-30 hidden w-[272px] max-w-[calc(100%-32px)] items-start lg:flex">
                  <CohortDetailCard
                    node={activeNode}
                    onClose={() => setSelectedNodeId(null)}
                  />
                </div>
              </>
            ) : null}
          </div>

          <div className="bg-[#020202] xl:flex xl:min-h-0 xl:flex-col">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
                System State
              </p>
            </div>

            <div className="space-y-3 px-6 py-4 xl:flex-1 xl:overflow-y-auto">
              <div className="space-y-4">
                {activeState.metrics.map((metric, index) => (
                  <div key={metric.label}>
                    <div className="mb-1.5 flex items-end justify-between gap-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
                        {metric.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-[-0.05em] text-white">
                          {animatedMetricValues[index] ?? Number(metric.value)}
                        </span>
                        <span
                          className={`text-sm font-medium ${metric.deltaClass}`}
                        >
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

              <div className="border-t border-white/10 pt-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
                  Decision Preview
                </p>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  {activeState.decisionNote}
                </p>
                <button
                  type="button"
                  onClick={openDecisionBrief}
                  className="mt-3 inline-flex min-w-36 items-center justify-center rounded-[14px] border border-white/14 bg-white/4 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/24 hover:bg-white/7"
                >
                  {selectedDecisionId ? "Review Decision" : "View Decision"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {decisionModal === "brief" ? (
          <DecisionBriefModal
            currentDecisionId={selectedDecisionId}
            onClose={closeDecisionFlow}
            onPreview={openDecisionPreview}
            onChoose={chooseDecision}
          />
        ) : null}

        {decisionModal === "preview" && previewOption ? (
          <DecisionPreviewModal
            currentDecisionId={selectedDecisionId}
            option={previewOption}
            onBack={() => setDecisionModal("brief")}
            onChoose={chooseDecision}
            onClose={closeDecisionFlow}
          />
        ) : null}
      </div>
    </>
  );
}
