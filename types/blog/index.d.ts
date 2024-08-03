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

export interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}
