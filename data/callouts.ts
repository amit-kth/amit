export type CalloutId = "mind" | "heart" | "hands";

// Values are measured in the normalized target-height frame, then mounted as
// children of the fitted model group so its scale and translation also apply.
export const modelAnchors = {
  head: [0, 1.64, 0.18],
  heart: [0.07, 1.25, 0.2],
  hands: [0.02, 1.08, 0.24],
} as const;

export type AnchorKey = keyof typeof modelAnchors;

export type BodyCallout = {
  id: CalloutId;
  sceneId: "mind" | "values" | "craft";
  label: string;
  anchorKey: AnchorKey;
  side: "left" | "right";
};

export const bodyCallouts: readonly BodyCallout[] = [
  { id: "mind", sceneId: "mind", label: "Head / Mind", anchorKey: "head", side: "left" },
  { id: "heart", sceneId: "values", label: "Heart / Values", anchorKey: "heart", side: "right" },
  { id: "hands", sceneId: "craft", label: "Hands / Craft", anchorKey: "hands", side: "left" },
];
