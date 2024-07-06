import React from 'react';
import Image from 'next/image';

const HeroImage = () => {
  return (
    <Image
      alt="Ashfak Hossain protrait"
      src={'/_static/hero-image.jpg'}
      width="192"
      height="192"
      quality="95"
      priority
      className="size-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
    />
  );
};

export default HeroImage;
