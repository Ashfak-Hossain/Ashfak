import React, { Dispatch } from 'react';
import { StaticImageData } from 'next/image';

import { navLinks } from '@/constants';

export type SectionName = (typeof navLinks)[number]['name'];

export interface NavLink {
  name: SectionName;
  hash: string;
}

export interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
}

export interface ActiveSectionContextProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ActiveSectionContextType {
  activeSection: SectionName;
  setActiveSection: Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: Dispatch<React.SetStateAction<number>>;
}

export interface ContactFormEmailProps {
  name: string;
  message: string;
  senderEmail: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: StaticImageData;
  githubLink: string;
  websiteLink: string;
  tools: string[];
}

export interface MeteorProps {
  number?: number;
  className?: string;
}

export interface MeteorStyle {
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export interface ResetPasswordEmailProps {
  resetLink: string;
  name: string | null;
}
