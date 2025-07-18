import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DecodedToken {
  userId: any;
}

export const context = async ({ req }: { req: any }) => {
  const token = req.cookie;
console.log(token,'pppp')
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, "umeralikhan") as DecodedToken;
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
    } catch (err) {
      console.error("Token verification failed:", err);
    }
  }

  return {
    user,
    prisma,
  };
};
