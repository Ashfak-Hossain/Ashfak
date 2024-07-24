import { Metadata } from 'next';

import { Portfolio } from '@/components/portfolio/Portfolio';

export const metadata: Metadata = {
  title: 'Ashfak Hossain - Software Engineer',
  description:
    'The personal website of Ashfak Hossain, a software engineer with an insatiable thirst for knowledge and a boundless eagerness to learn!',
};

const Page = () => {
  return (
    <main className="pt-24 sm:pt-36">
      <Portfolio />
    </main>
  );
};

export default Page;
