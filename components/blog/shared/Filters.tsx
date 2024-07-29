'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { HomePagegFilters } from '@/constants/blog';
import { cn } from '@/lib/utils';

const HomePageFilters = () => {
  const active = 'favored';

  return (
    <div className="flex items-start gap-3 pb-3">
      {HomePagegFilters.map((filter) => {
        return (
          <Button
            key={filter.value}
            className={cn(
              'rounded-lg px-6 py-3 capitalize',
              active === filter.value && 'bg-secondary text-base font-semibold'
            )}
            onClick={() => {}}
            variant="outline"
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomePageFilters;
