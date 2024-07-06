import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongno connected", conn.connection.host);
  } catch (err) {
    console.log("error connecting database", err.message);
    process.exit(1);
  }
};
export default connectMongo;
