"use client";

import { useEffect, useRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { LiquidGlass as LiquidGlassSurface, LiquidGlassMaterial } from "apple-liquid-glass-webgl";

type GlassButtonBaseProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  variant?: "primary" | "secondary";
  size?: "default" | "compact";
};

type GlassButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof GlassButtonBaseProps | "href"
> & { href: string };

type GlassButtonNativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof GlassButtonBaseProps
>;

export type GlassButtonProps = GlassButtonBaseProps & (GlassButtonLinkProps | GlassButtonNativeProps);

const glassButtonMaterial = {
  refraction: 64,
  edgeReach: 0.25,
  edgeWidth: 0.16,
  dispersion: 1.15,
  frost: 0,
  backdropBlur: 0,
  body: 0.43,
  absorption: 0.16,
  tint: 0.05,
  rim: 0.86,
  reflection: 0.8,
  highlight: 0.92,
  lightAngle: 132,
  echo: 0.36,
  hairline: 0.88,
  hairWidth: 0.34,
} satisfies Partial<LiquidGlassMaterial>;

export function GlassButton({
  children,
  className = "",
  tone = "light",
  variant = "primary",
  size = "default",
  ...elementProps
}: GlassButtonProps) {
  const surfaceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let mounted = true;
    let glass: LiquidGlassSurface | null = null;
    const element = surfaceRef.current;
    if (!element) return;

    const initialize = async () => {
      try {
        const { LiquidGlass } = await import("apple-liquid-glass-webgl");
        if (!mounted || !element.isConnected) return;

        glass = new LiquidGlass(element, {
          backdrop: "auto",
          tint: 0.52,
          tintTone: tone === "dark" ? "dark" : "light",
          frost: 0,
          material: glassButtonMaterial,
          live: false,
          maxDpr: 1.5,
          bleed: 14,
          zIndex: -1,
          respectReducedTransparency: true,
          fallback: (surface) => surface.classList.add("glass-button__surface--fallback"),
        });
        const readySurface = await glass.ready;
        if (mounted && readySurface.mode !== "webgl") {
          element.classList.add("glass-button__surface--fallback");
        }
      } catch {
        if (mounted) {
          element.dataset.liquidGlass = "fallback";
          element.classList.add("glass-button__surface--fallback");
        }
      }
    };

    const frame = window.requestAnimationFrame(() => void initialize());
    return () => {
      mounted = false;
      window.cancelAnimationFrame(frame);
      glass?.destroy();
    };
  }, [tone]);

  const controlClassName = `glass-button ${className}`.trim();
  const surface = (
    <span
      className="glass-button__surface"
      data-glass-button-surface
      ref={surfaceRef}
      aria-hidden="true"
    />
  );
  const content = <span className="glass-button__content">{children}</span>;
  const glassAttributes = {
    "data-glass-tone": tone,
    "data-glass-variant": variant,
    "data-glass-size": size,
  } as const;

  if ("href" in elementProps) {
    const { href, ...linkProps } = elementProps;
    return (
      <a
        {...linkProps}
        href={href}
        className={controlClassName}
        {...glassAttributes}
      >
        {surface}
        {content}
      </a>
    );
  }

  const buttonProps = elementProps as GlassButtonNativeProps;
  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      className={controlClassName}
      {...glassAttributes}
    >
      {surface}
      {content}
    </button>
  );
}

export default GlassButton;
