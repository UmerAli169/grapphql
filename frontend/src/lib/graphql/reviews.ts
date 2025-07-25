import { gql } from "@apollo/client";
export const GET_REVIEWS_BY_PRODUCT = gql`
  query GetReviewsByProduct($productId: ID!) {
    getReviewsByProductId(productId: $productId) { 
      id
      comment
      rating
      productId
      userId 
      createdAt
      user {
        firstName
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      comment
      rating
      productId
      userId
    }
  }
`;

export const GET_ALL_REVIEW = gql`
  query GetAllReviews {
    getAllReviews {
      id
      comment
      rating
      productId
      userId
      createdAt
      user {
        firstName
        
      }
    }
  }
`;