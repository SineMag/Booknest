import { log } from "console";
import type { Request, Response } from "express";
import {
  createRoomTypeDB,
  deleteRoomTypeDB,
  selectAllRoomTypesDB,
  selectRoomTypeByIdDB,
  updateRoomTypeDB,
} from "../services/roomTypeService";
import type { RoomType } from "../models/RoomType";

export const getAllRoomTypes = async (req: Request, res: Response) => {
  try {
    const roomTypes = await selectAllRoomTypesDB();
    return res.status(200).json(roomTypes);
  } catch (error) {
    log(error);
  }
};

export const getRoomTypeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const roomType = await selectRoomTypeByIdDB(id);
    return res.status(200).json(roomType);
  } catch (error) {
    log(error);
  }
};

export const createRoomType = async (req: Request, res: Response) => {
  try {
    const roomType = req.body as RoomType;
    const newRoomType = await createRoomTypeDB(roomType);
    return res.status(201).json(newRoomType);
  } catch (error) {
    log(error);
  }
};

export const updateRoomType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const roomType = req.body as RoomType;
    const updatedRoomType = await updateRoomTypeDB(id, roomType);
    return res.status(200).json(updatedRoomType);
  } catch (error) {
    log(error);
  }
};

export const deleteRoomType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteRoomTypeDB(id);
    return res.sendStatus(204);
  } catch (error) {
    log(error);
  }
};
