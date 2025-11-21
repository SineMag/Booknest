"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", authController_1.createUser);
router.post("/login", authController_1.loginUser);
exports.default = router;
//# sourceMappingURL=authRouter.js.map