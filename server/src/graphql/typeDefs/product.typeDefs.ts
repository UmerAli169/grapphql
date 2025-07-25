import { gql } from "graphql-tag";

export const productTypeDefs = gql`
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
    reviews: [Review!]!
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
    getProductById(id: ID!): Product!
  }
`;
