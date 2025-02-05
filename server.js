import express from "express";
import { connectDB } from "./config/db.js";
import { quizRoutes, userRoutes, resultsRoutes } from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// Use routes
app.use("/api/quizzes", quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api/results", resultsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}!`);
});
