import prisma from "../../lib/db";

export const reviewResolvers = {
  Query: {
    getAllReviews: async () => {
      return await prisma.reviews.findMany();
    },

    getReviewsByProductId: async (_: any, { productId }: { productId: string }) => {
      return await prisma.reviews.findMany({
        where: { productId },
      });
    },

    getReviewsByUserId: async (_: any, { userId }: { userId: string }) => {
      return await prisma.reviews.findMany({
        where: { userId },
      });
    },
  },

  Mutation: {
    createReview: async (_: any, { input }: any, context: any) => {
      const userId = context.user?.id;
      if (!userId) throw new Error("Unauthorized");

      return await prisma.reviews.create({
        data: {
          comment: input.comment,
          rating: input.rating,
          productId: input.productId,
          userId,
        },
      });
    },

    updateReview: async (_: any, { id, input }: any) => {
      const existing = await prisma.reviews.findUnique({ where: { id } });
      if (!existing) throw new Error("Review not found");

      return await prisma.reviews.update({
        where: { id },
        data: input,
      });
    },

    deleteReview: async (_: any, { id }: { id: string }) => {
      const existing = await prisma.reviews.findUnique({ where: { id } });
      if (!existing) {
        return {
          success: false,
          message: "Review not found",
          deletedId: null,
        };
      }

      await prisma.reviews.delete({ where: { id } });

      return {
        success: true,
        message: "Review deleted successfully",
        deletedId: id,
      };
    },
  },

  Review: {
    product: async (parent: any) => {
      return await prisma.product.findUnique({ where: { id: parent.productId } });
    },
    user: async (parent: any) => {
      return await prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
};
