# Divyansh — Video Editor Portfolio

A dark, cinematic one-page portfolio built with **Next.js 16 (App Router)**, **React 19** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Other scripts: `npm run lint`, `npm run typecheck`.

## Editing content

Everything visible on the site lives in **`src/config/site.ts`**:

| Key            | What it controls                                                        |
| -------------- | ----------------------------------------------------------------------- |
| `name`, `role`, `location`, `description` | Identity, page title and SEO               |
| `hero`         | Headline (wrap a word in `*asterisks*` for the italic accent), intro, background video, stats |
| `showreel`     | The video opened by **Play showreel**                                   |
| `about`        | Statement, paragraphs, highlights                                       |
| `projects`     | Portfolio items (see below)                                             |
| `categories`   | Filter tabs (empty categories are hidden automatically)                 |
| `skills`, `tools`, `process`, `testimonials` | Their respective sections                  |
| `contact`      | Email, Instagram handle, WhatsApp number + prefilled message, availability, form options |

### Adding a project

```ts
{
  id: "my-film",                       // unique slug
  title: "My Film",
  client: "Client name",
  category: "Commercial",              // one of `categories`
  year: 2026,
  role: "Edit · Colour",
  description: "One or two sentences shown in the player.",
  poster: "https://cdn.example.com/my-film.jpg",
  orientation: "landscape",            // or "portrait" for 9:16 work
  video: { type: "file", src: "https://cdn.example.com/my-film.mp4", preview: "https://cdn.example.com/my-film-360p.mp4" },
  // or: video: { type: "youtube", id: "dQw4w9WgXcQ" }
  // or: video: { type: "vimeo", id: "76979871" }
}
```

- **Posters** are served through `next/image` (AVIF/WebP, responsive sizes). Add any new image host to `images.remotePatterns` in `next.config.ts`, or put files in `public/` and use paths like `/posters/my-film.jpg`.
- **`preview`** should be a small (≈360p, a few MB) muted clip. It is only downloaded the first time someone hovers a card, so the grid stays fast.
- The demo footage is free stock from [Pexels](https://www.pexels.com/license/); the projects, clients and testimonials are sample content. Replace all of it with your real work before launch.

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates the input (sharing rules with the client in `src/lib/contact.ts`), filters bots with a honeypot field, rate-limits by IP and sends the enquiry over SMTP with Nodemailer.

Copy `.env.example` to `.env.local` and fill in your SMTP details (for Gmail, use an [app password](https://myaccount.google.com/apppasswords)):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=you@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
CONTACT_TO=you@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Until SMTP is configured, the form says so and offers a pre-filled "send from your email app" link, so no enquiry is lost.

## Project structure

```
src/
  app/                 layout, page, global styles, API route, robots/sitemap, icon
  config/site.ts       all content
  lib/                 helpers + shared contact validation
  components/
    layout/            Navbar (scroll-spy, mobile menu), Footer
    sections/          Hero, About, Portfolio, Skills, Tools, Process, Testimonials, Contact
    portfolio/         VideoCard (hover preview), VideoModal (player + playlist navigation)
    contact/           ContactForm, CopyEmailButton
    ui/                Reveal (scroll animation), SectionHeading, Emphasis, Icons
```

## Notes

- Animations respect `prefers-reduced-motion`; the hero video doesn't play for reduced-motion or data-saver users and pauses when scrolled out of view.
- The video player supports Esc to close, ←/→ to move between projects, and keeps keyboard focus inside the dialog.
