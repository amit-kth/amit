"use client";

import { useLayoutEffect, useRef } from "react";
import { copy, profile, stackGroups } from "@/data/profile";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

type StackMarqueeProps = {
  items: readonly string[];
  direction: "left" | "right";
  index: string;
};

function StackMarquee({ items, direction, index }: StackMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
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
          const track = root.querySelector<HTMLElement>(".stack-marquee__track");
          if (!track) return;
          if (direction === "right") gsap.set(track, { xPercent: -50 });
          const tween = gsap.to(track, {
            xPercent: direction === "left" ? -50 : 0,
            duration: conditions?.mobile ? 62 : 52,
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
          root.addEventListener("pointerenter", pause);
          root.addEventListener("pointerleave", resume);
          root.addEventListener("focusin", pause);
          root.addEventListener("focusout", resume);
          const onVisibility = () => {
            if (document.hidden) tween.pause();
            else if (trigger.isActive) tween.play();
          };
          document.addEventListener("visibilitychange", onVisibility);
          if (trigger.isActive && !document.hidden) tween.play();

          return () => {
            document.removeEventListener("visibilitychange", onVisibility);
            root.removeEventListener("pointerenter", pause);
            root.removeEventListener("pointerleave", resume);
            root.removeEventListener("focusin", pause);
            root.removeEventListener("focusout", resume);
            tween.kill();
            trigger.kill();
          };
        },
      );
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, [direction]);

  return (
    <div className={`stack-marquee stack-marquee--${direction}`} ref={rootRef} role="group" aria-label="Skills and tools">
      <div className="stack-marquee__index">{index}</div>
      <div className="stack-marquee__window">
        <div className="stack-marquee__track">
          {[0, 1].map((copyIndex) => (
            <div className="stack-marquee__set" key={copyIndex} aria-hidden={copyIndex === 1}>
              {items.map((item, itemIndex) => (
                <span className="stack-marquee__item" key={`${item}-${itemIndex}`}>
                  {item}<i aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeContent = [
    stackGroups[0].items,
    [...stackGroups[1].items, ...stackGroups[4].items.slice(0, 6)],
    [...stackGroups[2].items, ...stackGroups[3].items],
  ] as const;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
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
          const heading = section.querySelector<HTMLElement>(".stack-section__heading");
          if (heading) {
            gsap.fromTo(heading, { y: 24 }, {
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 88%", once: true },
            });
          }
        },
      );
      return () => media.revert();
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section className="stack-section content-section" id="skills" ref={sectionRef} aria-labelledby="stack-title">
      <div className="section-shell stack-section__layout">
        <div className="stack-section__head">
          <div className="section-marker">
            <span className="section-marker__number">{copy.stackEyebrow.split(" /")[0]}</span>
            <span>{copy.stack}</span>
          </div>
          <div className="stack-section__heading">
            <p className="eyebrow">{copy.stackEyebrow}</p>
            <h2 id="stack-title">{copy.stackTitle}</h2>
          </div>
          <p className="stack-section__note">{profile.techSummary}<br />{profile.experienceYears} years in frontend</p>
        </div>

        <div className="stack-marquees">
          <StackMarquee items={marqueeContent[0]} direction="left" index="01" />
          <StackMarquee items={marqueeContent[1]} direction="right" index="02" />
          <StackMarquee items={marqueeContent[2]} direction="left" index="03" />
        </div>
      </div>
    </section>
  );
}
