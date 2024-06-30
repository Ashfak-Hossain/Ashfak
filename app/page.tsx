import React from 'react';

import About from '@/components/About';
import Intro from '@/components/Intro';
import SectionDivider from '@/components/SectionDivider';

const page = () => {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
    </main>
  );
};

export default page;
