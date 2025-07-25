import { gql } from '@apollo/client';
export const GET_CART  = gql`
  query GET_CART {
    getCart {
      id
      userId
      items {
        id
        product {
          id
          productName
          price
        }
        quantity
        updatedAt
      }
    }
  }
`;


export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddCartItemInput!) {
    addToCart(input: $input) {
      id
      items {
        id
        quantity
        updatedAt
        product {
          id
          productName
          price
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($itemId: String!, $quantity: Int!) {
    updateCartItemQuantity(itemId: $itemId, quantity: $quantity) {
      id
      quantity
      updatedAt
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($itemId: String!) {
    removeCartItem(itemId: $itemId) {
      id
      message
    }
  }
`;
