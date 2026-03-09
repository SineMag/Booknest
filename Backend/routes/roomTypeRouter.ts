import { Router } from "express";
import {
  createRoomType,
  deleteRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
} from "../controllers/roomTypeController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello RoomType!"));
router.get("/", getAllRoomTypes);
router.get("/:id", getRoomTypeById);
router.post("/", createRoomType);
router.put("/:id", updateRoomType);
router.delete("/:id", deleteRoomType);

export default router;
