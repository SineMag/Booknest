"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.get("/", UserController_1.getAllUsers);
router.put("/:id", UserController_1.updateUser);
router.get("/:id", UserController_1.getUserById);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map