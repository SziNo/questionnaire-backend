import express from "express";
import {
  saveResults,
  deleteAllResults,
  getStatistics,
  exportStatistics,
} from "../controllers/resultsController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", protect, saveResults);
router.post("/admin/statistics", protect, admin, getStatistics);
router.post("/admin/statistics/export", protect, admin, exportStatistics);
router.delete("/admin/delete", protect, admin, deleteAllResults);

export default router;
