import type { CSSProperties } from "react";

import {
  BookOpen,
  Building2,
  Check,
  Cloud,
  Database,
  FolderOpen,
  MessagesSquare,
  Network,
  Newspaper,
  ScrollText,
  ServerCog,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type GraphNodeData = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  glow: string;
  ring: string;
  className: string;
  tooltipClassName: string;
};

const sourceNodes: GraphNodeData[] = [
  {
    id: "onedrive",
    label: "OneDrive",
    eyebrow: "Internal sources",
    description:
      "Only approved sources are in scope. Connectors are read-only, and access is limited to the scenario being analysed.",
    Icon: Cloud,
    color: "#4f7fd4",
    glow: "rgba(79,127,212,0.18)",
    ring: "rgba(79,127,212,0.22)",
    className: "left-[5%] top-[14%]",
    tooltipClassName: "left-full ml-3 top-1/2 -translate-y-1/2",
  },
  {
    id: "sharepoint",
    label: "SharePoint",
    eyebrow: "Internal sources",
    description:
      "Only approved sources are in scope. Connectors are read-only, and access is limited to the scenario being analysed.",
    Icon: FolderOpen,
    color: "#39a77b",
    glow: "rgba(57,167,123,0.18)",
    ring: "rgba(57,167,123,0.22)",
    className: "left-[5%] top-[32%]",
    tooltipClassName: "left-full ml-3 top-1/2 -translate-y-1/2",
  },
  {
    id: "confluence",
    label: "Confluence",
    eyebrow: "Internal sources",
    description:
      "Only approved sources are in scope. Connectors are read-only, and access is limited to the scenario being analysed.",
    Icon: BookOpen,
    color: "#8460d2",
    glow: "rgba(132,96,210,0.18)",
    ring: "rgba(132,96,210,0.22)",
    className: "left-[5%] top-[50%]",
    tooltipClassName: "left-full ml-3 top-1/2 -translate-y-1/2",
  },
  {
    id: "docs-dbs",
    label: "Internal docs, DBs, APIs",
    eyebrow: "Internal sources",
    description:
      "Only approved sources are in scope. Connectors are read-only, and access is limited to the scenario being analysed.",
    Icon: Database,
    color: "#c8932e",
    glow: "rgba(200,147,46,0.18)",
    ring: "rgba(200,147,46,0.22)",
    className: "left-[5%] top-[68%]",
    tooltipClassName: "left-full ml-3 bottom-0",
  },
];

const externalNodes: GraphNodeData[] = [
  {
    id: "public-docs-filings",
    label: "Public docs and filings",
    eyebrow: "External context",
    description:
      "Public documents, filings, disclosures, and web pages pulled into the same environment.",
    Icon: ScrollText,
    color: "#39a77b",
    glow: "rgba(57,167,123,0.18)",
    ring: "rgba(57,167,123,0.22)",
    className: "right-[5%] top-[14%]",
    tooltipClassName: "right-full mr-3 top-1/2 -translate-y-1/2",
  },
  {
    id: "company-vendor-mentions",
    label: "Company and vendor mentions",
    eyebrow: "External context",
    description:
      "Mentions of companies, vendors, partners, and customers from public web sources.",
    Icon: Building2,
    color: "#8460d2",
    glow: "rgba(132,96,210,0.18)",
    ring: "rgba(132,96,210,0.22)",
    className: "right-[5%] top-[32%]",
    tooltipClassName: "right-full mr-3 top-1/2 -translate-y-1/2",
  },
  {
    id: "news-market-context",
    label: "News and market context",
    eyebrow: "External context",
    description:
      "Public updates that add timing, event, and market context to the scenario.",
    Icon: Newspaper,
    color: "#c8932e",
    glow: "rgba(200,147,46,0.18)",
    ring: "rgba(200,147,46,0.22)",
    className: "right-[5%] top-[50%]",
    tooltipClassName: "right-full mr-3 top-1/2 -translate-y-1/2",
  },
  {
    id: "social-community-signals",
    label: "Social and community signals",
    eyebrow: "External context",
    description:
      "Public social media and community signals that may shape customer or stakeholder reaction.",
    Icon: MessagesSquare,
    color: "#dc6f36",
    glow: "rgba(220,111,54,0.18)",
    ring: "rgba(220,111,54,0.22)",
    className: "right-[5%] top-[68%]",
    tooltipClassName: "right-full mr-3 bottom-0",
  },
];

const privacyControls = [
  {
    label: "Private instance",
    description:
      "Afterflow can run in a dedicated customer-controlled environment, aligned to the customer's cloud, network, and access controls.",
    Icon: ServerCog,
  },
  {
    label: "Approved data boundary",
    description:
      "Only approved sources are in scope. Connectors are read-only, and access is limited to the scenario being analysed.",
    Icon: ShieldCheck,
  },
];

const connectionPaths = [
  "M178 118 H292 Q358 118 358 214 V272 Q358 300 404 300 H438",
  "M178 226 H300 Q358 226 358 272 Q358 300 404 300 H438",
  "M178 334 H438",
  "M178 442 H300 Q358 442 358 342 Q358 304 404 304 H438",
  "M562 286 H622 Q684 286 684 214 V128 Q684 112 728 112 H822",
  "M562 300 H622 Q684 300 684 252 Q684 226 728 226 H822",
  "M562 318 H640 Q684 318 684 338 H822",
  "M562 334 H622 Q684 334 684 414 Q684 448 728 448 H822",
];

function GraphNode({
  label,
  eyebrow,
  description,
  Icon,
  color,
  glow,
  ring,
  className,
  tooltipClassName,
}: GraphNodeData) {
  return (
    <button
      type="button"
      aria-label={`${label}: ${description}`}
      className={`context-graph-node group/node absolute z-20 grid h-14 w-14 cursor-help place-items-center rounded-[0.95rem] border border-white/60 backdrop-blur-xl outline-none transition hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-black/18 sm:h-20 sm:w-20 sm:rounded-[1.05rem] lg:h-24 lg:w-24 ${className}`}
      style={
        {
          "--context-node-accent": color,
          "--context-node-glow": glow,
          "--context-node-ring": ring,
        } as CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full sm:right-4 sm:top-4 sm:h-2 sm:w-2"
        style={{ backgroundColor: color }}
      />
      <Icon
        aria-hidden="true"
        className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
        color={color}
        strokeWidth={1.7}
      />
      <span
        className={`pointer-events-none absolute z-30 hidden w-60 rounded-2xl border border-white/60 bg-white/80 p-4 text-left text-xs leading-5 text-black/58 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl group-hover/node:block group-focus-visible/node:block ${tooltipClassName}`}
      >
        <span className="mb-1 block text-[0.65rem] font-medium uppercase tracking-[0.08em] text-black/36">
          {eyebrow}
        </span>
        <span className="mb-1 block text-sm font-medium text-black">
          {label}
        </span>
        {description}
      </span>
    </button>
  );
}

export function ContextGraphIllustration() {
  return (
    <div
      data-nosnippet
      className="relative min-h-[34rem] overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#f4f3ef] shadow-[0_28px_90px_rgba(0,0,0,0.07)] lg:min-h-[39rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(132,96,210,0.18),transparent_28%),radial-gradient(circle_at_22%_18%,rgba(79,127,212,0.16),transparent_25%),radial-gradient(circle_at_78%_24%,rgba(57,167,123,0.16),transparent_24%),radial-gradient(circle_at_76%_72%,rgba(200,147,46,0.14),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.93),rgba(244,243,239,0.98))]" />

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="contextGraphLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(79,127,212,0.58)" />
            <stop offset="46%" stopColor="rgba(132,96,210,0.44)" />
            <stop offset="100%" stopColor="rgba(57,167,123,0.48)" />
          </linearGradient>
        </defs>
        <g
          className="context-graph-lines"
          fill="none"
          stroke="url(#contextGraphLineGradient)"
          opacity="0.44"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        >
          {connectionPaths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
      </svg>

      <div className="absolute left-[5%] top-6 z-20 rounded-full border border-black/8 bg-white/50 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-black/42 backdrop-blur-xl">
        Internal context
      </div>
      <div className="absolute right-[5%] top-6 z-20 rounded-full border border-black/8 bg-white/50 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-black/42 backdrop-blur-xl">
        External context
      </div>

      {sourceNodes.map((node) => (
        <GraphNode key={node.id} {...node} />
      ))}

      {externalNodes.map((node) => (
        <GraphNode key={node.id} {...node} />
      ))}

      <div className="context-graph-core-card absolute left-1/2 top-1/2 z-10 flex h-44 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.7rem] border border-white/60 backdrop-blur-xl sm:h-56 sm:w-72 sm:rounded-[2rem]">
        <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:right-5 sm:top-5 sm:h-9 sm:w-9">
          <Check aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>

        <div className="grid place-items-center gap-3 text-center">
          <div className="context-graph-core-pulse absolute h-32 w-32 rounded-full border border-black/10 sm:h-44 sm:w-44" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full border-[5px] border-black/8 bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:h-32 sm:w-32 sm:border-[6px]">
            <Network
              aria-hidden="true"
              className="h-12 w-12 text-black/60 sm:h-16 sm:w-16"
              strokeWidth={1.55}
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-black/38">
              World model
            </p>
            <p className="mt-1 text-sm font-medium text-black sm:text-base">
              Teams, stakeholders, dependencies
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col gap-2 sm:w-auto sm:flex-row">
        {privacyControls.map(({ label, description, Icon }) => (
          <div
            key={label}
            className="group/control relative flex items-center justify-center gap-2 rounded-full border border-black/8 bg-white/50 px-3 py-2 text-xs font-medium text-black/56 backdrop-blur-xl"
          >
            <Icon aria-hidden="true" className="h-4 w-4 text-black/42" />
            {label}
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-64 -translate-x-1/2 rounded-2xl border border-white/60 bg-white/85 p-4 text-left text-xs leading-5 text-black/58 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl group-hover/control:block">
              <span className="mb-1 block text-sm font-medium text-black">
                {label}
              </span>
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
