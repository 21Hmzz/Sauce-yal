import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers';
import { getUserId } from './utils';

const typeDefs = readFileSync('./src/schema/types.graphql', 'utf-8');
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId({ request: req }) : null,
    }),
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
};

startServer();
