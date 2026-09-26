import type { ModelId } from "@/types/chat";
import type { ResponseStyle } from "@/types/settings";

export const REPLY_DELAY_MS: Record<ModelId, number> = {
  "echo-swift": 900,
  "echo-balanced": 1500,
  "echo-deep": 2300,
};

export function generateMockReply(
  prompt: string,
  modelId: ModelId,
  style: ResponseStyle = "balanced",
  pageContext?: { title: string; highlight: string },
): string {
  const p = prompt.toLowerCase();
  let reply: string;

  if (/(this page|the page|selected text)/.test(p)) {
    const title = pageContext?.title ?? "this page";
    const highlight = pageContext?.highlight ?? "the highlighted passage";

    if (/(explain|selected)/.test(p)) {
      reply = `In plain terms: ${highlight[0].toLowerCase()}${highlight.slice(1)}`;
    } else if (/(reply|draft)/.test(p)) {
      reply = `Here's a short reply you could send:\n\nHi, thanks for "${title}". The point that stood out to me was: "${highlight}". Do you have advice for putting this into practice?\n\nBest,\n[Your name]`;
    } else {
      reply = `Based on "${title}":\n\n• ${highlight}\n• Shared decisions save time.\n• Small teams benefit the most.\n• Worth revisiting as the page updates.`;
    }
  } else if (/(summar|tl;dr|key points)/.test(p)) {
    reply =
      "Here's a concise summary:\n\n• The main goal is stated up front.\n• Two supporting points explain the reasoning.\n• One risk stands out and needs a decision.\n• The recommended next step is clear and low effort.\n\nPaste the full text and I'll tailor this to it.";
  } else if (/(email|draft|write to|message)/.test(p)) {
    reply =
      "Here's a draft you can adjust:\n\nSubject: Quick update\n\nHi team,\n\nI wanted to share a short update and the next steps. Please review the details and reply with any questions by end of week.\n\nThanks,\n[Your name]";
  } else if (/(bug|debug|error|code|function|react|typescript)/.test(p)) {
    reply =
      "Let's narrow it down:\n\n1. Reproduce the issue with the smallest possible input.\n2. Check the value at each step (a quick log helps).\n3. Compare what you expected with what you got.\n\nShare the code and the exact error message and I'll point to the likely cause.";
  } else if (/(explain|what is|how does|why)/.test(p)) {
    reply =
      "Think of it as a simple system with three parts: an input, a rule that transforms it, and an output. Once you see those, the details are easier to place.\n\nWant a concrete example or a deeper walkthrough?";
  } else if (/(idea|brainstorm|plan|suggest)/.test(p)) {
    reply =
      "Here are a few directions to explore:\n\n• Start with the smallest version that proves the idea.\n• Borrow a pattern that already works elsewhere.\n• Design for the most common case first.\n• Add one delightful detail people will remember.\n\nTell me your constraints and I'll narrow these down.";
  } else {
    reply =
      "Happy to help with that. Tell me a bit more about your goal and any constraints, and I'll suggest a clear approach.";
  }

  if (modelId === "echo-deep") {
    reply +=
      "\n\nI also weighed a couple of alternatives before settling on this.";
  }

  const opener =
    style === "concise"
      ? "Short answer:\n\n"
      : style === "detailed"
        ? "Here's a detailed take:\n\n"
        : "";
  const closer =
    style === "detailed"
      ? "\n\nI can expand on any part, add examples, or adapt this to your situation."
      : "";

  return `${opener}${reply}${closer}\n\n(Demo response. No real AI model is connected.)`;
}
