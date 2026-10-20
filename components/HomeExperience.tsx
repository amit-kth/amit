"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceStory } from "@/components/ExperienceStory";
import { JourneySection } from "@/components/JourneySection";
import { Navigation } from "@/components/Navigation";
import { Preloader } from "@/components/Preloader";
import { ProofSection } from "@/components/ProofSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StackSection } from "@/components/StackSection";
import { SectionCard } from "@/components/ui/section-card";
import { copy, profile } from "@/data/profile";

export function HomeExperience() {
  const [introReady, setIntroReady] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroReady(true), []);

  return (
    <SmoothScrollProvider>
      <MotionConfig reducedMotion="user">
        <div className="portfolio-shell">
          <a className="skip-link" href="#main-content">{copy.skipToContent}</a>
          <Navigation />
          <Preloader onComplete={handleIntroComplete} />
          <main id="main-content" className="portfolio-main">
            <ExperienceStory introReady={introReady} />
            <ServicesSection />
            <ProofSection />
            <StackSection />
            <JourneySection />
            <ContactSection />
            <footer className="px-[clamp(14px,3vw,32px)] py-2 md:py-3" id="site-footer">
              <SectionCard className="grid grid-cols-2 items-center gap-x-4 gap-y-3 p-4 sm:p-5 md:grid-cols-[minmax(180px,1fr)_minmax(180px,1fr)_auto] md:gap-y-2 md:px-7">
                <a href="#hero" className="flex w-fit items-center gap-2.5 text-xs font-semibold tracking-tight text-[var(--midnight-ink)]">
                  <span className="grid size-8 place-items-center rounded-[10px] bg-[var(--voltage-violet)] text-[9px] font-extrabold text-[var(--pure-white)]">{profile.brandMark}</span>
                  <span>{profile.name}</span>
                </a>
                <p className="col-span-2 row-start-2 m-0 font-mono text-[8px] uppercase tracking-[0.05em] text-[var(--slate)] md:col-span-1 md:row-start-1">
                  {profile.builtWith}
                </p>
                <nav className="col-span-2 row-start-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[8px] uppercase tracking-[0.06em] md:col-span-1 md:col-start-3 md:row-start-1 md:justify-end" aria-label={copy.siteFooter}>
                  <a className="inline-flex items-center gap-1 text-[var(--midnight-ink)] transition-colors hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn<ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a className="inline-flex items-center gap-1 text-[var(--midnight-ink)] transition-colors hover:text-[var(--ultra-violet)] motion-reduce:transition-none" href={profile.links.github} target="_blank" rel="noreferrer">
                    GitHub<ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </nav>
                <small className="col-start-1 row-start-4 font-mono text-[8px] uppercase tracking-[0.04em] text-[var(--slate)] md:row-start-2">{profile.copyright}</small>
                <span className="col-start-2 row-start-4 justify-self-end font-mono text-[8px] uppercase tracking-[0.06em] text-[var(--slate)] md:row-start-2">{profile.location}</span>
                <a className="col-span-2 row-start-5 inline-flex w-fit items-center gap-1.5 justify-self-start text-[10px] text-[var(--ultra-violet)] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 md:col-span-1 md:col-start-3 md:row-start-2 md:justify-self-end motion-reduce:transition-none" href="#hero">
                  {copy.backToTop}<ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </SectionCard>
            </footer>
          </main>
        </div>
      </MotionConfig>
    </SmoothScrollProvider>
  );
}
