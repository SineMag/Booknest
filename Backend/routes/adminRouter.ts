import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmins,
  loginAdmin,
  updateAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello Admin!"));
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
