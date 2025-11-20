import { insertIntoUsers, loginUserDB } from "../services/authService";
import { Request, Response } from "express";
import { log } from "console";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await insertIntoUsers(req.body);
    return res.status(201).json(user);
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
