import { PrismaClient, TicketStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket',
    status: TicketStatus.OPEN,
    bounty: 499,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket',
    status: TicketStatus.IN_PROGRESS,
    bounty: 399,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket',
    status: TicketStatus.DONE,
    bounty: 599,
    deadline: new Date().toISOString().split('T')[0],
  },
];

const seed = async () => {
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  console.log('Database seeded successfully!');
};

seed();
