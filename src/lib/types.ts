// types.ts
import { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  label: string;
  link: string;
}

export interface NavItem {
  icon: LucideIcon;
  label: string;
  link: string;
  subMenu: SubMenuItem[];
}

export interface SidebarHeaderProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export interface SidebarFooterProps {
  isExpanded: boolean;
}

export interface SidebarLinksProps {
  isExpanded: boolean;
}
