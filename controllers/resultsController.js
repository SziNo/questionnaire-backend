import asyncHandler from "express-async-handler";
import Quiz from "../models/quizModel.js";
import Result from "../models/resultModel.js";
import User from "../models/userModel.js";
import {
  sendPatientEmail,
  sendAdminNotification,
} from "../utils/emailConfig.js";
import { Parser } from "json2csv";

// @desc    Save quiz results
// @route   POST /api/results/save
// @access  Private (Logged in users)
export const saveResults = asyncHandler(async (req, res) => {
  const { title, type, results } = req.body;
  const user = req.user._id;

  const result = new Result({ title, type, user, results });
  await result.save();

  await sendPatientEmail(req.user.email, results);

  const admins = await User.find({ isAdmin: true }).select("email");
  const adminEmails = admins.map((admin) => admin.email);

  await sendAdminNotification(adminEmails, results);

  res.status(201).json({ message: "Results saved successfully", result });
});

// @desc    Delete all quiz results
// @route   DELETE /api/results
// @access  Private/Admin
export const deleteAllResults = asyncHandler(async (req, res) => {
  await Result.deleteMany({});
  res.status(200).json({ message: "All quiz results deleted successfully" });
});

// @desc Get statistics for a quiz type
// @route POST /api/admin/statistics
// @access Private/Admin
export const getStatistics = asyncHandler(async (req, res) => {
  const { quizType } = req.body;

  const quiz = await Quiz.findOne({ type: quizType });

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz type not found");
  }

  const results = await Result.find({ type: quizType });

  let allAnswers = [];

  // Aggregate all answers
  results.forEach((result) => {
    result.results.forEach((answerObj) => {
      allAnswers.push(answerObj.answer);
    });
  });

  // Calculate the total number of responses and the average score
  const totalResponses = allAnswers.length;
  const totalScore = allAnswers.reduce((acc, val) => acc + val, 0);
  const averageScore =
    totalResponses > 0 ? (totalScore / totalResponses).toFixed(1) : null;
  const totalSubmissions = results.length;

  const statistics = {
    title: quiz.title,
    totalResponses,
    averageScore: parseFloat(averageScore),
    totalSubmissions,
  };

  res.status(200).json(statistics);
});

// @desc Export statistics for a quiz type
// @route POST /api/admin/statistics/export
// @access Private/Admin
export const exportStatistics = asyncHandler(async (req, res) => {
  const { quizType } = req.body;

  const quiz = await Quiz.findOne({ type: quizType });

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz type not found");
  }

  const results = await Result.find({ type: quizType });
  let allAnswers = [];

  results.forEach((result) => {
    result.results.forEach((answerObj) => {
      // Add a check to ensure answer is a number
      if (typeof answerObj.answer === "number") {
        allAnswers.push(answerObj.answer);
      } else {
        console.error("Non-numeric answer encountered:", answerObj.answer);
      }
    });
  });

  const totalResponses = allAnswers.length;
  const totalScore = allAnswers.reduce((acc, val) => acc + val, 0);
  const averageScore =
    totalResponses > 0 ? (totalScore / totalResponses).toFixed(1) : null;
  const numberOfSubmissions = results.length; // Number of documents in results

  const statistics = {
    title: quiz.title,
    totalResponses,
    averageScore: parseFloat(averageScore),
    numberOfSubmissions,
  };

  // JSON to CSV
  const fields = [
    "title",
    "totalResponses",
    "averageScore",
    "numberOfSubmissions",
  ];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse([statistics]);

  // Set response headers and send the CSV file
  res.header("Content-Type", "text/csv");
  res.attachment(`statistics-${quizType}.csv`);
  res.send(csv);
});
