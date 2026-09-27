export type ImageStyle =
  | "Photorealistic"
  | "Cinematic"
  | "Illustration"
  | "3D"
  | "Anime";
export type AspectRatio = "1:1" | "16:9" | "4:3" | "9:16";
export type ImageQuality = "Standard" | "High";

export interface ImageCreation {
  id: string;
  prompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  date: string;
  /** Stands in for a real generated image — this is a frontend-only demo. */
  gradient: string;
}

export const imageStyles: ImageStyle[] = [
  "Photorealistic",
  "Cinematic",
  "Illustration",
  "3D",
  "Anime",
];
export const aspectRatios: AspectRatio[] = ["1:1", "16:9", "4:3", "9:16"];
export const imageQualities: ImageQuality[] = ["Standard", "High"];

const gradients = [
  "linear-gradient(135deg, #7c3aed, #4f46e5)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #22c55e, #4f46e5)",
  "linear-gradient(135deg, #6366f1, #ec4899)",
];

/** Only ever called from a client event handler, never during render — safe from SSR mismatches. */
export function randomGradient(): string {
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export const initialImageCreations: ImageCreation[] = [
  {
    id: "img-1",
    prompt:
      "A cinematic futuristic city at sunset, flying cars, neon reflections",
    style: "Cinematic",
    aspectRatio: "16:9",
    date: "2 days ago",
    gradient: gradients[0],
  },
  {
    id: "img-2",
    prompt: "A cozy illustrated reading nook with warm lighting and plants",
    style: "Illustration",
    aspectRatio: "4:3",
    date: "3 days ago",
    gradient: gradients[1],
  },
  {
    id: "img-3",
    prompt: "A photorealistic portrait of a golden retriever in a sunlit field",
    style: "Photorealistic",
    aspectRatio: "1:1",
    date: "5 days ago",
    gradient: gradients[2],
  },
];
