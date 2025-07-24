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
exports.reviewResolvers = void 0;
const db_1 = __importDefault(require("../../lib/db"));
exports.reviewResolvers = {
    Query: {
        getAllReviews: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.default.reviews.findMany();
        }),
        getReviewsByProductId: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productId }) {
            return yield db_1.default.reviews.findMany({
                where: { productId },
            });
        }),
        getReviewsByUserId: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            return yield db_1.default.reviews.findMany({
                where: { userId },
            });
        }),
    },
    Mutation: {
        createReview: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            var _b;
            const userId = (_b = context.user) === null || _b === void 0 ? void 0 : _b.id;
            if (!userId)
                throw new Error("Unauthorized");
            return yield db_1.default.reviews.create({
                data: {
                    comment: input.comment,
                    rating: input.rating,
                    productId: input.productId,
                    userId,
                },
            });
        }),
        updateReview: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, input }) {
            const existing = yield db_1.default.reviews.findUnique({ where: { id } });
            if (!existing)
                throw new Error("Review not found");
            return yield db_1.default.reviews.update({
                where: { id },
                data: input,
            });
        }),
        deleteReview: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const existing = yield db_1.default.reviews.findUnique({ where: { id } });
            if (!existing) {
                return {
                    success: false,
                    message: "Review not found",
                    deletedId: null,
                };
            }
            yield db_1.default.reviews.delete({ where: { id } });
            return {
                success: true,
                message: "Review deleted successfully",
                deletedId: id,
            };
        }),
    },
    Review: {
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.default.product.findUnique({ where: { id: parent.productId } });
        }),
        user: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.default.user.findUnique({ where: { id: parent.userId } });
        }),
    },
};
