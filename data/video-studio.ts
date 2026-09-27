export type VideoStyle = "Cinematic" | "Explainer" | "Social" | "Product";
export type VideoDuration = "10s" | "30s" | "60s";
export type VideoStatus = "Processing" | "Ready" | "Failed";

export interface VideoProject {
  id: string;
  title: string;
  duration: VideoDuration;
  status: VideoStatus;
  date: string;
  gradient: string;
}

export const videoStyles: VideoStyle[] = [
  "Cinematic",
  "Explainer",
  "Social",
  "Product",
];
export const videoDurations: VideoDuration[] = ["10s", "30s", "60s"];

export const initialVideoProjects: VideoProject[] = [
  {
    id: "vid-1",
    title: "Product Launch",
    duration: "30s",
    status: "Ready",
    date: "1 day ago",
    gradient: "linear-gradient(135deg, #6366f1, #7c3aed)",
  },
  {
    id: "vid-2",
    title: "Travel Story",
    duration: "60s",
    status: "Ready",
    date: "3 days ago",
    gradient: "linear-gradient(135deg, #22c55e, #4f46e5)",
  },
  {
    id: "vid-3",
    title: "Social Media Ad",
    duration: "10s",
    status: "Ready",
    date: "5 days ago",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    id: "vid-4",
    title: "AI Explainer",
    duration: "60s",
    status: "Ready",
    date: "1 week ago",
    gradient: "linear-gradient(135deg, #6366f1, #7c3aed)",
  },
];
