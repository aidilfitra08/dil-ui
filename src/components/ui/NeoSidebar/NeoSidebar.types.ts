import type { ReactNode } from "react";

export interface NeoSidebarItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface NeoSidebarProps {
  brand?: ReactNode;
  items: NeoSidebarItem[];
  bottomItems?: NeoSidebarItem[];
  footer?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}
