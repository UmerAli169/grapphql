"use client";

import React from "react";
import MainPage from "../views/MainPage/Dashboard";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import Wrapper from "@/app/wrapper";

export default function Page() {
  const { user } = useAuthStore();
  if (user) {
    return <MainPage />;
  }

  return (
    <Wrapper>
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-6">
            Welcome to Ladoes Fashion
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Discover trendy collections tailored just for you. Sign in to begin
            your fashion journey.
          </p>
          <Link
            href="/auth/login"
            className="text-pink-700 underline font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
