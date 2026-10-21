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
      const intro = section.querySelector<HTMLElement>("[data-service-intro]");
      if (intro) {
        gsap.fromTo(
          intro,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.68,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          },
        );
      }

      const list = section.querySelector<HTMLElement>("[data-services-list]");
      const progressFill = list?.querySelector<HTMLElement>(".services-list__track-fill");
      if (list && progressFill) {
        gsap.fromTo(
          progressFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 76%",
              end: "bottom 48%",
              scrub: 0.42,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const colors = getComputedStyle(section);
      const accent = colors.getPropertyValue("--ultra-violet").trim() || "#5F259E";
      const ink = colors.getPropertyValue("--midnight-ink").trim() || "#111827";
      const lavender = colors.getPropertyValue("--lavender-field").trim() || "#EBDAFD";
      const muted = colors.getPropertyValue("--slate").trim() || "#6B7589";
      const line = "rgba(17, 24, 39, 0.2)";

      const rows = Array.from(section.querySelectorAll<HTMLElement>("[data-service-row]"));
      for (const row of rows) {
        const title = row.querySelector<HTMLElement>("[data-service-title]");
        const description = row.querySelector<HTMLElement>("[data-service-description]");
        const number = row.querySelector<HTMLElement>("[data-service-number]");
        const sequence = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "bottom 38%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        sequence
          .fromTo(
            row,
            { y: 18, opacity: 0.58 },
            { y: 0, opacity: 1, duration: 0.42, ease: "none" },
            0,
          )
          .to(row, { y: -3, opacity: 0.84, duration: 0.58, ease: "none" }, 0.42);

        if (title) {
          sequence
            .fromTo(
              title,
              { x: -10, scale: 0.975, color: muted },
              { x: 0, scale: 1.018, color: accent, duration: 0.4, ease: "none" },
              0,
            )
            .to(title, { scale: 1, color: ink, duration: 0.6, ease: "none" }, 0.4);
        }

        if (description) {
          sequence
            .fromTo(
              description,
              { y: 8, opacity: 0.54 },
              { y: 0, opacity: 1, duration: 0.42, ease: "none" },
              0.04,
            )
            .to(description, { y: -2, opacity: 0.84, duration: 0.58, ease: "none" }, 0.42);
        }

        if (number) {
          sequence
            .fromTo(
              number,
              {
                scale: 0.82,
                color: muted,
                borderColor: line,
                backgroundColor: "rgba(235, 218, 253, 0)",
              },
              {
                scale: 1,
                color: accent,
                borderColor: accent,
                backgroundColor: lavender,
                duration: 0.4,
                ease: "none",
              },
              0,
            )
            .to(
              number,
              {
                scale: 0.92,
                color: muted,
                borderColor: line,
                backgroundColor: "rgba(235, 218, 253, 0.12)",
                duration: 0.6,
                ease: "none",
              },
              0.4,
            );
        }
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
        <header className="max-w-[920px]" data-service-intro>
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

        <div className="services-list-wrap mt-8 sm:mt-10" data-services-list>
          <span className="services-list__track" aria-hidden="true">
            <span className="services-list__track-fill" />
          </span>
          <ol className="services-list m-0 list-none" aria-label={copy.services}>
            {services.map((service) => (
              <li className="services-list__row" key={service.id} data-service-row>
                <article className="services-list__article">
                  <span className="services-list__number" data-service-number aria-hidden="true">{service.number}</span>
                  <div className="services-list__copy">
                    <h3 className="services-list__title" data-service-title>
                      {service.title}
                    </h3>
                    <p className="services-list__description" data-service-description>
                      {service.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
