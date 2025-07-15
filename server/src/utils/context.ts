import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DecodedToken {
  userId: any;
}

export const context = async ({ req }: { req: any }) => {
  // Get token from either cookies or Authorization header
  const token = req.headers.token || req.headers.authorization?.split(' ')[1];
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, "umeralikhan") as DecodedToken;
      user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
    } catch (err) {
      console.error("Token verification failed:", err);
    }
  }

  return {
    user,
    prisma
  };
};