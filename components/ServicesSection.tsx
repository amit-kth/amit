"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { SectionCard } from "@/components/ui/section-card";
import { copy, services } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const elements = section.querySelectorAll<HTMLElement>(".services-section__heading, .service-card");
      gsap.fromTo(
        elements,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="px-[clamp(14px,3vw,32px)] py-2 md:py-3" id="what-i-do" ref={sectionRef} aria-labelledby="services-title">
      <SectionCard className="p-5 sm:p-7 lg:p-9">
        <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ultra-violet)]">{copy.servicesEyebrow}</p>
            <h2 className="services-section__heading mt-2 text-[clamp(2.4rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.075em] text-[var(--midnight-ink)]" id="services-title">
              {copy.servicesTitle}
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" role="list" aria-label={copy.services}>
          {services.map((service) => (
            <article
              className="service-card group flex min-h-[170px] flex-col justify-between sm:min-h-[190px] xl:min-h-[220px] rounded-[22px] border border-[var(--mist)] bg-[var(--pure-white)] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(134,47,231,0.36)] hover:shadow-[0_18px_36px_rgba(17,24,39,0.09)] sm:p-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              key={service.id}
              role="listitem"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-[var(--slate)]">
                <span>{service.number} <i className="px-1 text-[var(--ultra-violet)]">/</i> 04</span>
                <ArrowUpRight className="text-[var(--ultra-violet)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" size={18} aria-hidden="true" />
              </div>
              <div className="mt-auto pt-6">
                <h3 className="min-h-[2.3em] text-[clamp(1.15rem,1.45vw,1.4rem)] font-semibold leading-tight tracking-[-0.045em] text-[var(--midnight-ink)]">
                  {service.title}
                </h3>
                <p className="mt-2 min-h-[3.5em] text-xs leading-relaxed text-[var(--graphite)]">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}
