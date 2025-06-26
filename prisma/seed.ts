import { hash } from '@node-rs/argon2';
import { PrismaClient, TicketStatus } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'admin@mail.com',
  },
  {
    username: 'user',
    email: 'user@mail.com',
  },
];

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
  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash('1qazxsw2');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  console.log('Database seeded successfully!');
};

seed();
