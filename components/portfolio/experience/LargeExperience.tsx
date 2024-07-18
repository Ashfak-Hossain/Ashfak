'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { CircleCheckIcon } from 'lucide-react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import { Heading } from '@/components/portfolio/ui/Heading';
import { timeline } from '@/constants';
import { useSectionInView } from '@/hooks/useSectionInView';

import 'react-vertical-timeline-component/style.min.css';

const LargeExperience = () => {
  const { ref } = useSectionInView('Experience');
  const { theme } = useTheme();

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
      className="mb-28 scroll-mt-28 sm:mb-40 sm:w-11/12 md:w-10/12 lg:w-full"
    >
      <Heading as="h2" className="mb-6 text-center lg:text-3xl">
        My Experience
      </Heading>

      <VerticalTimeline lineColor="">
        {timeline.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible
              contentStyle={{
                background:
                  theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem',
              }}
              contentArrowStyle={{
                borderRight:
                  theme === 'light'
                    ? '0.4rem solid #9ca3af'
                    : '0.4rem solid rgba(255, 255, 255, 0.5)',
              }}
              date={item.date}
              dateClassName="text-sm text-gray-700 dark:text-white/75 md:text-sm lg:text-sm m-1"
              icon={<item.icon />}
              iconStyle={{
                background: theme === 'light' ? 'white' : '#404652',
                fontSize: '1.5rem',
              }}
            >
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
              {item.responsibilities.map((responsibility, index) => (
                <Step key={index}>{responsibility}</Step>
              ))}
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
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

export default LargeExperience;
