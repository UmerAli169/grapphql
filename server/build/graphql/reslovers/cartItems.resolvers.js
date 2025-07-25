"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartResolvers = void 0;
const db_1 = __importDefault(require("../../lib/db"));
exports.cartResolvers = {
    Query: {
        getCart: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { user }) {
            if (!user)
                throw new Error("Unauthorized");
            let cart = yield db_1.default.cart.findUnique({
                where: { userId: user.id },
                include: { items: { include: { product: true } } },
            });
            if (!cart) {
                cart = yield db_1.default.cart.create({
                    data: {
                        userId: user.id,
                    },
                    include: { items: { include: { product: true } } },
                });
            }
            return cart;
        }),
    },
    Mutation: {
        addToCart: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input }, { user }) {
            if (!user)
                throw new Error("Unauthorized");
            let cart = yield db_1.default.cart.findUnique({
                where: { userId: user.id },
            });
            if (!cart) {
                cart = yield db_1.default.cart.create({ data: { userId: user.id } });
            }
            const existingItem = yield db_1.default.cartItem.findFirst({
                where: { cartId: cart.id, productId: input.productId },
            });
            if (existingItem) {
                yield db_1.default.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + input.quantity },
                });
            }
            else {
                yield db_1.default.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: input.productId,
                        quantity: input.quantity,
                    },
                });
            }
            return db_1.default.cart.findUnique({
                where: { id: cart.id },
                include: { items: { include: { product: true } } },
            });
        }),
        updateCartItem: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input }, { user }) {
            if (!user)
                throw new Error("Unauthorized");
            const cart = yield db_1.default.cart.findUnique({
                where: { userId: user.id },
            });
            if (!cart)
                throw new Error("Cart not found");
            const item = yield db_1.default.cartItem.findFirst({
                where: { cartId: cart.id, productId: input.productId },
            });
            if (!item)
                throw new Error("Item not found");
            yield db_1.default.cartItem.update({
                where: { id: item.id },
                data: { quantity: input.quantity },
            });
            return db_1.default.cart.findUnique({
                where: { id: cart.id },
                include: { items: { include: { product: true } } },
            });
        }),
        removeCartItem: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { productId }, { user }) {
            if (!user)
                throw new Error("Unauthorized");
            const cart = yield db_1.default.cart.findUnique({
                where: { userId: user.id },
            });
            if (!cart)
                throw new Error("Cart not found");
            yield db_1.default.cartItem.deleteMany({
                where: { cartId: cart.id, productId },
            });
            return db_1.default.cart.findUnique({
                where: { id: cart.id },
                include: { items: { include: { product: true } } },
            });
        }),
    },
};
