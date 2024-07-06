import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 md:px-10">{children}</main>
  );
};
