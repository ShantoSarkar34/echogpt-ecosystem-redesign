export interface SopResult {
  title: string;
  objective: string;
  scope: string;
  tools: string[];
  steps: string[];
  notes: string;
  checklist: string[];
}

export const mockSop: SopResult = {
  title: "How to Review and Publish a New Blog Post",
  objective:
    "Ensure every blog post meets quality, SEO, and brand standards before it goes live.",
  scope: "Applies to all blog posts published on the company website.",
  tools: ["CMS admin panel", "SEO checklist", "Style guide"],
  steps: [
    "Review content for clarity, tone, and accuracy",
    "Check SEO metadata (title, description, slug)",
    "Verify all images have alt text and load correctly",
    "Check that all links work and open as intended",
    "Review formatting against the style guide",
    "Publish the post",
    "Verify the live page renders correctly on desktop and mobile",
  ],
  notes: "Escalate to the content lead if a post fails any check twice.",
  checklist: [
    "Content reviewed",
    "SEO metadata checked",
    "Images verified",
    "Links checked",
    "Live page verified",
  ],
};

export const sopTones = ["Formal", "Friendly", "Technical", "Concise"] as const;
export const sopDepartments = [
  "Marketing",
  "Engineering",
  "Support",
  "Operations",
  "HR",
] as const;
