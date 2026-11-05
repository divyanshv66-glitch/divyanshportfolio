export type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  /** Honeypot — real visitors never fill this in. */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 80, email: 254, message: 4000 } as const;

/** Shared by the form (instant feedback) and the API route (authoritative check). */
export function validateContact(data: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  if (name.length < 2) errors.name = "Please tell me your name.";
  else if (name.length > LIMITS.name) errors.name = "That name is a little long.";

  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = "Enter a valid email address.";

  if (message.length < 20) errors.message = "A few more details help — at least 20 characters.";
  else if (message.length > LIMITS.message) errors.message = `Please keep it under ${LIMITS.message} characters.`;

  return errors;
}
