"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { SectionCard } from "@/components/ui/section-card";
import { copy, profile } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll<HTMLElement>("[data-contact-reveal]"),
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="px-[clamp(14px,3vw,32px)] py-2 md:py-3" id="contact" ref={sectionRef} aria-labelledby="contact-title">
      <SectionCard className="grid grid-cols-1 gap-5 p-5 sm:p-7 md:grid-cols-[minmax(100px,0.25fr)_minmax(0,1.75fr)] md:gap-8 lg:p-9">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]" data-contact-reveal>
          05 / {copy.contact}
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]" data-contact-reveal>Open to senior roles</p>
          <h2 className="mt-3 max-w-[800px] text-[clamp(2.6rem,6.8vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-[var(--midnight-ink)]" id="contact-title" data-contact-reveal>
            Open to <span className="text-[var(--ultra-violet)]">senior frontend</span> roles.
          </h2>
          <p className="mt-4 max-w-[610px] text-sm leading-relaxed text-[var(--graphite)]" data-contact-reveal>
            React / Next.js roles at product companies, in India and remote.
          </p>
          <a
            className="mt-6 flex min-h-14 w-fit max-w-full items-center justify-between gap-3 rounded-2xl border border-[var(--mist)] bg-[var(--fog)] px-4 py-3 text-[clamp(1rem,2.6vw,1.7rem)] font-medium tracking-[-0.04em] text-[var(--midnight-ink)] transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--lavender-mist)] hover:text-[var(--ultra-violet)] motion-reduce:transition-none sm:mt-8"
            href={`mailto:${profile.email}`}
            data-contact-reveal
          >
            <span className="break-all">{profile.email}</span>
            <ArrowUpRight className="shrink-0 text-[var(--ultra-violet)]" size={22} aria-hidden="true" />
          </a>
          <div className="mt-3 flex flex-wrap gap-2" data-contact-reveal>
            <a className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--mist)] bg-[var(--pure-white)] px-3 font-mono text-[8px] uppercase tracking-[0.07em] text-[var(--graphite)] transition-colors hover:bg-[var(--lavender-field)] hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn<ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--mist)] bg-[var(--pure-white)] px-3 font-mono text-[8px] uppercase tracking-[0.07em] text-[var(--graphite)] transition-colors hover:bg-[var(--lavender-field)] hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub<ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--mist)] bg-[var(--pure-white)] px-3 font-mono text-[8px] uppercase tracking-[0.07em] text-[var(--graphite)] transition-colors hover:bg-[var(--lavender-field)] hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.resume} download>
              {copy.downloadResume}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}
