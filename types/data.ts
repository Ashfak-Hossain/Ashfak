import { StaticImageData } from 'next/image';

export interface NavLink {
  name: string;
  hash: string;
}

export interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
}
