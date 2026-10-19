"use client";

import { useLayoutEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { copy, profile, services } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

const serviceVariants: Record<(typeof services)[number]["id"], string> = {
  "uiux-design": "service-card--design",
  "frontend-development": "service-card--featured",
  "animation-interaction": "service-card--motion",
  "performance-accessibility": "service-card--quality",
};

function moveSpotlight(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const localX = event.clientX - bounds.left;
  const localY = event.clientY - bounds.top;
  const tiltX = (localX / bounds.width - 0.5) * 4;
  const tiltY = (0.5 - localY / bounds.height) * 4;
  card.style.setProperty("--spot-x", `${localX}px`);
  card.style.setProperty("--spot-y", `${localY}px`);
  card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
}

function resetSpotlight(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackItems = profile.techSummary.split(" / ");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsapPlugins();
    const context = gsap.context(() => {
      const elements = section.querySelectorAll<HTMLElement>(".services-section__heading, .service-card");
      gsap.fromTo(elements,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section className="services-section content-section" id="what-i-do" ref={sectionRef} aria-labelledby="services-title">
      <div className="section-shell services-section__layout">
        <div className="services-section__head">
          <div className="section-marker">
            <span className="section-marker__number">{copy.servicesEyebrow.split(" /")[0]}</span>
            <span>{copy.services}</span>
          </div>
          <div className="services-section__heading">
            <p className="eyebrow">{copy.servicesEyebrow}</p>
            <h2 id="services-title">{copy.servicesTitle}</h2>
          </div>
        </div>

        <div className="services-bento" role="list" aria-label={copy.services}>
          {services.map((service) => (
            <article
              className={`service-card ${serviceVariants[service.id]}`}
              key={service.id}
              role="listitem"
              onPointerMove={moveSpotlight}
              onPointerLeave={resetSpotlight}
            >
              <div className="service-card__topline">
                <span>{service.number} <i>/</i> 04</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
              {service.id === "frontend-development" && (
                <div className="service-card__stack">
                  {stackItems.map((item, index) => (
                    <span key={item}>
                      {item}{index < stackItems.length - 1 && <i aria-hidden="true">→</i>}
                    </span>
                  ))}
                </div>
              )}
              <div className="service-card__copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
