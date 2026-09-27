import type { Metadata } from "next";
import { TasksView } from "@/components/dashboard/tasks-view";

export const metadata: Metadata = { title: "AI Tasks" };

export default function TasksPage() {
  return <TasksView />;
}
