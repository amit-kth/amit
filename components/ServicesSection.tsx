"use client";

import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { copy, profile, services } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll<HTMLElement>("[data-service-reveal]"),
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.62,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        },
      );

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
            duration: 0.95,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
            scrollTrigger: { trigger: section, start: "top 76%", once: true },
          },
        );
      }
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      className="section-services relative overflow-hidden py-[clamp(76px,9vw,136px)] text-[var(--midnight-ink)]"
      id="what-i-do"
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-[1480px] px-[clamp(20px,5vw,84px)]">
        <header className="max-w-[920px]" data-service-reveal>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ultra-violet)]">
            01 <span className="mx-2 text-[var(--orchid-wash)]">/</span>{copy.services}
          </p>
          <h2 className="mt-3 text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-[var(--midnight-ink)]" id="services-title">
            {copy.servicesTitle}<span className="text-[var(--voltage-violet)]">.</span>
          </h2>
          <p className="mt-5 max-w-[720px] text-sm leading-relaxed text-[var(--graphite)] sm:text-base">
            {profile.about.statement}
          </p>
        </header>

        <dl className="mt-9 grid grid-cols-2 gap-x-5 gap-y-6 border-y border-[rgba(17,24,39,0.16)] py-6 sm:mt-11 sm:grid-cols-3 sm:gap-x-8 sm:py-7" aria-label="Experience and product reach">
          {profile.about.stats.map((stat, index) => (
            <div
              className={`min-w-0 ${index === 2 ? "col-span-2 sm:col-span-1" : ""} ${index > 0 ? "sm:border-l sm:border-[rgba(17,24,39,0.16)] sm:pl-6" : ""}`}
              key={stat.id}
              data-service-reveal
            >
              <dt className="max-w-[250px] text-[9px] leading-snug text-[var(--slate)] sm:text-[10px]">{stat.label}</dt>
              <dd
                className="mt-2 text-[clamp(2rem,4.5vw,3.8rem)] font-semibold leading-none tracking-[-0.08em] text-[var(--midnight-ink)]"
                data-count-to={stat.countTo}
                data-count-suffix={stat.suffix}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ol className="m-0 mt-8 list-none p-0 sm:mt-10" aria-label={copy.services}>
          {services.map((service) => (
            <li className="group relative border-t border-[rgba(17,24,39,0.16)] last:border-b" key={service.id} data-service-reveal>
              <span className="absolute inset-y-4 left-0 w-0.5 origin-top scale-y-0 bg-[var(--voltage-violet)] transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" aria-hidden="true" />
              <article className="grid grid-cols-[minmax(0,1fr)_30px] items-start gap-x-4 py-5 sm:grid-cols-[minmax(0,1fr)_44px] sm:gap-x-8 sm:py-7">
                <div className="min-w-0">
                  <h3 className="m-0 text-[clamp(1.15rem,2.4vw,1.9rem)] font-semibold leading-tight tracking-[-0.055em] text-[var(--midnight-ink)]">
                    {service.title}
                  </h3>
                  <p className="m-0 mt-2 max-w-[720px] text-xs leading-relaxed text-[var(--graphite)] sm:mt-2 sm:text-[13px]">
                    {service.description}
                  </p>
                </div>
                <span className="pt-1 text-right font-mono text-[9px] text-[var(--ultra-violet)]">{service.number}</span>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
