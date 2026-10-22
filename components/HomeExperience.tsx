"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceStory } from "@/components/ExperienceStory";
import { JourneySection } from "@/components/JourneySection";
import UnfurlingGallery from "@/components/ui/3d-parallax-unfurling-gallery";
import { Preloader } from "@/components/Preloader";
import { ProfileNotch } from "@/components/ProfileNotch";
import { SectionDock } from "@/components/SectionDock";
import { ServicesSection } from "@/components/ServicesSection";
import { SocialIcon, type SocialPlatform } from "@/components/ui/social-icon";
import { GlassButton } from "@/components/ui/glass-button";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StackSection } from "@/components/StackSection";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { copy, profile } from "@/data/profile";
import { gsap, registerGsapPlugins, revealSectionHeading } from "@/lib/gsap-client";

const footerSocials: Array<{ id: SocialPlatform; label: string; href: string | null }> = [
  { id: "instagram", label: "Instagram", href: profile.links.instagram },
  { id: "linkedin", label: "LinkedIn", href: profile.links.linkedin },
  { id: "github", label: "GitHub", href: profile.links.github },
];

const socialAccents: Record<SocialPlatform, string> = {
  instagram: "#D62976",
  linkedin: "#0A66C2",
  github: "#F0F6FC",
};

const socialSpring = { type: "spring" as const, stiffness: 440, damping: 18, mass: 0.72 };

type FooterSocialLinkProps = (typeof footerSocials)[number] & { reducedMotion: boolean };

function FooterSocialLink({ id, label, href, reducedMotion }: FooterSocialLinkProps) {
  const icon = <span className="relative z-[1] grid place-items-center"><SocialIcon platform={id} /></span>;
  const style = { "--social-accent": socialAccents[id] } as CSSProperties;
  const className = "footer-social group relative grid size-12 place-items-center rounded-full border border-white/30 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150 transition-[transform,border-color,background-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lavender-mist)]";
  const hover = reducedMotion ? undefined : { y: -5, scale: 1.09, rotate: id === "linkedin" ? -5 : 5 };
  const tap = reducedMotion ? undefined : { scale: 0.94 };

  if (!href) {
    return (
      <motion.span
        className={`${className} cursor-default`}
        style={style}
        role="img"
        aria-label={`${label} icon; profile URL not provided`}
        title={`${label} profile URL not provided`}
        whileHover={hover}
        transition={socialSpring}
      >
        {icon}
      </motion.span>
    );
  }

  return (
    <motion.a
      className={className}
      style={style}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} profile (opens in a new tab)`}
      title={label}
      whileHover={hover}
      whileTap={tap}
      transition={socialSpring}
    >
      {icon}
    </motion.a>
  );
}

export function HomeExperience() {
  const [introReady, setIntroReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const handleIntroComplete = useCallback(() => setIntroReady(true), []);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const heading = footer?.querySelector<HTMLElement>("[data-footer-heading]");
    if (!footer || !heading || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      revealSectionHeading(heading);
    }, footer);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <SmoothScrollProvider>
      <MotionConfig reducedMotion="user">
        <div className="portfolio-shell">
          <a className="skip-link" href="#main-content">{copy.skipToContent}</a>
          <ProfileNotch />
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
                    <h2 className="mt-4 text-section-heading font-semibold leading-[0.88] tracking-[-0.09em] text-[var(--pure-white)]" data-footer-heading>
                      <span className="block">Thanks for</span>
                      <span className="block text-[var(--lavender-mist)]">stopping by.</span>
                    </h2>
                    <p className="mt-5 max-w-[520px] text-xs leading-relaxed text-[rgba(241,245,249,0.74)] sm:text-sm">
                      {profile.title} · {profile.location}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-6 lg:items-end">
                    <GlassButton
                      className="group min-h-12 px-5"
                      href={profile.links.resume}
                      download="Amit-Verma-Resume.txt"
                      tone="dark"
                      variant="primary"
                    >
                      {copy.downloadResume}
                      <Download className="transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none" size={16} aria-hidden="true" />
                    </GlassButton>
                    <nav className="flex items-center gap-3" aria-label="Social profiles">
                      {footerSocials.map((social) => <FooterSocialLink {...social} reducedMotion={reducedMotion} key={social.id} />)}
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
