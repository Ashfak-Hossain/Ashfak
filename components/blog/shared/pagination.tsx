import { FC } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlProps {
  page?: string;
  totalPages: number;
  hasNextPage: boolean;
  currentSort?: string;
}

const PaginationControl: FC<PaginationControlProps> = ({
  page = 1,
  totalPages,
  hasNextPage,
  currentSort = '',
}) => {
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  const maxPageNumbersToShow = 5;

  const getPageNumbers = () => {
    if (totalPages <= maxPageNumbersToShow) {
      return [...Array(totalPages)].map((_, index) => index + 1);
    }
    const pages = [];

    pages.push(1);

    let startPage = Math.max(currentPage - 2, 2);
    let endPage = Math.min(currentPage + 2, totalPages - 1);

    if (currentPage <= 3) {
      startPage = 2;
      endPage = maxPageNumbersToShow - 1;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxPageNumbersToShow + 2;
      endPage = totalPages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${currentPage - 1}&sort=${currentSort}`}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((pageNum, index) => (
          <PaginationItem key={pageNum}>
            {index === 1 && pageNum > 2 && <PaginationEllipsis />}
            <PaginationLink
              isActive={pageNum === currentPage}
              href={`?sort=${currentSort}&page=${pageNum}`}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {hasNextPage && currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`?sort=${currentSort}&page=${currentPage + 1}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;
