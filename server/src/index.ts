import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import prisma from './lib/db';
import authRoutes from "./routes/auth.routes";

export interface MyContext {
  token?: string;
}

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/rest', (req, res) => {
  res.send("Welcome to the RESR API");
})
app.use(cors());
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
    await prisma.$disconnect()
    process.exit(1);
  }
}

async function startServer() {
  await testConnection();

  await server.start();

  // app.use('/graphql', cors(), express.json(), expressMiddleware(server));

  app.listen({ port: 5000 }, () =>
    console.log('🚀 Server ready at http://localhost:5000/graphql')
  );
}

startServer();
