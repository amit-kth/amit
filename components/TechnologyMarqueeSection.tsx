"use client";

import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";

const technologyPath = "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

const technologies = [
  { id: "next", name: "Next.js" },
  { id: "react", name: "React" },
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "tailwind", name: "Tailwind CSS" },
  { id: "node", name: "Node.js" },
  { id: "redux", name: "Redux" },
  { id: "html", name: "HTML5" },
  { id: "css", name: "CSS3" },
  { id: "github", name: "GitHub" },
] as const;

type TechnologyId = (typeof technologies)[number]["id"];

function TechnologyMark({ id }: { id: TechnologyId }) {
  if (id === "next") {
    return (
      <svg className="size-8 text-[var(--midnight-ink)]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6.5 25V7l19 18V7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" />
      </svg>
    );
  }

  if (id === "react") {
    return (
      <svg className="size-9" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.35" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.35" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.35" transform="rotate(120 16 16)" />
      </svg>
    );
  }

  if (id === "typescript" || id === "javascript") {
    const isTypeScript = id === "typescript";
    return (
      <span
        className={`grid size-8 place-items-end rounded-[4px] pr-1 pb-0.5 font-mono text-[13px] font-bold leading-none ${isTypeScript ? "bg-[#3178C6] text-white" : "bg-[#F7DF1E] text-[#111827]"}`}
        aria-hidden="true"
      >
        {isTypeScript ? "TS" : "JS"}
      </span>
    );
  }

  if (id === "tailwind") {
    return (
      <svg className="size-9" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 12c1.2-3.2 3.3-4.8 6.4-4.8 4.6 0 5.2 3.5 7.6 4.1 1.8.5 3.5-.3 5-2.1-1.2 3.2-3.3 4.8-6.4 4.8-4.6 0-5.2-3.5-7.6-4.1-1.8-.5-3.5.3-5 2.1Z" fill="#38BDF8" />
        <path d="M4 21c1.2-3.2 3.3-4.8 6.4-4.8 4.6 0 5.2 3.5 7.6 4.1 1.8.5 3.5-.3 5-2.1-1.2 3.2-3.3 4.8-6.4 4.8-4.6 0-5.2-3.5-7.6-4.1-1.8-.5-3.5.3-5 2.1Z" fill="#38BDF8" />
      </svg>
    );
  }

  if (id === "node") {
    return (
      <svg className="size-9" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="m16 2.8 11.4 6.6v13.2L16 29.2 4.6 22.6V9.4L16 2.8Z" stroke="#5FA04E" strokeWidth="2" />
        <path d="m13.1 11.3 8.1 9.2M20.9 11.4v9.2" stroke="#5FA04E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "redux") {
    return (
      <svg className="size-9" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M22.6 9.1c-1.1-1-2.4-1.6-4.1-1.6-3.8 0-6.2 3.1-6.2 8.5 0 5.2 2.1 8.5 6.1 8.5 2 0 3.5-.8 4.5-2.1" stroke="#764ABC" strokeWidth="3" strokeLinecap="round" />
        <circle cx="23.7" cy="9.4" r="2.1" fill="#764ABC" />
      </svg>
    );
  }

  if (id === "html" || id === "css") {
    const isHtml = id === "html";
    return (
      <svg className="size-9" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 3.5h20l-1.8 22.2L16 29l-8.2-3.3L6 3.5Z" fill={isHtml ? "#E34F26" : "#1572B6"} />
        <path d="M11 10h10l-.4 3H13l.3 2.5h7l-.6 6.1-3.7 1.3-3.7-1.3-.2-2.5" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="size-8 text-[var(--midnight-ink)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.79 1.81 3.25 1.29.1-.72.39-1.22.71-1.5-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.64 10.64 0 0 1 5.57 0c2.13-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function TechnologyItem({ id, name }: (typeof technologies)[number]) {
  return (
    <div className="flex w-[86px] flex-col items-center gap-2 text-center">
      <div className="grid size-10 place-items-center">
        <TechnologyMark id={id} />
      </div>
      <span className="whitespace-nowrap font-mono text-[9px] font-medium leading-none tracking-[-0.02em] text-[var(--midnight-ink)] sm:text-[10px]">
        {name}
      </span>
    </div>
  );
}

export function TechnologyMarqueeSection() {
  return (
    <section className="relative overflow-hidden border-y border-[rgba(17,24,39,0.1)] bg-[var(--fog)] py-7 sm:py-8" aria-labelledby="technology-motion-title">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[clamp(20px,5vw,84px)]">
        <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--ultra-violet)]" id="technology-motion-title">
          Frontend, in motion
        </h2>
        <p className="m-0 font-mono text-[8px] uppercase tracking-[0.09em] text-[var(--slate)] sm:text-[9px]">
          React · Next.js · TypeScript · and the tools around them
        </p>
      </div>

      <ul className="sr-only" aria-label="Technologies featured in the animation">
        {technologies.map((technology) => <li key={technology.id}>{technology.name}</li>)}
      </ul>

      <div className="relative mx-auto mt-3 h-[280px] max-w-[1480px] sm:mt-4 sm:h-[300px] lg:h-[330px]" aria-hidden="true">
        <MarqueeAlongSvgPath
          path={technologyPath}
          pathId="frontend-technology-marquee-path"
          viewBox="0 0 996 330"
          baseVelocity={3.8}
          slowdownOnHover
          slowDownFactor={0.24}
          useScrollVelocity
          scrollAwareDirection
          repeat={2}
          showPath
          responsive
          className="text-[rgba(134,47,231,0.28)]"
        >
          {technologies.map((technology) => <TechnologyItem key={technology.id} {...technology} />)}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  );
}
