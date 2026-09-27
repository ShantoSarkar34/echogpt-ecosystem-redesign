import type { CompareModel } from "@/data/compare";

export interface CompareResult {
  modelId: string;
  response: string;
  responseTimeMs: number;
  tokens: number;
}

const speedByProvider: Record<string, number> = {
  EchoGPT: 700,
  OpenAI: 1200,
  Anthropic: 1000,
  Google: 900,
};

const variationsById: Record<string, string> = {
  "echo-balanced":
    "a clear, balanced answer covering the key points without extra padding.",
  "echo-fast": "a quick, to-the-point answer optimized for speed.",
  "echo-pro":
    "a more thorough answer that considers edge cases and trade-offs.",
  "gpt-5-6": "a broadly-scoped answer with a few illustrative examples.",
  "claude-sonnet": "a careful, well-reasoned answer with clear structure.",
  "gemini-pro": "an answer that draws connections across multiple angles.",
};

export function generateCompareResult(
  prompt: string,
  model: CompareModel,
): CompareResult {
  const short = prompt.length > 60 ? `${prompt.slice(0, 60)}…` : prompt;
  const variation =
    variationsById[model.id] ?? "a straightforward answer to your prompt.";
  const responseTimeMs =
    (speedByProvider[model.provider] ?? 900) + Math.round(Math.random() * 300);

  return {
    modelId: model.id,
    response: `Here's how ${model.name} would approach this: ${short} — ${variation}\n\n(Demo response. No real model was called.)`,
    responseTimeMs,
    tokens: 40 + Math.round(Math.random() * 120),
  };
}
