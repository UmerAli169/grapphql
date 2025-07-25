"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.reviewsTypeDefs = (0, graphql_tag_1.default) `
  type Review {
    id: String!
    comment: String
    rating: Float
    productId: ID!
    userId: ID!
    product: Product!
    user: User!
    createdAt: String
  }

  input CreateReviewInput {
    comment: String
    rating: Float
    productId: ID!
  }

  input UpdateReviewInput {
    comment: String
    rating: Float
  }

  type DeleteReviewResponse {
    success: Boolean!
    message: String
    deletedId: ID
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    updateReview(id: ID!, input: UpdateReviewInput!): Review!
    deleteReview(id: ID!): DeleteReviewResponse!
  }

  type Query {
    getAllReviews: [Review!]!
    getReviewsByProductId(productId: ID!): [Review!]!
    getReviewsByUserId(userId: ID!): [Review!]!
  }
`;
