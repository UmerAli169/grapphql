"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { ADD_TO_CART, GET_CART,UPDATE_CART_ITEM, REMOVE_CART_ITEM } from "@/lib/graphql/cart";
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
// src/api/products.ts
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "@/lib/graphql/product";
import { GET_REVIEWS_BY_PRODUCT, CREATE_REVIEW,GET_ALL_REVIEW } from "@/lib/graphql/reviews";

import client from "@/lib/apolloClient";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized. Please login again");
    }
    toast.error(error.response?.data?.message || "Something went wrong!");
    console.log(error);
  }
);

export const register = async (data: any) => {
  try {
    const response = await api.post("/api/auth/register", data);
    toast.success(response.data.message || "Registration successful!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: any) => {
  try {
    const response = await api.post("/api/auth/login", data);
    toast.success(response.data.message || "Login successful!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const recoverPassword = async (email: any) => {
  try {
    const response = await api.post("/api/auth/recover-password", { email });
    toast.success(response.data.message || "Password recovery email sent!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (token: any, password: any) => {
  try {
    const response = await api.post(`/api/auth/reset-password/${token}`, {
      password,
    });
    toast.success(response.data.message || "Password reset successful!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/api/auth/me");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await client.query({
      query: GET_ALL_PRODUCTS,
      fetchPolicy: "no-cache", // Optional: skip cache
    });
    return data.getAllProducts;
  } catch (error) {
    console.log("GraphQL Error:", error);
    throw error;
  }
};

export const getProductById = async (productId: any) => {
  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: { id: productId },
      fetchPolicy: "no-cache",
    });
    return data.getProductById;
  } catch (error) {
    console.log(error);
  }
};

export const getWishlist = async () => {
  try {
    // const response = await api.get(`/api/products/getWishlist`);
    // return response?.data;
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = async (id: string) => {
  try {
    const response: any = await api.post(`/api/products/addToWishlist/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlist = async (id: string) => {
  try {
    const response = await api.post(`/api/products/removeFromWishlist/${id}`);
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (formData: {
  comment: string;
  rating: number;
  productId: string;
}) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_REVIEW,
      variables: { input: formData },
    });
    toast.success("Review submitted successfully!");
    await allReviews();
    return data.createReview;
  } catch (error: any) {
    console.error("GraphQL Error:", error);
    toast.error("Failed to submit review");
  }
};

export const getReviewsByProduct = async (productId: string) => {
  try {
    const { data } = await client.query({
      query: GET_REVIEWS_BY_PRODUCT,
      variables: { productId },
      fetchPolicy: "no-cache", // optional: prevents caching
    });

    return data.getReviewsByProductId;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return [];
  }
};
export const allReviews = async () => {
  try {
    const { data } = await client.query({
      query: GET_ALL_REVIEW,
    });
    return data.getAllReviews;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return [];
  }
};

export const getReviewsByUser = async (userId: any) => {
  try {
    const response = await api.get(`/api/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



export const fetchCart = async () => {
  const { data } = await client.query({
    query: GET_CART,
    fetchPolicy: "no-cache",
  });
  return data.getCart;
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  try {

    const { data } = await client.mutate({
      mutation: ADD_TO_CART,
      variables: {
        input: {
          productId,
          quantity,
        },
      },
    });

    return data?.addToCart;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};


export const updateCartItemQuantity = async (id: string, quantity: number) => {
  console.log( "Updating cart item:", id, "to quantity:", quantity);
  await client.mutate({
    mutation: UPDATE_CART_ITEM,
    variables: { id, quantity },
  });
};

export const removeCartItem = async (id: string) => {
  await client.mutate({
    mutation: REMOVE_CART_ITEM,
    variables: { id },
  });
};

;

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await api.post("/api/auth/change-password", data);
    toast.success("Password updated successfully!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactInfo = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  try {
    const response = await api.put("/api/auth/update-contact-info", data);
    toast.success("Contact information updated successfully!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  const response = await api.get("/api/products/categories");
  return null;
};

export const updateAddress = async (data: {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}) => {
  try {
    const response = await api.put("/api/products/updateAddress", data);
    toast.success("Address updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    toast.error("Failed to update address.");
  }
};
