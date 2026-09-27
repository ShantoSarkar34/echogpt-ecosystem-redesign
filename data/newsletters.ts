export interface Newsletter {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
}

export const newsletters: Newsletter[] = [
  {
    id: "n1",
    category: "Productivity",
    title: "10 AI workflows that save hours every week",
    date: "3 days ago",
    description: "Practical automations you can set up in an afternoon.",
  },
  {
    id: "n2",
    category: "Product",
    title: "What's new in EchoGPT",
    date: "1 week ago",
    description: "Recent additions across the web app and extension.",
  },
  {
    id: "n3",
    category: "AI Models",
    title: "The latest AI models explained",
    date: "2 weeks ago",
    description: "A plain-language look at what's changed recently.",
  },
  {
    id: "n4",
    category: "Guides",
    title: "Building better AI workflows",
    date: "3 weeks ago",
    description: "Patterns for chaining prompts into repeatable processes.",
  },
];
