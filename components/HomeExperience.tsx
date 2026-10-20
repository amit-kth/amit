"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceStory } from "@/components/ExperienceStory";
import { JourneySection } from "@/components/JourneySection";
import UnfurlingGallery from "@/components/ui/3d-parallax-unfurling-gallery";
import { Preloader } from "@/components/Preloader";
import { SectionDock } from "@/components/SectionDock";
import { ServicesSection } from "@/components/ServicesSection";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StackSection } from "@/components/StackSection";
import { copy, profile } from "@/data/profile";

type SocialPlatform = "instagram" | "linkedin" | "github";

const footerSocials: Array<{ id: SocialPlatform; label: string; href: string | null }> = [
  { id: "instagram", label: "Instagram", href: profile.links.instagram },
  { id: "linkedin", label: "LinkedIn", href: profile.links.linkedin },
  { id: "github", label: "GitHub", href: profile.links.github },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const shared = {
    className: "size-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (platform === "instagram") {
    return (
      <svg {...shared}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg {...shared}>
        <path d="M5 9v10M5 5.5v.1M10 19v-6.1a3.4 3.4 0 0 1 6.8 0V19M10 10v9" />
        <circle cx="5" cy="5.5" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...shared} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.79 1.81 3.25 1.29.1-.72.39-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.64 10.64 0 0 1 5.57 0c2.13-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function FooterSocialLink({ id, label, href }: (typeof footerSocials)[number]) {
  const icon = <SocialIcon platform={id} />;
  const className = "grid size-11 place-items-center rounded-full bg-[rgba(255,255,255,0.08)] text-[var(--pure-white)] transition-[background,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.16)] hover:text-[var(--lavender-mist)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

  if (!href) {
    return (
      <span
        className={`${className} cursor-not-allowed text-[var(--mist)] opacity-60`}
        key={id}
        role="img"
        aria-label={`${label} icon; profile URL not provided`}
        title={`${label} profile URL not provided`}
      >
        {icon}
      </span>
    );
  }

  return (
    <a
      className={className}
      href={href}
      key={id}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} profile (opens in a new tab)`}
      title={label}
    >
      {icon}
    </a>
  );
}

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
            <StackSection />
            <JourneySection />
            <UnfurlingGallery />
            <ContactSection />
            <footer className="site-footer relative isolate overflow-hidden text-[var(--pure-white)]" id="site-footer">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.34)] to-transparent" aria-hidden="true" />
              <div className="relative mx-auto max-w-[1480px] px-[clamp(20px,5vw,84px)] pb-[var(--layout-dock-clearance)] pt-[clamp(58px,8vw,104px)]">
                <div className="grid gap-9 border-b border-[rgba(255,255,255,0.16)] pb-9 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
                  <div className="max-w-[850px]">
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--lavender-mist)]">{profile.hero.roleLabel}</p>
                    <h2 className="mt-4 text-[clamp(3rem,7.6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.09em] text-[var(--pure-white)]">
                      Thanks for <span className="text-[var(--lavender-mist)]">stopping by.</span>
                    </h2>
                    <p className="mt-5 max-w-[520px] text-xs leading-relaxed text-[rgba(241,245,249,0.74)] sm:text-sm">
                      {profile.title} · {profile.location}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-6 lg:items-end">
                    <a
                      className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--voltage-violet)] px-5 text-xs font-semibold text-[var(--pure-white)] shadow-[0_10px_32px_rgba(134,47,231,0.28)] transition-[background,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--lavender-mist)] hover:text-[var(--midnight-ink)] hover:shadow-[0_14px_36px_rgba(134,47,231,0.34)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lavender-mist)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      href={profile.links.resume}
                      download="Amit-Verma-Resume.txt"
                    >
                      {copy.downloadResume}
                      <Download className="transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none" size={16} aria-hidden="true" />
                    </a>
                    <nav className="flex items-center gap-3" aria-label="Social profiles">
                      {footerSocials.map((social) => <FooterSocialLink {...social} key={social.id} />)}
                    </nav>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-5 font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--mist)]">
                  <a href="#hero" className="text-[var(--pure-white)] transition-colors hover:text-[var(--lavender-mist)] motion-reduce:transition-none">
                    {profile.name}<span className="ml-2 text-[var(--slate)]">/ {profile.hero.portfolioLabel}</span>
                  </a>
                  <small className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--mist)]">{profile.copyright}</small>
                  <a className="inline-flex items-center gap-1.5 text-[var(--pure-white)] transition-colors hover:text-[var(--lavender-mist)] motion-reduce:transition-none" href="#hero">
                    {copy.backToTop}<ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </footer>
          </main>
          <SectionDock />
        </div>
      </MotionConfig>
    </SmoothScrollProvider>
  );
}
