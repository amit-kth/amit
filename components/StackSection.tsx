"use client";

import { useLayoutEffect, useRef } from "react";
import { copy, profile, stackGroups } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

type SkillMarqueeProps = {
  items: readonly string[];
  direction: "left" | "right";
  index: string;
};

function SkillMarquee({ items, direction, index }: SkillMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const track = root.querySelector<HTMLElement>("[data-skill-track]");
      if (!track) return;
      if (direction === "right") gsap.set(track, { xPercent: -50 });

      const tween = gsap.to(track, {
        xPercent: direction === "left" ? -50 : 0,
        duration: window.matchMedia("(max-width: 767px)").matches ? 42 : 34,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => { if (!document.hidden) tween.play(); },
        onEnterBack: () => { if (!document.hidden) tween.play(); },
        onLeave: () => tween.pause(),
        onLeaveBack: () => tween.pause(),
      });
      const pause = () => tween.pause();
      const resume = () => { if (trigger.isActive && !document.hidden) tween.play(); };
      const onVisibilityChange = () => {
        if (document.hidden) tween.pause();
        else if (trigger.isActive) tween.play();
      };

      root.addEventListener("pointerenter", pause);
      root.addEventListener("pointerleave", resume);
      root.addEventListener("focusin", pause);
      root.addEventListener("focusout", resume);
      document.addEventListener("visibilitychange", onVisibilityChange);
      if (trigger.isActive && !document.hidden) tween.play();

      return () => {
        root.removeEventListener("pointerenter", pause);
        root.removeEventListener("pointerleave", resume);
        root.removeEventListener("focusin", pause);
        root.removeEventListener("focusout", resume);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        tween.kill();
        trigger.kill();
      };
    }, root);

    return () => context.revert();
  }, [direction, reducedMotion]);

  return (
    <div className="grid min-h-[64px] grid-cols-[38px_minmax(0,1fr)] items-center border-t border-[var(--mist)] first:border-t-0 sm:min-h-[82px] sm:grid-cols-[54px_minmax(0,1fr)]" ref={rootRef} role="group" aria-label={`Skill strip ${index}`}>
      <span className="font-mono text-[8px] text-[var(--ultra-violet)] sm:text-[9px]">{index}</span>
      <div className="min-w-0 overflow-hidden">
        {reducedMotion ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 sm:gap-x-8">
            {items.map((item, itemIndex) => (
              <span className="inline-flex items-center gap-3 text-sm font-semibold leading-none tracking-[-0.04em] text-[var(--graphite)] sm:text-base" key={`${item}-${itemIndex}`}>
                {item}<i className="size-1 shrink-0 rotate-45 rounded-[2px] bg-[var(--voltage-violet)]" aria-hidden="true" />
              </span>
            ))}
          </div>
        ) : (
          <div className="flex w-max will-change-transform" data-skill-track>
            {[0, 1].map((copyIndex) => (
              <div className="flex shrink-0 items-center gap-5 px-4 sm:gap-8 sm:px-6" key={copyIndex} aria-hidden={copyIndex === 1}>
                {items.map((item, itemIndex) => (
                  <span className="inline-flex items-center gap-5 whitespace-nowrap text-[clamp(1.25rem,3.2vw,3.4rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--graphite)] sm:gap-8" key={`${item}-${itemIndex}`}>
                    {item}<i className="size-1.5 shrink-0 rotate-45 rounded-[2px] bg-[var(--voltage-violet)] sm:size-2" aria-hidden="true" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const marqueeContent = [
  stackGroups[0].items,
  [...stackGroups[1].items, ...stackGroups[4].items],
  [...stackGroups[2].items, ...stackGroups[3].items],
] as const;

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>("[data-stack-heading]");
      if (heading) {
        gsap.fromTo(heading, { y: 18, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });
      }
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden bg-[var(--pure-white)] py-[clamp(74px,8vw,120px)]" id="skills" ref={sectionRef} aria-labelledby="stack-title">
      <header className="mx-auto mb-8 grid max-w-[1480px] gap-5 px-[clamp(20px,5vw,84px)] sm:mb-11 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.5fr)] md:items-end" data-stack-heading>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--ultra-violet)]">{copy.stackEyebrow}</p>
          <h2 className="mt-2 text-[clamp(3rem,7.5vw,7rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-[var(--midnight-ink)]" id="stack-title">
            {copy.stackTitle}<span className="text-[var(--voltage-violet)]">.</span>
          </h2>
        </div>
        <p className="max-w-[300px] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.09em] text-[var(--slate)] md:justify-self-end md:text-right">
          {profile.techSummary}<br />{profile.experienceYears} years in frontend
        </p>
      </header>

      <div className="overflow-hidden border-y border-[var(--mist)] bg-[var(--fog)] px-[clamp(20px,5vw,84px)]" role="group" aria-label="Skills and tools">
        <div className="mx-auto max-w-[1480px]">
          <SkillMarquee items={marqueeContent[0]} direction="left" index="01" />
          <SkillMarquee items={marqueeContent[1]} direction="right" index="02" />
          <SkillMarquee items={marqueeContent[2]} direction="left" index="03" />
        </div>
      </div>
    </section>
  );
}
