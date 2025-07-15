import prisma from '../../lib/db';

export const productResolvers = {
  Query: {
    getAllProducts: async () => {
      return await prisma.product.findMany({
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
          user: { connect: { id: user.id } }, // attach logged-in user
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
