import { insertIntoUsers, loginUserDB } from "../services/authService";
<<<<<<< HEAD
=======
import { Request, Response } from "express";
>>>>>>> feat/ReviewCard
import { log } from "console";
export const createUser = async (req, res) => {
    try {
        const user = await insertIntoUsers(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        log(error);
    }
};
export const loginUser = async (req, res) => {
    try {
        const user = await loginUserDB(req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        log(error);
    }
};
//# sourceMappingURL=authController.js.map