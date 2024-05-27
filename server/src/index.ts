import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import { getUser } from "./auth";
import db from "./db";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const typeDefs = readFileSync("./src/schema/types.graphql", "utf-8");
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authorization = req.headers.authorization?.split("Bearer ")?.[1];
      const user = authorization ? getUser(authorization) : null;
      return {
        dataSources: {
          db,
        },
        user,
      };
    },
  });

  console.log(`Server ready at ${url}`);
};

startServer();
