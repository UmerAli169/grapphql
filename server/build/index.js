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
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const db_1 = __importDefault(require("./lib/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use('/rest', (req, res) => {
    res.send("Welcome to the RESR API");
});
app.use((0, cors_1.default)());
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
app.use(body_parser_1.default.json());
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.$connect();
            console.log('✅ Connected to DB!');
        }
        catch (err) {
            console.error('❌ DB connection failed:', err);
            yield db_1.default.$disconnect();
            process.exit(1);
        }
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield testConnection();
        yield server.start();
        // app.use('/graphql', cors(), express.json(), expressMiddleware(server));
        app.listen({ port: 5000 }, () => console.log('🚀 Server ready at http://localhost:5000/graphql'));
    });
}
startServer();
