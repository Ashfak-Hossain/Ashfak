import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64WithoutPrefix = base64String.split(',')[1];
      resolve(base64WithoutPrefix);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateFromNow = (date: Date): string => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};
