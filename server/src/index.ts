import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers, typeDefs } from './graphql/index';
import prisma from './lib/db';
import authRoutes from "./routes/auth.routes";
import { context } from './utils/context';

export interface MyContext {
  token?: string;
}

const app = express();

// Apply CORS globally with proper configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Removed trailing slashes
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get('/rest', (req, res) => {
  res.send("Welcome to the REST API");
});

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  csrfPrevention: true,
  allowBatchedHttpRequests: true,
});

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to DB!');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function startServer() {
  await testConnection();
  await server.start();

  // Apply Apollo middleware after server starts
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context
    })
  );

  app.listen({ port: 5000 }, () => {
    console.log('🚀 Server ready at http://localhost:5000');
    console.log('GraphQL endpoint: http://localhost:5000/graphql');
    console.log('REST endpoint: http://localhost:5000/rest');
    console.log('Auth endpoint: http://localhost:5000/api/auth');
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});