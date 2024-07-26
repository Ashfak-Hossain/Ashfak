import React from 'react';

import { auth } from '@/auth';
import UserButton from '@/components/blog/navbar/user-button';

const page = async () => {
  const session = await auth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{JSON.stringify(session)}</p>
      <UserButton />
    </div>
  );
};

export default page;
