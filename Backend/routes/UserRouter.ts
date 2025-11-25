import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController.js";
import { uploadProfileImage } from "../controllers/uploadController.js";
import multer from "multer";

const upload = multer();

const router = Router();
router.post("/uploadPic", upload.single("file"), uploadProfileImage);

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.get("/:id", getUserById);
router.post("/upload", upload.single("file"), uploadProfileImage);

export default router;
