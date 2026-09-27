import {
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  Cpu,
  GitCompare,
  History,
  Image as ImageIcon,
  ListTodo,
  Mail,
  MessageCircle,
  CircleHelp,
  Plug,
  ShoppingBag,
  Video,
} from "lucide-react";
import type { NavItem, NavSection } from "@/types/nav";

export const navSections: NavSection[] = [
  {
    label: "Engagement",
    items: [
      {
        href: "/app/image-studio",
        label: "Image Studio",
        icon: ImageIcon,
        description: "Create high-quality visuals from simple prompts.",
        plannedSections: [
          "Prompt input with style, aspect ratio, and quality controls",
          "Generate button with a loading state",
          "Recent creations gallery",
          "Reuse-prompt and download actions",
        ],
      },
      {
        href: "/app/video-studio",
        label: "Video Studio",
        icon: Video,
        description: "Turn ideas and scripts into engaging AI-powered videos.",
        plannedSections: [
          "Script input with style, duration, and voice controls",
          "Processing → Ready progress flow",
          "Demo project gallery (Product Launch, Travel Story, and more)",
        ],
      },
      {
        href: "/app/compare",
        label: "Compare",
        icon: GitCompare,
        description: "Compare responses from multiple AI models side by side.",
        plannedSections: [
          "One prompt, up to 4 models at once",
          "Side-by-side response, speed, and usage cards",
          "Responsive stacked layout on mobile",
        ],
      },
      {
        href: "/app/connectors",
        label: "Connectors",
        icon: Plug,
        description: "Connect EchoGPT with the tools you use every day.",
        plannedSections: [
          "Integration cards for Drive, Slack, Notion, GitHub, and more",
          "Connect / Disconnect demo flow",
          "Search and category filters",
        ],
      },
      {
        href: "/app/history",
        label: "History",
        icon: History,
        description: "Browse everything you've created across EchoGPT.",
        plannedSections: [
          "Filter by chats, images, videos, and tasks",
          "Search and date filtering",
          "Rename and delete with confirmation",
        ],
      },
      {
        href: "/app/store",
        label: "Store",
        icon: ShoppingBag,
        description: "Discover AI tools, templates, prompts, and workflows.",
        plannedSections: [
          "Browsable product cards with ratings and usage counts",
          "Category filters and a featured section",
        ],
      },
      {
        href: "/app/tasks",
        label: "AI Tasks",
        icon: ListTodo,
        description: "Create and manage tasks powered by EchoGPT.",
        plannedSections: [
          "Task stats: total, in progress, completed, failed",
          "Create Task modal with priority and model selection",
          "Mock task processing",
        ],
      },
      {
        href: "/app/job-analysis",
        label: "AI Job Analysis",
        icon: BriefcaseBusiness,
        description:
          "Analyze job descriptions and understand what employers are looking for.",
        plannedSections: [
          "Paste a job description for a mock analysis",
          "Match score, required and nice-to-have skills",
          "Skill gaps and recommendations",
        ],
      },
      {
        href: "/app/sop-builder",
        label: "AI SOP Builder",
        icon: ClipboardList,
        description:
          "Create clear, structured standard operating procedures with AI.",
        plannedSections: [
          "Guided form: objective, audience, tone, steps",
          "Generated SOP with a quality checklist",
          "Edit, copy, and export actions",
        ],
      },
    ],
  },
  {
    label: "Help & Support",
    items: [
      {
        href: "/app/support",
        label: "Support",
        icon: CircleHelp,
        description: "Find answers, guides, and ways to reach the team.",
        plannedSections: [
          "Searchable FAQ across several categories",
          "Contact support and ticket submission",
        ],
      },
      {
        href: "/app/newsletter",
        label: "Newsletter",
        icon: Mail,
        description:
          "Get the latest AI tools, product updates, and productivity tips.",
        plannedSections: [
          "Email subscribe with validation",
          "Recent newsletter issues",
        ],
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        href: "/app/subscriptions",
        label: "Subscriptions",
        icon: CreditCard,
        description: "Manage your plan, billing, and included features.",
        plannedSections: [
          "Monthly, quarterly, half-yearly, and annual plans",
          "Current plan indicator",
          "Demo subscribe confirmation flow",
        ],
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        href: "/app/platform",
        label: "AI Platform",
        icon: Cpu,
        description: "Explore the models and AI capabilities powering EchoGPT.",
        plannedSections: [
          "Model catalog with capability and speed indicators",
          "Search and filter by provider",
        ],
      },
      {
        href: "/app/discord",
        label: "Discord",
        icon: MessageCircle,
        description:
          "Join the EchoGPT community and connect with other AI enthusiasts.",
        plannedSections: [
          "Community stats and categories",
          "Recent activity feed",
        ],
      },
    ],
  },
];

export const allNavItems: NavItem[] = navSections.flatMap((s) => s.items);

export function getNavItem(href: string): NavItem {
  const item = allNavItems.find((i) => i.href === href);
  if (!item) throw new Error(`No nav item registered for ${href}`);
  return item;
}

/** Static titles for routes that aren't in the sidebar nav (e.g. Settings). */
export const extraRouteTitles: Record<string, string> = {
  "/app/settings": "Settings",
};
