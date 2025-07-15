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
const db_1 = __importDefault(require("../lib/db"));
exports.productResolvers = {
    Query: {
        getAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.default.product.findMany({
                include: { user: true },
                orderBy: { createdAt: 'desc' },
            });
        }),
    },
    Mutation: {
        createProduct: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input }, { user }) {
            if (!user) {
                throw new Error("Unauthorized: You must be logged in to create a product.");
            }
            return yield db_1.default.product.create({
                data: Object.assign(Object.assign({}, input), { user: { connect: { id: user.id } } }),
            });
        }),
    },
    Product: {
        user: (parent) => {
            return db_1.default.user.findUnique({
                where: { id: parent.userId },
            });
        },
    },
};
