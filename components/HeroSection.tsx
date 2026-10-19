"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap, registerGsapPlugins, SplitText } from "@/lib/gsap-client";

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

          const heroArt = section.closest(".experience-story__stage")?.querySelector<HTMLElement>(".hero-art");
          if (heroArt) {
            intro.fromTo(
              heroArt,
              { y: 34, rotation: -3, scale: 0.94, opacity: 0 },
              { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
              "-=0.64",
            );
            const nodes = heroArt.querySelectorAll<HTMLElement>("[data-hero-art-node]");
            intro.from(nodes, { y: 14, scale: 0.92, opacity: 0, duration: 0.58, stagger: 0.11, ease: "back.out(1.6)" }, "-=0.62");
            const route = heroArt.querySelector<SVGPathElement>(".hero-art__route-path");
            if (route) {
              intro.fromTo(route, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" }, "-=0.86");
            }
          }

          const magneticButtons = Array.from(section.querySelectorAll<HTMLAnchorElement>(".hero-actions .button"));
          const cleanups: Array<() => void> = [];
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
              cleanups.push(() => {
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", leave);
              });
            }

            if (heroArt) {
              const rotateXTo = gsap.quickTo(heroArt, "rotationX", { duration: 0.7, ease: "power3.out" });
              const rotateYTo = gsap.quickTo(heroArt, "rotationY", { duration: 0.7, ease: "power3.out" });
              const move = (event: PointerEvent) => {
                if (event.pointerType === "touch") return;
                const rect = heroArt.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                rotateXTo(y * -3.5);
                rotateYTo(x * 4.5);
              };
              const reset = () => {
                rotateXTo(0);
                rotateYTo(0);
              };
              section.addEventListener("pointermove", move, { passive: true });
              section.addEventListener("pointerleave", reset, { passive: true });
              cleanups.push(() => {
                section.removeEventListener("pointermove", move);
                section.removeEventListener("pointerleave", reset);
              });

              gsap.to(heroArt, {
                yPercent: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: section.closest(".experience-story__stage") ?? section,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.55,
                },
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
