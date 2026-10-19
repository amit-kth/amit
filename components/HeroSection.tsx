"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap, registerGsapPlugins, ScrollTrigger, SplitText } from "@/lib/gsap-client";

type HeroSectionProps = {
  introReady: boolean;
};

const [firstName, ...surnameParts] = profile.name.split(" ");
const surname = surnameParts.join(" ");

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
          intro.from(supporting, { y: 14, opacity: 0, duration: 0.62, stagger: 0.07, ease: "power3.out" }, "-=0.52");

          const cleanups: Array<() => void> = [];
          const heroArt = section.closest(".experience-story__stage")?.querySelector<HTMLElement>(".hero-art");
          if (heroArt) {
            intro.fromTo(
              heroArt,
              { y: 34, rotation: -3, scale: 0.94, opacity: 0 },
              { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
              "-=0.64",
            );
            const nodes = heroArt.querySelectorAll<HTMLElement>("[data-hero-art-node]");
            intro.from(nodes, { y: 12, scale: 0.96, opacity: 0, duration: 0.58, stagger: 0.07, ease: "power3.out" }, "-=0.62");

            const route = heroArt.querySelector<SVGPathElement>(".hero-art__route-path");
            const runner = heroArt.querySelector<SVGGElement>(".hero-art__runner-group");
            if (route && runner) {
              const routeLoop = gsap.timeline({ paused: true, repeat: -1 });
              const motionPath = { path: route, align: route, alignOrigin: [0.5, 0.5], autoRotate: false };
              routeLoop.to(runner, { motionPath, duration: 5.2, ease: "none" }, 0);

              const playRoute = () => { if (!document.hidden) routeLoop.play(); };
              const pauseRoute = () => routeLoop.pause();
              const routeTrigger = ScrollTrigger.create({
                trigger: heroArt,
                start: "top bottom",
                end: "bottom top",
                onEnter: playRoute,
                onEnterBack: playRoute,
                onLeave: pauseRoute,
                onLeaveBack: pauseRoute,
              });
              const onVisibility = () => {
                if (document.hidden || !routeTrigger.isActive) pauseRoute();
                else playRoute();
              };
              document.addEventListener("visibilitychange", onVisibility);
              if (routeTrigger.isActive) playRoute();
              cleanups.push(() => {
                document.removeEventListener("visibilitychange", onVisibility);
                routeTrigger.kill();
                routeLoop.kill();
              });
            }
          }

          return () => {
            cleanups.forEach((cleanup) => cleanup());
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
          <span>{profile.hero.roleLabel}</span>
        </div>
        <div className="hero-main">
          <div className="hero-main__copy">
            <h1 className="hero-title" id="hero-title" ref={titleRef} aria-label={profile.name}>
              <span className="hero-title__line">{firstName}</span>
              <span className="hero-title__line hero-title__line--accent">{surname}</span>
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
      </div>
      <span className="hero-section__folio" aria-hidden="true">{profile.hero.portfolioLabel} <i /> {profile.location}</span>
    </section>
  );
}
