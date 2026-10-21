"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function revealSectionHeading(heading: HTMLElement, start = "top 72%") {
  return gsap.fromTo(
    heading,
    { y: 24, autoAlpha: 0, filter: "blur(10px)" },
    {
      y: 0,
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 0.78,
      ease: "power3.out",
      scrollTrigger: { trigger: heading, start, once: true },
    },
  );
}

export { gsap, ScrollTrigger };
