import { insertIntoUsers, loginUserDB } from "../services/authService";
import type { Request, Response } from "express";
import { log } from "console";
import type { User } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body as User;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(user.emailAddress))
      return res.status(400).json({ message: "Invalid email address" });

    const newUser = await insertIntoUsers(user);
    return res.status(201).json(newUser);
  } catch (error) {
    log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await loginUserDB(req.body);
    return res.status(200).json(user);
  } catch (error) {
    log(error);
  }
};
