'use client';

import React from 'react';
import Image from 'next/image';
import { useReward } from 'react-rewards';

const HeroImage = () => {
  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  return (
    <div onClick={reward} aria-disabled={isAnimating}>
      <Image
        alt="Ashfak Hossain protrait"
        src={'/_static/hero-image.webp'}
        width="192"
        height="192"
        quality="95"
        priority
        className="size-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
      />
      <span
        id="rewardId"
        // style={{ width: 1, height: 1, background: 'red' }}
        className="absolute"
      />
    </div>
  );
};

export default HeroImage;
