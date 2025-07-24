"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.productTypeDefs = (0, graphql_tag_1.gql) `
  type Product {
    id: String!
    tittle: String
    productName: String
    price: Float
    description: String
    discount: Float
    category: String
    subCategory: String
    imageKeys: [String!]
    size: String
    recommendFor: String
    title: String
    createdAt: String
    updatedAt: String
    userId: String!
    user: User!
  }

  input CreateProductInput {
    productName: String
    tittle: String
    price: Float
    description: String
    discount: Float
    category: String
    subCategory: String
    imageKeys: [String]
    size: String
    recommendFor: String
    title: String
  }

  input UpdateProductInput {
    productName: String
    tittle: String
    price: Float
    description: String
    discount: Float
    category: String
    subCategory: String
    imageKeys: [String]
    size: String
    recommendFor: String
    title: String
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    deleteProduct(id: ID!): DeleteResponse
  }

  type Query {
    getAllProducts: [Product!]!
    getProductById(id: ID!): Product
  }
`;
