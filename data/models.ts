import type { AIModel, ModelId } from "@/types/chat";

export const models: AIModel[] = [
  {
    id: "echo-swift",
    name: "Echo Swift",
    tagline: "Quick answers for everyday tasks",
    badge: "Fastest",
  },
  {
    id: "echo-balanced",
    name: "Echo Balanced",
    tagline: "Great quality with steady speed",
    badge: "Default",
  },
  {
    id: "echo-deep",
    name: "Echo Deep",
    tagline: "Careful reasoning for complex work",
    badge: "Most capable",
  },
];

export const DEFAULT_MODEL_ID: ModelId = "echo-balanced";

export function getModel(id: ModelId): AIModel {
  return models.find((m) => m.id === id) ?? models[1];
}
