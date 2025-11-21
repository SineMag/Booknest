"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putIntoUser = exports.selectUserById = exports.selectAllUsers = void 0;
const User_1 = require("../models/User");
const selectAllUsers = async () => {
    const users = await (0, User_1.getUsersQuery)();
    return users;
};
exports.selectAllUsers = selectAllUsers;
const selectUserById = async (id) => {
    const user = await (0, User_1.getUserByIdQuery)(id);
    return user;
};
exports.selectUserById = selectUserById;
const putIntoUser = async (id, user) => {
    const result = await (0, User_1.putIntoUserQuery)(id, user);
    return result;
};
exports.putIntoUser = putIntoUser;
//# sourceMappingURL=UserService.js.map