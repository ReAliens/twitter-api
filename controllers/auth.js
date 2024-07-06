import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signUp = async (req, res, next) => {
  try {
    const { email, fullName, password, username } = req.body;
    // console.log(req.body);
    const existingUserEmail = await User.findOne({ username });
    if (existingUserEmail) {
      return res.status(400).json({ error: "this email is already taken" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "this username is already taken" });
    }

    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword, "hashed password");
    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
    });
    console.log("new user", newUser);
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        message: "User saved successfully",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
          followers: newUser.followers,
          following: newUser.following,
          profileImg: newUser.profileImg,
          coverImg: newUser.coverImg,
        },
      });
    } else {
      res.status(400).json({
        error: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log("Error in signup controller", err.message);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = (req, res, next) => {};

export const logout = (req, res, next) => {};
