import { Router } from "express";
import { getAllUsers, updateUser } from "../controllers/UserController";

const router = Router();

router.get("/", getAllUsers);
router.put("/:id", updateUser);

export default router;
