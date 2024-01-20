import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Database is connected");
  } catch (error) {
    console.log("Error While connecting Database !!");
  }
};
