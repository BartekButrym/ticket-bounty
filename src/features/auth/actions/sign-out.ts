'use server';

import { redirect } from 'next/navigation';

import { deleteSessionCookie, getAuth } from '@/auth/cookie';
import { invalidateSession } from '@/auth/session';
import { signInPath } from '@/path';

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};
