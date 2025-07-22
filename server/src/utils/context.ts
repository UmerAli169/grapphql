import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DecodedToken {
  userId: any;
}
 
export const context = async ({ req }: { req: any }) => { 
  let token = req.cookies.token
  let user = null;

  if (token) {
    try {
      const decoded:any = jwt.verify(token, "umeralikhan") as DecodedToken;

      user = await prisma.user.findUnique({
        where: { id: decoded?.id },
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
