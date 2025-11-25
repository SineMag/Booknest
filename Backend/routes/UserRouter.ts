import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController.js";
import { uploadProfileImage } from "../controllers/uploadController.js";

const router = Router();

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.get("/:id", getUserById);
router.post("/uploadPic", uploadProfileImage);

export default router;
