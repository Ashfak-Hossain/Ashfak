import {
  Album,
  BrainCircuit,
  House,
  InfinityIcon,
  LayoutDashboard,
  Network,
  NotebookPen,
  PencilLine,
  Signature,
  Users,
} from 'lucide-react';

import { SortProps, SidebarLink } from '@/types/blog';

export const sidebarLinks: SidebarLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/blogs',
    label: 'Blogs',
    icon: PencilLine,
  },
  {
    href: '/dashboard/users',
    label: 'Users',
    icon: Users,
  },
  {
    href: '/blog',
    label: 'Home',
    icon: House,
  },
  {
    href: '/blog/data-structures',
    label: 'Data Structures',
    icon: Network,
  },
  {
    href: '/blog/algorithms',
    label: 'Algorithms',
    icon: BrainCircuit,
  },
  {
    href: '/blog/competitive-programming',
    label: 'Competitive Programming',
    icon: InfinityIcon as any,
  },
  {
    href: '/blog/topics',
    label: 'Topics',
    icon: NotebookPen,
  },
  {
    href: '/blog/reading-list',
    label: 'Reading List',
    icon: Album,
  },
  {
    href: '/about',
    label: 'About',
    icon: Signature,
  },
];

export const HomePageSorting: SortProps[] = [
  {
    name: 'Latest',
    value: 'latest',
  },
  {
    name: 'Popular',
    value: 'popular',
  },
];
