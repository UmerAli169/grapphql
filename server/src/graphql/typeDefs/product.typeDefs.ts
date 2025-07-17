import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  type Product {
    id: Int!
    productName: String
    productPrice: Float
    productDescription: String
    discount: Float
    category: String
    subCategory: String
    images: [String!]
    size: String
    recommendedFor: String
    title: String
    createdAt: String
    updatedAt: String
    user: User!
  }

  input CreateProductInput {
    productName: String
    productPrice: Float
    productDescription: String
    discount: Float
    category: String
    subCategory: String
    images: [String]
    size: String
    recommendedFor: String
    title: String
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }

  type Query {
    getAllProducts: [Product!]!
  }
`;
