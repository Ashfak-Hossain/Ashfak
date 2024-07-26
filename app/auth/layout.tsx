import React from 'react';

import ShootingStars from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
      <ShootingStars className="-z-50" />
      <StarsBackground className="-z-50" />
    </div>
  );
}
