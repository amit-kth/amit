"use client";

import type { RefObject } from "react";
import { ArrowDownRight, SkipForward } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { cameraPath, cameraScrollConfig } from "@/data/camera-path";
import { bodyCallouts } from "@/data/callouts";
import { copy } from "@/data/profile";

type ExperienceStoryProps = {
  introReady: boolean;
  calloutSvgRef: RefObject<SVGSVGElement | null>;
};

const scenePanels = [
  {
    id: "mind",
    number: "01",
    eyebrow: "Mind",
    title: "Developer, Designer's Mindset",
    body: "Frontend craft with a UI/UX eye.",
    calloutId: "mind",
  },
  {
    id: "values",
    number: "02",
    eyebrow: "Heart",
    title: "I Love What I Do",
    body: "Passion shows in every detail.",
    calloutId: "heart",
  },
  {
    id: "craft",
    number: "03",
    eyebrow: "Hands",
    title: "5 Years of Experience",
    body: "Crafting polished, fast interfaces.",
    calloutId: "hands",
  },
] as const;

export function ExperienceStory({ introReady, calloutSvgRef }: ExperienceStoryProps) {
  return (
    <section
      className="experience-story"
      id="experience-story"
      style={{ height: `${cameraScrollConfig.totalScrollVh}svh` }}
      aria-label="A scroll-led introduction to Amit Verma"
    >
      <div className="experience-story__stage">
        <HeroSection introReady={introReady} />
        <svg className="experience-story__callouts" ref={calloutSvgRef} aria-hidden="true" focusable="false">
          {bodyCallouts.map((callout) => (
            <g key={callout.id} className="experience-story__leader" data-callout-leader={callout.id}>
              <path data-callout-line={callout.id} pathLength="1" />
              <circle data-callout-dot={callout.id} r="3.5" />
            </g>
          ))}
        </svg>
        {scenePanels.map((panel) => (
          <article
            className="experience-story__panel experience-story__panel--callout"
            data-scene-panel={panel.id}
            data-callout-panel={panel.calloutId}
            key={panel.id}
            aria-labelledby={`experience-panel-${panel.id}`}
          >
            <p className="eyebrow">{panel.number} / {panel.eyebrow}</p>
            <h2 id={`experience-panel-${panel.id}`}>{panel.title}</h2>
            <p className="experience-story__body">{panel.body}</p>
          </article>
        ))}
        <a className="experience-story__skip" href="#what-i-do">
          <span>Skip intro</span><SkipForward size={15} aria-hidden="true" />
        </a>
        <div className="experience-story__readout" aria-hidden="true">
          <span id="experience-scene-counter">01 / 03 · Mind</span>
          <span className="experience-story__progress"><i id="experience-progress-fill" /></span>
        </div>
        <div className="experience-story__scene-dots" aria-hidden="true">
          <i data-scene-dot="mind" />
          <i data-scene-dot="heart" />
          <i data-scene-dot="hands" />
        </div>
        <span className="experience-story__scroll-hint" aria-hidden="true">
          {copy.scroll}<ArrowDownRight size={15} />
        </span>
      </div>
      <div className="experience-story__scroll-track" aria-hidden="true">
        {cameraPath.map((scene, index) => (
          <span key={scene.id} style={{ top: `${index * 100}svh` }} />
        ))}
      </div>
    </section>
  );
}
