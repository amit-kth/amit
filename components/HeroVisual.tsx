import { profile } from "@/data/profile";

const technologies = profile.techSummary.split(" / ");

export function HeroVisual() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art__folio">
        <span>AV / 2026</span>
        <span>UI/UX <i>→</i> FRONTEND</span>
      </div>
      <div className="hero-art__backdrop-type">AV</div>

      <svg className="hero-art__route" viewBox="0 0 650 520" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-route-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B6F23A" />
            <stop offset="48%" stopColor="#D8664D" />
            <stop offset="100%" stopColor="#765DB5" />
          </linearGradient>
          <filter id="hero-route-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse className="hero-art__orbit-track hero-art__orbit-track--one" cx="330" cy="255" rx="238" ry="154" />
        <ellipse className="hero-art__orbit-track hero-art__orbit-track--two" cx="330" cy="255" rx="204" ry="188" />
        <path
          className="hero-art__route-path"
          pathLength="1"
          d="M122 147 C 237 99, 261 195, 310 257 S 390 361, 514 320"
        />
        <circle className="hero-art__route-dot hero-art__route-dot--start" cx="122" cy="147" r="6" />
        <circle className="hero-art__route-dot hero-art__route-dot--end" cx="514" cy="320" r="6" />
        <g className="hero-art__runner-group">
          <circle className="hero-art__runner-halo" cx="122" cy="147" r="13" />
          <circle className="hero-art__runner" cx="122" cy="147" r="6" filter="url(#hero-route-glow)" />
        </g>
      </svg>

      <article className="hero-art__panel hero-art__panel--design" data-hero-art-node>
        <div className="hero-art__panel-head">
          <span>01 / UI·UX</span>
          <span>UI/UX DESIGN</span>
        </div>
        <div className="hero-art__design-board">
          <div className="hero-art__design-type">
            <strong>Aa</strong>
            <span>TYPE<br />&amp; FLOW</span>
          </div>
          <div className="hero-art__design-image">
            <i />
            <b />
            <span />
          </div>
          <div className="hero-art__design-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </article>

      <article className="hero-art__panel hero-art__panel--code" data-hero-art-node>
        <div className="hero-art__panel-head">
          <span>02 / FRONTEND</span>
          <span>CORE STACK</span>
        </div>
        <div className="hero-art__tech-list">
          {technologies.map((technology, index) => (
            <div className="hero-art__tech-row" key={technology}>
              <span>0{index + 1}</span>
              <strong>{technology}</strong>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </article>

      <div className="hero-art__experience" data-hero-art-node>
        <strong>{profile.experienceYears}</strong>
        <span>years in<br />frontend</span>
      </div>

      <div className="hero-art__orbit-label">
        <span>DESIGN</span>
        <i />
        <span>DETAIL</span>
        <i />
        <span>CODE</span>
      </div>
    </div>
  );
}
