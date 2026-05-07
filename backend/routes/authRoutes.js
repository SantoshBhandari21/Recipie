import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update/:userId", updateUserProfile);

export default router;
