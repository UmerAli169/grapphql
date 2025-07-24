import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    products: [Product!]!
  }

  type Query {
    me: User
  } 
`;
