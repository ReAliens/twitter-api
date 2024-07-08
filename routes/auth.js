import express from "express";
import { getMe, login, logout, signUp } from "../controllers/auth.js";
import { check } from "express-validator";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/me", protectedRoute, getMe);

router.post(
  "/signup",
  [
    check("email", "this must be a valid email address").isEmail(),
    check("fullName", "fullName must not be empty")
      .notEmpty()
      .matches(/^[a-zA-Z]+ [a-zA-Z]+$/)
      .withMessage("Full name must contain only letters and spaces"),
    check("password", "Password must be more than 6 character").isLength({
      min: 6,
    }),
  ],
  signUp
);
router.post("/login", login);

router.post("/logout", logout);

export default router;
