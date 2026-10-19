"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { copy, navigation, profile } from "@/data/profile";
import { useLenis } from "@/components/SmoothScrollProvider";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [localTime, setLocalTime] = useState("--:--");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  const activeLabel = navigation.find((item) => item.id === activeId)?.label ?? copy.intro;

  useEffect(() => {
    const format = () => {
      try {
        return new Intl.DateTimeFormat("en-IN", {
          timeZone: profile.localTimeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
      } catch {
        return "--:--";
      }
    };
    const initial = window.setTimeout(() => setLocalTime(format()), 0);
    const timer = window.setInterval(() => setLocalTime(format()), 60_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
    };
  }, []);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        () => {
          const triggers: ScrollTrigger[] = [];
          for (const item of navigation) {
            const section = document.getElementById(item.id === "hero" ? "experience-story" : item.id);
            if (!section) continue;
            triggers.push(ScrollTrigger.create({
              trigger: section,
              start: "top 62%",
              end: "bottom 40%",
              onEnter: () => setActiveId(item.id),
              onEnterBack: () => setActiveId(item.id),
            }));
          }
          const progress = progressRef.current;
          if (progress) {
            triggers.push(ScrollTrigger.create({
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              onUpdate: (self) => {
                progress.style.transform = `scaleX(${self.progress})`;
              },
            }));
          }
          const setInitial = () => {
            let current = "hero";
            for (const item of navigation) {
              const section = document.getElementById(item.id === "hero" ? "experience-story" : item.id);
              if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.62) current = item.id;
            }
            setActiveId(current);
          };
          setInitial();
          return () => triggers.forEach((trigger) => trigger.kill());
        },
      );
      return () => media.revert();
    });
    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    if (!menuOpen) return;
    openerRef.current = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const frame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  const closeMenu = useCallback((focusTarget?: HTMLElement | null) => {
    if (focusTarget !== undefined) openerRef.current = focusTarget;
    setMenuOpen(false);
  }, []);

  const trapMenuFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = Array.from(menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0);
    if (!focusable.length) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <span className="top-progress" aria-hidden="true"><span ref={progressRef} /></span>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__brand" href="#hero">
            <span className="site-header__mark">{profile.brandMark}</span>
            <span className="site-header__name">{profile.name}</span>
          </a>
          <div className="site-header__status">
            <span>{profile.hero.portfolioLabel}</span>
            <span className="site-header__current"><i aria-hidden="true" />{copy.currentSection} / <AnimatePresence mode="wait" initial={false}>
              <motion.span key={activeId} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.2 }}>{activeLabel}</motion.span>
            </AnimatePresence></span>
          </div>
          <button
            className="site-header__menu-button"
            type="button"
            ref={menuButtonRef}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span>{menuOpen ? copy.close : copy.menu}</span>
            <span className={`menu-glyph${menuOpen ? " is-open" : ""}`} aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>

      <AnimatePresence
        onExitComplete={() => {
          const focusTarget = openerRef.current;
          openerRef.current = null;
          focusTarget?.focus({ preventScroll: true });
        }}
      >
        {menuOpen && (
          <motion.div
            className="site-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.navigationLabel}
            onKeyDown={trapMenuFocus}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.56, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="site-menu__top">
              <a
                className="site-menu__brand"
                href="#hero"
                onClick={() => {
                  const target = document.getElementById("hero");
                  target?.setAttribute("tabindex", "-1");
                  closeMenu(target);
                }}
              >
                {profile.brandMark} <span>{profile.hero.portfolioLabel}</span>
              </a>
              <button className="site-menu__close" type="button" onClick={() => closeMenu()} aria-label={copy.closeMenu}><X size={22} aria-hidden="true" /></button>
            </div>
            <div className="site-menu__body">
              <p className="eyebrow">{copy.navigationLabel}</p>
              <nav aria-label={copy.navigationLabel}>
                {navigation.map((item) => (
                  <a
                    className="site-menu__link"
                    href={`#${item.id}`}
                    key={item.id}
                    onClick={() => {
                      const target = document.getElementById(item.id);
                      target?.setAttribute("tabindex", "-1");
                      closeMenu(target);
                    }}
                  >
                    <span className="site-menu__link-index">{item.index}</span>
                    <span className="site-menu__link-label">{item.label}</span>
                    <ArrowDownRight size={21} aria-hidden="true" />
                  </a>
                ))}
              </nav>
              <aside className="site-menu__connect">
                <p className="eyebrow">Open to senior frontend roles</p>
                <a href={`mailto:${profile.email}`} onClick={() => closeMenu()}>
                  {profile.email}<ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <div className="site-menu__socials">
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
                  <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
                </div>
              </aside>
            </div>
            <div className="site-menu__bottom">
              <span>{copy.localTime}: {localTime}</span>
              <span>{profile.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
