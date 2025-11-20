import { Request, Response } from "express";
import {
  putIntoUser,
  selectAllUsers,
  selectUserById,
} from "../services/UserService";
import { log } from "node:console";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await selectAllUsers();
    return res.json(users);
  } catch (error) {
    log(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await selectUserById(Number(id));
    return res.json(user);
  } catch (error) {
    log(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      emailAddress,
      physicalAddress,
      phoneNumber,
      profilePicUrl,
      password,
    } = req.body;
    const user = await putIntoUser(Number(id), {
      firstName,
      lastName,
      emailAddress,
      physicalAddress,
      phoneNumber,
      profilePicUrl,
      password,
    });
    return res.json(user);
  } catch (error) {
    log(error);
  }
};

