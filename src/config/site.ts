/**
 * Single source of truth for everything on the site.
 * Edit names, copy, contact details, projects and testimonials here —
 * no component changes required.
 */

export type Orientation = "landscape" | "portrait";

export type VideoSource =
  /** Self-hosted or CDN file. `preview` is a small, muted rendition used for hover previews. */
  | { type: "file"; src: string; preview?: string }
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string };

export type Project = {
  id: string;
  title: string;
  client: string;
  category: Category;
  year: number;
  role: string;
  description: string;
  poster: string;
  orientation: Orientation;
  video: VideoSource;
};

export type SkillIcon = "edit" | "grade" | "motion" | "sound" | "vfx";

export const categories = ["Commercial", "Music Video", "Travel", "Documentary", "Social"] as const;
export type Category = (typeof categories)[number];

/**
 * Demo footage is free-to-use stock from Pexels (pexels.com/license).
 * Replace these with your own work — any MP4/WebM URL, YouTube ID or Vimeo ID works.
 */
function pexels(id: number, fps: number, orientation: Orientation = "landscape") {
  const [full, preview] =
    orientation === "landscape" ? ["hd_1920_1080", "sd_640_360"] : ["hd_1080_1920", "sd_360_640"];
  const file = (size: string) => `https://videos.pexels.com/video-files/${id}/${id}-${size}_${fps}fps.mp4`;
  return {
    orientation,
    poster: `https://images.pexels.com/videos/${id}/free-video-${id}.jpg?auto=compress&cs=tinysrgb&w=1920`,
    video: { type: "file", src: file(full), preview: file(preview) } satisfies VideoSource,
  };
}

export const siteConfig = {
  name: "Divyansh",
  role: "Video Editor & Colourist",
  location: "New Delhi, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Divyansh is a video editor and colourist crafting commercials, music videos, travel films and short-form content with cinematic pacing and sound.",

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Process", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Video Editor · Colourist · Motion",
    // Wrap a word in *asterisks* to set it in italic accent type.
    headline: "Stories cut to make you *feel* something.",
    intro:
      "I shape raw footage into films that hold attention — precise rhythm, considered colour and sound that lands. For brands, artists and storytellers who care about the final frame.",
    background: {
      poster: "https://images.pexels.com/videos/3571264/free-video-3571264.jpg?auto=compress&cs=tinysrgb&w=1920",
      desktop: "https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4",
      mobile: "https://videos.pexels.com/video-files/3571264/3571264-sd_960_540_30fps.mp4",
    },
    stats: [
      { value: "7+", label: "Years editing" },
      { value: "180+", label: "Projects delivered" },
      { value: "40M+", label: "Views generated" },
    ],
  },

  showreel: {
    id: "showreel",
    title: "Showreel 2026",
    client: "Selected work",
    category: "Commercial",
    year: 2026,
    role: "Edit · Colour · Sound",
    description: "A ninety-second cut through recent commercial, travel and music work.",
    ...pexels(3015510, 24),
  } satisfies Project,

  about: {
    statement: "Editing is invisible when it's done right — you only *feel* it.",
    paragraphs: [
      "I'm Divyansh, a freelance video editor and colourist. For the past seven years I've cut commercials, music videos, travel films and social campaigns for brands, agencies and independent artists.",
      "My approach is simple: find the emotional spine of the story, then build rhythm, colour and sound around it. Every cut has a reason, every grade has an intention, and nothing ships until it feels right on a big screen and a phone screen alike.",
    ],
    highlights: [
      "Brand films & commercials",
      "Music videos & visualisers",
      "Travel & documentary",
      "Reels, Shorts & TikTok",
    ],
  },

  projects: [
    {
      id: "where-the-balloons-rise",
      title: "Where the Balloons Rise",
      client: "Wanderlane Travel",
      category: "Travel",
      year: 2026,
      role: "Edit · Colour",
      description:
        "A dawn-to-dusk travel film for a boutique tour operator. Warm film-emulation grade, music-led pacing and natural sound beds.",
      ...pexels(3015510, 24),
    },
    {
      id: "night-signal",
      title: "Night Signal",
      client: "Orbital Docs",
      category: "Documentary",
      year: 2025,
      role: "Title sequence · VFX",
      description:
        "Opening title sequence for a documentary series about global connectivity, combining composited typography with orbital footage.",
      ...pexels(1851190, 25),
    },
    {
      id: "step-inside",
      title: "Step Inside",
      client: "Halo VR",
      category: "Commercial",
      year: 2025,
      role: "Edit · Colour · Sound design",
      description:
        "Launch spot for a consumer VR headset. Built around a kid's first reaction, with layered sound design to sell the sense of immersion.",
      ...pexels(3209828, 25),
    },
    {
      id: "morning-reps",
      title: "Morning Reps",
      client: "Stride Athletics",
      category: "Social",
      year: 2026,
      role: "Edit · Motion graphics",
      description:
        "Vertical campaign for a fitness apparel launch. Beat-synced cuts, kinetic captions and safe-zone aware layouts for Reels and Shorts.",
      ...pexels(2785536, 25, "portrait"),
    },
    {
      id: "saltwater",
      title: "Saltwater",
      client: "Aarav Sen",
      category: "Music Video",
      year: 2025,
      role: "Edit · Colour",
      description:
        "Aerial visual for an ambient single. Long, breathing takes cut to the swell of the track, graded in deep teal and cold highlights.",
      ...pexels(3571264, 30),
    },
    {
      id: "portholes",
      title: "Portholes",
      client: "Maison Kei",
      category: "Social",
      year: 2025,
      role: "Edit · Colour",
      description:
        "Autumn lookbook teaser cut for vertical. Soft pastel grade and gentle speed ramps to match the brand's quiet tone.",
      ...pexels(2795405, 25, "portrait"),
    },
    {
      id: "edge-of-the-map",
      title: "Edge of the Map",
      client: "Coastline Collective",
      category: "Travel",
      year: 2024,
      role: "Edit · Sound design",
      description:
        "Drone-led destination film. Sound design built from wind, surf and low drones to give the aerials physical weight.",
      ...pexels(1409899, 25),
    },
    {
      id: "golden-hour-rituals",
      title: "Golden Hour Rituals",
      client: "Terra Skin",
      category: "Commercial",
      year: 2026,
      role: "Edit · Colour · VFX cleanup",
      description:
        "Brand film for a mineral skincare line. Textural macro shots, warm sunset grade and invisible clean-up passes.",
      ...pexels(1093662, 30),
    },
    {
      id: "still-water",
      title: "Still Water",
      client: "Mira & The Tides",
      category: "Music Video",
      year: 2024,
      role: "Edit · Motion graphics",
      description:
        "Vertical visualiser for a lo-fi release, with hand-animated lyric overlays reacting to the water surface.",
      ...pexels(2499611, 30, "portrait"),
    },
  ] satisfies Project[],

  skills: [
    {
      icon: "edit",
      title: "Video Editing",
      description: "Story-first cutting with deliberate rhythm — from 15-second hooks to long-form narrative.",
      tags: ["Narrative", "Pacing", "Multicam", "Short-form"],
    },
    {
      icon: "grade",
      title: "Colour Grading",
      description: "Colour-managed workflows, look development and shot matching that give every project its own identity.",
      tags: ["ACES", "Look dev", "Shot matching", "HDR"],
    },
    {
      icon: "motion",
      title: "Motion Graphics",
      description: "Kinetic type, titles, lower thirds and animated brand systems that move with the edit.",
      tags: ["Titles", "Kinetic type", "Captions", "Logo animation"],
    },
    {
      icon: "sound",
      title: "Sound Design",
      description: "Layered ambience, foley, music edits and loudness-compliant mixes that make images feel physical.",
      tags: ["Foley", "Music edit", "Mixing", "-14 LUFS"],
    },
    {
      icon: "vfx",
      title: "Visual Effects",
      description: "Compositing, tracking, sky replacements and invisible clean-up that nobody should ever notice.",
      tags: ["Compositing", "Tracking", "Rotoscoping", "Clean-up"],
    },
  ] satisfies { icon: SkillIcon; title: string; description: string; tags: string[] }[],

  tools: [
    { name: "Premiere Pro", short: "Pr", use: "Editing", color: "#9a8cff" },
    { name: "After Effects", short: "Ae", use: "Motion & VFX", color: "#b58cff" },
    { name: "DaVinci Resolve", short: "Dr", use: "Colour & finishing", color: "#e3a857" },
    { name: "CapCut", short: "Cc", use: "Short-form", color: "#f2f2f2" },
    { name: "Final Cut Pro", short: "Fc", use: "Editing", color: "#ff7a6b" },
    { name: "Audition", short: "Au", use: "Audio repair & mix", color: "#5fd6b4" },
    { name: "Photoshop", short: "Ps", use: "Thumbnails & stills", color: "#5fb3ff" },
    { name: "Fusion", short: "Fu", use: "Node compositing", color: "#c9683a" },
  ],

  process: [
    {
      title: "Concept",
      description: "We talk goals, audience and references until the story and tone are crystal clear.",
      output: "Creative brief",
    },
    {
      title: "Planning",
      description: "Footage is organised, synced and logged. I build a structure and a timeline plan before cutting.",
      output: "Edit structure",
    },
    {
      title: "Editing",
      description: "Assembly, rough cut and fine cut — shaped with you through focused, timestamped review rounds.",
      output: "Fine cut",
    },
    {
      title: "Sound & Colour",
      description: "Sound design, music edit and mix, alongside the colour grade that sets the final look.",
      output: "Graded & mixed master",
    },
    {
      title: "Delivery",
      description: "Masters and platform-ready versions exported to spec — every aspect ratio, caption file and format you need.",
      output: "Final deliverables",
    },
  ],

  // Sample testimonials for the demo — replace with real client feedback before going live.
  testimonials: [
    {
      quote:
        "Divyansh found the story in forty hours of footage we'd given up on. The final cut outperformed every launch video we've run.",
      name: "Riya Kapoor",
      role: "Head of Brand",
      company: "Halo VR",
    },
    {
      quote:
        "Fast, thoughtful and genuinely collaborative. Every review round came back better than what we'd asked for.",
      name: "Daniel Okafor",
      role: "Creative Director",
      company: "Northbound Agency",
    },
    {
      quote:
        "The grade on our music video is the first thing people comment on. He understood the mood before I could explain it.",
      name: "Aarav Sen",
      role: "Recording Artist",
      company: "Independent",
    },
    {
      quote:
        "Our Reels went from polished-but-ignored to genuinely watched. Retention more than doubled across the campaign.",
      name: "Sophie Laurent",
      role: "Social Lead",
      company: "Maison Kei",
    },
  ],

  contact: {
    // Update these before going live.
    email: "hello@divyansh.video",
    instagram: "divyansh.edits",
    whatsapp: "919876543210", // Country code + number, digits only.
    whatsappMessage: "Hi Divyansh, I'd like to talk about a video project.",
    availability: "Booking projects for January 2027",
    projectTypes: ["Commercial / Brand film", "Music video", "Social content", "Documentary", "YouTube", "Other"],
    budgets: ["Under ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹5L", "₹5L+", "Not sure yet"],
  },
};

export type SiteConfig = typeof siteConfig;
