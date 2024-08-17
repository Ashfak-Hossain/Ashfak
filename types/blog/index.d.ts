import { LucideIcon } from 'lucide-react';

export interface SidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface FilterProps {
  name: string;
  value: string;
}

export interface Tags {
  tags: {
    value: string;
    label: string;
  }[];
}
