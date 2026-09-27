export interface CompareModel {
  id: string;
  name: string;
  provider: string;
  capability: string;
}

export const compareModels: CompareModel[] = [
  {
    id: "echo-balanced",
    name: "Echo Balanced",
    provider: "EchoGPT",
    capability: "General purpose",
  },
  {
    id: "echo-fast",
    name: "Echo Fast",
    provider: "EchoGPT",
    capability: "Fast responses",
  },
  {
    id: "echo-pro",
    name: "Echo Pro",
    provider: "EchoGPT",
    capability: "Advanced reasoning",
  },
  {
    id: "gpt-5-6",
    name: "GPT-5.6",
    provider: "OpenAI",
    capability: "General purpose",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "Anthropic",
    capability: "Balanced reasoning",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    capability: "Multimodal",
  },
];

export const defaultCompareSelection = ["echo-balanced", "echo-pro"];
