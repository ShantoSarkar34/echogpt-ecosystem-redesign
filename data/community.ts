export interface CommunityCategory {
  section: "General" | "AI" | "Community";
  name: string;
}

export const communityCategories: CommunityCategory[] = [
  { section: "General", name: "General Chat" },
  { section: "General", name: "Introductions" },
  { section: "General", name: "Feedback" },
  { section: "AI", name: "AI Discussions" },
  { section: "AI", name: "Prompt Engineering" },
  { section: "AI", name: "AI News" },
  { section: "Community", name: "Projects" },
  { section: "Community", name: "Showcase" },
  { section: "Community", name: "Events" },
];

export const recentActivity = [
  "Welcome to the EchoGPT community!",
  "Share your favorite AI workflow",
  "What AI model are you using?",
];

export const communityStats = { members: "48,200", online: "3,150" };
