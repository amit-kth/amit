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
    <section
      className="relative isolate box-border h-screen supports-[height:100svh]:h-svh w-full overflow-hidden bg-[var(--fog)]"
      id="experience-story"
      aria-label="Portfolio introduction"
    >
      <ShaderCanvas
        className="pointer-events-none absolute inset-0 h-full w-full"
        colors={HERO_SHADER_COLORS}
        resolution={0.62}
        stillTime={4}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(241,245,249,0.34)] via-[rgba(241,245,249,0.08)] to-[rgba(241,245,249,0.48)]"
        aria-hidden="true"
      />
      <HeroSection introReady={introReady} />
    </section>
  );
}
