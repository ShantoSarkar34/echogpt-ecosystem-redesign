export interface JobAnalysisResult {
  role: string;
  experience: string;
  workType: string;
  location: string;
  matchScore: number;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  responsibilities: string[];
  skillGaps: string[];
  recommendations: string[];
}

export const sampleJobDescription =
  "Frontend Developer — React, Next.js, TypeScript. We're looking for a frontend developer to build and maintain our customer-facing web application. You'll work closely with design and backend teams to ship polished, accessible features.";

export const mockJobAnalysis: JobAnalysisResult = {
  role: "Frontend Developer",
  experience: "2–4 years",
  workType: "Full-time, Onsite",
  location: "Not specified",
  matchScore: 82,
  requiredSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git"],
  niceToHaveSkills: ["Node.js", "PostgreSQL", "Prisma"],
  responsibilities: [
    "Build and maintain customer-facing web features",
    "Collaborate with design on UI/UX implementation",
    "Work with backend teams to integrate APIs",
    "Write accessible, responsive, and performant code",
  ],
  skillGaps: ["Prisma", "PostgreSQL"],
  recommendations: [
    "Highlight any experience with relational databases, even informal projects",
    "Emphasize component architecture and accessibility work in your portfolio",
    "Prepare examples of collaborating across design and backend teams",
  ],
};
