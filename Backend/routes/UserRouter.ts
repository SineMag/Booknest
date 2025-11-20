import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController";

const router = Router();

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.get("/:id", getUserById);

export default router;
