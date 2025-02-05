import mongoose from "mongoose";
import Quiz from "../models/quizModel.js";
import { quizzes } from "./helper.js";
import dotenv from "dotenv";

dotenv.config();

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Quiz.deleteMany({});

  await Quiz.insertMany(quizzes);

  console.log("Database seeded successfully");
  mongoose.disconnect();
};

seedDB().catch((error) => {
  console.error("Error seeding the database:", error);
  mongoose.disconnect();
});
