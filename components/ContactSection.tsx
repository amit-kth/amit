"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { copy, profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    registerGsapPlugins();
    const context = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll<HTMLElement>("[data-contact-reveal]"),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="contact-section content-section" id="contact" ref={sectionRef} aria-labelledby="contact-title">
      <div className="section-shell contact-section__layout section-card section-card--contact">
        <div className="section-marker" data-contact-reveal>
          <span className="section-marker__number">05</span>
          <span>{copy.contact}</span>
        </div>

        <div className="contact-section__main">
          <p className="eyebrow" data-contact-reveal>Open to senior roles</p>
          <h2 id="contact-title" data-contact-reveal>
            Open to <span>senior frontend</span> roles.
          </h2>
          <p className="contact-section__note" data-contact-reveal>
            React / Next.js roles at product companies, in India and remote.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`} data-contact-reveal>
            <span>{profile.email}</span>
            <ArrowUpRight size={26} aria-hidden="true" />
          </a>
          <div className="contact-links" data-contact-reveal>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={profile.links.resume} download>Download résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
