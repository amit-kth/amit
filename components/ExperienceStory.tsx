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
      className="box-border h-screen supports-[height:100svh]:h-svh w-full px-[clamp(14px,3vw,32px)] pb-4 pt-[72px] md:pb-5 md:pt-[84px]"
      id="experience-story"
      aria-label="Portfolio introduction"
    >
      <div className="relative isolate h-full min-h-0 overflow-hidden rounded-[30px] border border-[var(--mist)] bg-[var(--fog)] shadow-[0_18px_55px_rgba(17,24,39,0.08)] md:rounded-[38px]">
        <ShaderCanvas
          className="pointer-events-none absolute inset-0 h-full w-full rounded-[inherit]"
          colors={HERO_SHADER_COLORS}
          resolution={0.62}
          stillTime={4}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-gradient-to-b from-[rgba(241,245,249,0.5)] via-[rgba(241,245,249,0.18)] to-[rgba(241,245,249,0.56)]"
          aria-hidden="true"
        />
        <HeroSection introReady={introReady} />
      </div>
    </section>
  );
}
