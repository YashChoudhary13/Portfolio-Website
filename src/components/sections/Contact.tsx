"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/shared/Eyebrow";
import { MaskLines, Reveal } from "@/components/shared/Reveal";
import Magnetic from "@/components/shared/Magnetic";
import SlideSwapLink from "@/components/shared/SlideSwapLink";
import { contact, identity, socials } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * S8 — Contact, matched to reference: centered huge type on an ambient
 * teal→dark field, with a tilted "Say hi!" sticker as the only CTA.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-clip pt-[clamp(6rem,16vh,14rem)] pb-24"
      aria-label="Contact"
    >
      {/* ambient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, rgba(102,240,194,0.07), transparent 70%), radial-gradient(55% 45% at 80% 8%, rgba(90,140,255,0.05), transparent 70%)",
        }}
      />

      <div className="container-x relative">
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
          05 — Contact
        </Eyebrow>

        <div className="mt-20 flex flex-col items-center text-center">
          <MaskLines
            as="h2"
            lines={[...contact.lines]}
            className="text-display"
            lineClassName="text-[length:var(--text-display-xl)]"
          />

          {/* tilted sticker CTA, overlapping the headline's baseline */}
          <Magnetic strength={12} className="mt-4 sm:-mt-8">
            <motion.a
              href={`mailto:${identity.email}`}
              aria-label={`Email ${identity.email}`}
              className="block rounded-2xl border hairline bg-[#101214] px-10 py-5 shadow-[0_30px_70px_rgba(0,0,0,0.6)] sm:px-12 sm:py-6"
              initial={{ opacity: 0, y: 40, rotate: -14 }}
              whileInView={{ opacity: 1, y: 0, rotate: -7 }}
              viewport={VIEWPORT_ONCE}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.35 }}
            >
              <span className="text-display text-3xl sm:text-4xl">
                Say hi<span className="text-accent">!</span>
              </span>
            </motion.a>
          </Magnetic>

          <Reveal delay={0.5} className="mt-14">
            <p className="leading-relaxed text-ink-65">{contact.body}</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-ink-40">
              {identity.email}
            </p>
          </Reveal>

          <Reveal delay={0.6} className="mt-10 flex gap-8">
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
      </div>
    </section>
  );
}
