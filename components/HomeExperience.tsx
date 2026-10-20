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
            <footer className="site-footer" id="site-footer">
              <div className="section-shell site-footer__inner">
                <a href="#hero" className="site-footer__brand">
                  <span className="site-header__mark">{profile.brandMark}</span>
                  <span>{profile.name}</span>
                </a>
                <p className="site-footer__built">{profile.builtWith}</p>
                <nav className="site-footer__links" aria-label={copy.siteFooter}>
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
                  <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
                </nav>
                <small>{profile.copyright}</small>
                <span className="site-footer__location">{profile.location}</span>
                <a href="#hero" className="site-footer__top">Back to top <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </footer>
          </main>
        </div>
      </MotionConfig>
    </SmoothScrollProvider>
  );
}
