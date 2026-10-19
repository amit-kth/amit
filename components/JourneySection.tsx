"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { awards, copy, education, journey } from "@/data/profile";
import { gsap, registerGsapPlugins } from "@/lib/gsap-client";

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    registerGsapPlugins();
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          tablet: "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const conditions = mediaContext.conditions as
            | { desktop: boolean; tablet: boolean; mobile: boolean; reduced: boolean }
            | undefined;
          if (conditions?.reduced) return;

          const list = section.querySelector<HTMLElement>(".journey-list");
          const line = section.querySelector<HTMLElement>(".journey-list__line-fill");
          if (list && line) {
            gsap.fromTo(line, { scaleY: 0 }, {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: list,
                start: "top 68%",
                end: "bottom 54%",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            });
          }

          const rows = Array.from(section.querySelectorAll<HTMLElement>("[data-journey-row]"));
          for (const row of rows) {
            const year = row.querySelector<HTMLElement>(".journey-row__year-fill");
            gsap.fromTo(row,
              { y: conditions?.mobile ? 20 : 34 },
              {
                y: 0,
                duration: conditions?.mobile ? 0.58 : 0.72,
                ease: "power3.out",
                scrollTrigger: { trigger: row, start: "top 88%", once: true },
              },
            );
            if (year) {
              gsap.fromTo(year, { scaleY: 0 }, {
                scaleY: 1,
                transformOrigin: "bottom center",
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top 76%",
                  end: "center 44%",
                  scrub: 0.45,
                },
              });
            }
          }
        },
      );
      return () => media.revert();
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section className="journey-section content-section" id="journey" ref={sectionRef} aria-labelledby="journey-title">
      <div className="section-shell journey-section__layout">
        <aside className="journey-side">
          <div className="section-marker">
            <span className="section-marker__number">05</span>
            <span>{copy.journey}</span>
          </div>
          <div className="journey-side__sticky">
            <p className="eyebrow">{copy.journeyCaption}</p>
            <h2 id="journey-title">{copy.journeyTitle}</h2>
            <p>{copy.journeyIntro}</p>
          </div>
        </aside>

        <div className="journey-main">
          <div className="journey-list" aria-label={copy.journey}>
            <span className="journey-list__line" aria-hidden="true"><i className="journey-list__line-fill" /></span>
            {journey.map((item, index) => (
              <article className="journey-row" key={item.id} data-journey-row>
                <span className="journey-row__number">0{index + 1}</span>
                <div className="journey-row__year" aria-hidden="true">
                  <span className="journey-row__year-outline">{item.year}</span>
                  <span className="journey-row__year-fill">{item.year}</span>
                </div>
                <div className="journey-row__copy">
                  <p className="journey-row__period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="journey-row__company">{item.company}</p>
                  <p className="journey-row__description">{item.description}</p>
                </div>
                <ArrowUpRight className="journey-row__arrow" size={20} aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="journey-extras">
            <section className="journey-education" aria-labelledby="education-title">
              <p className="eyebrow">{copy.journeyEducation}</p>
              <h3 id="education-title">{education.qualification}</h3>
              <p>{education.institution} <span>·</span> {education.dates}</p>
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
