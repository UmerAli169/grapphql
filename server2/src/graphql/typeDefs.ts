// src/graphql/typeDefs.ts
import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String
    getName(name: String): String
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Boolean
  }
`;
