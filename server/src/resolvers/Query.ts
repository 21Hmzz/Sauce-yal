import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Query = {
  users: async () => {
    return await prisma.user.findMany();
  },
  user: async (_: any, args: { id: number }) => {
    return await prisma.user.findUnique({
      where: { id: args.id },
    });
  },
  posts: async () => {
    return await prisma.post.findMany();
  },
  post: async (_: any, args: { id: number }) => {
    return await prisma.post.findUnique({
      where: { id: args.id },
    });
  },
};
