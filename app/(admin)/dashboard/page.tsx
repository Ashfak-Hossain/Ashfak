import React from 'react';

import UserButton from '@/components/blog/navbar/user-button';
import { CurrentUser } from '@/lib/auth';

const page = async () => {
  const user = await CurrentUser();

  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(user)}
      <br />
      <UserButton />
    </div>
  );
};

export default page;
