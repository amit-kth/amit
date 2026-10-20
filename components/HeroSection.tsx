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
      gsap.set(split.words, { display: "inline-block", yPercent: 110, autoAlpha: 0 });

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
    <section
      className="relative z-10 flex h-full min-h-0 flex-col items-stretch justify-between px-5 pt-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] sm:px-8 sm:pt-7 lg:px-12 lg:pt-9"
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <a className="flex w-fit items-center gap-2.5 text-[var(--midnight-ink)]" href="#hero" aria-label={`${profile.name}, portfolio home`}>
          <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-[var(--midnight-ink)] shadow-[0_6px_16px_rgba(17,24,39,0.16)]" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[var(--lavender-mist)] shadow-[0_0_14px_rgba(173,109,244,0.7)]" />
          </span>
          <span className="grid gap-0.5">
            <strong className="text-[13px] font-bold leading-none">{profile.name}</strong>
            <small className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--slate)]">{profile.title}</small>
          </span>
        </a>

        <span className="hidden text-center font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--graphite)] lg:block">
          {profile.hero.roleLabel}
        </span>
        <span className="justify-self-end text-right font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--graphite)]">
          {profile.hero.portfolioLabel}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 place-items-center py-3 sm:py-7 lg:py-8">
        <div className="w-full max-w-[1020px] text-center">
          <div
            className="mx-auto inline-flex min-h-8 items-center justify-center gap-2 rounded-full border border-[rgba(95,37,158,0.18)] bg-[rgba(255,255,255,0.78)] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.09em] text-[var(--ultra-violet)]"
            data-hero-enter
          >
            <span className="size-1.5 rounded-full bg-[var(--voltage-violet)]" aria-hidden="true" />
            <span>{profile.location}</span>
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
            <a
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[var(--voltage-violet)] px-5 text-xs sm:min-h-11 font-semibold text-[var(--pure-white)] shadow-[0_8px_22px_rgba(95,37,158,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--ultra-violet)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              href="#journey"
            >
              View journey<ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[var(--mist)] bg-[rgba(255,255,255,0.82)] px-5 text-xs font-semibold text-[var(--midnight-ink)] transition sm:min-h-11 duration-200 hover:-translate-y-0.5 hover:border-[var(--lavender-mist)] hover:bg-[var(--pure-white)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              href={profile.links.resume}
              download
            >
              Download résumé<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[rgba(17,24,39,0.12)] pt-3 font-mono text-[8px] uppercase tracking-[0.07em] text-[var(--graphite)]">
        <span>{profile.experienceYears} years in frontend</span>
        <span className="hidden text-center text-[var(--ultra-violet)] sm:inline">{profile.techSummary}</span>
        <a className="inline-flex items-center gap-1.5 whitespace-nowrap text-[var(--ultra-violet)] transition hover:gap-2.5 motion-reduce:transition-none" href="#what-i-do">
          {copy.scroll}<ArrowDownRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
