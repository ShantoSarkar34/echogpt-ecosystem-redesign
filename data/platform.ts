export interface PlatformModel {
  id: string;
  name: string;
  provider: string;
  category: string;
  contextSize: string;
  speed: number;
  intelligence: number;
  useCases: string[];
}

export const platformModels: PlatformModel[] = [
  {
    id: "echo-balanced",
    name: "Echo Balanced",
    provider: "EchoGPT",
    category: "General purpose",
    contextSize: "128k tokens",
    speed: 2,
    intelligence: 2,
    useCases: ["Everyday chat", "Writing", "Research"],
  },
  {
    id: "echo-fast",
    name: "Echo Fast",
    provider: "EchoGPT",
    category: "Everyday tasks",
    contextSize: "32k tokens",
    speed: 3,
    intelligence: 1,
    useCases: ["Quick answers", "Drafts"],
  },
  {
    id: "echo-pro",
    name: "Echo Pro",
    provider: "EchoGPT",
    category: "Advanced reasoning",
    contextSize: "200k tokens",
    speed: 1,
    intelligence: 3,
    useCases: ["Complex analysis", "Code review"],
  },
  {
    id: "gpt-5-6",
    name: "GPT-5.6",
    provider: "OpenAI",
    category: "General purpose",
    contextSize: "128k tokens",
    speed: 2,
    intelligence: 3,
    useCases: ["General tasks", "Coding"],
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "Anthropic",
    category: "Balanced reasoning",
    contextSize: "200k tokens",
    speed: 2,
    intelligence: 3,
    useCases: ["Writing", "Analysis"],
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    category: "Multimodal",
    contextSize: "1M tokens",
    speed: 2,
    intelligence: 2,
    useCases: ["Long documents", "Multimodal tasks"],
  },
];

export const platformProviders = [
  "All",
  "EchoGPT",
  "OpenAI",
  "Anthropic",
  "Google",
] as const;
