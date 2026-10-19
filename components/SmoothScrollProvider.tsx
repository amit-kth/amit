"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

const LenisContext = createContext<Lenis | null>(null);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const instanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticker: ((time: number) => void) | null = null;
    let refreshTimer: number | undefined;
    let destroyed = false;

    const destroyLenis = () => {
      if (!instanceRef.current) return;
      if (ticker) gsap.ticker.remove(ticker);
      instanceRef.current.destroy();
      instanceRef.current = null;
      ticker = null;
      if (!destroyed) setLenis(null);
    };

    const createLenis = () => {
      if (reducedMotion.matches || instanceRef.current) return;
      const instance = new Lenis({
        autoRaf: false,
        lerp: 0.065,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.82,
      });
      instanceRef.current = instance;
      instance.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) destroyLenis();
      else createLenis();
      ScrollTrigger.refresh();
    };

    const refresh = () => {
      if (destroyed) return;
      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(refresh, 120);
    };

    const imageListeners: Array<{ image: HTMLImageElement; listener: () => void }> = [];
    const watchImages = () => {
      for (const image of Array.from(document.images)) {
        if (image.complete) continue;
        const listener = () => refresh();
        image.addEventListener("load", listener, { once: true });
        image.addEventListener("error", listener, { once: true });
        imageListeners.push({ image, listener });
      }
    };

    createLenis();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);
    watchImages();
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      destroyed = true;
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      for (const { image, listener } of imageListeners) {
        image.removeEventListener("load", listener);
        image.removeEventListener("error", listener);
      }
      if (instanceRef.current) {
        if (ticker) gsap.ticker.remove(ticker);
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
      ticker = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
