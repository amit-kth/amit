"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { education, profile } from "@/data/profile";
import { gsap, registerGsapPlugins, SplitText } from "@/lib/gsap-client";

type HeroSectionProps = {
  introReady: boolean;
};

export function HeroSection({ introReady }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!introReady || !section || !title) return;
    registerGsapPlugins();

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          tablet: "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const conditions = mediaContext.conditions as
            | { desktop: boolean; tablet: boolean; mobile: boolean; reduced: boolean }
            | undefined;
          if (conditions?.reduced) return;

          const split = SplitText.create(title, { type: "words", wordsClass: "hero-title__word", aria: "auto" });
          gsap.set(split.words, { yPercent: 110 });
          const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
          intro.to(split.words, {
            yPercent: 0,
            duration: conditions?.mobile ? 0.68 : 0.82,
            stagger: conditions?.mobile ? 0.04 : 0.08,
          });
          const supporting = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-enter]"));
          intro.from(supporting, { y: 14, duration: 0.62, stagger: 0.07, ease: "power3.out" }, "-=0.52");

          const magneticButtons = Array.from(section.querySelectorAll<HTMLAnchorElement>(".hero-actions .button"));
          const magneticCleanups: Array<() => void> = [];
          if (conditions?.desktop) {
            for (const button of magneticButtons) {
              const xTo = gsap.quickTo(button, "x", { duration: 0.38, ease: "power3.out" });
              const yTo = gsap.quickTo(button, "y", { duration: 0.38, ease: "power3.out" });
              const move = (event: PointerEvent) => {
                if (event.pointerType === "touch") return;
                const rect = button.getBoundingClientRect();
                xTo(((event.clientX - rect.left) / rect.width - 0.5) * 8);
                yTo(((event.clientY - rect.top) / rect.height - 0.5) * 6);
              };
              const leave = () => { xTo(0); yTo(0); };
              button.addEventListener("pointermove", move, { passive: true });
              button.addEventListener("pointerleave", leave, { passive: true });
              magneticCleanups.push(() => {
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", leave);
              });
            }
          }

          const glow = section.querySelector<HTMLElement>(".hero-orbit");
          if (glow && conditions?.desktop) {
            gsap.to(glow, {
              yPercent: -12,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
              },
            });
          }

          return () => {
            magneticCleanups.forEach((cleanup) => cleanup());
            split.revert();
          };
        },
      );
      return () => media.revert();
    }, section);

    return () => context.revert();
  }, [introReady]);

  return (
    <section className="hero-section" id="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-section__inner">
        <div className="hero-kicker" data-hero-enter>
          <span className="status-dot" aria-hidden="true" />
          <span>Open to work</span>
        </div>
        <div className="hero-main">
          <div className="hero-main__copy">
            <h1 className="hero-title" id="hero-title" ref={titleRef}>{profile.name}</h1>
            <p className="hero-role" data-hero-enter>{profile.title} · UI/UX Mindset</p>
            <p className="hero-tagline" data-hero-enter>{profile.hero.tagline}</p>
            <dl className="hero-facts" data-hero-enter>
              <div><dt>Experience</dt><dd>{profile.experienceYears}+ Years</dd></div>
              <div><dt>Location</dt><dd>{profile.location}</dd></div>
              <div className="hero-fact--education"><dt>Education</dt><dd>{education.qualification}, {education.institution}</dd></div>
            </dl>
            <div className="hero-actions" data-hero-enter>
              <a className="button button--primary" href="#journey">View Journey<ArrowDownRight size={17} aria-hidden="true" /></a>
              <a className="button button--quiet" href="/resume.txt" download>Download Resume<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
