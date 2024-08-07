'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Button
      className="fixed bottom-5 right-5 flex size-12 items-center justify-center rounded-full backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      variant="default"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
};

export default ModeToggle;
