"use client";

import { useEffect, useRef, useState } from "react";
import { ContextGraphIllustration } from "./context-graph-illustration";
import { PathComparisonIllustration } from "./path-comparison-illustration";
import { WorldModelGraphIllustration } from "./world-model-graph-illustration";
import { workflowSteps } from "../../lib/landing-content";
import { requestAccessHref } from "../../lib/site";

type WorkflowStep = (typeof workflowSteps)[number];

function WorkflowVideoFrame({ step }: { step: WorkflowStep }) {
  if (step.animation === "context") {
    return <ContextGraphIllustration />;
  }

  if (step.animation === "model") {
    return <WorldModelGraphIllustration />;
  }

  if (step.animation === "simulation") {
    return <PathComparisonIllustration />;
  }

  return null;
}

export function WorkflowShowcase() {
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const index = Number(
          (visible.target as HTMLElement).dataset.workflowIndex,
        );

        if (!Number.isNaN(index)) {
          setActiveStep(index);
        }
      },
      {
        rootMargin: "-30% 0px -38% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    stepRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="workflow"
      className="scroll-mt-24 bg-white px-5 py-24 text-black sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[94rem]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[clamp(3rem,6.2vw,6.7rem)] font-light leading-[1.06]">
            Connect the context. Run agent simulations.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-black/58">
            Afterflow structures messy context into a world model, then runs
            stakeholder agents against it to rank evidence-backed paths.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={requestAccessHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-black px-7 text-sm font-medium text-white transition hover:bg-black/82"
            >
              Request access
            </a>
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[30rem_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-32 lg:h-max">
            <ol className="space-y-5 text-2xl leading-8 text-black/42 lg:text-[2.35rem] lg:leading-[1.12]">
              {workflowSteps.map((step, index) => (
                <li
                  key={step.title}
                  className={`flex gap-3 transition-colors duration-300 ${
                    activeStep === index ? "text-black" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1 shrink-0 whitespace-nowrap text-xl transition-opacity ${
                      activeStep === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    -&gt;
                  </span>
                  <span className="lg:whitespace-nowrap">{step.title}</span>
                </li>
              ))}
            </ol>
          </aside>

          <div className="space-y-20">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-workflow-index={index}
                className="grid min-h-svh items-center gap-8"
              >
                <WorkflowVideoFrame step={step} />
                <div className="max-w-3xl pb-10 lg:pb-20">
                  <p className="text-xs font-medium uppercase text-black/38">
                    {step.eyebrow}
                  </p>
                  <h3 className="mt-3 text-3xl font-medium leading-tight text-black sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-xl leading-8 text-black/58">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
