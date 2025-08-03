'use server';

import { z } from 'zod';

import { getAuthOrRedirect } from '@/auth/cookie';
import { verifyPasswordHash } from '@/auth/password';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';

import { generatePasswordResetLink } from '../utils/generate-password-reset-link';

const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const auth = await getAuthOrRedirect();

  try {
    const { password } = passwordChangeSchema.parse({
      password: formData.get('password'),
    });

    const validPassword = await verifyPasswordHash(
      auth.user.passwordHash,
      password
    );

    if (!validPassword) {
      return toActionState('ERROR', 'Invalid password', formData);
    }

    const passwordResetLink = await generatePasswordResetLink(auth.user.id);

    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState('SUCCESS', 'Check your email for a reset link');
};
