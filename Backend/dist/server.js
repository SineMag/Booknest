"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./models/User");
const cors_1 = __importDefault(require("cors"));
const PaymentRouter_1 = __importDefault(require("./routes/PaymentRouter"));
// import routes
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
// setup
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/users", UserRouter_1.default);
app.use("/auth", authRouter_1.default);
app.use('/payments', PaymentRouter_1.default);
app.get("/", (req, res) => {
    res.send("Hello, Booknest Backend is running!");
});
const startServer = async () => {
    await (0, User_1.userTableQuery)();
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map