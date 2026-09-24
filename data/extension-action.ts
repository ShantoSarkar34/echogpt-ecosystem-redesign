import {
  FileText,
  Lightbulb,
  ListChecks,
  Mail,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface ExtensionAction {
  id: string;
  label: string;
  prompt: string;
  icon: LucideIcon;
}

/** Shown when page context is ON. */
export const pageActions: ExtensionAction[] = [
  {
    id: "summarize-page",
    label: "Summarize this page",
    prompt: "Summarize this page in five bullet points.",
    icon: FileText,
  },
  {
    id: "takeaways",
    label: "Key takeaways",
    prompt: "List the key takeaways from this page.",
    icon: ListChecks,
  },
  {
    id: "explain-selection",
    label: "Explain selected text",
    prompt: "Explain the selected text from this page in simple terms.",
    icon: Lightbulb,
  },
  {
    id: "reply",
    label: "Draft a reply",
    prompt: "Draft a short reply to this page's author.",
    icon: PenLine,
  },
];

/** Shown when page context is OFF. */
export const generalActions: ExtensionAction[] = [
  {
    id: "summarize",
    label: "Summarize text",
    prompt: "Summarize the following text into five key points:\n\n",
    icon: FileText,
  },
  {
    id: "email",
    label: "Draft an email",
    prompt: "Draft a polite email to my team about the project update.",
    icon: Mail,
  },
  {
    id: "explain",
    label: "Explain a concept",
    prompt: "Explain how caching works in simple terms.",
    icon: Sparkles,
  },
  {
    id: "brainstorm",
    label: "Brainstorm ideas",
    prompt: "Brainstorm 8 creative ideas for a weekend side project.",
    icon: Lightbulb,
  },
];
