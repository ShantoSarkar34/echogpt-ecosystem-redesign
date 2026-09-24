import {
  Globe,
  History,
  Layers,
  MousePointerClick,
  Palette,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Zap,
    title: "Fast, focused chat",
    description:
      "A clean conversation view with instant feedback, keyboard shortcuts, and no clutter.",
  },
  {
    icon: Layers,
    title: "Switch models in one click",
    description:
      "Pick the right balance of speed and depth for each conversation.",
  },
  {
    icon: History,
    title: "History that stays organized",
    description: "Conversations are grouped by day and always one click away.",
  },
  {
    icon: MousePointerClick,
    title: "Quick actions",
    description:
      "Start common tasks like summaries, drafts, and debugging from ready-made prompts.",
  },
  {
    icon: Globe,
    title: "Page-aware extension",
    description:
      "The Chrome extension concept brings the same assistant to whatever page you're reading.",
  },
  {
    icon: Palette,
    title: "Dark and light themes",
    description:
      "Two carefully tuned themes that follow your system or your choice.",
  },
];

export const steps = [
  {
    title: "Ask or pick a quick action",
    description:
      "Type a prompt, or start from a ready-made action for common tasks.",
  },
  {
    title: "Choose the right model",
    description:
      "Go fast for everyday questions, or deeper when the problem is complex.",
  },
  {
    title: "Continue anywhere",
    description:
      "Pick up the same kind of conversation in the web app or the browser extension.",
  },
];

export const reasons = [
  {
    title: "One design system, two surfaces",
    description:
      "The web app and the extension share tokens, components, and behavior.",
  },
  {
    title: "Designed for accessibility",
    description:
      "Keyboard navigation, visible focus, and reduced-motion support throughout.",
  },
  {
    title: "Responsive from phone to widescreen",
    description:
      "Layouts adapt cleanly, including a mobile drawer and touch-friendly controls.",
  },
  {
    title: "Light by design",
    description: "A lean client-side interface with minimal dependencies.",
  },
];

export const faqs = [
  {
    question: "Is this connected to a real AI?",
    answer:
      "No. This is a frontend redesign concept, so all replies are generated locally from mock data to demonstrate the interface.",
  },
  {
    question: "Are the models real?",
    answer:
      "The model names and descriptions are representative placeholders used to show how model selection would work.",
  },
  {
    question: "Does the Chrome extension exist?",
    answer:
      "It's an interactive concept built inside this project to show how the extension could look and feel. It isn't a published extension.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. There's no sign-up or backend. Your chats live only in your browser session and reset when you refresh.",
  },
  {
    question: "Can I switch between dark and light mode?",
    answer:
      "Yes. Use the theme toggle in the navbar or the app sidebar. The default follows your setup and you can change it any time.",
  },
];
