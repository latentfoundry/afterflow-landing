"use client";

import { useId, useState, useTransition } from "react";

const requestAccessEndpoint =
  process.env.NEXT_PUBLIC_REQUEST_ACCESS_ENDPOINT?.trim() ?? "";

const teamOptions = [
  "Communications",
  "Legal",
  "Risk",
  "Security",
  "Executive",
  "Operations",
  "Other",
] as const;

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

export function RequestAccessForm() {
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

  const resetForm = () => {
    setFormState(getEmptyState());
    setStepIndex(0);
    setEmailTouched(false);
    setSubmitError("");
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLastStep) {
      goForward();
      return;
    }

    if (!requestAccessEndpoint) {
      setSubmitError(
        "This form is not configured yet. Add NEXT_PUBLIC_REQUEST_ACCESS_ENDPOINT before deploying.",
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
            source: "landing-request-access",
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
  const cardLabel =
    currentStep === "email"
      ? "Step 1 of 4"
      : currentStep === "identity"
        ? "Step 2 of 4"
        : currentStep === "team"
          ? "Step 3 of 4"
          : "Step 4 of 4";

  if (submitted) {
    return (
      <div className="overflow-hidden rounded-[26px] border border-black/10 bg-black text-[#f3efe8]">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
            Request Received
          </p>
        </div>
        <div className="space-y-5 px-5 py-6 sm:px-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/24 bg-emerald-400/10 text-sm font-medium text-emerald-200">
            OK
          </div>
          <div className="space-y-3">
            <p className="text-3xl font-black leading-none tracking-[-0.05em] text-white">
              You are in.
            </p>
            <p className="text-base leading-7 text-white/68">
              Thanks. We read every request personally and follow up directly if there is
              a fit.
            </p>
            <p className="text-sm leading-6 text-white/42">
              No confidential incident details were needed here, which is exactly how this
              should work.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex min-h-12 items-center justify-center border border-white/12 px-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white/24 hover:bg-white/5"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[26px] border border-black/10 bg-black text-[#f3efe8] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/38">
            {cardLabel}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/24">
            One required field
          </p>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#f7b0c1] transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-6">
        {currentStep === "email" ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-3xl font-black leading-none tracking-[-0.05em] text-white">
                What is the best work email to reach you on?
              </p>
              <p className="max-w-md text-sm leading-6 text-white/45">
                This is the only required field. Everything else is optional.
              </p>
            </div>
            <div className="space-y-2">
              <input
                autoFocus
                type="email"
                inputMode="email"
                autoComplete="email"
                value={formState.email}
                onBlur={() => setEmailTouched(true)}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@company.com"
                className="min-h-14 w-full border border-white/12 bg-white/4 px-4 text-base text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#f7b0c1]/55"
              />
              {emailTouched && !isEmailValid ? (
                <p className="text-sm leading-6 text-rose-200">
                  Enter a valid email so we have a way to follow up.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {currentStep === "identity" ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-3xl font-black leading-none tracking-[-0.05em] text-white">
                What should we call you?
              </p>
              <p className="max-w-md text-sm leading-6 text-white/45">
                First name and company are both optional, but they make the follow-up easier.
              </p>
            </div>
            <div className="space-y-3">
              <input
                autoFocus
                type="text"
                autoComplete="given-name"
                value={formState.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                placeholder="First name"
                className="min-h-14 w-full border border-white/12 bg-white/4 px-4 text-base text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#f7b0c1]/55"
              />
              <input
                type="text"
                autoComplete="organization"
                value={formState.company}
                onChange={(event) => updateField("company", event.target.value)}
                placeholder="Company"
                className="min-h-14 w-full border border-white/12 bg-white/4 px-4 text-base text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#f7b0c1]/55"
              />
            </div>
          </div>
        ) : null}

        {currentStep === "team" ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-3xl font-black leading-none tracking-[-0.05em] text-white">
                Which team are you closest to?
              </p>
              <p className="max-w-md text-sm leading-6 text-white/45">
                Optional. This just helps us pattern-match who is finding this useful.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {teamOptions.map((team) => {
                const isActive = formState.team === team;

                return (
                  <button
                    key={team}
                    type="button"
                    onClick={() => updateField("team", isActive ? "" : team)}
                    className={`inline-flex min-h-11 items-center justify-center border px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-[#f7b0c1] bg-[#f7b0c1]/14 text-white"
                        : "border-white/12 bg-white/4 text-white/72 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {team}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {currentStep === "note" ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-3xl font-black leading-none tracking-[-0.05em] text-white">
                Anything helpful to know before we reach out?
              </p>
              <p className="max-w-md text-sm leading-6 text-white/45">
                Optional. One line is enough. Please do not include confidential incident
                details.
              </p>
            </div>
            <textarea
              autoFocus
              rows={4}
              maxLength={280}
              value={formState.note}
              onChange={(event) => updateField("note", event.target.value)}
              placeholder="We are exploring this for incident comms and executive decision rehearsals."
              className="w-full resize-none border border-white/12 bg-white/4 px-4 py-3 text-base leading-7 text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#f7b0c1]/55"
            />
            <p className="text-right text-[11px] font-medium uppercase tracking-[0.28em] text-white/24">
              {formState.note.length}/280
            </p>
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

        {submitError ? (
          <p className="text-sm leading-6 text-rose-200">{submitError}</p>
        ) : (
          <p className="text-sm leading-6 text-white/34">
            We only ask for enough information to contact you back.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-12 items-center justify-center border border-white/12 px-4 text-sm font-medium uppercase tracking-[0.18em] text-white/72 transition-colors hover:border-white/24 hover:text-white"
            >
              Back
            </button>
          ) : null}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-12 min-w-40 items-center justify-center bg-[#f3efe8] px-5 text-sm font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-white disabled:cursor-wait disabled:bg-[#f3efe8]/75"
          >
            {isPending ? "Submitting" : isLastStep ? "Request Access" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
