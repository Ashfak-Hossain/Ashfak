import React from 'react';

import { socialInfo } from '@/lib/socialInfo';

const Footer = () => {
  const linkedinUrl = socialInfo.linkedin.url;
  const githubUrl = socialInfo.github.url;

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; 2024 Ashfak. All rights reserved.
      </small>
      <p className="text-xs">
        This portfolio showcases my journey as a computer science student,
        developer, and competitive programmer. Explore my projects and coding
        achievements, and feel free to reach out with questions or
        opportunities. Connect with me on{' '}
        <a
          href={linkedinUrl}
          target="_blank"
          className="cursor-pointer font-semibold transition hover:text-gray-800"
        >
          {' '}
          LinkedIn
        </a>
        ,{' '}
        <a
          href={githubUrl}
          target="_blank"
          className="cursor-pointer font-semibold transition hover:text-gray-800"
        >
          {' '}
          GitHub
        </a>
        , or via{' '}
        <a
          href={`mailto:${socialInfo.email.email}`}
          target="_blank"
          className="cursor-pointer font-semibold transition hover:text-gray-800"
        >
          Email.
        </a>{' '}
        Thank you for visiting!
      </p>
    </footer>
  );
};

export default Footer;
