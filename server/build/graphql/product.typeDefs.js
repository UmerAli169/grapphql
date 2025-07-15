"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.productTypeDefs = (0, graphql_tag_1.gql) `
  type Product {
    id: Int!
    productName: String!
    productPrice: Float!
    productDescription: String!
    discount: Float!
    category: String!
    subCategory: String
    images: [String!]!
    size: String!
    recommendedFor: String
    title: String!
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  input CreateProductInput {
    productName: String!
    productPrice: Float!
    productDescription: String!
    discount: Float!
    category: String!
    subCategory: String
    images: [String!]!
    size: String!
    recommendedFor: String
    title: String!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }

  type Query {
    getAllProducts: [Product!]!
  }
`;
