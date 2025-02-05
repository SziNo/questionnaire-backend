import Quiz from "../models/quizModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
export const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find();

  if (quizzes) {
    res.status(200).json(quizzes);
  } else {
    res.status(404).json({ message: "No quizzes found!" });
  }
});

// @desc    Get quizzes by type
// @route   GET /api/quizzes/:type
// @access  Public
export const getQuizzesByType = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const quiz = await Quiz.find({ type });

  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(404).json({ message: "Quiz type not found!" });
  }
});

// @desc    Get quizzes by type (Admin)
// @route   GET /api/quizzes/admin/:type
// @access  Private/Admin
export const getQuizzesByTypeAdmin = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const quiz = await Quiz.find({ type });

  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(404).json({ message: "Quiz type not found!" });
  }
});

// @desc    Add a new quiz type
// @route   POST /api/quizzes/add-quiz
// @access  Private/Admin
export const addQuizType = asyncHandler(async (req, res) => {
  const { title, type } = req.body;

  const existingQuiz = await Quiz.findOne({ type });
  if (existingQuiz) {
    res.status(400);
    throw new Error("Quiz type already exists");
  }

  const quiz = new Quiz({ title, type, questions: [] });
  await quiz.save();

  res.status(201).json({ message: "Quiz type added successfully", quiz });
});

// @desc    Add a question to a quiz
// @route   POST /api/quizzes/add-question
// @access  Private/Admin
export const addQuestion = asyncHandler(async (req, res) => {
  const { quizType, question, questionType } = req.body;

  const quiz = await Quiz.findOne({ type: quizType });
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  const newQuestion = {
    question,
    type: questionType,
  };

  quiz.questions.push(newQuestion);
  await quiz.save();

  res.status(201).json({ message: "Question added successfully", quiz });
});

// @desc    Update a quiz
// @route   PUT /api/quizzes/admin/update-quiz
// @access  Private/Admin
export const updateQuiz = asyncHandler(async (req, res) => {
  const { id, title, type } = req.body;

  const quiz = await Quiz.findById(id);
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  quiz.title = title;
  quiz.type = type;
  await quiz.save();

  res.status(200).json({ message: "Quiz updated successfully", quiz });
});

// @desc    Update a question in a quiz
// @route   PUT /api/quizzes/admin/update-question
// @access  Private/Admin
export const updateQuestion = asyncHandler(async (req, res) => {
  const { questionId, question } = req.body;

  const quiz = await Quiz.findOne({ "questions._id": questionId });
  if (!quiz) {
    res.status(404).json({ message: "Question not found" });
    return;
  }

  const questionToUpdate = quiz.questions.id(questionId);
  questionToUpdate.question = question;

  await quiz.save();

  res.status(200).json({ message: "Question updated successfully", quiz });
});

// @desc    Delete a question from a quiz
// @route   POST /api/quizzes/admin/delete-question
// @access  Private/Admin
export const deleteQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.body;

  const quiz = await Quiz.findOne({ "questions._id": questionId });
  if (!quiz) {
    console.error(`Question ID '${questionId}' not found`);
    res.status(404).json({ message: "Question not found" });
    return;
  }

  quiz.questions.pull({ _id: questionId });
  await quiz.save();

  res.status(200).json({ message: "Question deleted successfully", quiz });
});

// @desc    Delete a quiz type and all its questions
// @route   DELETE /api/quizzes/:type
// @access  Private/Admin
export const deleteQuizType = asyncHandler(async (req, res) => {
  const { type } = req.params;

  const quiz = await Quiz.findOne({ type });
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz type not found");
  }

  await Quiz.deleteOne({ type });

  res
    .status(200)
    .json({ message: "Quiz type and all its questions deleted successfully" });
});
