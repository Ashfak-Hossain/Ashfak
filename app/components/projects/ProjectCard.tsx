'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';

import { CardBody } from '@/app/components/projects/CardBody';
import { CardContainer } from '@/app/components/projects/CardContainer';
import { CardItem } from '@/app/components/projects/CardItem';
import { ProjectCardProps } from '@/types/portfolio/data';

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  githubLink,
  websiteLink,
  tools,
}) => {
  return (
    <CardContainer>
      <CardBody className="group/card relative size-auto rounded-lg border border-gray-900/[0.1] p-6 dark:border-slate-400/[0.2] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-96">
        <CardItem
          translateZ="50"
          className="text-base font-bold text-neutral-600 dark:text-white md:text-lg"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-xs text-neutral-500 dark:text-neutral-300 md:text-sm"
        >
          {description}
        </CardItem>
        <CardItem translateZ="90" className="mt-4 w-full">
          <Image
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mt-8 flex items-center justify-between">
          <CardItem translateZ={20}>
            <div className="flex w-full flex-row items-center justify-center">
              <div className="!mr-0 flex items-center !pr-0">
                {tools.map((icon, index) => (
                  <div
                    key={index}
                    className="flex size-9 items-center justify-center rounded-full border border-white/[.2] bg-gray-900"
                    style={{
                      transform: `translateX(-${8 * index + 2}px)`,
                    }}
                  >
                    <Image
                      src={`/techStack/${icon}.svg`}
                      alt="icon5"
                      className="size-6 bg-gray-900 p-[0.5]"
                      width={23}
                      height={23}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardItem>

          <CardItem
            translateZ={20}
            as={Link}
            href={githubLink}
            target="__blank"
            aria-label="Github Link"
            className="mr-1 flex items-center rounded-lg bg-gray-800 px-2 py-1 text-xs font-bold text-white dark:bg-sky-100 dark:text-black"
          >
            <GithubIcon size={25} className="px-1" />
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href={websiteLink}
            target="__blank"
            className="flex items-center rounded-lg bg-gray-800 px-2 py-1 text-xs font-bold text-white dark:bg-sky-100 dark:text-black"
          >
            View
            <ExternalLinkIcon size={25} className="px-1" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;
