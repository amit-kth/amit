export type CameraPose = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
};

export type ExperienceScene = CameraPose & {
  id: "intro" | "mind" | "values" | "craft" | "exit";
  label: string;
  scrollRange: [number, number];
  activeCallout: string | null;
  waypoints?: CameraPose[];
};

export const cameraScrollConfig = {
  totalScrollVh: 700,
  travelRatio: 0.35,
  holdRatio: 0.65,
  snapEnabled: false,
} as const;

export const cameraPath: readonly ExperienceScene[] = [
  {
    id: "intro",
    label: "Introduction",
    position: [-0.3, 1.45, 2.65],
    lookAt: [-0.3, 1.45, 0],
    fov: 18,
    scrollRange: [0, 0],
    activeCallout: null,
  },
  {
    id: "mind",
    label: "Mind",
    position: [-0.1, 1.62, 1.5],
    lookAt: [-0.1, 1.62, 0],
    fov: 30,
    scrollRange: [0, 0.25],
    activeCallout: "mind",
  },
  {
    id: "values",
    label: "Values",
    position: [0, 1.02, 1.72],
    lookAt: [0, 1.02, 0],
    fov: 39,
    scrollRange: [0.25, 0.5],
    activeCallout: "heart",
  },
  {
    id: "craft",
    label: "Craft",
    position: [0, 0.38, 1.47],
    lookAt: [0, 0.44, 0],
    fov: 43,
    scrollRange: [0.5, 0.75],
    activeCallout: "hands",
  },
  {
    id: "exit",
    label: "End",
    position: [0, 1.35, 2.7],
    lookAt: [0, 1.35, 0],
    fov: 18,
    scrollRange: [0.75, 1],
    activeCallout: null,
  },
];

// The GSAP scroll trigger is the only progress source; the R3F camera rig reads it each frame.
export const cameraScrollState = { progress: 0, frozenScene: -1 };
