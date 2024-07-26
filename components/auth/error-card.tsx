import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import { CardWrapper } from '@/components/auth/card-wrapper';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
