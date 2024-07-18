'use client';

import React, { useEffect, useState } from 'react';
import { CircleCheckIcon } from 'lucide-react';

import { Heading } from '@/components/portfolio/ui/Heading';
import { timeline } from '@/constants/';
import { useSectionInView } from '@/hooks/useSectionInView';

import 'react-vertical-timeline-component/style.min.css';

const MobileExperience = () => {
  const { ref } = useSectionInView('Experience');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="mb-16 flex scroll-mt-28 justify-center sm:mb-40 sm:w-11/12 md:w-10/12 lg:w-full"
    >
      <div>
        <Heading as="h2" className="mb-6 text-center lg:text-3xl">
          My Experience
        </Heading>

        {timeline.map((item, index) => (
          <React.Fragment key={index}>
            <p className="mb-2 text-sm">{item.date}</p>

            <Heading
              as="h3"
              className="text-lg font-light text-emerald-500 md:text-lg lg:text-lg"
            >
              {item.company}
            </Heading>
            <Heading
              as="h4"
              className="mt-2 text-base font-semibold text-gray-900 dark:text-white/75 md:text-base lg:text-base"
            >
              {item.title}
            </Heading>
            <p className="!mt-1 mb-4 text-sm !font-normal text-gray-700 dark:text-white/70 md:text-sm lg:text-sm">
              {item.description}
            </p>
            <div className="mb-10">
              {item.responsibilities.map((responsibility, index) => (
                <Step key={index}>{responsibility}</Step>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-2 flex items-start space-x-1">
      <CircleCheckIcon className="m-1 h-3 w-4 text-gray-700 dark:text-neutral-300" />
      <p className="!mt-0 text-sm md:text-sm lg:text-sm">{children}</p>
    </div>
  );
};

export default MobileExperience;
