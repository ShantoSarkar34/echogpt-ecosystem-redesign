import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  plannedSections: string[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}