'use server';

import { CurrentUser } from '@/lib/auth';

export const checkAdmin = async () => {
  const user = await CurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return { error: 401, message: 'Unauthorized' };
  }

  return { success: 202, message: 'Authorized' };
};
