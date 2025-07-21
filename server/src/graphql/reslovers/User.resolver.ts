import prisma from '../../lib/db';

export const userResolvers = {
    Query: {
        me: async (_: any, __: any, { user }: any) => {
            if (!user) {
                throw new Error("Unauthorized");
            }

            return prisma.user.findUnique({
                where: { id: user.id },
                include: { products: true },
            });
        },
    },
 
    User: {
        products: (parent: any) => {
            return prisma.product.findMany({
                where: { userId: parent.id },
            });
        },
    },
};
