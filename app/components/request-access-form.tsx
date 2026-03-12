"use client";

import Link from "next/link";
import { useId, useState, useTransition } from "react";

const requestAccessEndpoint =
  process.env.NEXT_PUBLIC_REQUEST_ACCESS_ENDPOINT?.trim() ?? "";
const appsScriptWebAppPattern =
  /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/(?:exec|dev)\/?$/;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const totalSteps = 4;

type StepKey = "email" | "identity" | "team" | "note";

type FormState = {
  company: string;
  email: string;
  firstName: string;
  honeypot: string;
  note: string;
  team: string;
};

const stepOrder: StepKey[] = ["email", "identity", "team", "note"];

const stepContent: Record<
  StepKey,
  {
    description: string;
    prompt: string;
  }
> = {
  email: {
    description: "",
    prompt: "What is your work email?",
  },
  identity: {
    description: "",
    prompt: "What is your name?",
  },
  team: {
    description: "",
    prompt: "Which industry or sector are you in?",
  },
  note: {
    description: "",
    prompt: "Anything else you'd like to add?",
  },
};

function getEmptyState(): FormState {
  return {
    company: "",
    email: "",
    firstName: "",
    honeypot: "",
    note: "",
    team: "",
  };
}

export function RequestAccessFormInner({ source }: { source: string }) {
  const honeypotId = useId();
  const [formState, setFormState] = useState<FormState>(getEmptyState);
  const [stepIndex, setStepIndex] = useState(0);
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [isPending, startTransition] = useTransition();

  const currentStep = stepOrder[stepIndex];
  const isEmailValid = emailPattern.test(formState.email.trim());
  const isLastStep = stepIndex === totalSteps - 1;
  const canAdvance = currentStep !== "email" || isEmailValid;
  const hasEndpoint = requestAccessEndpoint.length > 0;
  const hasValidEndpoint = appsScriptWebAppPattern.test(requestAccessEndpoint);

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const goBack = () => {
    setSubmitError("");
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const goForward = () => {
    if (!canAdvance) {
      setEmailTouched(true);
      return;
    }

    setSubmitError("");
    setStepIndex((current) => Math.min(current + 1, totalSteps - 1));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLastStep) {
      goForward();
      return;
    }

    if (!hasEndpoint) {
      setSubmitError(
        "This form is not configured yet. Add NEXT_PUBLIC_REQUEST_ACCESS_ENDPOINT before deploying.",
      );
      return;
    }

    if (!hasValidEndpoint) {
      setSubmitError(
        "The request endpoint is not a deployed Apps Script web app URL. Use the /macros/s/.../exec URL, not a library URL.",
      );
      return;
    }

    startTransition(async () => {
      setSubmitError("");

      try {
        const submittedAt = Date.now();

        await fetch(requestAccessEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            company: formState.company.trim(),
            durationMs: submittedAt - startedAt,
            email: formState.email.trim(),
            firstName: formState.firstName.trim(),
            formVersion: 1,
            honeypot: formState.honeypot.trim(),
            note: formState.note.trim(),
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            source,
            startedAt: new Date(startedAt).toISOString(),
            submittedAt: new Date(submittedAt).toISOString(),
            team: formState.team,
          }),
        });

        setSubmitted(true);
      } catch {
        setSubmitError("We could not send that just now. Please try again.");
      }
    });
  };

  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const currentContent = stepContent[currentStep];
  const stepLabel =
    currentStep === "email"
      ? "Step 1 of 4"
      : currentStep === "identity"
        ? "Step 2 of 4"
        : currentStep === "team"
          ? "Step 3 of 4"
          : "Step 4 of 4";

  if (submitted) {
    return (
      <div className="w-full border border-black/10 bg-[#ece8e1] shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.32em] text-black/35">
            <p>Enterprise Access</p>
            <p>Submitted</p>
          </div>
          <div className="mt-4 h-px bg-black/10" />
          <div className="space-y-8 py-10 sm:py-14">
            <div className="space-y-5">
              <p className="max-w-5xl text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[0.92] tracking-[-0.08em] text-black">
                Thank you.
              </p>
              <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
                We will reach out shortly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-black/10 pt-8">
              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88"
              >
                Back To Landing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-black/10 bg-[#ece8e1] shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
      <div className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.32em] text-black/35">
          <p>Enterprise Access</p>
          <p>{stepLabel}</p>
        </div>
        <div className="mt-4 h-1 overflow-hidden bg-black/10">
          <div
            className="h-full bg-black transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-10 pb-2 pt-10 sm:pb-4 sm:pt-14 lg:pt-12">
            <div className="max-w-5xl space-y-5">
              <p className="text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[0.92] tracking-[-0.08em] text-black">
                {currentContent.prompt}
              </p>
              {currentContent.description ? (
                <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
                  {currentContent.description}
                </p>
              ) : null}
            </div>

            {currentStep === "email" ? (
              <div className="max-w-[760px] space-y-3">
                <label
                  htmlFor="request-access-email"
                  className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35"
                >
                  Work Email *
                </label>
                <input
                  id="request-access-email"
                  autoFocus
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={formState.email}
                  name="email"
                  onBlur={() => setEmailTouched(true)}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="jane@acme.com"
                  className="min-h-20 w-full border border-black/18 bg-[#f4f0ea] px-5 text-[clamp(1.5rem,3vw,2.15rem)] tracking-[-0.04em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
                />
                {emailTouched && !isEmailValid ? (
                  <p className="text-sm leading-6 text-rose-700">
                    Enter a valid email so we know where to reply.
                  </p>
                ) : null}
              </div>
            ) : null}

            {currentStep === "identity" ? (
              <div className="grid max-w-[960px] gap-5 sm:grid-cols-2">
                <div className="space-y-3">
                  <label
                    htmlFor="request-access-name"
                    className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35"
                  >
                    Name
                  </label>
                  <input
                    id="request-access-name"
                    autoFocus
                    type="text"
                    autoComplete="name"
                    value={formState.firstName}
                    name="name"
                    onChange={(event) => updateField("firstName", event.target.value)}
                    placeholder="Jane Doe"
                    className="min-h-20 w-full border border-black/18 bg-[#f4f0ea] px-5 text-[clamp(1.5rem,3vw,2.15rem)] tracking-[-0.04em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
                  />
                </div>
                <div className="space-y-3">
                  <label
                    htmlFor="request-access-company"
                    className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35"
                  >
                    Company
                  </label>
                  <input
                    id="request-access-company"
                    type="text"
                    autoComplete="organization"
                    value={formState.company}
                    name="company"
                    onChange={(event) => updateField("company", event.target.value)}
                    placeholder="ACME Corporation"
                    className="min-h-20 w-full border border-black/18 bg-[#f4f0ea] px-5 text-[clamp(1.5rem,3vw,2.15rem)] tracking-[-0.04em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
                  />
                </div>
              </div>
            ) : null}

            {currentStep === "team" ? (
              <div className="max-w-[760px] space-y-3">
                <label
                  htmlFor="request-access-sector"
                  className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35"
                >
                  Industry / Sector
                </label>
                <input
                  id="request-access-sector"
                  autoFocus
                  type="text"
                  autoComplete="organization-title"
                  value={formState.team}
                  name="industry"
                  onChange={(event) => updateField("team", event.target.value)}
                  placeholder="Financial services"
                  className="min-h-20 w-full border border-black/18 bg-[#f4f0ea] px-5 text-[clamp(1.5rem,3vw,2.15rem)] tracking-[-0.04em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
                />
              </div>
            ) : null}

            {currentStep === "note" ? (
              <div className="max-w-[920px] space-y-3">
                <label
                  htmlFor="request-access-note"
                  className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/35"
                >
                  Additional Information
                </label>
                <textarea
                  id="request-access-note"
                  autoFocus
                  rows={5}
                  maxLength={280}
                  value={formState.note}
                  name="note"
                  onChange={(event) => updateField("note", event.target.value)}
                  placeholder="Share anything else you would like us to know about your company, timing, or how you might use Afterflow."
                  className="w-full resize-none border border-black/18 bg-[#f4f0ea] px-5 py-5 text-[clamp(1.1rem,2vw,1.45rem)] leading-8 tracking-[-0.03em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
                />
              </div>
            ) : null}

            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={honeypotId}>Website</label>
              <input
                id={honeypotId}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formState.honeypot}
                onChange={(event) => updateField("honeypot", event.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-black/10 pt-8">
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex min-h-14 items-center justify-center border border-black/12 px-6 text-sm font-medium uppercase tracking-[0.18em] text-black/72 transition-colors hover:border-black/24 hover:text-black"
                >
                  Back
                </button>
              ) : null}
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex min-h-14 min-w-40 items-center justify-center bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88 disabled:cursor-wait disabled:bg-black/72"
              >
                {isPending ? "Submitting" : isLastStep ? "Submit" : "Continue"}
              </button>
              {submitError ? (
                <p className="text-sm leading-6 text-rose-700">{submitError}</p>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
