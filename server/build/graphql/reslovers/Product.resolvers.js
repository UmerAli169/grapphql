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
exports.productResolvers = void 0;
const db_1 = __importDefault(require("../../lib/db"));
exports.productResolvers = {
    Query: {
        getAllProducts: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { user }) {
            if (!user) {
                throw new Error("Unauthorized: You must be logged in to view products.");
            }
            return yield db_1.default.product.findMany({
                include: { user: true, reviews: true },
                orderBy: { createdAt: "desc" },
            });
        }),
        getProductById: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield db_1.default.product.findUnique({
                where: { id: args.id },
                include: { reviews: true },
            });
            if (!product) {
                throw new Error("Product not found");
            }
            // Ensure reviews is never null
            return Object.assign(Object.assign({}, product), { reviews: product.reviews || [] });
        }),
    },
    Mutation: {
        createProduct: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input }, { user }) {
            if (!user) {
                throw new Error("Unauthorized: You must be logged in to create a product.");
            }
            return yield db_1.default.product.create({
                data: Object.assign(Object.assign({}, input), { userId: user.id }),
            });
        }),
        updateProduct: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id, input }, { user }) {
            if (!user) {
                throw new Error("Unauthorized: You must be logged in.");
            }
            const existingProduct = yield db_1.default.product.findUnique({
                where: { id },
            });
            if (!existingProduct || existingProduct.userId !== user.id) {
                throw new Error("Not allowed to update this product.");
            }
            return yield db_1.default.product.update({
                where: { id },
                data: input,
            });
        }),
        deleteProduct: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id }, { user }) {
            if (!user) {
                throw new Error("Unauthorized: You must be logged in.");
            }
            const existingProduct = yield db_1.default.product.findUnique({
                where: { id },
            });
            if (!existingProduct || existingProduct.userId !== user.id) {
                throw new Error("Not allowed to delete this product.");
            }
            yield db_1.default.product.delete({
                where: { id },
            });
            return { success: true, message: "Product deleted successfully." };
        }),
    },
    Product: {
        user: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.default.user.findUnique({
                where: { id: parent.userId },
            });
        }),
    },
};
