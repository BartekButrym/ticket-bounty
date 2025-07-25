'use server';

import { revalidatePath } from 'next/cache';

import { getAuthOrRedirect } from '@/auth/cookie';
import { isOwner } from '@/auth/is-owner';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/path';

export const deleteComment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState('ERROR', 'Not authorized');
  }

  try {
    await prisma.comment.delete({
      where: { id },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(comment.ticketId));

  return toActionState('SUCCESS', 'Comment deleted');
};
