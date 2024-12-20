'use client';

import React from 'react';

import LargeExperience from '@/components/portfolio/experience/LargeExperience';
import MobileExperience from '@/components/portfolio/experience/MobileExperience';
import useMediaQuery from '@/hooks/useMediaQuery';

const Experience = () => {
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  return (
    <React.Fragment>
      {isLargeScreen ? <LargeExperience /> : <MobileExperience />}
    </React.Fragment>
  );
};

export default Experience;
