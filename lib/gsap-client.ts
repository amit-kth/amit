"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let registered = false;

export function registerGsapPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);
  registered = true;
}

export function revealSectionHeading(
  heading: HTMLElement,
  trigger: HTMLElement,
  start = "top 80%",
) {
  return gsap.fromTo(
    heading,
    { y: 26, autoAlpha: 0, filter: "blur(12px)" },
    {
      y: 0,
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 0.82,
      ease: "power3.out",
      scrollTrigger: { trigger, start, once: true },
    },
  );
}

export { gsap, ScrollTrigger, SplitText };
