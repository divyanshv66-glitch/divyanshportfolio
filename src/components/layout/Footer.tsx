import { siteConfig } from "@/config/site";
import { instagramHref, whatsappHref } from "@/lib/utils";
import { ArrowUpIcon } from "@/components/ui/Icons";

export function Footer() {
  const { name, role, nav, contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 pb-10">
      <div className="container-x">
        <a href="#contact" className="group block">
          <p className="eyebrow">Next scene</p>
          <p className="mt-4 font-display text-[clamp(3rem,11vw,10rem)] leading-[0.9] tracking-tight transition-colors duration-500 group-hover:text-ember">
            Let&rsquo;s roll <em className="italic">camera.</em>
          </p>
        </a>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl">{name}</p>
            <p className="mt-1 text-sm text-mute">{role}</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-mute transition hover:text-bone">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm sm:text-right">
            <li>
              <a href={`mailto:${contact.email}`} className="text-mute transition hover:text-bone">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={instagramHref(contact.instagram)} target="_blank" rel="noopener noreferrer" className="text-mute transition hover:text-bone">
                Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(contact.whatsapp, contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mute transition hover:text-bone"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 text-xs text-mute">
          <p>
            © {year} {name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition hover:border-bone hover:text-bone"
          >
            Back to top <ArrowUpIcon className="transition group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
