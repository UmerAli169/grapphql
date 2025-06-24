// src/graphql/resolvers.ts
import prisma from "../lib/db";

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    getName: (_: any, { name }: { name: string }) => {
      return `HEY HOW ARE YOU ${name}`;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        firstName,
        lastName,
        email,
        password,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }
    ) => {
      try {
        await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password
          }
        });
        return true;
      } catch (error: any) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          console.error("❌ Email already exists");
          throw new Error("User with this email already exists");
        }
        console.error("Error creating user:", error);
        return false;
      }
    },
  },
};
