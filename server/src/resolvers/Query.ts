import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export const Query = {
  users: async () => {
    return await prisma.user.findMany();
  },
  user: async (_: any, _args: any, context: any) => {
    const userId = context.user.userId;
    if (!userId) {
      return {
        error: "You must be logged in to view this information",
      };
    }
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Posts: true,
        comments: true,
        likes: true,
      },
    });
  },
  posts: async () => {
    return await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  },
  post: async (_: any, args: { id: number }) => {
    return await prisma.post.findUnique({
      where: { id: args.id },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  },
};
