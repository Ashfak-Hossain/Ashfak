import { Inter, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const CalSans = localFont({
  src: [{ path: './CalSans-SemiBold.woff2' }],
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
