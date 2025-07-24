import { gql } from "@apollo/client";
export const GET_REVIEWS_BY_PRODUCT = gql`
  query GetReviewsByProduct($productId: String!) {
    getReviewsByProduct(productId: $productId) {
      id
      comment
      rating
      productId
      userId
      
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