import {
  Album,
  BrainCircuit,
  House,
  Infinity,
  Network,
  NotebookPen,
} from 'lucide-react';

import { SidebarLink } from '@/types/blog';

export const sidebarLinks: SidebarLink[] = [
  {
    href: '/blog',
    label: 'Home',
    icon: House,
  },
  {
    label: 'Data Structures',
    icon: Network,
  },
  {
    label: 'Algorithms',
    icon: BrainCircuit,
  },
  {
    label: 'Competitive Programming',
    icon: Infinity,
  },
  {
    label: 'Topics',
    icon: NotebookPen,
  },
  {
    label: 'Reading List',
    icon: Album,
  },
];
