export type StoreCategory =
  | "AI Tools"
  | "Templates"
  | "Prompts"
  | "Workflows"
  | "Plugins";

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  category: StoreCategory;
  rating: number;
  usageCount: string;
  tier: "Free" | "Premium";
  featured?: boolean;
}

export const storeCategories: ("All" | StoreCategory)[] = [
  "All",
  "AI Tools",
  "Templates",
  "Prompts",
  "Workflows",
  "Plugins",
];

export const storeProducts: StoreProduct[] = [
  {
    id: "p1",
    name: "Marketing Copy Pro",
    description: "Generate on-brand marketing copy in seconds.",
    category: "AI Tools",
    rating: 4.8,
    usageCount: "12k+ uses",
    tier: "Premium",
    featured: true,
  },
  {
    id: "p2",
    name: "SEO Content Builder",
    description: "Structured, SEO-friendly articles from an outline.",
    category: "Templates",
    rating: 4.6,
    usageCount: "8k+ uses",
    tier: "Premium",
  },
  {
    id: "p3",
    name: "Resume Optimizer",
    description: "Tailor a resume to a specific job description.",
    category: "AI Tools",
    rating: 4.7,
    usageCount: "20k+ uses",
    tier: "Free",
    featured: true,
  },
  {
    id: "p4",
    name: "Social Media Generator",
    description: "A week of social posts from one topic.",
    category: "Workflows",
    rating: 4.5,
    usageCount: "15k+ uses",
    tier: "Free",
  },
  {
    id: "p5",
    name: "Product Description Writer",
    description: "Punchy, consistent product descriptions at scale.",
    category: "Prompts",
    rating: 4.4,
    usageCount: "6k+ uses",
    tier: "Premium",
  },
  {
    id: "p6",
    name: "Meeting Notes Assistant",
    description: "Turn rough notes into clear action items.",
    category: "Plugins",
    rating: 4.9,
    usageCount: "25k+ uses",
    tier: "Free",
    featured: true,
  },
];
