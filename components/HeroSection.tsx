"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, Download } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { copy, profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

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
    const heroStage = section.closest<HTMLElement>("[data-hero-stage]") ?? section;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const enterElements = section.querySelectorAll<HTMLElement>("[data-hero-enter]");
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.fromTo(
        title,
        { y: mobile ? 18 : 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: mobile ? 0.68 : 0.82,
          clearProps: "transform,opacity,visibility",
        },
      );
      intro.fromTo(
        enterElements,
        { y: 12, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: mobile ? 0.48 : 0.56,
          stagger: mobile ? 0.055 : 0.07,
          clearProps: "transform,opacity,visibility",
        },
        "-=0.4",
      );

      const scrollContent = section.querySelector<HTMLElement>("[data-hero-scroll-content]");
      if (scrollContent) {
        gsap.set(scrollContent, {
          filter: "blur(0px)",
          transformOrigin: "50% 50%",
          willChange: "transform, filter, opacity",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: heroStage,
            start: "top top",
            end: "bottom top",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        })
          .to(scrollContent, {
            scale: mobile ? 1.08 : 1.12,
            filter: "blur(1px)",
            autoAlpha: 1,
            ease: "none",
            duration: 0.35,
          })
          .to(scrollContent, {
            scale: mobile ? 1.28 : 1.42,
            filter: mobile ? "blur(10px)" : "blur(14px)",
            autoAlpha: 0,
            ease: "none",
            duration: 0.65,
          });
      }

    }, section);

    return () => context.revert();
  }, [introReady, reducedMotion]);

  return (
    <section
      className="relative z-10 h-full min-h-0 px-5 sm:px-8 lg:px-12"
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 flex h-[72px] w-[min(320px,calc(100%_-_16px))] -translate-x-1/2 flex-col items-center justify-center rounded-b-[32px] border-x border-b border-white/80 bg-[var(--surface-warm)] px-5 pb-1 pt-1 shadow-[0_10px_26px_rgba(17,24,39,0.055)] sm:h-[80px] sm:w-[min(340px,calc(100%_-_24px))] sm:rounded-b-[38px]">
        <a className="pointer-events-auto flex flex-col items-center gap-1 text-center text-[var(--midnight-ink)]" href="#hero" aria-label={`${profile.name}, ${profile.hero.roleLabel}`}>
          <strong className="text-[13px] font-semibold leading-none tracking-[-0.03em] sm:text-sm">{profile.name}</strong>
          <span className="text-[9px] font-medium leading-none text-[var(--graphite)] sm:text-[10px]">{profile.hero.roleLabel}</span>
        </a>
      </div>

      <div className="grid h-full min-h-0 place-items-center pt-[76px] pb-[76px] sm:pt-[88px] sm:pb-[88px]">
        <div className="w-full max-w-[1020px] text-center" data-hero-scroll-content>
          <div
            className="hero-experience-chip mx-auto inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-white/75 bg-[rgba(255,255,255,0.42)] px-4 py-2 text-[12px] font-semibold normal-case tracking-[0.02em] text-[var(--ultra-violet)] shadow-[0_10px_28px_rgba(17,24,39,0.1),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-xl backdrop-saturate-150"
            data-hero-enter
          >
            <span className="size-1.5 rounded-full bg-[var(--voltage-violet)]" aria-hidden="true" />
            <span>{profile.experienceYears}+ years of experience</span>
          </div>
          <h1
            className="mx-auto mt-4 block max-w-[1020px] text-center text-[clamp(2.5rem,6vw,6.25rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-[var(--midnight-ink)] normal-case sm:mt-6"
            id="hero-title"
            ref={titleRef}
            aria-label={profile.hero.headline.join(" ")}
          >
            <span className="block">{profile.hero.headline[0]}</span>
            <span className="block text-[var(--ultra-violet)]">{profile.hero.headline[1]}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[640px] text-sm font-medium leading-snug text-[var(--graphite)] sm:mt-5 sm:text-lg" data-hero-enter>
            {profile.hero.tagline}
          </p>
          <p className="mx-auto mt-1.5 max-w-[600px] text-[11px] leading-relaxed text-[var(--slate)] sm:mt-2 sm:text-xs" data-hero-enter>
            {profile.hero.locationLine}
          </p>
          <div className="mx-auto mt-4 flex w-full max-w-[360px] flex-col justify-center gap-2 sm:mt-6 sm:w-auto sm:max-w-none sm:flex-row" data-hero-enter>
            <GlassButton
              href={profile.links.resume}
              download
              variant="primary"
              className="w-full min-h-10 sm:min-h-11 sm:w-auto"
            >
              {copy.downloadResume}<Download size={15} aria-hidden="true" />
            </GlassButton>
            <GlassButton
              href="#journey"
              variant="secondary"
              className="w-full min-h-10 sm:min-h-11 sm:w-auto"
            >
              View journey<ArrowDownRight size={16} aria-hidden="true" />
            </GlassButton>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[46px] w-[min(340px,calc(100%_-_8px))] -translate-x-1/2 rounded-t-[32px] border-x border-t border-white/80 bg-[var(--surface-warm)] shadow-[0_-8px_22px_rgba(17,24,39,0.045)] sm:h-[52px] sm:w-[min(360px,calc(100%_-_16px))] sm:rounded-t-[38px]"
        aria-hidden="true"
      />
    </section>
  );
}
