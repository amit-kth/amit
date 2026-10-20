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
      const elements = section.querySelectorAll<HTMLElement>("[data-service-reveal]");
      gsap.fromTo(
        elements,
        { x: 24, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        },
      );
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="relative py-[clamp(76px,9vw,136px)]" id="what-i-do" ref={sectionRef} aria-labelledby="services-title">
      <div className="mx-auto max-w-[1480px] px-[clamp(20px,5vw,84px)]">
        <header className="grid gap-7 border-b border-[rgba(17,24,39,0.18)] pb-8 md:grid-cols-[minmax(145px,0.38fr)_minmax(0,1.62fr)] md:gap-10 md:pb-11">
          <div className="flex items-start gap-3 pt-2 font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--ultra-violet)]" data-service-reveal>
            <span>01</span><span className="text-[var(--slate)]">/</span><span>{copy.services}</span>
          </div>
          <div data-service-reveal>
            <h2 className="mt-2 text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-[var(--midnight-ink)]" id="services-title">
              {copy.servicesTitle}<span className="text-[var(--voltage-violet)]">.</span>
            </h2>
            <p className="mt-5 max-w-[680px] text-sm leading-relaxed text-[var(--graphite)] sm:text-base">
              {profile.about.statement}
            </p>
          </div>
        </header>

        <div className="mt-8 grid gap-9 lg:mt-12 lg:grid-cols-[minmax(180px,0.42fr)_minmax(0,1.58fr)] lg:gap-12">
          <aside className="hidden lg:flex lg:flex-col lg:items-start lg:pt-4" aria-hidden="true">
            <span className="text-[clamp(4.5rem,9vw,8rem)] font-semibold leading-[0.78] tracking-[-0.1em] text-transparent [-webkit-text-stroke:1px_var(--orchid-wash)]">01—04</span>
            <span className="mt-7 h-px w-16 bg-[var(--voltage-violet)]" />
            <span className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--slate)]">One connected practice</span>
          </aside>

          <ol className="m-0 list-none p-0" aria-label={copy.services}>
            {services.map((service) => (
              <li className="group relative border-t border-[rgba(17,24,39,0.18)] first:border-t-0" key={service.id} data-service-reveal>
                <span className="absolute inset-y-4 left-0 w-px origin-top scale-y-0 bg-[var(--voltage-violet)] transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" aria-hidden="true" />
                <article className="grid grid-cols-[34px_minmax(0,1fr)] items-start gap-x-3 py-5 transition-[padding] duration-300 group-hover:pl-3 motion-reduce:transition-none sm:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1fr)] sm:gap-x-5 sm:py-7">
                  <span className="pt-1 font-mono text-[9px] text-[var(--ultra-violet)]">{service.number}</span>
                  <h3 className="m-0 text-[clamp(1.15rem,2.3vw,1.8rem)] font-semibold leading-tight tracking-[-0.055em] text-[var(--midnight-ink)] sm:pt-0.5">
                    {service.title}
                  </h3>
                  <p className="col-start-2 row-start-2 m-0 mt-2 max-w-[460px] text-xs leading-relaxed text-[var(--graphite)] sm:col-start-3 sm:row-start-1 sm:mt-1 sm:text-[13px]">
                    {service.description}
                  </p>
                </article>
              </li>
            ))}
            <li className="border-t border-[rgba(17,24,39,0.18)]" aria-hidden="true" />
          </ol>
        </div>
      </div>
    </section>
  );
}
