import { v4 as uuidv4 } from 'uuid';

import { getPasswordResetTokenByEmail } from '@/database/password-reset-token';
import { db } from '@/lib/db';

/**
 * Generates a new password reset token for the specified email.
 * @param email - The email address to generate a password reset token for.
 * @returns The newly created password reset token object.
 */
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
