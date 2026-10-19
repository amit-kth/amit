"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ExperienceStory } from "@/components/ExperienceStory";
import { JourneySection } from "@/components/JourneySection";
import { Navigation } from "@/components/Navigation";
import { Preloader } from "@/components/Preloader";
import { ServicesSection } from "@/components/ServicesSection";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StackSection } from "@/components/StackSection";
import { copy, profile } from "@/data/profile";

export function HomeExperience() {
  const [introReady, setIntroReady] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroReady(true), []);

  useEffect(() => {
    const layer = document.querySelector<HTMLElement>(".ambient-layer");
    if (!layer) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 12;
      const y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 10;
      layer.style.setProperty("--blob-pointer-x", `${x.toFixed(1)}px`);
      layer.style.setProperty("--blob-pointer-y", `${y.toFixed(1)}px`);
    };
    const reset = () => {
      layer.style.setProperty("--blob-pointer-x", "0px");
      layer.style.setProperty("--blob-pointer-y", "0px");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <MotionConfig reducedMotion="user">
        <div className="portfolio-shell">
          <div className="ambient-layer" aria-hidden="true">
            <i className="ambient-glow ambient-glow--violet" />
            <i className="ambient-glow ambient-glow--blue" />
          </div>
          <a className="skip-link" href="#main-content">{copy.skipToContent}</a>
          <Navigation />
          <Preloader onComplete={handleIntroComplete} />
          <main id="main-content" className="portfolio-main">
            <ExperienceStory introReady={introReady} />
            <ServicesSection />
            <StackSection />
            <JourneySection />
            <footer className="site-footer" id="site-footer">
              <a href="#hero" className="site-footer__top">Back to top ↑</a>
              <p>{profile.name}</p>
              <div><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></div>
              <small>{profile.copyright}</small>
            </footer>
          </main>
        </div>
      </MotionConfig>
    </SmoothScrollProvider>
  );
}
