'use server';

import { revalidatePath } from 'next/cache';

import { TicketStatus } from '@prisma/client';

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/path';

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState('SUCCESS', 'Status updated');
};
