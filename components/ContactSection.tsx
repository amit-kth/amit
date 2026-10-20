"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
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
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.62,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        },
      );
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="section-contact relative isolate overflow-hidden py-[clamp(80px,10vw,148px)]" id="contact" ref={sectionRef} aria-labelledby="contact-title">
      <span className="pointer-events-none absolute -right-[0.08em] top-[0.12em] select-none text-[clamp(16rem,36vw,42rem)] font-semibold leading-[0.72] tracking-[-0.12em] text-[rgba(95,37,158,0.045)]" aria-hidden="true">05</span>
      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-[clamp(20px,5vw,84px)] md:grid-cols-[minmax(110px,0.32fr)_minmax(0,1.68fr)] md:gap-10">
        <div className="flex items-start gap-3 font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--ultra-violet)] md:flex-col md:gap-2" data-contact-reveal>
          <span>05</span><span className="text-[var(--orchid-wash)]" aria-hidden="true">/</span><span>{copy.contact}</span>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--graphite)]" data-contact-reveal>Open to senior roles</p>
          <h2 className="mt-4 max-w-[1050px] text-[clamp(3rem,7.8vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.09em] text-[var(--midnight-ink)]" id="contact-title" data-contact-reveal>
            Open to <span className="text-[var(--ultra-violet)]">senior frontend</span> roles.
          </h2>
          <p className="mt-5 max-w-[610px] text-sm leading-relaxed text-[var(--graphite)] sm:text-base" data-contact-reveal>
            React / Next.js roles at product companies, in India and remote.
          </p>

          <a
            className="group mt-7 flex w-fit max-w-full items-center gap-3 border-b border-[rgba(17,24,39,0.28)] pb-2 text-[clamp(1rem,3vw,2rem)] font-medium tracking-[-0.045em] text-[var(--midnight-ink)] transition-[border-color,color] duration-200 hover:border-[var(--ultra-violet)] hover:text-[var(--ultra-violet)] active:text-[var(--voltage-violet)] motion-reduce:transition-none sm:mt-9"
            href={`mailto:${profile.email}`}
            data-contact-reveal
          >
            <span className="break-all">{profile.email}</span>
            <ArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" size={23} aria-hidden="true" />
          </a>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[9px] uppercase tracking-[0.08em]" data-contact-reveal>
            <a className="group inline-flex min-h-9 items-center gap-1.5 text-[var(--graphite)] transition-colors hover:text-[var(--ultra-violet)] active:text-[var(--voltage-violet)] motion-reduce:transition-none" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" size={13} aria-hidden="true" />
            </a>
            <a className="group inline-flex min-h-9 items-center gap-1.5 text-[var(--graphite)] transition-colors hover:text-[var(--ultra-violet)] active:text-[var(--voltage-violet)] motion-reduce:transition-none" href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" size={13} aria-hidden="true" />
            </a>
            <a className="group inline-flex min-h-9 items-center gap-1.5 text-[var(--graphite)] transition-colors hover:text-[var(--ultra-violet)] active:text-[var(--voltage-violet)] motion-reduce:transition-none" href={profile.links.resume} download>
              {copy.downloadResume}<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
