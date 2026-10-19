"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";
import { copy, profile } from "@/data/profile";

type PreloaderProps = {
  onComplete: () => void;
};

const SESSION_KEY = "amit-verma-creative-preloader-v1";

export function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyPlayed = false;
    }

    if (alreadyPlayed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const root = rootRef.current;
    const counterElement = counterRef.current;
    if (!root || !counterElement) {
      onComplete();
      return;
    }

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
          if (conditions?.reduced) {
            const frame = window.requestAnimationFrame(() => {
              setVisible(false);
              onComplete();
            });
            return () => window.cancelAnimationFrame(frame);
          }

          const counter = { value: 0 };
          const timeline = gsap.timeline({
            paused: true,
            onComplete: () => {
              try {
                window.sessionStorage.setItem(SESSION_KEY, "1");
              } catch {
                // The preloader still completes if storage is unavailable.
              }
              setVisible(false);
              onComplete();
            },
          });
          timeline.to(counter, {
            value: 100,
            duration: 0.72,
            ease: "power2.out",
            onUpdate: () => {
              counterElement.textContent = `${Math.round(counter.value)}`.padStart(3, "0");
            },
          });
          timeline.to(counterElement, { yPercent: -70, opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.06");
          timeline.to(root.querySelector(".preloader__curtain"), {
            yPercent: -101,
            duration: 0.82,
            ease: "power4.inOut",
          }, "-=0.02");

          const frame = window.requestAnimationFrame(() => {
            setVisible(true);
            timeline.play(0);
          });
          return () => {
            window.cancelAnimationFrame(frame);
            timeline.kill();
          };
        },
      );

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [onComplete]);

  return (
    <div className={`preloader${visible ? " is-active" : ""}`} ref={rootRef} aria-hidden="true" inert>
      <div className="preloader__curtain">
        <div className="preloader__topline">
          <span>{profile.brandMark}</span>
          <span>{copy.preloaderLabel}</span>
        </div>
        <div className="preloader__count-wrap">
          <span className="preloader__count" ref={counterRef}>000</span>
          <span className="preloader__percent">%</span>
        </div>
        <div className="preloader__bottomline">
          <span>{profile.hero.portfolioLabel}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  );
}
