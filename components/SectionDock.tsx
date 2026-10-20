"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Home, Mail, PanelsTopLeft, Route, Sparkles } from "lucide-react";
import { navigation } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";

const icons = {
  hero: Home,
  "what-i-do": PanelsTopLeft,
  proof: BarChart3,
  skills: Sparkles,
  journey: Route,
  contact: Mail,
} as const;

const targetId = (id: string) => id === "hero" ? "experience-story" : id;
const dockSpring = { type: "spring" as const, stiffness: 520, damping: 46, mass: 1 };

export function SectionDock() {
  const [activeId, setActiveId] = useState("hero");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sections = navigation
      .map((item) => ({ item, element: document.getElementById(targetId(item.id)) }))
      .filter((entry): entry is { item: (typeof navigation)[number]; element: HTMLElement } => Boolean(entry.element));
    if (!sections.length) return;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.48;
      let nextActive = sections[0].item.id;
      for (const { item, element } of sections) {
        if (element.getBoundingClientRect().top <= readingLine) nextActive = item.id;
        else break;
      }
      setActiveId((current) => current === nextActive ? current : nextActive);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[150] flex justify-center px-4 pb-[max(14px,env(safe-area-inset-bottom))]">
      <motion.nav
        aria-label="Explore portfolio sections"
        className="section-dock pointer-events-auto flex items-center gap-0.5 rounded-[28px] border border-white/80 bg-[rgba(255,255,255,0.76)] p-1 shadow-[0_12px_40px_rgba(17,24,39,0.16),inset_0_1px_0_rgba(255,255,255,0.94)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(255,255,255,0.62)] sm:gap-2 sm:p-2.5"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.94 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={reducedMotion ? { duration: 0.16 } : dockSpring}
      >
        {navigation.map((item) => {
          const Icon = icons[item.id as keyof typeof icons];
          const active = activeId === item.id;
          return (
            <motion.a
              className="group relative grid size-11 shrink-0 place-items-center rounded-[20px] text-[var(--graphite)] outline-none transition-colors hover:text-[var(--ultra-violet)] focus-visible:text-[var(--ultra-violet)] focus-visible:ring-2 focus-visible:ring-[var(--ultra-violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pure-white)] active:bg-[var(--lavender-field)] sm:size-12"
              href={`#${item.id}`}
              key={item.id}
              aria-label={item.label}
              aria-current={active ? "location" : undefined}
              title={item.label}
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.12 }}
              whileTap={reducedMotion ? undefined : { scale: 0.92 }}
              transition={dockSpring}
            >
              {active && (reducedMotion ? (
                <span className="absolute inset-0 rounded-[20px] bg-[var(--lavender-field)]" aria-hidden="true" />
              ) : (
                <motion.span
                  className="absolute inset-0 rounded-[20px] bg-[var(--lavender-field)]"
                  layoutId="section-dock-active"
                  transition={dockSpring}
                  aria-hidden="true"
                />
              ))}
              <Icon className="relative z-[1]" size={19} strokeWidth={active ? 2.1 : 1.8} aria-hidden="true" />
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 rounded-md bg-[var(--midnight-ink)] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-white opacity-0 shadow-sm transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {item.label}
              </span>
              {active && <span className="absolute -bottom-0.5 z-[1] size-1 rounded-full bg-[var(--ultra-violet)]" aria-hidden="true" />}
            </motion.a>
          );
        })}
      </motion.nav>
    </div>
  );
}
