import React from 'react';

import Intro from '@/components/Intro';
import SectionDivider from '@/components/SectionDivider';

const page = () => {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
    </main>
  );
};

export default page;
