const failurePaths = [
  {
    rank: "01",
    path: "Customer access failure",
    ripple: "Shared access dependency spills into support and branch channels.",
    severity: "Critical",
    evidence: "Medium-high",
    strength: 84,
    emphasis: "high",
  },
  {
    rank: "02",
    path: "Support overload",
    ripple: "Self-serve issues push demand beyond week-one capacity.",
    severity: "High",
    evidence: "Medium",
    strength: 72,
    emphasis: "medium",
  },
  {
    rank: "03",
    path: "Rollback gap",
    ripple: "Rollback plan exists, but owner and rehearsal evidence are weak.",
    severity: "High",
    evidence: "Medium",
    strength: 61,
    emphasis: "medium",
  },
] as const;

function BranchingPathBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="pathGlow" cx="70%" cy="48%" r="58%">
          <stop offset="0%" stopColor="rgba(146,122,202,0.38)" />
          <stop offset="48%" stopColor="rgba(45,74,122,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="pathSoftGlow" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1000" height="620" fill="url(#pathGlow)" opacity="0.86" />
      <g transform="translate(-78 0)" fill="none" strokeLinecap="round">
        <path
          d="M-40 318 C105 318 154 318 210 318"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.7"
        />
        <path
          d="M206 318 C326 184 392 118 574 118 L742 118"
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="1.65"
        />
        <path
          d="M206 318 C322 440 410 478 650 478 L780 478"
          stroke="rgba(255,255,255,0.24)"
          strokeWidth="1.65"
        />
        <path
          d="M206 318 C340 228 421 236 520 318 C636 414 734 318 970 318"
          stroke="rgba(229,176,79,0.96)"
          strokeWidth="3.1"
          filter="url(#pathSoftGlow)"
        />
        <path
          d="M520 318 C608 212 684 204 814 204 L948 204"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.55"
        />
        <path
          d="M520 318 C592 414 676 460 858 460"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.55"
        />
      </g>

      <g transform="translate(-78 0)">
        <circle cx="206" cy="318" r="6" fill="rgba(255,255,255,0.64)" />
        <circle cx="970" cy="318" r="19" fill="rgba(229,176,79,0.98)" />
        <circle cx="742" cy="118" r="6" fill="rgba(255,255,255,0.52)" />
        <circle cx="780" cy="478" r="6" fill="rgba(255,255,255,0.42)" />
        <circle cx="948" cy="204" r="6" fill="rgba(255,255,255,0.38)" />
        <circle cx="858" cy="460" r="6" fill="rgba(255,255,255,0.34)" />
      </g>
    </svg>
  );
}

export function PathComparisonIllustration() {
  return (
    <div
      data-nosnippet
      className="relative flex min-h-[32rem] items-center overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#050505] p-5 text-white shadow-[0_32px_110px_rgba(0,0,0,0.22)] sm:p-8 lg:min-h-[39rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(219,169,70,0.16),transparent_24%),radial-gradient(circle_at_76%_58%,rgba(83,99,174,0.28),transparent_30%),linear-gradient(180deg,#11151b_0%,#07080a_58%,#030303_100%)]" />
      <div className="absolute inset-0 opacity-[0.24] [background-image:radial-gradient(rgba(255,255,255,0.42)_1px,transparent_1px)] [background-size:3px_3px]" />
      <BranchingPathBackdrop />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0.1)_48%,rgba(0,0,0,0.34)_100%),linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.34))]" />

      <div className="relative z-10 ml-auto w-full max-w-[35rem] rounded-[1.45rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.3)] backdrop-blur-lg sm:p-7 lg:mr-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/46">
              Scenario map
            </p>
            <h3 className="mt-2 text-2xl font-light leading-tight sm:text-3xl">
              Top failure paths
            </h3>
          </div>
          <div className="hidden shrink-0 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-medium uppercase text-white/62 sm:block">
            Evidence
          </div>
        </div>

        <div className="mt-6 hidden grid-cols-[2.5rem_minmax(0,1fr)_4.8rem_5.2rem] px-4 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/42 sm:grid">
          <span>Rank</span>
          <span>Ripple effect</span>
          <span>Severity</span>
          <span>Strength</span>
        </div>

        <div className="mt-3 grid gap-3">
          {failurePaths.map((item) => (
            <div
              key={item.path}
              className={`grid gap-3 rounded-[1rem] border px-4 py-3 text-sm sm:grid-cols-[2.5rem_minmax(0,1fr)_4.8rem_5.2rem] sm:items-center ${
                item.emphasis === "high"
                  ? "border-white/18 bg-white/[0.14] text-white/84"
                  : "border-white/10 bg-white/[0.09] text-white/68"
              }`}
            >
              <span className="font-medium text-white/72">{item.rank}</span>
              <span>
                <span className="block font-medium text-white">{item.path}</span>
                <span className="mt-1 block text-white/62">{item.ripple}</span>
              </span>
              <span className="font-medium text-white">{item.severity}</span>
              <span className="font-medium text-white">{item.evidence}</span>
              <span className="inline-flex h-2 overflow-hidden rounded-full bg-white/14 sm:col-start-2 sm:col-span-3">
                <span
                  className={`block h-full rounded-full ${
                    item.emphasis === "high" ? "bg-white/78" : "bg-white/52"
                  }`}
                  style={{ width: `${item.strength}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
