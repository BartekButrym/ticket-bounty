'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { setCookieByKey } from '@/actions/cookies';
import { getAuthOrRedirect } from '@/auth/cookie';
import { isOwner } from '@/auth/is-owner';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/path';

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Not authorized');
    }

    await prisma.ticket.delete({
      where: { id },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey('toast', 'Ticket deleted');
  redirect(ticketsPath());
};
