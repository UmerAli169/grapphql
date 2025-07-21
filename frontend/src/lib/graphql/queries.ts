import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts { 
    getAllProducts {
      id
      productName
      productPrice
      productDescription
      discount
      category
      subCategory
      images
      size
      recommendedFor
      title
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      productName
      productPrice
      productDescription
      category
      subCategory
      images
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;