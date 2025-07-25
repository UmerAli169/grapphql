import prisma from "../../lib/db";

export const cartResolvers = {
  Query: {
    getCart: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Unauthorized");
      let cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { items: { include: { product: true } } },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId: user.id,
          },
          include: { items: { include: { product: true } } },
        });
      }

      return cart;
    },
  },

  Mutation: {
    addToCart: async (_: any, { input }: any, { user }: any) => {
      if (!user) throw new Error("Unauthorized");
      let cart = await prisma.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) {
        cart = await prisma.cart.create({ data: { userId: user.id } });
      }

      const existingItem = await prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId: input.productId },
      });

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + input.quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: input.productId,
            quantity: input.quantity,
           
          } as any,
        });
      }

      return prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
    },

    updateCartItem: async (_: any, { input }: any, { user }: any) => {
      if (!user) throw new Error("Unauthorized");
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) throw new Error("Cart not found");

      const item = await prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId: input.productId },
      });

      if (!item) throw new Error("Item not found");

      await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: input.quantity },
      });

      return prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
    },

    removeCartItem: async (_: any, { productId }: any, { user }: any) => {
      if (!user) throw new Error("Unauthorized");
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) throw new Error("Cart not found");

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      });

      return prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
    },
  },
};
