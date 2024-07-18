import React from 'react';

import { Heading } from '@/components/portfolio/ui/Heading';
import { Paragraph } from '@/components/portfolio/ui/Paragraph';

const HeroText = () => {
  return (
    <div className="mb-10 mt-4 px-4 leading-normal">
      <Heading className="font-black">Hi, I'm Ashfak Hossain</Heading>
      <Paragraph className="mx-auto mt-4 max-w-xl">
        Passionate about Competitive Programming, Obsessed with Web3! Embracing
        the thrill of algorithms and the innovation of decentralized tech.
      </Paragraph>
    </div>
  );
};

export default HeroText;
