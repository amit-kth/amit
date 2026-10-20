"use client";

import { HeroSection } from "@/components/HeroSection";
import { ShaderCanvas } from "@/components/ui/shader-canvas";

const HERO_SHADER_COLORS = {
  u_accent: "var(--voltage-violet)",
  u_ink: "var(--midnight-ink)",
  u_surface: "var(--fog)",
};

type ExperienceStoryProps = {
  introReady: boolean;
};

export function ExperienceStory({ introReady }: ExperienceStoryProps) {
  return (
    <section className="experience-story section-shell" id="experience-story" aria-label="Portfolio introduction">
      <div className="hero-card">
        <ShaderCanvas
          className="hero-card__shader"
          colors={HERO_SHADER_COLORS}
          resolution={0.62}
          stillTime={4}
        />
        <div className="hero-card__shader-wash" aria-hidden="true" />
        <HeroSection introReady={introReady} />
      </div>
    </section>
  );
}
