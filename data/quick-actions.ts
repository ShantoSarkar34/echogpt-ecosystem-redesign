export type QuickActionId =
  | "summarize"
  | "email"
  | "explain"
  | "debug"
  | "brainstorm";

export interface QuickAction {
  id: QuickActionId;
  label: string;
  description: string;
  prompt: string;
}

export const quickActions: QuickAction[] = [
  {
    id: "summarize",
    label: "Summarize text",
    description: "Turn long content into key points",
    prompt: "Summarize the following text into five key points:\n\n",
  },
  {
    id: "email",
    label: "Draft an email",
    description: "Clear, professional, ready to send",
    prompt: "Draft a polite email to my team about ",
  },
  {
    id: "explain",
    label: "Explain a concept",
    description: "Simple explanations with examples",
    prompt: "Explain this concept in simple terms with an example: ",
  },
  {
    id: "debug",
    label: "Debug code",
    description: "Find and fix issues faster",
    prompt: "Help me debug this code and explain the fix:\n\n",
  },
  {
    id: "brainstorm",
    label: "Brainstorm ideas",
    description: "Generate options to explore",
    prompt: "Brainstorm 8 creative ideas for ",
  },
];
