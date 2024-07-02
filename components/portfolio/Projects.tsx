'use client';

import React from 'react';

import Project from '@/components/portfolio/Project';
import SectionHeading from '@/components/portfolio/Section-heading';
import { useSectionInView } from '@/hooks/useSectionInView';
import { projectsData } from '@/lib/data';
import { ProjectProps } from '@/types/data';

const Projects = () => {
  const { ref } = useSectionInView('Projects', 0.5);

  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-28">
      <SectionHeading>Projects</SectionHeading>
      <div>
        {projectsData.map((project: ProjectProps, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Projects;
