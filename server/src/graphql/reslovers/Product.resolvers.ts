import prisma from "../../lib/db";

export const productResolvers = {
  Query: {
    getAllProducts: async (_: unknown, __: unknown, { user }: any) => {
      if (!user) {
        throw new Error(
          "Unauthorized: You must be logged in to view products."
        );
      }
      return await prisma.product.findMany({
        where: { userId: user.id },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    },
    getProductById: async (_parent: any, args: any, context: any) => {

      const product = await context.prisma.product.findUnique({
        where: {
          id: args.id, 
        },
      });

      console.log(product, 'product');

      return product
    },
  },

  Mutation: {
    createProduct: async (_: unknown, { input }: any, { user }: any) => {
      if (!user) {
        throw new Error(
          "Unauthorized: You must be logged in to create a product."
        );
      }

      return await prisma.product.create({
        data: {
          ...input,
          userId: user.id,
        },
      });
    },

    updateProduct: async (_: unknown, { id, input }: any, { user }: any) => {
      if (!user) {
        throw new Error("Unauthorized: You must be logged in.");
      }

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct || existingProduct.userId !== user.id) {
        throw new Error("Not allowed to update this product.");
      }

      return await prisma.product.update({
        where: { id },
        data: input,
      });
    },

    deleteProduct: async (_: unknown, { id }: any, { user }: any) => {
      if (!user) {
        throw new Error("Unauthorized: You must be logged in.");
      }

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct || existingProduct.userId !== user.id) {
        throw new Error("Not allowed to delete this product.");
      }

      await prisma.product.delete({
        where: { id },
      });

      return { success: true, message: "Product deleted successfully." };
    },
  },

  Product: {
    user: async (parent: any) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};
