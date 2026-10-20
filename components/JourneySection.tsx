"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { awards, copy, education, journey } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
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
          duration: 0.48,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="journey-section content-section" id="journey" ref={sectionRef} aria-labelledby="journey-title">
      <div className="section-shell journey-section__layout section-card">
        <div className="section-marker">
          <span className="section-marker__number">04</span>
          <span>{copy.journey}</span>
        </div>

        <header className="journey-section__header">
          <div>
            <p className="eyebrow">{copy.journeyCaption}</p>
            <h2 id="journey-title">{copy.journeyTitle}</h2>
          </div>
          <p>{copy.journeyIntro}</p>
        </header>

        <div className="journey-list" aria-label={copy.journey}>
          {journey.map((item, index) => (
            <article className="journey-row" key={item.id} data-journey-row>
              <div className="journey-row__topline">
                <span className="journey-row__number">0{index + 1}</span>
                <span className="journey-row__period">{item.period}</span>
                <span className="journey-row__year">{item.year}</span>
              </div>
              <div className="journey-row__copy">
                <h3>{item.role}</h3>
                <p className="journey-row__company">{item.company}</p>
                <p className="journey-row__description">{item.description}</p>
              </div>
              <ArrowUpRight className="journey-row__arrow" size={20} aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="journey-extras">
          <section className="journey-extra-card" aria-labelledby="education-title">
            <p className="eyebrow">{copy.journeyEducation}</p>
            <h3 id="education-title">{education.qualification}</h3>
            <p>{education.institution} <span>·</span> {education.dates}</p>
          </section>
          <section className="journey-extra-card" aria-labelledby="recognition-title">
            <p className="eyebrow">{copy.recognition}</p>
            <h3 className="sr-only" id="recognition-title">{copy.recognition}</h3>
            <ul>
              {awards.map((award) => (
                <li key={award.title}>
                  <span>{award.title}</span>
                  {"organization" in award && <small>{award.organization}</small>}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
