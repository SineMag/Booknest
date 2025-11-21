"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const authService_1 = require("../services/authService");
const console_1 = require("console");
const createUser = async (req, res) => {
    try {
        const user = await (0, authService_1.insertIntoUsers)(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        (0, console_1.log)(error);
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const user = await (0, authService_1.loginUserDB)(req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        (0, console_1.log)(error);
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map