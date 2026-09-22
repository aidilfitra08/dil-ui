import type { ReactNode } from "react";

export interface NeoNavbarItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface NeoNavbarProps {
  brand?: ReactNode;
  items: NeoNavbarItem[];
  actions?: ReactNode;
  mobileActions?: ReactNode;
  menuLabel?: string;
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  className?: string;
}
