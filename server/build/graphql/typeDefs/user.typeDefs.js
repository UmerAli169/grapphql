"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.userTypeDefs = (0, graphql_tag_1.gql) `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    products: [Product!]!
  }

  type Query {
    me: User
  }
`;
