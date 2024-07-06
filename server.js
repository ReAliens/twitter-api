import express from "express";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import connectMongo from "./db/db.js";
const port = process.env.PORT || 8080;
dotenv.config();
const app = express();

console.log(process.env.MONGO_URI);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("listening on server 8080");
  connectMongo();
});
