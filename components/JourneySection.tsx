"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LiquidGlass as LiquidGlassSurface, LiquidGlassMaterial } from "apple-liquid-glass-webgl";
import { awards, copy, education, journey } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

const cardThemes = ["violet", "mint", "rose", "amber"] as const;

const journeyGlassMaterial = {
  refraction: 92,
  edgeReach: 0.24,
  edgeWidth: 0.16,
  dispersion: 1.1,
  frost: 0,
  backdropBlur: 0,
  body: 0.4,
  absorption: 0.14,
  tint: 0.05,
  rim: 0.88,
  reflection: 0.8,
  highlight: 0.94,
  lightAngle: 132,
  echo: 0.36,
  hairline: 0.88,
  hairWidth: 0.34,
  roundness: 0.78,
} satisfies Partial<LiquidGlassMaterial>;

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = cardStageRef.current;
    if (!stage) return;

    const desktopViewport = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let mounted = true;
    let glass: LiquidGlassSurface | null = null;
    let frame: number | null = null;
    let generation = 0;

    const dispose = () => {
      generation += 1;
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      glass?.destroy();
      glass = null;
    };

    const initialize = async (request: number) => {
      try {
        const { LiquidGlass } = await import("apple-liquid-glass-webgl");
        if (!mounted || request !== generation || !desktopViewport.matches || reducedMotion.matches) return;

        stage.classList.remove("journey-card-stack__stage--fallback");
        glass = new LiquidGlass(stage, {
          backdrop: "auto",
          tint: 0.44,
          tintTone: "light",
          frost: 0,
          material: journeyGlassMaterial,
          live: false,
          maxDpr: 1.35,
          bleed: 22,
          zIndex: -1,
          respectReducedTransparency: true,
          onContextLost: () => stage.classList.add("journey-card-stack__stage--fallback"),
          onContextRestored: () => stage.classList.remove("journey-card-stack__stage--fallback"),
          fallback: (element) => element.classList.add("journey-card-stack__stage--fallback"),
        });

        const readySurface = await glass.ready;
        if (mounted && request === generation && readySurface.mode !== "webgl") {
          stage.classList.add("journey-card-stack__stage--fallback");
        }
      } catch {
        glass?.destroy();
        glass = null;
        if (mounted && request === generation) {
          stage.classList.add("journey-card-stack__stage--fallback");
        }
      }
    };

    const syncGlass = () => {
      dispose();
      if (!desktopViewport.matches || reducedMotion.matches) {
        stage.classList.add("journey-card-stack__stage--fallback");
        return;
      }

      stage.classList.remove("journey-card-stack__stage--fallback");
      const request = generation;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        void initialize(request);
      });
    };

    const subscribe = (query: MediaQueryList) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", syncGlass);
        return () => query.removeEventListener("change", syncGlass);
      }
      query.addListener(syncGlass);
      return () => query.removeListener(syncGlass);
    };

    const unsubscribeDesktop = subscribe(desktopViewport);
    const unsubscribeMotion = subscribe(reducedMotion);
    syncGlass();

    return () => {
      mounted = false;
      dispose();
      unsubscribeDesktop();
      unsubscribeMotion();
      stage.classList.remove("journey-card-stack__stage--fallback");
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const stage = cardStageRef.current;
    if (!section || !stack || !stage) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-journey-card]"));
        if (cards.length < 2) return;

        section.dataset.scrollStack = "active";
        gsap.set(cards, {
          y: 72,
          scale: 1.035,
          autoAlpha: 0,
          transformOrigin: "center top",
          force3D: true,
        });
        gsap.set(cards[0], { y: 0, scale: 1, autoAlpha: 1 });

        const cardContents = cards
          .map((card) => card.querySelector<HTMLElement>(".journey-card__content"))
          .filter((content): content is HTMLElement => content !== null);
        gsap.set(cardContents, { y: 18, autoAlpha: 0 });
        const firstContent = cards[0].querySelector<HTMLElement>(".journey-card__content");
        if (firstContent) gsap.set(firstContent, { y: 0, autoAlpha: 1 });

        const deck = gsap.timeline({
          scrollTrigger: {
            trigger: stack,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * cards.length * 0.64)}`,
            pin: stage,
            pinSpacing: false,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return;

          const position = index;
          const duration = 0.82;
          for (let previous = 0; previous < index; previous += 1) {
            const distanceBefore = index - 1 - previous;
            const distanceAfter = index - previous;
            deck.fromTo(
              cards[previous],
              {
                y: -distanceBefore * 16,
                scale: 1 - distanceBefore * 0.035,
                opacity: Math.max(0.82, 1 - distanceBefore * 0.055),
                immediateRender: false,
              },
              {
                y: -distanceAfter * 16,
                scale: 1 - distanceAfter * 0.035,
                opacity: Math.max(0.82, 1 - distanceAfter * 0.055),
                duration,
                ease: "none",
              },
              position,
            );
          }

          deck.fromTo(
            card,
            { y: 72, scale: 1.035, autoAlpha: 0, immediateRender: false },
            { y: 0, scale: 1, autoAlpha: 1, duration, ease: "none" },
            position,
          );

          const content = card.querySelector<HTMLElement>(".journey-card__content");
          if (content) {
            deck.fromTo(
              content,
              { y: 18, autoAlpha: 0, immediateRender: false },
              { y: 0, autoAlpha: 1, duration: 0.68, ease: "none" },
              position + 0.1,
            );
          }
        });

        const lastCard = cards[cards.length - 1];
        deck.to(
          lastCard,
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.55, ease: "none" },
          cards.length - 1 + 0.82,
        );

        return () => {
          delete section.dataset.scrollStack;
          deck.scrollTrigger?.kill();
          deck.kill();
        };
      });

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  const stackStyle = {
    "--journey-stack-length": `${journey.length * 64}svh`,
  } as CSSProperties;

  return (
    <section className="journey-section" id="journey" ref={sectionRef} aria-labelledby="journey-title">
      <div className="journey-section__layout">
        <aside className="journey-side">
          <div className="section-marker" aria-hidden="true">
            <span className="section-marker__number">03</span>
            <span>{copy.journey}</span>
          </div>
          <div className="journey-side__sticky">
            <p className="eyebrow">{copy.journeyCaption}</p>
            <h2 id="journey-title">{copy.journeyTitle}</h2>
            <p>{copy.journeyIntro}</p>
          </div>
        </aside>

        <div className="journey-main">
          <div
            className="journey-card-stack"
            data-journey-card-stack
            ref={stackRef}
            role="list"
            aria-label={copy.journey}
            style={stackStyle}
          >
            <div className="journey-card-stack__stage" ref={cardStageRef} role="presentation">
              {journey.map((item, index) => (
                <article
                  className="journey-card"
                  data-journey-card
                  data-card-theme={cardThemes[index % cardThemes.length]}
                  key={item.id}
                  role="listitem"
                  aria-labelledby={`journey-${item.id}`}
                >
                  <span className="journey-card__wash" aria-hidden="true" />
                  <span className="journey-card__reflection" aria-hidden="true" />
                  <span className="journey-card__year" aria-hidden="true">{item.year}</span>
                  <div className="journey-card__content">
                    <div className="journey-card__topline">
                      <span className="journey-card__index">EXPERIENCE 0{index + 1} / 0{journey.length}</span>
                      <span className="journey-card__period">{item.period}</span>
                    </div>
                    <div className="journey-card__details">
                      <p className="journey-card__eyebrow">Career / {item.year}</p>
                      <h3 id={`journey-${item.id}`}>{item.role}</h3>
                      <p className="journey-card__company">{item.company}</p>
                      <p className="journey-card__description">{item.description}</p>
                    </div>
                    <div className="journey-card__footer" aria-hidden="true">
                      <span>AMIT VERMA / JOURNEY</span>
                      <span>0{index + 1}<i> / 0{journey.length}</i></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="journey-extras">
            <section className="journey-education" aria-labelledby="education-title">
              <p className="eyebrow">{copy.journeyEducation}</p>
              <h3 className="journey-education__degree" id="education-title">{education.qualification}</h3>
              <p>{education.institution} <span aria-hidden="true">·</span> {education.dates}</p>
            </section>
            <section className="journey-recognition" aria-labelledby="recognition-title">
              <p className="eyebrow">{copy.recognition}</p>
              <h3 className="sr-only" id="recognition-title">{copy.recognition}</h3>
              <ul>
                {awards.map((award) => (
                  <li key={award.title}>
                    <span>{award.title}</span>
                    {"organization" in award && <small>{award.organization}</small>}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
