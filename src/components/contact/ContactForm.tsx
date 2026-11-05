"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { LIMITS, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon, MailIcon } from "@/components/ui/Icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; fallback: boolean };

const empty: ContactPayload = { name: "", email: "", projectType: "", budget: "", message: "", website: "" };

function mailtoFallback(data: ContactPayload) {
  const subject = `Project enquiry from ${data.name}`;
  const details = [
    data.projectType && `Project type: ${data.projectType}`,
    data.budget && `Budget: ${data.budget}`,
  ].filter(Boolean);
  const body = [data.message, "", `— ${data.name} (${data.email})`, ...details].join("\n");
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const { projectTypes, budgets } = siteConfig.contact;
  const [data, setData] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = (field: keyof ContactPayload, value: string) => {
    const next = { ...data, [field]: value };
    setData(next);
    if (touched) setErrors(validateContact(next));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validateContact(data);
    setErrors(found);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; errors?: ContactErrors; code?: string };
      if (res.ok) {
        setStatus({ kind: "sent" });
        setData(empty);
        setTouched(false);
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus({
        kind: "error",
        message: json.error ?? "Something went wrong sending your message.",
        fallback: json.code === "not_configured" || res.status >= 500,
      });
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach the server — check your connection.", fallback: true });
    }
  };

  if (status.kind === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl border border-line bg-ink-2 p-8 sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-ember text-2xl text-ink">
          <CheckIcon />
        </span>
        <h3 className="mt-6 font-display text-4xl">Message received.</h3>
        <p className="mt-3 max-w-sm text-mute">Thanks for reaching out — I reply to every enquiry within one working day.</p>
        <button onClick={() => setStatus({ kind: "idle" })} className="mt-8 text-sm text-ember underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name} id="name">
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" error={errors.email} id="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Project type" id="projectType">
          <select
            id="projectType"
            name="projectType"
            value={data.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            className={cn(inputClass(false), "appearance-none", !data.projectType && "text-mute")}
          >
            <option value="">Select one</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget" id="budget">
          <select
            id="budget"
            name="budget"
            value={data.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={cn(inputClass(false), "appearance-none", !data.budget && "text-mute")}
          >
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project details" error={errors.message} id="message" className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass(!!errors.message), "resize-y")}
            placeholder="What are we making? Footage length, deadline, references…"
          />
        </Field>

        {/* Honeypot for bots — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
      </div>

      {status.kind === "error" && (
        <div role="alert" className="mt-6 rounded-lg border border-ember-deep/40 bg-ember-deep/10 p-4 text-sm">
          <p>{status.message}</p>
          {status.fallback && (
            <a href={mailtoFallback(data)} className="mt-3 inline-flex items-center gap-2 font-medium text-ember hover:underline">
              <MailIcon /> Send it from your email app instead
            </a>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-mute">I reply within one working day.</p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-ember disabled:cursor-wait disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
          <ArrowRightIcon className="transition group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}

const inputClass = (invalid: boolean) =>
  cn(
    "w-full rounded-lg border bg-ink px-4 py-3 text-bone placeholder:text-mute/60 transition outline-none focus:border-ember focus:ring-1 focus:ring-ember",
    invalid ? "border-red-400/70" : "border-line hover:border-bone/25",
  );

function Field({
  label,
  id,
  error,
  className,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="eyebrow mb-2.5 block !tracking-[0.16em]">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
