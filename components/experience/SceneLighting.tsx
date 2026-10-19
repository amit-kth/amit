"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AmbientLight, Color, DirectionalLight, PointLight } from "three";

const lightingByScene = {
  intro: { key: "#fffbe8", rim: "#d8f4a0", keyPower: 3.1, rimPower: 2.05, heartPower: 0 },
  mind: { key: "#f5ffe8", rim: "#c8ef72", keyPower: 3.2, rimPower: 2.15, heartPower: 0 },
  orbit: { key: "#f5ffe8", rim: "#d5edaa", keyPower: 3.1, rimPower: 2.1, heartPower: 0 },
  values: { key: "#fff6e9", rim: "#f1c49b", keyPower: 3, rimPower: 2, heartPower: 0.18 },
  craft: { key: "#f5ffe8", rim: "#bfe8bf", keyPower: 3.15, rimPower: 2, heartPower: 0 },
  exit: { key: "#fffbe8", rim: "#d8f4a0", keyPower: 3.1, rimPower: 2.05, heartPower: 0 },
} as const;

type SceneId = keyof typeof lightingByScene;

export function SceneLighting() {
  const keyLight = useRef<DirectionalLight>(null);
  const rimLight = useRef<DirectionalLight>(null);
  const ambientLight = useRef<AmbientLight>(null);
  const heartLight = useRef<PointLight>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const colors = useMemo(() => ({
    key: new Color(lightingByScene.intro.key),
    rim: new Color(lightingByScene.intro.rim),
  }), []);
  const activeSceneRef = useRef<SceneId>("intro");

  useEffect(() => {
    storyRef.current = document.getElementById("experience-story");
    return () => { storyRef.current = null; };
  }, []);

  useFrame(({ clock }, delta) => {
    const sceneId = storyRef.current?.dataset.activeScene as SceneId | undefined;
    const nextScene = sceneId && sceneId in lightingByScene ? sceneId : "intro";
    if (activeSceneRef.current !== nextScene) {
      activeSceneRef.current = nextScene;
      colors.key.set(lightingByScene[nextScene].key);
      colors.rim.set(lightingByScene[nextScene].rim);
    }
    const target = lightingByScene[activeSceneRef.current];
    const blend = 1 - Math.exp(-delta * 2.8);
    if (keyLight.current) {
      keyLight.current.color.lerp(colors.key, blend);
      keyLight.current.intensity += (target.keyPower - keyLight.current.intensity) * blend;
    }
    if (rimLight.current) {
      rimLight.current.color.lerp(colors.rim, blend);
      rimLight.current.intensity += (target.rimPower - rimLight.current.intensity) * blend;
    }
    if (ambientLight.current) {
      const ambientTarget = activeSceneRef.current === "mind" ? 1.3 : 1.4;
      ambientLight.current.intensity += (ambientTarget - ambientLight.current.intensity) * blend;
    }
    if (heartLight.current) {
      const pulse = activeSceneRef.current === "values" ? 1 + Math.sin(clock.elapsedTime * 2.2) * 0.12 : 0;
      heartLight.current.intensity += (target.heartPower * pulse - heartLight.current.intensity) * blend;
    }
  });

  return (
    <>
      <hemisphereLight args={["#fffdf0", "#b2c994", 1.55]} />
      <ambientLight ref={ambientLight} intensity={1.4} />
      <directionalLight ref={keyLight} position={[-2.8, 3.6, 3.5]} intensity={3.1} color="#fffbe8" />
      <directionalLight ref={rimLight} position={[2.5, 1.4, -2.6]} intensity={2.05} color="#d8f4a0" />
      <pointLight ref={heartLight} position={[0, 1.02, 0.36]} color="#f1b68c" intensity={0} distance={1.1} decay={2} />
    </>
  );
}
