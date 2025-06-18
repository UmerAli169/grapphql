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
exports.resolvers = void 0;
// src/graphql/resolvers.ts
const db_1 = __importDefault(require("../lib/db"));
exports.resolvers = {
    Query: {
        hello: () => "Hello, world!",
        getName: (_, { name }) => {
            return `HEY HOW ARE YOU ${name}`;
        },
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email, password, }) {
            var _b, _c;
            try {
                yield db_1.default.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        password,
                        salt: "staticSaltValue", // You can hash with salt properly later
                    },
                });
                return true;
            }
            catch (error) {
                if (error.code === "P2002" && ((_c = (_b = error.meta) === null || _b === void 0 ? void 0 : _b.target) === null || _c === void 0 ? void 0 : _c.includes("email"))) {
                    console.error("❌ Email already exists");
                    throw new Error("User with this email already exists");
                }
                console.error("Error creating user:", error);
                return false;
            }
        }),
    },
};
