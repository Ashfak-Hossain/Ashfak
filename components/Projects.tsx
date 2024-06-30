import React from 'react';

import Project from '@/components/Project';
import SectionHeading from '@/components/Section-heading';
import { projectsData } from '@/lib/data';
import { ProjectProps } from '@/types/data';

const Projects = () => {
  return (
    <section>
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
