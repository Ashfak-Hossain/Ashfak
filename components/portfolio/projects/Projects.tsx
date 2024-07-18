'use client';

import React from 'react';

import ProjectCard from '@/components/portfolio/projects/ProjectCard';
import { Heading } from '@/components/portfolio/ui/Heading';
import { ProjectsData } from '@/constants';
import { MouseEnterProvider } from '@/context/MouseEnterContext';
import { useSectionInView } from '@/hooks/useSectionInView';

const Projects = () => {
  const { ref } = useSectionInView('Projects', 0.5);
  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-28">
      <Heading as="h2" className="mb-14 flex justify-center lg:text-3xl">
        Projects
      </Heading>

      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
        {ProjectsData.map((project, index) => (
          <MouseEnterProvider key={index}>
            <ProjectCard
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              githubLink={project.githubLink}
              websiteLink={project.websiteLink}
              tools={project.tools}
            />
          </MouseEnterProvider>
        ))}
      </div>
    </section>
  );
};

export default Projects;
