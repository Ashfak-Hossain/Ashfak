import { FC } from 'react';
import { HomePageSorting } from '@/constants/blog';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

interface HomePageSortingProps {
  activeSort?: string;
}

const HomePageSort: FC<HomePageSortingProps> = ({ activeSort }) => {
  return (
    <div className="flex items-start gap-3 pb-3">
      {HomePageSorting.map((sort) => (
        <Link
          key={sort.name}
          href={`?sort=${sort.value}&page=1`}
          className={cn(
            buttonVariants({
              variant: 'default',
            }),
            activeSort === sort.value && buttonVariants({ variant: 'neutral' })
          )}
        >
          {sort.name}
        </Link>
      ))}
    </div>
  );
};

export default HomePageSort;
