import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '@/hooks/useActiveSectionContext';
import { SectionName } from '@/types/portfolio/data';

export const useSectionInView = (
  sectionName: SectionName,
  threshold = 0.75
) => {
  const { ref, inView } = useInView({ threshold });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/blog' && Date.now() - timeOfLastClick > 1000) {
      const hash = `#${sectionName.toLowerCase()}`;
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash);
      }
    }
  }, [pathname, inView, sectionName, timeOfLastClick]);

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return { ref };
};
