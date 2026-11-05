import type { ReactNode, SVGProps } from "react";
import type { SkillIcon } from "@/config/site";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" stroke="none" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20V4M6 10l6-6 6 6" />
  </Base>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m15 5-7 7 7 7" />
  </Base>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 5 7 7-7 7" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Base>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 11.6a8.3 8.3 0 0 1-12.3 7.3L3.5 20l1.2-4A8.3 8.3 0 1 1 20 11.6Z" />
    <path d="M9 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5a6 6 0 0 0 2.6 2.3c.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .9-.7 1.8-1.7 1.9-1 .1-2.5-.3-4.3-1.9-1.6-1.5-2.4-3.1-2.4-4.1 0-.7.2-1.3.5-1.8Z" />
  </Base>
);

export const CopyIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h16" />
  </Base>
);

const skillPaths: Record<SkillIcon, ReactNode> = {
  edit: (
    <>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <path d="M8.2 8.3 20 17M8.2 15.7 20 7" />
    </>
  ),
  grade: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17" opacity=".35" />
      <circle cx="14.5" cy="9.5" r="1.6" fill="currentColor" />
    </>
  ),
  motion: (
    <>
      <path d="M3 17c3.5 0 4.5-10 9-10s5.5 10 9 10" />
      <circle cx="12" cy="7" r="1.6" fill="currentColor" />
      <path d="M3 21h18" opacity=".35" />
    </>
  ),
  sound: <path d="M3 12h2M7 8v8M11 4v16M15 7v10M19 10v4M21 12h0" />,
  vfx: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" opacity=".6" />
      <path d="m4 16.5 8 4.5 8-4.5" opacity=".35" />
    </>
  ),
};

export const SkillGlyph = ({ name, ...p }: IconProps & { name: SkillIcon }) => <Base {...p}>{skillPaths[name]}</Base>;
