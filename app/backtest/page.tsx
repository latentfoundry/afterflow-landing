import type { Metadata } from "next";
import { BacktestGate } from "./gate";

export const metadata: Metadata = {
  title: "Validation study | Afterflow",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function BacktestPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413]">
      <BacktestGate />
    </div>
  );
}
