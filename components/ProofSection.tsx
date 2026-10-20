"use client";

import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { profile } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

const [experienceStat, reactStat, userRangeStat] = profile.about.stats;
const [rangeStart, rangeEnd] = userRangeStat.value.split("–");

export function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll<HTMLElement>("[data-proof-reveal]"),
        { y: 18, autoAlpha: 0 },
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
    <section className="relative isolate overflow-hidden bg-[var(--lavender-field)] py-[clamp(74px,9vw,132px)]" id="proof" ref={sectionRef} aria-labelledby="proof-title">
      <span className="pointer-events-none absolute -right-[0.08em] top-1/2 -translate-y-1/2 select-none text-[clamp(18rem,42vw,46rem)] font-semibold leading-[0.72] tracking-[-0.12em] text-[rgba(95,37,158,0.045)]" aria-hidden="true">02</span>
      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-[clamp(20px,5vw,84px)] md:grid-cols-[minmax(80px,0.25fr)_minmax(0,1.4fr)_minmax(190px,0.65fr)] md:items-center md:gap-7 lg:gap-12">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--ultra-violet)] md:flex-col md:items-start md:gap-1" data-proof-reveal>
          <span>02</span><span className="text-[var(--orchid-wash)]" aria-hidden="true">/</span><span>Scale</span>
        </div>

        <div className="min-w-0" data-proof-reveal>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--graphite)]">{userRangeStat.label}</p>
          <h2 className="mt-3 whitespace-nowrap text-[clamp(3rem,10.5vw,10rem)] font-semibold leading-[0.82] tracking-[-0.105em] text-[var(--midnight-ink)]" id="proof-title">
            <span>{rangeStart}</span><span className="px-[0.06em] font-normal text-[var(--orchid-wash)]">–</span><span className="text-[var(--ultra-violet)]">{rangeEnd}</span>
          </h2>
          <div className="mt-7 grid max-w-[620px] grid-cols-[auto_minmax(40px,1fr)_auto] items-center gap-3 font-mono text-[8px] tracking-[0.08em] text-[var(--graphite)]" aria-hidden="true">
            <span>5K</span>
            <span className="relative h-px overflow-hidden bg-[rgba(17,24,39,0.28)]">
              <span className={`absolute inset-y-0 left-0 block w-full origin-left bg-[var(--ultra-violet)] ${reducedMotion ? "" : "scale-x-0"}`} data-range-fill />
            </span>
            <span>50K+</span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 border-t border-[rgba(17,24,39,0.2)] pt-4 md:grid-cols-1 md:border-l md:border-t-0 md:pl-6 md:pt-0" data-proof-reveal>
          {[experienceStat, reactStat].map((stat) => (
            <div className="flex flex-col-reverse gap-2 border-r border-[rgba(17,24,39,0.2)] pr-3 last:border-r-0 last:pr-0 md:border-r-0 md:border-t md:py-4 md:pr-0 md:first:border-t-0 md:first:pt-0" key={stat.id}>
              <dt className="max-w-[180px] text-[10px] leading-snug text-[var(--graphite)]">{stat.label}</dt>
              <dd className="m-0 text-[clamp(2.2rem,4vw,3.8rem)] font-semibold leading-none tracking-[-0.08em] text-[var(--midnight-ink)]" data-count-to={stat.countTo} data-count-suffix={stat.suffix}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
