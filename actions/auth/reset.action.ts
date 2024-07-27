'use server';

import { z } from 'zod';

import { getAccountProviderById, getUserByEmail } from '@/database/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';
import { ResetPasswordSchema } from '@/schema/auth';

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const valideatedFields = ResetPasswordSchema.safeParse(values);

  if (!valideatedFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = valideatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return { error: 'Email not found' };
    }

    const accountProvider = await getAccountProviderById(existingUser.id);
    if (accountProvider) {
      return { error: 'Provider account! Login using provider' };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
      existingUser.name
    );

    return { success: 'Reset password Email sent!' };
  } catch (error) {
    console.log(error);
  }
};
