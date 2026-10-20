"use client";

import { useLayoutEffect, useRef } from "react";
import { copy, profile, stackGroups } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll<HTMLElement>(".skill-card"),
        { y: 18, autoAlpha: 0 },
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
    <section className="stack-section content-section" id="skills" ref={sectionRef} aria-labelledby="stack-title">
      <div className="section-shell stack-section__layout section-card">
        <div className="section-marker">
          <span className="section-marker__number">{copy.stackEyebrow.split(" /")[0]}</span>
          <span>{copy.stack}</span>
        </div>

        <header className="stack-section__head">
          <div className="stack-section__heading">
            <p className="eyebrow">{copy.stackEyebrow}</p>
            <h2 id="stack-title">{copy.stackTitle}</h2>
          </div>
          <p className="stack-section__note">
            {profile.techSummary}<br />{profile.experienceYears} years in frontend
          </p>
        </header>

        <div className="skill-card-grid" role="list" aria-label="Skills and tools">
          {stackGroups.map((group, index) => (
            <article className={`skill-card${index === 0 ? " skill-card--featured" : ""}`} key={group.id} role="listitem">
              <header className="skill-card__head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
              </header>
              <ul className="skill-card__list">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
