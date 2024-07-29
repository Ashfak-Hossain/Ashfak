import React from 'react';

import { CurrentUser } from '@/lib/auth';

const page = async () => {
  const user = await CurrentUser();

  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(user)}
      <br />
    </div>
  );
};

export default page;
