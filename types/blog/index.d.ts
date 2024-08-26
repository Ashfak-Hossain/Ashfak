import { LucideIcon } from 'lucide-react';

export interface SidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface SortProps {
  name: string;
  value: string;
}

export interface Tags {
  tags: {
    value: string;
    label: string;
  }[];
}

export interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { [key: string]: string | string[] | undefined };
}

export interface CommentModel {
  commentLikes: any[];
  id: string;
  message: string;
  userId: string;
  blogId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: { name: string | null; image: string | null; id: string };
  children: CommentModel[];
}
