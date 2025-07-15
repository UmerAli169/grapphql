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
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./graphql/index");
const db_1 = __importDefault(require("./lib/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const context_1 = require("./utils/context");
const app = (0, express_1.default)();
// Apply CORS globally with proper configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000'], // Removed trailing slashes
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.get('/rest', (req, res) => {
    res.send("Welcome to the REST API");
});
const server = new server_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: index_1.resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    csrfPrevention: true,
    allowBatchedHttpRequests: true,
});
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
        // Apply Apollo middleware after server starts
        app.use('/graphql', express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
            context: context_1.context
        }));
        app.listen({ port: 5000 }, () => {
            console.log('🚀 Server ready at http://localhost:5000');
            console.log('GraphQL endpoint: http://localhost:5000/graphql');
            console.log('REST endpoint: http://localhost:5000/rest');
            console.log('Auth endpoint: http://localhost:5000/api/auth');
        });
    });
}
startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
