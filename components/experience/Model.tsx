"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Box3, Group, Vector3 } from "three";
import type { Object3D } from "three";
import { modelConfig } from "@/data/experience";
import { modelAnchors, type AnchorKey } from "@/data/callouts";

type AnchorValues = Record<"head" | "heart" | "hands", [number, number, number]>;
type ModelProps = {
  poseRef: RefObject<Group | null>;
  modelGroupRef: RefObject<Group | null>;
  anchorRefs: RefObject<Map<AnchorKey, Object3D>>;
  debugAnchors: boolean;
  anchorValues: AnchorValues;
  onAnchorDefaults: (values: AnchorValues) => void;
};

export function Model({ poseRef, modelGroupRef, anchorRefs, debugAnchors, anchorValues, onAnchorDefaults }: ModelProps) {
  const { scene } = useGLTF(modelConfig.src);
  const pointerTarget = useRef(0);
  const lastPointerAt = useRef(0);
  const fit = useMemo(() => {
    const bounds = new Box3().setFromObject(scene);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = modelConfig.targetHeight / Math.max(size.y, 0.001);
    return { scale, position: [-center.x * scale, modelConfig.groundOffset - bounds.min.y * scale, -center.z * scale] as [number, number, number] };
  }, [scene]);
  const defaults = useMemo(() => {
    const bounds = new Box3().setFromObject(scene);
    const center = bounds.getCenter(new Vector3());
    const front = (bounds.max.z - center.z) * fit.scale + 0.035;
    const h = modelConfig.targetHeight;
    return {
      // These GLB skeleton pivots sit at joints (the Head pivot is eye-level),
      // not at the visible points the callout labels describe. Use the fitted
      // bounding box so anchors stay consistent with the rendered silhouette.
      head: [center.x * fit.scale + fit.position[0], h * 0.93, front] as [number, number, number],
      heart: [center.x * fit.scale + fit.position[0] + h * 0.035, h * 0.70, front] as [number, number, number],
      // The raised, cup-holding hand sits above the waist fallback previously used.
      hands: [center.x * fit.scale + fit.position[0] + h * 0.01, h * 0.61, front] as [number, number, number],
    };
  }, [fit.position, fit.scale, scene]);

  useEffect(() => {
    onAnchorDefaults(defaults);
    const bones: string[] = [];
    scene.traverse((node) => { if (node.type === "Bone") bones.push(node.name || "(unnamed bone)"); });
    console.info("[Portrait bones]", bones);
  }, [defaults, onAnchorDefaults, scene]);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerTarget.current = Math.max(-1, Math.min(1, (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2));
      lastPointerAt.current = performance.now();
    };
    const reset = () => { pointerTarget.current = 0; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("blur", reset); };
  }, []);

  useFrame(({ clock }, delta) => {
    const group = poseRef.current;
    if (!group) return;
    const activeTarget = performance.now() - lastPointerAt.current < 180 ? pointerTarget.current : 0;
    const yaw = Math.max(-8, Math.min(8, activeTarget * 8)) * Math.PI / 180;
    group.rotation.y += (yaw - group.rotation.y) * Math.min(1, delta * 7);
    group.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.004;
  }, -1);

  const fittedLocal = (point: readonly [number, number, number]): [number, number, number] => [
    (point[0] - fit.position[0]) / fit.scale,
    (point[1] - fit.position[1]) / fit.scale,
    (point[2] - fit.position[2]) / fit.scale,
  ];
  const anchors = { ...modelAnchors, ...anchorValues };

  return <group ref={poseRef}>
    <group ref={modelGroupRef} scale={fit.scale} position={fit.position}>
      <primitive object={scene} dispose={null} />
      {Object.entries(anchors).map(([key, point]) => <object3D key={`anchor-${key}`} ref={(node) => {
        if (node) anchorRefs.current.set(key as AnchorKey, node);
        else anchorRefs.current.delete(key as AnchorKey);
      }} position={fittedLocal(point as readonly [number, number, number])} />)}
      {debugAnchors && Object.entries(anchors).map(([key, point]) => <mesh key={`debug-${key}`} position={fittedLocal(point as readonly [number, number, number])} raycast={() => null}>
        <sphereGeometry args={[0.026 / fit.scale, 16, 10]} />
        <meshBasicMaterial color={key === "heart" ? "#ff7857" : "#b6f23a"} depthTest={false} />
      </mesh>)}
    </group>
  </group>;
}

useGLTF.preload(modelConfig.src);
