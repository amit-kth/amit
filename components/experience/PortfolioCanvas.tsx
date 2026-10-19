"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Sparkles, useProgress } from "@react-three/drei";
import type { Group, Object3D } from "three";
import { initialCamera } from "@/data/experience";
import { Model } from "@/components/experience/Model";
import { modelAnchors, type AnchorKey } from "@/data/callouts";
import { cameraPath, cameraScrollState } from "@/data/camera-path";
import { CameraPathRig } from "@/components/experience/CameraPathRig";
import { CalloutProjector } from "@/components/experience/CalloutProjector";
import { SceneLighting } from "@/components/experience/SceneLighting";

function ModelLoadingStatus() {
  const { active, progress } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="model-loader" role="status" aria-live="polite">
      <span className="model-loader__dot" aria-hidden="true" />
      <span>Loading 3D portrait</span>
      <span className="model-loader__percent">{Math.round(progress)}%</span>
      <span className="sr-only">Loading Amit’s 3D portrait, {Math.round(progress)} percent</span>
    </div>
  );
}

type PortfolioCanvasProps = {
  calloutSvgRef: RefObject<SVGSVGElement | null>;
};

export function PortfolioCanvas({ calloutSvgRef }: PortfolioCanvasProps) {
  const [debugEnabled] = useState(() => typeof window !== "undefined"
    && process.env.NODE_ENV === "development"
    && new URLSearchParams(window.location.search).get("debug") === "1");
  const [anchorValues, setAnchorValues] = useState<Record<"head" | "heart" | "hands", [number, number, number]>>({
    head: [...modelAnchors.head], heart: [...modelAnchors.heart], hands: [...modelAnchors.hands],
  });
  const defaultsApplied = useRef(false);
  const [freezeScene, setFreezeScene] = useState("-1");
  const modelPoseRef = useRef<Group>(null);
  const modelRootRef = useRef<Group>(null);
  const anchorRefs = useRef(new Map<AnchorKey, Object3D>());
  useEffect(() => {
    if (!debugEnabled) return;
    const nodes: string[] = [];
    const timer = window.setInterval(() => {
      if (nodes.length || !modelRootRef.current) return;
      modelRootRef.current.traverse((node) => nodes.push(node.name || node.type));
      console.info("[Model nodes/bones]", nodes);
    }, 250);
    return () => window.clearInterval(timer);
  }, [debugEnabled]);
  useEffect(() => { cameraScrollState.frozenScene = Number(freezeScene); }, [freezeScene]);
  const updateAnchor = useCallback((key: "head" | "heart" | "hands", axis: number, value: number) => {
    setAnchorValues((current) => ({ ...current, [key]: current[key].map((item, i) => i === axis ? value : item) as [number, number, number] }));
  }, []);
  const setAnchorDefaults = useCallback((values: Record<"head" | "heart" | "hands", [number, number, number]>) => {
    if (defaultsApplied.current) return;
    defaultsApplied.current = true;
    setAnchorValues(values);
  }, []);
  const copyConfig = useCallback(async () => {
    const config = `export const modelAnchors = ${JSON.stringify(anchorValues, null, 2)} as const;`;
    await navigator.clipboard.writeText(config);
  }, [anchorValues]);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;

  return (
    <>
      <div className={`experience-canvas${debugEnabled ? " experience-canvas--debug" : ""}`} aria-hidden="true">
        <Canvas
          camera={{ position: isMobile ? [0, 1.52, 2.65] : initialCamera.position, fov: isMobile ? 22 : initialCamera.fov }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <SceneLighting />
          <Sparkles count={18} scale={[1.8, 2.4, 0.9]} size={1.05} speed={0.12} opacity={0.12} color="#8bd50f" />
          <CameraPathRig />
          <CalloutProjector svgRef={calloutSvgRef} modelRootRef={modelRootRef} anchorRefs={anchorRefs} />
          <Suspense fallback={null}>
            <Model
              poseRef={modelPoseRef}
              modelGroupRef={modelRootRef}
              anchorRefs={anchorRefs}
              debugAnchors={debugEnabled}
              anchorValues={anchorValues}
              onAnchorDefaults={setAnchorDefaults}
            />
          </Suspense>
          <ContactShadows position={[0, 0.012, 0]} opacity={0.16} scale={2.5} blur={2.6} far={2.1} resolution={256} />
        </Canvas>
      </div>
      <ModelLoadingStatus />
      {process.env.NODE_ENV === "development" && debugEnabled && <aside className="camera-debug anchor-editor" aria-label="Development anchor editor">
        <label>Freeze camera at scene <select value={freezeScene} onChange={(event) => setFreezeScene(event.target.value)}><option value="-1">Follow scroll</option>{cameraPath.map((scene, index) => <option key={scene.id} value={index}>{scene.label}</option>)}</select></label>
        {(["head", "heart", "hands"] as const).map((key) => <fieldset key={key}><legend>{key}</legend>{(["x", "y", "z"] as const).map((axis, index) => <label key={axis}>{axis}<input type="range" min={-0.6} max={1.9} step={0.005} value={anchorValues[key][index]} onChange={(event) => updateAnchor(key, index, Number(event.target.value))} /><input type="number" step="0.005" value={anchorValues[key][index]} onChange={(event) => updateAnchor(key, index, Number(event.target.value))} /></label>)}</fieldset>)}
        <button type="button" onClick={copyConfig}>Copy config</button>
      </aside>}
    </>
  );
}
