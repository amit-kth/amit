"use client";

import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import type { Group, Object3D } from "three";
import { Raycaster, Vector2, Vector3 } from "three";
import { bodyCallouts, type AnchorKey } from "@/data/callouts";

type CalloutProjectorProps = {
  svgRef: RefObject<SVGSVGElement | null>;
  modelRootRef: RefObject<Group | null>;
  anchorRefs: RefObject<Map<AnchorKey, Object3D>>;
};

const margin = 18;

export function CalloutProjector({ svgRef, modelRootRef, anchorRefs }: CalloutProjectorProps) {
  const anchors = useMemo(
    () => bodyCallouts.map((callout) => ({
      ...callout,
      worldPoint: new Vector3(),
      projected: new Vector3(),
    })),
    [],
  );
  const storyRef = useRef<HTMLElement | null>(null);
  const elementsRef = useRef<Array<{ path: SVGPathElement; dot: SVGCircleElement; leader: SVGGElement; panel: HTMLElement } | null>>([]);
  const raycasterRef = useRef(new Raycaster());
  const frameRef = useRef(0);
  const occlusionRef = useRef<Record<string, boolean>>({});

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    storyRef.current = svg.closest<HTMLElement>("#experience-story");
    elementsRef.current = anchors.map((callout) => {
      const leader = svg.querySelector<SVGGElement>(`[data-callout-leader="${callout.id}"]`);
      const path = svg.querySelector<SVGPathElement>(`[data-callout-line="${callout.id}"]`);
      const dot = svg.querySelector<SVGCircleElement>(`[data-callout-dot="${callout.id}"]`);
      const panel = storyRef.current?.querySelector<HTMLElement>(`[data-callout-panel="${callout.id}"]`);
      return path && dot && leader && panel ? { path, dot, leader, panel } : null;
    });
    return () => {
      storyRef.current = null;
      elementsRef.current = [];
    };
  }, [anchors, svgRef]);

  useFrame(({ camera, size }) => {
    const story = storyRef.current;
    const modelRoot = modelRootRef.current;
    if (!story || !modelRoot) return;

    // The scroll rig updates the camera before rendering; refresh both world
    // matrices here so every projection uses this frame's camera and model pose.
    camera.updateMatrixWorld(true);
    modelRoot.updateWorldMatrix(true, true);
    camera.updateMatrixWorld(true);
    const activeCallout = story.dataset.activeCallout;
    frameRef.current += 1;

    for (const [index, callout] of anchors.entries()) {
      const elements = elementsRef.current[index];
      if (!elements) continue;
      const { path, dot, leader, panel } = elements;
      if (activeCallout !== callout.id) {
        panel.style.visibility = "hidden";
        leader.style.visibility = "hidden";
        leader.classList.remove("is-anchor-occluded");
        continue;
      }
      panel.style.opacity = "1";
      leader.style.opacity = "1";
      path.style.strokeDashoffset = "0";

      const anchorObject = anchorRefs.current.get(callout.anchorKey);
      if (!anchorObject) continue;
      anchorObject.updateWorldMatrix(true, false);
      const worldPoint = anchorObject.getWorldPosition(callout.worldPoint);
      const projected = callout.projected.copy(worldPoint).project(camera);
      const anchorX = ((projected.x + 1) / 2) * size.width;
      const anchorY = ((1 - projected.y) / 2) * size.height;
      const onScreen = projected.z >= -1 && projected.z < 1
        && anchorX >= 0 && anchorX <= size.width
        && anchorY >= 0 && anchorY <= size.height;

      if (!onScreen) {
        leader.classList.add("is-anchor-occluded");
        panel.style.opacity = "1";
        panel.style.visibility = "visible";
        leader.style.visibility = "hidden";
        continue;
      }

      if (frameRef.current % 6 === 0) {
        const ndc = new Vector2(projected.x, projected.y);
        const raycaster = raycasterRef.current;
        raycaster.setFromCamera(ndc, camera);
        const nearest = raycaster.intersectObject(modelRoot, true)[0];
        const anchorDistance = camera.position.distanceTo(worldPoint);
        occlusionRef.current[callout.id] = Boolean(nearest && nearest.distance < anchorDistance - 0.045);
      }
      const occluded = Boolean(occlusionRef.current[callout.id]);
      leader.classList.toggle("is-anchor-occluded", occluded);
      panel.style.opacity = "1";
      panel.style.visibility = "visible";

      const panelWidth = panel.offsetWidth || Math.min(360, size.width - margin * 2);
      const panelHeight = panel.offsetHeight || 130;
      const mobile = size.width < 768;
      const panelX = mobile
        ? margin
        : Math.max(margin, Math.min(size.width - panelWidth - margin,
          callout.side === "left" ? anchorX - panelWidth - 58 : anchorX + 58));
      const panelY = mobile
        ? Math.max(86, size.height - panelHeight - 96)
        : Math.max(112, Math.min(size.height - panelHeight - 90, anchorY - panelHeight / 2));
      const dockX = mobile ? panelX + panelWidth / 2
        : callout.side === "left" ? panelX + panelWidth : panelX;
      const dockY = panelY;
      const elbowX = mobile ? anchorX : anchorX + (callout.side === "left" ? -28 : 28);

      panel.style.setProperty("--callout-x", `${panelX}px`);
      panel.style.setProperty("--callout-y", `${panelY}px`);
      panel.style.visibility = "visible";
      leader.style.visibility = "visible";
      path.setAttribute("d", `M ${anchorX} ${anchorY} L ${elbowX} ${anchorY} L ${dockX} ${dockY}`);
      dot.setAttribute("cx", String(anchorX));
      dot.setAttribute("cy", String(anchorY));
    }
  });

  return null;
}
