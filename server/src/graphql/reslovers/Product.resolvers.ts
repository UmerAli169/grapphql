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
      console.log(input, 'input', user, 'user')
      if (!user) {
        throw new Error("Unauthorized: You must be logged in to create a product.");
      }

      return await prisma.product.create({
        data: {
          ...input,
          user: { connect: { id: user.id } },
        },
      });
    },
  },

  Product: {
    user: (parent: any) => {
      console.log(parent, 'parent')
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};
