import { Request, Response } from "express";
import { selectAllUsers } from "../services/UserService";
import { log } from "node:console";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await selectAllUsers();
    return res.json(users);
  } catch (error) {
    log(error);
  }
};
