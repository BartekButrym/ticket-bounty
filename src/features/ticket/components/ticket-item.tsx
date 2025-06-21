import Link from 'next/link';

import { Ticket } from '@prisma/client';
import clsx from 'clsx';
import { MoreVertical, Pencil, SquareArrowOutUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TICKET_ICONS } from '@/features/constants';
import { ticketEditPath, ticketPath } from '@/path';
import { toCurrencyFromCent } from '@/utils/currency';

import { TicketMoreMenu } from './ticket-more-menu';

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketPath(ticket.id)}>
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx('w-full flex gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};
