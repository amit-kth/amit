"use client";

import { ArrowDownRight } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { PhotoStage } from "@/components/PhotoStage";
import { copy } from "@/data/profile";

type ExperienceStoryProps = {
  introReady: boolean;
};

export function ExperienceStory({ introReady }: ExperienceStoryProps) {
  return (
    <section className="experience-story" id="experience-story" aria-label="Introduction to Amit Verma">
      <div className="experience-story__stage">
        <PhotoStage />
        <HeroSection introReady={introReady} />
        <a className="experience-story__scroll-hint" href="#what-i-do">
          <span>{copy.scroll}</span>
          <ArrowDownRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
