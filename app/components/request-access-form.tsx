"use client";

import { useId, useState, useTransition } from "react";

const requestAccessEndpoint =
  process.env.NEXT_PUBLIC_REQUEST_ACCESS_ENDPOINT?.trim() ?? "";
const appsScriptWebAppPattern =
  /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/(?:exec|dev)\/?$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formulaPrefixPattern = /^[=+\-@]/;
const submitThrottleKey = "afterflow-request-access-last-submit";
const submitThrottleMs = 60_000;

type StepKey = "email" | "identity" | "note";

type FormState = {
  company: string;
  email: string;
  firstName: string;
  honeypot: string;
  note: string;
};

const stepOrder: StepKey[] = ["email", "identity", "note"];

const stepContent: Record<StepKey, { label: string; prompt: string }> = {
  email: {
    label: "Contact email",
    prompt: "Contact email",
  },
  identity: {
    label: "Name and company",
    prompt: "Name and company",
  },
  note: {
    label: "Additional information",
    prompt: "Additional information",
  },
};

function sanitizeSingleLine(value: string) {
  const normalized = value.replace(/\u0000/g, "").replace(/\s+/g, " ").trim();

  return formulaPrefixPattern.test(normalized)
    ? `\u200B${normalized}`
    : normalized;
}

function sanitizeMultiline(value: string) {
  const normalized = value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim();

  return formulaPrefixPattern.test(normalized.trimStart())
    ? `\u200B${normalized}`
    : normalized;
}

function getLastSubmitAt() {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    return Number(window.localStorage.getItem(submitThrottleKey) || "0") || 0;
  } catch {
    return 0;
  }
}

export function RequestAccessFormInner({ source }: { source: string }) {
  const honeypotId = useId();
  const [formState, setFormState] = useState<FormState>({
    company: "",
    email: "",
    firstName: "",
    honeypot: "",
    note: "",
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [showEmailError, setShowEmailError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [isPending, startTransition] = useTransition();

  const currentStep = stepOrder[stepIndex];
  const currentContent = stepContent[currentStep];
  const isEmailValid = emailPattern.test(formState.email.trim());
  const isLastStep = stepIndex === stepOrder.length - 1;
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
    if (currentStep === "email" && !isEmailValid) {
      setShowEmailError(true);
      return;
    }

    setShowEmailError(false);
    setSubmitError("");
    setStepIndex((current) => Math.min(current + 1, stepOrder.length - 1));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLastStep) {
      goForward();
      return;
    }

    if (!hasEndpoint || !hasValidEndpoint) {
      setSubmitError("This form is not configured yet.");
      return;
    }

    const lastSubmitAt = getLastSubmitAt();
    if (Date.now() - lastSubmitAt < submitThrottleMs) {
      setSubmitError("Please wait a minute before sending another message.");
      return;
    }

    startTransition(async () => {
      setSubmitError("");

      try {
        const submittedAt = Date.now();
        const payload = {
          company: sanitizeSingleLine(formState.company),
          durationMs: submittedAt - startedAt,
          email: sanitizeSingleLine(formState.email),
          firstName: sanitizeSingleLine(formState.firstName),
          formVersion: 1,
          honeypot: formState.honeypot.trim(),
          note: sanitizeMultiline(formState.note),
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          source,
          startedAt: new Date(startedAt).toISOString(),
          submittedAt: new Date(submittedAt).toISOString(),
          team: "",
        };

        await fetch(requestAccessEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        try {
          window.localStorage.setItem(submitThrottleKey, String(submittedAt));
        } catch {
          // The message can still submit if localStorage is unavailable.
        }

        setSubmitted(true);
      } catch {
        setSubmitError("We could not send that just now. Please try again.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="min-h-[18rem] bg-[#ece8e1] p-8 sm:p-10 lg:p-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/38">
          Sent
        </p>
        <p className="mt-20 text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-4xl">
          Thank you.
        </p>
        <p className="mt-4 max-w-md text-base leading-7 text-black/56">
          We will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[18rem] bg-[#ece8e1] p-8 sm:p-10 lg:p-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/38">
          Send a note
        </p>
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-black/32">
          Step {stepIndex + 1} of {stepOrder.length}
        </p>
      </div>

      <p className="mt-10 text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-4xl">
        {currentContent.prompt}
      </p>

      <div className="mt-8">
        {currentStep === "email" ? (
          <div className="space-y-3">
            <label
              htmlFor="contact-email"
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/34"
            >
              {currentContent.label}
            </label>
            <input
              id="contact-email"
              autoFocus
              type="email"
              inputMode="email"
              maxLength={254}
              autoComplete="email"
              value={formState.email}
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="jane@acme.com"
              aria-invalid={showEmailError && !isEmailValid}
              className="min-h-14 w-full border border-black/18 bg-[#f8f5ee] px-4 text-lg tracking-[-0.03em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
            />
            {showEmailError && !isEmailValid ? (
              <p className="text-sm leading-6 text-rose-700">
                Enter a valid email so we know where to reply.
              </p>
            ) : null}
          </div>
        ) : null}

        {currentStep === "identity" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <label
                htmlFor="contact-name"
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/34"
              >
                Name
              </label>
              <input
                id="contact-name"
                autoFocus
                type="text"
                maxLength={80}
                autoComplete="name"
                value={formState.firstName}
                name="name"
                onChange={(event) => updateField("firstName", event.target.value)}
                placeholder="Jane Doe"
                className="min-h-14 w-full border border-black/18 bg-[#f8f5ee] px-4 text-lg tracking-[-0.03em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="contact-company"
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/34"
              >
                Company
              </label>
              <input
                id="contact-company"
                type="text"
                maxLength={120}
                autoComplete="organization"
                value={formState.company}
                name="company"
                onChange={(event) => updateField("company", event.target.value)}
                placeholder="ACME Corporation"
                className="min-h-14 w-full border border-black/18 bg-[#f8f5ee] px-4 text-lg tracking-[-0.03em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
              />
            </div>
          </div>
        ) : null}

        {currentStep === "note" ? (
          <div className="space-y-3">
            <label
              htmlFor="contact-note"
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-black/34"
            >
              Additional information
            </label>
            <textarea
              id="contact-note"
              autoFocus
              rows={5}
              maxLength={500}
              value={formState.note}
              name="note"
              onChange={(event) => updateField("note", event.target.value)}
              placeholder="Share the decision, context, or timing."
              className="w-full resize-none border border-black/18 bg-[#f8f5ee] px-4 py-4 text-base leading-7 tracking-[-0.02em] text-black outline-none transition-colors placeholder:text-black/24 focus:border-black"
            />
          </div>
        ) : null}
      </div>

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

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-black/10 pt-6">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex min-h-12 items-center justify-center border border-black/12 px-5 text-xs font-medium uppercase tracking-[0.18em] text-black/70 transition-colors hover:border-black/24 hover:text-black"
          >
            Back
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 min-w-32 items-center justify-center bg-black px-5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/88 disabled:cursor-wait disabled:bg-black/72"
        >
          {isPending ? "Sending" : isLastStep ? "Send" : "Continue"}
        </button>
        {submitError ? (
          <p className="text-sm leading-6 text-rose-700">{submitError}</p>
        ) : null}
      </div>
    </form>
  );
}
