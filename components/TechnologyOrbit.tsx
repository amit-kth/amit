"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";

type TechnologyId =
  | "gemini"
  | "perplexity"
  | "claude"
  | "chatgpt"
  | "typescript"
  | "vercel"
  | "react"
  | "next"
  | "node"
  | "netlify"
  | "mui"
  | "mongo"
  | "javascript"
  | "html"
  | "figma"
  | "axios"
  | "photoshop"
  | "adobe-xd";

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

const icons: Record<TechnologyId, string> = {
  gemini: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/gemini.png?updatedAt=1757586975823",
  perplexity: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/perplexity.png?updatedAt=1757586975809",
  claude: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/claude.png?updatedAt=1757586975445",
  chatgpt: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/chatgpt.png?updatedAt=1757586975426",
  typescript: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/TypeScript.png?updatedAt=1739424240585",
  vercel: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/vercel.png?updatedAt=1739424240216",
  react: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/react.png?updatedAt=1739424239485",
  next: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/next.png?updatedAt=1739424231016",
  node: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/node.png?updatedAt=1739424230437",
  netlify: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/netlify.png?updatedAt=1739424230441",
  mui: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/mui.png?updatedAt=1739424229931",
  mongo: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/mongo.png?updatedAt=1739424229346",
  javascript: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/Javascript.png?updatedAt=1739424226646",
  html: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/HTML5.png?updatedAt=1739424222198",
  figma: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/Figma.png?updatedAt=1739424217821",
  axios: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/axios.png?updatedAt=1739424210477",
  photoshop: "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/Adobe%20Photoshop.png?updatedAt=1739424208689",
  "adobe-xd": "https://ik.imagekit.io/qk2ww553c/tempAssets/techIcons/Adobe%20XD.png?updatedAt=1739424208806",
};

const names: Record<TechnologyId, string> = {
  gemini: "Gemini",
  perplexity: "Perplexity",
  claude: "Claude",
  chatgpt: "ChatGPT",
  typescript: "TypeScript",
  vercel: "Vercel",
  react: "React",
  next: "Next.js",
  node: "Node.js",
  netlify: "Netlify",
  mui: "Material UI",
  mongo: "MongoDB",
  javascript: "JavaScript",
  html: "HTML5",
  figma: "Figma",
  axios: "Axios",
  photoshop: "Adobe Photoshop",
  "adobe-xd": "Adobe XD",
};

const accents: Record<TechnologyId, string> = {
  gemini: "#8B7BFF",
  perplexity: "#20B8A7",
  claude: "#D97757",
  chatgpt: "#10A37F",
  typescript: "#3178C6",
  vercel: "#F8FAFC",
  react: "#61DAFB",
  next: "#F8FAFC",
  node: "#5FA04E",
  netlify: "#32DDB2",
  mui: "#007FFF",
  mongo: "#00ED64",
  javascript: "#F7DF1E",
  html: "#E34F26",
  figma: "#A259FF",
  axios: "#5A29E4",
  photoshop: "#31A8FF",
  "adobe-xd": "#FF61F6",
};

const orbits: OrbitDefinition[] = [
  {
    id: "inner",
    path: orbitPaths.inner,
    speed: 0.82,
    direction: "reverse",
    colorClass: "text-[rgba(173,109,244,0.58)]",
    technologies: ["typescript", "next", "axios", "claude", "gemini", "perplexity"],
  },
  {
    id: "middle",
    path: orbitPaths.middle,
    speed: 0.64,
    direction: "normal",
    colorClass: "text-[rgba(79,91,213,0.48)]",
    technologies: ["chatgpt", "netlify", "mui", "mongo", "javascript", "html"],
  },
  {
    id: "outer",
    path: orbitPaths.outer,
    speed: 0.48,
    direction: "reverse",
    colorClass: "text-[rgba(34,211,238,0.36)]",
    technologies: ["vercel", "node", "figma", "photoshop", "adobe-xd"],
  },
];

const staticPositions: Array<{ id: Exclude<TechnologyId, "react">; left: string; top: string }> = [
  { id: "typescript", left: "50%", top: "28%" },
  { id: "next", left: "25%", top: "39%" },
  { id: "axios", left: "75%", top: "39%" },
  { id: "claude", left: "25%", top: "61%" },
  { id: "gemini", left: "75%", top: "61%" },
  { id: "perplexity", left: "50%", top: "72%" },
  { id: "chatgpt", left: "50%", top: "15%" },
  { id: "netlify", left: "31%", top: "22%" },
  { id: "mui", left: "69%", top: "22%" },
  { id: "mongo", left: "15%", top: "50%" },
  { id: "javascript", left: "85%", top: "50%" },
  { id: "html", left: "31%", top: "78%" },
  { id: "figma", left: "69%", top: "78%" },
  { id: "vercel", left: "50%", top: "4%" },
  { id: "node", left: "16%", top: "11%" },
  { id: "photoshop", left: "84%", top: "11%" },
  { id: "adobe-xd", left: "50%", top: "96%" },
];

function TechnologyIcon({ id, central = false }: { id: TechnologyId; central?: boolean }) {
  const size = central ? 48 : 28;
  return (
    <Image
      src={icons[id]}
      alt=""
      width={size}
      height={size}
      unoptimized
      loading="lazy"
      draggable={false}
      className={central ? "size-12 object-contain" : "size-7 object-contain"}
    />
  );
}

function OrbitBadge({ id }: { id: TechnologyId }) {
  const style = { "--orbit-glow": accents[id] } as CSSProperties;
  return (
    <span className="tech-orbit__badge" style={style} title={names[id]}>
      <TechnologyIcon id={id} />
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
      className="tech-orbit pointer-events-none absolute z-0 overflow-visible"
      style={{
        width: "clamp(420px, 75vw, 1250px)",
        height: "clamp(250px, 30vw, 500px)",
        right: 0,
        top: 0,
        transform: "translate(40%, -40%)",
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
          <span className="relative z-[1]"><TechnologyIcon id="react" central /></span>
        </div>
      </div>
    </div>
  );
}
