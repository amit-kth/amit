"use client";

import { ArrowDownRight, SkipForward } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { PhotoStage } from "@/components/PhotoStage";
import { copy } from "@/data/profile";

type ExperienceStoryProps = {
  introReady: boolean;
};

const scenes = [
  { number: "01", label: "Mind", title: "Developer, Designer's Mindset", body: "Frontend craft with a UI/UX eye." },
  { number: "02", label: "Heart", title: "I Love What I Do", body: "Passion shows in every detail." },
  { number: "03", label: "Hands", title: "5 Years of Experience", body: "Crafting polished, fast interfaces." },
] as const;

export function ExperienceStory({ introReady }: ExperienceStoryProps) {
  return (
    <>
      <section className="experience-story" id="experience-story" aria-label="A scroll-led introduction to Amit Verma">
        <div className="experience-story__stage">
          <PhotoStage />
          <HeroSection introReady={introReady} />
          <a className="experience-story__skip" href="#what-i-do">
            <span>Skip intro</span><SkipForward size={15} aria-hidden="true" />
          </a>
          <span className="experience-story__scroll-hint" aria-hidden="true">
            {copy.scroll}<ArrowDownRight size={15} />
          </span>
        </div>
      </section>
      <section className="photo-story-captions" aria-label="How I work">
        {scenes.map((scene) => (
          <article className="photo-story-captions__item" key={scene.number}>
            <p className="eyebrow">{scene.number} / {scene.label}</p>
            <h2>{scene.title}</h2>
            <p>{scene.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
