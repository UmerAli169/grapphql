import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  type Product {
    id: String!
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
    user: User!
  }

  input CreateProductInput {
    productName: String
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

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }

  type Query {
    getAllProducts: [Product!]!
  }
`;
