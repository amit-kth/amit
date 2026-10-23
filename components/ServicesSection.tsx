"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";
import { copy, profile, services } from "@/data/profile";
import { gsap, registerGsapPlugins, revealSectionHeading } from "@/lib/gsap-client";

type ServiceId = (typeof services)[number]["id"];

function DesignPreview() {
  const steps = ["Discover", "Shape", "Prototype"];

  return (
    <div className="services-demo__design">
      <div className="services-demo__flow">
        <span className="services-demo__flow-label">USER FLOW</span>
        <div className="services-demo__flow-steps">
          {steps.map((step, index) => (
            <span className="services-demo__flow-step" key={step}>
              <span className="services-demo__flow-node">0{index + 1}</span>
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="services-demo__wireframe">
        <div className="services-demo__wireframe-nav">
          <span className="services-demo__wireframe-logo" />
          <div className="services-demo__wireframe-nav-items">
            <span />
            <span />
            <span />
          </div>
          <span className="services-demo__wireframe-action" />
        </div>
        <div className="services-demo__wireframe-hero">
          <div className="services-demo__wireframe-copy">
            <span className="services-demo__skeleton services-demo__skeleton--headline" />
            <span className="services-demo__skeleton services-demo__skeleton--wide" />
            <span className="services-demo__skeleton services-demo__skeleton--short" />
            <span className="services-demo__wireframe-button" />
          </div>
          <div className="services-demo__wireframe-art">
            <span />
            <i />
          </div>
        </div>
        <div className="services-demo__wireframe-cards">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function FrontendPreview() {
  return (
    <div className="services-demo__product">
      <aside className="services-demo__product-sidebar" aria-hidden="true">
        <span className="services-demo__product-mark" />
        <span className="services-demo__product-nav services-demo__product-nav--active" />
        <span className="services-demo__product-nav" />
        <span className="services-demo__product-nav" />
        <span className="services-demo__product-nav" />
        <span className="services-demo__product-nav services-demo__product-nav--last" />
      </aside>
      <div className="services-demo__product-main">
        <div className="services-demo__product-heading">
          <div>
            <span className="services-demo__product-eyebrow">PRODUCT OVERVIEW</span>
            <strong>Workspace</strong>
          </div>
          <span className="services-demo__product-avatar" />
        </div>
        <div className="services-demo__product-stats">
          <div className="services-demo__product-stat">
            <span>Projects</span>
            <i />
            <b />
          </div>
          <div className="services-demo__product-stat">
            <span>Activity</span>
            <i />
            <b />
          </div>
          <div className="services-demo__product-stat">
            <span>Progress</span>
            <i />
            <b />
          </div>
        </div>
        <div className="services-demo__product-chart">
          <div className="services-demo__product-chart-heading">
            <span>Activity</span>
            <i />
          </div>
          <div className="services-demo__product-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeServiceId, setActiveServiceId] = useState<ServiceId>("uiux-design");
  const activeService = services.find((service) => service.id === activeServiceId) ?? services[0];
  const isDesignMode = activeService.id === "uiux-design";

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    registerGsapPlugins();
    const context = gsap.context(() => {
      const heading = section.querySelector<HTMLElement>("#services-title");
      if (heading) revealSectionHeading(heading);
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      className="section-services relative overflow-hidden bg-[var(--surface-warm)] py-[clamp(76px,9vw,136px)] text-[var(--midnight-ink)]"
      id="what-i-do"
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-[1480px] px-[clamp(20px,5vw,84px)]">
        <header className="services-section-header">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ultra-violet)]">
              01 <span className="mx-2 text-[var(--orchid-wash)]" aria-hidden="true">/</span>{copy.services}
            </p>
            <h2 className="mt-3 text-section-heading font-semibold leading-[0.88] tracking-[-0.09em] text-[var(--midnight-ink)]" id="services-title" data-section-heading>
              {copy.servicesTitle}<span className="text-[var(--voltage-violet)]">.</span>
            </h2>
          </div>
          <p className="services-section-header__intro">{profile.about.statement}</p>
        </header>

        <div className="services-experience" data-mode={activeService.id}>
          <div className="services-experience__controls">
            <div className="services-mode-switch" role="group" aria-label={`Explore my ${copy.services.toLowerCase()}`}>
              {services.map((service) => {
                const isActive = service.id === activeService.id;
                return (
                  <button
                    className="services-mode-switch__button"
                    type="button"
                    key={service.id}
                    aria-pressed={isActive}
                    aria-controls="services-demo"
                    onClick={() => setActiveServiceId(service.id)}
                  >
                    <span className="services-mode-switch__number">{service.number}</span>
                    <span className="services-mode-switch__title">{service.title}</span>
                    <ArrowUpRight className="services-mode-switch__arrow" size={17} aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="services-experience__details" key={activeService.id} aria-live="polite">
              <p className="services-experience__description">{activeService.description}</p>
              <ul className="services-experience__skills" aria-label={`${activeService.title} skills`}>
                {activeService.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
              <a className="services-experience__link" href="#gallery">
                Explore selected work <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="services-experience__bridge" aria-hidden="true">
              <span className={isDesignMode ? "is-active" : ""}>Design</span>
              <span className="services-experience__bridge-line"><i /></span>
              <span className={!isDesignMode ? "is-active" : ""}>Build</span>
            </div>
          </div>

          <div className="services-demo" id="services-demo" data-mode={activeService.id}>
            <div className="services-demo__topbar">
              <div className="services-demo__window-dots" aria-hidden="true"><i /><i /><i /></div>
              <span className="services-demo__window-title">PRODUCT EXPERIENCE</span>
              <span className="services-demo__status"><i />{isDesignMode ? "DESIGN" : "LIVE UI"}</span>
            </div>
            <div
              className="services-demo__stage"
              role="img"
              aria-label={isDesignMode ? "A user flow and low-fidelity product wireframe" : "A responsive product dashboard interface"}
            >
              <div className="services-demo__scene" key={activeService.id}>
                {isDesignMode ? <DesignPreview /> : <FrontendPreview />}
              </div>
            </div>
            <div className="services-demo__process" aria-hidden="true">
              <span className={isDesignMode ? "is-active" : ""}>01&nbsp; Design</span>
              <span className="services-demo__process-line"><i /></span>
              <span className={!isDesignMode ? "is-active" : ""}>02&nbsp; Build</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
