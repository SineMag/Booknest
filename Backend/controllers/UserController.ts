import type { Request, Response } from "express";
import { log } from "node:console";
import {
  putIntoUser,
  selectAllUsers,
  selectUserById,
} from "../services/userService";

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
    const id = Number(req.params.id);
    console.log("Fetching user with ID:", id);
    const user = await selectUserById(Number(id));
    console.log("User data from DB:", user);
    if (!user || (Array.isArray(user) && user.length === 0)) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = Array.isArray(user) ? user[0] : user;
    return res.json(userData);
  } catch (error) {
    log(error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log("Incoming ID:", req.params.id);
    const id = Number(req.params.id);
    const {
      firstName,
      lastName,
      emailAddress,
      physicalAddress,
      phoneNumber,
      profilePicUrl,
      password,
    } = req.body;

    console.log("Updating user with data:", {
      firstName,
      lastName,
      emailAddress,
      physicalAddress,
      phoneNumber,
      profilePicUrl,
      password: password ? "***" : undefined,
    });

    const user = await putIntoUser(Number(id), {
      firstName,
      lastName,
      emailAddress,
      physicalAddress,
      phoneNumber,
      profilePicUrl,
      password,
    });

    console.log("User updated successfully");
    return res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    log(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};
