import { siteConfig } from "@/config/site";
import { instagramHref, whatsappHref } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";

export function Contact() {
  const { contact } = siteConfig;

  const channels = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: MailIcon, external: false },
    { label: "Instagram", value: `@${contact.instagram}`, href: instagramHref(contact.instagram), icon: InstagramIcon, external: true },
    {
      label: "WhatsApp",
      value: "Message me directly",
      href: whatsappHref(contact.whatsapp, contact.whatsappMessage),
      icon: WhatsAppIcon,
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative border-t border-line bg-ink-2 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(227,168,87,0.08),transparent_70%)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            scene="07"
            label="Contact"
            title="Have footage? Let's make it *unforgettable*."
            intro="Tell me about your project, timeline and where it will live. I'll come back with ideas, a plan and a quote."
          />

          <Reveal delay={200} className="mt-10 inline-flex items-center gap-3 rounded-full border border-line bg-ink px-4 py-2 text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {contact.availability}
          </Reveal>

          <ul className="mt-10 border-t border-line">
            {channels.map(({ label, value, href, icon: Icon, external }, i) => (
              <Reveal as="li" key={label} delay={240 + i * 60} className="flex items-center border-b border-line">
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex min-w-0 flex-1 items-center gap-4 py-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-lg transition group-hover:border-ember group-hover:text-ember">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block">{label}</span>
                    <span className="block truncate text-base transition group-hover:text-ember sm:text-lg">{value}</span>
                  </span>
                  <ArrowUpRightIcon className="ml-auto shrink-0 text-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" />
                </a>
                {label === "Email" && <CopyEmailButton email={contact.email} />}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={150} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
