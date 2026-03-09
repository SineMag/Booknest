import type { Request, Response } from "express";
import {
  createAdminDB,
  deleteAdminDB,
  selectAdminById,
  selectAllAdmins,
  updateAdminDB,
} from "../services/adminService";
import type { Admin } from "../models/Admin";

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await selectAllAdmins();
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: "Unable to fetch admins",
    });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const admin = await selectAdminById(id);
    const adminById = admin.find((admin) => admin.id === id);
    if (!adminById) {
      return res.status(404).json({ error: "Admin not found" });
    }
    return res.status(200).json(adminById);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const body = req.body as Admin;
    const newAdmin = await createAdminDB(body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const body = req.body as Admin;
    const admin = await updateAdminDB(id, body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteAdminDB(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};
