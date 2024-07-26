'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/database/user';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schema/auth';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  // If fields are invalid, return error
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  // If user does not exist, return error
  if (!existingUser || !existingUser.email) {
    return { error: 'Email does not exist!' };
  }

  // If user exists but does not have a password, return error
  if (existingUser.email && !existingUser.password) {
    return { error: 'Email used with another provider' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err?.message === 'Invalid password') {
        return { error: 'Invalid password' };
      }

      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
