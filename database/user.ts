import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getAccountProviderById = async (id: string) => {
  try {
    const accountProvider = await db.account.findFirst({
      where: {
        id,
      },
    });

    return accountProvider;
  } catch (error) {
    console.log(error);
  }
};
