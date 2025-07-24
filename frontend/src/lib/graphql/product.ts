import { gql } from "@apollo/client";

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
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
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
      createdAt
      updatedAt
      userId
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
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      tittle
      productName
      price
      description
      category
      subCategory
      imageKeys
      size
      recommendFor
      title
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`;
