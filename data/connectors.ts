import {
  Box,
  Calendar,
  FileText,
  HardDrive,
  Mail,
  MessageCircle,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";

export type ConnectorCategory =
  | "Productivity"
  | "Communication"
  | "Developer"
  | "Storage";

export interface Connector {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon | IconType;
  category: ConnectorCategory;
  connected: boolean;
}

export const initialConnectors: Connector[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Access and search your files.",
    icon: HardDrive,
    category: "Storage",
    connected: true,
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Draft and summarize emails.",
    icon: Mail,
    category: "Communication",
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get summaries from your channels.",
    icon: MessagesSquare,
    category: "Communication",
    connected: true,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Search and update your docs.",
    icon: FileText,
    category: "Productivity",
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Review issues and pull requests.",
    icon: FaGithub,
    category: "Developer",
    connected: false,
  },
  {
    id: "discord",
    name: "Discord",
    description: "Post updates to your community.",
    icon: MessageCircle,
    category: "Communication",
    connected: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Check your schedule.",
    icon: Calendar,
    category: "Productivity",
    connected: false,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Access files stored in Dropbox.",
    icon: Box,
    category: "Storage",
    connected: false,
  },
];

export const connectorCategories = [
  "All",
  "Productivity",
  "Communication",
  "Developer",
  "Storage",
] as const;
