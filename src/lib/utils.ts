export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function whatsappHref(number: string, message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number.replace(/\D/g, "")}${text}`;
}

export function instagramHref(handle: string) {
  return `https://instagram.com/${handle.replace(/^@/, "")}`;
}

/** Formats seconds as a 24fps SMPTE-style timecode: HH:MM:SS:FF */
export function timecode(seconds: number, fps = 24) {
  const total = Math.max(0, Math.floor(seconds * fps));
  const pad = (n: number) => String(n).padStart(2, "0");
  const frames = total % fps;
  const s = Math.floor(total / fps);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames)}`;
}
