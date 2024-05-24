import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils';

const prisma = new PrismaClient();

export const Mutation = {
  signup: async (_: any, args: { email: string; password: string; name: string }) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await prisma.user.create({
      data: { ...args, password },
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
  login: async (_: any, args: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      throw new Error('No such user found');
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
  createPost: async (_: any, args: { title: string; content: string }, context: any) => {
    const userId = context.userId;
    if (!userId) {
      throw new Error('Not authenticated');
    }
    return await prisma.post.create({
      data: {
        ...args,
        author: { connect: { id: userId } },
      },
    });
  },
  createComment: async (_: any, args: { postId: number; content: string }, context: any) => {
    const userId = context.userId;
    if (!userId) {
      throw new Error('Not authenticated');
    }
    return await prisma.comment.create({
      data: {
        ...args,
        author: { connect: { id: userId } },
        Post: { connect: { id: args.postId } },
      },
    });
  },
  likePost: async (_: any, args: { postId: number }, context: any) => {
    const userId = context.userId;
    if (!userId) {
      throw new Error('Not authenticated');
    }
    return await prisma.like.create({
      data: {
        Post: { connect: { id: args.postId } },
        user: { connect: { id: userId } },
      },
    });
  },
};
