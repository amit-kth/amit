"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";

const PLACEHOLDER_IDS = Array.from({ length: 16 }, (_, index) => index + 1);

function ImagePlaceholder({ index, light = false }: { index: number; light?: boolean }) {
  const label = String(index).padStart(2, "0");

  return (
    <div
      className={`group relative aspect-video w-full shrink-0 overflow-hidden rounded-[var(--shape-radius-sm)] border transition-transform duration-300 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100 ${
        light
          ? "border-[var(--mist)] bg-[rgba(255,255,255,0.82)] text-[var(--slate)]"
          : "border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.045)] text-[rgba(241,245,249,0.68)]"
      }`}
      role="img"
      aria-label={`Project image placeholder ${label}, 16 by 9`}
    >
      <span className="pointer-events-none absolute inset-3 rounded-[0.625rem] border border-dashed border-current opacity-30" aria-hidden="true" />
      <span className="absolute inset-0 grid place-items-center font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
        Image placeholder <span className="ml-2 opacity-70">/{label}</span>
      </span>
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(173,109,244,0.12),transparent_66%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" aria-hidden="true" />
    </div>
  );
}

export default function UnfurlingGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    mass: 0.5,
  });
  const progress = prefersReducedMotion ? scrollYProgress : springProgress;

  const columns = useMemo(() => {
    return [0, 1, 2, 3].map((columnIndex) => {
      const column = PLACEHOLDER_IDS.filter((_, index) => index % 4 === columnIndex);
      return [...column, ...column];
    });
  }, []);

  const bannerWidth = useTransform(progress, [0, 0.16], ["90vw", "100vw"]);
  const bannerHeight = useTransform(progress, [0, 0.16], ["80vh", "100vh"]);
  const bannerRadius = useTransform(progress, [0, 0.16], ["32px", "0px"]);
  const bannerBorderWidth = useTransform(progress, [0, 0.16], ["3px", "0px"]);

  const rotateY = useTransform(progress, [0.16, 1], [-42, -6]);
  const rotateX = useTransform(progress, [0.16, 1], [22, 3]);
  const rotateZ = useTransform(progress, [0.16, 1], [12, 1]);
  const translateZ = useTransform(progress, [0.16, 1], [-520, 0]);

  const yColumn1 = useTransform(progress, [0.16, 1], ["0%", "-38%"]);
  const yColumn2 = useTransform(progress, [0.16, 1], ["-32%", "12%"]);
  const yColumn3 = useTransform(progress, [0.16, 1], ["0%", "-38%"]);
  const yColumn4 = useTransform(progress, [0.16, 1], ["-26%", "18%"]);
  const columnOffsets = [yColumn1, yColumn2, yColumn3, yColumn4];

  if (prefersReducedMotion) {
    return (
      <section className="section-gallery relative py-[clamp(76px,9vw,132px)]" id="gallery" ref={containerRef} aria-labelledby="gallery-title">
        <div className="mx-auto max-w-[1480px] px-[clamp(20px,5vw,84px)]">
          <header className="mb-8 max-w-[780px] sm:mb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ultra-violet)]">04 <span className="mx-2 text-[var(--orchid-wash)]">/</span>Gallery</p>
            <h2 className="mt-3 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.09em] text-[var(--midnight-ink)]" id="gallery-title">Selected work<span className="text-[var(--voltage-violet)]">.</span></h2>
            <p className="mt-4 max-w-[620px] text-sm leading-relaxed text-[var(--graphite)]">Project image spaces are ready for your 16:9 work samples.</p>
          </header>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_IDS.map((index) => <ImagePlaceholder key={index} index={index} light />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section-gallery relative h-[400vh] md:h-[450vh] xl:h-[500vh]"
      id="gallery"
      ref={containerRef}
      aria-labelledby="gallery-title"
    >
      <div className="sticky top-0 flex h-screen supports-[height:100svh]:h-svh w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{
            width: bannerWidth,
            height: bannerHeight,
            borderRadius: bannerRadius,
            borderWidth: bannerBorderWidth,
            borderColor: "rgba(95, 37, 158, 0.58)",
          }}
          className="section-gallery__stage relative mx-auto flex max-w-[1920px] items-center justify-center overflow-hidden border-solid bg-[var(--midnight-ink)] will-change-transform"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ perspective: "1100px" }}>
            <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(17,24,39,0.94),inset_0_-100px_150px_-50px_rgba(17,24,39,0.94),inset_120px_0_150px_-50px_rgba(17,24,39,0.72),inset_-120px_0_150px_-50px_rgba(17,24,39,0.72)]" aria-hidden="true" />
            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                z: translateZ,
                transformStyle: "preserve-3d",
              }}
              className="flex h-[150vh] w-[128vw] min-w-[1120px] origin-center items-center justify-center gap-4 opacity-100 will-change-transform md:gap-6"
            >
              {columns.map((column, columnIndex) => (
                <motion.div
                  key={`gallery-column-${columnIndex}`}
                  style={{ y: columnOffsets[columnIndex] }}
                  className="pointer-events-auto flex w-[22vw] min-w-[190px] flex-col gap-4 md:gap-6"
                >
                  {column.map((index, itemIndex) => (
                    <ImagePlaceholder key={`gallery-${columnIndex}-${itemIndex}`} index={index} />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-[rgba(17,24,39,0.96)] via-[rgba(17,24,39,0.66)] to-transparent px-[clamp(22px,5vw,76px)] pb-14 pt-[clamp(28px,5vh,56px)]">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--lavender-mist)]">04 <span className="mx-2 text-[rgba(255,255,255,0.48)]">/</span>Gallery</p>
            <h2 className="mt-3 text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.88] tracking-[-0.09em] text-[var(--pure-white)]" id="gallery-title">Selected work<span className="text-[var(--lavender-mist)]">.</span></h2>
            <p className="mt-4 max-w-[480px] font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--mist)]">Scroll to unfold the 16:9 image spaces</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
