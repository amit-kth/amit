"use client";

import { useLayoutEffect, useRef } from "react";
import { copy, profile, services } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll<HTMLElement>(".service-card"),
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true } },
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
            <p>{profile.roleInterest}</p>
          </div>
        </div>
        <div className="services-cards" role="list" aria-label={copy.services}>
          {services.map((service) => (
            <article className="service-card" key={service.id} role="listitem">
              <span className="service-card__number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
