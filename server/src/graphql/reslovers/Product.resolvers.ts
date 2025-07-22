import prisma from '../../lib/db';

export const productResolvers = {
  Query: {
    getAllProducts: async (_: any, __: any, { user }: any) => {
      if (!user) {
        throw new Error("Unauthorized: You must be logged in to view products.");
      }

      return await prisma.product.findMany({
        where: { userId: user.id },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      });
    },
  },

  Mutation: {
    createProduct: async (_: any, { input }: any, { user }: any) => {
      if (!user) {
        throw new Error("Unauthorized: You must be logged in to create a product.");
      }

      return await prisma.product.create({
        data: {
          ...input,
          userId: user.id,
        },
      });
    },
  },

  Product: {
    user: (parent: any) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};
