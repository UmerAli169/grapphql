import gql from "graphql-tag";

export const reviewsTypeDefs = gql`
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


