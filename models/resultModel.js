import mongoose from "mongoose";
const { Schema } = mongoose;

const responseSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: Schema.Types.Mixed, required: true }, // In this project we use only 'rating' type so the answer is always Number type, but with this we set the model up for other type of answers.
  questionType: { type: String, required: true },
});

const resultsSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    results: [responseSchema],
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultsSchema, "results");

export default Result;
