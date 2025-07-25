import { gql } from "graphql-tag";

export const cartTypeDefs = gql`
  type Cart {
    id: ID!
    userId: String!
    items: [CartItem!]!
    createdAt: String!
    updatedAt: String!
  }

  type CartItem {
    id: ID!
    cartId: String!
    productId: String!
    quantity: Int!
    product: Product!
    createdAt: String!
    updatedAt: String!
  }

  input AddCartItemInput {
    productId: String!
    quantity: Int!
  }

  input UpdateCartItemInput {
    productId: String!
    quantity: Int!
  }

  type Mutation {
    addToCart(input: AddCartItemInput!): Cart!
    updateCartItem(input: UpdateCartItemInput!): Cart!
    removeCartItem(productId: String!): Cart!
  }

  type Query {
    getMyCart: Cart!
  }
`;
