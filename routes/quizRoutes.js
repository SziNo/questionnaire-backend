import express from "express";
import {
  getAllQuizzes,
  getQuizzesByType,
  getQuizzesByTypeAdmin,
  addQuizType,
  addQuestion,
  deleteQuizType,
  deleteQuestion,
  updateQuestion,
  updateQuiz,
} from "../controllers/quizController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/:type", getQuizzesByType);
router.get("/admin/:type", protect, admin, getQuizzesByTypeAdmin);
router.post("/admin/add-quiz", protect, admin, addQuizType);
router.post("/admin/add-question", protect, admin, addQuestion);
router.post("/admin/delete-question", protect, admin, deleteQuestion); // body parsing not suppoerted in DELETE requests
router.put("/admin/update-quiz", protect, admin, updateQuiz);
router.put("/admin/update-question", protect, admin, updateQuestion);
router.delete("/admin/:type", protect, admin, deleteQuizType);

export default router;
