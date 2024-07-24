import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
const port = process.env.PORT || 8080;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our API" });
});

app.listen(port, () => {
  console.log("listening on server 8080");
  connectMongo();
});
