"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.cartTypeDefs = (0, graphql_tag_1.gql) `
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
