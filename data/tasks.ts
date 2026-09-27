export type TaskStatus = "Pending" | "Running" | "Completed" | "Failed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  createdDate: string;
  dueDate: string;
  model: string;
}

export const initialTasks: Task[] = [
  {
    id: "t1",
    name: "Analyze competitor landing pages",
    description: "Review 5 competitor pages and summarize positioning.",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    createdDate: "3 days ago",
    dueDate: "Today",
    model: "Echo Balanced",
  },
  {
    id: "t2",
    name: "Summarize weekly reports",
    description: "Combine team reports into one summary.",
    status: "Running",
    priority: "High",
    progress: 60,
    createdDate: "1 day ago",
    dueDate: "Tomorrow",
    model: "Echo Deep",
  },
  {
    id: "t3",
    name: "Generate social media posts",
    description: "Draft a week of posts from one topic.",
    status: "Pending",
    priority: "Low",
    progress: 0,
    createdDate: "Today",
    dueDate: "In 3 days",
    model: "Echo Fast",
  },
  {
    id: "t4",
    name: "Review product documentation",
    description: "Check docs for outdated screenshots and steps.",
    status: "Failed",
    priority: "Medium",
    progress: 40,
    createdDate: "2 days ago",
    dueDate: "Yesterday",
    model: "Echo Balanced",
  },
  {
    id: "t5",
    name: "Analyze job description",
    description: "Extract required skills from a job posting.",
    status: "Completed",
    priority: "High",
    progress: 100,
    createdDate: "4 days ago",
    dueDate: "3 days ago",
    model: "Echo Pro",
  },
  {
    id: "t6",
    name: "Build onboarding SOP",
    description: "Draft a step-by-step onboarding checklist.",
    status: "Pending",
    priority: "Medium",
    progress: 0,
    createdDate: "Today",
    dueDate: "In 5 days",
    model: "Echo Balanced",
  },
];

export const taskModels = [
  "Echo Fast",
  "Echo Balanced",
  "Echo Pro",
  "Echo Deep",
];
export const taskPriorities: TaskPriority[] = ["Low", "Medium", "High"];
