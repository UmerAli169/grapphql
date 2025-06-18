import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import prisma from './lib/db'; 

export interface MyContext {
  token?: string;
}

const app = express();
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

app.use(bodyParser.json());

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to DB!');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    process.exit(1); 
  }
}

async function startServer() {
  await testConnection(); 

  await server.start();

  app.use('/graphql', cors(), express.json(), expressMiddleware(server));

  app.listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at http://localhost:4000/graphql')
  );
}

startServer();
