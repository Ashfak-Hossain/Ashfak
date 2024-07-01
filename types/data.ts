import React, { Dispatch } from 'react';
import { StaticImageData } from 'next/image';

import { links } from '@/lib/data';

export type SectionName = (typeof links)[number]['name'];

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

export interface ActiveSectionContextType {
  activeSection: SectionName;
  setActiveSection: Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: Dispatch<React.SetStateAction<number>>;
}

export interface ContactFormEmailProps {
  message: string;
  senderEmail: string;
}
