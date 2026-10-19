"use client";

import { useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { cameraPath, cameraScrollConfig, cameraScrollState, type CameraPose } from "@/data/camera-path";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

const mobileHeroPose: CameraPose = { position: [0, 1.52, 2.65], lookAt: [0, 1.52, 0], fov: 22 };
function poseAt(progress: number, mobile = false): CameraPose {
  const points = cameraPath;
  const segment = points.slice(1).find((scene) => progress <= scene.scrollRange[1]) ?? points[points.length - 1];
  const index = points.indexOf(segment);
  const from = mobile && index === 1 ? mobileHeroPose : points[index - 1];
  const [start, end] = segment.scrollRange;
  const t = Math.max(0, Math.min(1, (progress - start) / Math.max(0.0001, end - start)));
  const smooth = t * t * (3 - 2 * t);
  return {
    position: from.position.map((value, i) => value + (segment.position[i] - value) * smooth) as CameraPose["position"],
    lookAt: from.lookAt.map((value, i) => value + (segment.lookAt[i] - value) * smooth) as CameraPose["lookAt"],
    fov: from.fov + (segment.fov - from.fov) * smooth,
  };
}

export function CameraPathRig() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.setViewOffset(size.width, size.height, size.width < 900 ? 0 : -size.width * 0.02,
        size.width < 900 ? -size.height * 0.36 : 0, size.width, size.height);
      camera.updateProjectionMatrix();
    }
  }, [camera, size.height, size.width]);

  useLayoutEffect(() => {
    const story = document.getElementById("experience-story");
    if (!story) return;
    registerGsapPlugins();
    cameraScrollState.progress = 0;
    cameraScrollState.frozenScene = -1;
    const trigger = ScrollTrigger.create({
      trigger: story,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate: (self) => {
        cameraScrollState.progress = self.progress;
        const scenes = cameraPath.slice(1);
        const active = scenes.find(({ scrollRange: [, end] }) => self.progress <= end) ?? scenes[scenes.length - 1];
        story.dataset.activeScene = active.id;
        story.dataset.progressStage = String(active.id === "values" ? 1 : active.id === "craft" || active.id === "exit" ? 2 : 0);
        const [sceneStart, sceneEnd] = active.scrollRange;
        const holdStart = sceneStart + (sceneEnd - sceneStart) * cameraScrollConfig.travelRatio;
        story.dataset.activeCallout = self.progress >= holdStart && self.progress < sceneEnd ? active.activeCallout ?? "" : "";
        for (const panel of story.querySelectorAll<HTMLElement>("[data-scene-panel]")) {
          const isNarrative = !panel.dataset.calloutPanel;
          const showNarrative = isNarrative && panel.dataset.scenePanel === active.id;
          panel.style.visibility = showNarrative ? "visible" : "hidden";
          panel.style.opacity = showNarrative ? "1" : "0";
        }
        const sceneIndex = scenes.indexOf(active);
        const counter = document.getElementById("experience-scene-counter");
        if (counter) counter.textContent = `${String(Math.min(sceneIndex + 1, 3)).padStart(2, "0")} / 03 · ${active.label}`;
        const fill = document.getElementById("experience-progress-fill");
        if (fill) fill.style.transform = `scaleX(${self.progress})`;
      },
      onEnter: () => {
        document.body.classList.add("is-experience-active");
        document.body.classList.remove("is-experience-ended");
      },
      onEnterBack: () => {
        document.body.classList.add("is-experience-active");
        document.body.classList.remove("is-experience-ended");
      },
      onLeave: () => {
        document.body.classList.remove("is-experience-active");
        document.body.classList.add("is-experience-ended");
      },
      onLeaveBack: () => {
        document.body.classList.add("is-experience-active");
        document.body.classList.remove("is-experience-ended");
      },
    });
    const storyBounds = story.getBoundingClientRect();
    if (storyBounds.bottom > 0 && storyBounds.top < window.innerHeight) {
      document.body.classList.add("is-experience-active");
    }
    const hero = story.querySelector<HTMLElement>("#hero");
    const heroFade = hero ? gsap.to(hero, { autoAlpha: 0, y: -18, ease: "none", scrollTrigger: {
      trigger: story, start: "top top", end: () => `+=${Math.round(window.innerHeight * 0.22)}`, scrub: true,
      invalidateOnRefresh: true,
    } }) : null;
    ScrollTrigger.refresh();
    ScrollTrigger.update();
    return () => {
      heroFade?.scrollTrigger?.kill();
      heroFade?.kill();
      trigger.kill();
      cameraScrollState.frozenScene = -1;
      document.body.classList.remove("is-experience-active");
      document.body.classList.remove("is-experience-ended");
    };
  }, [camera]);

  useFrame(({ camera: activeCamera }) => {
    const mobile = size.width < 900;
    const pose = poseAt(cameraScrollState.frozenScene >= 0
      ? cameraPath[cameraScrollState.frozenScene].scrollRange[1]
      : cameraScrollState.progress, mobile);
    activeCamera.position.set(...pose.position);
    activeCamera.lookAt(...pose.lookAt);
    if (activeCamera instanceof PerspectiveCamera && activeCamera.fov !== pose.fov) {
      activeCamera.fov = pose.fov;
      activeCamera.updateProjectionMatrix();
    }
    activeCamera.updateMatrixWorld(true);
  }, -2);

  return null;
}
