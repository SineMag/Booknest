"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const UserService_1 = require("../services/UserService");
const node_console_1 = require("node:console");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, UserService_1.selectAllUsers)();
        return res.json(users);
    }
    catch (error) {
        (0, node_console_1.log)(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await (0, UserService_1.selectUserById)(Number(id));
        return res.json(user);
    }
    catch (error) {
        (0, node_console_1.log)(error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        console.log("Incoming ID:", req.params);
        const id = Number(req.params.id);
        const { firstName, lastName, emailAddress, physicalAddress, phoneNumber, profilePicUrl, password, } = req.body;
        const user = await (0, UserService_1.putIntoUser)(Number(id), {
            firstName,
            lastName,
            emailAddress,
            physicalAddress,
            phoneNumber,
            profilePicUrl,
            password,
        });
        return res.json(user);
    }
    catch (error) {
        (0, node_console_1.log)(error);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=UserController.js.map