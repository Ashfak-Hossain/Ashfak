'use client';

import React from 'react';

import LargeExperience from '@/app/components/experience/LargeExperience';
import MobileExperience from '@/app/components/experience/MobileExperience';
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
