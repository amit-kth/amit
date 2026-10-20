"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { copy, profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { gsap, registerGsapPlugins, SplitText } from "@/lib/gsap-client";

type HeroSectionProps = {
  introReady: boolean;
};

export function HeroSection({ introReady }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!introReady || !section || !title || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const split = SplitText.create(title, { type: "words", wordsClass: "hero-title__word", aria: "auto" });
      gsap.set(split.words, { yPercent: 110, autoAlpha: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.to(split.words, {
        yPercent: 0,
        autoAlpha: 1,
        duration: mobile ? 0.62 : 0.76,
        stagger: mobile ? 0.04 : 0.07,
      });
      intro.from(
        section.querySelectorAll<HTMLElement>("[data-hero-enter]"),
        { y: 12, autoAlpha: 0, duration: 0.48, stagger: 0.06, ease: "power3.out" },
        "-=0.3",
      );

      return () => split.revert();
    }, section);

    return () => context.revert();
  }, [introReady, reducedMotion]);

  return (
    <section className="hero-section" id="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-card__topline" data-hero-enter>
        <a className="hero-card__identity" href="#hero" aria-label={`${profile.name}, portfolio home`}>
          <span className="site-header__mark">{profile.brandMark}</span>
          <span className="hero-card__identity-copy">
            <strong>{profile.name}</strong>
            <small>{profile.title}</small>
          </span>
        </a>
        <span className="hero-card__topline-role">{profile.hero.roleLabel}</span>
        <span className="hero-card__topline-year">{profile.hero.portfolioLabel}</span>
      </div>

      <div className="hero-section__inner">
        <div className="hero-main__copy">
          <div className="hero-kicker" data-hero-enter>
            <span className="status-dot" aria-hidden="true" />
            <span>{profile.location}</span>
          </div>
          <h1
            className="hero-title"
            id="hero-title"
            ref={titleRef}
            aria-label={profile.hero.headline.join(" ")}
          >
            <span className="hero-title__line">{profile.hero.headline[0]}</span>
            <span className="hero-title__line hero-title__line--accent">{profile.hero.headline[1]}</span>
          </h1>
          <p className="hero-tagline" data-hero-enter>{profile.hero.tagline}</p>
          <p className="hero-intro" data-hero-enter>{profile.hero.locationLine}</p>
          <div className="hero-actions" data-hero-enter>
            <a className="button button--primary" href="#journey">
              View journey<ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a className="button button--quiet" href={profile.links.resume} download>
              Download résumé<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-card__footer" data-hero-enter>
        <span>{profile.experienceYears} years in frontend</span>
        <span className="hero-card__footer-stack">{profile.techSummary}</span>
        <a className="hero-card__scroll" href="#what-i-do">
          {copy.scroll}<ArrowDownRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
