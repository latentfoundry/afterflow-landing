"use client";

import dynamic from "next/dynamic";

const ProofPanel = dynamic(
  () => import("./proof-panel").then((mod) => mod.ProofPanel),
  {
    ssr: false,
    loading: () => (
      <div
        data-nosnippet
        aria-hidden="true"
        className="mt-12 border border-white/10 bg-[#020202]"
      >
        <div className="min-h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] sm:min-h-[520px]" />
      </div>
    ),
  },
);

export function ProofPanelShell() {
  return <ProofPanel />;
}
