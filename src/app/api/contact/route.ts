import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import { validateContact, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

// Simple per-IP rate limit (5 messages / 10 minutes). Resets on server restart,
// which is fine for a portfolio; swap for Redis/Upstash if you need stronger guarantees.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max = 4000) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they move on.
  if (clean(body.website)) return Response.json({ ok: true });

  const data: ContactPayload = {
    name: oneLine(clean(body.name, 80)),
    email: oneLine(clean(body.email, 254)),
    projectType: oneLine(clean(body.projectType, 80)),
    budget: oneLine(clean(body.budget, 80)),
    message: clean(body.message),
  };

  const errors = validateContact(data);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[contact] SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return Response.json(
      { error: "The contact form isn't connected to email yet.", code: "not_configured" },
      { status: 503 },
    );
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO || siteConfig.contact.email,
      replyTo: { name: data.name, address: data.email },
      subject: `New enquiry — ${data.name}${data.projectType ? ` (${data.projectType})` : ""}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Project type: ${data.projectType || "—"}`,
        `Budget: ${data.budget || "—"}`,
        "",
        data.message,
      ].join("\n"),
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return Response.json({ error: "Your message couldn't be sent right now." }, { status: 502 });
  }
}
