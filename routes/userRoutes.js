import express from "express";
import {
  followUnfollowUser,
  getAllUsers,
  getSuggested,
  getUserProfile,
} from "../controllers/user.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile/:username", protectedRoute, getUserProfile);
router.get("/suggested", protectedRoute, getSuggested);
router.post("/follow/:id", protectedRoute, followUnfollowUser);

export default router;
