import React from 'react';
import Image from 'next/image';

const HeroImage = () => {
  return (
    <Image
      alt="Ashfak Hossain protrait"
      src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      width="192"
      height="192"
      quality="95"
      priority
      className="size-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl"
    />
  );
};

export default HeroImage;
