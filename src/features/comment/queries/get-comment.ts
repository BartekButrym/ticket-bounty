import { prisma } from '@/lib/prisma';

export const getComment = async (id: string) => {
  return await prisma.comment.findUnique({
    where: { id },
  });
};
