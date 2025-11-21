"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserDB = exports.insertIntoUsers = void 0;
const User_1 = require("../models/User");
const insertIntoUsers = async (user) => {
    const result = await (0, User_1.insertUserQuery)(user);
    return result;
};
exports.insertIntoUsers = insertIntoUsers;
const loginUserDB = async (credentials) => {
    const result = await (0, User_1.loginUserQuery)(credentials);
    return result;
};
exports.loginUserDB = loginUserDB;
//# sourceMappingURL=authService.js.map