export type HistoryType = "Chat" | "Image" | "Video" | "Task";

export interface HistoryItem {
  id: string;
  type: HistoryType;
  title: string;
  preview: string;
  date: string;
  tool: string;
}

export const initialHistoryItems: HistoryItem[] = [
  {
    id: "h1",
    type: "Chat",
    title: "Landing page copy for a SaaS launch",
    preview: "Write a punchy hero headline for an AI productivity tool.",
    date: "Today",
    tool: "Echo Balanced",
  },
  {
    id: "h2",
    type: "Chat",
    title: "Debounce vs throttle in React",
    preview: "When should I use debounce instead of throttle?",
    date: "Today",
    tool: "Echo Swift",
  },
  {
    id: "h3",
    type: "Chat",
    title: "Summarize quarterly report",
    preview: "Summarize the report and list the top risks.",
    date: "Yesterday",
    tool: "Echo Deep",
  },
  {
    id: "h4",
    type: "Image",
    title: "AI generated product image",
    preview: "A minimalist product shot on a marble surface.",
    date: "2 days ago",
    tool: "Image Studio",
  },
  {
    id: "h5",
    type: "Video",
    title: "Product launch video",
    preview: "30-second teaser for a new app.",
    date: "3 days ago",
    tool: "Video Studio",
  },
  {
    id: "h6",
    type: "Task",
    title: "Job description analysis",
    preview: "Analyzed a Frontend Developer job posting.",
    date: "4 days ago",
    tool: "AI Job Analysis",
  },
  {
    id: "h7",
    type: "Task",
    title: "SOP generation",
    preview: "How to Review and Publish a New Blog Post.",
    date: "5 days ago",
    tool: "AI SOP Builder",
  },
];
