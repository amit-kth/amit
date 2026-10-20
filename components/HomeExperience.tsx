"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceStory } from "@/components/ExperienceStory";
import { JourneySection } from "@/components/JourneySection";
import { Preloader } from "@/components/Preloader";
import { ProofSection } from "@/components/ProofSection";
import { SectionDock } from "@/components/SectionDock";
import { ServicesSection } from "@/components/ServicesSection";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StackSection } from "@/components/StackSection";
import { copy, profile } from "@/data/profile";

export function HomeExperience() {
  const [introReady, setIntroReady] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroReady(true), []);

  return (
    <SmoothScrollProvider>
      <MotionConfig reducedMotion="user">
        <div className="portfolio-shell">
          <a className="skip-link" href="#main-content">{copy.skipToContent}</a>
          <Preloader onComplete={handleIntroComplete} />
          <main id="main-content" className="portfolio-main">
            <ExperienceStory introReady={introReady} />
            <ServicesSection />
            <ProofSection />
            <StackSection />
            <JourneySection />
            <ContactSection />
            <footer className="px-[clamp(20px,5vw,84px)] pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-10 sm:pt-12" id="site-footer">
              <div className="mx-auto grid max-w-[1480px] grid-cols-2 items-center gap-x-5 gap-y-4 border-t border-[var(--mist)] pt-5 sm:grid-cols-[minmax(180px,1fr)_minmax(180px,1fr)_auto] sm:gap-y-3 sm:pt-6">
                <a href="#hero" className="flex w-fit items-center gap-2.5 text-xs font-semibold tracking-tight text-[var(--midnight-ink)]">
                  <span className="grid size-8 place-items-center rounded-[10px] bg-[var(--voltage-violet)] text-[9px] font-extrabold text-[var(--pure-white)]">{profile.brandMark}</span>
                  <span>{profile.name}</span>
                </a>
                <p className="col-span-2 row-start-2 m-0 font-mono text-[8px] uppercase tracking-[0.05em] text-[var(--slate)] sm:col-span-1 sm:row-start-1">
                  {profile.builtWith}
                </p>
                <nav className="col-span-2 row-start-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.08em] sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:justify-end" aria-label={copy.siteFooter}>
                  <a className="inline-flex items-center gap-1 text-[var(--midnight-ink)] transition-colors hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn<ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a className="inline-flex items-center gap-1 text-[var(--midnight-ink)] transition-colors hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.github} target="_blank" rel="noreferrer">
                    GitHub<ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </nav>
                <small className="col-start-1 row-start-4 font-mono text-[8px] uppercase tracking-[0.04em] text-[var(--slate)] sm:row-start-2">{profile.copyright}</small>
                <span className="col-start-2 row-start-4 justify-self-end font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--slate)] sm:row-start-2">{profile.location}</span>
                <a className="col-span-2 row-start-5 inline-flex w-fit items-center gap-1.5 justify-self-start text-[10px] text-[var(--ultra-violet)] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:col-span-1 sm:col-start-3 sm:row-start-2 sm:justify-self-end motion-reduce:transition-none" href="#hero">
                  {copy.backToTop}<ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </footer>
          </main>
          <SectionDock />
        </div>
      </MotionConfig>
    </SmoothScrollProvider>
  );
}
