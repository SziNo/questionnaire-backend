import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, default: "rating", required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // 'general', 'plastic', 'dentist'
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema, "quizzes");

export default Quiz;
