import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts { 
    getAllProducts {
      id
      productName
      price
      description
      discount
      category
      subCategory
      imageKeys
      size
      recommendFor
      title
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      productName
      price
      description
      category
      subCategory
      imageKeys
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