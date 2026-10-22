"use client";

import { Children, useEffect, useId, useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { MotionValue, SpringOptions } from "motion/react";
import { usePrefersReducedMotion } from "@/components/ui/shader-canvas-utils/motion";

const wrap = (min: number, max: number, value: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type MarqueeAlongSvgPathProps = {
  children: ReactNode;
  className?: string;
  path: string;
  pathId?: string;
  preserveAspectRatio?: string;
  showPath?: boolean;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  baseVelocity?: number;
  direction?: "normal" | "reverse";
  easing?: (value: number) => number;
  slowdownOnHover?: boolean;
  slowDownFactor?: number;
  slowDownSpringConfig?: SpringOptions;
  useScrollVelocity?: boolean;
  scrollAwareDirection?: boolean;
  scrollSpringConfig?: SpringOptions;
  repeat?: number;
  draggable?: boolean;
  dragSensitivity?: number;
  dragVelocityDecay?: number;
  dragAwareDirection?: boolean;
  grabCursor?: boolean;
  enableRollingZIndex?: boolean;
  zIndexBase?: number;
  zIndexRange?: number;
  responsive?: boolean;
};

type MarqueePathItemProps = {
  children: ReactNode;
  index: number;
  itemCount: number;
  path: string;
  baseOffset: MotionValue<number>;
  easing?: (value: number) => number;
  enableRollingZIndex: boolean;
  zIndexBase: number;
  zIndexRange: number;
  repeated: boolean;
};

function MarqueePathItem({
  children,
  index,
  itemCount,
  path,
  baseOffset,
  easing,
  enableRollingZIndex,
  zIndexBase,
  zIndexRange,
  repeated,
}: MarqueePathItemProps) {
  const itemOffset = useTransform(baseOffset, (value) => {
    const start = (index * 100) / itemCount;
    const progress = wrap(0, 100, value + start);
    const eased = easing ? wrap(0, 100, easing(progress / 100) * 100) : progress;
    return `${eased}%`;
  });
  const zIndex = useTransform(itemOffset, (value) => {
    const progress = Number.parseFloat(value) / 100;
    return Math.floor(zIndexBase + (1 - progress) * zIndexRange);
  });

  return (
    <motion.div
      className="absolute left-0 top-0 w-max"
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        offsetAnchor: "center",
        offsetRotate: "0deg",
        zIndex: enableRollingZIndex ? zIndex : undefined,
        willChange: "offset-distance",
      }}
      aria-hidden={repeated}
    >
      {children}
    </motion.div>
  );
}

function ScrollVelocityBridge({
  velocityTarget,
  factorTarget,
  springConfig,
}: {
  velocityTarget: MotionValue<number>;
  factorTarget: MotionValue<number>;
  springConfig: SpringOptions;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollVelocity = useSpring(scrollVelocity, springConfig);
  const scrollVelocityFactor = useTransform(smoothScrollVelocity, [-1800, 1800], [-0.45, 0.45], { clamp: true });

  useEffect(() => {
    const stopVelocity = smoothScrollVelocity.on("change", (value) => velocityTarget.set(value));
    const stopFactor = scrollVelocityFactor.on("change", (value) => factorTarget.set(value));
    return () => {
      stopVelocity();
      stopFactor();
    };
  }, [factorTarget, scrollVelocityFactor, smoothScrollVelocity, velocityTarget]);

  return null;
}

export default function MarqueeAlongSvgPath({
  children,
  className = "",
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  baseVelocity = 5,
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  repeat = 3,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,
  responsive = false,
}: MarqueeAlongSvgPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const baseOffset = useMotionValue(0);
  const directionFactor = useRef(direction === "normal" ? 1 : -1);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const isInView = useRef(false);
  const dragVelocity = useRef(0);
  const lastPointerPosition = useRef({ x: 0, y: 0 });
  const hoverFactor = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactor, slowDownSpringConfig);
  const reducedMotion = usePrefersReducedMotion();
  const generatedId = useId().replaceAll(":", "");
  const id = pathId ?? `marquee-path-${generatedId}`;

  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const repeatedItems = useMemo(() => {
    const safeRepeat = Math.max(1, Math.floor(repeat));
    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: safeRepeat }, (_, repeatIndex) => ({
        child,
        childIndex,
        repeatIndex,
        index: repeatIndex * childrenArray.length + childIndex,
        key: `${childIndex}-${repeatIndex}`,
      })),
    );
  }, [childrenArray, repeat]);
  const viewBoxDimensions = useMemo(() => {
    const [, , widthInViewBox, heightInViewBox] = viewBox.split(/[\s,]+/).map(Number);
    return {
      width: Number.isFinite(widthInViewBox) && widthInViewBox > 0 ? widthInViewBox : 100,
      height: Number.isFinite(heightInViewBox) && heightInViewBox > 0 ? heightInViewBox : 100,
    };
  }, [viewBox]);

  // Keep scroll observers off animated paths that do not use scroll-reactive motion.
  const smoothScrollVelocity = useMotionValue(0);
  const scrollVelocityFactor = useMotionValue(0);

  useEffect(() => {
    directionFactor.current = direction === "normal" ? 1 : -1;
  }, [direction]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => { isInView.current = Boolean(entry?.isIntersecting); },
      { rootMargin: "100px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const isStatic = reducedMotion;

  useEffect(() => {
    if (!responsive || isStatic) return;
    const wrapper = containerRef.current;
    const marqueeContainer = marqueeContainerRef.current;
    if (!wrapper || !marqueeContainer) return;

    const updateScale = () => {
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;
      if (!wrapperWidth || !wrapperHeight) return;

      const scaleX = wrapperWidth / viewBoxDimensions.width;
      const scaleY = wrapperHeight / viewBoxDimensions.height;
      // On narrow screens, let the path crop at its sides instead of shrinking its icons to fit.
      const scale = wrapperWidth < viewBoxDimensions.width * 0.72
        ? Math.max(scaleX, scaleY)
        : Math.min(scaleX, scaleY);
      const scaledWidth = viewBoxDimensions.width * scale;
      const scaledHeight = viewBoxDimensions.height * scale;

      marqueeContainer.style.width = `${viewBoxDimensions.width}px`;
      marqueeContainer.style.height = `${viewBoxDimensions.height}px`;
      marqueeContainer.style.transform = `translate(${(wrapperWidth - scaledWidth) / 2}px, ${(wrapperHeight - scaledHeight) / 2}px) scale(${scale})`;
      marqueeContainer.style.transformOrigin = "top left";
    };

    updateScale();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateScale);
    observer?.observe(wrapper);
    window.addEventListener("resize", updateScale, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [isStatic, responsive, viewBoxDimensions]);

  useAnimationFrame((_, delta) => {
    if (isStatic || !isInView.current || !repeatedItems.length) return;

    const cappedDelta = Math.min(delta, 48);
    hoverFactor.set(isHovered.current && slowdownOnHover ? slowDownFactor : 1);

    const currentScrollVelocity = smoothScrollVelocity.get();
    if (scrollAwareDirection && Math.abs(currentScrollVelocity) > 24) {
      directionFactor.current = Math.sign(currentScrollVelocity);
    } else if (!scrollAwareDirection) {
      directionFactor.current = direction === "normal" ? 1 : -1;
    }

    let moveBy = directionFactor.current * baseVelocity * (cappedDelta / 1000) * smoothHoverFactor.get();
    if (useScrollVelocity) moveBy *= 1 + Math.abs(scrollVelocityFactor.get());

    if (draggable) {
      moveBy += dragVelocity.current;
      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current);
      }
      if (!isDragging.current) {
        dragVelocity.current *= dragVelocityDecay;
        if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      }
    }

    baseOffset.set(baseOffset.get() + moveBy);
  });

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    isDragging.current = true;
    dragVelocity.current = 0;
    lastPointerPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || !isDragging.current) return;
    const deltaX = event.clientX - lastPointerPosition.current.x;
    dragVelocity.current = deltaX * dragSensitivity;
    lastPointerPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
  };

  const interactionProps = {
    onPointerDown: draggable ? handlePointerDown : undefined,
    onPointerMove: draggable ? handlePointerMove : undefined,
    onPointerUp: draggable ? handlePointerUp : undefined,
    onPointerCancel: draggable ? handlePointerUp : undefined,
    onPointerEnter: () => { isHovered.current = true; },
    onPointerLeave: () => { isHovered.current = false; },
  };

  if (isStatic) {
    return (
      <div
        ref={containerRef}
        className={`relative h-full w-full overflow-hidden ${className}`}
        {...interactionProps}
      >
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-2 gap-y-3 px-2 py-3">
          {childrenArray.map((child, index) => (
            <div className="shrink-0" key={`static-${index}`}>{child}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${draggable && grabCursor ? "cursor-grab touch-pan-y" : ""} ${className}`}
      {...interactionProps}
    >
      {(useScrollVelocity || scrollAwareDirection) && (
        <ScrollVelocityBridge
          velocityTarget={smoothScrollVelocity}
          factorTarget={scrollVelocityFactor}
          springConfig={scrollSpringConfig}
        />
      )}
      <div className="path-marquee__fallback flex h-full w-full flex-wrap items-center justify-center gap-x-2 gap-y-3 px-2 py-3">
        {childrenArray.map((child, index) => <div className="shrink-0" key={`fallback-${index}`}>{child}</div>)}
      </div>
      <div className="path-marquee__animated absolute inset-0">
        <div
          ref={marqueeContainerRef}
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: viewBoxDimensions.width, height: viewBoxDimensions.height }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            preserveAspectRatio={preserveAspectRatio}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              id={id}
              d={path}
              stroke={showPath ? "currentColor" : "none"}
              strokeWidth={2}
              strokeOpacity={0.48}
              strokeDasharray={showPath ? "2 10" : undefined}
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {repeatedItems.map(({ child, repeatIndex, index, key }) => (
            <MarqueePathItem
              key={key}
              index={index}
              itemCount={repeatedItems.length}
              path={path}
              baseOffset={baseOffset}
              easing={easing}
              enableRollingZIndex={enableRollingZIndex}
              zIndexBase={zIndexBase}
              zIndexRange={zIndexRange}
              repeated={repeatIndex > 0}
            >
              {child}
            </MarqueePathItem>
          ))}
        </div>
      </div>
    </div>
  );
}
