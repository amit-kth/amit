"use client";

import { useLayoutEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

const [experienceStat, reactStat, userRangeStat] = profile.about.stats;

export function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsapPlugins();
    const context = gsap.context(() => {
      const elements = section.querySelectorAll<HTMLElement>("[data-proof-reveal]");
      gsap.fromTo(elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );
      gsap.fromTo(section.querySelector(".proof-section__range-fill"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section className="proof-section" id="proof" aria-label="Experience and product scale" ref={sectionRef}>
      <div className="section-shell proof-section__layout">
        <div className="section-marker" data-proof-reveal>
          <span className="section-marker__number">02</span>
          <span>In context</span>
        </div>

        <div className="proof-section__main" data-proof-reveal>
          <p className="eyebrow">{userRangeStat.label}</p>
          <h2 className="proof-section__number">{userRangeStat.value}</h2>
          <div className="proof-section__range" aria-hidden="true">
            <span>5K</span>
            <i><b className="proof-section__range-fill" /></i>
            <span>50K+</span>
          </div>
        </div>

        <dl className="proof-section__details" data-proof-reveal>
          <div>
            <dt>{experienceStat.label}</dt>
            <dd>{experienceStat.value}</dd>
          </div>
          <div>
            <dt>{reactStat.label}</dt>
            <dd>{reactStat.value}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
