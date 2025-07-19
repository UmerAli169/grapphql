import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DecodedToken {
  userId: any;
}

export const context = async ({ req }: { req: any }) => {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1Mjg3MDQxNywiZXhwIjoxNzUzNDc1MjE3fQ.AUZ2oIOCbfB_g0-91b0Mfh6B-zxAM4V-cFAOo0S-w8Y';
  let token = req.cookies.token
  console.log(token, 'pppp')
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
