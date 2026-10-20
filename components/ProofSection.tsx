"use client";

import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { SectionCard } from "@/components/ui/section-card";
import { profile } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

const [experienceStat, reactStat, userRangeStat] = profile.about.stats;

export function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const elements = section.querySelectorAll<HTMLElement>("[data-proof-reveal]");
      gsap.fromTo(
        elements,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.62,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );

      const rangeFill = section.querySelector<HTMLElement>("[data-range-fill]");
      if (rangeFill) {
        gsap.fromTo(
          rangeFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          },
        );
      }

      const counters = Array.from(section.querySelectorAll<HTMLElement>("[data-count-to]"));
      for (const element of counters) {
        const target = Number(element.dataset.countTo);
        const suffix = element.dataset.countSuffix ?? "";
        const counter = { value: 0 };
        gsap.fromTo(
          counter,
          { value: 0 },
          {
            value: target,
            duration: 1.05,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          },
        );
      }
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="px-[clamp(14px,3vw,32px)] py-2 md:py-3" id="proof" ref={sectionRef} aria-label="Experience and product scale">
      <SectionCard tone="lavender" className="grid grid-cols-1 items-center gap-5 p-5 sm:p-7 md:grid-cols-[auto_minmax(0,1.35fr)_minmax(190px,0.65fr)] lg:gap-9 lg:p-9">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]" data-proof-reveal>
          <span>02</span><span aria-hidden="true">/</span><span>In context</span>
        </div>

        <div className="min-w-0" data-proof-reveal>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--graphite)]">{userRangeStat.label}</p>
          <h2 className="mt-2 whitespace-nowrap text-[clamp(2.65rem,9.5vw,8rem)] font-semibold leading-[0.85] tracking-[-0.09em] text-[var(--midnight-ink)]">
            {userRangeStat.value}
          </h2>
          <div className="mt-5 grid max-w-[520px] grid-cols-[auto_minmax(40px,1fr)_auto] items-center gap-3 font-mono text-[8px] text-[var(--graphite)]" aria-hidden="true">
            <span>5K</span>
            <span className="h-px overflow-hidden bg-[rgba(17,24,39,0.22)]">
              <span className={`block h-full w-full origin-left bg-[var(--ultra-violet)] ${reducedMotion ? "" : "scale-x-0"}`}
                data-range-fill />
            </span>
            <span>50K+</span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 border-t border-[rgba(17,24,39,0.14)] pt-4 md:grid-cols-1 md:border-l md:border-t-0 md:pl-6 md:pt-0" data-proof-reveal>
          {[experienceStat, reactStat].map((stat) => (
            <div className="flex flex-col-reverse gap-1.5 border-r border-[rgba(17,24,39,0.14)] pr-3 last:border-r-0 last:pr-0 md:border-r-0 md:border-t md:py-3 md:pr-0 md:first:border-t-0 md:first:pt-0" key={stat.id}>
              <dt className="text-[10px] leading-snug text-[var(--graphite)]">{stat.label}</dt>
              <dd className="m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.07em] text-[var(--midnight-ink)]" data-count-to={stat.countTo} data-count-suffix={stat.suffix}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </SectionCard>
    </section>
  );
}
