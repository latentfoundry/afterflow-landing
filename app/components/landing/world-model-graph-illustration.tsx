type WorldModelNodeKind = "cohort" | "person" | "context";

type WorldModelNode = {
  id: string;
  label: string;
  displayLabel?: string[];
  eyebrow?: string;
  x: number;
  y: number;
  r: number;
  cluster: string;
  kind: WorldModelNodeKind;
  dark?: boolean;
  weight?: "high" | "medium" | "low";
};

type WorldModelLink = {
  from: string;
  to: string;
  strength?: "soft" | "base";
};

const worldModelNodes: WorldModelNode[] = [
  {
    id: "environment",
    eyebrow: "World model",
    label: "Migration environment",
    displayLabel: ["Migration", "environment"],
    x: 500,
    y: 358,
    r: 64,
    cluster: "core",
    kind: "cohort",
    weight: "high",
  },
  {
    id: "stakeholders",
    eyebrow: "Cohort",
    label: "Launch owners",
    displayLabel: ["Launch", "owners"],
    x: 626,
    y: 214,
    r: 58,
    cluster: "stakeholders",
    kind: "cohort",
    dark: true,
    weight: "high",
  },
  {
    id: "policy",
    eyebrow: "Constraint",
    label: "Controls boundary",
    displayLabel: ["Controls", "boundary"],
    x: 404,
    y: 224,
    r: 54,
    cluster: "policy",
    kind: "cohort",
    weight: "high",
  },
  {
    id: "evidence",
    eyebrow: "Evidence",
    label: "Approved sources",
    displayLabel: ["Approved", "sources"],
    x: 356,
    y: 396,
    r: 52,
    cluster: "evidence",
    kind: "cohort",
    weight: "medium",
  },
  {
    id: "dependencies",
    eyebrow: "Cohort",
    label: "System dependencies",
    displayLabel: ["System", "dependencies"],
    x: 686,
    y: 376,
    r: 54,
    cluster: "dependencies",
    kind: "cohort",
    weight: "high",
  },
  {
    id: "services",
    eyebrow: "System",
    label: "Downstream services",
    displayLabel: ["Downstream", "services"],
    x: 506,
    y: 524,
    r: 48,
    cluster: "services",
    kind: "cohort",
    weight: "medium",
  },
  {
    id: "regulatory",
    eyebrow: "Constraint",
    label: "Regulatory exposure",
    displayLabel: ["Regulatory", "exposure"],
    x: 678,
    y: 528,
    r: 46,
    cluster: "regulatory",
    kind: "cohort",
    weight: "medium",
  },
  {
    id: "mitigations",
    eyebrow: "Action",
    label: "Mitigation paths",
    displayLabel: ["Mitigation", "paths"],
    x: 394,
    y: 536,
    r: 42,
    cluster: "mitigations",
    kind: "cohort",
    weight: "high",
  },
  {
    id: "signals",
    eyebrow: "Signal",
    label: "Leading indicators",
    displayLabel: ["Leading", "indicators"],
    x: 780,
    y: 292,
    r: 44,
    cluster: "signals",
    kind: "cohort",
    weight: "high",
  },
  {
    id: "failure",
    eyebrow: "Risk",
    label: "Failure paths",
    displayLabel: ["Failure", "paths"],
    x: 286,
    y: 330,
    r: 40,
    cluster: "failure",
    kind: "cohort",
    weight: "high",
  },
  ...[
    ["finance", "Risk", "Team", 288, 160, 24, "stakeholders"],
    ["legal", "Legal", "Team", 742, 152, 23, "stakeholders"],
    ["security", "Security", "Team", 844, 236, 24, "stakeholders"],
    ["support", "Support", "Team", 226, 456, 24, "stakeholders"],
    ["ops", "Ops", "Actor", 230, 226, 24, "stakeholders"],
    ["vendor", "Vendor", "Actor", 812, 452, 23, "dependencies"],
    ["customer", "Customer", "Actor", 292, 552, 23, "services"],
    ["owner", "Owner", "Actor", 570, 592, 22, "stakeholders"],
    ["api", "API", "System", 846, 538, 24, "dependencies"],
    ["billing", "Billing", "System", 610, 626, 24, "dependencies"],
    ["identity", "Identity", "System", 480, 642, 23, "dependencies"],
    ["warehouse", "Warehouse", "System", 708, 646, 22, "dependencies"],
    ["runbook", "Runbook", "Evidence", 250, 510, 23, "evidence"],
    ["assumption", "Assumptions", "Evidence", 350, 482, 22, "evidence"],
    ["data-quality", "Source quality", "Evidence", 310, 94, 25, "evidence"],
    ["queue", "Queue", "Signal", 322, 674, 21, "signals"],
    ["capacity", "Capacity", "Signal", 724, 444, 22, "signals"],
    ["latency", "Latency", "Signal", 768, 548, 22, "signals"],
    ["demand", "Demand", "Signal", 804, 132, 24, "signals"],
    ["sla", "SLA", "Constraint", 218, 286, 24, "policy"],
    ["region", "Region", "Constraint", 404, 134, 23, "policy"],
    ["vendor-sla", "Vendor SLA", "Constraint", 894, 326, 24, "policy"],
    ["permissions", "Access", "Control", 602, 98, 25, "policy"],
    ["rollback", "Rollback", "Control", 514, 608, 22, "mitigations"],
    ["audit", "Audit", "Control", 734, 618, 21, "regulatory"],
    ["fallback", "Fallback", "Control", 414, 650, 23, "mitigations"],
    ["handoff", "Handoff", "Risk", 186, 346, 22, "failure"],
    ["support-load", "Support load", "Signal", 154, 500, 23, "signals"],
    ["change", "Change", "Control", 548, 654, 20, "mitigations"],
    ["comms", "Comms", "Team", 214, 592, 22, "stakeholders"],
    ["sre", "SRE", "Team", 874, 626, 22, "stakeholders"],
  ].map(([id, label, eyebrow, x, y, r, cluster]) => ({
    id: id as string,
    label: label as string,
    eyebrow: eyebrow as string,
    x: x as number,
    y: y as number,
    r: r as number,
    cluster: cluster as string,
    kind: "context" as const,
  })),
  ...[
    ["rf", "RF", 246, 118, "stakeholders"],
    ["fo", "FO", 338, 190, "stakeholders"],
    ["pl", "PL", 366, 92, "policy"],
    ["po", "PO", 484, 120, "policy"],
    ["ro", "RO", 782, 104, "policy"],
    ["cl", "CL", 792, 220, "policy"],
    ["sr", "SR", 884, 188, "stakeholders"],
    ["es", "ES", 686, 146, "stakeholders"],
    ["so", "SO", 176, 416, "services"],
    ["sm", "SM", 264, 470, "services"],
    ["co", "CO", 122, 572, "services"],
    ["ci", "CI", 210, 540, "services"],
    ["do", "DO", 334, 598, "evidence"],
    ["ds", "DS", 374, 622, "evidence"],
    ["eo", "EO", 330, 438, "evidence"],
    ["rr", "RR", 260, 360, "failure"],
    ["io", "IO", 456, 602, "dependencies"],
    ["ao", "AO", 792, 646, "regulatory"],
    ["ar", "AR", 708, 670, "regulatory"],
    ["bo", "BO", 608, 682, "dependencies"],
    ["cp", "CP", 756, 480, "signals"],
    ["co", "CO", 770, 420, "signals"],
    ["vo", "VO", 856, 402, "dependencies"],
    ["vc", "VC", 904, 394, "dependencies"],
    ["io", "IO", 872, 492, "dependencies"],
    ["ao", "AO", 922, 492, "dependencies"],
    ["io", "IO", 854, 684, "dependencies"],
    ["so", "SO", 924, 662, "stakeholders"],
    ["it", "IT", 468, 538, "services"],
    ["fa", "FA", 438, 586, "mitigations"],
    ["co", "CO", 146, 636, "stakeholders"],
    ["li", "LI", 196, 398, "signals"],
    ["or", "OR", 196, 144, "stakeholders"],
    ["ol", "OL", 154, 188, "stakeholders"],
    ["lo", "LO", 738, 82, "stakeholders"],
  ].map(([label, text, x, y, cluster]) => ({
    id: `${label}-${x}-${y}`,
    label: text as string,
    x: x as number,
    y: y as number,
    r: 16,
    cluster: cluster as string,
    kind: "person" as const,
  })),
];

const nodeById = new Map(worldModelNodes.map((node) => [node.id, node]));

const worldModelLinks: WorldModelLink[] = [
  ["environment", "stakeholders"],
  ["environment", "policy"],
  ["environment", "evidence"],
  ["environment", "dependencies"],
  ["environment", "services"],
  ["environment", "regulatory"],
  ["environment", "mitigations"],
  ["stakeholders", "finance"],
  ["stakeholders", "legal"],
  ["stakeholders", "security"],
  ["stakeholders", "support"],
  ["stakeholders", "ops"],
  ["stakeholders", "owner"],
  ["stakeholders", "sre"],
  ["policy", "sla"],
  ["policy", "region"],
  ["policy", "vendor-sla"],
  ["policy", "permissions"],
  ["evidence", "runbook"],
  ["evidence", "assumption"],
  ["evidence", "data-quality"],
  ["dependencies", "vendor"],
  ["dependencies", "api"],
  ["dependencies", "billing"],
  ["dependencies", "identity"],
  ["dependencies", "warehouse"],
  ["dependencies", "failure"],
  ["dependencies", "services"],
  ["services", "customer"],
  ["services", "support-load"],
  ["services", "comms"],
  ["regulatory", "audit"],
  ["regulatory", "legal"],
  ["signals", "capacity"],
  ["signals", "latency"],
  ["signals", "demand"],
  ["signals", "queue"],
  ["failure", "handoff"],
  ["failure", "sla"],
  ["failure", "mitigations"],
  ["mitigations", "rollback"],
  ["mitigations", "fallback"],
  ["mitigations", "change"],
].map(([from, to]) => ({ from, to, strength: "base" }));

const satelliteLinks: WorldModelLink[] = worldModelNodes
  .filter((node) => node.kind === "person")
  .map((node) => {
    const target =
      worldModelNodes.find(
        (candidate) =>
          candidate.cluster === node.cluster && candidate.kind === "cohort",
      ) || worldModelNodes[0];

    return {
      from: target.id,
      to: node.id,
      strength: "soft" as const,
    };
  });

const displayLabelById = {
  customer: ["Customers"],
  warehouse: ["Data", "store"],
  runbook: ["Runbook"],
  assumption: ["Key", "assumptions"],
  "data-quality": ["Source", "quality"],
  "vendor-sla": ["Vendor", "SLA"],
  rollback: ["Rollback"],
  fallback: ["Fallback"],
  handoff: ["Handoff"],
  "support-load": ["Support", "load"],
  capacity: ["Capacity"],
  latency: ["Latency"],
} as Record<string, string[]>;

const weightById = {
  support: "high",
  vendor: "high",
  customer: "medium",
  api: "high",
  identity: "medium",
  runbook: "medium",
  assumption: "medium",
  "data-quality": "medium",
  queue: "high",
  capacity: "high",
  latency: "medium",
  demand: "medium",
  sla: "medium",
  "vendor-sla": "medium",
  rollback: "high",
  fallback: "medium",
  handoff: "high",
  "support-load": "high",
  change: "medium",
} as Record<string, WorldModelNode["weight"]>;

const clusterFill = {
  core: "rgba(20,27,36,0.96)",
  stakeholders: "rgba(31,36,41,0.96)",
  policy: "rgba(49,34,13,0.94)",
  evidence: "rgba(34,23,50,0.94)",
  dependencies: "rgba(15,41,25,0.94)",
  services: "rgba(15,34,54,0.94)",
  regulatory: "rgba(15,41,25,0.92)",
  mitigations: "rgba(49,34,13,0.92)",
  signals: "rgba(15,34,54,0.92)",
  failure: "rgba(48,22,15,0.92)",
} as Record<string, string>;

const clusterStroke = {
  core: "rgba(178,205,255,0.56)",
  stakeholders: "rgba(255,255,255,0.18)",
  policy: "rgba(222,159,66,0.5)",
  evidence: "rgba(188,151,245,0.5)",
  dependencies: "rgba(112,202,143,0.46)",
  services: "rgba(139,190,255,0.48)",
  regulatory: "rgba(112,202,143,0.42)",
  mitigations: "rgba(222,159,66,0.46)",
  signals: "rgba(139,190,255,0.44)",
  failure: "rgba(218,110,76,0.46)",
} as Record<string, string>;

function getNodeFill(node: WorldModelNode) {
  if (node.kind === "person") {
    return "rgba(255,255,255,0.055)";
  }

  return clusterFill[node.cluster] || "rgba(20,27,36,0.96)";
}

function getNodeStroke(node: WorldModelNode) {
  return clusterStroke[node.cluster] || "rgba(255,255,255,0.72)";
}

function getNodeTextColor(node: WorldModelNode) {
  if (node.dark) {
    return "#f8f8f4";
  }

  if (node.kind === "person") {
    return "rgba(255,255,255,0.58)";
  }

  return "rgba(255,255,255,0.82)";
}

function getNodeWeight(node: WorldModelNode) {
  return node.weight || weightById[node.id] || (node.kind === "person" ? "low" : "medium");
}

function getNodeOpacity(node: WorldModelNode) {
  const weight = getNodeWeight(node);

  if (weight === "high") {
    return 1;
  }

  if (weight === "medium") {
    return 0.78;
  }

  return 0.48;
}

function getNodeLabelLines(node: WorldModelNode) {
  if (node.displayLabel) {
    return node.displayLabel;
  }

  if (displayLabelById[node.id]) {
    return displayLabelById[node.id];
  }

  const words = node.label.split(" ");

  if (node.kind === "context" && words.length > 1) {
    return words;
  }

  if (node.kind === "cohort" && words.length > 1) {
    return [words.slice(0, 1).join(" "), words.slice(1).join(" ")];
  }

  return [node.label];
}

function getLabelMetrics(node: WorldModelNode) {
  if (node.kind === "cohort") {
    return {
      fontSize: node.r >= 50 ? 8.5 : 7.6,
      lineHeight: node.r >= 50 ? 11 : 9.5,
      eyebrowSize: 5.2,
    };
  }

  if (node.kind === "context") {
    return {
      fontSize: node.r >= 24 ? 6.4 : 5.8,
      lineHeight: node.r >= 24 ? 7.6 : 6.8,
      eyebrowSize: 0,
    };
  }

  return {
    fontSize: 6,
    lineHeight: 6,
    eyebrowSize: 0,
  };
}

function WorldModelNodeShape({ node }: { node: WorldModelNode }) {
  const textColor = getNodeTextColor(node);
  const labelLines = getNodeLabelLines(node);
  const metrics = getLabelMetrics(node);
  const opacity = getNodeOpacity(node);
  const showEyebrow = node.kind === "cohort";
  const labelStartY = showEyebrow
    ? node.y + (labelLines.length > 1 ? 2 : 7)
    : node.y - ((labelLines.length - 1) * metrics.lineHeight) / 2 + 2;

  return (
    <g className="world-model-mock-node" opacity={opacity}>
      <circle
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill={getNodeFill(node)}
        stroke={getNodeStroke(node)}
        strokeWidth={node.kind === "person" ? 1.2 : 1.65}
        filter={node.dark ? "url(#worldModelDarkShadow)" : "url(#worldModelSoftShadow)"}
      />
      {node.kind !== "person" && (
        <circle
          cx={node.x + node.r * 0.43}
          cy={node.y - node.r * 0.42}
          r={Math.max(3.6, node.r * 0.075)}
          fill={getNodeStroke(node)}
          opacity={node.dark ? 0.72 : 0.86}
        />
      )}
      {node.kind === "person" ? (
        <text
          x={node.x}
          y={node.y + 3}
          textAnchor="middle"
          className="world-model-mock-person-text"
          fill={textColor}
        >
          {node.label}
        </text>
      ) : (
        <>
          {showEyebrow && (
            <text
              x={node.x}
              y={node.y - 8}
              textAnchor="middle"
              className="world-model-mock-eyebrow"
              fill="rgba(255,255,255,0.42)"
              style={{
                fontSize: metrics.eyebrowSize,
                letterSpacing: "0.14em",
              }}
            >
              {node.eyebrow}
            </text>
          )}
          <text
            x={node.x}
            y={labelStartY}
            textAnchor="middle"
            className="world-model-mock-label"
            fill={textColor}
            style={{
              fontSize: metrics.fontSize,
              letterSpacing: "0.01em",
            }}
          >
            {labelLines.map((line, index) => (
              <tspan key={`${line}-${index}`} x={node.x} dy={index === 0 ? 0 : metrics.lineHeight}>
                {line}
              </tspan>
            ))}
          </text>
        </>
      )}
    </g>
  );
}

function WorldModelLinkShape({ link }: { link: WorldModelLink }) {
  const from = nodeById.get(link.from);
  const to = nodeById.get(link.to);

  if (!from || !to) {
    return null;
  }

  const targetOpacity = getNodeOpacity(to);
  const opacity =
    link.strength === "soft"
      ? 0.12 + targetOpacity * 0.18
      : 0.18 + targetOpacity * 0.38;
  const width = link.strength === "soft" ? 0.9 : 1.32;
  const stroke =
    link.strength === "soft"
      ? "rgba(255,255,255,0.18)"
      : getNodeStroke(to);

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

export function WorldModelGraphIllustration() {
  const clusters = Array.from(
    new Set(worldModelNodes.map((node) => node.cluster)),
  );

  return (
    <div
      data-nosnippet
      className="world-model-mock relative min-h-[34rem] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#050505] shadow-[0_32px_110px_rgba(0,0,0,0.22)] lg:min-h-[39rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_29%,rgba(38,84,132,0.3),transparent_26%),radial-gradient(circle_at_31%_23%,rgba(150,100,26,0.24),transparent_23%),radial-gradient(circle_at_72%_69%,rgba(38,108,67,0.22),transparent_24%),radial-gradient(circle_at_42%_70%,rgba(92,45,122,0.22),transparent_25%),linear-gradient(180deg,#12161a_0%,#070808_58%,#030303_100%)]" />

      <svg
        role="img"
        aria-label="World model graph showing decision environment, cohorts, systems, evidence, policy, signals, and responsible people."
        viewBox="0 0 1000 700"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="worldModelSoftShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="rgba(0,0,0,0.46)" />
          </filter>
          <filter id="worldModelDarkShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="rgba(0,0,0,0.58)" />
          </filter>
          <pattern id="worldModelGrid" width="54" height="54" patternUnits="userSpaceOnUse">
            <path d="M54 0H0V54" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="1000" height="700" fill="url(#worldModelGrid)" opacity="0.54" />
        <g transform="translate(0 -38)">
          <ellipse cx="520" cy="358" rx="360" ry="248" fill="rgba(255,255,255,0.025)" />

          <g className="world-model-mock-links">
            {[...worldModelLinks, ...satelliteLinks].map((link) => (
              <WorldModelLinkShape key={`${link.from}-${link.to}`} link={link} />
            ))}
          </g>

          {clusters.map((cluster) => (
            <g
              key={cluster}
              className="world-model-mock-cluster"
            >
              {worldModelNodes
                .filter((node) => node.cluster === cluster)
                .map((node) => (
                  <WorldModelNodeShape key={node.id} node={node} />
                ))}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
