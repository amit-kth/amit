"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { SectionCard } from "@/components/ui/section-card";
import { awards, copy, education, journey } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll<HTMLElement>(".journey-row, .journey-extra-card"),
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="px-[clamp(14px,3vw,32px)] py-2 md:py-3" id="journey" ref={sectionRef} aria-labelledby="journey-title">
      <SectionCard className="p-5 sm:p-7 lg:p-9">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]">04 / {copy.journeyCaption}</p>
            <h2 className="mt-2 text-[clamp(2.4rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.075em] text-[var(--midnight-ink)]" id="journey-title">
              {copy.journeyTitle}
            </h2>
          </div>
          <p className="max-w-[360px] text-sm leading-relaxed text-[var(--slate)]">{copy.journeyIntro}</p>
        </header>

        <div className="grid gap-3" role="list" aria-label={copy.journey}>
          {journey.map((item, index) => (
            <article className="journey-row group flex min-h-[160px] flex-col rounded-[22px] border border-[var(--mist)] bg-[var(--fog)] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[rgba(134,47,231,0.3)] hover:shadow-[0_16px_34px_rgba(17,24,39,0.08)] sm:p-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0" key={item.id} role="listitem">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="grid size-7 place-items-center rounded-full bg-[var(--lavender-field)] font-mono text-[8px] text-[var(--ultra-violet)]">0{index + 1}</span>
                  <p className="m-0 font-mono text-[8px] uppercase tracking-[0.07em] text-[var(--slate)]">{item.period}</p>
                  <span className="rounded-full border border-[var(--mist)] bg-[var(--pure-white)] px-2.5 py-1 font-mono text-[8px] text-[var(--graphite)]">{item.year}</span>
                </div>
                <ArrowUpRight className="shrink-0 text-[var(--ultra-violet)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" size={18} aria-hidden="true" />
              </div>
              <div className="mt-4 max-w-[1000px]">
                <h3 className="m-0 text-lg font-semibold leading-tight tracking-[-0.04em] text-[var(--midnight-ink)] sm:text-xl">{item.role}</h3>
                <p className="mt-1 text-xs font-semibold text-[var(--ultra-violet)]">{item.company}</p>
                <p className="mt-2 max-w-[900px] text-xs leading-relaxed text-[var(--graphite)]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <section className="journey-extra-card min-h-[145px] rounded-[22px] border border-[var(--mist)] bg-[var(--pure-white)] p-5 sm:p-6" aria-labelledby="education-title">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]">{copy.journeyEducation}</p>
            <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--midnight-ink)]" id="education-title">{education.qualification}</h3>
            <p className="mt-1 text-xs text-[var(--slate)]">{education.institution} · {education.dates}</p>
          </section>
          <section className="journey-extra-card min-h-[145px] rounded-[22px] border border-[var(--mist)] bg-[var(--pure-white)] p-5 sm:p-6" aria-labelledby="recognition-title">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]">{copy.recognition}</p>
            <h3 className="sr-only" id="recognition-title">{copy.recognition}</h3>
            <ul className="mt-2 list-none p-0">
              {awards.map((award) => (
                <li className="flex min-h-10 items-center justify-between gap-3 border-t border-[var(--mist)] text-xs text-[var(--graphite)] first:border-t-0" key={award.title}>
                  <span>{award.title}</span>
                  {"organization" in award && <small className="text-[9px] text-[var(--slate)]">{award.organization}</small>}
                  <ArrowUpRight className="shrink-0 text-[var(--ultra-violet)]" size={14} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SectionCard>
    </section>
  );
}
