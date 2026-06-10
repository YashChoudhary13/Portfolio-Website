"use client";

import Eyebrow from "@/components/shared/Eyebrow";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import Magnetic from "@/components/shared/Magnetic";
import SlideSwapLink from "@/components/shared/SlideSwapLink";
import { contact, identity, socials } from "@/lib/content";

/**
 * S8 — Contact (DESIGN_ANALYSIS §S8). Huge type, one CTA, nothing else
 * competing for attention.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="container-x pt-[clamp(6rem,16vh,14rem)] pb-24"
      aria-label="Contact"
    >
      <Eyebrow
        right={
          identity.available ? (
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" />
              Available for work
            </span>
          ) : undefined
        }
      >
        07 — Contact
      </Eyebrow>

      <MaskLines
        as="h2"
        lines={[contact.lines[0], <span key="l2" className="text-ink-65">{contact.lines[1]}</span>]}
        className="text-display mt-14 uppercase"
        lineClassName="text-[length:var(--text-display-xl)]"
      />

      <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <Reveal delay={0.2}>
          <p className="max-w-[26rem] leading-relaxed text-ink-65">{contact.body}</p>
          <Magnetic strength={10} className="mt-8">
            <a
              href={`mailto:${identity.email}`}
              className="glass-panel inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:border-accent/40"
            >
              {identity.email}
              <span className="text-accent">↗</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.3} className="flex gap-7">
          {socials.map((social) => (
            <SlideSwapLink
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-65 hover:text-ink"
              label={social.label}
              suffix={<span className="text-ink-40">↗</span>}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
