'use client';

import React from 'react';

import { Portfolio } from '@/components/Portfolio';
import TracingBeam from '@/components/ui/TracingBeam';
import useMediaQuery from '@/hooks/useMediaQuery';

const Page = () => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  isLargeScreen ? (
    <Portfolio />
  ) : (
    <TracingBeam>
      <Portfolio />
    </TracingBeam>
  );
};

export default Page;
