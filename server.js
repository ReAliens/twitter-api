import express from "express";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8080;
dotenv.config();
const app = express();

console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("listening on server 8080");
  connectMongo();
});
