"use client";

import type { CSSProperties } from "react";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";

type TechnologyId = "next" | "react" | "typescript" | "javascript" | "tailwind" | "node" | "redux" | "html" | "css" | "github" | "vercel";

type OrbitDefinition = {
  id: string;
  path: string;
  speed: number;
  direction: "normal" | "reverse";
  colorClass: string;
  technologies: TechnologyId[];
};

const orbitPaths = {
  inner: "M500 106 C620 106 740 148 740 190 C740 232 620 274 500 274 C380 274 260 232 260 190 C260 148 380 106 500 106 Z",
  middle: "M500 58 C680 58 850 124 850 190 C850 256 680 322 500 322 C320 322 150 256 150 190 C150 124 320 58 500 58 Z",
  outer: "M500 14 C745 14 985 90 985 190 C985 290 745 366 500 366 C255 366 15 290 15 190 C15 90 255 14 500 14 Z",
} as const;

const orbits: OrbitDefinition[] = [
  { id: "inner", path: orbitPaths.inner, speed: 3.2, direction: "reverse", colorClass: "text-[rgba(173,109,244,0.58)]", technologies: ["next", "typescript", "github"] },
  { id: "middle", path: orbitPaths.middle, speed: 2.4, direction: "normal", colorClass: "text-[rgba(79,91,213,0.48)]", technologies: ["javascript", "tailwind", "node", "redux"] },
  { id: "outer", path: orbitPaths.outer, speed: 1.8, direction: "reverse", colorClass: "text-[rgba(34,211,238,0.36)]", technologies: ["html", "css", "vercel"] },
];

const names: Record<TechnologyId, string> = {
  next: "Next.js",
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwind: "Tailwind CSS",
  node: "Node.js",
  redux: "Redux",
  html: "HTML5",
  css: "CSS3",
  github: "GitHub",
  vercel: "Vercel",
};

const accents: Record<TechnologyId, string> = {
  next: "#F8FAFC",
  react: "#61DAFB",
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  tailwind: "#38BDF8",
  node: "#5FA04E",
  redux: "#9B72CF",
  html: "#E34F26",
  css: "#1572B6",
  github: "#F0F6FC",
  vercel: "#F8FAFC",
};

const staticPositions: Array<{ id: TechnologyId; left: string; top: string }> = [
  { id: "next", left: "50%", top: "14%" },
  { id: "typescript", left: "28%", top: "20%" },
  { id: "github", left: "73%", top: "22%" },
  { id: "javascript", left: "15%", top: "43%" },
  { id: "tailwind", left: "84%", top: "43%" },
  { id: "node", left: "18%", top: "69%" },
  { id: "redux", left: "36%", top: "83%" },
  { id: "html", left: "62%", top: "83%" },
  { id: "css", left: "82%", top: "69%" },
  { id: "vercel", left: "50%", top: "30%" },
];

function TechnologyMark({ id, central = false }: { id: TechnologyId; central?: boolean }) {
  if (id === "react") {
    return (
      <svg className={central ? "size-12" : "size-7"} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)" />
      </svg>
    );
  }

  if (id === "next") {
    return (
      <svg className="size-6 text-[var(--pure-white)]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6.5 25V7l19 18V7" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" />
      </svg>
    );
  }

  if (id === "typescript" || id === "javascript") {
    const isTypeScript = id === "typescript";
    return (
      <span className={`grid size-6 place-items-end rounded-[3px] pr-0.5 pb-0.5 font-mono text-[10px] font-bold leading-none ${isTypeScript ? "bg-[#3178C6] text-white" : "bg-[#F7DF1E] text-[#111827]"}`} aria-hidden="true">
        {isTypeScript ? "TS" : "JS"}
      </span>
    );
  }

  if (id === "tailwind") {
    return (
      <svg className="size-7" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 12c1.2-3.2 3.3-4.8 6.4-4.8 4.6 0 5.2 3.5 7.6 4.1 1.8.5 3.5-.3 5-2.1-1.2 3.2-3.3 4.8-6.4 4.8-4.6 0-5.2-3.5-7.6-4.1-1.8-.5-3.5.3-5 2.1Z" fill="#38BDF8" />
        <path d="M4 21c1.2-3.2 3.3-4.8 6.4-4.8 4.6 0 5.2 3.5 7.6 4.1 1.8.5 3.5-.3 5-2.1-1.2 3.2-3.3 4.8-6.4 4.8-4.6 0-5.2-3.5-7.6-4.1-1.8-.5-3.5.3-5 2.1Z" fill="#38BDF8" />
      </svg>
    );
  }

  if (id === "node") {
    return (
      <svg className="size-7" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="m16 2.8 11.4 6.6v13.2L16 29.2 4.6 22.6V9.4L16 2.8Z" stroke="#5FA04E" strokeWidth="2.2" />
        <path d="m13.1 11.3 8.1 9.2M20.9 11.4v9.2" stroke="#5FA04E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "redux") {
    return (
      <svg className="size-7" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M22.6 9.1c-1.1-1-2.4-1.6-4.1-1.6-3.8 0-6.2 3.1-6.2 8.5 0 5.2 2.1 8.5 6.1 8.5 2 0 3.5-.8 4.5-2.1" stroke="#9B72CF" strokeWidth="3" strokeLinecap="round" />
        <circle cx="23.7" cy="9.4" r="2.1" fill="#9B72CF" />
      </svg>
    );
  }

  if (id === "html" || id === "css") {
    const isHtml = id === "html";
    return (
      <svg className="size-7" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 3.5h20l-1.8 22.2L16 29l-8.2-3.3L6 3.5Z" fill={isHtml ? "#E34F26" : "#1572B6"} />
        <path d="M11 10h10l-.4 3H13l.3 2.5h7l-.6 6.1-3.7 1.3-3.7-1.3-.2-2.5" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "vercel") {
    return (
      <svg className="size-7 text-[var(--pure-white)]" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 4 29 27H3L16 4Z" />
      </svg>
    );
  }

  return (
    <svg className="size-7 text-[var(--pure-white)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.79 1.81 3.25 1.29.1-.72.39-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.64 10.64 0 0 1 5.57 0c2.13-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function OrbitBadge({ id }: { id: TechnologyId }) {
  const style = { "--orbit-glow": accents[id] } as CSSProperties;
  return (
    <span className="tech-orbit__badge" style={style} title={names[id]}>
      <TechnologyMark id={id} />
    </span>
  );
}

function StaticSatellites() {
  return (
    <div className="absolute inset-0">
      {staticPositions.map(({ id, left, top }) => (
        <span className="tech-orbit__static-satellite" key={id} style={{ left, top }}>
          <OrbitBadge id={id} />
        </span>
      ))}
    </div>
  );
}

export function TechnologyOrbit() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="tech-orbit pointer-events-none absolute z-0 hidden overflow-visible md:block"
      style={{
        width: "clamp(640px, 90vw, 1800px)",
        height: "clamp(380px, 40vw, 700px)",
        left: "54%",
        top: "clamp(-72px, -2vw, -14px)",
        transform: "translateX(calc(-50% + clamp(10px, 4vw, 54px)))",
      }}
      aria-hidden="true"
    >
      <div className="relative size-full">
        <span className="tech-orbit__ambient absolute inset-0" />
        <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 1000 380" fill="none">
          <defs>
            <linearGradient id="tech-orbit-outer-gradient" x1="40" y1="370" x2="960" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F5BD5" stopOpacity="0.06" />
              <stop offset="0.45" stopColor="#862FE7" stopOpacity="0.55" />
              <stop offset="1" stopColor="#22D3EE" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="tech-orbit-middle-gradient" x1="160" y1="320" x2="840" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F5BD5" stopOpacity="0.12" />
              <stop offset="0.5" stopColor="#AD6DF4" stopOpacity="0.56" />
              <stop offset="1" stopColor="#61DAFB" stopOpacity="0.24" />
            </linearGradient>
            <linearGradient id="tech-orbit-inner-gradient" x1="260" y1="270" x2="740" y2="110" gradientUnits="userSpaceOnUse">
              <stop stopColor="#862FE7" stopOpacity="0.18" />
              <stop offset="0.5" stopColor="#61DAFB" stopOpacity="0.72" />
              <stop offset="1" stopColor="#AD6DF4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d={orbitPaths.outer} stroke="url(#tech-orbit-outer-gradient)" strokeWidth="1.1" />
          <path d={orbitPaths.middle} stroke="url(#tech-orbit-middle-gradient)" strokeWidth="1.2" />
          <path d={orbitPaths.inner} stroke="url(#tech-orbit-inner-gradient)" strokeWidth="1.25" />
          <ellipse cx="500" cy="190" rx="112" ry="34" transform="rotate(-16 500 190)" stroke="url(#tech-orbit-inner-gradient)" strokeOpacity="0.65" strokeWidth="1.1" />
          <circle cx="828" cy="76" r="2.2" fill="#862FE7" />
          <circle cx="185" cy="252" r="2.5" fill="#4F5BD5" />
          <circle cx="715" cy="324" r="2" fill="#AD6DF4" />
          <circle cx="307" cy="78" r="1.8" fill="#22D3EE" />
        </svg>

        {reducedMotion ? (
          <StaticSatellites />
        ) : (
          <>
            <div className="tech-orbit__moving absolute inset-0">
              {orbits.map((orbit) => (
                <div className={`absolute inset-0 ${orbit.colorClass}`} key={orbit.id}>
                  <MarqueeAlongSvgPath
                    path={orbit.path}
                    pathId={`technology-orbit-${orbit.id}`}
                    viewBox="0 0 1000 380"
                    baseVelocity={orbit.speed}
                    direction={orbit.direction}
                    slowdownOnHover
                    slowDownFactor={0.34}
                    useScrollVelocity
                    scrollAwareDirection
                    repeat={1}
                    responsive
                  >
                    {orbit.technologies.map((id) => <OrbitBadge id={id} key={id} />)}
                  </MarqueeAlongSvgPath>
                </div>
              ))}
            </div>
            <div className="tech-orbit__fallback absolute inset-0">
              <StaticSatellites />
            </div>
          </>
        )}

        <div className="tech-orbit__core absolute left-1/2 top-1/2 z-20 grid size-[78px] place-items-center rounded-full">
          <span className="tech-orbit__core-halo absolute inset-[-22px] rounded-full" />
          <span className="relative z-[1]"><TechnologyMark id="react" central /></span>
        </div>
      </div>
    </div>
  );
}
