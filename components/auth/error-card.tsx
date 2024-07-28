import React from 'react';
import { TriangleAlert } from 'lucide-react';

import { CardWrapper } from '@/components/auth/card-wrapper';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <TriangleAlert className="text-rose-600" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
